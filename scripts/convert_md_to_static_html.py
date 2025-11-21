#!/usr/bin/env python3
"""
Convert markdown files from work/shared (and work/web/shared) to static HTML files in work/web.
- Uses `markdown` and `yaml` (PyYAML) to parse front-matter and convert to HTML.
- Writes `work/web/<name>.html` for every .md found.
- Does not delete original markdown files.
"""
import os, re, sys
try:
    import markdown
except Exception:
    print('Missing python package "markdown". Install with: pip install markdown')
    raise
try:
    import yaml
except Exception:
    print('Missing python package "PyYAML". Install with: pip install pyyaml')
    raise

repo = os.path.abspath(os.path.join(os.path.dirname(__file__), '..'))
work_shared = os.path.join(repo, 'work', 'shared')
web_shared = os.path.join(repo, 'work', 'web', 'shared')
web_root = os.path.join(repo, 'work', 'web')

md_paths = []
for d in (work_shared, web_shared):
    if os.path.isdir(d):
        for name in os.listdir(d):
            if name.lower().endswith('.md'):
                md_paths.append(os.path.join(d, name))

print(f'Found {len(md_paths)} markdown files to convert')

def read_md(path):
    with open(path, 'r', encoding='utf-8') as fh:
        text = fh.read()
    fm = None
    body = text
    if text.startswith('---'):
        m = re.match(r'^---\n([\s\S]*?)\n---\n?', text)
        if m:
            fm = yaml.safe_load(m.group(1))
            body = text[m.end():]
    return fm or {}, body

html_template = '''<!doctype html>
<html lang="en">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width,initial-scale=1">
  <title>{title}</title>
  <link rel="stylesheet" href="styles.css">
</head>
<body>
  <a class="skip-link" href="#maincontent">Skip to main content</a>
  <header id="page-header"><p><a href="home.html">Accessibility Home</a> / Docs</p></header>
  <main id="maincontent" class="doc-content">
    <article id="content">{content}</article>
  </main>
  <footer>
    <p>&copy; 2025 The University of Arizona.</p>
  </footer>
</body>
</html>
'''

for md in md_paths:
    print('Converting', md)
    fm, body = read_md(md)
    title = fm.get('title') or os.path.splitext(os.path.basename(md))[0]
    # convert markdown to html
    html_body = markdown.markdown(body, extensions=['fenced_code','tables','attr_list'])
    # write to work/web/<name>.html
    out_name = os.path.splitext(os.path.basename(md))[0] + '.html'
    out_path = os.path.join(web_root, out_name)
    with open(out_path, 'w', encoding='utf-8') as fh:
        fh.write(html_template.format(title=title + ' | Accessibility', content=html_body))
    print('Wrote', out_path)

print('Done: converted', len(md_paths), 'files')
