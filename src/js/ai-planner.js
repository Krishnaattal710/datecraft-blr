/**
 * ai-planner.js
 * Conversational AI Date Planner — powered by Claude Sonnet via the
 * Anthropic Messages API with a curated system prompt.
 *
 * Falls back to keyword-matched local responses when the API is unavailable,
 * so the chat always works even without a live API key.
 */

// Conversation history kept in memory for multi-turn context
const _chatHistory = [];

// ─── LOCAL FALLBACK RESPONSES ─────────────────────────────────────────────────
const AI_RESPONSES = [
  {
    triggers: ['budget', 'cheap', '3000', '3k', 'spark', 'less', 'affordable'],
    reply: "For a beautiful intimate date, the **Spark Plan (₹3,000)** is perfect! 🌟\n\nA curated café table, fresh bouquet, custom playlist, and a dessert surprise. Simple, thoughtful, and exactly right. Want me to suggest some cozy cafés in Bengaluru?",
  },
  {
    triggers: ['photographer', 'photo', 'memory', 'capture', 'pictures', 'reel'],
    reply: "Great thinking! Both **Romance (₹6,000)** and **Fairytale (₹9,000)** include a professional photographer — 1 hour for Romance (30 edited shots) and 3 hours for Fairytale (80+ shots + a reel). Which feels right for your occasion?",
  },
  {
    triggers: ['proposal', 'propose', 'ring', 'marry', 'engagement'],
    reply: "This is THE moment! 💍✨\n\nGo **Fairytale (₹9,000)** — full-day planning, luxury décor, 3-hour photographer to capture the ring moment, and a surprise element. The memory book arrives printed afterwards. This is the one!",
  },
  {
    triggers: ['birthday', 'bday', 'born'],
    reply: "Birthdays deserve the full treatment! 🎂\n\n**Romance (₹6,000)** — premium dinner, personalised gifts, and a photographer to capture every reaction. For a big milestone, go **Fairytale** for décor, surprises, and a memory book. Which age is it?",
  },
  {
    triggers: ['introvert', 'quiet', 'shy', 'private', 'cozy', 'homebody', 'small'],
    reply: "For someone who loves quiet and intimate moments, the **Spark Plan** is ideal 🌟\n\nA private café corner, soft music, flowers, no crowds. Or the **Romance** plan with pottery or painting — no loud venues. Want some cozy, low-key spot suggestions?",
  },
  {
    triggers: ['anniversary', 'year', 'together', 'relationship'],
    reply: "Anniversaries deserve something meaningful 🌹\n\nFor 1st/2nd anniversary — **Romance (₹6,000)**. For 5th, 10th, or a milestone — **Fairytale (₹9,000)** all the way. We can even recreate your first date location! What year are you celebrating?",
  },
  {
    triggers: ['outdoor', 'nature', 'park', 'picnic', 'fresh air', 'sunset', 'rooftop'],
    reply: "Love the outdoor vibe! 🌅 We can plan:\n\n• A sunset picnic at Cubbon Park\n• A rooftop dinner at Skyye (UB City)\n• A stargazing evening on a resort terrace\n\nAll available in **Romance** or **Fairytale**. What time of day do they love most?",
  },
  {
    triggers: ['compare', 'difference', 'which', 'choose', 'what plan', 'options'],
    reply: "Quick breakdown:\n\n• **Spark (₹3,000)** — Café + flowers + playlist + dessert. Intimate dates.\n• **Romance (₹6,000)** — Dinner + gifts + activity + photographer. A full evening.\n• **Fairytale (₹9,000)** — Full day, décor, luxury gifts, 3hr photographer + surprise.\n\nOr take our **Date Match Quiz** above — it picks for you in 60 seconds! 🎯",
  },
];

const DEFAULT_REPLIES = [
  "Tell me more! What's the occasion — birthday, anniversary, or just a surprise? 🌹",
  "That sounds lovely! Does your partner prefer cozy and intimate, or grand and adventurous? 💡",
  "What's your rough budget — around ₹3K, ₹6K, or ₹9K? That helps me pick the right plan. 💸",
  "Interesting! What kind of food does your partner love? Helps me narrow down the venue. 🍽️",
  "You can also try our **Date Match Quiz** above — it finds the perfect plan based on their personality! 🌟",
];
let _defaultIdx = 0;

// ─── PUBLIC API ───────────────────────────────────────────────────────────────

/** Called when user hits Send in the AI planner chat. */
async function sendAiMsg() {
  const input = document.getElementById('aiInput');
  const msg   = input.value.trim();
  if (!msg) return;

  input.value = '';
  _addMessage(msg, 'user');
  _chatHistory.push({ role: 'user', content: msg });

  const typing = document.getElementById('aiTyping');
  typing.classList.add('show');

  try {
    const reply = await _getReply(msg);
    typing.classList.remove('show');
    _addMessage(reply, 'bot');
    _chatHistory.push({ role: 'assistant', content: reply });
  } catch {
    typing.classList.remove('show');
    const fallback = _localFallback(msg);
    _addMessage(fallback, 'bot');
    _chatHistory.push({ role: 'assistant', content: fallback });
  }
}

// ─── CLAUDE API ───────────────────────────────────────────────────────────────

async function _getReply(userMsg) {
  const systemPrompt =
    `You are DateCraft's AI date planner — a warm, knowledgeable assistant helping people plan surprise dates in Bengaluru, India.
You know the three DateCraft packages:
- Spark (₹3,000): Café + bouquet + playlist + dessert
- Romance (₹6,000): Dinner + gifts + activity + photographer (1hr)  
- Fairytale (₹9,000): Full-day + luxury décor + 3hr photographer + surprise element

Be concise (2-4 sentences), warm, and use 1-2 emojis per message. Always guide toward booking a plan. Never make up venues not mentioned in your knowledge.`;

  const res = await fetch('https://api.anthropic.com/v1/messages', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      model: 'claude-sonnet-4-20250514',
      max_tokens: 200,
      system: systemPrompt,
      messages: _chatHistory.slice(-6), // last 3 turns for context
    }),
  });

  if (!res.ok) throw new Error('API error');
  const data = await res.json();
  return data.content?.find(b => b.type === 'text')?.text || '';
}

// ─── LOCAL FALLBACK ───────────────────────────────────────────────────────────

function _localFallback(msg) {
  const lower = msg.toLowerCase();
  for (const r of AI_RESPONSES) {
    if (r.triggers.some(t => lower.includes(t))) return r.reply;
  }
  const reply = DEFAULT_REPLIES[_defaultIdx % DEFAULT_REPLIES.length];
  _defaultIdx++;
  return reply;
}

// ─── UI ───────────────────────────────────────────────────────────────────────

function _addMessage(text, type) {
  const chat = document.getElementById('aiChat');
  const div  = document.createElement('div');
  div.className  = 'ai-msg ' + type;
  div.innerHTML  = text
    .replace(/\*\*([^*]+)\*\*/g, '<b>$1</b>')
    .replace(/\n/g, '<br>');
  chat.appendChild(div);
  chat.scrollTop = chat.scrollHeight;
}
