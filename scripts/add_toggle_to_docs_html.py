#!/usr/bin/env python3
"""
Add a nav toggle button and include docs/header.js to all HTML files under docs.
Conservative: only modifies files that contain a .site-header-brand and a link to styles.css
"""
import os
from pathlib import Path
repo = Path(__file__).resolve().parents[1]
root = repo / 'docs'
files = list(root.glob('*.html'))
print('Found', len(files), 'HTML files in docs')
button_html = '      <button class="nav-toggle" aria-expanded="false" aria-controls="primary-nav">☰ Menu</button>\n'
script_tag = '  <script src="header.js" defer></script>\n'
modified = []
for p in files:
    txt = p.read_text(encoding='utf-8')
    if 'site-header-brand' not in txt or 'styles.css' not in txt:
        continue
    new = txt
    if 'header.js' not in new:
        new = new.replace('</head>', script_tag + '</head>')
    if 'nav-toggle' not in new:
        new = new.replace('<div class="site-header-brand">', '<div class="site-header-brand">\n' + button_html)
    if new != txt:
        p.write_text(new, encoding='utf-8')
        modified.append(str(p))
print('Modified', len(modified), 'files')
for m in modified:
    print('-', m)
