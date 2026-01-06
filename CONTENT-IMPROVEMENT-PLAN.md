# Site Content Improvement Plan

## Executive Summary

A comprehensive audit of the Arizona Digital Accessibility site has revealed that **43 pages (approximately 50% of the site)** are empty shell pages displaying only "Loading..." text. These pages have a broken JavaScript pattern that attempts to fetch themselves rather than actual content files.

**Impact:** Visitors clicking on these topics see no meaningful information, damaging the site's credibility and failing to deliver on its educational mission.

---

## Critical Technical Issue

### The Problem
Shell pages contain this broken code pattern:
```javascript
const mdFile = 'color-contrast.html';  // ❌ Fetches itself (HTML, not Markdown)
```

When the page tries to parse itself as Markdown, the content fails to render properly, leaving users with just "Loading..." or garbled output.

### The Solution
Two options:
1. **Replace shell pages with full HTML content** (recommended for consistency)
2. **Create corresponding .md files** and fix the fetch path (e.g., `color-contrast.md`)

---

## 43 Empty Shell Pages Requiring Content

### Priority 1: High-Traffic / Frequently Linked (Fix First)

| Page                    | Topic                         | Estimated Content Needed               |
| ----------------------- | ----------------------------- | -------------------------------------- |
| `color-contrast.html`   | Color and contrast guidelines | WCAG requirements, tools, examples     |
| `focus-management.html` | Focus patterns for developers | Code examples, ARIA patterns           |
| `web-keyboard.html`     | Keyboard accessibility        | Tab order, focus indicators, shortcuts |
| `pdf-remediation.html`  | Making PDFs accessible        | Step-by-step Adobe/Word workflow       |
| `testing-tools.html`    | Accessibility testing tools   | Tool comparison, when to use each      |
| `lms-brightspace.html`  | Brightspace accessibility     | LMS-specific checklist                 |
| `media-captioning.html` | Video captions                | How to add captions, tools, standards  |
| `heading-basics.html`   | Heading structure             | Hierarchy rules, examples              |
| `meaningful-links.html` | Link text best practices      | Good/bad examples                      |
| `do-dont.html`          | Quick reference card          | Visual do/don't examples               |

### Priority 2: Document & Office Suite Guides

| Page                      | Topic                        | Estimated Content Needed       |
| ------------------------- | ---------------------------- | ------------------------------ |
| `doc-word.html`           | Microsoft Word accessibility | Complete Word checklist        |
| `doc-powerpoint.html`     | PowerPoint accessibility     | Slide accessibility guide      |
| `doc-excel.html`          | Excel accessibility          | Table headers, data validation |
| `doc-google.html`         | Google Docs/Slides/Sheets    | Google Workspace guide         |
| `documents-overview.html` | Document accessibility intro | Overview hub page              |
| `adobe-media.html`        | Adobe Creative Suite         | InDesign, Photoshop, etc.      |

### Priority 3: Email & Communications

| Page                     | Topic                    | Estimated Content Needed  |
| ------------------------ | ------------------------ | ------------------------- |
| `email-outlook.html`     | Outlook accessibility    | Email composition guide   |
| `email-gmail.html`       | Gmail accessibility      | Gmail-specific tips       |
| `email-newsletters.html` | Newsletter accessibility | Email marketing standards |
| `brand-identity.html`    | Accessible branding      | Colors, fonts, logos      |

### Priority 4: LMS & Teaching Tools

| Page                      | Topic                    | Estimated Content Needed       |
| ------------------------- | ------------------------ | ------------------------------ |
| `lms-panopto.html`        | Panopto video platform   | Video accessibility in Panopto |
| `pedagogy-checklist.html` | Accessible course design | Instructor checklist           |
| `events-inclusive.html`   | Inclusive events         | Virtual/in-person event guide  |

### Priority 5: Governance & Policy

| Page                      | Topic                      | Estimated Content Needed        |
| ------------------------- | -------------------------- | ------------------------------- |
| `title-ii-brief.html`     | ADA Title II summary       | Legal requirements overview     |
| `governance-charter.html` | Accessibility governance   | Organizational structure        |
| `metrics-kpis.html`       | Measuring accessibility    | KPIs and metrics framework      |
| `service-levels.html`     | Service level expectations | Response times, support tiers   |
| `procurement-steps.html`  | Procurement process        | Vendor evaluation steps         |
| `vpat-review.html`        | How to read VPATs          | VPAT evaluation guide           |
| `vendor-faq.html`         | Vendor questions           | Common vendor accessibility Q&A |

### Priority 6: Developer Resources

| Page                     | Topic                         | Estimated Content Needed       |
| ------------------------ | ----------------------------- | ------------------------------ |
| `skip-link-snippet.html` | Skip link code                | Copy-paste code snippet        |
| `wcag22-highlights.html` | WCAG 2.2 new criteria         | What's new in WCAG 2.2         |
| `assistive-tech.html`    | Assistive technology overview | Screen readers, switches, etc. |

### Priority 7: Site Operations (Lower Priority)

