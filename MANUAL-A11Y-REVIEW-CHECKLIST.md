# Manual Accessibility Review Checklist

This document outlines items that require human review and cannot be automated.

## 1. Skip Link Region Violations (115 pages)

**Status:** ✅ No Action Required  
**Reason:** This is a false positive. Skip links SHOULD be outside landmarks per WCAG.

**Explanation:**
The axe scan reports skip links as "content outside landmarks," but this is actually the correct implementation. Skip links must appear before all other content (including landmarks) to allow users to bypass repetitive navigation.

**WCAG Technique:** G1 - Adding a link at the top of each page that goes directly to the main content area

## 2. Dynamic H1 Headings (46 pages)

**Status:** ⚠️ Consider Pre-rendering  
**Reason:** Client-side JavaScript rendering causes false positives in static scans

**Affected Pages:**
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
- work/web/example-newsletter.html
- work/web/example-syllabus.html
- work/web/focus-management.html
- work/web/governance-charter.html
- work/web/heading-basics.html
- work/web/legacy-redirects.html
- work/web/lms-brightspace.html
- work/web/lms-panopto.html
- work/web/meaningful-links.html
- work/web/media-captioning.html
- work/web/mobile-roadmap.html
- work/web/not-found.html
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
- work/web/wizard.html (fixed separately for contrast)

**Current Implementation:**
These pages use JavaScript to dynamically load markdown content and insert h1 headings:

```javascript
const header = title ? ('<h1>'+title+'</h1>') : '';
document.getElementById('content').innerHTML = header + html;
```

**Recommendation:**
1. **Server-side rendering:** Pre-render markdown to HTML at build time
2. **Placeholder h1:** Add a hidden h1 in the static HTML that gets replaced
3. **Update scanner:** Configure Playwright to wait for JS execution before scanning

**Example Fix (Option 2):**
```html
<article id="content">
  <h1 class="loading-placeholder" style="opacity:0;">Loading…</h1>
</article>
```

## 3. Manual Testing Checklist

The following items should be manually tested but are not reported by automated tools:

### 3.1 Alternative Text
- [ ] Review all images for appropriate alt text
- [ ] Ensure decorative images have empty alt=""
- [ ] Verify complex images have adequate descriptions
- [ ] Check that alt text is meaningful and concise

### 3.2 Keyboard Navigation
- [ ] Tab through all interactive elements
- [ ] Verify tab order is logical
- [ ] Test all buttons and links with keyboard only (Enter/Space)
- [ ] Ensure focus is visible on all elements
- [ ] Test skip links work correctly
- [ ] Verify modal dialogs trap focus appropriately

### 3.3 Screen Reader Testing
- [ ] Test with NVDA (Windows)
- [ ] Test with JAWS (Windows)
- [ ] Test with VoiceOver (macOS/iOS)
- [ ] Verify landmarks are announced correctly
- [ ] Check heading navigation
- [ ] Verify form labels are read correctly

### 3.4 Form Accessibility (if applicable)
- [ ] All form inputs have associated labels
- [ ] Error messages are descriptive and associated with inputs
- [ ] Required fields are marked appropriately
- [ ] Form validation is accessible
- [ ] Submit buttons have descriptive text

### 3.5 Interactive Components
- [ ] Accordion/disclosure widgets have proper ARIA
- [ ] Modal dialogs have proper focus management
- [ ] Dropdown menus are keyboard accessible
- [ ] Custom controls have appropriate ARIA roles
- [ ] State changes are announced to screen readers

### 3.6 Color and Contrast
- [ ] Information is not conveyed by color alone
- [ ] Verify contrast for all text (including hover states)
- [ ] Check focus indicators have sufficient contrast
- [ ] Verify disabled elements are visually distinct

### 3.7 Responsive and Mobile
- [ ] Test on mobile devices
- [ ] Verify touch targets are at least 44x44 pixels
- [ ] Ensure content reflows at 400% zoom
- [ ] Test landscape and portrait orientations

### 3.8 Media and Time-Based Content
- [ ] Videos have captions
- [ ] Audio has transcripts
- [ ] Auto-playing content can be paused
- [ ] Time-based elements don't time out users

### 3.9 Content Quality
- [ ] Link text is descriptive (not "click here")
- [ ] Headings are descriptive and unique
- [ ] Language is clear and concise
- [ ] Instructions don't rely on sensory characteristics
  (e.g., "click the button on the right" vs "click the Submit button")

### 3.10 Document Structure
- [ ] Verify heading hierarchy makes sense
- [ ] Check that lists use proper markup
- [ ] Tables have proper headers and captions
- [ ] Blockquotes are used appropriately

## 4. Recommended Testing Tools

### Automated Tools
- [x] axe DevTools browser extension
- [ ] WAVE browser extension
- [ ] Lighthouse (Chrome DevTools)
- [ ] HTML validator (W3C)

### Manual Testing Tools
- [ ] NVDA screen reader (free, Windows)
- [ ] JAWS screen reader (Windows)
- [ ] VoiceOver (macOS/iOS)
- [ ] Keyboard navigation (no mouse)

### Bookmarklets
- [ ] ANDI (Accessible Name & Description Inspector)
- [ ] HTML5 Outliner
- [ ] Accessibility Bookmarklets by Paul J. Adam

## 5. Browser and AT Combinations

Test with at least these combinations:
- [ ] Chrome + NVDA (Windows)
- [ ] Firefox + NVDA (Windows)
- [ ] Edge + JAWS (Windows)
- [ ] Safari + VoiceOver (macOS)
- [ ] Safari + VoiceOver (iOS)

## 6. Documentation Review

- [ ] Update accessibility statement (if exists)
- [ ] Document known issues
- [ ] Provide contact for accessibility concerns
- [ ] Document keyboard shortcuts (if any)

## 7. Ongoing Maintenance

- [ ] Add accessibility testing to CI/CD pipeline
- [ ] Train content creators on accessibility
- [ ] Conduct regular audits (quarterly recommended)
- [ ] Monitor and respond to user feedback
- [ ] Keep up with WCAG updates

---

## Resources

- [WCAG 2.1 Guidelines](https://www.w3.org/WAI/WCAG21/quickref/)
- [WebAIM Articles](https://webaim.org/articles/)
- [Deque University](https://dequeuniversity.com/)
- [A11Y Project Checklist](https://www.a11yproject.com/checklist/)
- [MDN Accessibility Guide](https://developer.mozilla.org/en-US/docs/Web/Accessibility)

---

**Last Updated:** 2025-12-08  
**Automated Testing Completed:** Yes  
**Manual Testing Required:** Yes (see checklist above)
