const fs = require('fs');
const path = require('path');

/**
 * Add AI Assistant link to all footers
 */

function processFile(filePath) {
    let content = fs.readFileSync(filePath, 'utf8');
    const originalContent = content;

    // Skip if already has AI Assistant link
    if (content.includes('ai-assistant.html')) {
        return { modified: false };
    }

    // Skip the ai-assistant.html file itself
    if (filePath.includes('ai-assistant.html')) {
        return { modified: false };
    }

    // Pattern 1: Footer with Questions line (no spaces)
    content = content.replace(
        /<p>Questions\?<a href="mailto:accessibility@arizona\.edu">accessibility@arizona\.edu<\/a>\|<a href="tel:\+15206213268">520-621-3268<\/a><\/p>/g,
        '<p>Questions? <a href="mailto:accessibility@arizona.edu">accessibility@arizona.edu</a> | <a href="tel:+15206213268">520-621-3268</a> | <a href="ai-assistant.html">🤖 AI Assistant</a></p>'
    );

    // Pattern 2: Footer with Questions line (with spaces)
    content = content.replace(
        /<p>Questions\? <a href="mailto:accessibility@arizona\.edu">accessibility@arizona\.edu<\/a> \| <a href="tel:\+15206213268">520-621-3268<\/a><\/p>/g,
        '<p>Questions? <a href="mailto:accessibility@arizona.edu">accessibility@arizona.edu</a> | <a href="tel:+15206213268">520-621-3268</a> | <a href="ai-assistant.html">🤖 AI Assistant</a></p>'
    );

    // Pattern 3: Simple one-line footer
    content = content.replace(
        /<footer><p>&copy; 2026 University of Arizona<\/p><\/footer>/g,
        '<footer>\n<p>&copy; 2026 University of Arizona</p>\n<p><a href="ai-assistant.html">🤖 AI Assistant</a> | <a href="mailto:accessibility@arizona.edu">accessibility@arizona.edu</a></p>\n</footer>'
    );

    // Pattern 4: Footer with Accessibility Statement (no spaces)
    content = content.replace(
        /<p><a href="accessibility-statement\.html">Accessibility Statement<\/a>\|<a href="glossary\.html">Glossary<\/a>\|<a href="faq\.html">FAQ<\/a><\/p>/g,
        '<p><a href="accessibility-statement.html">Accessibility Statement</a> | <a href="glossary.html">Glossary</a> | <a href="faq.html">FAQ</a> | <a href="ai-assistant.html">🤖 AI Assistant</a></p>'
    );

    // Pattern 5: Footer with only copyright - add AI Assistant link after
    // <footer>
    // <p>&copy; 2026 The Arizona Board of Regents on behalf of The University of Arizona.</p>
    // </footer>
    if (!content.includes('ai-assistant.html')) {
        content = content.replace(
            /<footer>\s*\n<p>&copy; 2026 The Arizona Board of Regents on behalf of The University of Arizona\.<\/p>\s*\n<\/footer>/g,
            '<footer>\n<p>&copy; 2026 The Arizona Board of Regents on behalf of The University of Arizona.</p>\n<p><a href="ai-assistant.html">🤖 AI Assistant</a> | <a href="mailto:accessibility@arizona.edu">accessibility@arizona.edu</a> | <a href="tel:+15206213268">520-621-3268</a></p>\n</footer>'
        );
    }

    // Pattern 6: Footer with copyright on same line (no newline)
    if (!content.includes('ai-assistant.html')) {
        content = content.replace(
            /<footer>\n<p>&copy; 2026 The Arizona Board of Regents on behalf of The University of Arizona\.<\/p>\n<\/footer>/g,
            '<footer>\n<p>&copy; 2026 The Arizona Board of Regents on behalf of The University of Arizona.</p>\n<p><a href="ai-assistant.html">🤖 AI Assistant</a> | <a href="mailto:accessibility@arizona.edu">accessibility@arizona.edu</a> | <a href="tel:+15206213268">520-621-3268</a></p>\n</footer>'
        );
    }

    if (content !== originalContent) {
        fs.writeFileSync(filePath, content, 'utf8');
        console.log(`✓ ${path.basename(filePath)}`);
        return { modified: true };
    }

    return { modified: false };
}

function processDirectory(dirPath) {
    let totalFiles = 0;
    let modifiedFiles = 0;

    const files = fs.readdirSync(dirPath);
    for (const file of files) {
        const filePath = path.join(dirPath, file);
        const stat = fs.statSync(filePath);

        if (stat.isFile() && file.endsWith('.html')) {
            totalFiles++;
            const result = processFile(filePath);
            if (result.modified) {
                modifiedFiles++;
            }
        }
    }

    return { total: totalFiles, modified: modifiedFiles };
}

console.log('Adding AI Assistant link to footers...\n');

const result = processDirectory('./docs');
console.log(`\n✓ Done! Modified ${result.modified} of ${result.total} files`);
