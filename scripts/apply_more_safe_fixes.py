#!/usr/bin/env python3
"""
Apply additional low-risk accessibility fixes across HTML files:
- Ensure <main> has id="maincontent" and role="main"
- Ensure <footer> has role="contentinfo"
- Add aria-current="page" to nav links whose href matches the current file name
- Ensure header nav (.site-header-nav) has aria-label="Primary" if missing
- Ensure skip-link points to #maincontent
"""
from pathlib import Path
import re

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

    # Ensure header nav has aria-label="Primary" if it has class site-header-nav and missing aria-label
    txt = re.sub(r'(<nav\b([^>]*class\s*=\s*"[^"]*site-header-nav[^"]*"[^>]*))(>)',
                 lambda m: m.group(1) + (' aria-label="Primary"' if 'aria-label' not in m.group(2) else '') + m.group(3),
                 txt, flags=re.I)

    # Ensure skip-link href is #maincontent (only change if it exists and different)
    txt = re.sub(r'(<a\b[^>]*class\s*=\s*"[^"]*skip-link[^"]*"[^>]*href\s*=\s*")#[^"]*("[^>]*>)',
                 lambda m: m.group(1) + 'maincontent' + m.group(2), txt, flags=re.I)

    # If skip-link exists but no href, set it
    txt = re.sub(r'(<a\b([^>]*class\s*=\s*"[^"]*skip-link[^"]*[^"]*"[^>]*))(?![^>]*href=)',
                 lambda m: m.group(1) + ' href="#maincontent"', txt, flags=re.I)

    # Ensure <main> has id and role
    def fix_main(match):
        tag = match.group(0)
        if 'role=' in tag.lower():
            if 'id=' in tag.lower():
                return tag
            else:
                return tag[:-1] + ' id="maincontent">'
        else:
            # add role and id if missing
            if 'id=' in tag.lower():
                return tag[:-1] + ' role="main">'
            else:
                return tag[:-1] + ' id="maincontent" role="main">'
    txt = re.sub(r'<main\b([^>]*)>', fix_main, txt, flags=re.I)

    # Ensure <footer> has role="contentinfo"
    def fix_footer(match):
        tag = match.group(0)
        if 'role=' in tag.lower():
            return tag
        return tag[:-1] + ' role="contentinfo">'
    txt = re.sub(r'<footer\b([^>]*)>', fix_footer, txt, flags=re.I)

    # Add aria-current="page" to nav links matching the file name
    basename = f.name
    # href could be "home.html" or "./home.html" or "/home.html" or just "index.html"
    # Build patterns for hrefs that end with the basename
    def mark_current_links(text, basename):
        # replace <a ... href="...basename" ...> add aria-current if missing
        pattern = re.compile(r'(<a\b([^>]*href\s*=\s*"[^"]*' + re.escape(basename) + r'"[^>]*))>', flags=re.I)
        def repl(m):
            tag = m.group(1)
            if 'aria-current' in tag.lower():
                return tag + '>'
            return tag + ' aria-current="page">'
        return pattern.sub(repl, text)
    txt = mark_current_links(txt, basename)

    if txt != orig:
        f.write_text(txt, encoding='utf-8')
        changed.append(str(f))

print('Files processed:', len(files))
print('Files changed:', len(changed))
for c in changed:
    print('-', c)
