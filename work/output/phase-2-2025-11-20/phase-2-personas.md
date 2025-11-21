# Phase 2 — Persona & Scenario Mapping
_Date: 2025-11-20_

## How to Use This Matrix
Each persona section includes:
- **Executive snapshot** summarizing needs and success signals.
- **Top tasks & scenarios** (prioritized) with embedded UA workflows and timelines.
- **Primary tools & touchpoints** so teams know which forms, sites, or platforms to surface.
- **Why this matters** linking to WCAG 2.2 AA and Title II §35.200 expectations.
- **Do this / Don’t do this** guardrails to keep guidance actionable.

---

## 1. Students
**Executive summary:** Students expect frictionless access to accommodations, digital course materials, and campus events. The DRC is the system of record for accommodations, but students also interact with UCATT help centers, IT Accessibility tutorials, and campus accessibility logistics.[^drc][^ucatt][^access]

| Priority Task / Scenario                                            | Notes & Embedded Guidance                                                                                                                              |
| ------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------ |
| Submit or renew accommodation requests                              | Route to DRC Connect portal; reinforce early submission (4+ weeks before term) and explain documentation expectations.[^drc]                           |
| Track approved accommodations in courses                            | Promote Instructor Help Center guidance plus DRC student list instructions; clarify escalation path when tools aren’t accessible.[^drc][^ucatt]        |
| Access accessible course media (Panopto, Zoom, VoiceThread)         | Point to UCATT Student Help Center for tutorials and caption expectations; connect to IT Accessibility captioning intake when needed.[^ucatt][^access] |
| Plan accessible participation in events, labs, internships          | Surface Campus Accessibility portal (transportation, seating, barrier reporting) and event access statement templates.[^campus][^drc]                  |
| Request ASL/interpreting or captioning for co-curricular activities | Link to DRC ASL/CART request form, including required lead time and contact method.[^drc]                                                              |
| Report digital or physical barriers                                 | Provide Access Report form plus accessibility consultation form for web blockers; specify expected response SLAs.[^drc][^access]                       |
| Learn self-advocacy & universal design tips                         | Curate training from DRC inclusive class tips and Accessibility “Build Accessibility Into Everything” series for peer education.[^drc][^access]        |

**Primary tools & UA touchpoints:** DRC student portal, Access Report form, Accessibility consultation request, UCATT studenthelp.intech.arizona.edu, Campus Accessibility map.

**Why this matters:** Title II requires equal participation (§35.130) and effective communication (§35.160); WCAG 2.2 AA compliance is mandatory for public-facing web content beginning 2026/2027.[^title2]

**Do this:**
- Use plain-language checklists (e.g., “3 steps to lock in accommodations before syllabus day”).
- Embed live chat/phone options for urgent requests.
- Provide example timelines (Orientation, add/drop, finals).

**Don’t do this:**
- Hide contact info inside PDFs.
- Assume every student knows DRC acronyms; always expand on first use.
- Require separate logins for barrier reports when SSO is possible.

---

## 2. Faculty & Instructors
**Executive summary:** Instructors rely on UCATT, DRC, and Accessibility resources to design inclusive courses, remediate media, and respond to accommodation notices. They need turnkey patterns and just-in-time consultations.[^ucatt][^drc][^access]

| Priority Task / Scenario                                            | Notes                                                                                                                        |
| ------------------------------------------------------------------- | ---------------------------------------------------------------------------------------------------------------------------- |
| Interpret DRC accommodation letters                                 | Provide sample workflows, confidentiality reminders, and DRC escalation contacts.[^drc]                                      |
| Retrofit / build courses in Brightspace with accessibility baked in | Bundle UCATT course design services, Brightspace Next updates, and Accessibility keyboard/heading guidance.[^ucatt][^access] |
| Caption and describe multimedia                                     | Offer captions decision tree (auto vs. professional), Panopto/Zoom tutorials, and DRC ASL/CART intake.[^ucatt][^drc]         |
| Create accessible documents, slide decks, and labs                  | Link to Accessibility documents guide, Quickstart references, and Adobe training for remediation.[^access][^quick]           |
| Communicate inclusive syllabus statements                           | Provide editable DRC syllabus template plus inclusive language checks.[^drc]                                                 |
| Design assessments that meet accommodations                         | Highlight UCATT assessment consulting, extended time settings, alt-format delivery.                                          |
| Request instructional design or multimedia support                  | Consolidate service catalog (UCATT intake, multimedia studio scheduling) with SLAs and readiness checklists.[^ucatt]         |

