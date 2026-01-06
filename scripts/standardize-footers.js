const fs = require('fs');
const path = require('path');

/**
 * Standardize all footers across the site
 * 
 * Standard footer format:
 * <footer>
 * <p>&copy; 2026 The Arizona Board of Regents on behalf of The University of Arizona.</p>
 * <p>Questions? <a href="mailto:accessibility@arizona.edu">accessibility@arizona.edu</a> | <a href="tel:+15206213268">520-621-3268</a> | <a href="ai-assistant.html">🤖 AI Assistant</a></p>
 * <p><a href="accessibility-statement.html">Accessibility Statement</a> | <a href="glossary.html">Glossary</a> | <a href="faq.html">FAQ</a></p>
 * </footer>
 */

const STANDARD_FOOTER = `<footer>
<p>&copy; 2026 The Arizona Board of Regents on behalf of The University of Arizona.</p>
<p>Questions? <a href="mailto:accessibility@arizona.edu">accessibility@arizona.edu</a> | <a href="tel:+15206213268">520-621-3268</a> | <a href="ai-assistant.html">🤖 AI Assistant</a></p>
<p><a href="accessibility-statement.html">Accessibility Statement</a> | <a href="glossary.html">Glossary</a> | <a href="faq.html">FAQ</a></p>
</footer>`;

// Special pages that should keep their custom footers or have no footer
const SKIP_FILES = [
    'ai-assistant.html',           // Has its own custom content
    'example-newsletter.html',     // Newsletter example with inner footer
    'example-slides.html',         // Example content
    'example-syllabus.html',       // Example content
    'index.html',                  // Redirect page
    'Digital_Accessibility_Framework_Course_Mapping.html', // No footer
    'course_integration_plan.html', // No footer
    'ua-accessibility-framework-accordion-full.html', // No footer
    'ua-accessibility-framework-full.html', // No footer
    'skip-link-snippet.html',      // Code snippet demo
];

function processFile(filePath) {
    const fileName = path.basename(filePath);

    // Skip special files
    if (SKIP_FILES.includes(fileName)) {
        return { modified: false, reason: 'skip list' };
    }

    let content = fs.readFileSync(filePath, 'utf8');
    const originalContent = content;

    // Find and replace the entire footer section
    // Match from <footer> to </footer>
    const footerRegex = /<footer>[\s\S]*?<\/footer>/g;

    if (!footerRegex.test(content)) {
        return { modified: false, reason: 'no footer found' };
    }

    // Reset regex
    content = content.replace(/<footer>[\s\S]*?<\/footer>/g, STANDARD_FOOTER);

    if (content !== originalContent) {
        fs.writeFileSync(filePath, content, 'utf8');
        console.log(`✓ ${fileName}`);
        return { modified: true };
    }

    return { modified: false, reason: 'already standard' };
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
            } else if (result.reason && result.reason !== 'already standard') {
                skipped.push(`${file}: ${result.reason}`);
            }
        }
    }

    return { total: totalFiles, modified: modifiedFiles, skipped };
}

console.log('Standardizing footers across all pages...\n');
console.log('Standard footer format:');
console.log('─'.repeat(60));
console.log(STANDARD_FOOTER);
console.log('─'.repeat(60));
console.log('');

const result = processDirectory('./docs');
console.log(`\n✓ Done! Standardized ${result.modified} of ${result.total} files`);

if (result.skipped.length > 0) {
    console.log('\nSkipped (special pages):');
    result.skipped.forEach(s => console.log(`  - ${s}`));
}
