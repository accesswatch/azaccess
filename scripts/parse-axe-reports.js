const fs = require('fs');
const path = require('path');

const reportsDir = path.join(__dirname, 'axe-reports');
const files = fs.readdirSync(reportsDir).filter(f => f.endsWith('.json'));

const issuesByRule = {};
const issuesByImpact = { critical: [], serious: [], moderate: [], minor: [] };
const issuesByPage = {};

console.log(`Analyzing ${files.length} reports...\n`);

for (const file of files) {
    const filePath = path.join(reportsDir, file);
    const report = JSON.parse(fs.readFileSync(filePath, 'utf8'));
    const pageName = file.replace('.json', '');
    
    if (!report.violations || report.violations.length === 0) continue;
    
    issuesByPage[pageName] = report.violations.length;
    
    for (const violation of report.violations) {
        const rule = violation.id;
        const impact = violation.impact || 'moderate';
        
        if (!issuesByRule[rule]) {
            issuesByRule[rule] = {
                description: violation.description,
                help: violation.help,
                helpUrl: violation.helpUrl,
                impact: impact,
                count: 0,
                pages: []
            };
        }
        
        issuesByRule[rule].count += violation.nodes.length;
        if (!issuesByRule[rule].pages.includes(pageName)) {
            issuesByRule[rule].pages.push(pageName);
        }
        
        if (issuesByImpact[impact]) {
            issuesByImpact[impact].push({
                rule: rule,
                page: pageName,
                nodes: violation.nodes.length
            });
        }
    }
}

console.log('=== TOP ISSUES BY IMPACT ===\n');

const impacts = ['critical', 'serious', 'moderate', 'minor'];
for (const impact of impacts) {
    const issues = issuesByImpact[impact];
    if (issues.length > 0) {
        console.log(`${impact.toUpperCase()}: ${issues.length} instances`);
    }
}

console.log('\n=== TOP RULES (by affected pages) ===\n');

const sortedRules = Object.entries(issuesByRule)
    .sort((a, b) => b[1].pages.length - a[1].pages.length)
    .slice(0, 15);

for (const [rule, data] of sortedRules) {
    console.log(`${rule}: ${data.pages.length} pages, ${data.count} instances (${data.impact})`);
    console.log(`  ${data.description}`);
}

console.log('\n=== TOP PAGES (by violation count) ===\n');

const sortedPages = Object.entries(issuesByPage)
    .sort((a, b) => b[1] - a[1])
    .slice(0, 10);

for (const [page, count] of sortedPages) {
    console.log(`${page}: ${count} violations`);
}

console.log('\n=== SUMMARY ===\n');
console.log(`Total pages scanned: ${files.length}`);
console.log(`Pages with violations: ${Object.keys(issuesByPage).length}`);
console.log(`Unique rules violated: ${Object.keys(issuesByRule).length}`);
console.log(`Total violation instances: ${Object.values(issuesByRule).reduce((sum, r) => sum + r.count, 0)}`);

// Save prioritized report
const prioritizedReport = {
    summary: {
        totalPages: files.length,
        pagesWithViolations: Object.keys(issuesByPage).length,
        uniqueRules: Object.keys(issuesByRule).length,
        totalInstances: Object.values(issuesByRule).reduce((sum, r) => sum + r.count, 0)
    },
    byImpact: issuesByImpact,
    byRule: issuesByRule,
    byPage: issuesByPage
};

fs.writeFileSync(
    path.join(reportsDir, 'prioritized-summary.json'),
    JSON.stringify(prioritizedReport, null, 2)
);
console.log('\nPrioritized report saved to: scripts/axe-reports/prioritized-summary.json');
