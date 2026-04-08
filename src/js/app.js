// ── CURSOR ──
const cursor = document.getElementById('cursor');
const cursorRing = document.getElementById('cursorRing');
document.addEventListener('mousemove', e => {
  cursor.style.left = e.clientX + 'px'; cursor.style.top = e.clientY + 'px';
  setTimeout(() => { cursorRing.style.left = e.clientX + 'px'; cursorRing.style.top = e.clientY + 'px'; }, 80);
});
function addCursorHover(sel) {
  document.querySelectorAll(sel).forEach(el => {
    el.addEventListener('mouseenter', () => { cursor.style.width='20px'; cursor.style.height='20px'; cursor.style.background='#ff7096'; });
    el.addEventListener('mouseleave', () => { cursor.style.width='12px'; cursor.style.height='12px'; cursor.style.background='#e8476a'; });
  });
}
addCursorHover('a,button,.plan-card,.gift-card,.venue-card,.plan-pick,.vibe-chip,.faq-q,.g-item,.quiz-opt,.msg-action-btn');

// ── MOBILE MENU ──
function toggleMobMenu() {
  document.getElementById('mobMenu').classList.toggle('open');
  document.body.style.overflow = document.getElementById('mobMenu').classList.contains('open') ? 'hidden' : '';
}

// ── PETALS ──
const PETALS = ['\uD83C\uDF38','\uD83C\uDF39','\uD83C\uDF3A','\u2764\uFE0F','\uD83D\uDC9E'];
const pc = document.getElementById('petalContainer');
function spawnPetal() {
  const p = document.createElement('div'); p.className = 'petal';
  p.textContent = PETALS[Math.floor(Math.random()*PETALS.length)];
  p.style.left = Math.random()*100 + 'vw'; p.style.fontSize = (10+Math.random()*14)+'px';
  const dur = 8+Math.random()*12; p.style.animationDuration = dur+'s'; p.style.animationDelay = Math.random()*-dur+'s';
  pc.appendChild(p); setTimeout(()=>p.remove(), dur*1000);
}
for(let i=0; i!==20; i++) spawnPetal();
setInterval(spawnPetal, 1400);

// ── SCROLL REVEAL ──
const revealObs = new IntersectionObserver(entries => {
  entries.forEach(e => { if(e.isIntersecting) e.target.classList.add('visible'); });
}, { threshold: 0.08 });
document.querySelectorAll('.reveal').forEach(el => revealObs.observe(el));
const tlObs = new IntersectionObserver(entries => {
  entries.forEach((e,i) => { if(e.isIntersecting) setTimeout(()=>e.target.classList.add('visible'), i*120); });
}, { threshold: 0.15 });
document.querySelectorAll('.tl-item').forEach(el => tlObs.observe(el));

// ── BOOKING PROGRESS BAR ──
let progressShown = false;
window.addEventListener('scroll', () => {
  const bp = document.getElementById('bookingProgress');
  if(window.scrollY > 400 && !progressShown) {
    progressShown = true; bp.classList.add('show');
  }
  // Update steps based on scroll position
  const plans = document.getElementById('plans');
  const builder = document.getElementById('builder');
  if(plans && window.scrollY > plans.offsetTop - 200) {
    document.getElementById('bpStep2').classList.add('active');
  }
  if(builder && window.scrollY > builder.offsetTop - 400) {
    document.getElementById('bpStep2').classList.add('done'); document.getElementById('bpStep2').querySelector('.bp-dot').textContent = '\u2713';
    document.getElementById('bpStep3').classList.add('active');
  }
});

