const { chromium } = require('playwright');
const { injectAxe, checkA11y } = require('axe-playwright');
const fs = require('fs');
const path = require('path');

async function run() {
    const repoRoot = path.join(__dirname, '..');
    const webDir = path.join(repoRoot, 'work', 'web');
    const docsDir = path.join(repoRoot, 'docs');
    const outDir = path.join(__dirname, 'axe-reports');
    if (!fs.existsSync(outDir)) fs.mkdirSync(outDir, { recursive: true });

    const webFiles = fs.existsSync(webDir) ? fs.readdirSync(webDir).filter(f => f.endsWith('.html')) : [];
    const docsFiles = fs.existsSync(docsDir) ? fs.readdirSync(docsDir).filter(f => f.endsWith('.html')) : [];
    const pages = webFiles.map(f => '/' + f).concat(docsFiles.map(f => '/' + f));
    console.log('Pages to scan:', pages.length);

    const browser = await chromium.launch();
    const context = await browser.newContext();
    const page = await context.newPage();

    for (const p of pages) {
        const url = 'http://127.0.0.1:8000' + p;
        console.log('\nScanning', url);
        try {
            await page.goto(url, { waitUntil: 'load', timeout: 30000 });
            await injectAxe(page);
            const results = await checkA11y(page, null, { detailedReport: true });
            const fileName = p.replace(/\//g, '_') + '.json';
            fs.writeFileSync(path.join(outDir, fileName), JSON.stringify(results, null, 2));
            console.log('Saved report:', fileName, 'violations:', (results.violations || []).length);
        } catch (e) {
            console.error('Error scanning', url, e && e.message ? e.message : e);
            const errFile = 'error_' + p.replace(/\//g, '_') + '.txt';
            fs.writeFileSync(path.join(outDir, errFile), String(e));
        }
    }

    await browser.close();
    console.log('\nScan complete. Reports saved in scripts/axe-reports/');
}

run().catch(err => {
    console.error('Fatal error running scan:', err);
    process.exit(1);
});
