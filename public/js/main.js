// Meta Pixel Event Tracking
function initMetaPixel() {
  window.fbq = window.fbq || function () { (window.fbq.q = window.fbq.q || []).push(arguments) };
  fbq('init', '1234567890'); // Replace with actual Pixel ID
  fbq('track', 'PageView');
}

// Form Handling
const leadsForm = {
  init() {
    const form = document.getElementById('leadsForm');
    if (form) {
      form.addEventListener('submit', (e) => this.handleSubmit(e));
    }

    // Add real-time validation
    const inputs = document.querySelectorAll('[data-validate]');
    inputs.forEach(input => {
      input.addEventListener('blur', () => this.validateField(input));
      input.addEventListener('input', () => this.clearError(input));
    });
  },

  validateField(field) {
    const type = field.getAttribute('data-validate');
    let isValid = false;

    switch (type) {
      case 'name':
        isValid = field.value.trim().length >= 2;
        break;
      case 'phone':
        const cleanPhone = field.value.replace(/\D/g, '').slice(-10);
        isValid = cleanPhone.length === 10;
        break;
      case 'email':
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        isValid = emailRegex.test(field.value);
        break;
      case 'required':
        isValid = field.value.trim().length > 0;
        break;
    }

    if (!isValid) {
      this.showError(field);
    }

    return isValid;
  },

  showError(field) {
    field.classList.add('border-red-500');
    const errorElement = field.parentElement.querySelector('.form-error');
    if (errorElement) {
      errorElement.classList.add('show');
    }
  },

  clearError(field) {
    field.classList.remove('border-red-500');
    const errorElement = field.parentElement.querySelector('.form-error');
    if (errorElement) {
      errorElement.classList.remove('show');
    }
  },

  async handleSubmit(e) {
    e.preventDefault();

    const form = e.target;
    const formData = new FormData(form);

    // Validate all fields
    const inputs = form.querySelectorAll('[data-validate]');
    let isFormValid = true;

    inputs.forEach(input => {
      if (!this.validateField(input)) {
        isFormValid = false;
      }
    });

    if (!isFormValid) {
      return;
    }

    const submitButton = form.querySelector('button[type="submit"]');
    const originalText = submitButton.textContent;
    submitButton.disabled = true;
    submitButton.textContent = 'Submitting...';

    try {
      const response = await fetch('/api/leads', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          full_name: formData.get('full_name'),
          mobile_number: formData.get('mobile_number'),
          email: formData.get('email'),
          project_name: formData.get('project_name'),
          configuration_interested: formData.get('configuration_interested') || null,
          budget_range: formData.get('budget_range') || null,
        }),
      });

      const data = await response.json();

      if (response.ok) {
        // Track Lead conversion in Meta Pixel
        fbq('track', 'Lead', {
          value: 1,
          currency: 'INR',
          content_name: formData.get('project_name'),
        });

        // Show success modal
        modal.showSuccess();
        form.reset();
      } else {
        // Handle errors
        if (response.status === 409) {
          modal.showError('You have already submitted a lead. Please try again later.');
        } else if (response.status === 400) {
          modal.showError('Please fill in all required fields correctly.');
        } else {
          modal.showError('An error occurred. Please try again.');
        }
      }
    } catch (error) {
      console.error('Error submitting form:', error);
      modal.showError('Network error. Please check your connection and try again.');
    } finally {
      submitButton.disabled = false;
      submitButton.textContent = originalText;
    }
  },
};

// Modal Handling
const modal = {
  init() {
    const modal = document.getElementById('leadsModal');
    const openButtons = document.querySelectorAll('[data-modal-open="leadsModal"]');
    const closeButton = document.querySelector('[data-modal-close]');

    openButtons.forEach(btn => {
      btn.addEventListener('click', () => this.open('leadsModal'));
    });

    if (closeButton) {
      closeButton.addEventListener('click', () => this.close('leadsModal'));
    }

    // Close modal on background click
    if (modal) {
      modal.addEventListener('click', (e) => {
        if (e.target === modal) {
          this.close('leadsModal');
        }
      });
    }
  },

  open(id) {
    const modalElement = document.getElementById(id);
    if (modalElement) {
      modalElement.classList.add('active');
      // Track ViewContent event
      fbq('track', 'ViewContent', {
        content_name: 'Lead Form Modal',
      });
    }
  },

  close(id) {
    const modalElement = document.getElementById(id);
    if (modalElement) {
      modalElement.classList.remove('active');
    }
  },

  showSuccess() {
    const modal = document.getElementById('leadsModal');
    const formContent = document.getElementById('formContent');
    const successContent = document.getElementById('successContent');

    if (formContent && successContent) {
      formContent.style.display = 'none';
      successContent.style.display = 'block';

      setTimeout(() => {
        this.close('leadsModal');
        formContent.style.display = 'block';
        successContent.style.display = 'none';
      }, 3000);
    }
  },

  showError(message) {
    const errorDiv = document.createElement('div');
    errorDiv.className = 'mb-4 p-4 bg-red-50 border border-red-200 rounded text-red-700';
    errorDiv.textContent = message;

    const formContent = document.getElementById('formContent');
    if (formContent) {
      formContent.insertBefore(errorDiv, formContent.firstChild);
      setTimeout(() => errorDiv.remove(), 5000);
    }
  },
};