// ── PLAN DATA ──
const PLAN_DATA = {
  Spark:     { price:'\u20B93,000', badge:'\u2746 Spark Plan',    emoji:'\u2615', items:['Caf\u00E9 reservation \u2014 curated ambience','Bouquet delivery at the table','Custom 20-song playlist','Dessert surprise box','Date timeline sent to you'] },
  Romance:   { price:'\u20B96,000', badge:'\uD83D\uDCAB Romance Plan', emoji:'\uD83C\uDF39', items:['Premium dinner reservation','Personalised gift hamper','Rose arrangement + card','Activity pairing','Candid photographer (1hr)','Full night playlist + setup'] },
  Fairytale: { price:'\u20B99,000', badge:'\uD83D\uDC51 Fairytale Plan', emoji:'\u2728', items:['Full-day itinerary','Luxury venue + d\u00E9cor','Premium gift box','3-hour photographer + reel','Cab arrangement (both ways)','Surprise element','Custom memory book'] },
};
let currentPlanName = 'Romance';

function pickPlan(el, name) {
  document.querySelectorAll('.plan-pick').forEach(p => p.classList.remove('selected'));
  el.classList.add('selected'); currentPlanName = name; updatePreviewPlan(name);
  document.getElementById('bpStep2').classList.add('done'); document.getElementById('bpStep2').querySelector('.bp-dot').textContent = '\u2713';
  document.getElementById('bpStep3').classList.add('active');
}
function selectPlan(plan) {
  document.getElementById('builder').scrollIntoView({behavior:'smooth'});
  setTimeout(() => {
    const map = {spark:0,romance:1,fairytale:2};
    document.querySelectorAll('.plan-pick').forEach(p => p.classList.remove('selected'));
    const capName = plan==='spark'?'Spark':plan==='romance'?'Romance':'Fairytale';
    const picks = document.querySelectorAll('.plan-pick');
    if(picks[map[plan]]) picks[map[plan]].classList.add('selected');
    currentPlanName = capName; updatePreviewPlan(capName);
  }, 600);
}
function updatePreviewPlan(name) {
  const d = PLAN_DATA[name]; if(!d) return;
  document.getElementById('pvBadge').textContent = d.badge;
  document.getElementById('pvBanner').textContent = d.emoji;
  document.getElementById('pvPrice').textContent = d.price;
  document.getElementById('pvItems').innerHTML = d.items.map(i => '<div class="preview-item"><div class="preview-item-dot"></div>'+i+'</div>').join('');
}
function updatePreview() {
  const name = document.getElementById('partnerName').value.trim();
  document.getElementById('pvName').textContent = name ? name+"'s Date \u2764\uFE0F" : 'Your Partner\'s Date';
  if(name) { document.getElementById('bpStep3').classList.add('active'); }
}
function toggleVibe(el) { el.classList.toggle('selected'); }

// ── DATE QUIZ ──
const QUIZ = [
  {
    q: 'When your partner has a free evening, they most want to...',
    opts: [
      { e:'\uD83C\uDF77', t:'Dress up, go somewhere fancy', score:{Fairytale:2} },
      { e:'\uD83C\uDFA8', t:'Try something creative together', score:{Romance:2} },
      { e:'\uD83D\uDECB\uFE0F', t:'Stay cozy, no big plans', score:{Spark:2} },
      { e:'\uD83C\uDF0D', t:'An adventure — somewhere new', score:{Fairytale:1,Romance:1} },
    ]
  },
  {
    q: 'What would make them happiest to receive as a gift?',
    opts: [
      { e:'\uD83D\uDC8D', t:'Something personalised and meaningful', score:{Fairytale:2} },
      { e:'\uD83C\uDF39', t:'Fresh flowers and a handwritten card', score:{Spark:2,Romance:1} },
      { e:'\uD83D\uDCF8', t:'Photos — memories they can keep', score:{Romance:2} },
      { e:'\u2728', t:'A full surprise they didn\'t see coming', score:{Fairytale:2} },
    ]
  },
  {
    q: 'How do they feel about being the centre of attention?',
    opts: [
      { e:'\uD83D\uDC4D', t:'They absolutely love it', score:{Fairytale:2} },
      { e:'\uD83D\uDE0A', t:'Fine with it if it\'s just the two of us', score:{Romance:2} },
      { e:'\uD83D\uDE33', t:'A little shy — keep it intimate', score:{Spark:2} },
      { e:'\uD83E\uDD14', t:'Depends on their mood', score:{Romance:1,Spark:1} },
    ]
  },
  {
    q: 'What\'s your budget for this date?',
    opts: [
      { e:'\uD83D\uDCB8', t:'Around \u20B93,000 — cozy and thoughtful', score:{Spark:3} },
      { e:'\uD83D\uDCB0', t:'\u20B96,000 — a proper full evening', score:{Romance:3} },
      { e:'\uD83C\uDF1F', t:'\u20B99,000 — nothing but the best', score:{Fairytale:3} },
      { e:'\uD83E\uDD37', t:'Not sure yet — show me options', score:{Romance:1} },
    ]
  }
];

