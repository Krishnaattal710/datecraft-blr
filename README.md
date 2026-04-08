<div align="center">

# 💌 DateCraft

### *We plan. You love.*

A luxury date planning service for Bengaluru couples.
Tell us about your partner — we handle the café, the gifts, the photographer, the timeline, and the magic.

[![Live Demo](https://img.shields.io/badge/🌹_Live_Demo-Visit_Site-e8476a?style=for-the-badge)](https://Krishnaattal710.github.io/datecraft-blr)
[![Version](https://img.shields.io/badge/version-1.3.0-c9975a?style=for-the-badge)](CHANGELOG.md)
[![AI Powered](https://img.shields.io/badge/AI-Claude_Sonnet-a259ff?style=for-the-badge)](docs/AI_AGENTS.md)
[![Zero Dependencies](https://img.shields.io/badge/dependencies-zero-00c853?style=for-the-badge)](#)

</div>

---

## The Problem

Planning a surprise date is stressful. Where to book? What to gift? How to make it feel special and not just... dinner?

DateCraft takes care of everything. You share what makes your partner tick — we design, book, and orchestrate the entire experience. You just show up.

---

## Three Plans, Every Budget

| Plan | Price | The Experience |
|------|-------|---------------|
| **✦ Spark** | ₹3,000 | Curated café + fresh bouquet + custom playlist + dessert surprise |
| **💫 Romance** ⭐ | ₹6,000 | Candlelit dinner + personalised gifts + activity + candid photographer |
| **👑 Fairytale** | ₹9,000 | Full-day itinerary + luxury décor + premium gifts + 3hr photographer + surprise element |

---

## Features

### For Couples
- 🎯 **Date Match Quiz** — 4 questions about your partner → recommends the perfect plan
- 📊 **Plan Comparison Table** — every feature across all 3 plans, side by side
- 🗺️ **Venue Showcase** — 6+ real Bengaluru venues with vibe tags and plan mapping
- 🎁 **Gift Catalogue** — 10 curated gifts mapped to each plan tier
- ⏱️ **Sample Timeline** — hour-by-hour walkthrough of a Romance evening
- 💌 **Surprise Card Generator** — AI writes a personalised card message, you send it

### Booking
- 📋 **Smart Form** — live preview card updates as you type
- 📱 **WhatsApp Confirmation** — pre-filled message to our team opens on submit
- 📊 **Booking Progress Bar** — 4-step tracker slides up as you scroll

### Design
- 🌸 **Falling petals** — animated cherry blossoms throughout
- 🖱️ **Custom cursor** — glowing rose dot with ring
- 🔄 **Trust marquee** — scrolling social proof bar
- 📱 **Fully responsive** — hamburger nav, fluid grid on mobile

---

## 🤖 AI Agents

DateCraft uses **three AI-powered features**, each built on a different pattern. All use `claude-sonnet-4-20250514`.

### 1. AI Date Planner — Conversational Agent

A multi-turn chat assistant that helps users choose the right plan.

```
System prompt → DateCraft persona + package knowledge
User message  → natural language question about partner/occasion/budget
Context       → last 3 turns kept in memory
Output        → 2–4 sentence recommendation with emoji
max_tokens    → 200 (conversational, tight)
Fallback      → 8 keyword-matched local responses + 5 rotating defaults
```

**When it activates:** User types anything in the AI Planner chat widget.

---

### 2. Surprise Card Message Generator — Single-Turn Completion

Writes a personalised card message from relationship context.

```
Prompt pattern → "Write a {tone} message. From: {X}. To: {Y}. 
                  They love: {detail}. Memory: {memory}. Plain text only."
Output          → 3–5 paragraph message + signature line
max_tokens      → 500 (longer creative output)
Fallback        → 7 handcrafted templates across 4 tones with {variable} interpolation
Tones           → Romantic / Funny & Warm / Poetic / Short & Sweet
```

**When it activates:** User clicks "Generate My Card Message" in the Card Writer section.

---

### 3. Date Match Quiz — Local Scoring (No AI)

A 4-question personality quiz. Entirely client-side — **zero API calls**.

```
Each answer → awards points to { Spark, Romance, Fairytale }
After 4 Qs → highest score wins → result shown with plan description
Ties        → default to Romance
```

**Why no AI?** The outcome is deterministic (budget = ₹3K → Spark). A local algorithm is faster, free, and more reliable than a model for rule-based decisions. Claude is reserved for tasks that need language intelligence.

> Full agent specs, system prompts, token budgets, and cost estimates: [`docs/AI_AGENTS.md`](docs/AI_AGENTS.md)

---

## Tech Stack

| Layer | Choice | Why |
|-------|--------|-----|
| Markup | HTML5 | Semantic, accessible |
| Styles | Vanilla CSS (custom properties) | Zero overhead, instant theming |
| Logic | Vanilla JS ES6+ | No build step, loads instantly |
| Fonts | Cormorant Garamond · Dancing Script · DM Sans | Luxury editorial feel |
| AI | Anthropic Claude Sonnet | Card generation + conversational planner |
| Hosting | GitHub Pages | Free, zero config |

---

## Getting Started

```bash
git clone https://github.com/Krishnaattal710/datecraft-blr.git
cd datecraft-blr
open index.html

# Or with live reload
npx live-server --port=3000 --open=index.html
```

### Deploy to GitHub Pages

1. Repo → **Settings → Pages → Source: GitHub Actions**
2. The included [`deploy.yml`](.github/workflows/deploy.yml) handles everything on push to `main`
3. Live at `https://Krishnaattal710.github.io/datecraft-blr` in ~60s

---

## Project Structure

```
datecraft-blr/
├── index.html                  # Entry point
├── src/
│   ├── css/main.css            # Extracted styles (reference)
│   └── js/
│       ├── data.js             # Plans, quiz, venues, gifts, templates
│       ├── utils.js            # toast, shake, clipboard, typewriter
│       ├── quiz.js             # Date Match Quiz
│       ├── message-generator.js# Card Generator (Claude + fallback)
│       ├── ai-planner.js       # AI Planner chat (Claude + fallback)
│       └── app.js              # Core — form, petals, nav, progress
├── docs/
│   ├── ARCHITECTURE.md         # System design
│   └── AI_AGENTS.md            # AI agent deep-dive
├── .github/
│   ├── ISSUE_TEMPLATE/         # Bug + feature templates
│   └── workflows/deploy.yml   # Auto-deploy
├── CHANGELOG.md
├── CONTRIBUTING.md
└── package.json
```

---

## Roadmap

- [ ] Razorpay 50% advance payment on booking submit
- [ ] Supabase backend — persistent bookings + host dashboard
- [ ] Email confirmation via Resend
- [ ] Calendar integration for date availability
- [ ] City expansion — Mumbai · Pune · Delhi · Chennai
- [ ] Host ratings and customer reviews

---

## Contributing

Read [CONTRIBUTING.md](CONTRIBUTING.md) for setup, coding style, and PR process.

[🐛 Report a bug](.github/ISSUE_TEMPLATE/bug_report.md) · [💡 Request a feature](.github/ISSUE_TEMPLATE/feature_request.md)

---

## License

MIT © [Krishnaattal710](https://github.com/Krishnaattal710)

---

<div align="center">
  <strong>Built with 💗 for Bengaluru's couples</strong><br>
  <sub>Because love deserves a plan.</sub>
</div>
