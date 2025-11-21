---
title: Accessible Google Workspace Docs, Sheets & Slides
summary: Practical steps for making Google Workspace files usable with screen readers, magnifiers, and alternative input.
owner: Digital Accessibility Team
last_reviewed: 2025-11-20
next_review: 2026-02-20
tags:
  - persona:content-creators
  - format:google-workspace
sources:
  - Accessibility | Home — https://accessibility.arizona.edu
  - Google Workspace Accessibility resources — https://workspace.google.com/learn-more/accessibility/
---

## Core practices
1. **Enable screen reader support** (`Tools > Accessibility settings`) so collaborators using ChromeVox, NVDA, or VoiceOver receive structural cues.
2. **Use built-in heading styles** (`Ctrl+Alt+1-6`) in Docs to create a logical outline; avoid bold text impersonating headings.
3. **Provide alt text** via `Format > Alt text…` for images, drawings, and charts; describe the purpose, not just appearance.
4. **Create accessible tables**: Include header rows, avoid merged cells, and add descriptive captions when tables have complex relationships.
5. **Check contrast** of text and backgrounds. For Slides, choose UA-approved palettes or run a plugin such as Grackle.
6. **Caption media** embedded from Drive/YouTube; upload caption files or use UA captioning workflows when accuracy is critical.
7. **Use comments carefully**: Summaries or instructions should exist in body text, not only as comments which some screen readers skip by default.
8. **Export intentionally**: When sharing outside Google Workspace, choose formats that retain tags (e.g., `.docx`, `.pptx`) or deliver accessible PDFs generated with Grackle.

## Quick checklist
- [ ] Accessibility settings enabled for document.
- [ ] Heading hierarchy starts at H1 and flows sequentially.
- [ ] Alt text present or marked decorative.
- [ ] Lists use native list styles.
- [ ] Table headers defined; no layout tables.
- [ ] Color contrast verified; links underlined or visually distinct.
- [ ] Captions or transcripts provided for embedded media.

## Helpful tools
- **Grackle Docs/Slides** add-on for automated checking and PDF export.
- **Screen reader previews** (`Tools > Accessibility > Turn on screen reader support`) to simulate navigation.
- **Voice typing** for inclusive authoring when typing is a barrier.

## UA support & escalation
- Request Digital Accessibility consultation for templates, multi-language content, or multi-tab spreadsheets requiring ARIA descriptions.
- For Google-specific bugs, submit feedback (`Help > Help Docs improve`) and notify accessibility@arizona.edu with issue details so we can track vendor escalations.