const QUIZ_RESULTS = {
  Spark:     { emoji:'\u2615\uFE0F', desc:'Your partner sounds like someone who values warmth and intimacy over grand gestures. The Spark Plan was made for them \u2014 a private caf\u00E9 table, fresh flowers, soft music, and a dessert that says "I was thinking of you." Simple. Perfect. Them.' },
  Romance:   { emoji:'\uD83C\uDF39', desc:'Your partner loves a proper experience \u2014 good food, something to do together, and photos to remember it by. The Romance Plan covers all of it: a candlelit dinner, a curated activity, gifts, and a photographer to capture every reaction.' },
  Fairytale: { emoji:'\u2728', desc:'Your partner deserves the works. They\'d love a full-day cinematic experience \u2014 décor, surprises, the perfect gift, and 80+ photos of the whole thing. The Fairytale Plan turns an evening into a story they\'ll tell forever.' },
};

let quizAnswers = {Spark:0,Romance:0,Fairytale:0};
let quizStep = 0;
let quizResultPlan = 'Romance';

function startQuiz() {
  document.getElementById('quizIntro').style.display = 'none';
  document.getElementById('quizQuestion').style.display = 'block';
  document.getElementById('quizCard').classList.add('started');
  quizStep = 0; quizAnswers = {Spark:0,Romance:0,Fairytale:0};
  renderQuizQuestion();
}

function renderQuizQuestion() {
  const q = QUIZ[quizStep];
  document.getElementById('quizQLabel').textContent = 'Question '+(quizStep+1)+' of '+QUIZ.length;
  document.getElementById('quizQText').textContent = q.q;
  document.getElementById('quizProgFill').style.width = (quizStep/QUIZ.length*100)+'%';
  document.getElementById('quizProgTxt').textContent = (quizStep+1)+' of '+QUIZ.length;
  document.getElementById('quizOptions').innerHTML = q.opts.map((o,i) =>
    '<button class="quiz-opt" onclick="quizAnswer('+i+')"><span class="quiz-opt-emoji">'+o.e+'</span><span>'+o.t+'</span></button>'
  ).join('');
}

function quizAnswer(idx) {
  const scores = QUIZ[quizStep].opts[idx].score;
  Object.entries(scores).forEach(([k,v]) => quizAnswers[k] += v);
  // Flash selected
  document.querySelectorAll('.quiz-opt')[idx].classList.add('selected');
  setTimeout(() => {
    quizStep++;
    if(quizStep >= QUIZ.length) showQuizResult();
    else renderQuizQuestion();
  }, 320);
}

function showQuizResult() {
  document.getElementById('quizProgFill').style.width = '100%';
  document.getElementById('quizProgTxt').textContent = 'Complete!';
  const winner = Object.entries(quizAnswers).sort((a,b)=>b[1]-a[1])[0][0];
  quizResultPlan = winner;
  const res = QUIZ_RESULTS[winner];
  setTimeout(() => {
    document.getElementById('quizQuestion').style.display = 'none';
    const result = document.getElementById('quizResult');
    result.classList.add('show');
    document.getElementById('quizResultEmoji').textContent = res.emoji;
    document.getElementById('quizResultPlan').textContent = winner+' Plan';
    document.getElementById('quizResultDesc').textContent = res.desc;
    for(let i=0; i!==8; i++) setTimeout(spawnPetal, i*100);
  }, 400);
}

function restartQuiz() {
  document.getElementById('quizResult').classList.remove('show');
  document.getElementById('quizIntro').style.display = 'block';
  document.getElementById('quizQuestion').style.display = 'none';
}

