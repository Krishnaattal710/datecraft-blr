/**
 * quiz.js
 * Date Match Quiz — 4-question personality assessment that recommends
 * a Spark / Romance / Fairytale plan based on the partner's vibe.
 *
 * Scoring: each answer awards points to one or more plan tiers.
 * The tier with the highest cumulative score wins.
 */

let _quizAnswers  = { Spark: 0, Romance: 0, Fairytale: 0 };
let _quizStep     = 0;
let _quizResult   = 'Romance';

/** Start the quiz — hides intro screen, shows first question. */
function startQuiz() {
  _quizStep   = 0;
  _quizAnswers = { Spark: 0, Romance: 0, Fairytale: 0 };

  document.getElementById('quizIntro').style.display    = 'none';
  document.getElementById('quizQuestion').style.display = 'block';
  document.getElementById('quizCard').classList.add('started');

  _renderQuestion();
}

/** Record an answer, advance to next question or show result. */
function quizAnswer(idx) {
  const scores = QUIZ[_quizStep].opts[idx].score;
  Object.entries(scores).forEach(([k, v]) => (_quizAnswers[k] += v));

  // Flash the selected option
  document.querySelectorAll('.quiz-opt')[idx].classList.add('selected');

  setTimeout(() => {
    _quizStep++;
    if (_quizStep >= QUIZ.length) _showResult();
    else _renderQuestion();
  }, 300);
}

/** Reset to intro screen. */
function restartQuiz() {
  document.getElementById('quizResult').classList.remove('show');
  document.getElementById('quizIntro').style.display    = 'block';
  document.getElementById('quizQuestion').style.display = 'none';
}

/**
 * Called from the "Book This Plan" button on the result screen.
 * Applies the recommended plan to the booking form and scrolls to it.
 */
function applyQuizPlan() {
  selectPlan(_quizResult.toLowerCase());
}

// ─── PRIVATE ─────────────────────────────────────────────────────────────────

function _renderQuestion() {
  const q = QUIZ[_quizStep];
  const pct = (_quizStep / QUIZ.length) * 100;

  document.getElementById('quizQLabel').textContent      = `Question ${_quizStep + 1} of ${QUIZ.length}`;
  document.getElementById('quizQText').textContent       = q.q;
  document.getElementById('quizProgFill').style.width    = pct + '%';
  document.getElementById('quizProgTxt').textContent     = `${_quizStep + 1} of ${QUIZ.length}`;

  document.getElementById('quizOptions').innerHTML = q.opts
    .map((o, i) =>
      `<button class="quiz-opt" onclick="quizAnswer(${i})">
        <span class="quiz-opt-emoji">${o.e}</span>
        <span>${o.t}</span>
      </button>`
    )
    .join('');
}

function _showResult() {
  document.getElementById('quizProgFill').style.width = '100%';
  document.getElementById('quizProgTxt').textContent  = 'Complete!';

  const winner = Object.entries(_quizAnswers).sort((a, b) => b[1] - a[1])[0][0];
  _quizResult  = winner;
  const res    = QUIZ_RESULTS[winner];

  setTimeout(() => {
    document.getElementById('quizQuestion').style.display = 'none';
    document.getElementById('quizResult').classList.add('show');
    document.getElementById('quizResultEmoji').textContent = res.emoji;
    document.getElementById('quizResultPlan').textContent  = `${winner} Plan`;
    document.getElementById('quizResultDesc').textContent  = res.desc;

    // Celebrate with petals
    for (let i = 0; i !== 10; i++) setTimeout(spawnPetal, i * 100);
  }, 400);
}
