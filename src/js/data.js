/**
 * data.js
 * All static content — plan definitions, quiz questions, venue data,
 * gift catalogue, AI response patterns, and message templates.
 *
 * In a production build these would come from a Supabase/Firestore backend.
 */

// ─── PLAN TIERS ───────────────────────────────────────────────────────────────
const PLAN_DATA = {
  Spark: {
    price: '₹3,000',
    badge: '✦ Spark Plan',
    emoji: '☕',
    tagline: 'Intimate, warm, and exactly right.',
    items: [
      'Café reservation — curated ambience, private table',
      'Fresh bouquet delivered to the table',
      'Custom 20-song playlist built for the vibe',
      'Dessert surprise box (chocolates / macarons / waffles)',
      'Date timeline document sent to you',
    ],
    color: '#c9975a',
  },
  Romance: {
    price: '₹6,000',
    badge: '💫 Romance Plan',
    emoji: '🌹',
    tagline: 'A proper evening. Dinner, a moment, memories.',
    items: [
      'Premium candlelit dinner reservation',
      'Personalised gift hamper curated to their taste',
      'Rose arrangement + handwritten card',
      'Activity pairing — pottery, paint & sip, or stargazing',
      'Candid photographer — 1 hour, 30 edited shots',
      'Full evening playlist + ambient setup',
    ],
    color: '#e8476a',
  },
  Fairytale: {
    price: '₹9,000',
    badge: '👑 Fairytale Plan',
    emoji: '✨',
    tagline: 'A story so cinematic they\'ll tell it for years.',
    items: [
      'Full-day itinerary — morning to midnight',
      'Luxury venue + décor (petals, fairy lights, balloons)',
      'Premium gift box — jewellery, perfume, or keepsake',
      '3-hour candid photographer — 80+ shots + Instagram reel',
      'Cab arrangement both ways, decorated',
      'Surprise element — flash mob, sky lanterns, or serenade',
      'Printed memory book delivered after the date',
    ],
    color: '#a259ff',
  },
};

// ─── QUIZ QUESTIONS ────────────────────────────────────────────────────────────
const QUIZ = [
  {
    q: 'When your partner has a free evening, they most want to...',
    opts: [
      { e: '🍷', t: 'Dress up and go somewhere fancy',        score: { Fairytale: 2 } },
      { e: '🎨', t: 'Try something creative together',         score: { Romance: 2 } },
      { e: '🛋️', t: 'Stay cozy, no big plans',               score: { Spark: 2 } },
      { e: '🌍', t: 'An adventure — somewhere completely new', score: { Fairytale: 1, Romance: 1 } },
    ],
  },
  {
    q: 'What would make them happiest to receive as a gift?',
    opts: [
      { e: '💍', t: 'Something personalised and meaningful',   score: { Fairytale: 2 } },
      { e: '🌹', t: 'Fresh flowers and a handwritten card',    score: { Spark: 2, Romance: 1 } },
      { e: '📸', t: 'Photos — memories they can keep forever', score: { Romance: 2 } },
      { e: '✨', t: 'A full surprise they didn\'t see coming', score: { Fairytale: 2 } },
    ],
  },
  {
    q: 'How do they feel about being the centre of attention?',
    opts: [
      { e: '👑', t: 'They absolutely love it',                 score: { Fairytale: 2 } },
      { e: '😊', t: 'Fine with it if it\'s just the two of us', score: { Romance: 2 } },
      { e: '🙈', t: 'A little shy — keep it intimate',         score: { Spark: 2 } },
      { e: '🤔', t: 'Depends on their mood',                   score: { Romance: 1, Spark: 1 } },
    ],
  },
  {
    q: 'What\'s your budget for this date?',
    opts: [
      { e: '💸', t: 'Around ₹3,000 — cozy and thoughtful',    score: { Spark: 3 } },
      { e: '💰', t: '₹6,000 — a proper full evening',          score: { Romance: 3 } },
      { e: '🌟', t: '₹9,000 — nothing but the best',           score: { Fairytale: 3 } },
      { e: '🤷', t: 'Not sure yet — show me options',           score: { Romance: 1 } },
    ],
  },
];

// ─── QUIZ RESULT COPY ─────────────────────────────────────────────────────────
const QUIZ_RESULTS = {
  Spark: {
    emoji: '☕',
    desc: 'Your partner sounds like someone who values warmth and intimacy over grand gestures. The Spark Plan was made for them — a private café table, fresh flowers, soft music, and a dessert that says "I was thinking of you." Simple. Perfect. Them.',
  },
  Romance: {
    emoji: '🌹',
    desc: 'Your partner loves a proper experience — good food, something to do together, and photos to remember it by. The Romance Plan covers all of it: a candlelit dinner, a curated activity, gifts, and a photographer to capture every reaction.',
  },
  Fairytale: {
    emoji: '✨',
    desc: "Your partner deserves the works. They'd love a full-day cinematic experience — décor, surprises, the perfect gift, and 80+ photos of the whole thing. The Fairytale Plan turns an evening into a story they'll tell forever.",
  },
};

