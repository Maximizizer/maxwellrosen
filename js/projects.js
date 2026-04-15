/* ============================================================
   PROJECTS DATA
   ────────────────────────────────────────────────────────────
   HOW TO ADD / EDIT PROJECTS:

   Add a new object to the `projects` array below.

   Fields:
     title       — Project name (required)
     subtitle    — One-line tagline (optional)
     description — Full description shown in the modal. Supports HTML.
     tags        — Array of technology/topic strings
     images      — Array of image paths (put files in images/projects/)
                   Leave empty [] to show a placeholder.
     liveUrl     — URL to live demo/site (optional, set to "" to hide)
     githubUrl   — GitHub repository URL (optional, set to "" to hide)
     extraLinks  — Array of {label, url} for any additional links

   ============================================================ */

const projects = [
  {
    title:       "Project One",
    subtitle:    "A brief tagline for the project",
    description: `<p>Describe what this project does, the problem it solves, and what you learned building it. You can include <strong>bold text</strong> or other HTML here.</p>
                  <p>Add a second paragraph with more detail about your approach, challenges you overcame, or notable technical decisions.</p>`,
    tags:        ["JavaScript", "Node.js", "PostgreSQL"],
    images:      [],          // e.g. ["images/projects/proj1-a.jpg", "images/projects/proj1-b.jpg"]
    liveUrl:     "",          // e.g. "https://myproject.com"
    githubUrl:   "",          // e.g. "https://github.com/you/repo"
    extraLinks:  []           // e.g. [{label: "Paper", url: "https://..."}, ...]
  },
  {
    title:       "Project Two",
    subtitle:    "Another great project",
    description: `<p>Write a compelling description here. What makes this project interesting? Who is it for?</p>`,
    tags:        ["Python", "Machine Learning", "React"],
    images:      [],
    liveUrl:     "",
    githubUrl:   "",
    extraLinks:  []
  },
  {
    title:       "Project Three",
    subtitle:    "Third project tagline",
    description: `<p>Project description goes here. Highlight what makes this project unique and the impact it had.</p>`,
    tags:        ["TypeScript", "AWS", "Docker"],
    images:      [],
    liveUrl:     "",
    githubUrl:   "",
    extraLinks:  []
  }
];

/* ── Rendering ───────────────────────────────────────────────── */
function renderProjects() {
  const grid = document.getElementById('projects-grid');
  if (!grid) return;

  grid.innerHTML = projects.map((p, i) => `
    <div class="project-card" onclick="openProjectModal(${i})" role="button" tabindex="0"
         aria-label="View details for ${p.title}"
         onkeydown="if(event.key==='Enter')openProjectModal(${i})">
      ${p.images.length > 0
        ? `<img class="project-card-img" src="${p.images[0]}" alt="${p.title}" loading="lazy">`
        : `<div class="project-card-img-placeholder">
             <svg width="36" height="36" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5">
               <rect x="3" y="3" width="18" height="18" rx="2"/>
               <circle cx="8.5" cy="8.5" r="1.5"/>
               <polyline points="21 15 16 10 5 21"/>
             </svg>
           </div>`
      }
      <div class="project-card-body">
        <div class="project-card-title">${p.title}</div>
        <div class="project-card-desc">${stripHtml(p.description)}</div>
        <div class="project-card-footer">
          <div class="tags">
            ${p.tags.slice(0,3).map(t => `<span class="tag">${t}</span>`).join('')}
          </div>
          <span class="btn btn-ghost btn-sm">View →</span>
        </div>
      </div>
    </div>
  `).join('');
}

function stripHtml(html) {
  const tmp = document.createElement('div');
  tmp.innerHTML = html;
  return tmp.textContent || tmp.innerText || '';
}

/* ── Modal ───────────────────────────────────────────────────── */
function openProjectModal(index) {
  const p       = projects[index];
  const overlay = document.getElementById('project-modal-overlay');
  const modal   = document.getElementById('project-modal');
  if (!overlay || !modal) return;

  // Title & subtitle
  modal.querySelector('#modal-title').textContent    = p.title;
  modal.querySelector('#modal-subtitle').textContent = p.subtitle || '';

  // Tags
  const tagsEl = modal.querySelector('#modal-tags');
  tagsEl.innerHTML = p.tags.map(t => `<span class="tag">${t}</span>`).join('');

  // Images
  const galleryEl = modal.querySelector('#modal-gallery');
  if (p.images.length > 0) {
    galleryEl.innerHTML = p.images.map(src =>
      `<img class="modal-gallery-img" src="${src}" alt="${p.title}" data-lightbox loading="lazy">`
    ).join('');
    // Re-attach lightbox listeners
    galleryEl.querySelectorAll('[data-lightbox]').forEach(img => {
      img.style.cursor = 'zoom-in';
      img.addEventListener('click', () => openLightbox(img.src));
    });
  } else {
    galleryEl.innerHTML = `
      <div class="modal-gallery-placeholder">
        <span style="color:var(--text-light);font-size:0.85rem;">Add images to images/projects/ and list them in projects.js</span>
      </div>`;
  }

  // Description
  modal.querySelector('#modal-desc').innerHTML = p.description;

  // Links
  const linksEl = modal.querySelector('#modal-links');
  const linkBtns = [];
  if (p.liveUrl) linkBtns.push(
    `<a class="btn btn-primary" href="${p.liveUrl}" target="_blank" rel="noopener">
       <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"/><polyline points="15 3 21 3 21 9"/><line x1="10" y1="14" x2="21" y2="3"/></svg>
       Live Demo
     </a>`
  );
  if (p.githubUrl) linkBtns.push(
    `<a class="btn btn-secondary" href="${p.githubUrl}" target="_blank" rel="noopener">
       <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0 1 12 6.844a9.59 9.59 0 0 1 2.504.337c1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.02 10.02 0 0 0 22 12.017C22 6.484 17.522 2 12 2Z"/></svg>
       GitHub
     </a>`
  );
  p.extraLinks.forEach(l => {
    linkBtns.push(`<a class="btn btn-ghost" href="${l.url}" target="_blank" rel="noopener">${l.label}</a>`);
  });
  linksEl.innerHTML = linkBtns.join('');

  overlay.classList.add('open');
  document.body.style.overflow = 'hidden';
}

function closeProjectModal() {
  const overlay = document.getElementById('project-modal-overlay');
  if (overlay) {
    overlay.classList.remove('open');
    document.body.style.overflow = '';
  }
}

document.addEventListener('DOMContentLoaded', () => {
  renderProjects();

  const overlay = document.getElementById('project-modal-overlay');
  if (overlay) {
    overlay.addEventListener('click', e => {
      if (e.target === overlay) closeProjectModal();
    });
  }

  document.addEventListener('keydown', e => {
    if (e.key === 'Escape') closeProjectModal();
  });
});
