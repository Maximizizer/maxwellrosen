/* ============================================================
   SHARED SITE JAVASCRIPT
   ============================================================ */

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

  // Close drawer on link click
  drawer.querySelectorAll('a').forEach(a =>
    a.addEventListener('click', () => { drawer.style.display = 'none'; })
  );
}

// ── Lightbox ──────────────────────────────────────────────────
const lightbox     = document.getElementById('lightbox');
const lightboxImg  = document.getElementById('lightbox-img');
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

document.addEventListener('keydown', e => { if (e.key === 'Escape') closeLightbox(); });

// Attach lightbox to all gallery images on page load
document.addEventListener('DOMContentLoaded', () => {
  document.querySelectorAll('[data-lightbox]').forEach(img => {
    img.style.cursor = 'zoom-in';
    img.addEventListener('click', () => openLightbox(img.src));
  });
});
