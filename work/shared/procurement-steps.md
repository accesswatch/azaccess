---
title: Accessible Procurement Steps
summary: Practical, step‑by‑step procurement workflow — VPAT intake, demo & acceptance checklists, sample contract language, UA branding and Quickstart resources.
owner: Procurement + Digital Accessibility
last_reviewed: 2026-02-13
next_review: 2026-08-13
tags:
  - persona:staff
  - topic:procurement
sources:
  - Buying Accessible IT — https://itaccessibility.arizona.edu/buying-accessible-it
  - Procurement language (RFP / contract clauses) — https://itaccessibility.arizona.edu/buying-accessible-it/procurement-language
  - VPAT template & guidance — https://itaccessibility.arizona.edu/guidelines/purchasing/vpat
  - DRC (Disability Resource Center) — https://drc.arizona.edu
  - Quickstart accessibility guidance — https://quickstart.arizona.edu/best-practices/accessibility-guidelines
  - UA Brand & color guidance — https://brand.arizona.edu
---

<!--
  Accessibility decisions in this document:
  - Headings follow H1 → H2 → H3 hierarchy for screen reader navigation.
  - Use Quickstart/brand color tokens (not hard-coded colors) to preserve contrast and theming.
  - Provide explicit acceptance criteria and testing steps (keyboard + screen readers + automated checks).
  - Manual testing is REQUIRED in addition to automated scans — see "Testing & tools" below.
-->

## Purpose

Practical, procurement-focused guidance so purchasing teams, business owners, and procurement staff can evaluate accessibility risk, require vendor commitments, and validate acceptance before go-live.

> Quick summary: identify EIT scope → request VPAT & roadmap → run VPAT triage → demo with AT → require remediation + contract clauses → sign acceptance on a checklist.

---

## At a glance (7 required phases)

1. Initiate request — declare accessibility early and attach essential info.
2. Vendor questionnaire — collect VPAT/ACR, accessibility roadmap, and test evidence.
3. Preliminary review — triage VPAT and identify high‑risk areas.
4. Product demo & testing — hands‑on keyboard + screen reader checks.
5. Mitigation plan & SLA — vendor remediation commitments and interim access.
6. Contract & procurement clauses — make VPATs, remediation, and auditing contractual.
7. Post‑award follow‑up — periodic re‑validation and updated VPATs on major releases.

---

## 1. Initiate request (what to include)

- Required fields on the intake form: business owner, unit contact, primary users, admin functions, data sensitivity, timeline, and critical user tasks.
- Attachments to include at intake: intended feature list, sample data flows, and the expected usage scenarios for people with disabilities.
- Accessibility flag: set the procurement risk as **Low / Medium / High** and route to Accessibility PMO + Procurement for Medium/High.