function applyQuizPlan() {
  selectPlan(quizResultPlan.toLowerCase());
}

// ── SURPRISE MESSAGE GENERATOR ──
const MESSAGE_TEMPLATES = {
  Romantic: [
    "My dearest {to},\n\nI've been trying to find the right words for a while now. There's something about the way you {love} that makes everything else feel quiet \u2014 like the whole world slows down.\n\n{memory}. I hold that close.\n\nToday isn't about a grand gesture. It's about you knowing that I see you. Every version of you.\n\nWith everything I have,\n{from}",
    "To {to},\n\nIf I could bottle one thing about us, it would be this: the way we can be completely ordinary and it still feels like something. The {love} \u2014 that thing you don't even notice \u2014 I notice it every single time.\n\n{memory}. That's ours.\n\nHappy {occasion}. You deserve every bit of this.\n\nAlways yours,\n{from}",
  ],
  Funny: [
    "Hey {to},\n\nOkay so I planned this whole thing. Voluntarily. You're welcome.\n\nI could've just gotten you a card from the rack but you deserve better than Comic Sans and a cartoon balloon. The {love} \u2014 yes, I noticed. I notice everything, I'm just bad at saying it out loud.\n\n{memory} and honestly it's one of my favourites.\n\nHappy {occasion}! Don't cry. Actually, cry a little. It's fine.\n\n{from} (who definitely pulled this off)",
  ],
  Poetic: [
    "Dearest {to},\n\nThere are things the calendar can't hold \u2014 the particular quality of light on a day you changed something in me. The {love}. The {memory}.\n\nI am learning that love is not one moment. It is the accumulated weight of ordinary Tuesday evenings and the way you look when you don't know I'm watching.\n\nToday I give you a small proof of what you mean to me.\n\nWith all of it,\n{from}",
  ],
  'Short & Sweet': [
    "For {to},\n\nYou make everything better. The {love} \u2014 I think about that more than you know.\n\n{memory}. That's one of mine.\n\nHappy {occasion}. You deserve this and more.\n\nWith love,\n{from}",
  ],
};

let lastGeneratedMsg = '';

function generateMessage() {
  const from = document.getElementById('msgFromName').value.trim();
  const to = document.getElementById('msgToName').value.trim();
  const occasion = document.getElementById('msgOccasion').value;
  const love = document.getElementById('msgLove').value.trim();
  const memory = document.getElementById('msgMemory').value.trim();

  if(!from) { showToast('What\'s your name? \uD83D\uDC8C'); return; }
  if(!to)   { showToast('Their name? \uD83D\uDC97'); return; }
  if(!occasion) { showToast('What\'s the occasion? \uD83C\uDF89'); return; }

  const toneChip = document.querySelector('#message-gen .vibe-chip.selected');
  const tone = toneChip ? toneChip.textContent.trim().split(' ').slice(1).join(' ') : 'Romantic';
  const templates = MESSAGE_TEMPLATES[tone] || MESSAGE_TEMPLATES['Romantic'];
  let template = templates[Math.floor(Math.random()*templates.length)];

  const loveText = love || 'the way you make everything feel lighter';
  const memoryText = memory || 'I think about the little moments we\'ve had';
  const occasionText = occasion.replace('Her ','').replace('Our ','');

  let msg = template
    .replace(/{from}/g, from)
    .replace(/{to}/g, to)
    .replace(/{occasion}/g, occasionText)
    .replace(/{love}/g, loveText)
    .replace(/{memory}/g, memoryText);

  lastGeneratedMsg = msg;
  typewriterEffect(msg, from);
}

