/* Portfolio filter tabs: All / Websites / Web apps / With an AI agent.
 *
 * The cards are rendered statically by tools/build.cjs, so they are visible
 * to search engines and to anyone with JavaScript off. This file only adds
 * filtering on top. */
(function () {
  'use strict';

  var grid = document.getElementById('pf-grid');
  if (!grid) return;

  var filters = document.querySelectorAll('.pf-filter');
  if (!filters.length) return;

  var cards = [].slice.call(grid.querySelectorAll('.pf-card'));

  function apply(mode) {
    var shown = 0;
    cards.forEach(function (c) {
      var match =
        mode === 'all' ? true :
        mode === 'agent' ? c.getAttribute('data-agent') === 'yes' :
        c.getAttribute('data-category') === mode;
      c.hidden = !match;
      if (match) shown++;
    });

    var empty = document.getElementById('pf-empty');
    if (empty) empty.hidden = shown > 0;
  }

  filters.forEach(function (btn) {
    btn.addEventListener('click', function () {
      filters.forEach(function (b) {
        b.classList.remove('is-active');
        b.setAttribute('aria-selected', 'false');
      });
      btn.classList.add('is-active');
      btn.setAttribute('aria-selected', 'true');
      apply(btn.getAttribute('data-filter'));
    });

    // keyboard support for the tablist
    btn.addEventListener('keydown', function (e) {
      if (e.key !== 'ArrowRight' && e.key !== 'ArrowLeft') return;
      e.preventDefault();
      var list = [].slice.call(filters);
      var i = list.indexOf(btn);
      var next = e.key === 'ArrowRight' ? (i + 1) % list.length : (i - 1 + list.length) % list.length;
      list[next].focus();
      list[next].click();
    });
  });
})();
