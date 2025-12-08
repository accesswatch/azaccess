const fs = require('fs');
const path = require('path');
const cheerio = require('cheerio');

class AccessibilityFixer {
    constructor(repoRoot) {
        this.repoRoot = repoRoot;
        this.fixes = [];
        this.errors = [];
    }

    log(message) {
        console.log(message);
    }

    error(message) {
        console.error(message);
        this.errors.push(message);
    }

    recordFix(file, rule, description) {
        this.fixes.push({ file, rule, description });
    }

    // Fix 1: Skip link should be within a landmark
    fixSkipLinkRegion(filePath) {
        const content = fs.readFileSync(filePath, 'utf8');
        const $ = cheerio.load(content, { decodeEntities: false });
        
        let changed = false;
        const skipLink = $('.skip-link');
        
        if (skipLink.length > 0) {
            // Check if skip link is outside any landmark
            const parent = skipLink.parent();
            if (parent.is('body')) {
                // Skip link is directly in body, which is correct but axe reports it
                // The issue is likely that it's the only content outside landmarks
                // This is actually acceptable for skip links
                this.log(`  Skip link in ${filePath} is in correct position`);
            }
        }
        
        return changed ? $.html() : null;
    }

    // Fix 2: Ensure main landmark exists
    fixMainLandmark(filePath) {
        const content = fs.readFileSync(filePath, 'utf8');
        const $ = cheerio.load(content, { decodeEntities: false });
        
        let changed = false;
        
        // Check if main element exists
        const main = $('main');
        if (main.length === 0) {
            this.log(`  Adding main landmark to ${filePath}`);
            // Find body content and wrap it
            const body = $('body');
            const header = $('header');
            const footer = $('footer');
            
            // Get all content between header and footer
            let contentStart = header.length > 0 ? header.next() : body.children().first();
            
            if (contentStart.length > 0 && !contentStart.is('main')) {
                // Wrap content in main
                let mainContent = '';
                let foundFooter = false;
                
                body.children().each((i, elem) => {
                    const $elem = $(elem);
                    if ($elem.is('header') || $elem.is('.skip-link') || $elem.hasClass('skip-link')) {
                        // Keep header and skip link outside main
                    } else if ($elem.is('footer')) {
                        foundFooter = true;
                    } else if (!foundFooter) {
                        mainContent += $.html($elem) + '\n';
                        $elem.remove();
                    }
                });
                
                if (mainContent.trim()) {
                    const mainElement = `<main id="maincontent" role="main">\n${mainContent}</main>`;
                    if (footer.length > 0) {
                        footer.before(mainElement);
                    } else {
                        body.append(mainElement);
                    }
                    changed = true;
                    this.recordFix(filePath, 'landmark-one-main', 'Added main landmark');
                }
            }
        } else if (!main.attr('id')) {
            main.attr('id', 'maincontent');
            main.attr('role', 'main');
            changed = true;
            this.recordFix(filePath, 'landmark-one-main', 'Added id and role to main');
        }
        
        return changed ? $.html() : null;
    }

    // Fix 3: Ensure footer has role="contentinfo"
    fixFooterRole(filePath) {
        const content = fs.readFileSync(filePath, 'utf8');
        const $ = cheerio.load(content, { decodeEntities: false });
        
        let changed = false;
        const footer = $('footer');
        
        if (footer.length > 0 && !footer.attr('role')) {
            footer.attr('role', 'contentinfo');
            changed = true;
            this.recordFix(filePath, 'footer-role', 'Added role=contentinfo to footer');
        }
        
        return changed ? $.html() : null;
    }

    // Fix 4: Add type="button" to buttons that are not submits
    fixButtonTypes(filePath) {
        const content = fs.readFileSync(filePath, 'utf8');
        const $ = cheerio.load(content, { decodeEntities: false });
        
        let changed = false;
        
        $('button').each((i, elem) => {
            const $btn = $(elem);
            const type = $btn.attr('type');
            
            // If button has no type attribute, default is 'submit'
            // We should add type="button" for non-form buttons
            if (!type) {
                // Check if button is inside a form
                const inForm = $btn.closest('form').length > 0;
                
                if (!inForm) {
                    $btn.attr('type', 'button');
                    changed = true;
                }
            }
        });
        
        if (changed) {
            this.recordFix(filePath, 'button-type', 'Added type=button to non-submit buttons');
        }
        
        return changed ? $.html() : null;
    }

