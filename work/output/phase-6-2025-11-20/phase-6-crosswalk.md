# Phase 6 — WCAG 2.2 AA & Title II Crosswalk
_Date: 2025-11-20_

This crosswalk maps key site patterns and workflows to WCAG 2.2 AA success criteria and DOJ Title II (§35.200) requirements. It identifies owners, coverage status, testing methods, and follow-up actions.

---

## 1. Summary
- **Scope:** Top-level navigation pages (Home, Personas, Document & Media, Web & App, Teaching & Learning, Procurement, Policies, Support, Blog) plus shared components (skip link, cards, accordions, forms, consultation map, prototypes).
- **Standards:** WCAG 2.2 AA (W3C WAI), DOJ Title II web & mobile rule (2024) requiring WCAG 2.1 AA; UA exceeding to 2.2 AA.
- **Key findings:**
  - Foundations (keyboard, focus, color contrast, structure) are documented via shared blocks and implemented in prototypes.
  - Remaining risks center on third-party tools (procurement forms, vendor platforms), legacy documents, and mobile apps awaiting audits.
  - Governance requires documented exception process, retention of access plans, and automated monitoring to prevent regressions.

---

## 2. Crosswalk Table
| Pattern / Workflow                                      | WCAG 2.2 AA Criteria                                                         | Title II Touchpoints                                                  | Owner                               | Coverage Status                           | Testing & Evidence                                          | Follow-up                                                                        |
| ------------------------------------------------------- | ---------------------------------------------------------------------------- | --------------------------------------------------------------------- | ----------------------------------- | ----------------------------------------- | ----------------------------------------------------------- | -------------------------------------------------------------------------------- |
| Global skip link (`shared/skip-link-snippet.md`)        | 2.4.1 Bypass Blocks, 2.4.3 Focus Order                                       | Required by §35.200 for program access                                | Arizona Digital                     | Implemented in prototypes                 | Keyboard tab order review + NVDA headings list              | Include snippet in Quickstart templates; add lint rule.                          |
| Keyboard navigation guidance (`shared/web-keyboard.md`) | 2.1.1 Keyboard, 2.4.7 Focus Visible                                          | DOJ emphasizes no keyboard traps                                      | Digital Accessibility Eng           | Documented, partially implemented         | Manual tests (tab/shift+tab) on prototypes                  | Extend to all CMS components; integrate automated focus outline check.           |
| Color contrast (`shared/color-contrast.md`)             | 1.4.3 Contrast (Minimum), 1.4.11 Non-text Contrast                           | Title II: effective communication                                     | Arizona Digital Brand               | Documented; prototypes pass sample checks | TPGi CCA + axe scan                                         | Add palette tokens to design system; require contrast report in CMS submissions. |
| Persona hub templates (`shared/persona-template.md`)    | 1.3.1 Info and Relationships, 2.4.6 Headings                                 | Title II requires clear instructions for accommodations               | Accessibility PMO + DRC             | Template ready; content in progress       | Heading outline review, VoiceOver rotor test on sample page | Populate remaining persona pages; conduct usability testing with students/staff. |
| Document & Media hub                                    | 1.3.2 Meaningful Sequence, 3.3.2 Labels, 3.3.4 Error Prevention              | Conventional documents must be accessible (Title II)                  | Digital Accessibility Team          | Prototype built                           | NVDA + keyboard review; link check for guidance             | Add quick download links for checklists (PDF/HTML) after testing exports.        |
| Consultation map (`shared/consultation-map.md`)         | 3.3.5 Help, 2.4.4 Link Purpose                                               | Title II requires effective communication pathways                    | Accessibility + DRC                 | Text-based map complete                   | Screen-reader link list check                               | Build interactive version with same structure; ensure phone/email accessible.    |
| Procurement workflow (`shared/procurement-steps.md`)    | 1.3.1, 3.2.3 Consistent Navigation                                           | Title II requires accessible procurement; contracts must enforce WCAG | Procurement + Digital Accessibility | Content ready                             | Process review, doc accessibility check                     | Publish vendor FAQ, embed in procurement portal; implement VPAT tracking.        |
| Mobile roadmap (`shared/mobile-roadmap.md`)             | 4.1.2 Name, Role, Value; mobile-specific best practices                      | Title II explicitly covers mobile apps                                | Mobile App Guild                    | Timeline defined; audits pending          | VoiceOver + TalkBack manual testing plans                   | Schedule first wave of app audits Q1 2026; add testing documentation template.   |
| Support page (prototype pending)                        | 2.4.6 Headings, 3.3.1 Error Identification                                   | Title II effective communication requirement                          | Accessibility Program Office        | Outline ready                             | Needs prototype and testing                                 | Build page next, ensure forms accessible and include SLA table.                  |
| Blog template (`shared/blog-template.md`)               | 1.3.1, 2.4.4                                                                 | Title II communications accessibility                                 | Accessibility Communications        | Template ready                            | NVDA headings review                                        | Apply to first posts; include metadata in front matter for automation.           |
| Shared documents (Word, Google, PDF)                    | 1.3.1, 1.4.x, 3.1.1 Language, 3.3.x                                          | Title II: conventional electronic documents                           | Digital Accessibility               | Checklists published                      | Spot-check sample files before posting                      | Provide downloadable accessible templates; track training uptake.                |
| Captioning workflow (`shared/media-captioning.md`)      | 1.2.2 Captions (Prerecorded), 1.2.4 Captions (Live), 1.2.5 Audio Description | Title II effective communication                                      | UCATT + DRC                         | Decision tree ready                       | Validate Panopto workflow, CAS capture logs                 | Integrate request forms into Support page; monitor accuracy metrics monthly.     |
| Governance charter & registry                           | 2.4.3 Focus Order (nav), 3.2.4 Consistent Identification                     | Title II requires ongoing compliance                                  | Accessibility PMO                   | Charter published                         | Governance review meetings scheduled                        | Finalize automation plan for resource registry updates.                          |

