/* Conversing AI — site config loader.
 *
 * Reads config/site.json and fills in anything that must stay in one place:
 * footer social icons, the copyright year, contact details, channel badges
 * and the WhatsApp button.
 *
 * Design rule: an empty value HIDES its element rather than rendering a
 * placeholder or a dead "#" link. The site must never show a link that
 * goes nowhere.
 */
(function () {
  'use strict';

  var CONFIG_URL = './config/site.json';

  // Set the copyright year immediately; it needs no network.
  function setYear() {
    var y = new Date().getFullYear();
    document.querySelectorAll('[data-site="year"]').forEach(function (el) {
      el.textContent = y;
    });
  }

  function text(el, value) {
    if (value) { el.textContent = value; el.hidden = false; }
    else { el.hidden = true; }
  }

  function applySocials(cfg) {
    var social = cfg.social || {};
    document.querySelectorAll('[data-social]').forEach(function (el) {
      var key = el.getAttribute('data-social');
      var url = social[key];
      if (url) {
        el.setAttribute('href', url);
        el.setAttribute('target', '_blank');
        el.setAttribute('rel', 'noopener');
        el.hidden = false;
      } else {
        // No URL supplied: remove it rather than leave an icon linking to "#".
        el.remove();
      }
    });
  }

  function applyContact(cfg) {
    var b = cfg.business || {};

    document.querySelectorAll('[data-site="email"]').forEach(function (el) {
      if (b.email) { el.setAttribute('href', 'mailto:' + b.email); el.textContent = b.email; }
    });

    document.querySelectorAll('[data-site="phone"]').forEach(function (el) {
      if (b.phone) {
        el.setAttribute('href', 'tel:' + b.phone);
        el.textContent = b.phoneDisplay || b.phone;
        var wrap = el.closest('[data-site-wrap]');
        if (wrap) wrap.hidden = false;
      } else {
        var w = el.closest('[data-site-wrap]') || el;
        w.hidden = true;
      }
    });

    document.querySelectorAll('[data-site="hours"]').forEach(function (el) {
      var v = b.hours ? b.hours + (b.timezone ? ' (' + b.timezone + ')' : '') : '';
      var wrap = el.closest('[data-site-wrap]') || el;
      if (v) { el.textContent = v; wrap.hidden = false; } else { wrap.hidden = true; }
    });

    document.querySelectorAll('[data-site="location"]').forEach(function (el) {
      var v = b.location || (b.registeredIn ? 'Registered in ' + b.registeredIn : '');
      var wrap = el.closest('[data-site-wrap]') || el;
      if (v) { el.textContent = v; wrap.hidden = false; } else { wrap.hidden = true; }
    });

    // Floating / inline WhatsApp buttons for reaching a HUMAN, never an agent.
    document.querySelectorAll('[data-site="whatsapp"]').forEach(function (el) {
      if (b.whatsapp) {
        var msg = encodeURIComponent(b.whatsappMessage || '');
        el.setAttribute('href', 'https://wa.me/' + b.whatsapp + (msg ? '?text=' + msg : ''));
        el.setAttribute('target', '_blank');
        el.setAttribute('rel', 'noopener');
        el.hidden = false;
      } else {
        el.remove();
      }
    });
  }

  /* Channel badges. Agents run on websites only today; WhatsApp, Messenger
   * and Instagram are "coming soon". One value in config flips every badge,
   * the pricing row and the FAQ answer together. */
  function applyChannels(cfg) {
    var ch = cfg.channels || {};
    var labels = cfg.channelLabels || {};

    document.querySelectorAll('[data-channel]').forEach(function (el) {
      var key = el.getAttribute('data-channel');
      var state = ch[key] || 'soon';
      el.setAttribute('data-channel-state', state);
      var nameEl = el.querySelector('[data-channel-name]');
      if (nameEl) nameEl.textContent = labels[key] || key;
      var stateEl = el.querySelector('[data-channel-state-label]');
      if (stateEl) stateEl.textContent = state === 'live' ? 'Live' : 'Coming soon';
    });

    // Prose sentence listing which channels are live vs coming.
    var live = [], soon = [];
    Object.keys(ch).forEach(function (k) {
      (ch[k] === 'live' ? live : soon).push(labels[k] || k);
    });
    document.querySelectorAll('[data-channels-sentence]').forEach(function (el) {
      var parts = [];
      if (live.length) parts.push('Available today on ' + list(live) + '.');
      if (soon.length) parts.push(list(soon) + (soon.length > 1 ? ' are' : ' is') + ' coming soon, and you can join the waitlist.');
      el.textContent = parts.join(' ');
    });
  }

  function list(arr) {
    if (arr.length <= 1) return arr[0] || '';
    return arr.slice(0, -1).join(', ') + ' and ' + arr[arr.length - 1];
  }

  function applyChatAgent(cfg) {
    var a = cfg.chatAgent || {};
    document.querySelectorAll('[data-site="chat-launcher"]').forEach(function (el) {
      if (!a.enabled) {
        // No provider configured yet: send people to the contact page rather
        // than opening a widget that does not exist.
        el.setAttribute('href', 'contact');
        el.removeAttribute('data-opens-widget');
      }
    });
    document.querySelectorAll('[data-site="demo-pending"]').forEach(function (el) {
      el.hidden = !!a.enabled;
    });
    document.querySelectorAll('[data-site="demo-live"]').forEach(function (el) {
      el.hidden = !a.enabled;
    });
  }

  function applyBooking(cfg) {
    var bk = cfg.booking || {};
    document.querySelectorAll('[data-site="book-call"]').forEach(function (el) {
      if (bk.enabled && bk.url) {
        el.setAttribute('href', bk.url);
        el.setAttribute('target', '_blank');
        el.setAttribute('rel', 'noopener');
      } else {
        el.setAttribute('href', (cfg.forms && cfg.forms.quoteUrl) || 'contact');
      }
    });
  }

  function applyGuarantee(cfg) {
    var g = cfg.guarantee || {};
    document.querySelectorAll('[data-site="guarantee"]').forEach(function (el) {
      if (g.enabled && g.title) {
        var t = el.querySelector('[data-site="guarantee-title"]');
        var b = el.querySelector('[data-site="guarantee-body"]');
        if (t) t.textContent = g.title;
        if (b) b.textContent = g.body || '';
        el.hidden = false;
      } else {
        el.hidden = true;
      }
    });
  }

  /* Maintenance notice. Deliberately a banner, not a blocked site: the
   * portfolio stays visible to prospects and nothing is deindexed while
   * the owner keeps building. Dismissed state is remembered per browser. */
  function applyMaintenance(cfg) {
    var m = cfg.maintenance || {};
    if (!m.enabled || !m.message) return;

    var KEY = 'cai_maint_dismissed_v1';
    try {
      if (m.dismissible && localStorage.getItem(KEY) === m.message) return;
    } catch (e) {}

    var bar = document.createElement('div');
    bar.className = 'maint-bar';
    bar.setAttribute('role', 'status');

    var text = '<span class="maint-dot" aria-hidden="true"></span><span class="maint-msg">' +
      String(m.message).replace(/</g, '&lt;') + '</span>';
    if (m.linkText && m.linkHref) {
      text += ' <a class="maint-link" href="' + String(m.linkHref).replace(/"/g, '&quot;') + '">' +
        String(m.linkText).replace(/</g, '&lt;') + ' &rarr;</a>';
    }
    if (m.dismissible) {
      text += '<button type="button" class="maint-close" aria-label="Dismiss this notice">&times;</button>';
    }
    bar.innerHTML = text;

    document.body.insertBefore(bar, document.body.firstChild);
    document.body.classList.add('has-maint-bar');

    var btn = bar.querySelector('.maint-close');
    if (btn) {
      btn.addEventListener('click', function () {
        bar.remove();
        document.body.classList.remove('has-maint-bar');
        try { localStorage.setItem(KEY, m.message); } catch (e) {}
      });
    }
  }

  setYear();

  fetch(CONFIG_URL, { cache: 'no-cache' })
    .then(function (r) { return r.ok ? r.json() : null; })
    .then(function (cfg) {
      if (!cfg) return;
      window.SITE_CONFIG = cfg;
      applyMaintenance(cfg);
      applySocials(cfg);
      applyContact(cfg);
      applyChannels(cfg);
      applyChatAgent(cfg);
      applyBooking(cfg);
      applyGuarantee(cfg);
      document.dispatchEvent(new CustomEvent('site-config-ready', { detail: cfg }));
    })
    .catch(function () {
      /* Config unreachable: leave the HTML as authored. Nothing breaks,
       * because every element has a sensible static fallback. */
    });
})();
