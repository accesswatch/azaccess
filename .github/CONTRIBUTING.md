# Contributing to Accessibility at Arizona

Thank you for contributing to the University of Arizona's Digital Accessibility site! This guide ensures all contributions maintain our accessibility standards.

## Before You Start

1. **Read the accessibility instructions**: Review [copilot-instructions.md](.github/copilot-instructions.md)
2. **Understand the audience**: Non-technical UA students, faculty, and staff
3. **Check the changelog**: See what's changed recently in [CHANGELOG.md](CHANGELOG.md)

## Accessibility Requirements (Non-Negotiable)

All pull requests must meet **WCAG 2.2 Level AA**. Specifically:

### HTML
- ✅ Semantic elements (`<button>`, `<nav>`, `<main>`, etc.)
- ✅ Proper heading hierarchy (no skipped levels)
- ✅ Alt text on all images
- ✅ Labels on all form inputs
- ✅ Skip link as first focusable element

### CSS
- ✅ 4.5:1 contrast for normal text
- ✅ 3:1 contrast for large text and UI components
- ✅ Visible focus indicators
- ✅ Supports `prefers-reduced-motion`
- ✅ Supports `prefers-color-scheme: dark`

### JavaScript
- ✅ Keyboard accessible (Tab, Enter, Escape, Arrows)
- ✅ Focus management for dynamic content
- ✅ ARIA attributes updated correctly
- ✅ No keyboard traps

## Pull Request Process

### 1. Create a Branch
```bash
git checkout -b feature/your-feature-name
```

### 2. Make Your Changes
- Follow the coding standards in `copilot-instructions.md`
- Update `CHANGELOG.md` with your changes
- Add yourself to contributors if this is your first PR

### 3. Test Accessibility
Before submitting, run these checks:

```bash
# Run axe-core tests (if available)
npm test

# Manual checks:
# - Navigate entire page with keyboard only
# - Test with screen reader (NVDA, VoiceOver, or Narrator)
# - Verify focus indicators are visible
# - Check color contrast with browser devtools
```

### 4. Submit PR
- Use the PR template
- Reference any related issues
- Include screenshots for visual changes
- Describe accessibility testing performed

### 5. Review Process
- Automated accessibility checks run on PR
- Maintainer reviews for WCAG compliance
- Changes may be requested for accessibility issues

## Commit Message Format

```
type(scope): description

[optional body]

[optional footer]
```

Types:
- `feat`: New feature
- `fix`: Bug fix
- `a11y`: Accessibility improvement
- `docs`: Documentation
- `style`: CSS/formatting (no logic changes)
- `refactor`: Code refactoring
- `test`: Adding tests

Example:
```
a11y(nav): add aria-label to hamburger menu button

- Added dynamic aria-label that changes on toggle
- Added aria-hidden to collapsed nav sections
- Included role-selector in focus trap

Fixes #123
```

## Code Style

### HTML
```html
<!-- Good: Semantic, accessible -->
<button type="button" aria-expanded="false" aria-controls="menu">
  <span class="visually-hidden">Open menu</span>
  <svg aria-hidden="true">...</svg>
</button>

<!-- Bad: Inaccessible div button -->
<div class="button" onclick="toggleMenu()">☰</div>
```

### CSS
```css
/* Good: Accessible focus indicator */
button:focus {
  outline: 3px solid var(--ua-maroon);
  outline-offset: 2px;
}

/* Bad: Removed focus with no replacement */
button:focus {
  outline: none;
}
```

### JavaScript
```javascript
// Good: Keyboard accessible
element.addEventListener('click', handler);
element.addEventListener('keydown', (e) => {
  if (e.key === 'Enter' || e.key === ' ') {
    handler(e);
  }
});

// Bad: Click only
element.addEventListener('click', handler);
```

## Getting Help

- **Questions**: Open a GitHub Discussion
- **Bugs**: Open an Issue with reproduction steps
- **Accessibility concerns**: Email accessibility@arizona.edu

## Resources

- [WCAG 2.2 Quick Reference](https://www.w3.org/WAI/WCAG22/quickref/)
- [MDN Accessibility Guide](https://developer.mozilla.org/en-US/docs/Web/Accessibility)
- [Accessibility Insights](https://accessibilityinsights.io/)
- [axe DevTools](https://www.deque.com/axe/devtools/)
- [University of Arizona Brand](https://brand.arizona.edu)
