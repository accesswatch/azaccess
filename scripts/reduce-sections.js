const fs = require('fs');
const path = require('path');

/**
 * Section to Div Cleanup Script
 * 
 * Problem: <section> elements are treated as "region" landmarks by screen readers
 * when they have an accessible name (heading, aria-labelledby, or aria-label).
 * Having many regions makes navigation verbose and confusing.
 * 
 * Solution: Convert most <section> to <div>, keeping <section> only for:
 * - Main content areas that benefit from landmark navigation
 * - Skip link targets (maincontent, etc.)
 * - Genuinely distinct page sections users would want to jump to
 * 
 * This script converts <section> to <div> for general content groupings,
 * keeping the semantic structure via headings.
 */

// IDs that should KEEP section (for skip links or major landmarks)
const keepSectionIds = new Set([
    'maincontent',
    'main',
    'content',
    'hero',
    'search',
    'sidebar',
    'nav',
    'navigation'
]);

function processFile(filePath) {
    let content = fs.readFileSync(filePath, 'utf8');
    const originalContent = content;
    let changes = [];

    // Pattern: <section ...> or <section>
    // Convert to <div> unless it has a keepSectionId

    // First, handle sections with IDs
    const sectionWithIdPattern = /<section(\s+)id="([^"]+)"([^>]*)>/gi;
    let sectionsConverted = 0;
    let sectionsKept = 0;

    content = content.replace(sectionWithIdPattern, (match, space1, id, rest) => {
        if (keepSectionIds.has(id.toLowerCase())) {
            sectionsKept++;
            return match; // Keep as section
        }
        sectionsConverted++;
        return `<div${space1}id="${id}"${rest}>`;
    });

    // Handle sections without IDs (just <section> or <section class="...">)
    const sectionNoIdPattern = /<section(\s*)(?!id=)([^>]*)>/gi;
    content = content.replace(sectionNoIdPattern, (match, space, rest) => {
        // Skip if this section has id= somewhere in rest
        if (rest.includes('id=')) {
            return match;
        }
        sectionsConverted++;
        return `<div${space}${rest}>`;
    });

    // Now convert closing </section> tags
    // We need to be smart about this - only convert the ones we changed
    // Count opening divs and sections to determine how many </section> to convert

    // Simpler approach: just convert all </section> to </div> and then
    // convert back the ones that should remain sections

    // Actually, let's do a more careful approach:
    // After the above replacements, any remaining <section> tags are the ones we kept
    // So we need to convert </section> tags proportionally

    // Count remaining <section> tags
    const remainingSections = (content.match(/<section[\s>]/gi) || []).length;
    const closingSections = (content.match(/<\/section>/gi) || []).length;

    // Convert excess </section> to </div>
    const excessClosing = closingSections - remainingSections;

    if (excessClosing > 0) {
        // Convert </section> to </div> from the end, working backwards
        // to preserve any sections we're keeping at the top of the file
        let converted = 0;
        content = content.replace(/<\/section>/gi, (match) => {
            // Convert all of them to </div> first
            return '</div>';
        });

        // Now convert back the ones that should be </section>
        // by finding the remaining <section> tags and matching them
        let sectionCount = 0;
        const sectionPositions = [];
        const divPositions = [];

        // This is getting complex. Let's use a simpler stack-based approach
    }

    // Actually, let's just do a simple replace and handle it properly
    // Reset and use a stack-based approach
    content = originalContent;

    // Parse through the content and track section/div balance
    const lines = content.split('\n');
    const newLines = [];
    let sectionStack = []; // Track which sections should stay as sections

    for (let i = 0; i < lines.length; i++) {
        let line = lines[i];

        // Check for opening section tags
        const openMatch = line.match(/<section(\s*)([^>]*)>/i);
        if (openMatch) {
            const attrs = openMatch[2];
            const idMatch = attrs.match(/id="([^"]+)"/i);
            const shouldKeep = idMatch && keepSectionIds.has(idMatch[1].toLowerCase());

            if (shouldKeep) {
                sectionStack.push('section');
                // Keep as is
            } else {
                sectionStack.push('div');
                line = line.replace(/<section(\s*)([^>]*)>/i, '<div$1$2>');
                sectionsConverted++;
            }
        }

        // Check for closing section tags
        if (line.includes('</section>')) {
            const closeTag = sectionStack.pop();
            if (closeTag === 'div') {
                line = line.replace('</section>', '</div>');
            }
        }

        newLines.push(line);
    }

    content = newLines.join('\n');

    if (sectionsConverted > 0) {
        changes.push(`Converted ${sectionsConverted} <section> to <div>`);
    }

    if (content !== originalContent) {
        fs.writeFileSync(filePath, content, 'utf8');
        console.log(`✓ ${path.basename(filePath)}: ${changes.join(', ')}`);
        return { modified: true, converted: sectionsConverted };
    }

    return { modified: false, converted: 0 };
}

function processDirectory(dirPath) {
    let totalFiles = 0;
    let modifiedFiles = 0;
    let totalConverted = 0;

    const files = fs.readdirSync(dirPath);
    for (const file of files) {
        const filePath = path.join(dirPath, file);
        const stat = fs.statSync(filePath);

        if (stat.isDirectory() && !file.startsWith('.')) {
            const result = processDirectory(filePath);
            totalFiles += result.total;
            modifiedFiles += result.modified;
            totalConverted += result.converted;
        } else if (file.endsWith('.html')) {
            totalFiles++;
            const result = processFile(filePath);
            if (result.modified) {
                modifiedFiles++;
                totalConverted += result.converted;
            }
        }
    }

    return { total: totalFiles, modified: modifiedFiles, converted: totalConverted };
}

console.log('Converting excessive <section> elements to <div>...\n');
console.log('Keeping <section> only for: maincontent, main, content, hero, search, sidebar, nav\n');

const result = processDirectory('./docs');
console.log(`\n✓ Done! Modified ${result.modified} of ${result.total} files`);
console.log(`✓ Converted ${result.converted} sections to divs`);
