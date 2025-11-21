#!/usr/bin/env python3
"""
Apply safe, automated accessibility fixes across HTML files in work/web and docs.
Safe fixes implemented:
- Ensure nav-toggle buttons have type="button"
- Add role="navigation" to <nav> elements that have an aria-label or class suggesting navigation and are missing role
- Ensure <a> with target="_blank" use rel="noopener noreferrer" (if any)

This script edits files in-place. It prints a short summary.
"""
import re
from pathlib import Path

repo = Path(__file__).resolve().parents[1]
paths = [repo / 'work' / 'web', repo / 'docs']
files = []
for p in paths:
    if p.exists():
        files += list(p.glob('*.html'))

changed = []
for f in files:
    txt = f.read_text(encoding='utf-8')
    orig = txt
    # 1) add type="button" to nav-toggle buttons when missing
    def add_type_button(match):
        tag = match.group(0)
        if 'type=' in tag:
            return tag
        # insert type="button" after <button
        return tag.replace('<button', '<button type="button"', 1)
    txt = re.sub(r'<button\b([^>]*)class\s*=\s*"[^"]*nav-toggle[^"]*"[^>]*>', add_type_button, txt, flags=re.I)

    # 2) add role="navigation" to nav tags with aria-label or known classes when missing role
    def add_role_nav(match):
        tag = match.group(0)
        if re.search(r'\brole\s*=\s*"[^"]+"', tag, flags=re.I):
            return tag
        # insert role before closing '>'
        return tag[:-1] + ' role="navigation">'
    # navs with aria-label
    txt = re.sub(r'<nav\b([^>]*aria-label\s*=\s*"[^"]*"[^>]*)>', add_role_nav, txt, flags=re.I)
    # navs with classes like site-header-nav or site-header-utilities
    txt = re.sub(r'<nav\b([^>]*class\s*=\s*"[^"]*(?:site-header-nav|site-header-utilities)[^"]*"[^>]*)>', add_role_nav, txt, flags=re.I)

    # 3) ensure target blank links have rel noopener noreferrer
    def add_rel(match):
        tag = match.group(0)
        if 'rel=' in tag.lower():
            return tag
        return tag[:-1] + ' rel="noopener noreferrer">'
    txt = re.sub(r'<a\b([^>]*target\s*=\s*"_blank"[^>]*)>', add_rel, txt, flags=re.I)

    if txt != orig:
        f.write_text(txt, encoding='utf-8')
        changed.append(str(f))

print('Files processed:', len(files))
print('Files changed:', len(changed))
for c in changed:
    print('-', c)
