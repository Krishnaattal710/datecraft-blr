/**
 * utils.js
 * Shared utility helpers — DOM, animation, formatting, clipboard.
 */

/**
 * Typewriter effect — renders text character-by-character into an element.
 * @param {string}      text     — full string to type
 * @param {HTMLElement} el       — target element
 * @param {number}      speed    — ms between characters (default 18)
 * @param {Function}    onDone   — callback when complete
 */
function typewriter(text, el, speed = 18, onDone) {
  let i = 0;
  el.innerHTML = '<span class="typing-cursor"></span>';
  const timer = setInterval(() => {
    if (i >= text.length) {
      clearInterval(timer);
      el.innerHTML = `<span style="white-space:pre-wrap">${text}</span>`;
      if (onDone) onDone();
      return;
    }
    el.innerHTML = `<span style="white-space:pre-wrap">${text.slice(0, i)}</span><span class="typing-cursor"></span>`;
    i += 2;
  }, speed);
}

/**
 * Shake animation on a form field to signal validation error.
 * @param {string} id — element ID
 */
function shake(id) {
  const el = document.getElementById(id);
  el.style.animation = 'none';
  el.offsetHeight; // force reflow
  el.style.animation = 'shakeInput 0.4s ease';
  setTimeout(() => (el.style.animation = ''), 500);
}

/**
 * Show a temporary toast notification.
 * @param {string} msg
 */
function showToast(msg) {
  let t = document.getElementById('toastEl');
  if (!t) {
    t = document.createElement('div');
    t.id = 'toastEl';
    t.style.cssText =
      'position:fixed;bottom:90px;left:50%;transform:translateX(-50%) translateY(80px);' +
      'background:#1a0e2a;border:1px solid rgba(232,71,106,0.3);border-radius:14px;' +
      'padding:14px 24px;font-size:14px;font-weight:500;color:#f5efe8;z-index:999;' +
      'transition:transform 0.4s cubic-bezier(0.34,1.56,0.64,1);white-space:nowrap;' +
      'box-shadow:0 8px 32px rgba(0,0,0,0.4)';
    document.body.appendChild(t);
  }
  t.textContent = msg;
  t.style.transform = 'translateX(-50%) translateY(0)';
  setTimeout(() => (t.style.transform = 'translateX(-50%) translateY(80px)'), 2800);
}

/**
 * Copy a string to the clipboard and show a toast.
 * @param {string} text
 */
function copyToClipboard(text) {
  if (navigator.clipboard) {
    navigator.clipboard.writeText(text).then(() => showToast('📋 Copied to clipboard!'));
  } else {
    // Fallback for older browsers
    const ta = document.createElement('textarea');
    ta.value = text; document.body.appendChild(ta);
    ta.select(); document.execCommand('copy');
    document.body.removeChild(ta);
    showToast('📋 Copied!');
  }
}

/**
 * Open a pre-filled WhatsApp message.
 * @param {string} phone   — E.164 format without +, e.g. "919999999999"
 * @param {string} message — plain text message
 */
function openWhatsApp(phone, message) {
  const url = `https://wa.me/${phone}?text=${encodeURIComponent(message)}`;
  window.open(url, '_blank');
}

/**
 * Inject shake keyframes once into document head.
 */
(function injectShakeKeyframes() {
  const style = document.createElement('style');
  style.textContent =
    '@keyframes shakeInput{0%,100%{transform:translateX(0)}25%{transform:translateX(-8px)}75%{transform:translateX(8px)}}';
  document.head.appendChild(style);
})();
