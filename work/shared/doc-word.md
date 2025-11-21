---
title: Accessible Word & PowerPoint Basics
summary: Core steps for creating accessible Microsoft 365 Word documents and slide decks before exporting to PDF or LMS platforms.
owner: Digital Accessibility Team
last_reviewed: 2025-11-20
next_review: 2026-02-20
tags:
  - persona:content-creators
  - format:microsoft365
sources:
  - Accessibility | Home — https://accessibility.arizona.edu
  - Microsoft Accessibility — https://www.microsoft.com/en-us/accessibility
---

## Why it matters
Microsoft 365 files count as “conventional electronic documents” under Title II (§35.104) when they stay in active circulation. Fixing accessibility at the source (Word/PowerPoint) prevents remediation churn when exporting to PDF or posting in Brightspace.

## Key actions
1. **Use built-in styles** for headings, lists, and tables so assistive tech can parse structure. Avoid manual font sizing for hierarchy.
2. **Write clear alt text** describing the purpose of informative images; mark decorative visuals as `decorative` in the Alt Text pane.
3. **Keep reading order logical** (especially in PowerPoint) by arranging elements in the Selection Pane from top to bottom.
4. **Ensure contrast** of at least 4.5:1 for normal text; use UA-approved color pairs or test with Color Contrast Analyzer.
5. **Name links descriptively** (e.g., “Request an accessibility consultation” instead of “click here”).
6. **Use real tables for data**, including header rows and repeat settings; avoid merged cells when possible.
7. **Run the Accessibility Checker** (`Review > Check Accessibility`) and resolve flagged issues before publishing.
8. **Export to tagged PDF** only after the source file passes checks; select `Create PDF/XPS > Options > Document structure tags`.

## Quick checklist
- [ ] Heading styles applied; no skipped levels.
- [ ] Alt text present or images marked decorative.
- [ ] Slide reading order verified via Selection Pane.
- [ ] Sufficient color contrast and underline/weight cues for links.
- [ ] Tables have header rows identified.
- [ ] Accessibility Checker reports zero errors.
- [ ] Document language set (`Review > Language`).

## Advanced tips
- Use **Immersive Reader** to preview how content sounds for screen-reader users.
- Activate **Subtitles** in PowerPoint to provide live captions during presentations.
- For math/science content, leverage **MathType** or the built-in Equation editor to keep expressions accessible.

## UA support
- Schedule a Digital Accessibility review if you need help remediating complex templates.
- Contact Microsoft’s Disability Answer Desk for technical troubleshooting (24/7 chat/phone).
