# GitHub Copilot Instructions for Accessibility at Arizona

This project is the University of Arizona's Digital Accessibility website. All code contributions must prioritize accessibility.

## Project Overview

- **Purpose**: Provide accessibility guidance for UA students, faculty, and staff
- **Standards**: WCAG 2.2 Level AA compliance required
- **Framework**: Static HTML/CSS/JS site with accessibility-first design
- **Audience**: Non-technical users who need practical accessibility help

## Code Generation Rules

### HTML Requirements

1. **Semantic HTML First**
   - Use native HTML elements over ARIA when possible
   - Every page needs: `<header>`, `<nav>`, `<main>`, `<footer>`
   - Use heading hierarchy (`h1` → `h2` → `h3`) without skipping levels
   - One `<h1>` per page describing the page topic

2. **Interactive Elements**
   - Use `<button>` for actions, `<a>` for navigation
   - All form inputs need associated `<label>` elements
   - Group related form fields with `<fieldset>` and `<legend>`

3. **Required Attributes**
   - All `<img>` must have `alt` (empty `alt=""` for decorative images)
   - All `<a>` must have meaningful link text (no "click here")
   - Language: `<html lang="en">`
   - Viewport: `<meta name="viewport" content="width=device-width, initial-scale=1">`

### CSS Requirements

1. **Color Contrast**
   - Text: minimum 4.5:1 ratio (3:1 for large text ≥18.5px bold or ≥24px)
   - UI components: minimum 3:1 ratio
   - Use CSS variables from `styles.css`: `--ua-text`, `--ua-muted-text`

2. **Focus Indicators**
   - Never use `outline: none` without replacement
   - Focus must be visible: `outline: 3px solid var(--ua-maroon)`
   - Focus indicators need 3:1 contrast

3. **Responsive & Adaptive**
   - Support `prefers-reduced-motion: reduce`
   - Support `prefers-color-scheme: dark`
   - Support `prefers-contrast: more`
   - Content must reflow at 320px width

### JavaScript Requirements

1. **Keyboard Navigation**
   - All interactive elements must be keyboard accessible
   - Tab order follows visual/reading order
   - Escape closes modals/menus
   - Focus management for dynamic content

2. **ARIA Usage**
   - Update `aria-expanded` on toggles
   - Use `aria-live` for dynamic announcements
   - `aria-hidden="true"` for decorative/hidden content
   - Never use ARIA to override native semantics

3. **Focus Management**
   - Move focus into opened modals
   - Return focus when closing modals
   - Trap focus within modal dialogs

## File Patterns

| File Type | Key Accessibility Checks |
|-----------|-------------------------|
| `*.html` | Landmarks, headings, alt text, form labels, link text |
| `*.css` | Color contrast, focus styles, motion preferences |
| `*.js` | Keyboard handlers, ARIA updates, focus management |

## Testing Checklist

Before committing, verify:

- [ ] Keyboard-only navigation works
- [ ] Screen reader announces content correctly
- [ ] Color contrast meets minimums
- [ ] Focus indicators are visible
- [ ] No motion without `prefers-reduced-motion` check
- [ ] Zoom to 200% doesn't break layout

## Do NOT

- Use `tabindex` values greater than 0
- Remove focus outlines without replacement
- Use color alone to convey information
- Create keyboard traps
- Use placeholder as label replacement
- Auto-play media without controls
- Use CAPTCHA without accessible alternative

## Response Format

When generating code:
1. Include accessibility features by default
2. Add comments explaining accessibility decisions
3. Note any manual testing needed
4. Suggest axe-core or Accessibility Insights for validation

---

*This project follows the [University of Arizona Brand Guidelines](https://brand.arizona.edu) and [WCAG 2.2 AA](https://www.w3.org/TR/WCAG22/).*
