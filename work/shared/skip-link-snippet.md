---
title: Skip Link Snippet
summary: Standard code pattern for "Skip to main content" links on UA sites.
owner: Arizona Digital Front-end Guild
last_reviewed: 2025-11-20
next_review: 2026-02-20
tags:
  - topic:code-pattern
sources:
  - Accessibility | Home — https://accessibility.arizona.edu
  - W3C WAI — https://www.w3.org/WAI/WCAG22/Techniques/general/G1
---

```html
<a class="skip-link" href="#maincontent">Skip to main content</a>
```

```css
.skip-link {
  position: absolute;
  top: 0;
  left: 0;
  background: #FFF;
  color: #0C234B;
  padding: 0.5rem 1rem;
  transform: translateY(-200%);
  transition: transform 0.2s ease;
  z-index: 1000;
}
.skip-link:focus {
  transform: translateY(0);
  outline: 3px solid #AB0520;
}
```

- Place the link as the first focusable element inside `<body>`.
- Target the `id` of your `<main>` element (e.g., `<main id="maincontent">`).
- Ensure the link is visible on focus and has sufficient color contrast.
```