#!/usr/bin/env python3
"""
Move HTML files from work/web/shared into work/web root, update internal paths,
and update links in work/web and docs to point to the new locations.
"""
import os, re, shutil
repo = os.path.abspath(os.path.join(os.path.dirname(__file__), '..'))
web_shared = os.path.join(repo, 'work', 'web', 'shared')
web_root = os.path.join(repo, 'work', 'web')
docs_dir = os.path.join(repo, 'docs')

if not os.path.isdir(web_shared):
    print('No work/web/shared directory found; nothing to do')
    raise SystemExit(1)

html_files = [f for f in os.listdir(web_shared) if f.lower().endswith('.html')]
print('Found', len(html_files), 'HTML files in work/web/shared')

for name in html_files:
    src = os.path.join(web_shared, name)
    dst = os.path.join(web_root, name)
    print('Processing', name)
    with open(src, 'r', encoding='utf-8') as fh:
        s = fh.read()
    # Adjust CSS/home links: when moved to web root, ../styles.css -> styles.css, ../home.html -> home.html
    s = s.replace('../styles.css', 'styles.css')
    s = s.replace('../home.html', 'home.html')
    # If the renderer fetches the md file in same folder, change to fetch from shared/ subfolder
    # e.g. const mdFile = 'wcag22-highlights.md' -> 'shared/wcag22-highlights.md'
    s = re.sub(r"const\s+mdFile\s*=\s*'([^']+?\.md)'", lambda m: "const mdFile = 'shared/{}'".format(m.group(1)), s)
    s = re.sub(r'const\s+mdFile\s*=\s*"([^\"]+?\.md)"', lambda m: 'const mdFile = "shared/{}"'.format(m.group(1)), s)
    # Also, if any other relative fetch paths exist like fetch(mdFile) and use ../shared, normalize to shared/
    s = s.replace("fetch('../shared/", "fetch('shared/")
    s = s.replace('fetch("../shared/', 'fetch("shared/')
    # Write to web root (overwrite if exists)
    with open(dst, 'w', encoding='utf-8') as fh:
        fh.write(s)
    print('Wrote', dst)

# Update links in work/web HTML files: replace href="shared/<name>.html" -> href="<name>.html"
print('Updating references in work/web HTML files...')
for root,dirs,files in os.walk(web_root):
    for f in files:
        if not f.lower().endswith('.html'):
            continue
        path = os.path.join(root,f)
        with open(path,'r',encoding='utf-8') as fh:
            t = fh.read()
        orig = t
        # href='shared/foo.html' or href="shared/foo.html"
        t = re.sub(r"href=(?P<q>[\'\"])shared/(?P<n>[^\'\"]+?\.html)(?P=q)", lambda m: f"href={m.group('q')}{m.group('n')}{m.group('q')}", t)
        # Also JS strings 'shared/foo.html'
        t = re.sub(r"(?P<q>[\'\"])shared/(?P<n>[^\'\"]+?\.html)(?P=q)", lambda m: f"{m.group('q')}{m.group('n')}{m.group('q')}", t)
        if t != orig:
            with open(path,'w',encoding='utf-8') as fh:
                fh.write(t)
            print('Patched links in', path)

# Update docs HTML files: replace ../work/web/shared/foo.html -> ../work/web/foo.html
if os.path.isdir(docs_dir):
    print('Updating references in docs HTML files...')
    for root,dirs,files in os.walk(docs_dir):
        for f in files:
            if not f.lower().endswith('.html'):
                continue
            path = os.path.join(root,f)
            with open(path,'r',encoding='utf-8') as fh:
                t = fh.read()
            orig = t
            t = re.sub(r"\.\./work/web/shared/([\w\-]+?\.html)", r"../work/web/\1", t)
            t = re.sub(r"\.\./work/web/shared/([\w\-]+?\.md)", r"../work/web/shared/\1", t)
            if t != orig:
                with open(path,'w',encoding='utf-8') as fh:
                    fh.write(t)
                print('Patched links in', path)

# Remove HTML files from work/web/shared (keep md and assets)
print('Removing HTML files from work/web/shared...')
for name in html_files:
    p = os.path.join(web_shared, name)
    try:
        os.remove(p)
        print('Deleted', p)
    except Exception as e:
        print('Failed to delete', p, e)

print('Done')
