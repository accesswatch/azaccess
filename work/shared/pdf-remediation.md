---
title: PDF Remediation & Acrobat Workflow
summary: Steps to create or repair tagged PDFs that meet WCAG 2.2 AA and Title II expectations.
owner: Digital Accessibility Team
last_reviewed: 2025-11-20
next_review: 2026-02-20
tags:
  - format:pdf
  - persona:content-creators
sources:
  - Accessibility | Home — https://accessibility.arizona.edu
  - Adobe Accessibility — https://www.adobe.com/accessibility.html
---

## When to remediate
- **Preferred path:** Fix the source file (Word, InDesign, Google Docs) and export a tagged PDF.
- **Remediation required:** Legacy PDFs, scans, or vendor deliverables that cannot be recreated from source.

## Core workflow (Adobe Acrobat Pro)
1. **Preflight**: Run `Accessibility > Full Check` to identify missing tags, titles, or language settings.
2. **Set document properties**: Fill in Title, Author, Subject, Keywords; set the primary language.
3. **Apply tags**: Use `Autotag Document` for a baseline, then manually correct heading levels, lists, and tables in the Tags panel.
4. **Fix reading order**: Use the `Reading Order` tool to ensure logical flow; tables should announce headers left-to-right, top-to-bottom.
5. **Add alt text**: Right-click figures in the Tags panel and add concise alt text; mark decorative elements as `Artifact`.
6. **Describe form fields**: Add tooltips, tab order, and set required states; ensure radio/checkbox groups share accessible names.
7. **Bookmarks & structure**: Include bookmarks that mirror heading levels for long documents.
8. **Re-run Accessibility Check**: Resolve errors/warnings; document any limitations (e.g., complex scientific notation) in an accessibility statement.

## Special cases
- **Scanned PDFs**: Run OCR (`Recognize Text`) before tagging; verify output accuracy manually.
- **STEM content**: Provide linked MathML or include accessible source files alongside the PDF.
- **Maps & infographics**: Supplement with descriptive text or data tables outside the PDF when alt text alone is insufficient.

## UA support
- Submit remediation requests via the Accessibility consultation form for high-impact assets (admissions, financial aid, compliance documents).
- For enterprise-scale remediation, coordinate with Procurement to ensure vendor contracts include accessibility clauses and remediation SLAs.
