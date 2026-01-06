const fs = require('fs');
const path = require('path');

// Comprehensive emoji regex pattern
const emojiPattern = /[\u{1F300}-\u{1F9FF}]|[\u{2600}-\u{26FF}]|[\u{2700}-\u{27BF}]|[\u{1F000}-\u{1F02F}]|[\u{1F0A0}-\u{1F0FF}]|[\u{1F100}-\u{1F64F}]|[\u{1F680}-\u{1F6FF}]|[\u{1F1E0}-\u{1F1FF}]|[\u{2300}-\u{23FF}]|[\u{2B05}-\u{2B55}]|[\u{25A0}-\u{25FF}]|[\u{2190}-\u{21FF}]|[\u{2200}-\u{22FF}]|[\u{2460}-\u{24FF}]|[\u{2500}-\u{257F}]|[\u{2580}-\u{259F}]|[\u{2900}-\u{297F}]|[\u{2B00}-\u{2BFF}]|[\u{3000}-\u{303F}]|[\u{FE00}-\u{FE0F}]|[\u{203C}\u{2049}\u{20E3}\u{2122}\u{2139}\u{2194}-\u{21AA}\u{231A}-\u{231B}\u{2328}\u{23CF}\u{23E9}-\u{23F3}\u{23F8}-\u{23FA}\u{24C2}\u{25AA}-\u{25AB}\u{25B6}\u{25C0}\u{25FB}-\u{25FE}\u{2611}\u{2614}-\u{2615}\u{2618}\u{2620}\u{2622}-\u{2623}\u{2626}\u{262A}\u{262E}-\u{262F}\u{2638}-\u{263A}\u{2640}\u{2642}\u{2648}-\u{2653}\u{2660}\u{2663}\u{2665}-\u{2666}\u{2668}\u{267B}\u{267E}-\u{267F}\u{2692}-\u{2697}\u{2699}\u{269B}-\u{269C}\u{26A0}-\u{26A1}\u{26AA}-\u{26AB}\u{26B0}-\u{26B1}\u{26BD}-\u{26BE}\u{26C4}-\u{26C5}\u{26C8}\u{26CE}-\u{26CF}\u{26D1}\u{26D3}-\u{26D4}\u{26E9}-\u{26EA}\u{26F0}-\u{26F5}\u{26F7}-\u{26FA}\u{26FD}\u{2702}\u{2705}\u{2708}-\u{270D}\u{270F}\u{2712}\u{2714}\u{2716}\u{271D}\u{2721}\u{2728}\u{2733}-\u{2734}\u{2744}\u{2747}\u{274C}\u{274E}\u{2753}-\u{2755}\u{2757}\u{2763}-\u{2764}\u{2795}-\u{2797}\u{27A1}\u{27B0}\u{27BF}\u{2934}-\u{2935}\u{2B05}-\u{2B07}\u{2B1B}-\u{2B1C}\u{2B50}\u{2B55}\u{3030}\u{303D}\u{3297}\u{3299}]|☐|☰/gu;

// Pattern for redundant region attributes
// Matches role="region" aria-label="..." on elements that should use headings instead
const redundantRegionPattern = /(<(?:section|div|aside)[^>]*)\s+role="region"\s+aria-label="[^"]*"/gi;
const redundantRegionPattern2 = /(<(?:section|div|aside)[^>]*)\s+aria-label="[^"]*"\s+role="region"/gi;
// Also just role="region" with aria-labelledby where section element already provides semantics
const redundantRoleRegionOnSection = /(<section[^>]*)\s+role="region"/gi;

function processFile(filePath) {
    let content = fs.readFileSync(filePath, 'utf8');
    const originalContent = content;
    let changes = [];

    // Remove emojis
    const emojiMatches = content.match(emojiPattern);
    if (emojiMatches) {
        changes.push(`Removed ${emojiMatches.length} emoji(s)`);
        content = content.replace(emojiPattern, '');
        // Clean up double spaces and space before closing tags
        content = content.replace(/  +/g, ' ');
        content = content.replace(/ </g, '<');
        content = content.replace(/> /g, '>');
        // Fix heading patterns like <h2> Title</h2> -> <h2>Title</h2>
        content = content.replace(/<(h[1-6][^>]*)>\s+/g, '<$1>');
        content = content.replace(/\s+<\/(h[1-6])>/g, '</$1>');
    }

    // Remove redundant role="region" aria-label on divs (when there's a heading inside)
    // Keep role="region" on sections only if they don't already have semantic meaning
    const regionMatches1 = content.match(redundantRegionPattern);
    const regionMatches2 = content.match(redundantRegionPattern2);

    if (regionMatches1) {
        changes.push(`Removed ${regionMatches1.length} redundant role="region" aria-label pattern(s)`);
        content = content.replace(redundantRegionPattern, '$1');
    }
    if (regionMatches2) {
        changes.push(`Removed ${regionMatches2.length} redundant aria-label role="region" pattern(s)`);
        content = content.replace(redundantRegionPattern2, '$1');
    }

    // Remove role="region" from <section> elements (section already has implicit region role)
    const sectionMatches = content.match(redundantRoleRegionOnSection);
    if (sectionMatches) {
        changes.push(`Removed ${sectionMatches.length} redundant role="region" from section element(s)`);
        content = content.replace(redundantRoleRegionOnSection, '$1');
    }

    if (content !== originalContent) {
        fs.writeFileSync(filePath, content, 'utf8');
        console.log(`✓ ${path.basename(filePath)}: ${changes.join(', ')}`);
        return true;
    }
    return false;
}

function processDirectory(dirPath) {
    let totalFiles = 0;
    let modifiedFiles = 0;

    const files = fs.readdirSync(dirPath);
    for (const file of files) {
        const filePath = path.join(dirPath, file);
        const stat = fs.statSync(filePath);

        if (stat.isDirectory()) {
            const result = processDirectory(filePath);
            totalFiles += result.total;
            modifiedFiles += result.modified;
        } else if (file.endsWith('.html')) {
            totalFiles++;
            if (processFile(filePath)) {
                modifiedFiles++;
            }
        }
    }

    return { total: totalFiles, modified: modifiedFiles };
}

console.log('Removing emojis and redundant ARIA attributes from HTML files...\n');
const docsResult = processDirectory('./docs');
console.log(`\n✓ Done! Modified ${docsResult.modified} of ${docsResult.total} files in docs/`);

// Also process _includes and index.html
const includesDir = './_includes';
if (fs.existsSync(includesDir)) {
    const includesResult = processDirectory(includesDir);
    console.log(`✓ Modified ${includesResult.modified} of ${includesResult.total} files in _includes/`);
}

const indexPath = './index.html';
if (fs.existsSync(indexPath)) {
    if (processFile(indexPath)) {
        console.log('✓ Modified index.html');
    }
}
