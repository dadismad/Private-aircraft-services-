/**
 * NovansJets – Main Application Logic
 * Handles: Navigation, Modals, Scroll animations, Form, Fleet filters
 */

(function () {
  'use strict';

  /* ============================================================
     NAVIGATION
  ============================================================ */
  function initNavigation() {
    const navbar = document.getElementById('navbar');
    const hamburger = document.getElementById('hamburger');
    const navMenu = document.getElementById('nav-menu');
    if (!navbar) return;

    // Scroll state
    const handleScroll = () => {
      if (window.scrollY > 40) {
        navbar.classList.add('navbar--solid');
        navbar.classList.remove('navbar--transparent');
      } else {
        navbar.classList.remove('navbar--solid');
        navbar.classList.add('navbar--transparent');
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();

    // Hamburger
    if (hamburger && navMenu) {
      hamburger.addEventListener('click', () => {
        const open = navMenu.classList.toggle('open');
        hamburger.setAttribute('aria-expanded', String(open));
        hamburger.querySelectorAll('span')[0].style.transform = open ? 'rotate(45deg) translate(4px, 5px)' : '';
        hamburger.querySelectorAll('span')[1].style.opacity = open ? '0' : '1';
        hamburger.querySelectorAll('span')[2].style.transform = open ? 'rotate(-45deg) translate(4px, -5px)' : '';
      });

      // Close on link click
      navMenu.querySelectorAll('.navbar__link').forEach(link => {
        link.addEventListener('click', () => {
          navMenu.classList.remove('open');
          hamburger.setAttribute('aria-expanded', 'false');
        });
      });
    }

    // Active link highlighting
    const currentPath = window.location.pathname.split('/').pop() || 'index.html';
    document.querySelectorAll('.navbar__link[data-page]').forEach(link => {
      if (link.dataset.page === currentPath) link.classList.add('active');
    });
  }

  /* ============================================================
     SCROLL REVEAL
  ============================================================ */
  function initReveal() {
    const elements = document.querySelectorAll('.reveal');
    if (!elements.length) return;

    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.12, rootMargin: '0px 0px -40px 0px' });

    elements.forEach(el => observer.observe(el));
  }

  /* ============================================================
     AIRCRAFT MODAL
  ============================================================ */
  function initModals() {
    const overlay = document.getElementById('aircraft-modal-overlay');
    if (!overlay) return;

    // Open via hotspot buttons
    document.querySelectorAll('[data-aircraft]').forEach(btn => {
      btn.addEventListener('click', () => openModal(btn.dataset.aircraft));
    });

    // Close button
    const closeBtn = overlay.querySelector('.modal__close');
    if (closeBtn) closeBtn.addEventListener('click', closeModal);

    // Click overlay to close
    overlay.addEventListener('click', e => {
      if (e.target === overlay) closeModal();
    });

    // Escape key
    document.addEventListener('keydown', e => {
      if (e.key === 'Escape' && overlay.classList.contains('active')) closeModal();
    });
  }

  function openModal(aircraftId) {
    const data = (typeof AIRCRAFT_DATA !== 'undefined') ? AIRCRAFT_DATA[aircraftId] : null;
    if (!data) return;

    const overlay = document.getElementById('aircraft-modal-overlay');
    if (!overlay) return;

    // Populate header
    const img = overlay.querySelector('.modal__header-img');
    const category = overlay.querySelector('.modal__aircraft-category');
    const name = overlay.querySelector('.modal__aircraft-name');
    if (img) { img.src = data.heroImage; img.alt = data.name; }
    if (category) category.textContent = data.category;
    if (name) name.textContent = data.name;

    // Specs
    const specsGrid = overlay.querySelector('.modal__specs-grid');
    if (specsGrid) {
      specsGrid.innerHTML = Object.entries(data.specs).map(([key, spec]) => `
        <div class="modal__spec-item">
          <div class="modal__spec-label">${spec.label}</div>
          <div class="modal__spec-value">${spec.value}</div>
        </div>
      `).join('');
    }

    // Usage tags
    const usageList = overlay.querySelector('.modal__usage-list');
    if (usageList) {
      usageList.innerHTML = data.usages.map(u => `<span class="modal__usage-tag">${u}</span>`).join('');
    }

    // Description
    const desc = overlay.querySelector('.modal__description');
    if (desc) desc.textContent = data.description;

    // Gallery
    const gallery = overlay.querySelector('.modal__gallery');
    if (gallery) {
      gallery.innerHTML = data.galleryImages.map((src, i) =>
        `<img src="${src}" alt="${data.name} interior view ${i + 1}" loading="lazy">`
      ).join('');
    }

    // CTA button
    const ctaBtn = overlay.querySelector('.modal__cta-btn');
    if (ctaBtn) {
      ctaBtn.textContent = data.category === 'VIP Helicopter' ? 'BOOK HELICOPTER' : 'REQUEST THIS JET';
      const page = '../pages/contact.html';
      ctaBtn.href = `${page}?aircraft=${encodeURIComponent(data.name)}`;
    }

    // Show
    overlay.classList.add('active');
    document.body.style.overflow = 'hidden';

    // Focus management
    setTimeout(() => {
      const closeBtn = overlay.querySelector('.modal__close');
      if (closeBtn) closeBtn.focus();
    }, 100);
  }

  function closeModal() {
    const overlay = document.getElementById('aircraft-modal-overlay');
    if (!overlay) return;
    overlay.classList.remove('active');
    document.body.style.overflow = '';
  }

  // Expose for inline usage
  window.openAircraftModal = openModal;
  window.closeAircraftModal = closeModal;

  /* ============================================================
     HERO PARALLAX
  ============================================================ */
  function initHeroParallax() {
    const heroBg = document.querySelector('.hero__bg');
    if (!heroBg) return;

    // Trigger loaded state for zoom-in
    setTimeout(() => heroBg.classList.add('hero__bg--loaded'), 100);

    window.addEventListener('scroll', () => {
      const scrolled = window.scrollY;
      if (scrolled < window.innerHeight) {
        heroBg.style.transform = `scale(1) translateY(${scrolled * 0.25}px)`;
      }
    }, { passive: true });
  }

  /* ============================================================
     COUNTER ANIMATION
  ============================================================ */
  function initCounters() {
    const counters = document.querySelectorAll('[data-count-to]');
    if (!counters.length) return;

    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          animateCounter(entry.target);
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.5 });

    counters.forEach(el => observer.observe(el));
  }

  function animateCounter(el) {
    const target = parseInt(el.dataset.countTo, 10);
    const suffix = el.dataset.suffix || '';
    const duration = 2000;
    const start = performance.now();

    const tick = (now) => {
      const elapsed = now - start;
      const progress = Math.min(elapsed / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      const current = Math.round(eased * target);
      el.textContent = current.toLocaleString() + suffix;
      if (progress < 1) requestAnimationFrame(tick);
    };

    requestAnimationFrame(tick);
  }

  /* ============================================================
     FLEET FILTER
  ============================================================ */
  function initFleetFilter() {
    const filterBtns = document.querySelectorAll('.filter-btn');
    const fleetCards = document.querySelectorAll('.aircraft-card');
    if (!filterBtns.length || !fleetCards.length) return;

    filterBtns.forEach(btn => {
      btn.addEventListener('click', () => {
        filterBtns.forEach(b => b.classList.remove('active'));
        btn.classList.add('active');

        const filter = btn.dataset.filter;
        fleetCards.forEach(card => {
          const match = filter === 'all' || card.dataset.category === filter;
          card.style.display = match ? '' : 'none';
          if (match) {
            card.classList.remove('visible');
            setTimeout(() => card.classList.add('visible'), 50);
          }
        });
      });
    });
  }

  /* ============================================================
     CONTACT FORM
  ============================================================ */
  function initContactForm() {
    const form = document.getElementById('contact-form');
    if (!form) return;

    // Pre-fill aircraft if query param provided
    const params = new URLSearchParams(window.location.search);
    const aircraft = params.get('aircraft');
    if (aircraft) {
      const subjectField = form.querySelector('[name="subject"]');
      const messageField = form.querySelector('[name="message"]');
      if (subjectField) subjectField.value = `Charter Enquiry – ${aircraft}`;
      if (messageField) messageField.value = `I am interested in chartering the ${aircraft}. Please provide availability and pricing.`;
    }

    form.addEventListener('submit', e => {
      e.preventDefault();
      const btn = form.querySelector('[type="submit"]');
      const original = btn ? btn.textContent : '';

      if (btn) {
        btn.textContent = 'SENDING…';
        btn.disabled = true;
      }

      // Simulate async submission
      setTimeout(() => {
        showFormSuccess(form);
        form.reset();
        if (btn) {
          btn.textContent = original;
          btn.disabled = false;
        }
      }, 1800);
    });
  }

  function showFormSuccess(form) {
    const msg = document.createElement('div');
    msg.className = 'form-success';
    msg.innerHTML = `
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" width="40" height="40">
        <circle cx="12" cy="12" r="10"/><path d="M8 12l3 3 5-5"/>
      </svg>
      <h4>Message Received</h4>
      <p>Thank you. A member of our team will be in touch within 2 hours.</p>
    `;
    Object.assign(msg.style, {
      textAlign: 'center',
      padding: '3rem 2rem',
      color: 'var(--burgundy-dark)',
      background: 'var(--cream)',
      borderRadius: '4px'
    });
    msg.querySelector('svg').style.color = 'var(--gold)';
    msg.querySelector('h4').style.marginBottom = '0.5rem';

    form.parentNode.insertBefore(msg, form);
    form.style.display = 'none';

    setTimeout(() => {
      msg.remove();
      form.style.display = '';
    }, 8000);
  }

  /* ============================================================
     STICKY HEADER ON SUB-PAGES (always solid)
  ============================================================ */
  function initSubpageNav() {
    const navbar = document.getElementById('navbar');
    if (!navbar) return;
    if (document.body.classList.contains('subpage')) {
      navbar.classList.add('navbar--solid');
      navbar.classList.remove('navbar--transparent');
    }
  }

  /* ============================================================
     SMOOTH ANCHOR SCROLLING
  ============================================================ */
  function initSmoothScroll() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
      anchor.addEventListener('click', e => {
        const target = document.querySelector(anchor.getAttribute('href'));
        if (target) {
          e.preventDefault();
          const top = target.getBoundingClientRect().top + window.scrollY - 90;
          window.scrollTo({ top, behavior: 'smooth' });
        }
      });
    });
  }

  /* ============================================================
     BOOT
  ============================================================ */
  function boot() {
    initNavigation();
    initSubpageNav();
    initReveal();
    initModals();
    initHeroParallax();
    initCounters();
    initFleetFilter();
    initContactForm();
    initSmoothScroll();
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', boot);
  } else {
    boot();
  }

})();
