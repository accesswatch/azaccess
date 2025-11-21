#!/usr/bin/env python3
"""
Add a nav toggle button and include header.js to all HTML files under work/web.
Conservative: only modifies files that contain a .site-header-brand and a link to styles.css
"""
import os,sys
from pathlib import Path
repo = Path(__file__).resolve().parents[1]
root = repo / 'work' / 'web'
files = list(root.glob('*.html'))
print('Found', len(files), 'HTML files')
button_html = '      <button class="nav-toggle" aria-expanded="false" aria-controls="primary-nav">☰ Menu</button>\n'
script_tag = '  <script src="header.js" defer></script>\n'
modified = []
for p in files:
    txt = p.read_text(encoding='utf-8')
    if 'site-header-brand' not in txt or 'styles.css' not in txt:
        continue
    new = txt
    # add script tag before </head> if not present
    if 'header.js' not in new:
        new = new.replace('</head>', script_tag + '</head>')
    # insert button after site-header-brand div if not present
    if 'nav-toggle' not in new:
        new = new.replace('<div class="site-header-brand">', '<div class="site-header-brand">\n' + button_html)
    if new != txt:
        p.write_text(new, encoding='utf-8')
        modified.append(str(p))
print('Modified', len(modified), 'files')
for m in modified:
    print('-', m)