// ─── MESSAGE TEMPLATES ────────────────────────────────────────────────────────
// Used by the Surprise Card Message Generator.
// Variables: {from}, {to}, {occasion}, {love}, {memory}
const MESSAGE_TEMPLATES = {
  Romantic: [
    `My dearest {to},

I've been trying to find the right words for a while now. There's something about the way you {love} that makes everything else feel quiet — like the whole world slows down.

{memory}. I hold that close.

Today isn't about a grand gesture. It's about you knowing that I see you. Every version of you.

With everything I have,
{from}`,
    `To {to},

If I could bottle one thing about us, it would be this: the way we can be completely ordinary and it still feels like something. The {love} — that thing you don't even notice — I notice it every single time.

{memory}. That's ours.

Happy {occasion}. You deserve every bit of this.

Always yours,
{from}`,
  ],
  Funny: [
    `Hey {to},

Okay so I planned this whole thing. Voluntarily. You're welcome.

I could've gotten you a card from the rack but you deserve better than Comic Sans and a cartoon balloon. The {love} — yes, I noticed. I notice everything, I'm just bad at saying it out loud.

{memory} and honestly it's one of my favourites.

Happy {occasion}! Don't cry. Actually, cry a little. It's fine.

{from} (who definitely pulled this off)`,
  ],
  Poetic: [
    `Dearest {to},

There are things the calendar can't hold — the particular quality of light on a day you changed something in me. The {love}. The {memory}.

I am learning that love is not one moment. It is the accumulated weight of ordinary Tuesday evenings and the way you look when you don't know I'm watching.

Today I give you a small proof of what you mean to me.

With all of it,
{from}`,
  ],
  'Short & Sweet': [
    `For {to},

You make everything better. The {love} — I think about that more than you know.

{memory}. That's one of mine.

Happy {occasion}. You deserve this and more.

With love,
{from}`,
  ],
};

// ─── VENUES ───────────────────────────────────────────────────────────────────
const VENUES = [
  { name: 'The Permit Room',    area: 'Indiranagar',   tags: ['Candlelit','Cocktails','Intimate'],  plans: ['Spark','Romance'], emoji: '🕯️', bg: 'linear-gradient(135deg,#1a0a18,#2d0f28)' },
  { name: 'Café Dyu Ani',       area: 'Koramangala',   tags: ['Garden','Artsy','Cozy'],              plans: ['All'],            emoji: '🌿', bg: 'linear-gradient(135deg,#0d1a0a,#1a2d0f)' },
  { name: 'Skyye — UB City',    area: 'UB City Rooftop', tags: ['Rooftop','City View','Premium'],   plans: ['Romance','Fairytale'], emoji: '🌃', bg: 'linear-gradient(135deg,#0a0a1a,#0f0f2d)' },
  { name: 'Ebony — ITC Windsor', area: 'Sankey Road',  tags: ['Fine Dining','Luxury','Private'],    plans: ['Fairytale'],      emoji: '🍷', bg: 'linear-gradient(135deg,#1a0808,#2d0f0f)' },
  { name: 'The Hammered',       area: 'Koramangala',   tags: ['Pottery','Activity','Quirky'],        plans: ['Romance'],        emoji: '🎨', bg: 'linear-gradient(135deg,#0a1218,#0f202d)' },
  { name: 'Third Wave Coffee',  area: 'Multiple locations', tags: ['Coffee','Casual','Warm'],       plans: ['Spark'],          emoji: '☕', bg: 'linear-gradient(135deg,#180f0a,#2d1a0f)' },
];

// ─── GIFTS ────────────────────────────────────────────────────────────────────
const GIFTS = [
  { emoji: '🌹', name: 'Rose Bouquet',            plan: 'Spark+' },
  { emoji: '🍫', name: 'Artisan Chocolates',       plan: 'Spark+' },
  { emoji: '🕯️', name: 'Scented Candle Set',      plan: 'Romance+' },
  { emoji: '📸', name: 'Polaroid Frame',           plan: 'Romance+' },
  { emoji: '💐', name: 'Dried Flower Box',         plan: 'Romance+' },
  { emoji: '🧴', name: 'Skincare Hamper',          plan: 'Romance+' },
  { emoji: '💍', name: 'Personalised Jewellery',   plan: 'Fairytale' },
  { emoji: '🌟', name: 'Name-a-Star Certificate',  plan: 'Fairytale' },
  { emoji: '📖', name: 'Custom Memory Book',       plan: 'Fairytale' },
  { emoji: '🎀', name: 'Luxury Gift Box',          plan: 'Fairytale' },
];
