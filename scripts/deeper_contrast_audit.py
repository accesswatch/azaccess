#!/usr/bin/env python3
"""
Deeper contrast audit: checks multiple pairs against AA/AAA thresholds
for normal and large text. Loads variables from work/web/styles.css.
"""
import re, os

STYLE = os.path.join(os.path.dirname(__file__), '..', 'work', 'web', 'styles.css')
hex_re = re.compile(r'--(?P<name>[-\w]+):\s*(?P<hex>#[0-9a-fA-F]{3,8})')

def load_vars():
    txt = open(STYLE, 'r', encoding='utf-8').read()
    root = txt.split(':root',1)[1] if ':root' in txt else txt
    vars = {}
    for m in hex_re.finditer(root):
        vars[m.group('name')] = m.group('hex')
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
    rs = r/255.0; gs = g/255.0; bs = b/255.0
    def f(c):
        return c/12.92 if c <= 0.03928 else ((c+0.055)/1.055)**2.4
    return 0.2126*f(rs)+0.7152*f(gs)+0.0722*f(bs)

def contrast_ratio(a,b):
    la = luminance_rgb(a); lb = luminance_rgb(b)
    L1 = max(la,lb); L2 = min(la,lb)
    return (L1+0.05)/(L2+0.05)

if __name__ == '__main__':
    vars = load_vars()
    # pairs to check: (foreground var, background var, description)
    checks = [
        ('ua-text','ua-background','body text on background'),
        ('ua-white','ua-arizona-blue','white on arizona blue (hero/header)'),
        ('ua-white','ua-maroon','white on arizona red (buttons)'),
        ('ua-arizona-blue','ua-background','arizona blue on background (links)'),
        ('ua-maroon','ua-background','arizona red on background'),
        ('ua-white','ua-midnight','white on midnight'),
        ('ua-white','ua-azurite','white on azurite'),
        ('ua-text','ua-chip-bg','text on chip bg'),
        ('ua-alert-text','ua-alert-bg','alert text on alert bg')
    ]
    results = []
    for fg,bg,label in checks:
        if fg not in vars or bg not in vars:
            results.append((label, 'MISSING_VAR'))
            continue
        ra = hex_to_rgb(vars[fg]); rb = hex_to_rgb(vars[bg])
        cr = contrast_ratio(ra,rb)
        results.append((label, cr))
    # evaluate thresholds
    print('Deeper contrast audit results:')
    fail = []
    for label, cr in results:
        if cr == 'MISSING_VAR':
            print(f'- {label}: MISSING VARIABLE')
            fail.append((label,'missing'))
            continue
        aa_norm = cr >= 4.5
        aa_large = cr >= 3.0
        aaa_norm = cr >= 7.0
        aaa_large = cr >= 4.5
        status = []
        if aa_norm: status.append('AA(normal)')
        if aa_large: status.append('AA(large)')
        if aaa_norm: status.append('AAA(normal)')
        if aaa_large: status.append('AAA(large)')
        print(f'- {label}: ratio={cr:.2f} -> {", ".join(status) if status else "FAIL (none)"}')
        if not aa_norm:
            fail.append((label, cr))
    if fail:
        print('\nPairs failing AA(normal) (4.5:1):')
        for f in fail:
            print('-', f)
    else:
        print('\nAll checked pairs pass AA(normal)')
