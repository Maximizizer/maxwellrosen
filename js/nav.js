/* ============================================================
   SHARED NAVIGATION
   The top menu and mobile drawer for every page live here.
   To add, remove, or rename a page link, edit NAV_LINKS below.

   Each page loads this with <script src="js/nav.js"></script>
   as the first thing inside <body>. It runs immediately (not
   deferred) so the menu is on screen before the rest of the page
   draws, with no flicker. Clicks, the theme toggle, and the
   hamburger are wired up in js/main.js.
   ============================================================ */
(function () {
  const NAV_BRAND = 'Maxwell Rosen';
  const NAV_LINKS = [
    { href: 'index.html',        label: 'About' },
    { href: 'professional.html', label: 'Professional' },
    { href: 'projects.html',     label: 'Projects' }
  ];

  // Highlight the link for the current page ("/" counts as index.html)
  const page = window.location.pathname.split('/').pop() || 'index.html';
  const links = NAV_LINKS.map(l => {
    const active = l.href === page;
    return `<a href="${l.href}"${active ? ' class="active" aria-current="page"' : ''}>${l.label}</a>`;
  }).join('\n      ');

  const html = `
<nav class="nav">
  <div class="nav-inner">
    <a class="nav-brand" href="index.html">${NAV_BRAND}</a>
    <div class="nav-links">
      ${links}
    </div>
    <button class="theme-toggle" aria-label="Toggle dark mode"></button>
    <button class="nav-hamburger" id="hamburger" aria-label="Open menu" aria-expanded="false">
      <span></span><span></span><span></span>
    </button>
  </div>
</nav>
<div class="nav-drawer" id="nav-drawer">
      ${links}
</div>`;

  document.currentScript.insertAdjacentHTML('beforebegin', html);
})();
