/* Renders the About page team cards and origin story from data/team.json.
 * If the file has no entries, the honest placeholder stays visible instead
 * of inventing staff. */
(function () {
  'use strict';

  function initials(name) {
    return name.split(/\s+/).filter(Boolean).slice(0, 2).map(function (w) {
      return w[0].toUpperCase();
    }).join('');
  }

  function esc(s) {
    return String(s == null ? '' : s)
      .replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;');
  }

  fetch('./data/team.json', { cache: 'no-cache' })
    .then(function (r) { return r.ok ? r.json() : null; })
    .then(function (data) {
      if (!data) return;

      var grid = document.getElementById('team-grid');
      var pending = document.getElementById('team-pending');
      var items = Array.isArray(data.items) ? data.items : [];

      if (grid && items.length) {
        grid.innerHTML = items.map(function (m) {
          var avatar = m.photo
            ? '<img src="' + esc(m.photo) + '" alt="' + esc(m.name) + '" loading="lazy" decoding="async" width="80" height="80">'
            : '<div class="team-avatar">' + esc(initials(m.name || '?')) + '</div>';
          var link = m.linkedin
            ? '<p style="margin-top:0.85rem;"><a href="' + esc(m.linkedin) + '" target="_blank" rel="noopener" style="color:var(--blue-400);font-size:0.85rem;font-weight:600;">LinkedIn &rarr;</a></p>'
            : '';
          return '<div class="team-card fade-up visible">' + avatar +
            '<h3>' + esc(m.name) + '</h3>' +
            '<div class="team-role">' + esc(m.role || '') + '</div>' +
            (m.bio ? '<p class="bio">' + esc(m.bio) + '</p>' : '') +
            link + '</div>';
        }).join('');
        grid.hidden = false;
        if (pending) pending.hidden = true;
      }

      var origin = data.origin || {};
      if (origin.enabled && origin.body) {
        var box = document.getElementById('origin-box');
        var head = document.getElementById('origin-heading');
        var body = document.getElementById('origin-body');
        if (box && body) {
          if (head) head.textContent = origin.heading || 'How this started';
          body.textContent = origin.body;
          box.hidden = false;
        }
      }
    })
    .catch(function () { /* placeholder stays visible, which is the honest default */ });
})();
