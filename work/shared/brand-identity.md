---
title: UA Brand & Accessibility Guidance
summary: Using University of Arizona branding, color schemes, and templates accessibly across documents, media, and web content.
owner: Arizona Digital Brand + Accessibility
last_reviewed: 2025-11-20
next_review: 2026-02-20
tags:
  - topic:branding
  - persona:content-creators
sources:
  - University of Arizona Brand — https://brand.arizona.edu/identity/color
  - Arizona Digital Quickstart — https://quickstart.arizona.edu
  - Accessibility | Home — https://accessibility.arizona.edu
---

## Brand palette
| Color token  | Hex       | Usage                           | Contrast guidance                                                                |
| ------------ | --------- | ------------------------------- | -------------------------------------------------------------------------------- |
| Arizona Blue | `#0C234B` | Primary headings, large accents | Meets 7.9:1 against white; pair with light text only if ≥ 24 px bold.            |
| Arizona Red  | `#AB0520` | Buttons, links, callouts        | Use white text ≥ 18.5 pt bold (ratio 4.6:1) or navy text for smaller fonts.      |
| Desert Sky   | `#81D3EB` | Background accents              | Do not place regular text directly on this color; overlay white cards for 4.5:1. |
| Cool Gray    | `#5E6A71` | Secondary text                  | Requires white text ≥ 3:1; prefer navy background for small text.                |
| Copper       | `#C87900` | Highlights                      | Pair with Arizona Blue or white; test contrast before use.                       |

Always pull colors from Quickstart design tokens (`var(--color-arizona-blue)` etc.) or official Word/PowerPoint templates to ensure consistent values.

## Quickstart guidance for content creators
1. **Use official templates:** Download Word, PowerPoint, Google Slides, and Adobe templates from the brand site or Quickstart share to maintain typography, logos, and color tokens.
2. **Lock logo usage:** Keep the block A logo in provided placements; maintain required clear space and provide alt text (e.g., “University of Arizona block A logo”).
3. **Text styles:** Stick to the built-in heading styles in the templates so screen readers announce levels correctly.
4. **Accessible color pairing:** When in doubt, use navy text on white backgrounds or white text on navy buttons; test other combinations with the Colour Contrast Analyser.
5. **Dark mode variants:** Provide enough contrast for inverted themes by avoiding low-contrast gradients or translucency without solid backing.

## Checklist for branded materials
- [ ] Start from UA-branded template (Word, PowerPoint, Google Slides, social graphics).
- [ ] Verify color choices meet the ratios above.
- [ ] Ensure text remains legible after printing in grayscale or when high-contrast mode is enabled.
- [ ] Provide alternative text for logos and marks unless purely decorative.
- [ ] Keep Quickstart navigation order and button styles unchanged to maintain consistency for assistive technologies.

## Resources
- Templates & brand assets: https://brand.arizona.edu/resources/downloads
- Quickstart accessibility: https://quickstart.arizona.edu/best-practices/accessibility-guidelines
- Questions: accessibility@arizona.edu or brand@arizona.edu
