---
title: Procurement Toolkit
summary: Downloadable RFP language, demo script, acceptance checklist, and reviewer worksheet for accessible procurement.
owner: Procurement + Digital Accessibility
last_reviewed: 2026-02-13
next_review: 2026-08-13
tags:
  - topic:procurement
  - persona:procurement
sources:
  - UA Purchasing & VPAT guidance — https://itaccessibility.arizona.edu/buying-accessible-it
  - VPAT template & guidance — https://itaccessibility.arizona.edu/guidelines/purchasing/vpat
  - Quickstart accessibility — https://quickstart.arizona.edu/best-practices/accessibility-guidelines
---

## What this toolkit contains

- Copy‑and‑paste RFP language and contract clause samples

- Demo script (step‑by‑step) vendors should follow

- Acceptance checklist for sign‑off

- Reviewer worksheet (CSV) for scoring and evidence capture — `procurement-reviewer.csv`

---

## How to use

1. Attach the RFP language to solicitation documents.

2. Ask vendors to complete the VPAT and provide the evidence checklist below.

3. Run the demo script during vendor demos or request a recorded demo.

4. Use the reviewer worksheet to capture evidence and produce a procurement score.

---

## RFP sample language (copy/paste)

Scope of Work — Accessibility Requirements

> The vendor shall provide an Accessibility Conformance Report (VPAT/ACR) for the product evaluated based on WCAG 2.1/2.2 Level AA and the Revised Section 508 standards where applicable. The vendor must describe accessibility testing methods, list assistive technologies and browsers used for testing, and provide remediation timelines for any non‑conforming items. Proposals lacking a completed VPAT may be disqualified.

Contract Addendum — Accessibility Deliverables (sample)

> Vendor shall deliver an updated VPAT for each major release, remediate accessibility defects per the remediation SLA in Exhibit X, provide test accounts and cooperate with University acceptance testing. Failure to meet remediation milestones may result in withholding of acceptance or other contractual remedies.

(Always route legal language to Procurement Legal for final approval.)

---

## Demo script (vendor or recorded)

Follow this script live or ask for a recording. Recordings must include AT audio where applicable.

- Pre-demo: provide a test account and list of pages/features to be shown.

- Step 1 — Keyboard: complete three core user tasks using only the keyboard (login → perform task A → export/save).

- Step 2 — Screen reader: repeat one core task with NVDA or VoiceOver running; narrate what the screen reader announces.

- Step 3 — Forms: show a form submission with an intentional error and show how errors are announced and associated with fields.

- Step 4 — Media & documents: show captioned media and export a sample PDF or DOCX demonstrating accessibility.

- Step 5 — Theming: show high‑contrast/dark mode (if supported) and provide token/hex values for UI colors.

Evidence to attach: demo recording, screenshots with hex/token legend, test account credentials, exported sample files, and tool reports (axe/Lighthouse).

---

## Acceptance checklist (use at sign‑off)

| Criterion                                 |                        Pass evidence | Action if fail                |
| ----------------------------------------- | -----------------------------------: | ----------------------------- |
| Keyboard accessibility (core tasks)       |               Recorded keyboard demo | Vendor remediation + re‑test  |
| Screen reader compatibility (forms/pages) |      Screen reader recording & notes | Vendor remediation            |
| Color contrast (core UI)                  |         Screenshot + contrast report | UI remediation                |
| Form labels & error associations          |     Accessibility tree / ARIA review | Dev fix                       |
| Exported documents accessible             |                Sample exported files | Vendor fix or conversion plan |
| VPAT current & scoped                     | VPAT dated < 18 months, covers scope | Request updated VPAT          |

---

## Reviewer worksheet (download)

- Reviewer worksheet CSV: `procurement-reviewer.csv` — use to capture per‑criterion scores, weights, and evidence links.

---

## Resources & references

- [UA Buying Accessible IT](https://itaccessibility.arizona.edu/buying-accessible-it)

- [UA VPAT guidance & template](https://itaccessibility.arizona.edu/guidelines/purchasing/vpat)

- [Section508 procurement guidance](https://www.section508.gov/)

- [Quickstart accessibility tokens & patterns](https://quickstart.arizona.edu/best-practices/accessibility-guidelines)

---

Last reviewed: 2026-02-13 — Procurement + Digital Accessibility
