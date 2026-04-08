# Contributing to DateCraft

Thanks for wanting to contribute! 🌹

---

## Getting Started

```bash
git clone https://github.com/Krishnaattal710/datecraft-blr.git
cd datecraft-blr
npx live-server --port=3000 --open=index.html
```

No build step. Open `index.html` in a browser and start hacking.

---

## Project Structure

```
datecraft-blr/
├── index.html                  # Entry point — all markup, inline styles + script
├── src/
│   ├── css/main.css            # Extracted styles (reference copy)
│   └── js/
│       ├── data.js             # Plans, quiz questions, venues, gifts, templates
│       ├── utils.js            # Shared helpers — toast, shake, clipboard, typewriter
│       ├── quiz.js             # Date Match Quiz scoring and UI
│       ├── message-generator.js# Surprise Card Generator (Claude API + fallback)
│       ├── ai-planner.js       # Conversational AI Planner (Claude API + fallback)
│       └── app.js              # Core app — booking form, petals, nav, progress bar
├── docs/
│   ├── ARCHITECTURE.md         # How the app is structured
│   └── AI_AGENTS.md            # Deep-dive on every AI agent used
├── assets/
│   └── screenshots/            # UI screenshots for README / social
├── .github/
│   ├── ISSUE_TEMPLATE/
│   └── workflows/deploy.yml   # GitHub Actions auto-deploy to Pages
├── CHANGELOG.md
├── CONTRIBUTING.md
└── package.json
```

---

## Coding Style

- Vanilla JS only — no frameworks, no bundlers
- `const` / `let`, never `var`
- Functions should be small and do one thing
- Comment every non-obvious block
- All colours via CSS variables — never hardcode hex values in JS
- Always test on mobile before submitting a PR

---

## AI Features

When working on AI features:
- Always provide a **local fallback** — the feature must work without an API key
- Keep `max_tokens` tight — 200 for conversational, 500 for generation
- Never expose API keys in frontend code — proxy via a backend for production
- See `docs/AI_AGENTS.md` for the full agent specifications

---

## Submitting a PR

1. Fork the repo
2. Branch: `git checkout -b feat/your-feature`
3. Make changes + test on Chrome, Safari, and mobile
4. PR with a clear description of what changed and why

---

## Good First Issues

- [ ] Add more venue cards (10+ venues across BLR)
- [ ] Add more message template tones (Sentimental, Professional)
- [ ] Translate to Kannada / Hindi
- [ ] Accessibility audit — keyboard nav + ARIA labels
- [ ] Add a "Save my date idea" feature using localStorage
