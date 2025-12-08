#!/usr/bin/env node

const fs = require('fs');
const path = require('path');
const cheerio = require('cheerio');

class A11yAutomatedFixer {
    constructor() {
        this.fixes = [];
        this.filesChanged = new Set();
    }

    log(msg) {
        console.log(msg);
    }

    // Fix 1: Add main landmark to docs files
    fixMainLandmark(filePath, $) {
        let changed = false;
        
        const main = $('main');
        if (main.length === 0) {
            // Check if this is a docs file with minimal structure
            const body = $('body');
            if (body.length > 0) {
                // Wrap content that should be in main
                const header = $('header');
                const footer = $('footer');
                
                // Get content between header and footer
                let contentElements = [];
                body.children().each((i, elem) => {
                    const $elem = $(elem);
                    // Skip skip-link, header, footer
                    if (!$elem.is('header') && 
                        !$elem.is('footer') && 
                        !$elem.hasClass('skip-link') &&
                        !$elem.is('a.skip-link')) {
                        contentElements.push(elem);
                    }
                });
                
                if (contentElements.length > 0) {
                    // Wrap content in main
                    const mainEl = $('<main id="maincontent" role="main"></main>');
                    $(contentElements[0]).before(mainEl);
                    contentElements.forEach(elem => mainEl.append(elem));
                    
                    changed = true;
                    this.fixes.push({
                        file: filePath,
                        rule: 'landmark-one-main',
                        description: 'Added main landmark with id and role'
                    });
                    this.log(`  ✓ Added main landmark`);
                }
            }
        } else {
            // Main exists, ensure it has proper attributes
            let mainChanged = false;
            if (!main.attr('id')) {
                main.attr('id', 'maincontent');
                mainChanged = true;
            }
            if (!main.attr('role')) {
                main.attr('role', 'main');
                mainChanged = true;
            }
            if (mainChanged) {
                changed = true;
                this.fixes.push({
                    file: filePath,
                    rule: 'landmark-one-main',
                    description: 'Added id/role attributes to existing main'
                });
                this.log(`  ✓ Enhanced main landmark`);
            }
        }
        
        return changed;
    }

    // Fix 2: Ensure footer has role="contentinfo"
    fixFooterRole(filePath, $) {
        let changed = false;
        const footer = $('footer');
        
        if (footer.length > 0 && !footer.attr('role')) {
            footer.attr('role', 'contentinfo');
            changed = true;
            this.fixes.push({
                file: filePath,
                rule: 'footer-role',
                description: 'Added role=contentinfo to footer'
            });
            this.log(`  ✓ Added role to footer`);
        }
        
        return changed;
    }

    // Fix 3: Add type="button" to buttons outside forms
    fixButtonTypes(filePath, $) {
        let changed = false;
        let count = 0;
        
        $('button').each((i, elem) => {
            const $btn = $(elem);
            const type = $btn.attr('type');
            
            if (!type) {
                // Check if in a form
                const inForm = $btn.closest('form').length > 0;
                
                if (!inForm) {
                    $btn.attr('type', 'button');
                    count++;
                    changed = true;
                }
            }
        });
        
        if (changed) {
            this.fixes.push({
                file: filePath,
                rule: 'button-type',
                description: `Added type=button to ${count} button(s)`
            });
            this.log(`  ✓ Fixed ${count} button type(s)`);
        }
        
        return changed;
    }

    // Fix 4: Add rel="noopener noreferrer" to target="_blank"
    fixTargetBlank(filePath, $) {
        let changed = false;
        let count = 0;
        
        $('a[target="_blank"]').each((i, elem) => {
            const $link = $(elem);
            const rel = $link.attr('rel') || '';
            const relParts = rel.split(/\s+/).filter(Boolean);
            
            let needsUpdate = false;
            if (!relParts.includes('noopener')) {
                relParts.push('noopener');
                needsUpdate = true;
            }
            if (!relParts.includes('noreferrer')) {
                relParts.push('noreferrer');
                needsUpdate = true;
            }
            
            if (needsUpdate) {
                $link.attr('rel', relParts.join(' '));
                count++;
                changed = true;
            }
        });
        
        if (changed) {
            this.fixes.push({
                file: filePath,
                rule: 'target-blank-security',
                description: `Added rel attributes to ${count} target=_blank link(s)`
            });
            this.log(`  ✓ Fixed ${count} target=_blank link(s)`);
        }
        
        return changed;
    }

    // Fix 5: Add HTML lang attribute
    fixHtmlLang(filePath, $) {
        let changed = false;
        const html = $('html');
        
        if (html.length > 0 && !html.attr('lang')) {
            html.attr('lang', 'en');
            changed = true;
            this.fixes.push({
                file: filePath,
                rule: 'html-has-lang',
                description: 'Added lang=en to html element'
            });
            this.log(`  ✓ Added lang attribute to html`);
        }
        
        return changed;
    }

