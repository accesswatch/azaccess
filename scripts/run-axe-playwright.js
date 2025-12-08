const { chromium } = require('playwright');
const { injectAxe } = require('axe-playwright');
const fs = require('fs');
const path = require('path');
const http = require('http');
const url = require('url');

// Minimal static file server used when no external server is started (helps CI)
function createStaticServer(rootDirs, port = 8000, host = '127.0.0.1') {
    const server = http.createServer((req, res) => {
        const u = url.parse(req.url || '/');
        // Normalize the requested path
        let reqPath = decodeURIComponent(u.pathname || '/');
        if (reqPath === '/') reqPath = '/index.html';

        // Try candidate root directories in order and serve first match
        for (const root of rootDirs) {
            const filePath = path.join(root, reqPath);
            if (fs.existsSync(filePath) && fs.statSync(filePath).isFile()) {
                const ext = path.extname(filePath).toLowerCase();
                const contentType = {
                    '.html': 'text/html; charset=utf-8',
                    '.css': 'text/css; charset=utf-8',
                    '.js': 'application/javascript; charset=utf-8',
                    '.json': 'application/json; charset=utf-8',
                    '.png': 'image/png',
                    '.jpg': 'image/jpeg',
                    '.jpeg': 'image/jpeg',
                    '.svg': 'image/svg+xml'
                }[ext] || 'application/octet-stream';
                res.writeHead(200, { 'Content-Type': contentType });
                fs.createReadStream(filePath).pipe(res);
                return;
            }
        }

        // Not found
        res.writeHead(404, { 'Content-Type': 'text/plain; charset=utf-8' });
        res.end('Not found: ' + reqPath);
    });

    return new Promise((resolve, reject) => {
        server.on('error', reject);
        server.listen(port, host, () => resolve(server));
    });
}

async function run() {
    const repoRoot = path.join(__dirname, '..');
    const webDir = path.join(repoRoot, 'work', 'web');
    const docsDir = path.join(repoRoot, 'docs');
    const outDir = path.join(__dirname, 'axe-reports');
    if (!fs.existsSync(outDir)) fs.mkdirSync(outDir, { recursive: true });

    const webFiles = fs.existsSync(webDir) ? fs.readdirSync(webDir).filter(f => f.endsWith('.html')) : [];
    const docsFiles = fs.existsSync(docsDir) ? fs.readdirSync(docsDir).filter(f => f.endsWith('.html')) : [];
    // Serve as root-relative paths so the static server can resolve from candidate roots
    const pages = webFiles.map(f => '/' + f).concat(docsFiles.map(f => '/' + f));
    console.log('Pages to scan:', pages.length);

    // Start minimal static server so Playwright can load pages in CI without external setup
    const roots = [webDir, path.join(repoRoot, 'web'), repoRoot];
    let server;
    try {
        server = await createStaticServer(roots, 8000, '127.0.0.1');
        console.log('Started static server on http://127.0.0.1:8000 (roots:', roots.join(', '), ')');
    } catch (err) {
        console.error('Failed to start static server:', err);
        throw err;
    }

    const browser = await chromium.launch();
    const context = await browser.newContext();
    const page = await context.newPage();

    for (const p of pages) {
        const targetUrl = 'http://127.0.0.1:8000' + p;
        console.log('\nScanning', targetUrl);
        try {
            await page.goto(targetUrl, { waitUntil: 'load', timeout: 30000 });
            await injectAxe(page);

            // Run axe in-page and capture results; be defensive if injection failed
            const results = await page.evaluate(async () => {
                try {
                    if (!window.axe) return { error: 'axe not injected' };
                    return await window.axe.run();
                } catch (err) {
                    return { error: String(err) };
                }
            });
            const fileName = p.replace(/\//g, '_') + '.json';
            fs.writeFileSync(path.join(outDir, fileName), JSON.stringify(results, null, 2));
            console.log('Saved report:', fileName, 'violations:', (results.violations || []).length);
        } catch (e) {
            console.error('Error scanning', targetUrl, e && e.message ? e.message : e);
            const errFile = 'error_' + p.replace(/\//g, '_') + '.txt';
            fs.writeFileSync(path.join(outDir, errFile), String(e));
        }
    }

    await browser.close();
    // close static server
    try {
        server.close();
        console.log('Static server stopped');
    } catch (e) {
        console.warn('Error stopping static server:', e && e.message ? e.message : e);
    }

    console.log('\nScan complete. Reports saved in scripts/axe-reports/');
}

run().catch(err => {
    console.error('Fatal error running scan:', err);
    process.exit(1);
});
