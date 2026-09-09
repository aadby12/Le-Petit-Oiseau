/**
 * Le Petit Oiseau — Website Concept
 * Minimal JavaScript for navigation, menu tabs, gallery lightbox, and scroll effects.
 */

(function () {
  'use strict';

  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  /* --- Apply SITE_CONFIG from env build --- */
  function applySiteConfig() {
    const cfg = window.SITE_CONFIG;
    if (!cfg) return;

    const setHref = (selector, value) => {
      document.querySelectorAll(selector).forEach((el) => {
        if (value) el.setAttribute('href', value);
      });
    };

    const setText = (selector, value) => {
      document.querySelectorAll(selector).forEach((el) => {
        if (value) el.textContent = value;
      });
    };

    setHref('[data-config~="phone-link"]', cfg.phone ? `tel:${cfg.phone}` : null);
    setText('[data-config~="phone-text"]', cfg.phoneDisplay || cfg.phone);
    setHref('[data-config~="whatsapp-url"]', cfg.whatsappUrl);
    setHref('[data-config~="instagram-url"]', cfg.instagramUrl);
    setHref('[data-config~="menu-url"]', cfg.menuUrl);
    setHref('[data-config~="supper-url"]', cfg.supperClubUrl);
    setHref('[data-config~="maps-url"]', cfg.mapsUrl);

    document.querySelectorAll('[data-config~="maps-embed"]').forEach((el) => {
      if (cfg.mapsEmbedUrl) el.setAttribute('src', cfg.mapsEmbedUrl);
    });

    if (cfg.siteUrl) {
      const canonical = document.querySelector('link[rel="canonical"]');
      if (canonical) canonical.setAttribute('href', cfg.siteUrl);
      const ogUrl = document.querySelector('meta[property="og:url"]');
      if (ogUrl) ogUrl.setAttribute('content', cfg.siteUrl);
    }
  }

  applySiteConfig();

  /* --- Year in footer --- */
  const yearEl = document.getElementById('year');
  if (yearEl) {
    yearEl.textContent = new Date().getFullYear();
  }

  /* --- Mobile navigation --- */
  const navToggle = document.getElementById('nav-toggle');
  const navDrawer = document.getElementById('nav-drawer');
  const header = document.getElementById('site-header');

  function closeNav() {
    if (!navToggle || !navDrawer) return;
    navToggle.setAttribute('aria-expanded', 'false');
    navDrawer.classList.remove('is-open');
    navDrawer.hidden = true;
    document.body.style.overflow = '';
  }

  function openNav() {
    if (!navToggle || !navDrawer) return;
    navToggle.setAttribute('aria-expanded', 'true');
    navDrawer.hidden = false;
    requestAnimationFrame(() => navDrawer.classList.add('is-open'));
    document.body.style.overflow = 'hidden';
  }

  if (navToggle && navDrawer) {
    navToggle.addEventListener('click', () => {
      const isOpen = navToggle.getAttribute('aria-expanded') === 'true';
      isOpen ? closeNav() : openNav();
    });

    navDrawer.querySelectorAll('a').forEach((link) => {
      link.addEventListener('click', closeNav);
    });

    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && navToggle.getAttribute('aria-expanded') === 'true') {
        closeNav();
        navToggle.focus();
      }
    });
  }

  /* --- Sticky header on scroll --- */
  if (header) {
    let lastScroll = 0;

    function onScroll() {
      const scrollY = window.scrollY;
      header.classList.toggle('is-scrolled', scrollY > 80);
      lastScroll = scrollY;
    }

    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();
  }

  /* --- Smooth scroll for anchor links --- */
  document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
    anchor.addEventListener('click', (e) => {
      const targetId = anchor.getAttribute('href');
      if (!targetId || targetId === '#') return;

      const target = document.querySelector(targetId);
      if (!target) return;

      e.preventDefault();
      const headerOffset = header ? header.offsetHeight + 28 : 0;
      const top = target.getBoundingClientRect().top + window.scrollY - headerOffset;

      window.scrollTo({
        top,
        behavior: prefersReducedMotion ? 'auto' : 'smooth'
      });

      target.setAttribute('tabindex', '-1');
      target.focus({ preventScroll: true });
    });
  });

  /* --- Menu tabs --- */
  const menuTabs = document.querySelectorAll('.menu-tab');
  const menuPanels = document.querySelectorAll('.menu-panel');

  menuTabs.forEach((tab) => {
    tab.addEventListener('click', () => {
      const target = tab.dataset.tab;

      menuTabs.forEach((t) => {
        t.classList.remove('active');
        t.setAttribute('aria-selected', 'false');
      });

      menuPanels.forEach((panel) => {
        const isTarget = panel.id === `panel-${target}`;
        panel.classList.toggle('active', isTarget);
        panel.hidden = !isTarget;
      });

      tab.classList.add('active');
      tab.setAttribute('aria-selected', 'true');
    });
  });

  /* --- Gallery lightbox --- */
  const galleryItems = document.querySelectorAll('.gallery-item');
  const lightbox = document.getElementById('lightbox');
  const lightboxImg = document.getElementById('lightbox-img');
  const lightboxCaption = document.getElementById('lightbox-caption');
  const lightboxClose = document.getElementById('lightbox-close');
  const lightboxPrev = document.getElementById('lightbox-prev');
  const lightboxNext = document.getElementById('lightbox-next');

  let currentIndex = 0;
  let galleryImages = [];

  if (galleryItems.length && lightbox) {
    galleryImages = Array.from(galleryItems).map((item) => {
      const img = item.querySelector('img');
      return {
        src: img.currentSrc || img.src,
        alt: img.alt
      };
    });

    function showLightbox(index) {
      currentIndex = index;
      const image = galleryImages[currentIndex];

      lightboxImg.src = image.src;
      lightboxImg.alt = image.alt;
      lightboxCaption.textContent = image.alt;

      lightbox.hidden = false;
      document.body.style.overflow = 'hidden';
      lightboxClose.focus();
    }

    function hideLightbox() {
      lightbox.hidden = true;
      document.body.style.overflow = '';
      galleryItems[currentIndex]?.focus();
    }

    function showPrev() {
      currentIndex = (currentIndex - 1 + galleryImages.length) % galleryImages.length;
      showLightbox(currentIndex);
    }

    function showNext() {
      currentIndex = (currentIndex + 1) % galleryImages.length;
      showLightbox(currentIndex);
    }

    galleryItems.forEach((item, index) => {
      item.addEventListener('click', () => showLightbox(index));
    });

    lightboxClose?.addEventListener('click', hideLightbox);

    lightboxPrev?.addEventListener('click', showPrev);
    lightboxNext?.addEventListener('click', showNext);

    lightbox.addEventListener('click', (e) => {
      if (e.target === lightbox) hideLightbox();
    });

    document.addEventListener('keydown', (e) => {
      if (lightbox.hidden) return;

      switch (e.key) {
        case 'Escape':
          hideLightbox();
          break;
        case 'ArrowLeft':
          showPrev();
          break;
        case 'ArrowRight':
          showNext();
          break;
      }
    });
  }

  /* --- Scroll reveal --- */
  if (!prefersReducedMotion && 'IntersectionObserver' in window) {
    const revealElements = document.querySelectorAll(
      '.intro-grid, .menu-header, .experience-composition, .supper-club-inner, .gallery-header, .contact-inner, .location-grid'
    );

    revealElements.forEach((el) => el.classList.add('reveal'));

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('is-visible');
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.12, rootMargin: '0px 0px -40px 0px' }
    );

    revealElements.forEach((el) => observer.observe(el));
  }
})();
