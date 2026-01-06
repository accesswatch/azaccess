const fs = require('fs');
const path = require('path');

/**
 * Add AI Assistant link to ALL remaining footers
 * Uses a more aggressive approach - finds </footer> and adds link before it
 */

function processFile(filePath) {
    let content = fs.readFileSync(filePath, 'utf8');
    const originalContent = content;

    // Skip if already has AI Assistant link
    if (content.includes('ai-assistant.html')) {
        return { modified: false, reason: 'already has link' };
    }

    // Skip the ai-assistant.html file itself
    if (filePath.includes('ai-assistant.html')) {
        return { modified: false, reason: 'is ai-assistant.html' };
    }

    // Skip files without a footer
    if (!content.includes('</footer>')) {
        return { modified: false, reason: 'no footer' };
    }

    // Add AI Assistant link before </footer>
    // This handles all cases by inserting a new paragraph
    const aiAssistantLink = '<p><a href="ai-assistant.html">🤖 AI Assistant</a> | <a href="mailto:accessibility@arizona.edu">accessibility@arizona.edu</a></p>\n';

    // Try to add after the last </p> before </footer>
    content = content.replace(
        /(<\/p>\s*\n)(\s*<\/footer>)/g,
        (match, p1, p2) => {
            // Check if we already added it
            if (match.includes('ai-assistant.html')) return match;
            return p1 + aiAssistantLink + p2;
        }
    );

    if (content !== originalContent) {
        fs.writeFileSync(filePath, content, 'utf8');
        console.log(`✓ ${path.basename(filePath)}`);
        return { modified: true };
    }

    return { modified: false, reason: 'pattern not matched' };
}

function processDirectory(dirPath) {
    let totalFiles = 0;
    let modifiedFiles = 0;
    let skipped = [];

    const files = fs.readdirSync(dirPath);
    for (const file of files) {
        const filePath = path.join(dirPath, file);
        const stat = fs.statSync(filePath);

        if (stat.isFile() && file.endsWith('.html')) {
            totalFiles++;
            const result = processFile(filePath);
            if (result.modified) {
                modifiedFiles++;
            } else if (result.reason && result.reason !== 'already has link') {
                skipped.push(`${file}: ${result.reason}`);
            }
        }
    }

    return { total: totalFiles, modified: modifiedFiles, skipped };
}

console.log('Adding AI Assistant link to remaining footers...\n');

const result = processDirectory('./docs');
console.log(`\n✓ Done! Modified ${result.modified} of ${result.total} files`);

if (result.skipped.length > 0) {
    console.log('\nSkipped files:');
    result.skipped.forEach(s => console.log(`  - ${s}`));
}
