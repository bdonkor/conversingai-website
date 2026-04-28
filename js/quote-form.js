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

function submitQuote() {
  if (!validateStep(3)) return;

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
}
