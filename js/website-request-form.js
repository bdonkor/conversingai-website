/* Website Development Request Form — submit via Web3Forms (email delivery) */
(function () {
  'use strict';

  var ACCESS_KEY = 'a85ff556-2a00-4660-87fd-89e12fb5d3b4';
  var form = document.getElementById('wr-form');
  if (!form) return;

  var submitBtn = document.getElementById('wr-submit');
  var errorMsg = document.getElementById('wr-error');
  var successBox = document.getElementById('wr-success');
  var resetBtn = document.getElementById('wr-reset');

  var RED = '#ef4444';
  var NORMAL = 'rgba(255,255,255,0.1)';

  function val(id) {
    var el = document.getElementById(id);
    return el ? el.value.trim() : '';
  }

  function radioVal(name) {
    var el = form.querySelector('input[name="' + name + '"]:checked');
    return el ? el.value : '';
  }

  function markInvalid(el, bad) {
    if (!el) return;
    el.style.borderColor = bad ? RED : NORMAL;
  }

  function markPanel(name, bad) {
    var el = form.querySelector('input[name="' + name + '"]');
    var panel = el ? el.closest('.wr-yn') : null;
    if (panel) panel.style.borderColor = bad ? RED : NORMAL;
  }

  function validate() {
    var ok = true;

    // Required text/select/textarea fields
    ['wr-fullName', 'wr-email', 'wr-phone', 'wr-websiteType',
      'wr-businessDescription', 'wr-projectDescription', 'wr-projectGoals'].forEach(function (id) {
        var el = document.getElementById(id);
        var bad = !el || !el.value.trim();
        markInvalid(el, bad);
        if (bad) ok = false;
      });

    // Basic email sanity check
    var email = document.getElementById('wr-email');
    if (email && email.value.trim() && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.value.trim())) {
      markInvalid(email, true);
      ok = false;
    }

    // Required radio groups
    ['hasDomain', 'hasHosting', 'hasLogo', 'hasContent'].forEach(function (name) {
      var bad = !radioVal(name);
      markPanel(name, bad);
      if (bad) ok = false;
    });

    // Disclaimer agreement
    var agree = document.getElementById('wr-agreement');
    if (!agree || !agree.checked) ok = false;

    return ok;
  }

  function showSuccess() {
    form.style.display = 'none';
    if (successBox) successBox.style.display = 'block';
    window.scrollTo({ top: 200, behavior: 'smooth' });
  }

  form.addEventListener('submit', function (e) {
    e.preventDefault();

    // Honeypot: if filled, silently drop the bot but show the success screen
    if (val('wr-website')) {
      showSuccess();
      return;
    }

    if (errorMsg) errorMsg.style.display = 'none';

    if (!validate()) {
      if (errorMsg) errorMsg.style.display = 'block';
      window.scrollTo({ top: 200, behavior: 'smooth' });
      return;
    }

    var originalHTML = submitBtn ? submitBtn.innerHTML : '';
    if (submitBtn) {
      submitBtn.innerHTML = 'Submitting Request…';
      submitBtn.disabled = true;
    }

    var name = val('wr-fullName');
    var websiteType = val('wr-websiteType');

    var data = new FormData();
    data.append('access_key', ACCESS_KEY);
    data.append('from_name', 'Conversing AI — Website Development Request');
    data.append('subject', 'Website Development Request: ' + name + ' — ' + websiteType);
    data.append('Full Name', name);
    data.append('email', val('wr-email'));
    data.append('Phone / WhatsApp', val('wr-phone'));
    data.append('Company Name', val('wr-company') || '—');
    data.append('Location', val('wr-location') || '—');
    data.append('Website Type', websiteType);
    data.append('Business Description', val('wr-businessDescription'));
    data.append('Project Description', val('wr-projectDescription'));
    data.append('Project Goals', val('wr-projectGoals'));
    data.append('Brand Colors', val('wr-brandColors') || '—');
    data.append('Has Domain', radioVal('hasDomain'));
    data.append('Has Hosting', radioVal('hasHosting'));
    data.append('Has Logo / Brand', radioVal('hasLogo'));
    data.append('Has Content Ready', radioVal('hasContent'));
    data.append('File Link', val('wr-fileLinks') || '—');
    data.append('Additional Info', val('wr-additionalInfo') || '—');
    data.append('Disclaimer Agreed', 'Yes');

    fetch('https://api.web3forms.com/submit', { method: 'POST', body: data })
      .then(function (res) { return res.json(); })
      .then(function (result) {
        if (!result.success) throw new Error(result.message || 'Submission failed');
        showSuccess();
      })
      .catch(function () {
        alert('Something went wrong submitting your request. Please try again, or email info@conversingai.com directly.');
        if (submitBtn) {
          submitBtn.innerHTML = originalHTML;
          submitBtn.disabled = false;
        }
      });
  });

  if (resetBtn) {
    resetBtn.addEventListener('click', function () {
      form.reset();
      form.querySelectorAll('.form-input, .form-select, .form-textarea').forEach(function (el) {
        el.style.borderColor = NORMAL;
      });
      form.querySelectorAll('.wr-yn').forEach(function (p) { p.style.borderColor = NORMAL; });
      if (successBox) successBox.style.display = 'none';
      if (errorMsg) errorMsg.style.display = 'none';
      form.style.display = 'block';
      if (submitBtn) {
        submitBtn.disabled = false;
        submitBtn.innerHTML = 'Request Website Proposal ' +
          '<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" style="margin-left:0.25rem;"><path d="M5 12h14"/><path d="m12 5 7 7-7 7"/></svg>';
      }
      window.scrollTo({ top: 200, behavior: 'smooth' });
    });
  }
})();
