---
title: Meaningful Links & Announcements
summary: Guidance for descriptive link text, inline context, and new-window behavior.
owner: Accessibility Program Office
last_reviewed: 2025-11-20
next_review: 2026-02-20
tags:
  - topic:content
  - topic:links
sources:
  - WebAIM Link Text guidance — https://webaim.org/techniques/hypertext/
  - W3C WCAG 2.2 SC 2.4.4 & 2.4.9 — https://www.w3.org/TR/WCAG22/
---

## Principles
1. **Describe the outcome.** Link text must explain what happens when activated (e.g., “Download the procurement checklist (PDF)” instead of “click here”).
2. **Keep labels unique.** Avoid repeating “Learn more” or “Read more” without context; add clarifying text (“Learn more about captioning timelines”).
3. **Convey format + behavior.** Append short cues like “(PDF)” or “(opens in new window)” so screen readers announce them.
4. **Maintain focus order.** Links should follow the reading order; avoid inserting hidden or empty anchors.
5. **Respect user control.** Only open new windows when absolutely necessary (external systems, confirmation pages). Provide advance notice and consider offering the option to open in the same tab.

## Checklist
- [ ] Every link/button has visible text that is unique within its context.
- [ ] Reused CTAs include hidden or visible context via `aria-label` or visually hidden spans.
- [ ] Icons or background images used as links include an `aria-label` or visually hidden text.
- [ ] External links that open new tabs include inline indicators (text or icon with `aria-hidden="true"`).
- [ ] Email/phone links include purpose text (e.g., “Email the Accessibility Team”).

## Snippets
```html
<a href="/documents/procurement-checklist.pdf">Download the procurement checklist (accessible PDF)</a>
```

```html
<a href="https://vendor.example.com" target="_blank" rel="noopener" aria-label="Complete vendor intake form (opens in new window)">
  Complete vendor intake form <span aria-hidden="true">(opens in new window)</span>
</a>
```

Use this file in persona pages to remind writers, marketers, and staff how to keep link text meaningful while aligning with WebAIM guidance.
