---
name: Pull Request
about: Submit changes for review
title: ''
labels: ''
assignees: ''
---

## Description
<!-- Briefly describe what this PR does -->

## Type of Change
- [ ] Bug fix (non-breaking change that fixes an issue)
- [ ] New feature (non-breaking change that adds functionality)
- [ ] Accessibility improvement
- [ ] Documentation update
- [ ] Refactoring (no functional changes)
- [ ] Breaking change (fix or feature that would cause existing functionality to change)

## Related Issues
<!-- Link to any related issues: Fixes #123 -->

## Accessibility Checklist

### Required (all must be checked)
- [ ] **Keyboard navigation**: All interactive elements are keyboard accessible
- [ ] **Focus indicators**: Focus is visible on all interactive elements
- [ ] **Color contrast**: Text meets 4.5:1, large text meets 3:1, UI components meet 3:1
- [ ] **Semantic HTML**: Using correct elements (`<button>`, `<a>`, landmarks, headings)
- [ ] **Alt text**: All images have appropriate alt text
- [ ] **Form labels**: All form inputs have associated labels
- [ ] **ARIA**: ARIA attributes are correctly implemented (if used)

### Testing Performed
- [ ] Tested with keyboard only (Tab, Enter, Escape, Arrows)
- [ ] Tested with screen reader (which one: ___________)
- [ ] Verified focus management for any dynamic content
- [ ] Checked responsive behavior at 320px width
- [ ] Verified zoom to 200% doesn't break layout
- [ ] Ran automated accessibility checker (axe, Lighthouse, etc.)

### Automated Test Results
<!-- Paste or screenshot any automated accessibility test results -->

```
Accessibility test results here
```

## Screenshots
<!-- If applicable, add screenshots showing before/after -->

| Before | After |
|--------|-------|
|        |       |

## Changelog Entry
<!-- Copy what you added to CHANGELOG.md -->

```markdown
### Changed/Added/Fixed - Brief description
- Detail 1
- Detail 2
```

## Additional Notes
<!-- Any other context, concerns, or notes for reviewers -->

---

**Reviewer Checklist** (for maintainers)
- [ ] Code follows project accessibility standards
- [ ] CHANGELOG.md updated appropriately
- [ ] No new accessibility issues introduced
- [ ] Manual accessibility testing performed