Responsibility: Requestor + Procurement. Contact DRC for consultation early: [DRC](https://drc.arizona.edu)

---

## 2. Vendor questionnaire (what to request)

Ask the vendor to provide:

- Latest Accessibility Conformance Report (VPAT/ACR) — WCAG 2.1/2.2 or VPAT 2.4 variants.
- Accessibility roadmap and remediation SLAs.
- Evidence of testing (screen reader scripts, third‑party audit reports, recordings).
- Names/versions of AT/browsers used for verification.

Sample questions to include in RFP/RFI:

- Have you completed a VPAT for the version we are evaluating? (attach)
- Which screen readers, versions, and browsers were used during verification?
- Describe your accessibility issue triage and SLA for bug fixes.
- Do you provide an accessibility contact and escalation path?

Reference: UA procurement language — [procurement language (UA)](https://itaccessibility.arizona.edu/buying-accessible-it/procurement-language)

---

## 3. Preliminary review (VPAT triage)

- Triage checklist:
  - Verify VPAT date (prefer < 18 months).
  - Confirm scope covers the features you will use (admin UI, reporting, exports).
  - Look for vague or repeated "Supports" remarks — ask for clarifying evidence.
  - Validate the VPAT version (VPAT 2.4 / WCAG 2.1/2.2 preferred).

- Red flags that trigger further review or disqualification:
  - No VPAT or > 24 months old.
  - VPAT contains many "Not Evaluated" or generic remarks.
  - Vendor refuses test access or demo with assistive tech.

If VPAT is unclear, request vendor demo + 30‑day trial access for UA testing.

---

## 4. Product demo & acceptance testing (demo script)

Run a live demo using this script — record the session and capture issues.

- Core demo checklist (perform during vendor demo):
  - Navigate the entire product using keyboard only; complete 3 core user tasks.
  - Use a screen reader (NVDA / JAWS on Windows; VoiceOver on macOS/iOS) to read key screens and forms.
  - Confirm focus indicators and logical tab order.
  - Verify meaningful link text and form labels.
  - Export/import flows: ensure exported documents are accessible (tagged PDFs, accessible DOCX).
  - Media: captions, transcripts, and player accessibility.
  - Error handling: error messages are programmatically associated with fields and are announced by screen readers.
  - Verify color contrast on representative UI screens (≥4.5:1 normal text, ≥3:1 large text).

- Capture evidence: screenshots, short screen‑reader audio snippets, timestamps in the recording where issues occur.

Acceptance testing is a combination of automated (axe/Lighthouse) and manual checks — automated checks do NOT replace manual testing.

---

## 5. Mitigation plan & remediation SLOs

If gaps are found, require a remediation plan in writing that includes:

- Scope of affected features and priority (Blocker / Major / Minor).
- Target remediation timeline (e.g., Blocker: 2 weeks; Major: next scheduled release; Minor: within 2–3 releases).
- Interim alternative access plan for users while fixes are implemented.
- Reporting cadence and acceptance test re‑runs.

Document remediation commitments in the procurement record and link them to acceptance conditions.

---

## 6. Contract language (make it enforceable)

- Require VPAT/ACR delivery and updates as a contractual deliverable.
- Include remediation milestones, auditing rights, and acceptance test sign‑off.

Sample clause (adapt to your legal review):

```text
Accessibility & Conformance: Vendor shall ensure the Product conforms to WCAG 2.2 Level AA for all public-facing functionality and to applicable portions of Section 508 for federally required features. Vendor shall provide an Accessibility Conformance Report (VPAT/ACR) for each major release and shall remediate accessibility defects according to the remediation schedule in Exhibit X. University may withhold acceptance or payment for failures to meet agreed remediation milestones. Vendor shall cooperate with University accessibility testing, provide test accounts, and respond to accessibility defect tickets within agreed SLAs.
```

Always route contract language through Procurement Legal for final wording and penalties.

Reference: UA procurement clauses — [UA buying accessible IT (procurement language)](https://itaccessibility.arizona.edu/buying-accessible-it/procurement-language)

---

## 7. Post‑award follow‑up

- Require updated VPATs on major releases or annually, whichever comes first.
- Schedule quarterly check‑ins for critical systems; include periodic re‑testing if the product is core to operations.
- Log exceptions with owner, justification, and review cycle (every 6 months recommended).

---

## Acceptance checklist (use at sign‑off)

| Criterion                                        |                        Pass evidence | Action if fail                     |
| ------------------------------------------------ | -----------------------------------: | ---------------------------------- |
| Keyboard accessibility (core tasks)              |               Recorded keyboard demo | Vendor fix + re‑test               |
| Screen reader compatibility (forms/pages)        |      Screen reader recording & notes | Vendor fix + re‑test               |
| Color contrast                                   |         Screenshot + contrast report | UI remediation                     |
| Theme token map (tokens + 200% zoom screenshots) |    Token JSON/CSS vars + screenshots | Request token map / UI remediation |
| Form labels & error associations                 |     Accessibility tree / ARIA review | Developer fix                      |
| Exported documents accessible                    |                Sample exported files | Vendor fix or conversion plan      |
| VPAT current & scoped                            | VPAT dated < 18 months, covers scope | Request updated VPAT               |

---

## Scoring & VPAT rubric (quick guide)

- Excellent (4): Current VPAT; demo passes; remediation plan in place; contractual guarantees.
- Good (3): Minor gaps; vendor roadmap & SLA acceptable; conditional approval with remediation.
- Fair (2): VPAT dated/partial; remediation timelines long; proceed with caution and compensating measures.
- Poor (1) / Unacceptable (0): No VPAT; vendor unwilling to commit; consider alternatives.

---

## Branding, color, Quickstart & Bootstrap — design guidance for procurement reviewers

- Prefer vendors that align with accessible design systems (Quickstart tokens or similar).

- Use UA Quickstart color tokens for university templates; Quickstart ensures accessible pairings: [Quickstart accessibility guidance](https://quickstart.arizona.edu/best-practices/accessibility-guidelines)

- Reference UA Brand for official palettes and logo usage: [UA Brand](https://brand.arizona.edu)

- For vendor front‑end components built on frameworks, validate Bootstrap accessibility guidance and component ARIA patterns: [Bootstrap accessibility](https://getbootstrap.com/docs/5.3/getting-started/accessibility/)

- Verify color contrast using Quickstart tokens or the UA token names used on this site (e.g., `--ua-arizona-blue`, `--ua-maroon`).

Tip: ask vendors to deliver UI screenshots with token names or hex values so you can verify contrast with automated tools.

---

## Testing & tools (automated + manual)

Recommended automated tools:

- [axe / axe‑core (browser extension or CI)](https://www.deque.com/axe/)

- [Accessibility Insights](https://accessibilityinsights.io/)

- Lighthouse (Chrome) — built into DevTools

- [WAVE online checker](https://wave.webaim.org/)

Manual checks to perform every time:

- Keyboard‑only task completion (no mouse)
- NVDA (Windows) / JAWS (Windows) / VoiceOver (macOS/iOS) / TalkBack (Android) basic flows
- Mobile assistive tech flows for responsive apps
- Real‑user testing when possible

---

## Exceptions, undue burden, and documentation

If you must accept a non‑conforming product, document:

- Business justification and market research showing no conforming alternative.
- Alternative access plan for affected users and timeline to resolve.
- Executive approval and periodic re‑review schedule.

Refer to Section 508 exception guidance when claiming undue burden: [Section508 exceptions guidance](https://www.section508.gov/buy/determine-ict-exceptions/)

---

## Resources (quick links)

- [UA Buying Accessible IT / Procurement language](https://itaccessibility.arizona.edu/buying-accessible-it)

- [UA VPAT template & guidance](https://itaccessibility.arizona.edu/guidelines/purchasing/vpat)

- [DRC (Disability Resource Center) — consultation & intake forms](https://drc.arizona.edu)

- [Arizona Quickstart (design tokens & accessibility)](https://quickstart.arizona.edu)

- [UA Brand guidelines](https://brand.arizona.edu)

- [Bootstrap accessibility guidance](https://getbootstrap.com/docs/5.3/getting-started/accessibility/)

- [W3C WAI / WCAG 2.2](https://www.w3.org/WAI/)

- [Section508 procurement guidance](https://www.section508.gov/)

- axe / Accessibility Insights / Lighthouse — automated toolset links above

---

## Notes for maintainers

<!--
  - Keep this file short and focused on actionable steps; link out to canonical UA pages for legal/contract language.
  - Run automated axe checks on any pages that copy sample contract language or interactive checklists.
  - Manual verification checklist should be run by Accessibility PMO or trained reviewer before publishing vendor decisions.
-->

**Manual testing required:** keyboard-only walkthrough and at least one screen reader pass before acceptance. Use axe in CI for regressions and Accessibility Insights for focused debugging.

---

Last reviewed: 2026-02-13 — Accessibility PMO & Procurement
