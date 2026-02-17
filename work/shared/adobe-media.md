---
title: Adobe Creative Cloud Accessibility Tips
summary: Guidance for using Adobe tools (InDesign, Premiere, Firefly) with accessibility in mind.
owner: UCATT Multimedia + Adobe & Arizona Team
last_reviewed: 2025-11-20
next_review: 2026-02-20
tags:
  - format:adobe
sources:
  - Adobe Accessibility — https://www.adobe.com/accessibility.html
---

## InDesign

- Build with paragraph/character styles and apply a proper tag structure (`Window > Articles`) so exported PDFs contain semantic headings and lists.

- Use `Object Export Options` to set `Alternative Text` for images and mark decorative objects as artifacts.

- Define and confirm reading order using the `Articles` panel and `Export` → `Adobe PDF (Interactive)` or `Export` → `Adobe PDF (Print)` with **Create Tagged PDF** enabled.

- After export, open the PDF in Acrobat and run the Accessibility Full Check; fix tag/reading‑order issues, add missing alt text, and set Document Language.

### Quick InDesign checklist

- All body/heading styles mapped to tags
- Images have `Object Export Options` alt text or marked decorative
- Exported PDF has `Create Tagged PDF` enabled
- Run Acrobat Accessibility Full Check and resolve critical issues

## Acrobat (remediation & verification)

- Use Acrobat Pro's **Accessibility Checker** (Tools → Accessibility → Full Check) to identify tagging, reading order, form field, and language issues.

- Use the **Reading Order** tool and **TouchUp Reading Order** only to correct complex layout issues — prefer fixing source InDesign files when possible.

- Run the Action Wizard / Make Accessible action for routine fixes, but always manually verify headings, links, and alternative text.

- Save an accessibility report and include it with the file delivered to stakeholders.

## Premiere Pro (captions & media accessibility)

- Use **Speech to Text** to generate a captions track; edit and correct timings before export.

- Export captions as sidecar files (SRT, VTT, TTML) for LMS ingestion; avoid burned‑in captions when a sidecar file is supported.

- Ensure on‑screen text contrasts sufficiently and that essential information is available in the audio/narration.

- Provide transcripts and timed captions for all public‑facing media.

## Adobe Firefly & Express (image generation)

- Provide descriptive captions / alt text for AI‑generated imagery and verify contrast for legibility.

- Avoid using images to convey critical information (use HTML/CSS text or provide equivalent text alternatives when publishing).

- For vendor assets, request token/hex values for colour swatches used so contrast can be verified.

## Testing & verification (files and media)

- PDF: Acrobat Accessibility Full Check + manual tag tree inspection + NVDA screen reader review.

- Video: captions (SRT/TTML), transcript, and a short screen‑reader test of the player controls.

- Images: alt text verification and automated contrast checks.

- Use axe, Accessibility Insights, and Lighthouse where applicable for web‑exported assets.

## Common pitfalls & fixes

- Problem: Images exported without alt text — Fix: add `Object Export Options` in InDesign or add alt in Acrobat.

- Problem: Reading order incorrect — Fix: adjust `Articles` order in InDesign and re‑export; fix in Acrobat only when necessary.

- Problem: Captions out of sync — Fix: re‑time captions in Premiere's Captions panel and re‑export sidecar file.

## Checklist (authors)

- [ ] Source InDesign files use semantic styles and article ordering
- [ ] Images have alt text or are marked decorative
- [ ] Exported PDF is tagged and passes Acrobat Full Check
- [ ] Video has edited captions + sidecar file and transcript
- [ ] Color contrast checked for on‑screen graphics
- [ ] Deliverables include accessibility report + test account/view link
- [ ] Adobe Media Accessibility checklist attached (`adobe-media-checklist.md`)

### Caption verification (quick steps)

- Generate captions with Speech-to-Text, then edit timings and speaker IDs.
- Export sidecar SRT/VTT and validate in the target player (LMS or CMS).
- Sanity check: captions appear in the same order as audio and include non-speech info (music, [laughter]).

## Resources & references

- [Adobe Accessibility](https://www.adobe.com/accessibility.html)
- [PDF remediation workflow (UA)](pdf-remediation.md)
- [Media captioning guidance (UA)](media-captioning.html)
- [Quickstart accessibility patterns](https://quickstart.arizona.edu/best-practices/accessibility-guidelines)

## Support & training

- Contact [adobe@arizona.edu](mailto:adobe@arizona.edu) for local training and licensing questions.
- For file remediation support, contact [accessibility@arizona.edu](mailto:accessibility@arizona.edu) or schedule an Accessibility consultation.

Last reviewed: 2026-02-13 — UCATT Multimedia & Accessibility
