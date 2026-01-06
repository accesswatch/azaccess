const fs = require('fs');
const path = require('path');

/**
 * ARIA Region Cleanup Script
 * 
 * Accessibility best practice: Don't add aria-labelledby to sections
 * when the heading is already the first meaningful child - screen readers
 * already associate them. This reduces verbosity.
 * 
 * Rules applied:
 * 1. Remove aria-labelledby from <section> when heading is first child
 * 2. Remove orphaned id attributes from headings (if only used for aria-labelledby)
 * 3. Keep aria-labelledby for complex widgets (tabs, accordions, dialogs)
 * 4. Keep id attributes that are used for skip links or other anchors
 */

function processFile(filePath) {
    let content = fs.readFileSync(filePath, 'utf8');
    const originalContent = content;
    let changes = [];

    // Pattern: <section ... aria-labelledby="xxx-title"> followed by <h2 id="xxx-title">
    // This is redundant - the heading is already the section's accessible name

    // Step 1: Find all section aria-labelledby patterns and their associated heading ids
    const sectionPattern = /<section([^>]*)\s+aria-labelledby="([^"]+)"([^>]*)>/gi;
    const sectionsToFix = [];

    let match;
    while ((match = sectionPattern.exec(content)) !== null) {
        const fullMatch = match[0];
        const beforeAttr = match[1];
        const labelledById = match[2];
        const afterAttr = match[3];

        // Check if heading with this id is the first meaningful child
        const sectionStart = match.index;
        const afterSection = content.slice(sectionStart + fullMatch.length, sectionStart + fullMatch.length + 500);

        // Look for heading as first meaningful content (allowing whitespace)
        const headingPattern = new RegExp(`^\\s*<h[1-6][^>]*\\s+id="${labelledById}"`, 'i');
        const headingPatternAlt = new RegExp(`^\\s*<h[1-6][^>]*\\s+id='${labelledById}'`, 'i');

        if (headingPattern.test(afterSection) || headingPatternAlt.test(afterSection)) {
            sectionsToFix.push({
                fullMatch,
                labelledById,
                beforeAttr,
                afterAttr
            });
        }
    }

    // Step 2: Remove redundant aria-labelledby from sections
    for (const section of sectionsToFix) {
        const newSection = `<section${section.beforeAttr}${section.afterAttr}>`.replace(/\s+>/g, '>').replace(/\s{2,}/g, ' ');
        content = content.replace(section.fullMatch, newSection);
    }

    if (sectionsToFix.length > 0) {
        changes.push(`Removed ${sectionsToFix.length} redundant aria-labelledby from sections`);
    }

    // Step 3: Clean up heading ids that are now orphaned
    // Only remove id if it follows pattern "xxx-title" and is no longer referenced
    const headingIdPattern = /<(h[1-6])([^>]*)\s+id="([^"]*-title)"([^>]*)>/gi;
    let headingMatch;
    const orphanedIds = [];

    // Reset and search for heading ids
    const tempContent = content;
    while ((headingMatch = headingIdPattern.exec(tempContent)) !== null) {
        const headingId = headingMatch[3];

        // Check if this id is still referenced anywhere (aria-labelledby, href, etc.)
        const idRefPattern = new RegExp(`(aria-labelledby|href|aria-controls|aria-describedby)=["'][^"']*${headingId}`, 'i');

        // Also check for anchor links
        const anchorPattern = new RegExp(`href=["']#${headingId}["']`, 'i');

        if (!idRefPattern.test(content) && !anchorPattern.test(content)) {
            orphanedIds.push({
                fullMatch: headingMatch[0],
                tag: headingMatch[1],
                beforeId: headingMatch[2],
                id: headingId,
                afterId: headingMatch[4]
            });
        }
    }

    // Remove orphaned ids from headings
    for (const heading of orphanedIds) {
        const newHeading = `<${heading.tag}${heading.beforeId}${heading.afterId}>`.replace(/\s+>/g, '>').replace(/\s{2,}/g, ' ');
        content = content.replace(heading.fullMatch, newHeading);
    }

    if (orphanedIds.length > 0) {
        changes.push(`Removed ${orphanedIds.length} orphaned heading ids`);
    }

    // Step 4: Remove redundant id from section elements (if only used for aria-labelledby that we removed)
    // Pattern: <section id="xxx" ...> where xxx is not used for anchor links
    const sectionIdPattern = /<section\s+id="([^"]+)"([^>]*)>/gi;
    const orphanedSectionIds = [];

    while ((match = sectionIdPattern.exec(content)) !== null) {
        const sectionId = match[1];
        const fullMatch = match[0];
        const afterId = match[2];

        // Check if id is still referenced (skip links, anchors, aria attributes)
        const idRefPattern = new RegExp(`href=["']#${sectionId}["']`, 'i');
        const ariaRefPattern = new RegExp(`aria-[a-z]+=["'][^"']*${sectionId}`, 'i');

        // Keep ids that might be used for navigation (common patterns)
        const keepPatterns = /^(maincontent|main|content|nav|header|footer|search|hero)$/i;

        if (!idRefPattern.test(content) && !ariaRefPattern.test(content) && !keepPatterns.test(sectionId)) {
            orphanedSectionIds.push({
                fullMatch,
                id: sectionId,
                afterId
            });
        }
    }

    // Remove orphaned section ids
    for (const section of orphanedSectionIds) {
        const newSection = `<section${section.afterId}>`.replace(/\s+>/g, '>').replace(/^\s+/, '');
        content = content.replace(section.fullMatch, newSection);
    }

    if (orphanedSectionIds.length > 0) {
        changes.push(`Removed ${orphanedSectionIds.length} orphaned section ids`);
    }

    // Step 5: Clean up any double spaces or formatting issues
    content = content.replace(/<section\s+>/g, '<section>');
    content = content.replace(/<(h[1-6])\s+>/g, '<$1>');
    content = content.replace(/\s{2,}(?=<)/g, '\n');

    // Write changes
    if (content !== originalContent) {
        fs.writeFileSync(filePath, content, 'utf8');
        console.log(`✓ ${path.basename(filePath)}: ${changes.join(', ')}`);
        return { modified: true, changes };
    }

    return { modified: false, changes: [] };
}

