/**
 * message-generator.js
 * Surprise Card Message Generator — uses Anthropic Claude Sonnet API to write
 * a personalised card message based on relationship details provided by the user.
 *
 * Falls back to local handcrafted templates if the API is unavailable.
 */

let _lastGeneratedMsg = '';

/**
 * Main entry point — called by the "Generate" button.
 * Tries Claude API first, falls back to local templates.
 */
async function generateMessage() {
  const from     = document.getElementById('msgFromName').value.trim();
  const to       = document.getElementById('msgToName').value.trim();
  const occasion = document.getElementById('msgOccasion').value;
  const love     = document.getElementById('msgLove').value.trim();
  const memory   = document.getElementById('msgMemory').value.trim();

  if (!from)    { showToast("What's your name? 💌"); return; }
  if (!to)      { showToast("Their name? 💗");        return; }
  if (!occasion){ showToast("What's the occasion? 🎉"); return; }

  const toneChip = document.querySelector('#message-gen .vibe-chip.selected');
  const tone     = toneChip
    ? toneChip.textContent.trim().split(' ').slice(1).join(' ')
    : 'Romantic';

  const btn = document.getElementById('msgGenBtn');
  btn.textContent = '✨ Writing your message...';
  btn.disabled    = true;

  try {
    const msg = await _generateWithClaude({ from, to, occasion, love, memory, tone });
    _lastGeneratedMsg = msg;
    _animateMessage(msg, from);
  } catch (err) {
    // Graceful fallback to local templates
    const msg = _generateFromTemplate({ from, to, occasion, love, memory, tone });
    _lastGeneratedMsg = msg;
    _animateMessage(msg, from);
  } finally {
    btn.textContent = '✨ Regenerate Message';
    btn.disabled    = false;
  }
}

/** Regenerate with the same inputs. */
function regenerateMessage() { generateMessage(); }

/** Copy the last generated message to clipboard. */
function copyMessage() { copyToClipboard(_lastGeneratedMsg); }

/** Open WhatsApp with the message pre-filled. */
function sendMsgWA() {
  window.open('https://wa.me/?text=' + encodeURIComponent(_lastGeneratedMsg), '_blank');
}

// ─── CLAUDE API ───────────────────────────────────────────────────────────────

async function _generateWithClaude({ from, to, occasion, love, memory, tone }) {
  const prompt =
    `Write a heartfelt card message for a surprise date experience. ` +
    `Style: ${tone}. Occasion: ${occasion}. ` +
    `From: ${from}. To: ${to}. ` +
    `What they love about their partner: "${love || 'everything about them'}". ` +
    `A favourite memory: "${memory || 'all our little moments'}". ` +
    `Write 3–5 short paragraphs. End with a signature line "— ${from}". ` +
    `Do NOT use asterisks, markdown, or quotation marks. Plain text only.`;

  const res = await fetch('https://api.anthropic.com/v1/messages', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      model: 'claude-sonnet-4-20250514',
      max_tokens: 500,
      messages: [{ role: 'user', content: prompt }],
    }),
  });

  if (!res.ok) throw new Error('API error');
  const data = await res.json();
  return data.content?.find(b => b.type === 'text')?.text || '';
}

// ─── LOCAL TEMPLATE FALLBACK ──────────────────────────────────────────────────

function _generateFromTemplate({ from, to, occasion, love, memory, tone }) {
  const templates = MESSAGE_TEMPLATES[tone] || MESSAGE_TEMPLATES['Romantic'];
  const template  = templates[Math.floor(Math.random() * templates.length)];

  const loveText   = love   || 'the way you make everything feel lighter';
  const memoryText = memory || "I think about the little moments we've had";
  const occasionText = occasion.replace('Her ', '').replace('Our ', '');

  return template
    .replace(/{from}/g,     from)
    .replace(/{to}/g,       to)
    .replace(/{occasion}/g, occasionText)
    .replace(/{love}/g,     loveText)
    .replace(/{memory}/g,   memoryText);
}

// ─── UI ───────────────────────────────────────────────────────────────────────

function _animateMessage(msg, from) {
  const out     = document.getElementById('msgOutput');
  const fromEl  = document.getElementById('msgOutputFrom');
  const actions = document.getElementById('msgActions');

  // Split signature from body
  const lines    = msg.split('\n');
  const lastLine = lines[lines.length - 1];
  const bodyText = lines.slice(0, -2).join('\n');

  fromEl.style.display  = 'none';
  actions.style.display = 'none';

  typewriter(bodyText, out, 16, () => {
    out.innerHTML = `<span style="white-space:pre-wrap">${bodyText}</span>`;
    fromEl.textContent   = lastLine;
    fromEl.style.display = 'block';
    actions.style.display = 'flex';
  });
}