---

## 3. Testing Coverage
| Method                  | Tools                                                 | Frequency                       | Notes                                                                                 |
| ----------------------- | ----------------------------------------------------- | ------------------------------- | ------------------------------------------------------------------------------------- |
| Automated scans         | axe DevTools, Accessibility Insights, Lighthouse      | Per release (CI) + quarterly    | Flag color contrast, ARIA errors, keyboard traps.                                     |
| Manual keyboard testing | Physical keyboard review                              | Each new page/component         | Document results in QA checklist.                                                     |
| Screen reader testing   | NVDA+Firefox, VoiceOver+Safari, TalkBack+Chrome       | Quarterly for key flows         | Include transcripts or callouts for issues; coordinate testers with lived experience. |
| Document spot checks    | Microsoft/Adobe checkers, manual screen-reader review | Monthly sample of uploaded docs | Track remediation requests via ServiceNow.                                            |
| Caption accuracy audits | Panopto analytics + manual review                     | Monthly                         | UCATT to log WER (word error rate) and escalate to vendors when >1% errors.           |
| Mobile app audits       | Xcode/Android Studio accessibility inspectors         | Semi-annual                     | Align with Mobile Roadmap deadlines.                                                  |

---

## 4. Risks & Mitigations
1. **Third-party platforms** lacking WCAG support.
   - Mitigation: Enforce VPAT review, require remediation clauses, provide alternative access plans.
2. **Legacy documents** not yet remediated.
   - Mitigation: Maintain inventory, prioritize high-traffic assets, and supply accessible templates.
3. **Mobile apps without recent audits.**
   - Mitigation: Schedule audits, embed tests in CI, publish roadmap (shared/mobile-roadmap.md).
4. **Content drift across decentralized units.**
   - Mitigation: Use shared blocks, change log, quarterly governance reviews, and automated link/contrast checks.
5. **Insufficient training coverage.**
   - Mitigation: Track attendance, offer asynchronous modules, require completion for CMS access.

---

## 5. Action Plan
| Action                                                                    | Owner                               | Due          | Notes                                                         |
| ------------------------------------------------------------------------- | ----------------------------------- | ------------ | ------------------------------------------------------------- |
| Build Support & Consultations prototype with consultation map + SLA table | Accessibility PMO + Arizona Digital | Dec 5, 2025  | Ensure forms meet WCAG 2.2; integrate shared blocks.          |
| Publish remaining persona pages using template                            | DRC, UCATT, Communications          | Dec 15, 2025 | Validate content accuracy and align with top tasks.           |
| Run first WCAG 2.2 audit on Document & Media hub                          | Digital Accessibility QA            | Dec 12, 2025 | Use axe + manual screen-reader testing; log issues in Jira.   |
| Launch procurement VPAT tracking dashboard                                | Procurement + Accessibility         | Jan 15, 2026 | Pull data from Trellis/ServiceNow; show status to leadership. |
| Initiate mobile app audit sprint                                          | Mobile App Guild                    | Feb 3, 2026  | Document test scripts, issues, remediation plans.             |
| Automate resource registry reminders                                      | Accessibility PMO                   | Feb 1, 2026  | Notifications for owners 30 days before next review.          |

---

## 6. References
- Accessibility | Home — https://accessibility.arizona.edu
- DOJ ADA Title II Regulations — https://www.ada.gov/law-and-regs/regulations/title-ii-2010-regulations/
- W3C Web Accessibility Initiative — https://www.w3.org/WAI/
- Microsoft Accessibility — https://www.microsoft.com/en-us/accessibility
- Google Workspace Accessibility — https://workspace.google.com/learn-more/accessibility/
- Apple Developer Accessibility — https://developer.apple.com/accessibility/
- Adobe Accessibility — https://www.adobe.com/accessibility.html
- Buying Accessible IT — https://itaccessibility.arizona.edu/buying-accessible-it
