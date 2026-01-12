/**
 * axe-core Accessibility Audit Script
 *
 * Runs automated accessibility checks on HTML files using axe-core.
 *
 * Usage:
 *   node scripts/axe-audit.js                    # Audit key pages
 *   node scripts/axe-audit.js --all              # Audit all HTML files
 *   node scripts/axe-audit.js docs/home.html     # Audit specific file
 */

const { chromium } = require('playwright');
const AxeBuilder = require('@axe-core/playwright').default;
const fs = require('fs');
const path = require('path');

// Configuration
const DOCS_DIR = path.join(__dirname, '..', 'docs');
const REPORTS_DIR = path.join(__dirname, '..', 'reports');
const BASE_URL = 'http://localhost:3000';

// Key pages to always test
const KEY_PAGES = [
  'home.html',
  'roles.html',
  'accessibility-101.html',
  'students.html',
  'faculty.html',
  'staff.html',
  'developers.html',
  'content-creators.html',
  'support.html',
  'wizard.html'
];

// WCAG tags to test
const WCAG_TAGS = ['wcag2a', 'wcag2aa', 'wcag21a', 'wcag21aa', 'wcag22aa', 'best-practice'];

// Severity colors for console output
const SEVERITY_COLORS = {
  critical: '\x1b[31m', // Red
  serious: '\x1b[33m',  // Yellow
  moderate: '\x1b[36m', // Cyan
  minor: '\x1b[37m'     // White
};
const RESET = '\x1b[0m';

async function getAllHtmlFiles() {
  const files = fs.readdirSync(DOCS_DIR);
  return files.filter(f => f.endsWith('.html'));
}

async function auditPage(browser, pagePath) {
  const page = await browser.newPage();
  const url = `${BASE_URL}/${pagePath}`;

  console.log(`\n📄 Auditing: ${pagePath}`);
  console.log(`   URL: ${url}`);

  try {
    await page.goto(url, { waitUntil: 'networkidle' });

    const results = await new AxeBuilder({ page })
      .withTags(WCAG_TAGS)
      .analyze();

    await page.close();
    return { pagePath, results, error: null };
  } catch (error) {
    await page.close();
    return { pagePath, results: null, error: error.message };
  }
}

function formatViolation(violation) {
  const color = SEVERITY_COLORS[violation.impact] || RESET;
  return `
${color}━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━${RESET}
${color}[${violation.impact.toUpperCase()}]${RESET} ${violation.id}
${violation.description}

WCAG: ${violation.tags.filter(t => t.startsWith('wcag')).join(', ')}
Help: ${violation.helpUrl}

Affected elements (${violation.nodes.length}):
${violation.nodes.slice(0, 3).map(node => `  • ${node.html.substring(0, 100)}${node.html.length > 100 ? '...' : ''}`).join('\n')}
${violation.nodes.length > 3 ? `  ... and ${violation.nodes.length - 3} more` : ''}
`;
}

