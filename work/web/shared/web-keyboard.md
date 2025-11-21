---
title: Keyboard Navigation Essentials
summary: Requirements for keyboard operability across UA web experiences.
owner: Digital Accessibility Engineering
last_reviewed: 2025-11-20
next_review: 2026-02-20
tags:
  - topic:keyboard
  - persona:developers
sources:
  - Accessibility | Home — https://accessibility.arizona.edu/content/keyboard
  - W3C WAI — https://www.w3.org/WAI/WCAG22/quickref/#keyboard-accessible
---

1. **All interactive elements** (links, buttons, controls) must be reachable using Tab/Shift+Tab in a logical order matching the visual layout.
2. **Visible focus**: Provide a 3:1 contrast outline or highlight that is at least 2 px thick; do not remove outlines without a replacement.
3. **Activation keys**: Links and buttons must activate on Enter/Space; custom controls should map to expected keys (e.g., arrow keys for menus, Esc to close dialogs).
4. **No keyboard traps**: Users must be able to leave modal dialogs or widgets using keyboard only; focus returns to the trigger when the dialog closes.
5. **Skip link**: Include a `Skip to main content` link as the first focusable element, visible on focus, pointing to `#maincontent`.
6. **Composite widgets**: Use roving `tabindex` or `aria-activedescendant` to manage focus within menus, carousels, accordions.
7. **Testing**: Navigate every new component using only keyboard; document results in QA artifacts.
