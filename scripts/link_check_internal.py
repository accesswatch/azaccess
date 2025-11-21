#!/usr/bin/env python3
"""
Link checker for internal links only.
Usage: python3 scripts/link_check_internal.py http://127.0.0.1:8000
"""
import sys, urllib.request, urllib.parse, urllib.error, socket
from html.parser import HTMLParser
from collections import deque

ROOT = sys.argv[1] if len(sys.argv) > 1 else 'http://127.0.0.1:8000'
TIMEOUT = 5

class LinkParser(HTMLParser):
    def __init__(self):
        super().__init__()
        self.links = []
    def handle_starttag(self, tag, attrs):
        for k,v in attrs:
            if k in ('href','src') and v:
                self.links.append(v)

def norm_url(base, url):
    if url.startswith('javascript:') or url.startswith('mailto:') or url.startswith('tel:'):
        return None
    if url.startswith('#'):
        return None
    return urllib.parse.urljoin(base, url)

def is_same_origin(a, b):
    pa = urllib.parse.urlparse(a)
    pb = urllib.parse.urlparse(b)
    return (pa.scheme, pa.hostname, pa.port) == (pb.scheme, pb.hostname, pb.port)

def fetch_status(url):
    try:
        req = urllib.request.Request(url, headers={'User-Agent':'azaccess-link-checker/1.0'})
        with urllib.request.urlopen(req, timeout=TIMEOUT) as res:
            return res.getcode()
    except urllib.error.HTTPError as e:
        return e.code
    except Exception as e:
        return None

def crawl_internal(root):
    visited = set()
    q = deque([root])
    broken = []

    while q:
        url = q.popleft()
        if url in visited:
            continue
        visited.add(url)
        print('Checking', url)
        status = fetch_status(url)
        if status is None or status >= 400:
            broken.append((url, status))
            continue
        # parse only if HTML
        try:
            req = urllib.request.Request(url, headers={'User-Agent':'azaccess-link-checker/1.0'})
            with urllib.request.urlopen(req, timeout=TIMEOUT) as res:
                ct = res.headers.get('Content-Type','')
                if 'text/html' not in ct:
                    continue
                data = res.read(65536).decode('utf-8', errors='ignore')
        except Exception as e:
            broken.append((url, str(e)))
            continue
        p = LinkParser()
        p.feed(data)
        for raw in p.links:
            nu = norm_url(url, raw)
            if not nu:
                continue
            nu = nu.split('#')[0]
            if is_same_origin(root, nu):
                if nu not in visited:
                    q.append(nu)
    return visited, broken

if __name__ == '__main__':
    print('Internal link checker starting at', ROOT)
    visited, broken = crawl_internal(ROOT)
    print('\nPages checked:', len(visited))
    print('Broken internal links:', len(broken))
    if broken:
        for b in broken:
            print('-', b)
        sys.exit(2)
    print('No broken internal links found')
    sys.exit(0)
