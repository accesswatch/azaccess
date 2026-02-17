---
title: VPAT / ACR Review Guide
summary: How to interpret vendor accessibility conformance reports and capture reviewer evidence.
owner: Digital Accessibility Procurement Lead
last_reviewed: 2026-02-13
next_review: 2026-08-13
tags:
  - topic:procurement
---

## Review steps

1. **Check version**: Prefer VPAT 2.4 (WCAG 2.1/2.2 sections) and confirm the ACR covers the product version under evaluation.

2. **Evaluate scoring**:
   - `Supports`: Request demonstration evidence for at least one representative workflow.

   - `Partially Supports`: Require specific remediation timelines or compensating workarounds.

   - `Does Not Support`: Treat as a blocker for core functionality unless an approved exception exists.

3. **Assess remarks quality**: Look for explicit examples, component references, and steps to reproduce issues. Repeated generic text is a red flag.

4. **Cross-reference critical WCAG criteria**:
   - 1.1.1 Non‑text Content

   - 1.3.1 Info and Relationships

   - 1.4.3 Contrast (Minimum)

   - 2.1.1 Keyboard

   - 2.4.3 Focus Order

   - 2.4.7 Focus Visible

   - 3.3.1/3.3.3 Error Identification / Suggestions

5. **Document risk & decision**: Record VPAT date/version, reviewer notes, evidence links, severity, and recommendation (approve/conditionally approve/reject).

---

## How to validate VPAT claims (practical)

- Request sandbox/test accounts and a recorded demo showing the claimed feature using assistive technology.

- Validate at least one core workflow per role (end user + admin) with keyboard and a screen reader.

- Use automated scans (axe, Accessibility Insights, Lighthouse) to catch obvious issues; follow with manual verification for semantics and AT behavior.

- If vendor claims "Supports" for a criterion, ask for a test case (page URL or steps) you can verify independently.

---

## Annotated VPAT example (what to look for)

- Prefer entries that include the precise page/feature, a concrete example of the control, and an explanation of how the product meets the criterion.

- Avoid entries that list every criterion as "Supports" with no remarks — realistic VPATs will include measured exceptions.

Example (excerpt):

> 2.1.1 Keyboard — Partially Supports — Remarks: "Core content creation and editing are keyboard operable; complex drawing tool requires mouse. Planned remediation in Q3 2026."

Action: verify that keyboard users can complete the core tasks; for the drawing tool, require alternate workflow and remediation commitment.

---

## Scoring rubric (recommended)

- Use a weighted rubric for procurement scoring. Example weights (adjust per procurement):
  - VPAT currency & scope: 25%

  - Core workflow accessibility (keyboard + AT): 30%

  - Remediation plan & SLA: 20%

  - Vendor commitment / org maturity: 15%

  - Documentation & third‑party audits: 10%

Download reviewer worksheet: [procurement-reviewer.csv](./procurement-reviewer.csv) (also available via the Procurement Toolkit).

---

## Reviewer worksheet (evidence capture)

- Capture: reviewer name, date, product version, VPAT date, test accounts, core tasks tested, automated tool outputs (axe report), screen reader recordings, and final score.

- Store worksheet in the procurement ticket and attach to the contract record.

---

## Red flags & escalation

- VPAT older than 18 months or missing scope for features you will use.

- Vendor refuses sandbox/test access or refuses to demonstrate AT workflows.

- Numerous "Not Evaluated" entries for high‑impact criteria.

Escalate to Procurement + Accessibility PMO when red flags appear.

---

## Questions to validate conformance

- Can you demonstrate this specific criterion in a live environment?

- What AT/browser/OS matrix was used for verification (include versions)?

- Who is responsible for accessibility on your team and what is the escalation path?

---

## Resources

- [UA VPAT guidance & template](https://itaccessibility.arizona.edu/guidelines/purchasing/vpat)

- [ITIC VPAT repository & guidance](https://www.itic.org/policy/accessibility/vpat)

- Knowbility VPAT validation resources

- [W3C WCAG overview](https://www.w3.org/WAI/standards-guidelines/wcag/)

Last reviewed: 2026-02-13 — Digital Accessibility Procurement Lead
