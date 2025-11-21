---
title: Color & Contrast Guidance
summary: Ensuring readable text, distinguishable controls, and compliant state indicators.
owner: Arizona Digital Brand + Accessibility
last_reviewed: 2025-11-20
next_review: 2026-02-20
tags:
  - topic:color
sources:
  - Accessibility | Home — https://accessibility.arizona.edu
  - W3C Web Accessibility Initiative — https://www.w3.org/WAI/WCAG22/quickref/#contrast-minimum
  - University of Arizona Brand — https://brand.arizona.edu/identity/color
---

## Minimum ratios
- Body text under 18.5 pt (or 24 px) must meet **4.5:1** contrast.
- Large text (≥ 18.5 pt bold or 24 pt regular) must meet **3:1**.
- Non-text UI components (buttons, icons, focus outlines) also require **3:1** against adjacent colors.

## Best practices
1. Use UA brand palette tokens that already meet contrast; avoid manually mixing without testing.
2. Provide at least two cues (color + underline, icon, text) when indicating state or conveying meaning.
3. Ensure focus indicators have a 3:1 contrast with both adjacent colors and are at least 2 px thick.
4. For images, do not overlay text on busy backgrounds unless you add a solid or translucent scrim with sufficient opacity.
5. Test in light and dark modes; some OS-level settings invert colors.

## UA brand pairings
| Foreground               | Background               | Ratio | Usage                                              |
| ------------------------ | ------------------------ | ----- | -------------------------------------------------- |
| Arizona Blue (`#0C234B`) | White (`#FFFFFF`)        | 9.2:1 | Default body text/link color on light backgrounds. |
| White (`#FFFFFF`)        | Arizona Blue (`#0C234B`) | 9.2:1 | Buttons, hero text (≥ 16 px).                      |
| Arizona Red (`#AB0520`)  | White (`#FFFFFF`)        | 4.6:1 | Buttons, emphasis text (≥ 16 px regular).          |
| Arizona Blue (`#0C234B`) | Desert Sky (`#81D3EB`)   | 5.0:1 | Charts, info cards.                                |
| Cool Gray (`#5E6A71`)    | White (`#FFFFFF`)        | 4.2:1 | Secondary text ≥ 16 px regular.                    |

When using Quickstart or brand templates, stick to the provided token classes (e.g., `btn--primary`, `bg--arizona-blue`) to inherit accessible color pairings.

## Tools
- Colour Contrast Analyser (TPGi) for manual sampling.
- Accessibility Insights or axe DevTools for automated detection.
- Quickstart’s color tokens (link to design system) for consistent application.
