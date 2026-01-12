# AZAccess — Repository Structure and Content Layout

This document describes the content layout, primary folders, and important files in this repository. It is intended to help contributors quickly understand where site content, templates, scripts, and deployment artifacts live.

Base assumptions

- This repo is a static-site source for the Arizona accessibility site. Content is provided as HTML and Markdown in `docs/`, the repo root, and several helper folders. The site is published via the repo's deployment scripts.
- Use `sitemap.xml` at repo root as the generated site map (placeholder base URL). Update `base` in search/hosting if you publish to a different domain.

Top-level files

- `index.html`: Home page entry at repo root.
- `README.md`, `CHANGELOG.md`: Repo docs and changelog.
- `package.json`: Node metadata for `ai-assistant/` and other tooling.
- `playwright.a11y.config.js`: Accessibility test config for Playwright.
- `deploy-gh.ps1`, `publish-to-github.ps1`, `update-site.ps1`: Windows PowerShell deployment utilities.

Key folders

- `docs/` — Primary site content (many HTML pages). Most user-facing pages are under this folder.
- `_includes/` — HTML fragments and partials used by templates or site integrations (e.g., `drc-notice.html`, `ua-framework.html`).
- `add/` — Additional pages and helper HTML/Markdown (includes `site-integration/`, `html/`).
- `ai-assistant/` — Assistant/tooling prototype (has its own `package.json`, `src/`, and wrangler config). Useful for AI integrations and tooling.
- `work/` — Work-in-progress copies of site pages and shared fragments (e.g., `work/web/` and `work/shared/`).
- `scripts/` — Project scripts (converter/automation). Example: `add-ai-assistant-link-v2.js`.
- `tests/` — Automated tests (including `accessibility/` test files).
- `docs/manifest.json` — Progressive Web App / metadata for the site (if used).

Content organization notes

- Canonical site pages live in `docs/` and at root HTML files. There are duplicated or working copies under `work/`.
- The `add/` folder contains integration snippets and additional export targets (`add/site-integration/partials`, `add/html`).
- `_includes/` contains fragments inserted into pages at build/publish time.

Build & Preview

- The workspace contains VS Code tasks to convert Markdown to HTML using `pandoc` (see the Workspace tasks): `Convert Markdown to HTML` and `Show Markdown File` tasks. On Windows, `c:\bci\pandoc\pandoc.exe` is referenced by the task.
- For quick previews, open the generated HTML in a static server or `live-server` as configured in tasks.

Deployment

- Deployment helpers are PowerShell scripts at the repo root: `deploy-gh.ps1`, `publish-to-github.ps1`, and `update-site.ps1`.
- Confirm base URL and redirect rules before running deployment scripts.

Where to edit content

- For content changes, edit files under `docs/` and `add/` (or their Markdown counterparts where available). For template/partials update `_includes/`.
- For tooling changes, check `ai-assistant/`, `scripts/`, and `package.json`.

How this map was produced

- This description was produced by scanning the repository root and primary folders (`docs/`, `_includes/`, `add/`, `work/`, `ai-assistant/`, `scripts/`). It summarizes the layout and key files a contributor will typically need.

If you'd like, I can also:

- Add a short CONTRIBUTING.md describing how to add/update pages and run the `pandoc` tasks.
- Generate a small script to verify broken links and run an accessibility audit (Playwright + axe-core).

-- End of file
