#!/usr/bin/env node
/**
 * Run Lighthouse accessibility audits on representative pages
 */
const lighthouse = require('lighthouse').default;
const chromeLauncher = require('chrome-launcher');
const fs = require('fs');
const path = require('path');
const http = require('http');
const url = require('url');

// Minimal static server (copied from run-axe-playwright.js)
function createStaticServer(rootDirs, port = 8000, host = '127.0.0.1') {
    const server = http.createServer((req, res) => {
        const u = url.parse(req.url || '/');
        let reqPath = decodeURIComponent(u.pathname || '/');
        if (reqPath === '/') reqPath = '/index.html';

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

        res.writeHead(404, { 'Content-Type': 'text/plain; charset=utf-8' });
        res.end('Not found: ' + reqPath);
    });

    return new Promise((resolve, reject) => {
        server.on('error', reject);
        server.listen(port, host, () => resolve(server));
    });
}

async function runLighthouse(url, outputPath) {
    const chrome = await chromeLauncher.launch({ chromeFlags: ['--headless'] });
    const options = {
        logLevel: 'error',
        output: 'json',
        onlyCategories: ['accessibility'],
        port: chrome.port
    };

    try {
        const runnerResult = await lighthouse(url, options);
        const report = runnerResult.report;
        fs.writeFileSync(outputPath, report);
        
        const lhr = JSON.parse(report);
        return {
            score: lhr.categories.accessibility.score * 100,
            audits: lhr.audits
        };
    } finally {
        await chrome.kill();
    }
}

async function run() {
    const repoRoot = path.join(__dirname, '..');
    const webDir = path.join(repoRoot, 'work', 'web');
    const docsDir = path.join(repoRoot, 'docs');
    const outDir = path.join(__dirname, 'lighthouse-reports');
    
    if (!fs.existsSync(outDir)) fs.mkdirSync(outDir, { recursive: true });

    // Representative pages to scan
    const pages = [
        'home.html',
        'personas.html',
        'accessibility-101.html',
        'documents-media.html',
        'web-app.html'
    ];

    // Start static server
    const roots = [webDir, docsDir, repoRoot];
    const server = await createStaticServer(roots, 8001, '127.0.0.1');
    console.log('Started static server on http://127.0.0.1:8001');

    console.log(`Running Lighthouse on ${pages.length} representative pages...\n`);

    const results = [];
    for (const page of pages) {
        const targetUrl = 'http://127.0.0.1:8001/' + page;
        console.log(`Scanning ${page}...`);
        
        try {
            const outputPath = path.join(outDir, page.replace('.html', '.json'));
            const result = await runLighthouse(targetUrl, outputPath);
            
            console.log(`  Score: ${result.score}/100`);
            console.log(`  Saved: ${outputPath}`);
            
            results.push({
                page,
                score: result.score,
                url: targetUrl
            });
        } catch (e) {
            console.error(`  Error: ${e.message}`);
        }
        console.log();
    }

    // Close server
    server.close();
    console.log('Lighthouse scans complete!');
    
    // Summary
    console.log('\n=== LIGHTHOUSE SUMMARY ===');
    const avgScore = results.reduce((sum, r) => sum + r.score, 0) / results.length;
    console.log(`Average Accessibility Score: ${avgScore.toFixed(1)}/100`);
    console.log('\nScores by page:');
    results.forEach(r => {
        console.log(`  ${r.page}: ${r.score}/100`);
    });
}

run().catch(err => {
    console.error('Fatal error:', err);
    process.exit(1);
});
