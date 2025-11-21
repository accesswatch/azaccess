---
title: WCAG 2.2 AA Highlights
summary: Most impactful success criteria to emphasize across UA personas.
owner: Accessibility Program Office
last_reviewed: 2025-11-20
next_review: 2026-02-20
tags:
  - topic:wcag
sources:
  - W3C WAI WCAG 2.2 — https://www.w3.org/TR/WCAG22/
  - WebAIM — https://webaim.org/standards/wcag/checklist
  - Deque University — https://dequeuniversity.com
---

## High-impact success criteria
1. **1.3.1 Info and Relationships** — Use semantic headings, lists, tables, and ARIA roles so structure is conveyed programmatically.
2. **1.4.3 Contrast (Minimum)** & **1.4.11 Non-text Contrast** — Maintain ≥ 4.5:1 for text and 3:1 for essential UI parts; rely on UA color tokens.
3. **1.4.5 Images of Text** — Avoid baked-in text; use real text or provide accessible alternatives.
4. **1.4.13 Content on Hover or Focus** — Tooltips and menus must be dismissible, hover-stable, and keyboard accessible.
5. **2.1.1 Keyboard** & **2.1.2 No Keyboard Trap** — Every interactive element must be operable with keyboards and provide escape paths.
6. **2.1.4 Character Key Shortcuts** — Offer alternate mechanisms when single-key shortcuts exist.
7. **2.4.3 Focus Order** & **2.4.7 Focus Visible** — Keep focus logical and visually obvious (≥ 3:1 outline contrast).
8. **2.4.11 Focus Appearance** (new) — For custom focus styles ensure 2px thickness or 4 CSS pixels, high-contrast outlines.
9. **2.4.13 Focus Not Obscured (Minimum)** — Prevent sticky headers/dialogs from hiding focus indicators.
10. **2.5.1 Pointer Gestures** & **2.5.7 Dragging Movements** — Provide single-pointer alternatives to drag/drop.
11. **2.5.8 Target Size (Minimum)** — Critical controls should be at least 24x24px or have spacing that meets requirements.
12. **3.2.6 Consistent Help** — Provide predictable help/contact methods across pages.
13. **3.3.1 Error Identification & 3.3.3 Error Suggestion** — Surface inline errors with text + programmatic associations.
14. **3.3.8 Accessible Authentication (No Exception)** — Allow copy/paste, password managers, and avoid cognitive tests unless alternative provided.
15. **4.1.2 Name, Role, Value** & **4.1.3 Status Messages** — Expose accessible names and announce dynamic updates.

## How to apply
- Reference this file from each persona’s principles section.
- Tie criteria to UA components, Microsoft Accessibility Checker results, DubBot/WAVE findings, and Adobe remediation steps.
