/* ================================================================
   DateCraft — Shared JavaScript
   Loaded by every page via <script src="shared.js"></script>
   ================================================================ */

// ── NAV ACTIVE STATE ──────────────────────────────────────────────
(function setActiveNav() {
  const path = window.location.pathname.split('/').pop() || 'index.html';
  document.querySelectorAll('.nav-link').forEach(link => {
    const href = link.getAttribute('href') || '';
    if (href === path || (path === '' && href === 'index.html')) {
      link.classList.add('active');
    }
  });
})();

// ── NAV SCROLL ────────────────────────────────────────────────────
window.addEventListener('scroll', () => {
  const nav = document.querySelector('.nav');
  if (nav) nav.classList.toggle('scrolled', window.scrollY > 40);
}, { passive: true });

// ── MOBILE MENU ───────────────────────────────────────────────────
function toggleMobMenu() {
  const menu = document.getElementById('mobMenu');
  if (menu) {
    menu.classList.toggle('open');
    document.body.style.overflow = menu.classList.contains('open') ? 'hidden' : '';
  }
}
function closeMobMenu() {
  const menu = document.getElementById('mobMenu');
  if (menu) { menu.classList.remove('open'); document.body.style.overflow = ''; }
}

// ── PETALS ────────────────────────────────────────────────────────
const PETALS = ['🌸', '🌹', '🌺', '❤️', '💮'];

function spawnPetal() {
  const p = document.createElement('div');
  p.className = 'petal';
  p.textContent = PETALS[Math.floor(Math.random() * PETALS.length)];
  p.style.left = Math.random() * 100 + 'vw';
  p.style.fontSize = (10 + Math.random() * 14) + 'px';
  const dur = 9 + Math.random() * 12;
  p.style.animationDuration = dur + 's';
  p.style.animationDelay = (Math.random() * -dur) + 's';
  document.body.appendChild(p);
  setTimeout(() => p.remove(), dur * 1000);
}

function startPetals(count = 14, interval = 1600) {
  for (let i = 0; i !== count; i++) spawnPetal();
  setInterval(spawnPetal, interval);
}

function burstPetals(count = 30) {
  for (let i = 0; i !== count; i++) setTimeout(spawnPetal, i * 70);
}

// ── SCROLL REVEAL ─────────────────────────────────────────────────
const revealObs = new IntersectionObserver(entries => {
  entries.forEach((e, i) => {
    if (e.isIntersecting) {
      setTimeout(() => e.target.classList.add('visible'), i * 80);
      revealObs.unobserve(e.target);
    }
  });
}, { threshold: 0.08 });

function initReveal() {
  document.querySelectorAll('.reveal').forEach(el => revealObs.observe(el));
}

// ── TOAST ─────────────────────────────────────────────────────────
let toastTimer;
function showToast(msg, duration = 3000) {
  let t = document.getElementById('toastEl');
  if (!t) {
    t = document.createElement('div');
    t.id = 'toastEl';
    t.className = 'toast';
    document.body.appendChild(t);
  }
  t.textContent = msg;
  t.classList.add('show');
  clearTimeout(toastTimer);
  toastTimer = setTimeout(() => t.classList.remove('show'), duration);
}

// ── SHAKE ─────────────────────────────────────────────────────────
(function injectShakeCSS() {
  const s = document.createElement('style');
  s.textContent = '@keyframes shake{0%,100%{transform:translateX(0)}25%{transform:translateX(-8px)}75%{transform:translateX(8px)}}';
  document.head.appendChild(s);
})();

function shake(id) {
  const el = document.getElementById(id);
  if (!el) return;
  el.style.animation = 'none'; el.offsetHeight;
  el.style.animation = 'shake 0.4s ease';
  setTimeout(() => el.style.animation = '', 500);
}

// ── CLIPBOARD ─────────────────────────────────────────────────────
function copyToClipboard(text) {
  if (navigator.clipboard) {
    navigator.clipboard.writeText(text).then(() => showToast('📋 Copied to clipboard!'));
  } else {
    const ta = document.createElement('textarea');
    ta.value = text; document.body.appendChild(ta);
    ta.select(); document.execCommand('copy');
    document.body.removeChild(ta);
    showToast('📋 Copied!');
  }
}

// ── PLAN DATA (shared across pages) ──────────────────────────────
const PLAN_DATA = {
  Spark: {
    price: '₹3,000', priceNum: 3000, advance: 1500,
    emoji: '☕', color: '#c9975a',
    tagline: 'Intimate, warm, and exactly right.',
    badge: '✦ Spark',
    items: [
      'Café reservation — private curated table',
      'Fresh bouquet delivered to the table',
      'Custom 20-song playlist',
      'Dessert surprise box',
      'Date timeline document sent to you',
    ],
  },
  Romance: {
    price: '₹6,000', priceNum: 6000, advance: 3000,
    emoji: '🌹', color: '#e8476a',
    tagline: 'A proper full evening. Dinner, a moment, memories.',
    badge: '💫 Romance',
    items: [
      'Premium candlelit dinner reservation',
      'Personalised gift hamper',
      'Rose arrangement + handwritten card',
      'Activity pairing (pottery / paint & sip / stargazing)',
      'Candid photographer — 1 hour, 30 edited shots',
      'Full evening playlist + ambient setup',
    ],
  },
  Fairytale: {
    price: '₹9,000', priceNum: 9000, advance: 4500,
    emoji: '✨', color: '#a259ff',
    tagline: "A story so cinematic they'll tell it for years.",
    badge: '👑 Fairytale',
    items: [
      'Full-day itinerary — morning to midnight',
      'Luxury venue + décor (petals, fairy lights, balloons)',
      'Premium gift box — jewellery, perfume, or keepsake',
      '3-hour candid photographer — 80+ shots + Instagram reel',
      'Cab arrangement both ways, decorated',
      'Surprise element — flash mob, sky lanterns, or serenade',
      'Printed memory book delivered after the date',
    ],
  },
};

// ── VIBE CHIPS TOGGLE ─────────────────────────────────────────────
function toggleVibe(el) { el.classList.toggle('selected'); }

// ── URL HELPERS ───────────────────────────────────────────────────
function goToBook(plan) {
  window.location.href = `book.html${plan ? '?plan=' + plan : ''}`;
}

// ── INIT ON DOM READY ─────────────────────────────────────────────
document.addEventListener('DOMContentLoaded', () => {
  initReveal();
  startPetals();
});