function processDirectory(dirPath) {
    let totalFiles = 0;
    let modifiedFiles = 0;
    let totalChanges = {
        ariaLabelledby: 0,
        orphanedHeadingIds: 0,
        orphanedSectionIds: 0
    };

    const files = fs.readdirSync(dirPath);
    for (const file of files) {
        const filePath = path.join(dirPath, file);
        const stat = fs.statSync(filePath);

        if (stat.isDirectory() && !file.startsWith('.')) {
            const result = processDirectory(filePath);
            totalFiles += result.total;
            modifiedFiles += result.modified;
        } else if (file.endsWith('.html')) {
            totalFiles++;
            const result = processFile(filePath);
            if (result.modified) {
                modifiedFiles++;
            }
        }
    }

    return { total: totalFiles, modified: modifiedFiles };
}

console.log('Cleaning up redundant ARIA regions...\n');
console.log('Rules being applied:');
console.log('  1. Remove aria-labelledby when heading is first child of section');
console.log('  2. Remove orphaned heading ids (only used for removed aria-labelledby)');
console.log('  3. Remove orphaned section ids (not used for navigation)\n');

const result = processDirectory('./docs');
console.log(`\n✓ Done! Modified ${result.modified} of ${result.total} files`);

// Also process _includes
const includesDir = './_includes';
if (fs.existsSync(includesDir)) {
    const includesResult = processDirectory(includesDir);
    if (includesResult.modified > 0) {
        console.log(`✓ Modified ${includesResult.modified} files in _includes/`);
    }
}