| Page                     | Topic                 | Notes               |
| ------------------------ | --------------------- | ------------------- |
| `blog-cta.html`          | Blog call-to-action   | Template/component  |
| `blog-template.html`     | Blog post template    | Internal template   |
| `changelog.html`         | Site changelog        | Update log          |
| `consultation-map.html`  | Consultation services | Service directory   |
| `legacy-redirects.html`  | Redirect mapping      | Technical reference |
| `mobile-roadmap.html`    | Mobile roadmap        | Planning document   |
| `references.html`        | Reference links       | External resources  |
| `resource-registry.html` | Resource database     | Asset registry      |
| `site-alerts.html`       | Site notifications    | Alert system        |
| `role-template.html`     | Role page template    | Internal template   |

---

## Content Requirements Per Page

### Example: `color-contrast.html` (Priority 1)

**Required sections:**
1. **Why contrast matters** - Impact on users with low vision
2. **WCAG requirements** - 4.5:1 for text, 3:1 for large text, 3:1 for UI components
3. **Tools to check contrast** - WebAIM checker, browser extensions, Figma plugins
4. **Fixing common issues** - Gray text on white, colored text on colored backgrounds
5. **Code examples** - CSS custom properties for accessible color systems
6. **Quick reference table** - Min ratios for different contexts
7. **Related resources** - Links to brand colors, design system

**Estimated length:** 800-1200 words

---

### Example: `pdf-remediation.html` (Priority 1)

**Required sections:**
1. **When to remediate vs recreate** - Decision framework
2. **Adobe Acrobat Pro workflow** - Step-by-step with screenshots
3. **Creating accessible PDFs from Word** - Export settings
4. **Common issues and fixes** - Reading order, tags, alt text
5. **Automated checking** - PAC 2024, Acrobat checker
6. **When to outsource** - Vendor options for large projects
7. **Checklist** - Final verification steps

**Estimated length:** 1500-2000 words

---

## Recommended Implementation Approach

### Phase 1: Quick Wins (Week 1-2)
Fix the 10 Priority 1 pages that are most frequently linked. These have the highest impact on user experience.

**Estimated effort:** 20-30 hours of content writing

### Phase 2: Document Guides (Week 3-4)
Complete all office suite and document pages. These are commonly needed by faculty and staff.

**Estimated effort:** 15-20 hours

### Phase 3: Policy & Governance (Week 5-6)
Complete governance, legal, and procurement content. Important for leadership and compliance.

**Estimated effort:** 15-20 hours

### Phase 4: Specialized Content (Week 7-8)
Complete developer resources, LMS guides, and remaining pages.

**Estimated effort:** 20-25 hours

### Phase 5: Cleanup (Week 9)
- Remove or redirect truly unnecessary pages (templates, internal tools)
- Final review and cross-linking

---

## Content Template for New Pages

Each page should follow this structure:

```html
<header>
  <h1>Page Title</h1>
  <p class="page-intro">One-sentence description of what this page covers.</p>
  <p class="metric-chip">⏱️ Reading time: X minutes</p>
</header>

<section aria-labelledby="quick-start">
  <h2 id="quick-start">⚡ Quick Start</h2>
  <!-- 3 immediate actions users can take -->
</section>

<section aria-labelledby="main-content">
  <h2 id="main-content">Topic Deep Dive</h2>
  <!-- Main educational content -->
</section>

<section aria-labelledby="examples">
  <h2 id="examples">Examples</h2>
  <!-- Before/after, do/don't examples -->
</section>

<section aria-labelledby="tools">
  <h2 id="tools">Tools & Resources</h2>
  <!-- Relevant tools and external links -->
</section>

<section aria-labelledby="checklist">
  <h2 id="checklist">✅ Checklist</h2>
  <!-- Actionable checklist -->
</section>

<section aria-labelledby="related">
  <h2 id="related">Related Topics</h2>
  <!-- Links to related pages on the site -->
</section>
```

---

## Pages With Good Content (No Changes Needed)

These pages already have substantial, meaningful content:

- ✅ `accessibility-101.html` - Excellent foundational guide
- ✅ `home.html` - Good landing page
- ✅ `roles.html` - Role selector hub
- ✅ `persona-*.html` - All 9 persona pages have content
- ✅ `documents-media.html` - Hub page
- ✅ `web-app.html` - Hub page  
- ✅ `teaching-learning.html` - Hub page
- ✅ `procurement.html` - Hub page
- ✅ `tools-checklists.html` - Tool directory
- ✅ `policies-governance.html` - Policy hub
- ✅ `support.html` - Help resources
- ✅ `faq.html` - Comprehensive FAQ
- ✅ `glossary.html` - Terminology
- ✅ `example-*.html` - Sample documents
- ✅ `before-after-examples.html` - Visual examples

---

## Success Metrics

After implementing this plan:

1. **0 shell pages** - All pages render meaningful content
2. **Average content per page** - Minimum 500 words of educational content
3. **User task completion** - Users can find actionable guidance on any topic
4. **Cross-linking** - Each page links to 3-5 related pages
5. **Accessibility compliance** - All new content passes WCAG 2.2 AA

---

## Next Steps

1. ✅ **Audit complete** - This document
2. ⏳ **Approve plan** - Review with stakeholders
3. ⏳ **Assign content owners** - Who writes what
4. ⏳ **Create content calendar** - Timeline for each phase
5. ⏳ **Begin Phase 1** - Priority 1 pages first

---

*Generated: January 5, 2026*
*Total pages needing content: 43*
*Estimated total effort: 70-95 hours of content development*
