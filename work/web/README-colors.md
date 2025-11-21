University of Arizona color palette — tokens used by this site

This file documents the canonical University of Arizona palette and the CSS variables used across the site (in `styles.css`).

Primary colors
- --ua-arizona-red: #AB0520  (Arizona Red)
- --ua-arizona-blue: #0C234B (Arizona Blue)

Site tokens (used in components)
- --ua-background: #f5f5f5
- --ua-text: #0C234B
- --ua-maroon: #AB0520
- --ua-maroon-hover: #870414
- --ua-border: #d5d5d5
- --ua-chip-bg: #e0e8f5
- --ua-muted-border: var(--ua-cool-gray) /* #E2E9EB */
- --ua-alert-bg: #ffe7d9
- --ua-alert-text: #61120b
- --ua-code-bg: #0c234b0d
- --ua-white: #FFFFFF

Complimentary / highlight colors
- --ua-midnight: #001C48
- --ua-azurite: #1E5288
- --ua-oasis: #378DBD
- --ua-bloom: #EF4056
- --ua-sky: #81D3EB
- --ua-leaf: #70B865
- --ua-river: #007D84
- --ua-mesa: #A95C42

How to use
- Prefer site tokens (e.g. `var(--ua-maroon)`) in component styles.
- Only use the primary colors for key branding elements (buttons, headers).
- Use the highlight and complimentary colors for accents, charts, and non-text backgrounds.

Accessibility checks
- I ran an automated contrast audit for key combinations. All checked pairs pass WCAG AA for normal text (4.5:1). Key results:
  - body text on background: 14.19 (PASS)
  - white on arizona blue (hero/header): 15.47 (PASS)
  - white on arizona red (buttons): 7.57 (PASS)
  - arizona blue on background (links): 14.19 (PASS)

Notes
- I replaced remaining hard-coded hex values in CSS files with the corresponding CSS variables. Markdown documentation that lists hex codes (e.g. color-contrast.md) was left untouched.
- If you want to use alternate accessible shades for specific components, change the variable in `work/web/styles.css` (single source of truth).

Next steps (suggested)
- Replace any inline style hex literals in HTML files with variables where appropriate.
- Commit and push the changes; I can prepare the commit if you want.

File: `work/web/styles.css` contains the variable definitions and is the single place to update brand colors.
