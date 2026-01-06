# University of Arizona Accessibility Site - Comprehensive Improvement Plan

**Date:** January 5, 2026  
**Status:** Ready for Implementation  
**Purpose:** Fix identified issues and improve the role-based accessibility resource site

---

## Executive Summary

This document outlines issues found during a comprehensive review of the UA Digital Accessibility site and provides strategic recommendations to improve the role-based architecture while ensuring equal and equitable access to information.

### Key Achievements Already Made
✅ **100% critical/serious accessibility violations resolved** (per previous remediation)  
✅ **Skip-link bug fixed** across all 68+ HTML files  
✅ **Strong role-based foundation** with 9 distinct role guides  
✅ **WCAG 2.2 AA compliant design** with proper contrast and focus indicators  

---

## Part 1: Critical Issues Fixed

### 1.1 Skip Link Bug (FIXED ✅)
**Issue:** All pages had duplicate `href` attributes on skip links:
```html
<!-- Before (broken) -->
<a class="skip-link" href="maincontent" href="#maincontent">Skip to main content</a>

<!-- After (fixed) -->
<a class="skip-link" href="#maincontent">Skip to main content</a>
```
**Impact:** The first `href` (without `#`) was used by browsers, causing skip links to fail for keyboard users.  
**Resolution:** Fixed across all HTML files in `work/web/` and `docs/` directories.

---

## Part 2: Structural Issues to Address

### 2.1 Inconsistent Page Headers
**Issue:** Two header patterns exist, causing navigation inconsistency:

| Pattern          | Used By                                                    | Navigation                     |
| ---------------- | ---------------------------------------------------------- | ------------------------------ |
| Full site-header | Hub pages (home, documents-media, web-app, support)        | Complete primary + utility nav |
| Breadcrumb-only  | Role guide pages (persona-students, persona-faculty, etc.) | Only breadcrumb link           |

**Impact:** Users on role guide pages cannot access other sections without going back to home.

**Recommendation:** Standardize all pages to include the full site-header navigation. Add the complete header markup to role guide pages.

**Files to update:**
- `persona-students.html`
- `persona-faculty.html`
- `persona-staff.html`
- `persona-developers.html`
- `persona-mobile.html`
- `persona-content.html`
- `persona-comms.html`
- `persona-leadership.html`
- `persona-public.html`

### 2.2 Nav-toggle Button Positioning
**Issue:** The mobile menu toggle button is placed inconsistently:
- Some pages: Inside `site-header-brand` div (incorrect)
- Other pages: After `site-header-brand` div (correct)

**Example of incorrect markup:**
```html
<div class="site-header-brand">
  <button type="button" class="nav-toggle">☰ Menu</button>
  University of Arizona · Digital Accessibility
</div>
```

**Recommendation:** Standardize button placement after the brand div.

### 2.3 Accessibility-101.html JavaScript Dependency
**Issue:** The `accessibility-101.html` page loads content via JavaScript fetch, displaying "Loading…" initially.

**Problems:**
1. Content invisible to search engines
2. "Loading…" screen announced to screen readers
3. Fails if JavaScript is blocked/delayed
4. The script tries to fetch itself (`accessibility-101.html`) creating an infinite loop

**Recommendation:** Convert to static HTML or implement proper progressive enhancement with pre-rendered fallback content.

### 2.4 Placeholder Links
**Issue:** Multiple pages contain `href="#"` placeholder links:

| File        | Line          | Context                     |
| ----------- | ------------- | --------------------------- |
| `home.html` | 184, 189, 194 | Blog post "Read post" links |
| `blog.html` | 60, 71, 82    | Blog post "Read post" links |

**Recommendation:** Either create actual blog post pages or use `href="blog.html"` to link to the blog index until individual posts are ready.

---

## Part 3: Information Architecture Recommendations

### 3.1 Current Structure Analysis

```
┌─────────────────────────────────────────────────────────────┐
│                        HOME                                  │
├─────────────────────────────────────────────────────────────┤
│  ┌─────────────┐  ┌─────────────┐  ┌─────────────────────┐ │
│  │    ROLES    │  │    HUBS     │  │   QUICK ACCESS      │ │
│  │  (By Role)  │  │  (By Area)  │  │                     │ │
│  ├─────────────┤  ├─────────────┤  ├─────────────────────┤ │
│  │ Students    │  │ Documents   │  │ Accessibility 101   │ │
│  │ Faculty     │  │ Web & Apps  │  │ Wizard              │ │
│  │ Staff       │  │ Teaching    │  │ Support             │ │
│  │ Developers  │  │ Procurement │  │ Blog                │ │
│  │ Mobile      │  │ Governance  │  │                     │ │
│  │ Content     │  │ Tools       │  │                     │ │
│  │ Comms       │  │             │  │                     │ │
│  │ Leadership  │  │             │  │                     │ │
│  │ Public      │  │             │  │                     │ │
│  └─────────────┘  └─────────────┘  └─────────────────────┘ │
└─────────────────────────────────────────────────────────────┘
```

