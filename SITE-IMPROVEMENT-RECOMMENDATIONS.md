# University of Arizona Accessibility Site - Comprehensive Review & Recommendations

**Review Date:** January 5, 2026  
**Status:** Ready for Implementation  
**Reviewer:** GitHub Copilot Analysis

---

## Executive Summary

The UA Accessibility site is a solid foundation with excellent role-based content. However, several structural improvements would significantly enhance usability, discoverability, and the ability for users in any role to drill down into detailed guidance while maintaining a high-level overview.

### Key Strengths
- ✅ Strong role-based content architecture
- ✅ Comprehensive accessibility remediation already performed (47% violation reduction)
- ✅ Clear "What this page helps you do" pattern
- ✅ Good use of WCAG 2.2 references and practical guidance
- ✅ SLA documentation and service catalogs
- ✅ Wizard for personalized recommendations

### Critical Issues Fixed
- ✅ **Skip-link bug fixed** - All 68+ pages had broken skip links (`href="maincontent"` without `#`)

### Priority Issues to Address
1. **Navigation Inconsistency** - Role guide pages lack full site navigation
2. **JavaScript Dependency** - accessibility-101.html uses client-side rendering
3. **Placeholder Links** - 6 blog post links point to `#`
4. **Header Structure Inconsistency** - Two different header patterns create confusion

---

## 🏗️ Structural Issues & Fixes

### Issue 1: Inconsistent Navigation Headers

**Problem:** Two different header patterns exist:
- **Hub pages** (home, documents-media, support, etc.) have full site navigation
- **Role guide pages** (persona-students, persona-faculty, persona-developers, etc.) have breadcrumb-only headers without main navigation

**Impact:** Users navigating to role guide pages lose the ability to quickly access other areas of the site.

**Recommendation:** Standardize ALL pages to use the full site-header pattern:

```html
<header>
  <div class="site-header">
    <div class="site-header-brand">University of Arizona · Digital Accessibility</div>
    <button type="button" class="nav-toggle" aria-expanded="false" aria-controls="primary-nav">☰ Menu</button>
    <nav class="site-header-nav" aria-label="Primary" role="navigation">
      <a href="home.html">Home</a>
      <a href="roles.html">I Am A...</a>
      <!-- ... full navigation ... -->
    </nav>
  </div>
  <!-- breadcrumb and h1 follow -->
</header>
```

**Pages requiring header updates:**
- persona-students.html
- persona-faculty.html
- persona-staff.html
- persona-developers.html
- persona-mobile.html
- persona-content.html
- persona-comms.html
- persona-leadership.html
- persona-public.html
- accessibility-101.html
- wizard.html
- And approximately 20 other pages

### Issue 2: Client-Side Rendered Content

**Problem:** accessibility-101.html uses JavaScript to fetch and render content, which:
- May fail if JS is disabled
- Shows "Loading..." until complete
- Creates accessibility issues for screen readers
- Blocks content indexing

**Recommendation:** Convert to static HTML with proper content rendered server-side.

### Issue 3: Placeholder Blog Links

**Problem:** Home page and blog.html contain 6 links pointing to `#`:
- "Read post" for Brightspace Next article
- "Read post" for Mobile Roadmap article
- "Read post" for Captioning Playbook article

**Recommendation:** Either:
1. Create actual blog post pages
2. Link to external sources
3. Remove or hide these teasers until content exists

---

## 📊 Information Architecture Recommendations

### Current Structure (Good Foundation)

```
Home
├── By Role (I Am A...)
│   ├── Students & Families
│   ├── Faculty & Instructors
│   ├── Staff & Administrative Units
│   ├── Web Developers
│   ├── Mobile App Teams
│   ├── Content Creators
│   ├── Communications & Marketing
│   ├── Leadership & Executives
│   └── Visitors & Public
├── By Area (Hubs)
│   ├── Documents & Media
│   ├── Web & Apps
│   ├── Teaching & Learning
│   ├── Procurement
│   ├── Tools & Checklists
│   └── Policies & Governance
└── Support
```

### Recommended Enhancements

#### 1. Add "Quick Start" Entry Points

Add a new section for absolute beginners:
- **"I have 5 minutes"** - Three highest-impact actions
- **"I have 30 minutes"** - Essential training module
- **"I need a specific fix"** - Decision tree to exact guidance

#### 2. Implement Cross-Role Drill-Down Paths

Create explicit pathways that allow any role to access detailed content:

| Entry Point               | Drill-Down Path                                                           |
| ------------------------- | ------------------------------------------------------------------------- |
| Student needs captioning  | Student Guide → Media Captioning → Panopto Workflow → Request Form        |
| Faculty reviewing VPAT    | Faculty Guide → Procurement Hub → VPAT Review → Vendor FAQ                |
| Developer testing         | Developer Guide → Testing Tools → CI Integration → Manual Testing Scripts |
| Leader reviewing progress | Leadership Guide → Metrics & KPIs → Title II Brief → Governance Charter   |

#### 3. Add a "Learning Paths" Navigation Category

Current learning content is scattered. Consolidate into a dedicated learning section:
- Accessibility 101 (foundational)
- Document Accessibility Certificate Path
- Web Developer Certification Path
- Leadership Briefing Series
- Role-Based Quick Courses

#### 4. Create a "Common Tasks" Cross-Reference

Add a task-based navigation that shows the same task from different role perspectives:

**Example: "Request Captioning"**
- As a Student → DRC form
- As Faculty → Panopto workflow + UCATT request
- As Staff → Event planning checklist + CART request
- As a Leader → SLA expectations + budget allocation