function typewriterEffect(msg, from) {
  const out = document.getElementById('msgOutput');
  const fromEl = document.getElementById('msgOutputFrom');
  const actions = document.getElementById('msgActions');

  out.innerHTML = '<span class="typing-cursor"></span>';
  fromEl.style.display = 'none';
  actions.style.display = 'none';

  // Split off the signature line
  const lines = msg.split('\n');
  const bodyLines = lines.slice(0,-2);
  const sigLine = lines.slice(-1)[0];
  const bodyText = bodyLines.join('\n');

  let i = 0; const speed = 18;
  const timer = setInterval(() => {
    if(i >= bodyText.length) {
      clearInterval(timer);
      out.innerHTML = '<span style="white-space:pre-wrap">'+bodyText+'</span>';
      fromEl.textContent = '— '+sigLine; fromEl.style.display = 'block';
      actions.style.display = 'flex';
      return;
    }
    out.innerHTML = '<span style="white-space:pre-wrap">'+bodyText.slice(0,i)+'</span><span class="typing-cursor"></span>';
    i += 2;
  }, speed);
}

function copyMessage() {
  if(navigator.clipboard) navigator.clipboard.writeText(lastGeneratedMsg).then(()=>showToast('\uD83D\uDCCB Copied to clipboard!'));
}

function regenerateMessage() { generateMessage(); }

function sendMsgWA() {
  window.open('https://wa.me/?text='+encodeURIComponent(lastGeneratedMsg), '_blank');
}

// ── SUBMIT ──
let currentWaMsg = '';
function submitPlan() {
  const yourName    = document.getElementById('yourName').value.trim();
  const yourPhone   = document.getElementById('yourPhone').value.trim();
  const partnerName = document.getElementById('partnerName').value.trim();
  const occasion    = document.getElementById('occasion').value;
  const date        = document.getElementById('dateOfPlan').value;
  const food        = document.getElementById('foodPref').value;
  const note        = document.getElementById('specialNote').value.trim();
  const vibes       = [...document.querySelectorAll('#builder .vibe-chip.selected')].map(v=>v.textContent.trim()).join(', ');

  if(!yourName)    { shake('yourName');    showToast('Please enter your name \uD83D\uDC8C'); return; }
  if(!yourPhone)   { shake('yourPhone');   showToast('We need your WhatsApp number \uD83D\uDCF1'); return; }
  if(!partnerName) { shake('partnerName'); showToast("What's your partner's name? \uD83D\uDC97"); return; }
  if(!occasion)    { showToast("What's the occasion? \uD83C\uDF89"); return; }
  if(!date)        { showToast('Pick a date for the plan \uD83D\uDCC5'); return; }

  const fmtDate = new Date(date).toLocaleDateString('en-IN',{weekday:'long',month:'long',day:'numeric'});
  const plan = PLAN_DATA[currentPlanName];

  document.getElementById('successPlan').textContent = partnerName+"\u2019s "+currentPlanName+" Date \u2014 "+fmtDate;

  currentWaMsg =
    "Hi DateCraft! \uD83C\uDF39 Booking request:\n\n" +
    "\uD83D\uDC64 Name: "+yourName+"\n\uD83D\uDCF1 WhatsApp: "+yourPhone+
    "\n\uD83C\uDF89 Occasion: "+occasion+"\n\uD83D\uDCC5 Date: "+fmtDate+
    "\n\uD83D\uDCB0 Plan: "+currentPlanName+" ("+plan.price+")"+
    "\n\uD83D\uDC97 Partner: "+partnerName+
    (vibes?"\n\u2728 Vibe: "+vibes:"")+
    (food?"\n\uD83C\uDF7D Food: "+food:"")+
    (note?"\n\uD83D\uDCDD Notes: "+note:"")+
    "\n\nPlease confirm! \uD83D\uDE4F";

  document.getElementById('waSuccessMsg').textContent = currentWaMsg;
  document.getElementById('successOv').classList.add('show');
  document.body.style.overflow = 'hidden';

  // Update progress
  document.getElementById('bpStep3').classList.add('done'); document.getElementById('bpStep3').querySelector('.bp-dot').textContent='\u2713';
  document.getElementById('bpStep4').classList.add('active');

  for(let i=0; i!==30; i++) setTimeout(spawnPetal, i*70);
}

