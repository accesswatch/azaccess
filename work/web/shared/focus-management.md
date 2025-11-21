---
title: Focus Management Patterns
summary: Guidance for handling focus in dialogs, menus, and custom components.
owner: Digital Accessibility Engineering
last_reviewed: 2025-11-20
next_review: 2026-02-20
tags:
  - topic:focus
  - persona:developers
sources:
  - W3C WAI ARIA Authoring Practices — https://www.w3.org/WAI/ARIA/apg/
---

1. **Dialogs/Modals**
   - Move focus to the first interactive element when dialog opens; trap focus within the dialog until closed.
   - Provide Esc key to close; return focus to the trigger when dialog closes.
2. **Menus & Dropdowns**
   - Use a button with `aria-haspopup`/`aria-expanded`; when open, move focus to the first menu item.
   - Arrow keys navigate items; Home/End jump to extremes; Esc closes and returns focus to button.
3. **Carousels**
   - Provide focusable controls (Prev/Next, pause) and announce slide changes via `aria-live` if auto-advancing.
4. **Tabs**
   - Tabbing enters the tablist; arrow keys move between tabs with roving `tabindex`. Activate tab updates `aria-selected` and focus on panel heading.
5. **Notifications/Toast**
   - If focus should remain elsewhere, use `aria-live="polite"`; if user action required, move focus into the toast and provide dismissal controls.
6. **Error handling**
   - Send focus to first invalid field and describe error via `aria-describedby`.

Test with keyboard and screen readers to ensure focus order is predictable and announcements make sense.