**Strengths:**
- Clear dual-path entry (by role vs. by area)
- Comprehensive role coverage
- Well-organized hub structure
- Wizard for decision support

**Weaknesses:**
- Role guides are siloed without cross-linking
- No clear "learning paths" connecting content
- Drill-down options stop at role guide level
- Missing universal tasks accessible from all roles

### 3.2 Recommended Enhanced Structure

#### A. Add Cross-Role Navigation
Add a "Related roles" or "You might also need" section at the bottom of each role guide page:

```html
<section aria-labelledby="related-roles">
  <h2 id="related-roles">Related guides</h2>
  <p>Your work may overlap with these roles:</p>
  <ul>
    <li><a href="persona-content.html">Content Creators</a> – for document and media guidance</li>
    <li><a href="persona-comms.html">Communications</a> – for campaigns and announcements</li>
  </ul>
</section>
```

**Suggested relationships:**

| Role       | Related Roles                               |
| ---------- | ------------------------------------------- |
| Students   | Public (families), Faculty (accommodations) |
| Faculty    | Content, Staff (procurement)                |
| Staff      | Content, Leadership, Faculty                |
| Developers | Mobile, Content                             |
| Mobile     | Developers                                  |
| Content    | Faculty, Comms, Staff                       |
| Comms      | Content, Leadership                         |
| Leadership | Staff, Faculty, Developers                  |
| Public     | Students                                    |

#### B. Create Universal "Quick Tasks" Component
Add a consistent "Universal tasks" section that appears on every role guide page:

```html
<aside aria-labelledby="universal-tasks">
  <h2 id="universal-tasks">Tasks for everyone</h2>
  <ul>
    <li><a href="support.html">Report a barrier</a></li>
    <li><a href="https://forms.office.com/...">Request consultation</a></li>
    <li><a href="assistive-tech.html">Assistive tech guide</a></li>
    <li><a href="training-calendar.html">Training calendar</a></li>
  </ul>
</aside>
```

#### C. Implement Topic-Based Drill-Down
For users who want to go deep on specific topics regardless of role, add a "Deep Dives" section to the homepage:

```html
<section id="deep-dives" aria-labelledby="deep-dives-title">
  <h2 id="deep-dives-title">Deep dives by topic</h2>
  <div class="grid grid-3">
    <article class="card">
      <h3>Keyboard Navigation</h3>
      <p>Focus management, skip links, roving tabindex.</p>
      <a class="cta" href="web-keyboard.html">Explore keyboard topics</a>
    </article>
    <article class="card">
      <h3>Color & Contrast</h3>
      <p>WCAG ratios, brand colors, testing tools.</p>
      <a class="cta" href="color-contrast.html">Explore color topics</a>
    </article>
    <article class="card">
      <h3>Captioning & Audio</h3>
      <p>Accuracy targets, workflows, vendors.</p>
      <a class="cta" href="media-captioning.html">Explore captioning</a>
    </article>
  </div>
</section>
```

#### D. Add Breadcrumb Navigation Consistency
Implement consistent breadcrumb trails that show context:

```html
<nav aria-label="Breadcrumb">
  <ol class="breadcrumb">
    <li><a href="home.html">Home</a></li>
    <li><a href="roles.html">I Am A...</a></li>
    <li aria-current="page">Students</li>
  </ol>
</nav>
```

### 3.3 Content Hierarchy Improvements

#### Current Issue: Flat Information Structure
Many pages dump all information at the same level. Users can't distinguish between:
- Must-know essential information
- Good-to-know supporting details
- Reference material for later

#### Recommendation: Three-Tier Content Pattern

**Tier 1: Immediate Action** (visible by default)
- What this page helps you do
- Top 3 tasks with direct links

**Tier 2: Detailed Guidance** (expandable accordions)
- Step-by-step workflows
- Do/Don't examples
- Tool comparisons

**Tier 3: Reference Material** (linked pages)
- Full checklists
- External resources
- Technical specifications

---

## Part 4: Content Gap Analysis

### 4.1 Missing or Incomplete Pages

| Page                      | Status                            | Priority |
| ------------------------- | --------------------------------- | -------- |
| Blog posts                | Placeholder `#` links             | High     |
| `learning.html`           | Listed in nav but content unknown | Medium   |
| Individual training pages | Referenced but not found          | Medium   |

### 4.2 Content Enhancements Needed

#### A. Add "Time to Complete" Indicators
Help users plan their time:
```html
<p class="time-estimate">⏱️ Reading time: 5 min | Tasks: 15–30 min</p>
```

#### B. Add Last Updated Dates Consistently
Some pages have `metric-chip` with dates, others don't. Standardize.

#### C. Add Difficulty/Experience Level Indicators
```html
<p class="difficulty-level">
  <span class="badge badge-beginner">Beginner friendly</span>
</p>
```

### 4.3 Missing Cross-References

The following connections should be added:

