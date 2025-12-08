Installation instructions — two common setups

1) Static site (Jekyll / plain HTML)

- Copy files from `add/site-integration/partials/` to your site's `_includes/` or `partials/` folder.
-- Include the partial where you want it: e.g., Jekyll: `{% raw %}{% include ua-framework.html %}{% endraw %}` or plain HTML: `<!-- inject: ua-framework.html -->`.
- Copy `nav-snippet.html` into your main navigation template to add a Quickstart link.
- If you want per-course pages, run `python scripts/import_courses.py` (creates `content/courses/`) and copy these files to your site's content folder.

2) Static site generator (Hugo / Eleventy)

- Copy `partials/ua-framework.html` into your theme's `partials/` or `layouts/` depending on the framework.
- Copy generated `content/courses/*.md` into your SSG `content/` or `src/content/` as appropriate.

If you want me to apply these changes directly to your site repo, provide the repository path or a Git remote and confirm you want me to create a branch and a PR.
