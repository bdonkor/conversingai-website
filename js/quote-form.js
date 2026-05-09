/* Multi-step Quote Form Logic */
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

  const formData = new FormData();
  formData.append('access_key', 'a85ff556-2a00-4660-87fd-89e12fb5d3b4');
  formData.append('from_name', 'Conversing AI Website - Quote Request');
  formData.append('subject', 'New Quote Request');
  formData.append('name', document.getElementById('q-name').value);
  formData.append('email', document.getElementById('q-email').value);
  formData.append('company', document.getElementById('q-company').value);
  formData.append('phone', document.getElementById('q-phone').value);
  formData.append('service', document.getElementById('q-service').value);
  formData.append('budget', document.getElementById('q-budget').value);
  formData.append('timeline', document.getElementById('q-timeline').value);
  formData.append('description', document.getElementById('q-desc').value);
  formData.append('source', document.getElementById('q-source').value);

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
