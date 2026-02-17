---
title: UA Brand & Accessibility Guidance
summary: Using University of Arizona branding, color schemes, and templates accessibly across documents, media, and web content — with procurement guidance for vendor-provided UI.
owner: Arizona Digital Brand + Accessibility
last_reviewed: 2026-02-13
next_review: 2026-08-13
tags:
  - topic:branding
  - persona:content-creators
sources:
  - University of Arizona Brand — https://brand.arizona.edu/identity/color
  - Arizona Digital Quickstart — https://quickstart.arizona.edu
  - Quickstart accessibility — https://quickstart.arizona.edu/best-practices/accessibility-guidelines
  - Accessibility | Home — https://accessibility.arizona.edu
  - Bootstrap accessibility — https://getbootstrap.com/docs/5.3/getting-started/accessibility/
---

<!--
  Accessibility / branding notes:
  - Prefer Quickstart tokens & UA brand assets (keeps color/contrast consistent across campus sites).
  - Require vendors to deliver token mappings (CSS variables) for theme verification.
  - Always verify color contrast and focus indicators as part of procurement acceptance tests.
-->

## Brand palette & tokens (recommended)

Use Quickstart or UA brand tokens rather than hard-coded HEX values when building or accepting vendor UI. Below are canonical tokens used across UA sites and examples from this repository's CSS.

| Token / name     | Example CSS var                        | Typical use                  | WCAG guidance                                                       |
| ---------------- | -------------------------------------- | ---------------------------- | ------------------------------------------------------------------- |
| `Arizona Blue`   | `--ua-text` or `--color-arizona-blue`  | Primary headings, navigation | High contrast vs white (≥ 4.5:1 for body text)                      |
| `Arizona Red`    | `--ua-maroon` or `--color-arizona-red` | Buttons, CTAs, links         | Use white text on maroon for small buttons only if contrast ≥ 4.5:1 |
| `Oasis / Accent` | `--ua-oasis`                           | Highlight / success accents  | Test with foreground text; avoid small text on low-contrast accents |

Practical rule: prefer navy-on-white or white-on-navy for primary content. Use token names in procurement artifacts so vendors provide the same mappings.

---

## How procurement should evaluate vendor theming

- Ask vendors for a **theme token map** (CSS variables or design tokens) used by their product UI.
- Require a screenshot set showing core flows at typical and 200% zoom and a color token legend.
- Verify contrast ratios for interactive elements (buttons, links, form labels) using tokens.
- Ask vendors to provide a “high‑contrast / dark mode” demonstration if the product supports themes.

Sample RFP requirement (brand + accessibility):

> Vendor must provide color/design tokens (CSS variables or JSON tokens) and demonstrate that primary and secondary text colors meet WCAG 2.2 AA contrast ratios when used with vendor-supplied themes.

---

## Bootstrap, components & accessible patterns

- Many vendor UIs use Bootstrap or component libraries — verify component accessibility in context, not just upstream docs.
- Reference Bootstrap accessibility guidance for baseline behavior: [Bootstrap accessibility docs](https://getbootstrap.com/docs/5.3/getting-started/accessibility/)
- For custom components, confirm they follow WAI ARIA Authoring Practices (e.g., modal dialogs trap focus, accordions use `aria-expanded`).

Checklist for component acceptance:

- Semantic HTML (no ARIA to override native elements).
- Keyboard operability for all interactive widgets.
- Visible focus indicators (do not remove outlines without accessible replacement).
- Clear `aria-label` or visible label associations for complex controls.

---

## Color tools and testing

Use these during procurement reviews and vendor acceptance tests:

- Colour Contrast Analyser (Paciello Group) — desktop contrast checks
- axe DevTools / Accessibility Insights — automated checks + color contrast rules
- contrast-ratio.com or Tanaguru Contrast Finder — quick token checks
- Manual review at 200% zoom and in high‑contrast mode

Include screenshots and tool output in the procurement record.

---

## Examples & recommended pairings (use tokens)

- Body text: `#0C234B` on `#FFFFFF` (good)
- CTA button: white text on `--ua-maroon` (verify small text contrast)
- Accent backgrounds: place text on a white/solid card to preserve contrast

Avoid: low-contrast text over decorative gradients, small light text on pastel backgrounds, or relying on color alone to convey meaning.

---

## Focus, motion & accessible branding

- Never remove focus outlines — replace only with an accessible indicator (≥ 3px outline with adequate contrast).
- Respect `prefers-reduced-motion`: branded animations should be non-essential and disableable.
- Provide visible states for hover, focus, active, and disabled using tokens.

---

## Procurement-specific branding checklist (short)

- [ ] Vendor supplied token map (CSS vars / JSON)
- [ ] Screenshots & token legend for core flows (100% + 200% zoom)
- [ ] Contrast report for tokens (automated + manual checks)
- [ ] Focus indicator screenshots and keyboard walkthrough evidence
- [ ] Accessibility documentation (VPAT, remediation SLA, roadmap)
- [ ] Deliverable theme preview with token names/hex values and accessible states (hover/focus/disabled)

### Sample procurement token request (copy into RFP/RFI)

> Vendor must provide a theme token map (JSON or CSS variables) listing color tokens used for text, accents, backgrounds, and components. Include screenshots for each token used at normal size and at 200% zoom, plus a short contrast report showing ratios for each token pairing.

### Example focus CSS (recommended)

```css
:focus {
  outline: 3px solid var(--ua-maroon);
  outline-offset: 2px;
}
```

(replace `--ua-maroon` with the vendor token name in the submitted theme map)

---

## Resources (expanded)

- UA Brand & downloads — [https://brand.arizona.edu/resources/downloads](https://brand.arizona.edu/resources/downloads)
- Arizona Quickstart (tokens + component guidance) — [https://quickstart.arizona.edu](https://quickstart.arizona.edu)
- Quickstart accessibility best practices — [https://quickstart.arizona.edu/best-practices/accessibility-guidelines](https://quickstart.arizona.edu/best-practices/accessibility-guidelines)
- Bootstrap accessibility docs — [https://getbootstrap.com/docs/5.3/getting-started/accessibility/](https://getbootstrap.com/docs/5.3/getting-started/accessibility/)
- WAI ARIA Authoring Practices — [https://www.w3.org/WAI/ARIA/apg/](https://www.w3.org/WAI/ARIA/apg/)
- Colour Contrast Analyser — [https://developer.paciellogroup.com/resources/contrast-analyser/](https://developer.paciellogroup.com/resources/contrast-analyser/)
- axe / Accessibility Insights / Lighthouse — links for automated checks

---

## Notes for maintainers

<!--
  - Keep token examples synced with Quickstart tokens and the `styles.css` variables in this repo.
  - When vendors provide token maps, add vendor tokens to procurement attachments so acceptance is repeatable.
  - Recommend sampling real CMS pages and running axe + manual screen reader checks as part of acceptance.
-->

**Manual testing required:** color contrast verification, keyboard focus review, and at least one screen reader pass for branded interactive components.
