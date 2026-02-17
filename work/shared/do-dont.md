---
title: Do / Don't — Quick patterns and examples
summary: Short, printable Do/Don't examples for designers, content creators, and developers.
owner: Accessibility Content Team
last_reviewed: 2026-02-13
next_review: 2026-08-13
tags:
  - topic:content-pattern
  - persona:content-creators
sources:
  - Quickstart accessibility — https://quickstart.arizona.edu/best-practices/accessibility-guidelines
  - UA Documents & Media — documents-media.html
---

This page collects short, actionable "Do" and "Don't" patterns you can copy into documentation, training, or tickets. Use the examples and code snippets directly in your content or developer handoffs.

---

## Images & alt text

### Do — Images

- Add concise, meaningful alt text that describes the purpose of the image (not just what it shows).
- Mark purely decorative images with empty alt (`alt=""`).
- Provide longer descriptions (caption or linked description) for complex charts.

### Don't — Images

- Leave important images without alt text.
- Start alt with "image of" or repeat surrounding text.
- Use images of text instead of real text.

Example — good alt:

```html
<img
  src="team-photo.jpg"
  alt="Three students collaborating over laptops in the campus library"
/>
```

Example — decorative:

```html
<img src="decorative-line.svg" alt="" />
```

---

## Headings & page structure

### Do — Headings

- Use semantic headings in order (H1, H2, H3...).
- Make headings descriptive and unique so screen reader users can scan the page.

### Don't — Headings

- Skip heading levels (e.g., H2 → H4) or use bold text as a heading substitute.

Quick HTML example:

```html
<h1>Accessibility training</h1>
<h2>Getting started</h2>
<h3>Keyboard basics</h3>
```

---

## Links

### Do — Links

- Use descriptive, unique link text (e.g., `Request captioning support`).
- Indicate file type and size when linking downloadable content (e.g., PDF, 2 MB).

### Don't — Links

- Use "click here", "read more", or raw URLs as the only link text.
- Open new windows without telling users.

Good link text example:

```html
<a href="/support/captioning-guidelines.pdf"
  >Download captioning guidelines (PDF)</a
>
```

Bad link text (avoid):

```html
<a href="/support/captioning-guidelines.pdf">Click here</a>
```

---

## Color & contrast

### Do — Color & contrast

- Meet minimum contrast: 4.5:1 for normal text, 3:1 for large text or UI components.
- Use color plus another cue (icon, text label) to convey meaning.

### Don't — Color & contrast

- Rely on color alone to communicate status or meaning.
- Use low‑contrast pastel text on light backgrounds.

Tip: prefer Quickstart tokens (navy on white) and run a contrast check during design review: [Quickstart accessibility guidance](https://quickstart.arizona.edu/best-practices/accessibility-guidelines).

---

## Forms

### Do — Forms

- Associate labels with inputs programmatically (`<label for=...>`).
- Provide clear inline error messages and ARIA where required.
- Group related fields with `<fieldset>` and `<legend>`.

### Don't — Forms

- Use placeholder text as the only label.
- Rely on color alone to indicate required fields or errors.

Form example (good):

```html
<label for="email">Email address</label>
<input id="email" name="email" type="email" />
```

---

## Keyboard & focus

### Do — Keyboard & focus

- Ensure all functionality is keyboard accessible.
- Keep visible focus indicators and logical tab order.

### Don't — Keyboard & focus

- Remove focus outlines without providing an accessible replacement.
- Create keyboard traps inside widgets or modals.

Accessibility pattern: include a `Skip to main content` link and test flows with only the keyboard.

---

## Mobile & touch targets

### Do — Mobile & touch targets

- Make interactive targets large enough for touch (44×44 CSS pixels / ~9mm recommended) and provide ample spacing.
- Ensure hit areas include padding so small icons remain tappable.
- Support larger touch targets when Dynamic Type or accessibility settings are active.

### Don't — Mobile & touch targets

- Rely on tiny icon‑only tap targets or tightly packed controls.
- Use hover-only affordances on mobile devices.

Quick CSS tip (increase hit area without changing visual size):

```css
.button {
  padding: 8px 12px; /* increases hit area */
}
.icon-only {
  padding: 10px; /* preserve visual size, enlarge touch target */
}
```

---

## ARIA micro‑patterns

### Do — ARIA & live regions

- Use native HTML controls first; add ARIA only when semantics are missing.
- Use `aria-live="polite"` or `role="status"` for non‑urgent status messages; use `role="alert"` for critical errors.
- Mark decorative elements with `aria-hidden="true"` so they are ignored by AT.

### Don't — ARIA misuse

- Don't use ARIA to "fix" broken semantics (e.g., don't make a &lt;div&gt; act as a button when a real `&lt;button&gt;` exists).
- Avoid verbose or duplicated aria-labels that repeat visible text.

Example — polite status update:

```html
<div role="status" aria-live="polite">Saved — your changes were saved.</div>
```

---

## Focus style example

Provide a prominent focus indicator (do not remove `outline` without replacement). Example:

```css
:focus {
  outline: 3px solid var(--ua-maroon);
  outline-offset: 2px;
}
```

This meets the repository focus guidance and ensures focus remains visible in high‑contrast modes.

---

## Printable quick reference (one‑line checklist)

- Keyboard accessible ✓ • Alt text & captions ✓ • Contrast ≥4.5:1 ✓ • Large tap targets ✓ • Document styles/tagged PDF ✓

Print this page or download the one‑page Quick Reference Cards at `quick-reference-cards.html` for a printable version.

---

## Video & audio

### Do — Video & audio

- Provide captions (SRT/VTT) and transcripts for all videos.
- Edit auto‑captions for accuracy; include speaker IDs when needed.

### Don't — Video & audio

- Autoplay video with sound or rely on auto‑captions without review.

Deliver captions as sidecar files when possible (SRT/TTML/VTT) and deliver a transcript for audio‑only content.

---

## Documents (PDF, Word, Slides)

### Do — Documents

- Use built‑in heading styles and real tables; export as tagged PDF.
- Add alt text to images and run an accessibility checker before publishing.

### Don't — Documents

- Create structure with manual formatting, scan pages as images, or publish untagged PDFs.

See PDF remediation guidance: [pdf-remediation.md](pdf-remediation.md).

---

## Social & microcontent

### Do — Social & microcontent

- Add alt text to images on social platforms (where supported).
- Use CamelCase for multiword hashtags (#AccessibilityMatters).

### Don't — Social & microcontent

- Overuse emoji or decorative characters to convey meaning.
- Post videos without captions.

---

## Printable posters & quick downloads

- General Accessibility Do's and Don'ts (use page print view)

- Document Accessibility Quick Reference — see `pdf-remediation.md`

---

## Resources

- [Accessibility 101](accessibility-101.html)
- [Heading structure best practices](heading-basics.html)
- [Writing meaningful link text](meaningful-links.html)
- [Color & contrast guidelines](color-contrast.html)
- [Quickstart accessibility patterns](https://quickstart.arizona.edu)

---

Last reviewed: 2026-02-13 — Accessibility Content Team
