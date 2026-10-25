/* Conversing AI — analytics and consent.
 *
 * Rules this file enforces:
 *   1. Nothing that can identify a visitor fires before they consent.
 *      GA4 is loaded in "denied" consent mode by default and only
 *      upgraded if the visitor says yes. The Meta Pixel does not load
 *      at all until then.
 *   2. UTMs are captured on first landing and attached to every form
 *      submission and chat lead, so a lead can be traced to its source.
 *   3. Every tracked event is listed in one place below.
 */
(function () {
  'use strict';

  var CONSENT_KEY = 'cai_consent_v1';
  var UTM_KEY = 'cai_utm_v1';

  /* ------------------------------------------------------------- UTMs */
  function captureUtms() {
    try {
      var params = new URLSearchParams(location.search);
      var keys = ['utm_source', 'utm_medium', 'utm_campaign', 'utm_term', 'utm_content', 'gclid', 'fbclid'];
      var found = {};
      keys.forEach(function (k) { if (params.get(k)) found[k] = params.get(k); });
      if (Object.keys(found).length) {
        found._landing = location.pathname;
        found._at = new Date().toISOString();
        localStorage.setItem(UTM_KEY, JSON.stringify(found));
      }
    } catch (e) {}
  }

  function getUtms() {
    try { return JSON.parse(localStorage.getItem(UTM_KEY) || '{}'); } catch (e) { return {}; }
  }

  // Attach stored UTMs to every form as hidden fields, so the lead
  // arrives knowing where it came from.
  function attachUtmsToForms() {
    var utms = getUtms();
    if (!Object.keys(utms).length) return;
    document.querySelectorAll('form').forEach(function (form) {
      Object.keys(utms).forEach(function (k) {
        if (form.querySelector('[name="' + k + '"]')) return;
        var i = document.createElement('input');
        i.type = 'hidden';
        i.name = k;
        i.value = utms[k];
        form.appendChild(i);
      });
    });
  }

  /* ---------------------------------------------------------- consent */
  function consentState() {
    try { return localStorage.getItem(CONSENT_KEY); } catch (e) { return null; }
  }

  function setConsent(value) {
    try { localStorage.setItem(CONSENT_KEY, value); } catch (e) {}
    if (value === 'granted') enableAnalytics();
    hideBanner();
  }

  function hideBanner() {
    var b = document.getElementById('consent-banner');
    if (b) b.remove();
  }

  function showBanner() {
    if (document.getElementById('consent-banner')) return;
    var el = document.createElement('div');
    el.id = 'consent-banner';
    el.className = 'consent-banner';
    el.setAttribute('role', 'dialog');
    el.setAttribute('aria-label', 'Cookie choices');
    el.innerHTML =
      '<p>We use analytics cookies to see which pages bring in enquiries. Nothing loads until you choose. ' +
      '<a href="cookies">What we store</a>.</p>' +
      '<div class="consent-actions">' +
      '<button type="button" data-consent="denied" class="consent-btn consent-btn--ghost">Essential only</button>' +
      '<button type="button" data-consent="granted" class="consent-btn">Allow analytics</button>' +
      '</div>';
    document.body.appendChild(el);
    el.addEventListener('click', function (e) {
      var b = e.target.closest('[data-consent]');
      if (b) setConsent(b.getAttribute('data-consent'));
    });
  }

  /* -------------------------------------------------------- analytics */
  var enabled = false;

  function enableAnalytics() {
    if (enabled) return;
    enabled = true;
    var cfg = (window.SITE_CONFIG || {}).analytics || {};

    if (window.gtag) {
      window.gtag('consent', 'update', {
        analytics_storage: 'granted',
        ad_storage: 'granted',
        ad_user_data: 'granted',
        ad_personalization: 'granted',
      });
    }

    // Meta Pixel, only once consent is given and only if an ID exists.
    if (cfg.metaPixel) {
      /* eslint-disable */
      !function(f,b,e,v,n,t,s){if(f.fbq)return;n=f.fbq=function(){n.callMethod?
      n.callMethod.apply(n,arguments):n.queue.push(arguments)};if(!f._fbq)f._fbq=n;
      n.push=n;n.loaded=!0;n.version='2.0';n.queue=[];t=b.createElement(e);t.async=!0;
      t.src=v;s=b.getElementsByTagName(e)[0];s.parentNode.insertBefore(t,s)}
      (window,document,'script','https://connect.facebook.net/en_US/fbevents.js');
      /* eslint-enable */
      window.fbq('init', cfg.metaPixel);
      window.fbq('track', 'PageView');
    }
  }

  /* ------------------------------------------------------------ events */
  function track(name, params) {
    var payload = Object.assign({}, params || {}, getUtms());
    if (window.gtag) window.gtag('event', name, payload);
    if (window.fbq) {
      var map = { quote_form_submit: 'Lead', booking_completed: 'Schedule', chat_lead_captured: 'Lead' };
      if (map[name]) window.fbq('track', map[name]);
    }
  }
  window.caiTrack = track;

  function wireEvents() {
    document.addEventListener('click', function (e) {
      var a = e.target.closest('a, button');
      if (!a) return;
      var href = a.getAttribute('href') || '';

      if (a.matches('[data-site="chat-launcher"], [data-opens-widget]')) track('chat_widget_open');
      else if (a.matches('[data-site="book-call"]')) track('book_call_open');
      else if (a.matches('[data-site="whatsapp"]') || /wa\.me/.test(href)) track('whatsapp_click');
      else if (a.matches('[data-social="facebook"]') || /facebook\.com/.test(href)) track('facebook_click');
      else if (a.closest('.pf-card') || a.closest('.ag-card')) {
        track('portfolio_click', { destination: href });
      }
    });

    document.addEventListener('submit', function (e) {
      if (e.target.tagName === 'FORM') track('quote_form_submit', { form_id: e.target.id || 'unnamed' });
    });

    if (document.getElementById('roi')) {
      var once = false;
      document.getElementById('roi').addEventListener('input', function () {
        if (!once) { once = true; track('roi_calculated'); }
      });
    }

    if (/\/pricing/.test(location.pathname)) track('pricing_view');
    document.addEventListener('ask-agent', function () { track('chat_conversation_start'); });
  }

  /* --------------------------------------------------------------- go */
  captureUtms();

  // GA4 starts denied; the gtag snippet in the page head already ran.
  if (window.gtag) {
    window.gtag('consent', 'default', {
      analytics_storage: 'denied',
      ad_storage: 'denied',
      ad_user_data: 'denied',
      ad_personalization: 'denied',
      wait_for_update: 500,
    });
  }

  document.addEventListener('DOMContentLoaded', function () {
    attachUtmsToForms();
    wireEvents();
    var state = consentState();
    if (state === 'granted') enableAnalytics();
    else if (state !== 'denied') showBanner();
  });
})();
