#!/usr/bin/env python3
"""
Replace specific hard-coded hex color values with CSS variable references
in CSS files across the repo (excluding virtualenv, history, and binary dirs).
"""
import os, re

repo = os.path.abspath(os.path.join(os.path.dirname(__file__), '..'))
exclude_dirs = {'.venv', '.history', 'node_modules', '.git'}

# mapping of lowercase hex to replacement
mapping = {
    '#f5f5f5': 'var(--ua-background)',
    '#0c234b': 'var(--ua-text)',
    '#ab0520': 'var(--ua-maroon)',
    '#870414': 'var(--ua-maroon-hover)',
    '#d5d5d5': 'var(--ua-border)',
    '#e0e8f5': 'var(--ua-chip-bg)',
    '#e5e7eb': 'var(--ua-muted-border)',
    '#ffe7d9': 'var(--ua-alert-bg)',
    '#61120b': 'var(--ua-alert-text)',
    '#0c234b0d': 'var(--ua-code-bg)',
}

css_file_paths = []
for root, dirs, files in os.walk(repo):
    # skip excluded dirs
    parts = set(root.split(os.sep))
    if parts & exclude_dirs:
        continue
    for f in files:
        if f.lower().endswith('.css'):
            css_file_paths.append(os.path.join(root,f))

print('Found', len(css_file_paths), 'CSS files to scan')

hex_re = re.compile(r'#([0-9A-Fa-f]{6}|[0-9A-Fa-f]{8}|[0-9A-Fa-f]{3})')

changed = []
for path in css_file_paths:
    with open(path, 'r', encoding='utf-8') as fh:
        txt = fh.read()
    orig = txt
    # replace only whole hex tokens (lowercase map keys)
    def repl(m):
        h = m.group(0)
        low = h.lower()
        if low in mapping:
            return mapping[low]
        return h
    txt2 = hex_re.sub(repl, txt)
    if txt2 != orig:
        with open(path, 'w', encoding='utf-8') as fh:
            fh.write(txt2)
        changed.append(path)
        print('Patched', path)

print('Done. Files changed:', len(changed))
for p in changed:
    print('-', p)
