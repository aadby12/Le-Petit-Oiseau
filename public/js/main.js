/**
 * Le Petit Oiseau — Website Concept
 * Navigation, menu tabs, gallery lightbox, and scroll effects.
 */

(function () {
  'use strict';

  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  /* --- Scroll lock (shared by nav + lightbox) --- */
  let scrollLocks = 0;
  let lockedScrollY = 0;

  function lockScroll() {
    if (scrollLocks === 0) {
      lockedScrollY = window.scrollY || window.pageYOffset;
      document.body.classList.add('is-scroll-locked');
      document.body.style.top = `-${lockedScrollY}px`;
    }
    scrollLocks += 1;
  }

  function unlockScroll() {
    if (scrollLocks === 0) return;
    scrollLocks -= 1;
    if (scrollLocks === 0) {
      document.body.classList.remove('is-scroll-locked');
      document.body.style.top = '';
      window.scrollTo(0, lockedScrollY);
    }
  }

  /* --- Apply SITE_CONFIG from env build --- */
  function applySiteConfig() {
    const cfg = window.SITE_CONFIG;
    if (!cfg) return;

    const setHref = (selector, value) => {
      if (!value) return;
      document.querySelectorAll(selector).forEach((el) => {
        el.setAttribute('href', value);
      });
    };

    const setText = (selector, value) => {
      if (!value) return;
      document.querySelectorAll(selector).forEach((el) => {
        el.textContent = value;
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
  let navCloseTimer = null;

  function isNavOpen() {
    return navToggle && navToggle.getAttribute('aria-expanded') === 'true';
  }

  function closeNav() {
    if (!navToggle || !navDrawer || !isNavOpen()) return;

    navToggle.setAttribute('aria-expanded', 'false');
    navToggle.setAttribute('aria-label', 'Open menu');
    navDrawer.classList.remove('is-open');
    navDrawer.setAttribute('aria-hidden', 'true');
    unlockScroll();

    if (navCloseTimer) clearTimeout(navCloseTimer);
    navCloseTimer = setTimeout(() => {
      if (!isNavOpen()) navDrawer.hidden = true;
    }, prefersReducedMotion ? 0 : 320);
  }

  function openNav() {
    if (!navToggle || !navDrawer) return;
    if (navCloseTimer) clearTimeout(navCloseTimer);

    navToggle.setAttribute('aria-expanded', 'true');
    navToggle.setAttribute('aria-label', 'Close menu');
    navDrawer.hidden = false;
    navDrawer.setAttribute('aria-hidden', 'false');
    lockScroll();
    requestAnimationFrame(() => {
      navDrawer.classList.add('is-open');
    });
  }

  if (navToggle && navDrawer) {
    navToggle.addEventListener('click', () => {
      isNavOpen() ? closeNav() : openNav();
    });

    navDrawer.querySelectorAll('a').forEach((link) => {
      link.addEventListener('click', () => {
        closeNav();
      });
    });

    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && isNavOpen()) {
        closeNav();
        navToggle.focus();
      }
    });
  }

  /* --- Sticky header on scroll --- */
  if (header) {
    function onScroll() {
      header.classList.toggle('is-scrolled', window.scrollY > 60);
    }

    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();
  }

  /* --- Smooth scroll for in-page anchors --- */
  function getHeaderOffset() {
    if (!header) return 0;
    return Math.ceil(header.getBoundingClientRect().bottom) + 8;
  }

  document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
    anchor.addEventListener('click', (e) => {
      const targetId = anchor.getAttribute('href');
      if (!targetId || targetId === '#') return;

      const target = document.querySelector(targetId);
      if (!target) return;

      e.preventDefault();

      const top = target.getBoundingClientRect().top + window.scrollY - getHeaderOffset();

      window.scrollTo({
        top: Math.max(0, top),
        behavior: prefersReducedMotion ? 'auto' : 'smooth'
      });

      if (!target.hasAttribute('tabindex')) {
        target.setAttribute('tabindex', '-1');
      }
      target.focus({ preventScroll: true });
    });
  });

  /* --- Menu category tabs --- */
  const menuTabs = Array.from(document.querySelectorAll('.menu-tab'));
  const menuPanels = document.querySelectorAll('.menu-panel');

  function activateMenuTab(tab) {
    if (!tab) return;
    const target = tab.dataset.tab;

    menuTabs.forEach((t) => {
      const selected = t === tab;
      t.classList.toggle('active', selected);
      t.setAttribute('aria-selected', selected ? 'true' : 'false');
      t.setAttribute('tabindex', selected ? '0' : '-1');
    });

    menuPanels.forEach((panel) => {
      const isTarget = panel.id === `panel-${target}`;
      panel.classList.toggle('active', isTarget);
      panel.hidden = !isTarget;
    });
  }

  menuTabs.forEach((tab, index) => {
    tab.setAttribute('tabindex', tab.classList.contains('active') ? '0' : '-1');

    tab.addEventListener('click', () => activateMenuTab(tab));

    tab.addEventListener('keydown', (e) => {
      let nextIndex = null;
      if (e.key === 'ArrowRight' || e.key === 'ArrowDown') {
        nextIndex = (index + 1) % menuTabs.length;
      } else if (e.key === 'ArrowLeft' || e.key === 'ArrowUp') {
        nextIndex = (index - 1 + menuTabs.length) % menuTabs.length;
      } else if (e.key === 'Home') {
        nextIndex = 0;
      } else if (e.key === 'End') {
        nextIndex = menuTabs.length - 1;
      }

      if (nextIndex === null) return;
      e.preventDefault();
      activateMenuTab(menuTabs[nextIndex]);
      menuTabs[nextIndex].focus();
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
  let lightboxOpen = false;

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
      if (!lightboxOpen) {
        lightboxOpen = true;
        lockScroll();
      }
      lightboxClose.focus();
    }

    function hideLightbox() {
      if (!lightboxOpen) return;
      lightbox.hidden = true;
      lightboxOpen = false;
      unlockScroll();
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
      item.addEventListener('keydown', (e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          showLightbox(index);
        }
      });
    });

    lightboxClose?.addEventListener('click', hideLightbox);
    lightboxPrev?.addEventListener('click', showPrev);
    lightboxNext?.addEventListener('click', showNext);

    lightbox.addEventListener('click', (e) => {
      if (e.target === lightbox) hideLightbox();
    });

    document.addEventListener('keydown', (e) => {
      if (!lightboxOpen || lightbox.hidden) return;

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
      '.intro-grid, .menu-header, .menu-panels, .experience-composition, .supper-club-inner, .gallery-header, .gallery-grid, .contact-inner, .location-grid'
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
      { threshold: 0.1, rootMargin: '0px 0px -32px 0px' }
    );

    revealElements.forEach((el) => observer.observe(el));
  }
})();
