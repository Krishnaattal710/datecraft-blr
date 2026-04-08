# AI Agents in DateCraft

DateCraft uses **three AI-powered features**, each built on a different pattern. Here's how each one works under the hood.

---

## Agent 1 — AI Date Planner 🤖

**Location:** `src/js/ai-planner.js` | Chat widget in the "AI Date Planner" section

### What it does
A conversational assistant that helps users figure out which plan to pick based on their partner's personality, the occasion, and their budget.

### Model
`claude-sonnet-4-20250514` via `POST /v1/messages`

### System Prompt
```
You are DateCraft's AI date planner — a warm, knowledgeable assistant helping people plan surprise dates in Bengaluru, India.
You know the three DateCraft packages:
- Spark (₹3,000): Café + bouquet + playlist + dessert
- Romance (₹6,000): Dinner + gifts + activity + photographer (1hr)
- Fairytale (₹9,000): Full-day + luxury décor + 3hr photographer + surprise element

Be concise (2-4 sentences), warm, and use 1-2 emojis per message.
Always guide toward booking a plan.
```

### Context Window Strategy
Sends the last 3 turns (6 messages) of history with each request to maintain conversation context without exceeding token limits.

### Fallback
8 keyword-matched local responses + 5 rotating default prompts. The chat works even without an API key.

### Token budget
`max_tokens: 200` — keeps responses tight and conversational.

---

## Agent 2 — Surprise Card Message Generator ✍️

**Location:** `src/js/message-generator.js` | "Generate Their Surprise Card" section

### What it does
Takes relationship context (names, occasion, one thing they love, a shared memory, preferred tone) and writes a personalised 3–5 paragraph card message — displayed with a typewriter animation.

### Model
`claude-sonnet-4-20250514` via `POST /v1/messages`

### Prompt pattern
Single-turn completion with all context injected into the user message:

```
Write a heartfelt card message for a surprise date experience.
Style: {tone}. Occasion: {occasion}.
From: {from}. To: {to}.
What they love about their partner: "{love}".
A favourite memory: "{memory}".
Write 3–5 short paragraphs. End with a signature line "— {from}".
Do NOT use asterisks, markdown, or quotation marks. Plain text only.
```

### Why plain text?
The output is displayed in a styled `<div>` with a typewriter animation. Markdown would render as raw characters — so we explicitly instruct Claude to return clean prose.

### Fallback
7 handcrafted template strings, one per tone × scenario combination, with `{variable}` interpolation. Covers:
- `Romantic` (2 variants)
- `Funny & Warm` (1 variant)
- `Poetic` (1 variant)
- `Short & Sweet` (1 variant)

### Token budget
`max_tokens: 500` — enough for a 4-paragraph message with a signature.

---

## Agent 3 — Date Match Quiz 🎯

**Location:** `src/js/quiz.js` | "Date Match Quiz" section

### What it does
A 4-question personality quiz that recommends a Spark / Romance / Fairytale plan. Entirely client-side — **no API call**.

### Scoring system
Each answer option carries a weight map, e.g.:
```js
{ score: { Fairytale: 2 } }          // strong signal
{ score: { Romance: 1, Spark: 1 } }  // ambiguous
```
After 4 questions, the plan with the highest cumulative score wins. Ties default to Romance (the most popular plan).

### Why no AI here?
The quiz is deterministic — the "right answer" depends on hard rules (budget = ₹3K → Spark), not natural language understanding. A local scoring algorithm is faster, more reliable, and free. Claude is reserved for tasks that actually need language intelligence.

---

## Integration Pattern

All three agents share the same API endpoint:

```js
fetch('https://api.anthropic.com/v1/messages', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({
    model: 'claude-sonnet-4-20250514',
    max_tokens: N,
    messages: [...],
  })
})
```

The API key is injected by the Claude.ai platform when the app runs inside an artifact. For self-hosted deployments, proxy the call through a backend (e.g. a Vercel Edge Function) to keep the key server-side.

---

## Cost Estimate (per interaction)

| Agent | Input tokens | Output tokens | Est. cost |
|-------|-------------|---------------|-----------|
| AI Planner (per turn) | ~300 | ~150 | < $0.001 |
| Card Generator | ~200 | ~400 | < $0.002 |
| Quiz | 0 | 0 | Free |

At 100 users/day with 3 planner turns + 1 card per session: **~$0.50/day**.