function sendSuccessWA() {
  window.open('https://wa.me/919999999999?text='+encodeURIComponent(currentWaMsg),'_blank');
  document.getElementById('successOv').classList.remove('show');
  document.body.style.overflow = '';
  showToast('\u2705 WhatsApp opened \u2014 just hit Send!');
  // Mark complete
  document.getElementById('bpStep4').classList.add('done'); document.getElementById('bpStep4').querySelector('.bp-dot').textContent='\u2713';
}

// ── SHAKE ──
function shake(id) {
  const el = document.getElementById(id); el.style.animation='none'; el.offsetHeight;
  el.style.animation='shakeInput 0.4s ease'; setTimeout(()=>el.style.animation='',500);
}
const ss = document.createElement('style');
ss.textContent='@keyframes shakeInput{0%,100%{transform:translateX(0)}25%{transform:translateX(-8px)}75%{transform:translateX(8px)}}';
document.head.appendChild(ss);

// ── TOAST ──
function showToast(msg) {
  let t = document.getElementById('toastEl');
  if(!t) {
    t = document.createElement('div'); t.id='toastEl';
    t.style.cssText='position:fixed;bottom:90px;left:50%;transform:translateX(-50%) translateY(80px);background:#1a0e2a;border:1px solid rgba(232,71,106,0.3);border-radius:14px;padding:14px 24px;font-size:14px;font-weight:500;color:#f5efe8;z-index:999;transition:transform 0.4s cubic-bezier(0.34,1.56,0.64,1);white-space:nowrap;box-shadow:0 8px 32px rgba(0,0,0,0.4)';
    document.body.appendChild(t);
  }
  t.textContent = msg;
  t.style.transform='translateX(-50%) translateY(0)';
  setTimeout(()=>t.style.transform='translateX(-50%) translateY(80px)', 2800);
}

// ── FAQ ──
function toggleFaq(el) {
  const item = el.parentElement; const isOpen = item.classList.contains('open');
  document.querySelectorAll('.faq-item.open').forEach(i=>i.classList.remove('open'));
  if(!isOpen) item.classList.add('open');
}

// ── AI PLANNER ──
const AI_RESPONSES = [
  { triggers:['budget','cheap','3000','3k','spark','less'],
    reply:"For a beautiful intimate date, the **Spark Plan (\u20B93,000)** is perfect! \uD83C\uDF1F\n\nA curated caf\u00E9 table, fresh bouquet, custom playlist, and a dessert surprise. Simple, thoughtful, and exactly right. Want me to suggest some cozy caf\u00E9s in Bengaluru?" },
  { triggers:['photographer','photo','memory','capture','pictures'],
    reply:"Great thinking! Both **Romance (\u20B96,000)** and **Fairytale (\u20B99,000)** include a professional photographer \u2014 1 hour for Romance (30 edited shots) and 3 hours for Fairytale (80+ shots + a reel). Which feels right for your occasion?" },
  { triggers:['proposal','propose','ring','marry','engagement'],
    reply:"This is THE moment! \uD83D\uDC8D\u2728\n\nGo **Fairytale (\u20B99,000)** \u2014 full-day planning, luxury d\u00E9cor, 3-hour photographer to capture the ring moment, and a surprise element. The memory book arrives printed afterwards. This is the one!" },
  { triggers:['birthday','bday'],
    reply:"Birthdays deserve the full treatment! \uD83C\uDF82\n\n**Romance (\u20B96,000)** \u2014 premium dinner, personalised gifts, and a photographer to capture every reaction. For a big milestone, go **Fairytale** for d\u00E9cor, surprises, and a memory book. Which age is it?" },
  { triggers:['introvert','quiet','shy','private','cozy','homebody','small'],
    reply:"For someone who loves quiet and intimate moments, the **Spark Plan** is ideal \uD83C\uDF1F\n\nA private caf\u00E9 corner, soft music, flowers, no crowds. Or the **Romance** plan with pottery or painting \u2014 no loud venues. Want some cozy, low-key spot suggestions?" },
  { triggers:['anniversary','year','together','relationship'],
    reply:"Anniversaries deserve something meaningful \uD83C\uDF39\n\nFor 1st/2nd anniversary \u2014 **Romance (\u20B96,000)**. For 5th, 10th, or a milestone \u2014 **Fairytale (\u20B99,000)** all the way. We can even recreate your first date location! What year are you celebrating?" },
  { triggers:['outdoor','nature','park','picnic','fresh air','sunset','rooftop'],
    reply:"Love the outdoor vibe! \uD83C\uDF05 We can plan:\n\n\u2022 A sunset picnic at Cubbon Park\n\u2022 A rooftop dinner at Skyye (UB City)\n\u2022 A stargazing evening on a resort terrace\n\nAll available in **Romance** or **Fairytale**. What time of day do they love most?" },
  { triggers:['compare','difference','which','choose','what','plan'],
    reply:"Here's the quick breakdown:\n\n\u2022 **Spark (\u20B93,000)** \u2014 Caf\u00E9 + flowers + playlist + dessert. Perfect for intimate dates.\n\u2022 **Romance (\u20B96,000)** \u2014 Dinner + gifts + activity + photographer. A full evening.\n\u2022 **Fairytale (\u20B99,000)** \u2014 Full day, d\u00E9cor, luxury gifts, 3hr photographer + surprise.\n\nOr take our 60-second **Date Quiz** above \u2014 it'll pick for you!" },
];
const DEFAULT_AI = [
  "Tell me more! What's the occasion \u2014 birthday, anniversary, or just a surprise? \uD83C\uDF39",
  "That sounds lovely! Does your partner prefer cozy and intimate, or grand and adventurous? \uD83D\uDCA1",
  "What's your rough budget \u2014 around \u20B93K, \u20B96K, or \u20B99K? That helps me pick the right plan. \uD83D\uDCB8",
  "Interesting! What kind of food does your partner love? Helps me pick the right venue. \uD83C\uDF7D",
  "You can also scroll up and try our **Date Match Quiz** \u2014 it finds the perfect plan based on their personality! \uD83C\uDF1F",
];
let aiTurn = 0;

