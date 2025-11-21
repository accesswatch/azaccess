#!/usr/bin/env python3
"""
Simple contrast audit for key color pairs used by the site.
Reads the variables from `work/web/styles.css` and computes contrast
for a few important combinations.
"""
import re
import os

STYLE = os.path.join(os.path.dirname(__file__), '..', 'work', 'web', 'styles.css')

hex_re = re.compile(r'--(?P<name>[-\w]+):\s*(?P<hex>#[0-9a-fA-F]{3,8})')

def load_vars():
    txt = open(STYLE, 'r', encoding='utf-8').read()
    root = txt.split(':root',1)[1] if ':root' in txt else txt
    vars = {}
    for m in hex_re.finditer(root):
        n = m.group('name')
        h = m.group('hex')
        vars[n] = h
    return vars

def hex_to_rgb(h):
    h = h.lstrip('#')
    if len(h) == 3:
        r,g,b = [int(c*2,16) for c in h]
        return (r,g,b,1)
    if len(h) == 4:
        r,g,b,a = [int(c*2,16) for c in h]
        return (r,g,b,a/255)
    if len(h) == 6:
        r = int(h[0:2],16); g = int(h[2:4],16); b = int(h[4:6],16)
        return (r,g,b,1)
    if len(h) == 8:
        r = int(h[0:2],16); g = int(h[2:4],16); b = int(h[4:6],16); a = int(h[6:8],16)
        return (r,g,b,a/255)
    raise ValueError('bad hex:'+h)

def luminance_rgb(rgb):
    r,g,b,_ = rgb
    rs = r/255.0
    gs = g/255.0
    bs = b/255.0
    def f(c):
        return c/12.92 if c <= 0.03928 else ((c+0.055)/1.055)**2.4
    return 0.2126*f(rs)+0.7152*f(gs)+0.0722*f(bs)

def contrast_ratio(a,b):
    la = luminance_rgb(a)
    lb = luminance_rgb(b)
    L1 = max(la,lb)
    L2 = min(la,lb)
    return (L1+0.05)/(L2+0.05)

if __name__ == '__main__':
    vars = load_vars()
    pairs = [
        ('ua-text','ua-background','body text on background'),
        ('ua-white','ua-text','header text on header bg (white on text)'),
        ('ua-white','ua-maroon','button text on button bg'),
        ('ua-maroon','ua-background','link on body'),
        ('ua-alert-text','ua-alert-bg','alert text on alert background')
    ]
    print('Loaded variables:')
    for k in sorted(vars.keys()):
        print('-', k, vars[k])
    print('\nContrast results:')
    failing = []
    for a,b,label in pairs:
        if a not in vars:
            print('Missing var:', a)
            continue
        if b not in vars:
            print('Missing var:', b)
            continue
        ra = hex_to_rgb(vars[a])
        rb = hex_to_rgb(vars[b])
        cr = contrast_ratio(ra,rb)
        ok = cr >= 4.5
        status = 'PASS' if ok else 'FAIL'
        print(f'- {label}: ratio={cr:.2f} -> {status}')
        if not ok:
            failing.append((label, vars[a], vars[b], cr))

    if failing:
        print('\nFailing color pairs:')
        for lab, ha, hb, cr in failing:
            print(f'- {lab}: {ha} on {hb} -> ratio {cr:.2f} (needs ≥4.5)')
        print('\nRecommendation: adjust the background or foreground color to increase contrast (darken foreground or lighten background).')
    else:
        print('\nAll checked pairs meet WCAG AA (4.5:1) contrast for normal text.')
