#!/usr/bin/env node
const fs = require('fs');
const path = require('path');

function findReport() {
  const candidates = [path.join('reports','accessibility.json'), path.join('docs','reports','accessibility.json')];
  return candidates.find(p => fs.existsSync(p));
}

const reportPath = findReport();
if (!reportPath) {
  console.error('No accessibility report found in reports/ or docs/reports/. Skipping history recording.');
  process.exit(0);
}

let raw;
try { raw = fs.readFileSync(reportPath, 'utf8'); } catch (e) { console.error('Failed to read report:', e); process.exit(1); }
let data;
try { data = JSON.parse(raw); } catch (e) { console.error('Invalid JSON in report:', e); process.exit(1); }

function occurrencesCount(d) {
  if (!d || (typeof d === 'object' && Object.keys(d).length === 0)) return { total: 0, issues: [] };
  let issues = [];
  if (Array.isArray(d)) issues = d;
  else if (d.violations) issues = d.violations;
  else if (d.results) issues = d.results;
  else if (d.issues) issues = d.issues;
  else issues = [d];

  let count = 0;
  issues.forEach(issue => {
    if (!issue || Object.keys(issue).length === 0) return;
    if (issue.nodes && Array.isArray(issue.nodes)) count += issue.nodes.length;
    else if (issue.targets && Array.isArray(issue.targets)) count += issue.targets.length;
    else count += 1;
  });
  return { total: count, issues };
}

const { total } = occurrencesCount(data);

const historyDir = path.join('docs','reports','history');
fs.mkdirSync(historyDir, { recursive: true });

const ts = new Date().toISOString().replace(/[:.]/g, '-');
const filename = `${ts}.json`;
const outPath = path.join(historyDir, filename);

fs.writeFileSync(outPath, JSON.stringify(data, null, 2), 'utf8');

const indexPath = path.join(historyDir, 'index.json');
let index = [];
if (fs.existsSync(indexPath)) {
  try { index = JSON.parse(fs.readFileSync(indexPath, 'utf8')); } catch (e) { index = []; }
}

index.unshift({ timestamp: ts, file: `history/${filename}`, totalIssues: total });
if (index.length > 365) index = index.slice(0, 365);
fs.writeFileSync(indexPath, JSON.stringify(index, null, 2), 'utf8');

console.log('Accessibility history recorded:', outPath, 'totalIssues=', total);