    // Fix 5: Add rel="noopener noreferrer" to target="_blank" links
    fixTargetBlankLinks(filePath) {
        const content = fs.readFileSync(filePath, 'utf8');
        const $ = cheerio.load(content, { decodeEntities: false });
        
        let changed = false;
        
        $('a[target="_blank"]').each((i, elem) => {
            const $link = $(elem);
            const rel = $link.attr('rel') || '';
            
            const needed = [];
            if (!rel.includes('noopener')) needed.push('noopener');
            if (!rel.includes('noreferrer')) needed.push('noreferrer');
            
            if (needed.length > 0) {
                const newRel = rel ? `${rel} ${needed.join(' ')}` : needed.join(' ');
                $link.attr('rel', newRel.trim());
                changed = true;
            }
        });
        
        if (changed) {
            this.recordFix(filePath, 'target-blank', 'Added rel=noopener noreferrer to target=_blank links');
        }
        
        return changed ? $.html() : null;
    }

    // Apply all fixes to a file
    applyFixesToFile(filePath) {
        this.log(`\nProcessing: ${filePath}`);
        
        let changed = false;
        let content = fs.readFileSync(filePath, 'utf8');
        
        // Apply fixes in sequence
        const fixes = [
            () => this.fixMainLandmark(filePath),
            () => this.fixFooterRole(filePath),
            () => this.fixButtonTypes(filePath),
            () => this.fixTargetBlankLinks(filePath)
        ];
        
        for (const fix of fixes) {
            const result = fix();
            if (result) {
                content = result;
                fs.writeFileSync(filePath, content);
                changed = true;
            }
        }
        
        if (!changed) {
            this.log('  No automated fixes needed');
        }
        
        return changed;
    }

    // Process all HTML files
    processAllFiles() {
        const webDir = path.join(this.repoRoot, 'work', 'web');
        const docsDir = path.join(this.repoRoot, 'docs');
        
        const files = [];
        
        if (fs.existsSync(webDir)) {
            fs.readdirSync(webDir)
                .filter(f => f.endsWith('.html'))
                .forEach(f => files.push(path.join(webDir, f)));
        }
        
        if (fs.existsSync(docsDir)) {
            fs.readdirSync(docsDir)
                .filter(f => f.endsWith('.html'))
                .forEach(f => files.push(path.join(docsDir, f)));
        }
        
        this.log(`Found ${files.length} HTML files to process\n`);
        
        let changedCount = 0;
        for (const file of files) {
            if (this.applyFixesToFile(file)) {
                changedCount++;
            }
        }
        
        return { total: files.length, changed: changedCount };
    }

    // Generate summary report
    generateReport() {
        console.log('\n=== AUTOMATED FIX SUMMARY ===\n');
        console.log(`Total fixes applied: ${this.fixes.length}`);
        
        // Group by rule
        const byRule = {};
        for (const fix of this.fixes) {
            if (!byRule[fix.rule]) byRule[fix.rule] = [];
            byRule[fix.rule].push(fix);
        }
        
        console.log('\nFixes by rule:');
        for (const [rule, fixes] of Object.entries(byRule)) {
            console.log(`  ${rule}: ${fixes.length} files`);
        }
        
        if (this.errors.length > 0) {
            console.log(`\nErrors encountered: ${this.errors.length}`);
            this.errors.forEach(err => console.log(`  - ${err}`));
        }
        
        return {
            totalFixes: this.fixes.length,
            fixesByRule: byRule,
            errors: this.errors
        };
    }
}

// Check if cheerio is available, if not we need to install it
try {
    require.resolve('cheerio');
} catch (e) {
    console.log('Installing cheerio...');
    require('child_process').execSync('npm install cheerio', { stdio: 'inherit' });
    console.log('Cheerio installed. Please run the script again.');
    process.exit(0);
}

// Main execution
const repoRoot = path.join(__dirname, '..');
const fixer = new AccessibilityFixer(repoRoot);

const result = fixer.processAllFiles();
const report = fixer.generateReport();

console.log(`\n=== FINAL STATS ===`);
console.log(`Files processed: ${result.total}`);
console.log(`Files changed: ${result.changed}`);

fs.writeFileSync(
    path.join(__dirname, 'axe-reports', 'fix-report.json'),
    JSON.stringify(report, null, 2)
);
console.log('\nFix report saved to: scripts/axe-reports/fix-report.json');