**Primary tools:** UCATT course-design intake, Instructor Help Center, DRC instructor portal, Accessibility consultation request, Adobe & Arizona curriculum resources.

**Why this matters:** Faculty actions determine whether UA meets WCAG conformance for LMS shells and satisfies §35.200 mobile/web rules; non-compliance risks DOJ enforcement and student grievances.[^title2]

**Do this:**
- Provide scenario-based playbooks (“If you get an accommodation letter mid-term, do X within 48 hours”).
- Tie accessibility to teaching excellence metrics and UCATT’s quality frameworks.

**Don’t do this:**
- Push faculty to external paywalls without UA vetting.
- Treat captions/proactive accessibility as optional or “nice-to-have.”

---

## 3. Staff & Administrative Units
**Executive summary:** Operational units manage procurement, events, HR processes, and internal systems. They need clarity on accessible procurement, facility planning, and digital asset reviews.[^buy][^campus][^access]

| Priority Task / Scenario                | Notes                                                                                                                                 |
| --------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------- |
| Buy or renew IT products                | Mandate VPAT review, procurement language, consultation triggers, and Trellis workflow embeds.[^buy]                                  |
| Host accessible events/meetings         | Surface DRC event planning guide, access statements, microphone/caption expectations, and post-event surveys.[^drc]                   |
| Update departmental sites / intranets   | Provide Quickstart building blocks, Accessibility keyboard/contrast checks, and contact for Arizona Digital support.[^quick][^access] |
| Respond to barrier reports              | Outline intake triage, expected response times, and cross-team escalation (Facilities + DRC + Digital Accessibility).[^               |
| campus][^drc]                           |
| Train staff on inclusive communications | Package micro-trainings (e.g., descriptive links, accessible PDFs) with completion tracking.                                          |
| Track compliance                        | Provide dashboards or templates for quarterly audits across top departmental systems.                                                 |

**Primary tools:** Buying Accessible IT guidance, DRC planning forms, Access Report workflow, Quickstart documentation, Accessibility consultation form.

**Why this matters:** Staff-owned systems fall under Title II program accessibility (§35.150) and procurement obligations; proactive planning reduces retrofit costs.

**Do this:**
- Publish a single intake map (“Need captions? Start here. Need procurement review? Start there.”).
- Align departmental OKRs with accessibility KPIs.

**Don’t do this:**
- Send staff to outdated PDFs with 2010 ADA references only.
- Allow “pilot” tools on campus without at least a preliminary accessibility check.

---

## 4. Web Developers (Arizona Sites & Custom Apps)
**Executive summary:** Developers need concrete WCAG 2.2 AA implementation guidance, Quickstart patterns, testing tools, and escalation paths for complex widgets.[^quick][^access]

| Priority Task / Scenario                | Notes                                                                                                                   |
| --------------------------------------- | ----------------------------------------------------------------------------------------------------------------------- |
| Build new Arizona Sites experience      | Reference Quickstart accessibility best practices, heading/link guidance, and component-specific tips.[^quick]          |
| Remediate legacy code                   | Provide prioritized defect lists (keyboard traps, contrast, forms) and link to Accessibility validation tools.[^access] |
| Implement skip links & focus management | Include UA standard snippet + testing instructions for screen readers.                                                  |
| Integrate third-party widgets           | Outline review checklist (VPAT, keyboard testing) and who approves exceptions.                                          |
| Automate testing                        | Recommend Pa11y/axe pipelines plus manual QA checklists aligned to UA standards.                                        |
| Request expert consults                 | Detail when to involve Digital Accessibility team vs. UCATT vs. vendors.                                                |

