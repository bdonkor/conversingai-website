/* Homepage interactions: hero screenshot rotator, use-case tabs,
 * and the demo prompt chips. All progressive: the page works without it. */
(function () {
  'use strict';

  /* ------------------------------------------- hero screenshot rotator */
  var shots = [].slice.call(document.querySelectorAll('.hero-shot'));
  var dotsWrap = document.getElementById('hero-shot-dots');

  if (shots.length > 1 && dotsWrap) {
    var current = 0;
    var timer = null;
    var reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    shots.forEach(function (s, i) {
      var b = document.createElement('button');
      b.className = 'hero-shot-dot' + (i === 0 ? ' is-active' : '');
      b.type = 'button';
      b.setAttribute('role', 'tab');
      b.setAttribute('aria-selected', i === 0 ? 'true' : 'false');
      var cap = s.querySelector('figcaption');
      b.setAttribute('aria-label', cap ? cap.textContent.trim() : 'Preview ' + (i + 1));
      b.addEventListener('click', function () { show(i); restart(); });
      dotsWrap.appendChild(b);
    });

    var dots = [].slice.call(dotsWrap.children);

    function show(i) {
      current = i;
      shots.forEach(function (s, n) { s.classList.toggle('is-active', n === i); });
      dots.forEach(function (d, n) {
        d.classList.toggle('is-active', n === i);
        d.setAttribute('aria-selected', n === i ? 'true' : 'false');
      });
    }
    function next() { show((current + 1) % shots.length); }
    function restart() {
      if (reduce) return;
      clearInterval(timer);
      timer = setInterval(next, 4500);
    }
    restart();

    // pause while the pointer is over the shots
    var wrap = document.querySelector('.hero-shots');
    if (wrap) {
      wrap.addEventListener('mouseenter', function () { clearInterval(timer); });
      wrap.addEventListener('mouseleave', restart);
    }
    document.addEventListener('visibilitychange', function () {
      if (document.hidden) clearInterval(timer); else restart();
    });
  }

  /* ------------------------------------------------- use-case tabs */
  var tabs = [].slice.call(document.querySelectorAll('.uc-tab'));
  var panels = [].slice.call(document.querySelectorAll('.uc-panel'));

  function selectTab(key) {
    tabs.forEach(function (t) {
      var on = t.getAttribute('data-uc') === key;
      t.classList.toggle('is-active', on);
      t.setAttribute('aria-selected', on ? 'true' : 'false');
    });
    panels.forEach(function (p) {
      p.classList.toggle('is-active', p.getAttribute('data-uc') === key);
    });
  }

  tabs.forEach(function (t) {
    t.addEventListener('click', function () { selectTab(t.getAttribute('data-uc')); });
    t.addEventListener('keydown', function (e) {
      if (e.key !== 'ArrowRight' && e.key !== 'ArrowLeft') return;
      e.preventDefault();
      var i = tabs.indexOf(t);
      var n = e.key === 'ArrowRight' ? (i + 1) % tabs.length : (i - 1 + tabs.length) % tabs.length;
      tabs[n].focus();
      tabs[n].click();
    });
  });

  /* ------------------------------------- demo prompt chips, once configured */
  document.addEventListener('site-config-ready', function (e) {
    var cfg = e.detail || {};
    var agent = cfg.chatAgent || {};
    var list = document.getElementById('demo-prompts');
    if (!list || !agent.enabled || !Array.isArray(agent.tryAsking)) return;

    list.innerHTML = agent.tryAsking.map(function (q) {
      return '<li><button type="button">' + q.replace(/</g, '&lt;') + '</button></li>';
    }).join('');

    list.addEventListener('click', function (ev) {
      var btn = ev.target.closest('button');
      if (!btn) return;
      document.dispatchEvent(new CustomEvent('ask-agent', { detail: { question: btn.textContent } }));
    });
  });
})();
