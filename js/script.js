/**
 * Maaz Ahmed Portfolio
 * Vanilla JavaScript (ES6+). Each feature has its own init function.
 * Smooth scrolling is handled in CSS (scroll-behavior), which also respects
 * the visitor's reduced-motion setting.
 */
'use strict';

document.documentElement.classList.add('js');

const $ = (selector, parent = document) => parent.querySelector(selector);
const $$ = (selector, parent = document) => [...parent.querySelectorAll(selector)];

/** Mobile navigation: toggle, close on link click, Escape, outside click or resize. */
const initMobileNav = () => {
  const header = $('#siteHeader');
  const toggle = $('#navToggle');

  const setOpen = (open) => {
    header.classList.toggle('menu-open', open);
    toggle.setAttribute('aria-expanded', String(open));
    toggle.setAttribute('aria-label', open ? 'Close menu' : 'Open menu');
  };

  toggle.addEventListener('click', () => setOpen(!header.classList.contains('menu-open')));
  $$('.nav-menu a, .logo').forEach((link) => link.addEventListener('click', () => setOpen(false)));
  document.addEventListener('click', (event) => {
    if (!header.contains(event.target)) setOpen(false);
  });
  document.addEventListener('keydown', (event) => {
    if (event.key === 'Escape' && header.classList.contains('menu-open')) {
      setOpen(false);
      toggle.focus();
    }
  });
  window.matchMedia('(min-width: 992px)').addEventListener('change', () => setOpen(false));
};

/** Navbar background, active link and back-to-top visibility, updated on scroll. */
const initScrollEffects = () => {
  const header = $('#siteHeader');
  const toTop = $('#toTop');
  const links = $$('.nav-item-link');
  const sections = links.map((link) => $(link.getAttribute('href')));
  let queued = false;

  const update = () => {
    header.classList.toggle('scrolled', window.scrollY > 20);
    toTop.classList.toggle('show', window.scrollY > 600);

    // The active section is the last one whose top has passed the marker line.
    const marker = window.innerHeight * 0.35;
    let current = 0;
    sections.forEach((section, index) => {
      if (section.getBoundingClientRect().top <= marker) current = index;
    });
    const atBottom = window.innerHeight + window.scrollY >= document.documentElement.scrollHeight - 2;
    if (atBottom) current = sections.length - 1;

    links.forEach((link, index) => {
      link.classList.toggle('active', index === current);
      if (index === current) link.setAttribute('aria-current', 'location');
      else link.removeAttribute('aria-current');
    });
    queued = false;
  };

  const requestUpdate = () => {
    if (!queued) {
      queued = true;
      requestAnimationFrame(update);
    }
  };

  window.addEventListener('scroll', requestUpdate, { passive: true });
  window.addEventListener('resize', requestUpdate);
  toTop.addEventListener('click', () => {
    window.scrollTo({ top: 0 }); // follows the CSS scroll-behavior setting
    $('.logo').focus({ preventScroll: true });
  });
  update();
};

/** Reveal elements as they enter the screen; skill chips appear one by one. */
const initReveal = () => {
  const items = $$('.reveal');
  $$('.skill-list').forEach((list) => {
    $$('li', list).forEach((chip, index) => chip.style.setProperty('--i', index));
  });

  if (!('IntersectionObserver' in window)) {
    items.forEach((item) => item.classList.add('visible'));
    return;
  }

  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (!entry.isIntersecting) return;
      entry.target.classList.add('visible');
      observer.unobserve(entry.target);
    });
  }, { threshold: 0.08 });

  items.forEach((item) => observer.observe(item));
};

/** Project cards: highlight on mouse, pen or touch. Keyboard focus is styled in CSS. */
const initProjectCards = () => {
  $$('.project-card').forEach((card) => {
    card.addEventListener('pointerenter', () => card.classList.add('is-active'));
    ['pointerleave', 'pointercancel'].forEach((type) => {
      card.addEventListener(type, () => card.classList.remove('is-active'));
    });
  });
};

/** Dark/light theme toggle. The choice is remembered when storage is available. */
const initTheme = () => {
  const button = $('#themeToggle');

  const apply = (theme) => {
    const isLight = theme === 'light';
    document.documentElement.dataset.theme = theme;
    button.setAttribute('aria-label', `Switch to ${isLight ? 'dark' : 'light'} theme`);
    $('i', button).className = `bi ${isLight ? 'bi-moon-stars' : 'bi-sun'}`;
    $('meta[name="theme-color"]').content = isLight ? '#f7f8fd' : '#0b1020';
  };

  try {
    if (localStorage.getItem('theme') === 'light') apply('light');
  } catch { /* Storage blocked: keep the default dark theme. */ }

  button.addEventListener('click', () => {
    const next = document.documentElement.dataset.theme === 'light' ? 'dark' : 'light';
    apply(next);
    try { localStorage.setItem('theme', next); } catch { /* Not essential. */ }
  });
};

/** Contact form: opens a pre-filled draft in the visitor's email app. No backend. */
const initContactForm = () => {
  const form = $('#contactForm');

  form.addEventListener('submit', (event) => {
    event.preventDefault();
    const data = new FormData(form);
    const value = (key) => data.get(key).trim();

    if (!value('name') || !value('subject') || !value('message')) {
      $('#formStatus').textContent = 'Please fill in your name, subject and message.';
      return;
    }

    const subject = encodeURIComponent(value('subject'));
    const body = encodeURIComponent(`${value('message')}\n\nFrom: ${value('name')}`);
    window.location.href = `mailto:shaikhmaazahmad786@gmail.com?subject=${subject}&body=${body}`;
    $('#formStatus').textContent = 'Check your email app and press Send there. If no draft opened, email shaikhmaazahmad786@gmail.com directly.';
  });
};

const initYear = () => {
  $('#year').textContent = new Date().getFullYear();
};

[initTheme, initMobileNav, initScrollEffects, initReveal, initProjectCards, initContactForm, initYear]
  .forEach((init) => init());
