/* ROI calculator for the AI chat agent.
 *
 * Deliberately conservative and transparent: it shows the arithmetic, uses
 * the visitor's own numbers, and never claims a saving the inputs do not
 * support. No dependencies. */
(function () {
  'use strict';

  var form = document.getElementById('roi');
  if (!form) return;

  var out = {
    hours: document.getElementById('roi-hours'),
    cost: document.getElementById('roi-cost'),
    leads: document.getElementById('roi-leads'),
    summary: document.getElementById('roi-summary'),
  };

  function num(id, fallback) {
    var el = document.getElementById(id);
    if (!el) return fallback;
    var v = parseFloat(el.value);
    return isNaN(v) || v < 0 ? fallback : v;
  }

  function fmt(n) {
    return n.toLocaleString(undefined, { maximumFractionDigits: 0 });
  }

  function calc() {
    var msgs = num('roi-msgs', 0);          // customer messages per month
    var mins = num('roi-mins', 0);          // minutes per reply
    var rate = num('roi-rate', 0);          // staff cost per hour
    var missedPct = num('roi-missed', 0);   // % of leads missed after hours

    // An agent does not remove every message. We assume it fully handles
    // the routine share and still escalates the rest to a person.
    var HANDLED = 0.7;

    var handled = msgs * HANDLED;
    var hoursSaved = (handled * mins) / 60;
    var costSaved = hoursSaved * rate;

    // Of the enquiries currently missed after hours, an always-on agent
    // captures the contact details for most of them.
    var CAPTURED = 0.6;
    var missedLeads = msgs * (missedPct / 100);
    var extraLeads = missedLeads * CAPTURED;

    if (out.hours) out.hours.textContent = fmt(hoursSaved);
    if (out.cost) out.cost.textContent = fmt(costSaved);
    if (out.leads) out.leads.textContent = fmt(extraLeads);

    if (out.summary) {
      if (!msgs || !mins) {
        out.summary.textContent = 'Enter your numbers above to see an estimate.';
      } else {
        out.summary.textContent =
          'Based on ' + fmt(msgs) + ' messages a month, assuming an agent fully handles ' +
          Math.round(HANDLED * 100) + '% of them and captures ' + Math.round(CAPTURED * 100) +
          '% of the enquiries you currently miss. Compare that with the monthly plan price.';
      }
    }
  }

  form.addEventListener('input', calc);
  form.addEventListener('change', calc);
  calc();
})();