function sendAiMsg() {
  const input = document.getElementById('aiInput');
  const msg = input.value.trim(); if(!msg) return;
  input.value = ''; addAiMsg(msg,'user');
  const typing = document.getElementById('aiTyping'); typing.classList.add('show');
  setTimeout(() => {
    typing.classList.remove('show');
    const lower = msg.toLowerCase(); let reply = null;
    for(const r of AI_RESPONSES) { if(r.triggers.some(t=>lower.includes(t))) { reply=r.reply; break; } }
    if(!reply) { reply = DEFAULT_AI[aiTurn % DEFAULT_AI.length]; aiTurn++; }
    addAiMsg(reply,'bot');
  }, 1000+Math.random()*700);
}

function addAiMsg(text,type) {
  const chat = document.getElementById('aiChat');
  const div = document.createElement('div'); div.className='ai-msg '+type;
  div.innerHTML = text.replace(/\*\*([^*]+)\*\*/g,'<b>$1</b>').replace(/\n/g,'<br>');
  chat.appendChild(div); chat.scrollTop = chat.scrollHeight;
}

// ── NAV SCROLL ──
window.addEventListener('scroll', () => {
  document.querySelector('nav').style.background = window.scrollY > 50 ? 'rgba(8,6,16,0.97)' : 'linear-gradient(to bottom, rgba(8,6,16,0.95), transparent)';
});

// ── ANCHOR SCROLL ──
document.querySelectorAll('a[href^="#"]').forEach(a => {
  a.addEventListener('click', function(e) {
    const t = document.querySelector(this.getAttribute('href'));
    if(t) { e.preventDefault(); t.scrollIntoView({behavior:'smooth',block:'start'}); }
  });
});

// ── SUCCESS BACKDROP CLOSE ──
document.getElementById('successOv').addEventListener('click', function(e) {
  if(e.target===this) { this.classList.remove('show'); document.body.style.overflow=''; }
});

// ── INIT ──
document.getElementById('dateOfPlan').min = new Date().toISOString().split('T')[0];
updatePreviewPlan('Romance');