    // Fix 6: Ensure document has a title
    fixDocumentTitle(filePath, $) {
        let changed = false;
        const head = $('head');
        const title = $('title');
        
        if (head.length > 0 && title.length === 0) {
            // Add a title based on filename or first h1
            const filename = path.basename(filePath, '.html');
            const h1 = $('h1').first();
            let titleText = 'Untitled Page';
            
            if (h1.length > 0) {
                titleText = h1.text().trim();
            } else {
                titleText = filename.replace(/-/g, ' ')
                    .replace(/\b\w/g, l => l.toUpperCase());
            }
            
            head.prepend(`<title>${titleText}</title>\n  `);
            changed = true;
            this.fixes.push({
                file: filePath,
                rule: 'document-title',
                description: `Added title: ${titleText}`
            });
            this.log(`  ✓ Added title: ${titleText}`);
        }
        
        return changed;
    }

    // Fix 7: Wrap orphan content in proper HTML structure
    fixBasicStructure(filePath, $) {
        let changed = false;
        
        // Check if document has proper HTML structure
        if ($('html').length === 0) {
            // Document is missing proper HTML structure, need to wrap
            const bodyContent = $.html();
            
            // Determine title from first h1
            const firstH1Match = bodyContent.match(/<h1[^>]*>(.*?)<\/h1>/i);
            const titleText = firstH1Match ? firstH1Match[1].replace(/<[^>]+>/g, '') : 'Document';
            
            const newHtml = `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <title>${titleText}</title>
</head>
<body>
<main id="maincontent" role="main">
${bodyContent}
</main>
</body>
</html>`;
            
            // Load the new HTML
            const $new = cheerio.load(newHtml, { decodeEntities: false });
            
            // Replace $ with the new structure
            Object.assign($, $new);
            
            changed = true;
            this.fixes.push({
                file: filePath,
                rule: 'basic-structure',
                description: 'Added proper HTML5 document structure'
            });
            this.log(`  ✓ Added HTML5 document structure`);
        }
        
        return changed;
    }

    // Process a single file
    processFile(filePath) {
        const relativePath = filePath.replace(process.cwd() + '/', '');
        this.log(`\n Processing: ${relativePath}`);
        
        let content = fs.readFileSync(filePath, 'utf8');
        const $ = cheerio.load(content, { 
            decodeEntities: false,
            xmlMode: false
        });
        
        let changed = false;
        
        // Apply fixes
        changed = this.fixBasicStructure(filePath, $) || changed;
        changed = this.fixHtmlLang(filePath, $) || changed;
        changed = this.fixDocumentTitle(filePath, $) || changed;
        changed = this.fixMainLandmark(filePath, $) || changed;
        changed = this.fixFooterRole(filePath, $) || changed;
        changed = this.fixButtonTypes(filePath, $) || changed;
        changed = this.fixTargetBlank(filePath, $) || changed;
        
        if (changed) {
            // Save the file
            fs.writeFileSync(filePath, $.html());
            this.filesChanged.add(relativePath);
            this.log(`  ✓ File updated`);
        } else {
            this.log(`  No changes needed`);
        }
        
        return changed;
    }

    // Process all HTML files
    processAllFiles() {
        const repoRoot = path.join(__dirname, '..');
        const webDir = path.join(repoRoot, 'work', 'web');
        const docsDir = path.join(repoRoot, 'docs');
        
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
        
        this.log(`Found ${files.length} HTML files\n`);
        this.log('='.repeat(60));
        
        for (const file of files) {
            this.processFile(file);
        }
    }

    // Generate report
    generateReport() {
        console.log('\n' + '='.repeat(60));
        console.log('\n✓ AUTOMATED FIXES COMPLETE\n');
        console.log(`Files changed: ${this.filesChanged.size}`);
        console.log(`Total fixes applied: ${this.fixes.length}\n`);
        
        // Group by rule
        const byRule = {};
        for (const fix of this.fixes) {
            if (!byRule[fix.rule]) byRule[fix.rule] = [];
            byRule[fix.rule].push(fix);
        }
        
        console.log('Fixes by rule:');
        for (const [rule, fixes] of Object.entries(byRule)) {
            console.log(`  ${rule}: ${fixes.length} instances`);
        }
        
        // Save report
        const reportPath = path.join(__dirname, 'axe-reports', 'fix-report.json');
        fs.writeFileSync(reportPath, JSON.stringify({
            filesChanged: Array.from(this.filesChanged),
            totalFixes: this.fixes.length,
            fixes: this.fixes,
            fixesByRule: byRule
        }, null, 2));
        
        console.log(`\nReport saved to: scripts/axe-reports/fix-report.json`);
    }
}

// Run
const fixer = new A11yAutomatedFixer();
fixer.processAllFiles();
fixer.generateReport();
