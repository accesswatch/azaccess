#!/usr/bin/env python3
"""
Simple link checker crawler for local site.
Usage: python3 scripts/link_check.py http://127.0.0.1:8000

Crawls pages under the given root, checks internal and external links,
and prints a report of broken links.
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
    # ignore javascript:, mailto:, tel:, fragments
    if url.startswith('javascript:') or url.startswith('mailto:') or url.startswith('tel:'):
        return None
    if url.startswith('#'):
        return None
    return urllib.parse.urljoin(base, url)

def is_same_origin(a, b):
    pa = urllib.parse.urlparse(a)
    pb = urllib.parse.urlparse(b)
    return (pa.scheme, pa.hostname, pa.port) == (pb.scheme, pb.hostname, pb.port)

def fetch_url(url):
    try:
        req = urllib.request.Request(url, headers={'User-Agent':'azaccess-link-checker/1.0'})
        with urllib.request.urlopen(req, timeout=TIMEOUT) as res:
            content_type = res.headers.get('Content-Type','')
            # read up to 64KB for HTML to avoid long downloads
            data = res.read(65536) if 'text/html' in content_type else b''
            return res.getcode(), data, content_type
    except urllib.error.HTTPError as e:
        return e.code, None, None
    except urllib.error.URLError as e:
        return None, None, str(e)
    except socket.timeout:
        return None, None, 'timeout'
    except Exception as e:
        return None, None, str(e)


def crawl(root):
    visited = set()
    q = deque([root])
    broken = []
    checked_external = {}

    while q:
        url = q.popleft()
        if url in visited:
            continue
        visited.add(url)
        print('Crawling', url)
        code, data, ct = fetch_url(url)
        if code is None:
            broken.append((url, 'ERROR', data))
            continue
        if code >= 400:
            broken.append((url, code, 'HTTP error'))
            continue
        # only parse HTML
        if data and isinstance(data, bytes):
            try:
                text = data.decode('utf-8', errors='ignore')
            except Exception:
                text = ''
            p = LinkParser()
            p.feed(text)
            for raw in p.links:
                nu = norm_url(url, raw)
                if not nu:
                    continue
                # ignore fragments at end
                nu = nu.split('#')[0]
                # ignore query-only variations by normalizing
                # (keep queries for now)
                if is_same_origin(root, nu):
                    if nu not in visited:
                        q.append(nu)
                else:
                    # external link: check once
                    if nu in checked_external:
                        if checked_external[nu] is False:
                            broken.append((nu, 'EXTERNAL-ERROR', checked_external[nu]))
                        continue
                    c,_,info = fetch_url(nu)
                    if c is None or (isinstance(c,int) and c>=400):
                        checked_external[nu] = info if info else c
                        broken.append((nu, c if c else 'ERR', info))
                    else:
                        checked_external[nu] = True
    return visited, broken

if __name__ == '__main__':
    print('Link checker starting at', ROOT)
    visited, broken = crawl(ROOT)
    print('\nCrawled pages: ', len(visited))
    print('Broken links found:', len(broken))
    if broken:
        for b in broken:
            print('-', b)
        sys.exit(2)
    else:
        print('No broken links found')
        sys.exit(0)
