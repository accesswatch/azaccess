#!/usr/bin/env python3
"""
Sync shared markdown into work/web/shared, generate per-md HTML renderers, and update HTML links.
Run from repository root.
"""
import os, shutil, re
repo = os.path.abspath(os.path.join(os.path.dirname(__file__), '..'))
work_shared = os.path.join(repo, 'work', 'shared')
web_shared = os.path.join(repo, 'work', 'web', 'shared')
# Ensure target
os.makedirs(web_shared, exist_ok=True)
# Template for per-file html
html_template = """<!doctype html>
<html lang=\"en\">
<head>
  <meta charset=\"utf-8\" />
  <meta name=\"viewport\" content=\"width=device-width, initial-scale=1\" />
  <title>{title}</title>
  <link rel=\"stylesheet\" href=\"../styles.css\" />
</head>
<body>
  <a class=\"skip-link\" href=\"#maincontent\">Skip to main content</a>
  <header id=\"page-header\"><p><a href=\"../home.html\">Accessibility Home</a> / Docs</p></header>
  <main id=\"maincontent\" class=\"doc-content\">
    <article id=\"content\">Loading…</article>
  </main>
  <footer>
    <p>&copy; 2025 The University of Arizona.</p>
  </footer>
  <script src=\"https://cdn.jsdelivr.net/npm/marked/marked.min.js\"></script>
  <script>
    (async function(){
      const mdFile = '{mdfile}';
      try {
        const res = await fetch(mdFile);
        const text = await res.text();
        const fm = text.match(/^---\\n([\\s\\S]*?)\\n---/);
        let title = '';
        let body = text;
        if (fm) {
          const yaml = fm[1];
          const m = yaml.match(/^title:\\s*(.*)$/m);
          if (m) title = m[1].replace(/^\\s+|\\s+$/g,'').replace(/\"/g,'');
          body = text.slice(fm[0].length);
        }
        const html = marked.parse(body);
        if (title) document.title = title + ' | Accessibility';
        const header = title ? ('<h1>'+title+'</h1>') : '';
        document.getElementById('content').innerHTML = header + html;
      } catch (e) {
        document.getElementById('content').textContent = 'Error loading document: ' + e;
      }
    })();
  </script>
</body>
</html>
"""
# Copy md files and generate html files
md_files = [f for f in os.listdir(work_shared) if f.lower().endswith('.md')]
print(f'Found {len(md_files)} md files in {work_shared}')
for md in md_files:
    src = os.path.join(work_shared, md)
    dst_md = os.path.join(web_shared, md)
    shutil.copyfile(src, dst_md)
    # derive title from frontmatter if present
    title = md.replace('.md','')
    with open(src, 'r', encoding='utf-8') as fh:
        text = fh.read()
        m = re.search(r'^---\n([\s\S]*?)\n---', text)
        if m:
            ym = re.search(r'^title:\s*(.*)$', m.group(1), re.M)
            if ym:
                title = ym.group(1).strip().strip('"') + ' | Accessibility'
    # create html file
    html_name = md.replace('.md', '.html')
    dst_html = os.path.join(web_shared, html_name)
    with open(dst_html, 'w', encoding='utf-8') as out:
      out.write(html_template.replace('{mdfile}', md).replace('{title}', title))
print('Copied md files and generated html renderers in work/web/shared')

# Update links in work/web html files
web_dir = os.path.join(repo, 'work', 'web')
html_files = []
for root,dirs,files in os.walk(web_dir):
    for f in files:
        if f.lower().endswith('.html'):
            html_files.append(os.path.join(root,f))

pattern_md = re.compile(r"(href=\"|href=')(?P<prefix>\.\./shared/)(?P<name>[^\"']+?)\.md(?P<suffix>\"|')")
pattern_md2 = re.compile(r"(href=\"|href=')(?P<prefix>\.\./shared/)(?P<name>[^\"']+?)\.html(?P<suffix>\"|')")
for path in html_files:
    with open(path,'r',encoding='utf-8') as fh:
        s = fh.read()
    orig = s
    # Only change links that point to ../shared/*.md or ../shared/*.html to shared/*.html
    def repl_shared(m):
      q = m.group('q')
      name = m.group('name')
      return f'href={q}shared/{name}.html{q}'
    s = re.sub(r"href=(?P<q>[\"'])\.\./shared/(?P<name>[^\"']+?)\.md(?P=q)", repl_shared, s)
    s = re.sub(r"href=(?P<q>[\"'])\.\./shared/(?P<name>[^\"']+?)\.html(?P=q)", repl_shared, s)
    if s != orig:
        with open(path,'w',encoding='utf-8') as fh:
            fh.write(s)
print('Updated links in work/web HTML files')

# Update links in docs html files to point to ../work/web/shared/<name>.html
docs_dir = os.path.join(repo, 'docs')
docs_html = []
if os.path.isdir(docs_dir):
    for root,dirs,files in os.walk(docs_dir):
        for f in files:
            if f.lower().endswith('.html'):
                docs_html.append(os.path.join(root,f))

for path in docs_html:
    with open(path,'r',encoding='utf-8') as fh:
        s = fh.read()
    orig = s
    def repl_docs(m):
      q = m.group('q')
      name = m.group('name')
      return f'href={q}../work/web/shared/{name}.html{q}'
    s = re.sub(r"href=(?P<q>[\"'])\.\./shared/(?P<name>[^\"']+?)\.md(?P=q)", repl_docs, s)
    s = re.sub(r"href=(?P<q>[\"'])\.\./shared/(?P<name>[^\"']+?)\.html(?P=q)", repl_docs, s)
    if s != orig:
        with open(path,'w',encoding='utf-8') as fh:
            fh.write(s)
print('Updated links in docs HTML files')

# Also replace raw occurrences inside JS strings or other attributes that are not href=...
for path in html_files:
    with open(path,'r',encoding='utf-8') as fh:
        s = fh.read()
    orig = s
    # ../shared/foo.md -> shared/foo.html
    s = re.sub(r"\.\./shared/([\w\-]+?)\.md", r"shared/\1.html", s)
    s = re.sub(r"\.\./shared/([\w\-]+?)\.html", r"shared/\1.html", s)
    if s != orig:
        with open(path,'w',encoding='utf-8') as fh:
            fh.write(s)

for path in docs_html:
    with open(path,'r',encoding='utf-8') as fh:
        s = fh.read()
    orig = s
    s = re.sub(r"\.\./shared/([\w\-]+?)\.md", r"../work/web/shared/\1.html", s)
    s = re.sub(r"\.\./shared/([\w\-]+?)\.html", r"../work/web/shared/\1.html", s)
    if s != orig:
        with open(path,'w',encoding='utf-8') as fh:
            fh.write(s)
print('Rewrote raw ../shared/*.md occurrences in work/web and docs HTML files')

# Final scan: collect any occurrences of .md in HTML files under work/web and docs
report = []
for root in [web_dir, docs_dir]:
    if not root or not os.path.isdir(root):
        continue
    for r,ds,fs in os.walk(root):
        for f in fs:
            if f.lower().endswith('.html'):
                p = os.path.join(r,f)
                with open(p,'r',encoding='utf-8') as fh:
                    t = fh.read()
                if '.md"' in t or ".md'" in t:
                    report.append(p)

print('Files still referencing .md in HTML:')
for p in report:
    print('-', p)
print('Done')
