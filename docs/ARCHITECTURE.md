# Architecture

DateCraft is a **zero-dependency, single-page web app**. No React, no Vue, no Webpack. Just HTML, CSS, and vanilla JavaScript — deployed as a static file to GitHub Pages.

---

## Why No Framework?

- Ships instantly — no npm install, no build step, no bundler
- Anyone can fork and edit with just a text editor
- GitHub Pages deployment is one click
- Total page weight under 80KB

---

## Page Sections (in order)

| Section | Purpose |
|---------|---------|
| Hero | Emotional hook + CTAs |
| Trust bar | Scrolling social proof |
| How It Works | 4-step process explainer |
| Date Match Quiz | Personality → plan recommendation |
| Plans | 3 pricing tiers with full feature lists |
| Comparison Table | Side-by-side feature grid |
| Venues | Scrollable venue showcase |
| Gifts | Gift catalogue by plan tier |
| Sample Timeline | Hour-by-hour Romance evening |
| AI Date Planner | Conversational Claude chatbot |
| Surprise Card Generator | Claude-powered card message writer |
| Booking Form | Full RSVP form with live preview |
| Testimonials | 3 customer quotes |
| FAQ | Accordion with 6 questions |
| CTA Banner | Final conversion prompt |

---

## AI Agents Used

Three distinct Claude Sonnet agents power different features:

### 1. AI Date Planner (Conversational)
- **Model:** `claude-sonnet-4-20250514`
- **Behaviour:** Multi-turn chat with a system prompt defining DateCraft's packages, tone, and constraints. Maintains last 3 turns of context.
- **Fallback:** Keyword-matched local response library (8 patterns + 5 default prompts)
- **File:** `src/js/ai-planner.js`

### 2. Surprise Card Message Generator
- **Model:** `claude-sonnet-4-20250514`
- **Behaviour:** Single-turn completion. Receives relationship context (names, occasion, a favourite thing, a shared memory, tone preference) and generates a 3–5 paragraph card message in plain text.
- **Fallback:** 7 handcrafted template strings across 4 tones (Romantic, Funny, Poetic, Short & Sweet) with variable interpolation.
- **File:** `src/js/message-generator.js`

### 3. Date Match Quiz (Local)
- **Behaviour:** Entirely client-side — no API call. 4 questions, each answer scores points toward Spark / Romance / Fairytale. Highest score wins.
- **File:** `src/js/quiz.js`

---

## Data Flow

```
User Input
    │
    ├─ Quiz answer    → local scoring → plan recommendation → pre-selects booking form
    │
    ├─ AI chat msg    → Claude API (multi-turn) OR local fallback → chat bubble
    │
    ├─ Card details   → Claude API (single-turn) OR template → typewriter animation
    │
    └─ Booking form   → validation → builds WhatsApp message → opens wa.me deep link
```

---

## Theme System

All colours live in CSS custom properties on `:root`:

```css
:root {
  --night: #080610;
  --rose:  #e8476a;
  --gold:  #c9975a;
  --gold2: #f0c080;
}
```

No JavaScript needed to switch colours — everything is a CSS variable.

---

## Booking Flow

```
Guest fills form (name, partner, occasion, date, plan)
    │
    └─► Validation
           │
           └─► Build WhatsApp message string
                  │
                  └─► wa.me/919999999999?text=... opens
                         │
                         └─► Team receives, confirms within 24 hrs
```

No backend, no database. The booking is a WhatsApp message. This is intentional for v1 — the team validates and handles manually while the product finds product-market fit.

---

## Roadmap

- [ ] Supabase backend — persistent bookings, host dashboard
- [ ] Razorpay 50% advance payment on form submit
- [ ] Email confirmation via Resend
- [ ] Admin panel — view/manage all bookings
- [ ] City expansion — Mumbai, Pune, Delhi, Chennai
