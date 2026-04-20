/* ============================================================
   SHARED SITE JAVASCRIPT
   ============================================================ */

// ── Theme toggle ──────────────────────────────────────────────
const MOON_SVG = `<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"/></svg>`;
const SUN_SVG  = `<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="5"/><line x1="12" y1="1" x2="12" y2="3"/><line x1="12" y1="21" x2="12" y2="23"/><line x1="4.22" y1="4.22" x2="5.64" y2="5.64"/><line x1="18.36" y1="18.36" x2="19.78" y2="19.78"/><line x1="1" y1="12" x2="3" y2="12"/><line x1="21" y1="12" x2="23" y2="12"/><line x1="4.22" y1="19.78" x2="5.64" y2="18.36"/><line x1="18.36" y1="5.64" x2="19.78" y2="4.22"/></svg>`;

function isDark() {
  return document.documentElement.getAttribute('data-theme') === 'dark';
}

function updateToggleIcons() {
  // Show sun when dark (click to go light), moon when light (click to go dark)
  const icon = isDark() ? SUN_SVG : MOON_SVG;
  document.querySelectorAll('.theme-toggle').forEach(btn => btn.innerHTML = icon);
}

function toggleTheme() {
  const next = isDark() ? 'light' : 'dark';
  document.documentElement.setAttribute('data-theme', next);
  localStorage.setItem('theme', next);
  updateToggleIcons();
}

document.addEventListener('DOMContentLoaded', () => {
  updateToggleIcons();
  document.querySelectorAll('.theme-toggle').forEach(btn =>
    btn.addEventListener('click', toggleTheme)
  );
});

// Also listen for system preference changes
window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', e => {
  if (!localStorage.getItem('theme')) {
    document.documentElement.setAttribute('data-theme', e.matches ? 'dark' : 'light');
    updateToggleIcons();
  }
});

// ── Active nav link ────────────────────────────────────────────
(function () {
  const page = window.location.pathname.split('/').pop() || 'index.html';
  document.querySelectorAll('.nav-links a, .nav-drawer a').forEach(link => {
    const href = link.getAttribute('href');
    if (
      href === page ||
      (page === '' && href === 'index.html') ||
      (href === 'index.html' && (page === '' || page === '/'))
    ) {
      link.classList.add('active');
    }
  });
})();

// ── Mobile hamburger menu ─────────────────────────────────────
const hamburger = document.getElementById('hamburger');
const drawer    = document.getElementById('nav-drawer');

if (hamburger && drawer) {
  hamburger.addEventListener('click', () => {
    const open = drawer.style.display === 'flex';
    drawer.style.display = open ? 'none' : 'flex';
    hamburger.setAttribute('aria-expanded', String(!open));
  });

  drawer.querySelectorAll('a').forEach(a =>
    a.addEventListener('click', () => { drawer.style.display = 'none'; })
  );
}

// ── Lightbox ──────────────────────────────────────────────────
const lightbox      = document.getElementById('lightbox');
const lightboxImg   = document.getElementById('lightbox-img');
const lightboxClose = document.getElementById('lightbox-close');

function openLightbox(src) {
  if (!lightbox || !lightboxImg) return;
  lightboxImg.src = src;
  lightbox.classList.add('open');
  document.body.style.overflow = 'hidden';
}

function closeLightbox() {
  if (!lightbox) return;
  lightbox.classList.remove('open');
  document.body.style.overflow = '';
}

if (lightboxClose) lightboxClose.addEventListener('click', closeLightbox);
if (lightbox) lightbox.addEventListener('click', e => { if (e.target === lightbox) closeLightbox(); });

document.addEventListener('keydown', e => { if (e.key === 'Escape') { closeLightbox(); } });

document.addEventListener('DOMContentLoaded', () => {
  document.querySelectorAll('[data-lightbox]').forEach(img => {
    img.style.cursor = 'zoom-in';
    img.addEventListener('click', () => openLightbox(img.src));
  });
});
