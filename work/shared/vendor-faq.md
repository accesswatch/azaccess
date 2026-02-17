---
title: Vendor Accessibility FAQ
summary: Answers to common vendor questions during procurement, plus demo script, evidence checklist, and sample contract language.
owner: Procurement Accessibility Lead
last_reviewed: 2026-02-13
next_review: 2026-08-13
tags:
  - topic:procurement
---

## Why does UA require accessibility documentation?

Title II of the ADA and Section 504 require equitable access to programs and services. UA aligns to WCAG (preferred WCAG 2.1/2.2 AA) and Revised Section 508 where applicable.

## What documentation is needed?

- Current VPAT/ACR covering WCAG 2.1 or 2.2 AA (prefer VPAT 2.4 variants).

- Accessibility roadmap and remediation SLAs.

- Evidence of testing (screen reader scripts, third‑party audit reports, recordings).

- Accessibility point of contact for escalation.

## Will UA test the product?

Yes. UA performs risk‑based testing (keyboard, screen reader, color contrast) and may request sandbox/test accounts for independent verification.

## What if our product has gaps?

Provide a dated remediation plan, interim accommodations, and accept contractual remediation milestones or alternatives. Significant unaddressed gaps may lead to disqualification.

## Do we need to support assistive technologies?

Yes. Products must be compatible with widely used AT (NVDA/JAWS, VoiceOver, TalkBack) on supported browsers and operating systems.

---

## Demo script (what UA will ask you to show)

Use this during vendor demos or provide a recorded session with timestamps for each task.

1. Log in with a test account and complete three representative core tasks (e.g., create content, export a report, complete a transaction) using keyboard only.

2. Repeat one core task while running NVDA or VoiceOver and narrate what the AT announces.

3. Open a form and demonstrate field labels, error messages, and focus behavior.

4. Show how images are described (alt text) and how media includes captions/transcripts.

5. Demonstrate theme support (high contrast/dark mode) and respond to a simulated color‑contrast check.

6. Export a document (PDF/DOCX) and confirm exported file accessibility (tagged PDF or accessible DOCX).

Evidence requested: recording (video + AT audio), screenshots with token/hex legend, and a link to a test account.

---

## Evidence checklist (provide these with VPAT/ACR)

- [ ] Current VPAT/ACR (attach)

- [ ] Accessibility roadmap with target dates

- [ ] Test account(s) for evaluation

- [ ] Screen reader test notes or recordings

- [ ] Automated tool reports (axe/Lighthouse)

- [ ] Token/hex color legend for UI themes

- [ ] Exported sample files for document workflows

---

## Sample RFP / contract snippets (copy & paste)

### RFP scope (example)

> The vendor shall provide an Accessibility Conformance Report (VPAT/ACR) based on WCAG 2.1/2.2 Level AA for the proposed product. The product must conform to WCAG 2.1/2.2 Level AA standards for all user-facing and administrative interfaces used by the University. The vendor shall describe their accessibility testing methodology and provide remediation SLAs for accessibility defects.

### Contract clause (example)

> Accessibility & Conformance: Vendor shall ensure the Product conforms to WCAG 2.2 Level AA for all public-facing functionality. Vendor shall deliver an updated VPAT with every major release, remediate accessibility defects per agreed SLA, and provide test accounts and cooperation for University acceptance testing. University may withhold acceptance or payment for failure to meet remediation milestones.

See the Procurement Toolkit for downloadable templates and the reviewer worksheet: [Procurement Toolkit](procurement-toolkit.html).

---

## Evaluation & scoring (summary)

- UA uses a risk-based scoring model: VPAT currency & scope, core workflow accessibility, remediation plan, vendor maturity, and documentation.

- Typical pass threshold: conditional approval requires remediation commitments with enforceable timelines; unacceptable vendors provide no VPAT and refuse to remediate.

---

## Submission & contacts

- Send VPAT/ACR and supporting evidence to your procurement contact and copy [accessibility@arizona.edu](mailto:accessibility@arizona.edu).

- For pre-RFP questions, request a consultation using the Accessibility Consultation Request form (DRC).

Last reviewed: 2026-02-13 — Procurement Accessibility Lead
