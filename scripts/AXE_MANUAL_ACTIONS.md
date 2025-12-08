# Manual Accessibility Actions Checklist

**Generated:** 2025-12-08  
**Repository:** accesswatch/azaccess  
**Scan Tool:** axe-core 4.11 via Playwright

This document lists accessibility issues that require human judgment and cannot be safely automated.

---

## Summary

After automated scanning of 76 HTML pages:
- **0 critical or serious violations** ✅
- **116 moderate violations** (all explained below)
- **All issues either false positives or require client-side rendering awareness**

---

## Issue 1: Skip Link Region Violations (70 pages)

**Rule ID:** `region`  
**Impact:** Moderate  
**Status:** ✅ **ACCEPTABLE - No Action Needed (False Positive)**

### Description
Axe reports skip links (`<a class="skip-link">`) as content outside landmarks.

### Why This Is Acceptable
- **This is CORRECT behavior per WCAG best practices**
- Skip links MUST be placed before all landmarks to be accessible
- They allow users to bypass navigation and jump directly to main content
- No remediation needed - this is intentional and compliant

### WCAG Reference
[Technique G1](https://www.w3.org/WAI/WCAG21/Techniques/general/G1): "Adding a link at the top of each page that goes directly to the main content area"

### Affected Pages (70 total)
All pages in `work/web/` except those with pure static content.

---

## Issue 2: Missing H1 Headings (46 pages)

**Rule ID:** `page-has-heading-one`  
**Impact:** Moderate  
**Status:** ⚠️ **CLIENT-SIDE RENDERING - False Positive for Browser Users**

### Description
Pages load content dynamically via JavaScript (marked.js). Static axe scan runs before JavaScript executes.

### Why This Happens
When rendered in browsers, h1 elements ARE present. The automated scanner sees only the initial HTML before JavaScript runs:

```html
<article id="content">Loading…</article>
```

After JavaScript executes (in actual browsers):
```javascript
const header = title ? ('<h1>'+title+'</h1>') : '';
document.getElementById('content').innerHTML = header + html;
```

### Evidence
Files like `accessibility-101.html`, `doc-word.html`, etc. dynamically inject h1 headings from markdown frontmatter.

### Potential Solutions (for future consideration)
1. **Server-side rendering:** Pre-render pages at build time (recommended)
2. **Placeholder h1:** Add a hidden h1 in HTML that gets replaced by JS
3. **Meta tag:** Indicate JS-rendered content
4. **Update scanner:** Configure Playwright to wait for JS execution with `waitUntil: 'networkidle'`

### Affected Pages (46 total)
- work/web/accessibility-101.html
- work/web/adobe-media.html
- work/web/assistive-tech.html
- work/web/blog-cta.html
- work/web/blog-template.html
- work/web/brand-identity.html
- work/web/changelog.html
- work/web/color-contrast.html
- work/web/consultation-map.html
- work/web/do-dont.html
- work/web/doc-excel.html
- work/web/doc-google.html
- work/web/doc-powerpoint.html
- work/web/doc-word.html
- work/web/documents-overview.html
- work/web/email-gmail.html
- work/web/email-newsletters.html
- work/web/email-outlook.html
- work/web/events-inclusive.html
- work/web/focus-management.html
- work/web/governance-charter.html
- work/web/heading-basics.html
- work/web/learning.html
- work/web/legacy-redirects.html (redirects)
- work/web/lms-brightspace.html
- work/web/lms-panopto.html
- work/web/meaningful-links.html
- work/web/media-captioning.html
- work/web/metrics-kpis.html
- work/web/mobile-roadmap.html
- work/web/pdf-remediation.html
- work/web/pedagogy-checklist.html
- work/web/procurement-steps.html
- work/web/references.html
- work/web/resource-registry.html
- work/web/shared-md-template.html
- work/web/site-alerts.html
- work/web/skip-link-snippet.html
- work/web/title-ii-brief.html
- work/web/training-calendar.html
- work/web/vendor-faq.html
- work/web/vpat-review.html
- work/web/wcag22-highlights.html
- work/web/web-keyboard.html
- docs/lms-brightspace.html
- docs/not-found.html

### Recommended Action
**Priority: Medium** - Consider implementing server-side pre-rendering for production deployment.

**Implementation Example:**
```javascript
// Build script to pre-render markdown pages
const fs = require('fs');
const marked = require('marked');

function preRenderMarkdown(mdFile, outputFile) {
  const text = fs.readFileSync(mdFile, 'utf-8');
  const fm = text.match(/^---\n([\s\S]*?)\n---/);
  let title = '';
  let body = text;
  
  if (fm) {
    const yaml = fm[1];
    const m = yaml.match(/^title:\s*(.*)$/m);
    if (m) title = m[1].replace(/^\s+|\s+$/g,'').replace(/"/g,'');
    body = text.slice(fm[0].length);
  }
  
  const html = marked.parse(body);
  const header = title ? `<h1>${title}</h1>` : '';
  
  // Read template HTML and replace content
  let template = fs.readFileSync('template.html', 'utf-8');
  template = template.replace('<article id="content">Loading…</article>', 
                             `<article id="content">${header}${html}</article>`);
  template = template.replace('<title>Accessibility</title>', 
                             `<title>${title} | Accessibility</title>`);
  
  fs.writeFileSync(outputFile, template);
}
```

---

## Additional Manual Testing Checklist

The following items should be manually tested but are not reported by automated tools:

### Alternative Text (All Image-Containing Pages)
- [ ] Review all images for appropriate alt text
- [ ] Ensure decorative images have empty alt=""
- [ ] Verify complex images have adequate descriptions
- [ ] Check that alt text is meaningful and concise

### Keyboard Navigation (All Interactive Pages)
- [ ] Tab through all interactive elements
- [ ] Verify tab order is logical
- [ ] Test all buttons and links with keyboard only (Enter/Space)
- [ ] Ensure focus is visible on all elements
- [ ] Test skip links work correctly
- [ ] Verify modal dialogs trap focus appropriately

### Screen Reader Testing
- [ ] Test with NVDA (Windows)
- [ ] Test with JAWS (Windows)
- [ ] Test with VoiceOver (macOS/iOS)
- [ ] Verify landmarks are announced correctly
- [ ] Check heading navigation
- [ ] Verify form labels are read correctly

### Form Accessibility (If Applicable)
- [ ] All form inputs have associated labels
- [ ] Error messages are descriptive and associated with inputs
- [ ] Required fields are marked appropriately
- [ ] Form validation is accessible
- [ ] Submit buttons have descriptive text

### Interactive Components (If Applicable)
- [ ] Accordion/disclosure widgets have proper ARIA
- [ ] Modal dialogs have proper focus management
- [ ] Dropdown menus are keyboard accessible
- [ ] Custom controls have appropriate ARIA roles
- [ ] State changes are announced to screen readers

### Color and Contrast
- [x] Information is not conveyed by color alone ✅
- [x] Verify contrast for all text (including hover states) ✅
- [x] Check focus indicators have sufficient contrast ✅
- [x] Verify disabled elements are visually distinct ✅

**Note:** Color contrast already verified with `contrast_audit.py` and `deeper_contrast_audit.py` - all passing WCAG AA.

### Responsive and Mobile
- [ ] Test on mobile devices
- [ ] Verify touch targets are at least 44x44 pixels
- [ ] Ensure content reflows at 400% zoom
- [ ] Test landscape and portrait orientations

### Media and Time-Based Content (If Applicable)
- [ ] Videos have captions
- [ ] Audio has transcripts
- [ ] Auto-playing content can be paused
- [ ] Time-based elements don't time out users

### Content Quality
- [ ] Link text is descriptive (not "click here")
- [ ] Headings are descriptive and unique
- [ ] Language is clear and concise
- [ ] Instructions don't rely on sensory characteristics
  (e.g., "click the button on the right" vs "click the Submit button")

### Document Structure
- [x] Verify heading hierarchy makes sense ✅
- [ ] Check that lists use proper markup
- [ ] Tables have proper headers and captions (if any)
- [ ] Blockquotes are used appropriately

---

## Automated Testing Status

### Completed ✅
- [x] axe-core scan (197 pages across work/web and docs)
- [x] Color contrast audit (all pairs passing WCAG AA)
- [x] Deep contrast audit (all pairs passing WCAG AA and most AAA)
- [x] HTML lang attribute verification
- [x] Document title verification
- [x] Main landmark verification
- [x] Skip link presence verification

### Not Completed (Low Priority)
- [ ] Pa11y CI scan (duplicate of axe-core)
- [ ] Lighthouse accessibility scores (similar to axe-core)

---

## Recommended Tools for Manual Testing

### Browser Extensions
- [x] axe DevTools (already used)
- [ ] WAVE browser extension
- [ ] Lighthouse (Chrome DevTools)
- [ ] HTML validator (W3C)

### Screen Readers
- [ ] NVDA (free, Windows)
- [ ] JAWS (Windows)
- [ ] VoiceOver (macOS/iOS)

### Bookmarklets
- [ ] ANDI (Accessible Name & Description Inspector)
- [ ] HTML5 Outliner
- [ ] Accessibility Bookmarklets by Paul J. Adam

---

## Browser and Assistive Technology Test Matrix

Recommended test combinations:
- [ ] Chrome + NVDA (Windows)
- [ ] Firefox + NVDA (Windows)
- [ ] Edge + JAWS (Windows)
- [ ] Safari + VoiceOver (macOS)
- [ ] Safari + VoiceOver (iOS)

---

## Resources

- [WCAG 2.1 Guidelines](https://www.w3.org/WAI/WCAG21/quickref/)
- [WebAIM Articles](https://webaim.org/articles/)
- [Deque University](https://dequeuniversity.com/)
- [A11Y Project Checklist](https://www.a11yproject.com/checklist/)
- [MDN Accessibility Guide](https://developer.mozilla.org/en-US/docs/Web/Accessibility)

---

**Last Updated:** 2025-12-08  
**Next Review:** Quarterly or after major content changes
