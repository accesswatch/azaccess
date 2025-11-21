#!/usr/bin/env python3
"""
Update HTML pages in `work/web` and `docs` to reference the single shared
`scripts/header.js` file. Remove duplicate local header.js files if present.

Usage: python3 scripts/update_header_refs.py
"""
from pathlib import Path
import sys

repo = Path(__file__).resolve().parents[1]
work_web = repo / 'work' / 'web'
docs = repo / 'docs'

def replace_in_dir(directory, rel_path_to_scripts):
    modified = []
    for p in sorted(directory.glob('*.html')):
        txt = p.read_text(encoding='utf-8')
        changed = False
        # Replace script include if it references a local header.js
        old = '<script src="header.js" defer></script>'
        new = f'<script src="{rel_path_to_scripts}/header.js" defer></script>'
        if old in txt and new not in txt:
            txt = txt.replace(old, new)
            changed = True
        # Also handle cases without defer/spaces variations conservatively
        if 'src="header.js"' in txt and f'src="{rel_path_to_scripts}/header.js"' not in txt:
            txt = txt.replace('src="header.js"', f'src="{rel_path_to_scripts}/header.js"')
            changed = True
        if changed:
            p.write_text(txt, encoding='utf-8')
            modified.append(str(p))
    return modified

print('Updating docs HTML to reference ../scripts/header.js')
docs_modified = replace_in_dir(docs, '../scripts')
print('Updating work/web HTML to reference ../../scripts/header.js')
web_modified = replace_in_dir(work_web, '../../scripts')

print('Docs modified:', len(docs_modified))
for m in docs_modified: print(' -', m)
print('Work/web modified:', len(web_modified))
for m in web_modified: print(' -', m)

# Remove local copies if they exist
for local in [work_web / 'header.js', docs / 'header.js']:
    if local.exists():
        try:
            local.unlink()
            print('Removed local header file:', local)
        except Exception as e:
            print('Failed to remove', local, e)

print('Done.')
