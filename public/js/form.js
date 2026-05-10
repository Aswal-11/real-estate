// Get the project name from the current page
const getProjectName = () => {
  const url = window.location.pathname;
  if (url.includes('/godrej')) return 'Godrej Properties - Thane Extension';
  if (url.includes('/oberoi')) return 'Oberoi Realty 360 North';
  return '';
};

// Form submission handler
document.getElementById('leadForm')?.addEventListener('submit', async (e) => {
  e.preventDefault();
  
  const fullName = document.getElementById('fullName')?.value;
  const email = document.getElementById('email')?.value;
  const mobile = document.getElementById('mobile')?.value;
  const config = document.getElementById('config')?.value;
  const budget = document.getElementById('budget')?.value;
  const projectName = getProjectName();

  // Validation
  if (!fullName || !email || !mobile || !config || !budget) {
    alert('Please fill in all fields');
    return;
  }

  // Phone number validation
  const phoneRegex = /^[0-9]{10}$/;
  if (!phoneRegex.test(mobile.replace(/\D/g, ''))) {
    alert('Please enter a valid 10-digit phone number');
    return;
  }

  try {
    // Show loading state
    const btn = e.target.querySelector('button[type="submit"]');
    const originalText = btn.textContent;
    btn.textContent = 'Submitting...';
    btn.disabled = true;

    // Send to API
    const response = await fetch('/api/leads', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        project_name: projectName,
        full_name: fullName,
        mobile_number: mobile,
        email: email,
        configuration_interested: config,
        budget_range: budget
      })
    });

    const data = await response.json();

    if (response.ok) {
      // Track lead in Meta Pixel
      if (typeof fbq !== 'undefined') {
        fbq('track', 'Lead', {
          value: budget,
          currency: 'INR',
          content_name: projectName
        });
      }

      // Show success message
      document.getElementById('leadModal')?.classList.add('hidden');
      document.getElementById('successModal')?.classList.remove('hidden');
      
      // Reset form
      e.target.reset();
      
      // Reset button
      btn.textContent = originalText;
      btn.disabled = false;
      
    } else if (response.status === 409) {
      alert('You have already submitted an inquiry for this project recently. Our team will contact you soon!');
      btn.textContent = originalText;
      btn.disabled = false;
    } else {
      alert('Error: ' + (data.error || 'Failed to submit inquiry'));
      btn.textContent = originalText;
      btn.disabled = false;
    }
  } catch (error) {
    console.error('Error:', error);
    alert('Network error. Please try again.');
    const btn = e.target.querySelector('button[type="submit"]');
    btn.textContent = 'Submit Inquiry';
    btn.disabled = false;
  }
});