**Primary tools:** Quickstart docs, Accessibility testing page, Git/GitHub patterns, consultation intake.

**Why this matters:** WCAG 2.2 AA compliance is enforceable; failing to implement consistent components increases remediation debt and DOJ exposure.[^title2]

**Do this:**
- Provide code samples, not just policy text.
- Document keyboard interactions and ARIA usage for each component.

**Don’t do this:**
- Assume Quickstart defaults cover every use case—custom blocks still require review.
- Release new templates without accessibility sign-off.

---

## 5. Mobile App Developers
**Executive summary:** Mobile teams must meet Title II §35.200 mobile app requirements and align with WCAG-derived mobile patterns (e.g., focus order, gesture alternatives).[^
Title2]

| Priority Task / Scenario                               | Notes                                                                                                                    |
| ------------------------------------------------------ | ------------------------------------------------------------------------------------------------------------------------ |
| Integrate accessibility early in app sprints           | Provide mobile-specific checklists (platform accessibility APIs, color contrast, dynamic text) and tie to release gates. |
| Validate against WCAG 2.1/2.2 map for mobile           | Offer mapping between WCAG success criteria and iOS/Android implementation guides.                                       |
| Remediate legacy apps before April 2026/2027 deadlines | Create prioritized backlog referencing Title II compliance dates by entity size.[^title2]                                |
| Coordinate with Digital Accessibility for audits       | Outline cadence (e.g., annual mobile audit) and tooling (Xcode Accessibility Inspector, TalkBack).                       |
| Communicate updates to stakeholders                    | Provide template release notes documenting accessible changes for OCM/legal use.                                         |

**Primary tools:** Platform accessibility APIs, Accessibility consultation, DOJ Title II guidance, UCATT/IT help centers for app integrations.

**Why this matters:** Mobile apps explicitly fall under §35.200; lack of compliance can trigger complaints and removal from app stores.

**Do this:**
- Include disabled testers (students/staff) in pilot programs.
- Align design system tokens across web and mobile for consistent contrast.

**Don’t do this:**
- Treat mobile as outside WCAG scope.
- Delay fixes until after code freeze; incorporate into CI/CD quality gates.

---

## 6. Content Creators (Docs, Slides, PDFs, Google Workspace, Microsoft 365)
**Executive summary:** Content creators publish artifacts that often become “conventional electronic documents” under §35.104; they need platform-specific checklists and remediation support.[^access]

| Priority Task / Scenario                                   | Notes                                                                                                               |
| ---------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------- |
| Create accessible Word/Google Docs                         | Provide step-by-step use of built-in accessibility checkers, heading styles, alternative text, and export guidance. |
| Build accessible PowerPoint/Slides decks                   | Include template library with contrast-tested color palettes and caption placements.                                |
| Remediate PDFs                                             | Offer triage (source file fix vs. Adobe Acrobat tagging) and AZ Digital preferred vendors.                          |
| Publish accessible Outlook/Gmail communications            | Highlight descriptive subject lines, table alternatives, and accessible signatures.                                 |
| Store/share documents in OneDrive/SharePoint with metadata | Document how to flag accessible versions and sunset outdated files.                                                 |

**Primary tools:** Accessibility documents guide, Microsoft/Google checkers, Quickstart resources, consultation form.

**Why this matters:** DOJ exceptions for “preexisting conventional electronic documents” disappear when docs remain in active use; inaccessible files block legal compliance.[^title2]

**Do this:**
- Offer “before/after” samples per tool.
- Bundle office-hour sessions with templates.

**Don’t do this:**
- Convert everything to PDF by default.
- Assume automated checkers catch semantic issues (e.g., reading order).

---

## 7. Communications & Marketing
**Executive summary:** Comms teams control high-visibility content (newsrooms, social media, campaigns) and must blend brand voice with accessibility (contrast, captions, inclusive language).[^
access]

