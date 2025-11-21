---
title: Heading Structure Fundamentals
summary: How to organize content with semantic headings for accessibility and SEO.
owner: Digital Accessibility Team
last_reviewed: 2025-11-20
next_review: 2026-02-20
tags:
  - topic:content-structure
  - persona:content-creators
sources:
  - Accessibility | Home — https://accessibility.arizona.edu
  - W3C Web Accessibility Initiative — https://www.w3.org/WAI/tutorials/page-structure/overview/
---

1. Use exactly one `<h1>` per page to describe the overall topic (often the page title).
2. Nest subsections sequentially (H2 → H3 → H4) without skipping levels; treat headings like an outline.
3. Keep headings concise, descriptive, and unique so screen-reader users can skim quickly.
4. Do not choose heading levels based on visual size; adjust appearance via CSS.
5. Avoid all-caps paragraphs disguised as headings; use semantic tags plus classes for style.
6. For collapsible sections (accordions), ensure the heading is programmatically associated with the region via `aria-controls`/`aria-expanded` when needed.
7. Test by navigating with the headings list (e.g., NVDA `Insert+F7`, VoiceOver Rotor) to confirm logical order.
