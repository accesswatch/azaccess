# Accessibility Prototype

This folder contains static HTML prototypes for the accessibility.arizona.edu accessibility site.

## Run locally

From WSL:

```bash
cd /mnt/c/code/azaccess/work/web
python -m http.server 8000
```

Then open `http://localhost:8000/home.html` in a browser.

## Information architecture

- `home.html` — Entry point with hubs and quick links.
- `accessibility-101.html` — Primer and cross-links into hubs.
- Hubs:
	- `documents-media.html`
	- `web-app.html`
	- `teaching-learning.html`
	- `procurement.html`
	- `policies-governance.html`
	- `tools-checklists.html`
	- `support.html`
- Personas:
	- `personas.html` and `persona-*.html`
- Patterns and guides: HTML counterparts to `../shared/*.md` (e.g., `doc-word.html`, `media-captioning.html`, `testing-tools.html`, `skip-link-snippet.html`, `lms-brightspace.html`, `pedagogy-checklist.html`).

All pages share a common header/nav and a visible skip link for accessibility.