| From Page               | Add Link To            | Context                   |
| ----------------------- | ---------------------- | ------------------------- |
| `persona-students.html` | `wizard.html`          | "Not sure what you need?" |
| `persona-faculty.html`  | `persona-content.html` | "Creating documents?"     |
| `documents-media.html`  | `brand-identity.html`  | Brand compliance          |
| `web-app.html`          | `mobile-roadmap.html`  | Mobile context            |

---

## Part 5: Accessibility Enhancements

### 5.1 ARIA Improvements
- Add `aria-current="page"` to breadcrumb current items
- Ensure all accordions have unique `id` attributes
- Add `aria-describedby` for complex form fields in wizard

### 5.2 Focus Management
- Ensure wizard form shows results without losing focus
- Add focus trap to mobile menu when open
- Return focus to trigger after closing accordions

### 5.3 Progressive Enhancement
- Convert JavaScript-dependent pages to static HTML with JS enhancement
- Ensure wizard works without JavaScript (server-side fallback or static recommendations)
- Add `<noscript>` alternatives for all dynamic content

---

## Part 6: Implementation Priorities

### Phase 1: Critical Fixes (Week 1)
1. ✅ Fix skip-link bug (DONE)
2. Add full site navigation to all role guide pages
3. Fix placeholder blog links
4. Fix accessibility-101.html JavaScript issue

### Phase 2: Structure Improvements (Weeks 2-3)
1. Standardize header markup across all pages
2. Add cross-role navigation sections
3. Implement universal tasks component
4. Add consistent breadcrumbs

### Phase 3: Content Enhancements (Weeks 4-6)
1. Create actual blog posts or blog index improvements
2. Add time estimates and difficulty indicators
3. Enhance cross-references
4. Add deep-dive topic pages

### Phase 4: Polish (Ongoing)
1. User testing with different roles
2. Accessibility audit with real AT users
3. Analytics to track user flows
4. Iterative content improvements

---

## Part 7: Sample Code Templates

### 7.1 Standard Page Header Template
```html
<header>
  <div class="site-header">
    <div class="site-header-brand">University of Arizona · Digital Accessibility</div>
    <button type="button" class="nav-toggle" aria-expanded="false" aria-controls="primary-nav">☰ Menu</button>
    <nav id="primary-nav" class="site-header-nav" aria-label="Primary">
      <a href="home.html">Home</a>
      <a href="roles.html">I Am A...</a>
      <a href="documents-media.html">Documents &amp; Media</a>
      <a href="web-app.html">Web &amp; Apps</a>
      <a href="teaching-learning.html">Teaching &amp; Learning</a>
      <a href="procurement.html">Procurement</a>
      <a href="tools-checklists.html">Tools &amp; Checklists</a>
      <a href="policies-governance.html">Policies &amp; Governance</a>
      <a href="support.html">Support</a>
    </nav>
    <nav class="site-header-utilities" aria-label="Quick links">
      <a href="accessibility-101.html">Accessibility 101</a>
      <a href="blog.html">Blog</a>
      <a href="support.html">Get help</a>
    </nav>
  </div>
  <nav aria-label="Breadcrumb">
    <ol class="breadcrumb">
      <li><a href="home.html">Home</a></li>
      <li><a href="roles.html">I Am A...</a></li>
      <li aria-current="page">Students</li>
    </ol>
  </nav>
  <h1>Students</h1>
  <p class="lead">Students expect frictionless accommodations, accessible course media, and transparent support pathways.</p>
</header>
```

### 7.2 Cross-Role Navigation Template
```html
<section aria-labelledby="related-guides">
  <h2 id="related-guides">Related guides you may need</h2>
  <div class="grid grid-3">
    <article class="card card-compact">
      <h3>Creating Content?</h3>
      <p>If you're making documents, slides, or media, see the content creator guide.</p>
      <a class="cta" href="persona-content.html">Content creators</a>
    </article>
    <article class="card card-compact">
      <h3>Buying Software?</h3>
      <p>For procurement guidance when selecting tools.</p>
      <a class="cta" href="persona-staff.html">Staff &amp; procurement</a>
    </article>
  </div>
</section>
```

---

## Appendix: File Inventory

### Pages with Full Navigation (Good)
- `home.html`
- `roles.html`
- `documents-media.html`
- `web-app.html`
- `teaching-learning.html`
- `procurement.html`
- `tools-checklists.html`
- `policies-governance.html`
- `support.html`
- `blog.html`

### Pages Needing Navigation Added
- `persona-students.html`
- `persona-faculty.html`
- `persona-staff.html`
- `persona-developers.html`
- `persona-mobile.html`
- `persona-content.html`
- `persona-comms.html`
- `persona-leadership.html`
- `persona-public.html`
- `accessibility-101.html` (also needs JS fix)
- Plus ~40 additional content pages

---

## Contact

For questions about this improvement plan:
- Email: accessibility@arizona.edu
- Phone: 520-621-3268

---

*Document generated: January 5, 2026*
