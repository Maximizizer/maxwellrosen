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
  // Keep the page locked if a modal is still open underneath
  if (!isModalOpen()) document.body.style.overflow = '';
}

function isLightboxOpen() {
  return !!(lightbox && lightbox.classList.contains('open'));
}

if (lightboxClose) lightboxClose.addEventListener('click', closeLightbox);
if (lightbox) lightbox.addEventListener('click', e => { if (e.target === lightbox) closeLightbox(); });

// Any <img data-lightbox> opens the lightbox, including images added later (e.g. inside modals)
document.addEventListener('click', e => {
  const img = e.target.closest('img[data-lightbox]');
  if (img) openLightbox(img.currentSrc || img.src);
});

// ── Shared modal ──────────────────────────────────────────────
// openModal({ title, subtitle, headerHtml, html, onClose })
// Used by project cards (projects.js) and interest cards (index.html).
let modalOnClose = null;
let modalReturnFocus = null;

function getModal() {
  let overlay = document.getElementById('site-modal-overlay');
  if (overlay) return overlay;

  overlay = document.createElement('div');
  overlay.className = 'modal-overlay';
  overlay.id = 'site-modal-overlay';
  overlay.setAttribute('role', 'dialog');
  overlay.setAttribute('aria-modal', 'true');
  overlay.setAttribute('aria-labelledby', 'modal-title');
  overlay.innerHTML = `
    <div class="modal">
      <div class="modal-header">
        <div>
          <div class="modal-title" id="modal-title"></div>
          <div class="modal-subtitle" id="modal-subtitle"></div>
          <div id="modal-header-extra"></div>
        </div>
        <button class="modal-close" aria-label="Close">✕</button>
      </div>
      <div class="modal-body" id="modal-body"></div>
    </div>`;
  document.body.appendChild(overlay);

  overlay.addEventListener('click', e => { if (e.target === overlay) closeModal(); });
  overlay.querySelector('.modal-close').addEventListener('click', closeModal);
  return overlay;
}

function openModal({ title = '', subtitle = '', headerHtml = '', html = '', onClose = null } = {}) {
  const overlay = getModal();
  overlay.querySelector('#modal-title').textContent = title;
  const sub = overlay.querySelector('#modal-subtitle');
  sub.textContent = subtitle;
  sub.style.display = subtitle ? '' : 'none';
  overlay.querySelector('#modal-header-extra').innerHTML = headerHtml;
  overlay.querySelector('#modal-body').innerHTML = html;

  modalOnClose = onClose;
  modalReturnFocus = document.activeElement;
  overlay.classList.add('open');
  overlay.scrollTop = 0;
  document.body.style.overflow = 'hidden';
  overlay.querySelector('.modal-close').focus({ preventScroll: true });
  return overlay.querySelector('#modal-body');
}

// Replace the body of the open modal (e.g. after a fetch finishes)
function setModalBody(html) {
  const body = document.querySelector('#site-modal-overlay #modal-body');
  if (body) body.innerHTML = html;
}

function isModalOpen() {
  const overlay = document.getElementById('site-modal-overlay');
  return !!(overlay && overlay.classList.contains('open'));
}

function closeModal() {
  const overlay = document.getElementById('site-modal-overlay');
  if (!overlay || !overlay.classList.contains('open')) return;
  overlay.classList.remove('open');
  document.body.style.overflow = '';
  const cb = modalOnClose;
  modalOnClose = null;
  if (cb) cb();
  if (modalReturnFocus && modalReturnFocus.focus) modalReturnFocus.focus({ preventScroll: true });
}

// Escape closes the lightbox first if it's on top, otherwise the modal
document.addEventListener('keydown', e => {
  if (e.key !== 'Escape') return;
  if (isLightboxOpen()) closeLightbox();
  else closeModal();
});

// ── Interest popups (index.html) ──────────────────────────────
// Each .interest-card[data-interest="slug"] loads interests/slug.html into the modal.
const interestCache = {};

function openInterest(card) {
  const slug     = card.dataset.interest;
  const title    = card.querySelector('.interest-title')?.textContent.trim() || '';
  const icon     = card.querySelector('.interest-icon')?.textContent.trim() || '';
  const subtitle = card.dataset.subtitle || '';

  openModal({
    title: icon ? `${icon}  ${title}` : title,
    subtitle,
    html: interestCache[slug] || '<p class="interest-loading">Loading…</p>',
    onClose: () => {
      if (location.hash === '#' + slug) {
        history.replaceState(null, '', location.pathname + location.search);
      }
    }
  });
  history.replaceState(null, '', '#' + slug);

  if (interestCache[slug]) return;
  fetch(`interests/${slug}.html`)
    .then(r => { if (!r.ok) throw new Error(r.status); return r.text(); })
    .then(html => {
      interestCache[slug] = `<div class="interest-content">${html}</div>`;
      if (isModalOpen() && location.hash === '#' + slug) setModalBody(interestCache[slug]);
    })
    .catch(() => {
      if (!isModalOpen() || location.hash !== '#' + slug) return;
      setModalBody(`
        <div class="interest-error">
          <strong>Couldn't load this section.</strong>
          <span>Try refreshing the page. (If you're previewing locally, run
          <code>python3 -m http.server</code> and open <code>localhost:8000</code>.)</span>
        </div>`);
    });
}

document.addEventListener('DOMContentLoaded', () => {
  const cards = document.querySelectorAll('.interest-card[data-interest]');
  cards.forEach(card => {
    card.addEventListener('click', () => openInterest(card));
    card.addEventListener('keydown', e => {
      if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); openInterest(card); }
    });
  });

  // Deep link: index.html#running opens the Running popup
  const slug = location.hash.slice(1);
  if (slug) {
    const card = document.querySelector(`.interest-card[data-interest="${CSS.escape(slug)}"]`);
    if (card) openInterest(card);
  }
});