---

## 🎯 Role-Based Content Recommendations

### Student Role Guide - Enhancements Needed

**Current Strengths:**
- Clear DRC workflow
- AT resources from DRC site
- Task tables

**Additions Recommended:**
1. Video tutorials for accommodation request process
2. "What to do when..." scenarios (exam week, professor unresponsive, etc.)
3. Mobile-first quick actions (most students access via phone)
4. Integration with university student portal/app

### Faculty Role Guide - Enhancements Needed

**Current Strengths:**
- Brightspace focus
- Accommodation letter workflow
- WCAG 2.2 references

**Additions Recommended:**
1. Course templates downloadable from this site
2. "Accessibility audit your own course" self-service tool
3. TA/Graduate instructor sub-guidance
4. Remediation priority matrix for existing courses

### Developer Role Guide - Enhancements Needed

**Current Strengths:**
- CI integration guidance
- Testing tools references
- ARIA patterns links

**Additions Recommended:**
1. Code snippets library (accessible components)
2. Quickstart pattern reference directly embedded
3. Common framework-specific guides (React, Angular, Vue patterns)
4. API accessibility documentation template

### Leadership Role Guide - Enhancements Needed

**Current Strengths:**
- Title II brief
- Governance model
- KPI mentions

**Additions Recommended:**
1. ROI calculator for accessibility investment
2. Budget planning templates
3. Reporting dashboard mockup/guidance
4. Board presentation template
5. Risk assessment framework

---

## 📋 Content Gaps to Fill

### High Priority (Pre-Launch)

| Page                   | Status                 | Action Needed                           |
| ---------------------- | ---------------------- | --------------------------------------- |
| Blog posts             | Placeholder            | Create 3 actual posts or remove teasers |
| accessibility-101.html | JS-dependent           | Convert to static HTML                  |
| learning.html          | Referenced but unclear | Verify content completeness             |
| training-calendar.html | Calendar               | Verify real dates/links                 |

### Medium Priority (Post-Launch)

| Gap                  | Recommendation                       |
| -------------------- | ------------------------------------ |
| Search functionality | Add site search (lunr.js or similar) |
| Print styles         | Optimize for print/PDF export        |
| Version history      | Add page-level changelog             |
| Feedback mechanism   | Add per-page feedback form           |

### Low Priority (Future Enhancement)

- Multi-language support (Spanish priority for Arizona)
- LMS integration (embed in Brightspace)
- Notification system for policy updates
- User preference persistence (remember role choice)

---

## 🔧 Technical Recommendations

### 1. Create a Shared Header Component

Instead of duplicating header HTML in every file, create:
- `shared/header.html` - Full site header template
- `scripts/header.js` - Already exists, ensure it works

Update pages to use consistent includes/JavaScript injection.

### 2. Implement Build Process

Consider a simple static site generator:
- **Eleventy (11ty)** - Excellent for accessibility sites
- **Hugo** - Fast, simple
- Benefits: Templating, includes, markdown support, build-time validation

### 3. Add Automated Testing

```bash
# Recommended CI pipeline additions
npm run build
npm run lint:html      # HTML validation
npm run lint:a11y      # axe-core automated tests
npm run lint:links     # Check for broken links
```

### 4. Improve Metadata

Each page should have:
```html
<meta name="description" content="Specific page description">
<meta name="keywords" content="accessibility, WCAG, [role-specific terms]">
<meta property="og:title" content="Page Title | Accessibility at Arizona">
<meta property="og:description" content="Page summary">
```

---

## 📈 Success Metrics to Track

### User-Centered Metrics
- Time to find role-specific guidance
- Task completion rate (wizard → action)
- Return visitor rate
- Pages per session (drill-down engagement)

### Accessibility Metrics
- WCAG conformance level maintenance
- Screen reader usability score
- Mobile accessibility score
- Keyboard-only task completion

### Content Metrics
- Page freshness (last updated dates)
- Broken link count (zero target)
- Placeholder content count (zero target)

---

## 🚀 Implementation Roadmap

### Phase 1: Critical Fixes (This Week)
- [x] Fix skip-link bug ✅ COMPLETED
- [ ] Add full navigation to role guide pages
- [ ] Convert accessibility-101.html to static
- [ ] Fix/remove placeholder blog links

### Phase 2: Consistency (Next 2 Weeks)
- [ ] Standardize all page headers
- [ ] Ensure all pages have proper titles/meta
- [ ] Add missing "Next Steps" sections
- [ ] Review and update all dates/deadlines

### Phase 3: Enhancement (Next Month)
- [ ] Implement site search
- [ ] Add "Common Tasks" cross-reference
- [ ] Create Learning Paths section
- [ ] Build feedback mechanism

### Phase 4: Advanced (Next Quarter)
- [ ] Consider static site generator migration
- [ ] Implement automated testing pipeline
- [ ] Add multi-language support
- [ ] Build LMS integration

---

## Summary

This site has an excellent foundation with thoughtful role-based architecture. The primary improvements needed are:

1. **Structural consistency** - Ensure all pages share the full navigation
2. **Remove dependencies** - Eliminate JavaScript-required content rendering
3. **Fill content gaps** - Complete placeholder content or remove teasers
4. **Enhance drill-down paths** - Make it easier for any role to access any detail

The goal of "heavily based on role but allowing anyone to drill down into any area" is well-designed but needs execution refinements to fully deliver on that promise.

---

*This document was generated as part of a comprehensive site review. For questions, contact the Accessibility Program Office.*
