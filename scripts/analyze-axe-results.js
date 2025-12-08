#!/usr/bin/env node
/**
 * Analyze axe-core scan results and generate a comprehensive summary
 */
const fs = require('fs');
const path = require('path');

const reportsDir = path.join(__dirname, 'axe-reports');
const files = fs.readdirSync(reportsDir).filter(f => f.endsWith('.json') && !f.startsWith('error_'));

console.log(`Analyzing ${files.length} axe reports...\n`);

const stats = {
    totalPages: files.length,
    pagesWithViolations: 0,
    totalViolations: 0,
    violationsByRule: {},
    violationsByImpact: {
        critical: 0,
        serious: 0,
        moderate: 0,
        minor: 0
    },
    pageViolations: []
};

files.forEach(file => {
    const reportPath = path.join(reportsDir, file);
    const report = JSON.parse(fs.readFileSync(reportPath, 'utf-8'));
    
    if (!report.violations || report.violations.length === 0) {
        return;
    }
    
    stats.pagesWithViolations++;
    let pageViolationCount = 0;
    
    report.violations.forEach(violation => {
        const count = violation.nodes ? violation.nodes.length : 1;
        pageViolationCount += count;
        stats.totalViolations += count;
        
        // Count by rule
        if (!stats.violationsByRule[violation.id]) {
            stats.violationsByRule[violation.id] = {
                count: 0,
                impact: violation.impact,
                description: violation.description,
                helpUrl: violation.helpUrl,
                pages: []
            };
        }
        stats.violationsByRule[violation.id].count += count;
        stats.violationsByRule[violation.id].pages.push(file.replace('.json', ''));
        
        // Count by impact
        const impact = violation.impact || 'minor';
        stats.violationsByImpact[impact] += count;
    });
    
    stats.pageViolations.push({
        page: file.replace('.json', ''),
        count: pageViolationCount
    });
});

// Sort by count
stats.pageViolations.sort((a, b) => b.count - a.count);

console.log('=== SUMMARY ===');
console.log(`Total Pages Scanned: ${stats.totalPages}`);
console.log(`Pages with Violations: ${stats.pagesWithViolations} (${Math.round(stats.pagesWithViolations/stats.totalPages*100)}%)`);
console.log(`Total Violations: ${stats.totalViolations}`);
console.log();

console.log('=== VIOLATIONS BY IMPACT ===');
console.log(`Critical: ${stats.violationsByImpact.critical}`);
console.log(`Serious: ${stats.violationsByImpact.serious}`);
console.log(`Moderate: ${stats.violationsByImpact.moderate}`);
console.log(`Minor: ${stats.violationsByImpact.minor}`);
console.log();

console.log('=== VIOLATIONS BY RULE (Top 10) ===');
const rulesSorted = Object.entries(stats.violationsByRule)
    .sort((a, b) => b[1].count - a[1].count)
    .slice(0, 10);

rulesSorted.forEach(([ruleId, data]) => {
    console.log(`\n${ruleId} [${data.impact}]`);
    console.log(`  Count: ${data.count} across ${data.pages.length} pages`);
    console.log(`  Description: ${data.description}`);
    console.log(`  Help: ${data.helpUrl}`);
});

console.log('\n=== TOP 10 PAGES WITH MOST VIOLATIONS ===');
stats.pageViolations.slice(0, 10).forEach(pv => {
    console.log(`${pv.page}: ${pv.count} violations`);
});

// Write detailed JSON report
const outputPath = path.join(__dirname, '..', 'work', 'output', 'axe-summary.json');
fs.writeFileSync(outputPath, JSON.stringify(stats, null, 2));
console.log(`\nDetailed summary written to: ${outputPath}`);

// Return counts for automation
process.exit(0);