// Gallery Handling
const gallery = {
  init() {
    const galleryItems = document.querySelectorAll('.gallery-item');
    galleryItems.forEach((item, index) => {
      item.addEventListener('click', () => this.openLightbox(index));
    });

    const lightboxClose = document.querySelector('.lightbox-close');
    if (lightboxClose) {
      lightboxClose.addEventListener('click', () => this.closeLightbox());
    }

    const lightbox = document.getElementById('lightbox');
    if (lightbox) {
      lightbox.addEventListener('click', (e) => {
        if (e.target === lightbox) {
          this.closeLightbox();
        }
      });
    }

    const prevBtn = document.getElementById('lightboxPrev');
    const nextBtn = document.getElementById('lightboxNext');
    if (prevBtn) prevBtn.addEventListener('click', () => this.prevImage());
    if (nextBtn) nextBtn.addEventListener('click', () => this.nextImage());
  },

  currentIndex: 0,

  openLightbox(index) {
    this.currentIndex = index;
    const galleryItems = document.querySelectorAll('.gallery-item img');
    const lightboxImg = document.getElementById('lightboxImg');

    if (lightboxImg && galleryItems[index]) {
      lightboxImg.src = galleryItems[index].src;
      document.getElementById('lightbox').classList.add('active');
    }
  },

  closeLightbox() {
    document.getElementById('lightbox').classList.remove('active');
  },

  nextImage() {
    const galleryItems = document.querySelectorAll('.gallery-item img');
    this.currentIndex = (this.currentIndex + 1) % galleryItems.length;
    const lightboxImg = document.getElementById('lightboxImg');
    if (lightboxImg) {
      lightboxImg.src = galleryItems[this.currentIndex].src;
    }
  },

  prevImage() {
    const galleryItems = document.querySelectorAll('.gallery-item img');
    this.currentIndex = (this.currentIndex - 1 + galleryItems.length) % galleryItems.length;
    const lightboxImg = document.getElementById('lightboxImg');
    if (lightboxImg) {
      lightboxImg.src = galleryItems[this.currentIndex].src;
    }
  },
};

// Sticky CTA Buttons
const stickyCTA = {
  init() {
    const inquireBtn = document.getElementById('inquireBtn');
    const whatsappBtn = document.getElementById('whatsappBtn');
    const callBtn = document.getElementById('callBtn');

    if (inquireBtn) {
      inquireBtn.addEventListener('click', () => modal.open('leadsModal'));
    }

    if (whatsappBtn) {
      whatsappBtn.addEventListener('click', () => {
        const projectData = document.body.dataset;
        const phone = projectData.whatsappNumber || '919876543210';
        const message = `Hi, I'm interested in ${projectData.projectName}. Can you provide more details?`;
        window.open(`https://wa.me/${phone}?text=${encodeURIComponent(message)}`, '_blank');
        fbq('track', 'Contact', { content_name: 'WhatsApp Click' });
      });
    }

    if (callBtn) {
      callBtn.addEventListener('click', () => {
        const projectData = document.body.dataset;
        const phone = projectData.phoneNumber || '+919876543210';
        window.location.href = `tel:${phone}`;
        fbq('track', 'Contact', { content_name: 'Phone Call Click' });
      });
    }
  },
};

// Smooth scroll for anchor links
function initSmoothScroll() {
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
      e.preventDefault();
      const target = document.querySelector(this.getAttribute('href'));
      if (target) {
        target.scrollIntoView({ behavior: 'smooth' });
      }
    });
  });
}

// Intersection Observer for fade-in animations
function initScrollAnimations() {
  const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px',
  };

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('fade-in');
        observer.unobserve(entry.target);
      }
    });
  }, observerOptions);

  document.querySelectorAll('[data-animate]').forEach(element => {
    observer.observe(element);
  });
}

// Initialize everything on DOM load
document.addEventListener('DOMContentLoaded', () => {
  initMetaPixel();
  leadsForm.init();
  modal.init();
  gallery.init();
  stickyCTA.init();
  initSmoothScroll();
  initScrollAnimations();

  console.log('Real Estate Landing Page Initialized');
});

// Keyboard shortcuts for modal
document.addEventListener('keydown', (e) => {
  if (e.key === 'Escape') {
    modal.close('leadsModal');
    gallery.closeLightbox();
  }
});
