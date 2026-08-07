/* LettersReady "Did you know?" popup — shows on any page ~10s after load, dismissible (remembered). */
(function () {
  'use strict';

  // Popup master switch — set to true to bring the popup back.
  var ENABLED = false;
  if (!ENABLED) return;

  var KEY = 'cai_letters_popup_dismissed';
  try { if (localStorage.getItem(KEY)) return; } catch (e) {}

  var css =
    '.letters-popup{position:fixed;right:1.25rem;bottom:1.25rem;z-index:1000;width:210px;max-width:calc(100vw - 2rem);text-align:center;' +
    "background:linear-gradient(160deg,#5c1a30 0%,#3a0e1c 100%);-webkit-backdrop-filter:blur(12px);backdrop-filter:blur(12px);" +
    'border:1px solid rgba(255,255,255,0.14);border-radius:0.85rem;padding:0.85rem 1rem 0.95rem;box-shadow:0 18px 45px rgba(0,0,0,0.5);' +
    "color:#fff;font-family:'Inter',system-ui,sans-serif;transform:translateY(160%);opacity:0;pointer-events:none;" +
    'transition:transform 0.55s cubic-bezier(0.16,1,0.3,1),opacity 0.45s ease;}' +
    '.letters-popup.show{transform:translateY(0);opacity:1;pointer-events:auto;}' +
    '.letters-popup-close{position:absolute;top:0.25rem;right:0.4rem;background:none;border:none;color:rgba(255,255,255,0.55);' +
    'font-size:1.15rem;line-height:1;cursor:pointer;padding:0.1rem 0.3rem;}' +
    '.letters-popup-close:hover{color:#fff;}' +
    '.letters-popup-eyebrow{color:#f4b8c8;font-weight:800;font-size:0.76rem;margin-bottom:0.25rem;}' +
    '.letters-popup-text{color:rgba(255,255,255,0.9);font-size:0.74rem;line-height:1.38;margin-bottom:0.6rem;}' +
    '.letters-popup-cta{display:inline-flex;align-items:center;gap:0.3rem;background:#fff;color:#4a1020;font-weight:700;' +
    'font-size:0.73rem;padding:0.38rem 0.85rem;border-radius:0.5rem;text-decoration:none;transition:background 0.2s,transform 0.2s;}' +
    '.letters-popup-cta:hover{background:rgba(255,255,255,0.88);transform:translateY(-1px);}' +
    '@media (max-width:480px){.letters-popup{right:1rem;left:1rem;bottom:1rem;width:auto;}}' +
    '@media (prefers-reduced-motion:reduce){.letters-popup{transition:opacity 0.3s ease;transform:none;}}';

  var style = document.createElement('style');
  style.textContent = css;
  (document.head || document.documentElement).appendChild(style);

  var popup = document.createElement('div');
  popup.id = 'letters-popup';
  popup.className = 'letters-popup';
  popup.setAttribute('role', 'dialog');
  popup.setAttribute('aria-label', 'Did you know?');
  popup.setAttribute('aria-hidden', 'true');
  popup.innerHTML =
    '<button type="button" class="letters-popup-close" aria-label="Close">&times;</button>' +
    '<div class="letters-popup-eyebrow">✍️ Did you know?</div>' +
    '<p class="letters-popup-text">You can write or reply to any letter instantly.</p>' +
    '<a href="https://lettersready.conversingai.com" target="_blank" rel="noopener" class="letters-popup-cta">Try It Today →</a>';

  function remember() { try { localStorage.setItem(KEY, '1'); } catch (e) {} }

  function init() {
    document.body.appendChild(popup);
    popup.querySelector('.letters-popup-close').addEventListener('click', function () {
      popup.classList.remove('show');
      popup.setAttribute('aria-hidden', 'true');
      remember();
    });
    popup.querySelector('.letters-popup-cta').addEventListener('click', remember);
    setTimeout(function () {
      popup.classList.add('show');
      popup.setAttribute('aria-hidden', 'false');
    }, 10000);
  }

  if (document.body) init();
  else document.addEventListener('DOMContentLoaded', init);
})();
