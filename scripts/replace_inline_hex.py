#!/usr/bin/env python3
"""
Replace inline hex color literals in HTML and JS files with CSS variable references.
The script is conservative: it only replaces a hex when the preceding context (50 chars)
contains a styling keyword (style, color, background, border, fill, stroke, outline).
Excludes directories: .venv, .history, node_modules, .git
"""
import os, re

repo = os.path.abspath(os.path.join(os.path.dirname(__file__), '..'))
exclude_dirs = {'.venv', '.history', 'node_modules', '.git'}

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
    '#0c234b0d': 'var(--ua-code-bg)'
}

# keywords to consider in preceding context
keywords = ['style', 'color', 'background', 'border', 'fill', 'stroke', 'outline', 'box-shadow', 'border-left', 'border-color']

file_exts = ('.html', '.htm', '.js', '.jsx', '.ts', '.tsx')
hex_re = re.compile(r'#([0-9A-Fa-f]{6}|[0-9A-Fa-f]{8}|[0-9A-Fa-f]{3})')

changed_files = []
for root, dirs, files in os.walk(repo):
    # skip excluded dirs
    parts = set(root.split(os.sep))
    if parts & exclude_dirs:
        continue
    for f in files:
        if not f.lower().endswith(file_exts):
            continue
        path = os.path.join(root, f)
        with open(path, 'r', encoding='utf-8') as fh:
            try:
                txt = fh.read()
            except Exception:
                continue
        orig = txt
        out = []
        last = 0
        for m in hex_re.finditer(txt):
            h = m.group(0)
            low = h.lower()
            if low not in mapping:
                continue
            start = m.start()
            context_start = max(0, start-60)
            ctx = txt[context_start:start].lower()
            if any(k in ctx for k in keywords):
                # perform replacement
                out.append(txt[last:start])
                out.append(mapping[low])
                last = m.end()
        out.append(txt[last:])
        new_txt = ''.join(out)
        if new_txt != orig:
            with open(path, 'w', encoding='utf-8') as fh:
                fh.write(new_txt)
            changed_files.append(path)
            print('Patched', path)

print('Done. Files changed:', len(changed_files))
for p in changed_files:
    print('-', p)
