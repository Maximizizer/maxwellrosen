# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Deployment

This is a **static HTML/CSS/JS site** with no build step. Deploy by committing and pushing to `main`:

```bash
git add <files>
git commit -m "description"
git push origin main
```

GitHub Pages auto-publishes from `main`. Live at: **https://maximizizer.github.io/maxwellrosen/**

To preview locally, open any `.html` file directly in a browser (no server needed for most features; PDF previews require a local server due to iframe restrictions).

## Architecture

Three pages share a single stylesheet and JS file:

| File | Purpose |
|------|---------|
| `index.html` | About page — hero, bio, skills, interests |
| `professional.html` | Resume/CV PDF preview + download |
| `projects.html` | Filterable project cards with modal detail view |
| `css/style.css` | Single stylesheet (~870 lines), all theming via CSS variables |
| `js/main.js` | Shared JS: theme toggle, active nav, hamburger, lightbox |
| `js/projects.js` | Projects data array + card/modal rendering logic |

### Adding or editing a project

Edit the `projects` array in `js/projects.js`. Each entry:

```js
{
  title:       "Project Name",
  subtitle:    "Short tagline",
  description: "HTML string shown at top of modal",
  tags:        ["Python", "Hardware"],          // drives filter bar
  images:      [
    { src: "images/projects/foo.jpg", caption: "Caption text" }
  ],
  liveUrl:     "",                              // or full URL
  githubUrl:   "https://github.com/...",
  extraLinks:  [{ label: "Paper", url: "..." }] // optional
}
```

Filter buttons are auto-generated from all unique tags. The modal renders: description → links → divider → image gallery.

### Theming (dark mode)

CSS variables are defined in `:root` (light) and overridden in `[data-theme="dark"]`. Key accent color: `#0d9488` (light) / `#14b8a6` (dark). Toggle state is persisted in `localStorage('theme')`. Each HTML page has an inline `<script>` in `<head>` that reads localStorage/system preference before CSS loads — this prevents flash of unstyled content (FOUC). Do not remove these inline scripts.

### Images

- Profile photo: `images/photos/headshot.jpg`
- Project images: `images/projects/`
- Resize with macOS `sips`: `sips -Z 1400 image.jpg` (max 1400px, preserves aspect ratio)
- Add `data-lightbox` attribute to any `<img>` to make it click-to-enlarge via the shared lightbox.

### PDF documents

Drop files into `documents/` using these names: `resume.pdf`, `cv.pdf`. The professional page lazy-loads iframes when Preview is clicked and shows a "File not found" message if missing.
