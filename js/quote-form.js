/* Multi-step Quote Form Logic */

/* Show / hide the multi-service checkbox panel */
function toggleMultiService(sel) {
  const panel = document.getElementById('multi-service-options');
  if (panel) panel.style.display = sel.value === 'Multiple Services' ? 'block' : 'none';
  // Reset error when switching away
  const err = document.getElementById('ms-error');
  if (err) err.style.display = 'none';
}

/* Collect checked multi-service values */
function getMultiServices() {
  const ids = ['ms-chat', 'ms-website', 'ms-blog', 'ms-social'];
  return ids
    .map(id => document.getElementById(id))
    .filter(el => el && el.checked)
    .map(el => el.value);
}

function validateStep(n) {
  const currentStep = document.getElementById('step' + n);
  const inputs = currentStep.querySelectorAll('input[required], select[required], textarea[required]');
  let isValid = true;

  inputs.forEach(input => {
    if (!input.value.trim()) {
      input.style.borderColor = '#ef4444'; // red-500
      isValid = false;
    } else {
      input.style.borderColor = 'rgba(255,255,255,0.1)';
    }
  });

  // Extra check: if Multiple Services selected, at least one checkbox must be ticked
  if (n === 2) {
    const svc = document.getElementById('q-service');
    if (svc && svc.value === 'Multiple Services') {
      const chosen = getMultiServices();
      const err = document.getElementById('ms-error');
      if (chosen.length === 0) {
        if (err) err.style.display = 'block';
        isValid = false;
      } else {
        if (err) err.style.display = 'none';
      }
    }
  }

  if (!isValid) {
    alert('Please fill in all required fields.');
  }

  return isValid;
}

function showStep(n) {
  // Validate current step before going forward
  if (n > 1) {
    const prevStep = n - 1;
    if (document.getElementById('step' + n).style.display !== 'block') { // Only validate if going forward
      if (!validateStep(prevStep)) return;
    }
  }

  document.getElementById('step1').style.display = n === 1 ? 'block' : 'none';
  document.getElementById('step2').style.display = n === 2 ? 'block' : 'none';
  document.getElementById('step3').style.display = n === 3 ? 'block' : 'none';
  document.getElementById('step-success').style.display = 'none';

  document.getElementById('prog1').style.background = n >= 1 ? 'var(--blue-600)' : 'rgba(255,255,255,0.1)';
  document.getElementById('prog2').style.background = n >= 2 ? 'var(--blue-600)' : 'rgba(255,255,255,0.1)';
  document.getElementById('prog3').style.background = n >= 3 ? 'var(--blue-600)' : 'rgba(255,255,255,0.1)';

  document.getElementById('prog-text-1').style.color = n >= 1 ? 'var(--blue-500)' : 'rgba(255,255,255,0.4)';
  document.getElementById('prog-text-2').style.color = n >= 2 ? 'var(--blue-500)' : 'rgba(255,255,255,0.4)';
  document.getElementById('prog-text-3').style.color = n >= 3 ? 'var(--blue-500)' : 'rgba(255,255,255,0.4)';

  window.scrollTo({ top: 300, behavior: 'smooth' });
}

async function submitQuote() {
  if (!validateStep(1) || !validateStep(2) || !validateStep(3)) return;

  const submitBtn = document.querySelector('button[onclick="submitQuote()"]');
  const originalHTML = submitBtn ? submitBtn.innerHTML : '';
  if (submitBtn) {
    submitBtn.innerHTML = 'Submitting...';
    submitBtn.disabled = true;
  }

  const serviceValue = document.getElementById('q-service').value;

  const formData = new FormData();
  formData.append('access_key', 'a85ff556-2a00-4660-87fd-89e12fb5d3b4');
  formData.append('from_name', 'Conversing AI Website - Quote Request');
  formData.append('subject', 'New Quote Request');
  formData.append('name', document.getElementById('q-name').value);
  formData.append('email', document.getElementById('q-email').value);
  formData.append('company', document.getElementById('q-company').value);
  formData.append('phone', document.getElementById('q-phone').value);
  formData.append('service', serviceValue);
  formData.append('budget', document.getElementById('q-budget').value);
  formData.append('timeline', document.getElementById('q-timeline').value);
  formData.append('description', document.getElementById('q-desc').value);
  formData.append('source', document.getElementById('q-source').value);

  // If "Multiple Services", include the specific selections
  if (serviceValue === 'Multiple Services') {
    const chosen = getMultiServices();
    formData.append('selected_services', chosen.join(', '));
  }

  const bot = document.getElementById('q-botcheck');
  if (bot && bot.checked) formData.append('botcheck', 'on');

  try {
    const res = await fetch('https://api.web3forms.com/submit', { method: 'POST', body: formData });
    const data = await res.json();
    if (!data.success) throw new Error(data.message || 'Submission failed');

    document.getElementById('step1').style.display = 'none';
    document.getElementById('step2').style.display = 'none';
    document.getElementById('step3').style.display = 'none';
    document.getElementById('step-success').style.display = 'block';

    document.getElementById('prog1').style.background = 'var(--blue-600)';
    document.getElementById('prog2').style.background = 'var(--blue-600)';
    document.getElementById('prog3').style.background = 'var(--blue-600)';

    document.getElementById('prog-text-1').style.color = 'var(--blue-500)';
    document.getElementById('prog-text-2').style.color = 'var(--blue-500)';
    document.getElementById('prog-text-3').style.color = 'var(--blue-500)';

    window.scrollTo({ top: 300, behavior: 'smooth' });
  } catch (err) {
    alert('Something went wrong. Please email info@conversingai.com directly with your request.');
    if (submitBtn) {
      submitBtn.innerHTML = originalHTML;
      submitBtn.disabled = false;
    }
  }
}