| Priority Task / Scenario               | Notes                                                                                             |
| -------------------------------------- | ------------------------------------------------------------------------------------------------- |
| Publish news posts and feature stories | Provide editorial checklist (heading hierarchy, descriptive links, alt text for hero images).     |
| Produce social media assets            | Document captioning for video, alt text for images, color contrast for story cards.               |
| Design email newsletters               | Include layout guidance (single-column, live text), bulletproof buttons, and text-only backups.   |
| Run campaigns/events                   | Integrate DRC access statements, RSVP accommodation fields, and inclusive imagery guidance.[^drc] |
| Monitor analytics & accessibility KPIs | Track bounce rates vs. accessibility defects to show ROI.                                         |

**Primary tools:** Accessibility marketing guide, Quickstart components, DRC event planning resources, brand center.

**Why this matters:** Comms outputs are public-facing and directly enforceable under WCAG/Title II; inclusive messaging also supports UA reputation and recruitment.

**Do this:**
- Provide ready-to-use caption templates and social alt-text examples.
- Incorporate accessibility review in editorial calendar.

**Don’t do this:**
- Embed text in images without HTML equivalents.
- Assume platform auto-captions are sufficient without QA.

---

## 8. Leadership / Executives
**Executive summary:** Leaders need a concise view of compliance risk, resource needs, and success metrics to champion accessibility across units.[^title2][^access]

| Priority Task / Scenario                    | Notes                                                                                                           |
| ------------------------------------------- | --------------------------------------------------------------------------------------------------------------- |
| Understand Title II timelines & obligations | Provide executive brief (two-page) highlighting April 2026/2027 deadlines, scope, and funding implications.     |
| Approve remediation budgets                 | Attach cost/benefit analysis referencing DOJ risk, peer benchmarks, and UA metrics.                             |
| Track KPIs & governance                     | Establish dashboard (top 50 sites status, consultation throughput, training completion) with quarterly reviews. |
| Sponsor cross-unit coordination             | Formalize governance charter linking Accessibility Team, DRC, UCATT, Equity, Procurement.                       |
| Communicate expectations campus-wide        | Issue memos aligning accessibility goals with UA strategic plan and DEI commitments.                            |

**Primary tools:** Executive Title II brief, governance charter, KPI dashboard, risk register.

**Why this matters:** Without leadership sponsorship, UA risks DOJ enforcement, loss of federal funding, and inconsistent student experiences.

**Do this:**
- Tie accessibility to mission outcomes (student success, research impact).
- Celebrate progress publicly to reinforce accountability.

**Don’t do this:**
- Treat accessibility as solely an IT issue.
- Delay funding decisions until after complaints arise.

---

## Cross-Persona Enablers
1. **Shared Content Blocks:** Maintain reusable markdown guidance (e.g., accessible docs, procurement steps) referenced across persona hubs to ensure consistency.
2. **Consultation Routing Map:** Visual decision tree connecting consultation forms (accessibility, captioning, procurement, DRC barrier) for quick triage.
3. **Outcome-Based Metrics:** Track how persona support shortens remediation time, increases caption coverage, or reduces complaints; report quarterly to leadership.

---

## References
Detailed citations are listed in `references.md` within this folder.

[^access]: "Getting Started" – Accessibility | Home — https://accessibility.arizona.edu (retrieved 2025-11-20).
[^drc]: Disability Resource Center — https://drc.arizona.edu (retrieved 2025-11-20).
[^ucatt]: UCATT Home — https://ucatt.arizona.edu (retrieved 2025-11-20).
[^quick]: Arizona Quickstart Accessible Content — https://quickstart.arizona.edu/best-practices/accessibility-guidelines (retrieved 2025-11-20).
[^campus]: Campus Accessibility portal — https://www.arizona.edu/campus-accessibility (retrieved 2025-11-20).
[^buy]: Buying Accessible IT — https://itaccessibility.arizona.edu/buying-accessible-it (retrieved 2025-11-20).
[^title2]: DOJ ADA Title II Regulations (2024 web & mobile requirements) — https://www.ada.gov/law-and-regs/regulations/title-ii-2010-regulations/ (retrieved 2025-11-20).