function generateHtmlReport(allResults) {
  const timestamp = new Date().toISOString().replace(/[:.]/g, '-');

  let totalViolations = 0;
  let criticalCount = 0;
  let seriousCount = 0;
  let moderateCount = 0;
  let minorCount = 0;

  allResults.forEach(({ results }) => {
    if (results) {
      results.violations.forEach(v => {
        totalViolations++;
        if (v.impact === 'critical') criticalCount++;
        if (v.impact === 'serious') seriousCount++;
        if (v.impact === 'moderate') moderateCount++;
        if (v.impact === 'minor') minorCount++;
      });
    }
  });

  const html = `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Accessibility Audit Report - ${new Date().toLocaleDateString()}</title>
  <style>
    * { box-sizing: border-box; }
    body { font-family: system-ui, sans-serif; margin: 0; padding: 2rem; background: #f5f5f5; }
    h1 { color: #0C234B; }
    .summary { display: grid; grid-template-columns: repeat(auto-fit, minmax(150px, 1fr)); gap: 1rem; margin: 2rem 0; }
    .summary-card { background: white; padding: 1.5rem; border-radius: 8px; text-align: center; box-shadow: 0 2px 4px rgba(0,0,0,0.1); }
    .summary-card.critical { border-left: 4px solid #AB0520; }
    .summary-card.serious { border-left: 4px solid #f59e0b; }
    .summary-card.moderate { border-left: 4px solid #3b82f6; }
    .summary-card.minor { border-left: 4px solid #6b7280; }
    .summary-card .number { font-size: 2.5rem; font-weight: bold; }
    .summary-card .label { color: #666; }
    .page-section { background: white; margin: 2rem 0; padding: 1.5rem; border-radius: 8px; box-shadow: 0 2px 4px rgba(0,0,0,0.1); }
    .page-title { margin: 0 0 1rem 0; color: #0C234B; }
    .pass { color: #22c55e; }
    .violation { border: 1px solid #e5e5e5; margin: 1rem 0; padding: 1rem; border-radius: 4px; }
    .violation.critical { border-left: 4px solid #AB0520; background: #fef2f2; }
    .violation.serious { border-left: 4px solid #f59e0b; background: #fffbeb; }
    .violation.moderate { border-left: 4px solid #3b82f6; background: #eff6ff; }
    .violation.minor { border-left: 4px solid #6b7280; background: #f9fafb; }
    .violation h4 { margin: 0 0 0.5rem 0; }
    .violation code { background: #f1f5f9; padding: 0.25rem 0.5rem; border-radius: 4px; font-size: 0.85em; display: block; margin: 0.5rem 0; overflow-x: auto; }
    .tag { display: inline-block; background: #e0e8f5; padding: 0.2rem 0.5rem; border-radius: 4px; font-size: 0.8rem; margin-right: 0.5rem; }
  </style>
</head>
<body>
  <h1>🔍 Accessibility Audit Report</h1>
  <p>Generated: ${new Date().toLocaleString()}</p>
  <p>Standard: WCAG 2.2 Level AA</p>

  <div class="summary">
    <div class="summary-card">
      <div class="number">${allResults.length}</div>
      <div class="label">Pages Tested</div>
    </div>
    <div class="summary-card critical">
      <div class="number">${criticalCount}</div>
      <div class="label">Critical</div>
    </div>
    <div class="summary-card serious">
      <div class="number">${seriousCount}</div>
      <div class="label">Serious</div>
    </div>
    <div class="summary-card moderate">
      <div class="number">${moderateCount}</div>
      <div class="label">Moderate</div>
    </div>
    <div class="summary-card minor">
      <div class="number">${minorCount}</div>
      <div class="label">Minor</div>
    </div>
  </div>

  ${allResults.map(({ pagePath, results, error }) => {
    if (error) {
      return `<div class="page-section"><h2 class="page-title">❌ ${pagePath}</h2><p>Error: ${error}</p></div>`;
    }
    if (results.violations.length === 0) {
      return `<div class="page-section"><h2 class="page-title pass">✅ ${pagePath}</h2><p>No violations found!</p></div>`;
    }
    return `
      <div class="page-section">
        <h2 class="page-title">📄 ${pagePath}</h2>
        <p>${results.violations.length} violations found</p>
        ${results.violations.map(v => `
          <div class="violation ${v.impact}">
            <h4>[${v.impact.toUpperCase()}] ${v.id}</h4>
            <p>${v.description}</p>
            <p>${v.tags.filter(t => t.startsWith('wcag')).map(t => `<span class="tag">${t}</span>`).join('')}</p>
            <p><a href="${v.helpUrl}" target="_blank">How to fix →</a></p>
            <details>
              <summary>Affected elements (${v.nodes.length})</summary>
              ${v.nodes.map(n => `<code>${n.html.replace(/</g, '&lt;').replace(/>/g, '&gt;')}</code>`).join('')}
            </details>
          </div>
        `).join('')}
      </div>
    `;
  }).join('')}
</body>
</html>`;

  // Ensure reports directory exists
  if (!fs.existsSync(REPORTS_DIR)) {
    fs.mkdirSync(REPORTS_DIR, { recursive: true });
  }

  const reportPath = path.join(REPORTS_DIR, `axe-report-${timestamp}.html`);
  fs.writeFileSync(reportPath, html);

  // Also save as latest
  fs.writeFileSync(path.join(REPORTS_DIR, 'axe-report-latest.html'), html);

  return reportPath;
}

async function main() {
  const args = process.argv.slice(2);

  // Determine which pages to audit
  let pagesToAudit;

  if (args.includes('--all')) {
    pagesToAudit = await getAllHtmlFiles();
    console.log(`\n🔍 Auditing ALL ${pagesToAudit.length} HTML files`);
  } else if (args.length > 0 && !args[0].startsWith('--')) {
    // Specific files provided
    pagesToAudit = args.map(f => path.basename(f));
    console.log(`\n🔍 Auditing specified files: ${pagesToAudit.join(', ')}`);
  } else {
    pagesToAudit = KEY_PAGES;
    console.log(`\n🔍 Auditing key pages (use --all for all files)`);
  }

  console.log(`\n⚙️  WCAG Tags: ${WCAG_TAGS.join(', ')}`);
  console.log(`🌐 Base URL: ${BASE_URL}`);
  console.log(`\n⚠️  Make sure the server is running: npm start\n`);

  // Launch browser
  const browser = await chromium.launch();

  // Audit all pages
  const results = [];
  for (const pagePath of pagesToAudit) {
    const result = await auditPage(browser, pagePath);
    results.push(result);

    // Print summary for this page
    if (result.error) {
      console.log(`   ❌ Error: ${result.error}`);
    } else if (result.results.violations.length === 0) {
      console.log(`   ✅ No violations found`);
    } else {
      console.log(`   ⚠️  ${result.results.violations.length} violations found`);
      result.results.violations.forEach(v => {
        console.log(formatViolation(v));
      });
    }
  }

  await browser.close();

  // Generate report
  const reportPath = generateHtmlReport(results);

  // Print summary
  console.log('\n' + '═'.repeat(80));
  console.log('📊 AUDIT SUMMARY');
  console.log('═'.repeat(80));

  let totalViolations = 0;
  let pagesWithIssues = 0;

  results.forEach(({ pagePath, results: r }) => {
    if (r && r.violations.length > 0) {
      totalViolations += r.violations.length;
      pagesWithIssues++;
    }
  });

  console.log(`\nPages audited: ${results.length}`);
  console.log(`Pages with issues: ${pagesWithIssues}`);
  console.log(`Total violations: ${totalViolations}`);
  console.log(`\n📄 HTML Report: ${reportPath}`);
  console.log(`   Open in browser: file://${reportPath.replace(/\\/g, '/')}`);

  // Exit with error code if violations found
  process.exit(totalViolations > 0 ? 1 : 0);
}

main().catch(console.error);
