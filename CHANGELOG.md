# Changelog

All notable changes to DateCraft are documented here.

---

## [1.3.0] — 2025-04-08

### Added
- **Date Match Quiz** — 4-question personality assessment recommends the right plan
- **Plan Comparison Table** — 15-row side-by-side feature grid across all 3 plans
- **Surprise Card Message Generator** — Claude Sonnet writes personalised card messages with typewriter animation; copy/regenerate/WhatsApp actions
- **Booking Progress Tracker** — sticky bottom bar shows 4-step journey, updates as user interacts
- **AI Planner upgrade** — now uses Claude Sonnet API with multi-turn context (3-turn window); local keyword fallback preserved

### Fixed
- `cursor: none` on all interactive elements was blocking click events on touch devices — replaced with `cursor: pointer` everywhere; `@media (hover: none)` override for mobile

---

## [1.2.0] — 2025-04-07

### Added
- **Trust marquee bar** — infinite scrolling social proof strip (500+ couples, 4.9★, etc.)
- **Photo gallery grid** — asymmetric 3-column layout with 5 date moment cards
- **AI Date Planner** — conversational chat widget (local keyword responses + Claude API)
- **FAQ accordion** — 6 questions with animated open/close
- **Mobile hamburger nav** — full-screen overlay menu for viewports under 1024px
- **WhatsApp floating button** — always-visible bottom-right bubble with tooltip and bounce animation
- **WhatsApp booking confirmation** — pre-filled message to team built from form data

### Changed
- Nav links updated to include Quiz, Card Writer, Book Now
- Responsive breakpoints extended for new sections

---

## [1.1.0] — 2025-04-06

### Fixed
- `i < 20` and `i < 30` in `for` loops inside `<script>` tag — browser HTML parser was treating `<` as tag open in some environments; replaced with `i !== N`
- `₹` in `onclick=""` attributes — multi-byte UTF-8 sometimes mangled by HTML attribute parser; replaced with `&#x20B9;` HTML entity

---

## [1.0.0] — 2025-04-06

### Added
- Initial release — DateCraft luxury date planning website
- 3 packages: Spark (₹3K), Romance (₹6K), Fairytale (₹9K)
- How It Works section (4 steps)
- 6 Bengaluru venue cards with vibe tags
- 10 curated gifts mapped to plan tiers
- Sample Romance evening timeline (6 steps)
- Smart booking form with live preview card
- Falling cherry blossom petal animation
- Custom glowing rose cursor
- Testimonials from 3 couples
- WhatsApp deep link on form submit
- Fully responsive — mobile-first layout
