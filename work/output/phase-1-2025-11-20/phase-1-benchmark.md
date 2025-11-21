# Phase 1 — Benchmark & Gap Analysis
_Date: 2025-11-20_

## Executive Summary
The University of Arizona (UA) maintains a distributed accessibility ecosystem (IT Accessibility, Disability Resource Center, UCATT, Equity, Campus Accessibility portal) that provides authoritative guidance, yet the experience is fragmented, policy updates lag the new 2024 ADA Title II web and mobile requirements, and persona-specific support is inconsistent. Benchmarking UA assets against peer exemplars (University of Washington Accessibility, W3C WAI, WebAIM) and federal expectations (DOJ Title II regulations) reveals 18 high-impact gaps across governance, content architecture, tooling, and change management. Addressing these gaps will clarify ownership, streamline journeys for students/faculty/staff, and ensure compliance with WCAG 2.2 AA and the April 2026/2027 Title II timelines for WCAG 2.1 conformance.

## Benchmark Inputs & Method
| Category            | UA Source                                                   | Peer / Regulatory Source                      | Notes                                                                                                                                                              |
| ------------------- | ----------------------------------------------------------- | --------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| Central guidance    | accessibility.arizona.edu “Getting Started” hub             | W3C WAI “Making the Web Accessible” overview  | UA site offers key links but lacks persona framing and WCAG/Title II roadmap.[^ua-home][^wai]                                                                      |
| Service delivery    | Disability Resource Center (DRC) site                       | University of Washington Accessibility portal | DRC presents comprehensive services yet navigation errors remain (404s) vs. UW’s consistent pathways.[^drc][^uw]                                                   |
| Teaching enablement | UCATT home, Quickstart best practices                       | WebAIM resource portal                        | UCATT highlights teaching innovation but does not tie accessibility practices to UCATT tooling the way WebAIM links training to services.[^ucatt][^quick][^webaim] |
| Compliance & policy | Office of Institutional Equity, Campus Accessibility portal | DOJ Title II revised final rule (2024)        | OU Equity site explains reporting but lacks Title II web/mobile specifics now mandated by DOJ.[^oie][^title2]                                                      |

_Method_: reviewed navigation, content depth, calls-to-action, and update cadence; mapped findings to UA personas, WCAG 2.2 AA techniques, and Title II §35.200 deadlines.

## Observable Strengths
- Digital Accessibility team already routes to consultation forms and captioning, indicating mature service intake.[^ua-home]
- Campus Accessibility portal consolidates facilities, transportation, and event planning resources that other universities scatter.[^campus]
- UCATT showcases D2L Brightspace modernization, Adobe partnerships, and AI workshops that can anchor inclusive pedagogy stories.[^ucatt]
- Quickstart publishes practical content authoring tips (headings, links, captions) aligned with WCAG techniques.[^quick]
- Equity site clearly states reporting pathways and mission, offering a governance anchor once digital requirements are integrated.[^oie]

## High-Impact Gap Inventory (18 items)
| #   | Gap Theme                                                    | Description & Evidence                                                                                                                      | Impact                                          | Proposed UA Owner                 |
| --- | ------------------------------------------------------------ | ------------------------------------------------------------------------------------------------------------------------------------------- | ----------------------------------------------- | --------------------------------- |
| 1   | Title II readiness                                           | No UA hub maps DOJ §35.200 WCAG 2.1 deadlines (2026/2027) for executive audiences.[^title2]                                                 | Compliance risk, unclear funding requests       | CIO + Equity + Legal              |
| 2   | Persona navigation                                           | Current homepage lists resources alphabetically; no persona entrances (students, faculty, staff, devs) unlike UW’s top-level nav.[^uw]      | Users spend extra clicks, inconsistent journeys | Digital Accessibility team        |
| 3   | Content duplication                                          | Buying Accessible IT, Tutorials, and Guidelines repeat procurement language without single authoritative workflow.[^buy]                    | Confusion during vendor reviews                 | Procurement + Accessibility       |
| 4   | Broken / redirected links                                    | DRC subpages and UCATT accessibility URL return 404/redirect notices.[^drc][^ucatt404]                                                      | Lost trust, SEO penalties                       | DRC Comms + UCATT Web             |
| 5   | Missing executive summary layer                              | None of the UA pages offer ADA Title II + WCAG 2.2 one-pagers for cabinet leaders.[^ua-home]                                                | Leadership underestimates urgency               | Accessibility program office      |
| 6   | Template inconsistency                                       | Quickstart guidance is informative but not referenced on Accessibility site, leaving site builders unsure which blocks to reuse.[^quick]    | Slower site launches, inconsistent components   | Arizona Digital                   |
| 7   | LMS-specific guidance gap                                    | UCATT highlights Brightspace but lacks explicit accessibility checklist for D2L modules, Panopto captions, VoiceThread transcripts.[^ucatt] | Instructors improvise fixes                     | UCATT + DRC                       |
| 8   | Document/media coverage gaps                                 | Accessibility hub links to “Creating Content” but lacks detailed Word/PDF/Google guidance requested in new scope.[^ua-home]                 | Content creators miss requirements              | Digital Accessibility + Libraries |
| 9   | Lack of shared resource registry                             | No published inventory of external references (WebAIM, W3C, DOJ) with review cadence.[^wai][^webaim][^title2]                               | Harder to prove currency                        | Accessibility PMO                 |
| 10  | Consultation intake fragmentation                            | Multiple forms (consultation, captioning, barrier reporting) exist but are not listed together with use cases.[^ua-home][^campus]           | Users submit wrong form                         | DRC Service Design                |
| 11  | Missing skip links / bypass instructions in prototypes       | Benchmark did not find skip-to-content pattern guidance despite requirement in agent brief.[^quick]                                         | Accessibility regressions on new builds         | Arizona Digital                   |
| 12  | No accessibility metrics dashboard                           | UCATT and Accessibility sites cite successes but no shared KPIs (remediation cycle time, training coverage).                                | Hard to justify investments                     | CIO Office                        |
| 13  | Limited storytelling for leadership                          | Equity site focuses on compliance; lacks success metrics or transformation narrative to brief executives.[^oie]                             | Reduced executive sponsorship                   | Equity + Accessibility Comms      |
| 14  | Event accessibility guidance scattered                       | DRC planning page exists but not surfaced on Accessibility home or UCATT events section.[^campus][^drc]                                     | Event planners unaware of requirements          | Event Services + DRC              |
| 15  | Procurement language not integrated into Trellis/Trios forms | Buyers must manually copy text; no templated questions surfaced in e-procurement workflows.[^buy]                                           | Slower purchases, missed EIT rubric             | Procurement                       |
| 16  | Mobile app accessibility guidance absent                     | Title II §35.200 explicitly covers apps; UA content only discusses web.[^title2]                                                            | Mobile experiences fall out of scope            | Mobile App teams                  |
| 17  | No central change log                                        | Sites rarely mention “last reviewed” (Quickstart does not timestamp). Peer UW site emphasizes updates.[^uw]                                 | Stakeholders question currency                  | Accessibility PMO                 |
| 18  | Training pathways unclear                                    | WebAIM offers defined courses; UA pages link to resources but not a tiered curriculum for UA audiences.[^webaim]                            | Uneven skill development                        | UCATT + HR Learning               |

## Strategic Recommendations
1. **Launch Executive Readiness Brief** — Publish a two-page summary of Title II §35.200 timelines, WCAG 2.2 outcomes, funding implications, and current UA posture for leadership briefings.
2. **Persona-based IA Refresh** — Implement top-level navigation for Students, Faculty & Instructors, Staff/Units, Developers, Communications/Marketing, Leadership, mirroring UW’s clarity but localized with UA services.
3. **Shared Content Registry** — Stand up `work/shared/` markdown blocks (Word, PDF, media, procurement, LMS) tagged by persona/format; reference them from every page to eliminate duplication.
4. **Accessible Workflow Integrations** — Embed procurement accessibility clauses and VPAT upload requirements into Trellis/Trios forms; align with UCATT course design intake and DRC consultation forms for consistent triage.
5. **Publish Measurement & Review Cadence** — Define KPIs (e.g., percent of top 50 sites on WCAG 2.2 AA, consultation SLA, caption turnaround) and include “last reviewed” metadata per page; align to quarterly external resource review.

## Readiness for Phase 2 (Personas & Scenarios)
To progress to Phase 2, confirm:
- Persona list (students, faculty/instructors, staff/units, developers, mobile/web teams, content creators, comms/marketing, leadership) and top 8–12 tasks each.
- System owners for consultation forms, captioning, procurement, LMS, and event planning to validate workflows.
- Current inventory of UA digital properties prioritized for remediation (top 50 sites, LMS shells, mobile apps).

## Next Steps Checklist
- ✅ Capture baseline benchmarks and 18 gaps.
- ☐ Secure stakeholder alignment meeting (CIO, DRC, UCATT, Equity) to validate findings.
- ☐ Approve scope for shared content registry and persona IA (Phases 2–4).
- ☐ Initiate data collection for KPIs and resource registry metadata (owner, review frequency, next review date).

## References
See `references.md` in this folder for detailed citations.

[^ua-home]: Accessibility | Home — https://accessibility.arizona.edu (retrieved 2025-11-20 via fetch_webpage)
[^wai]: W3C WAI — https://www.w3.org/WAI/ (retrieved 2025-11-20)
[^drc]: Disability Resource Center — https://drc.arizona.edu (retrieved 2025-11-20 via r.jina.ai mirror; noted 404s)
[^uw]: University of Washington Accessibility — https://www.washington.edu/accessibility/ (retrieved 2025-11-20)
[^ucatt]: UCATT Home — https://ucatt.arizona.edu (retrieved 2025-11-20)
[^ucatt404]: UCATT accessibility page 404 — https://ucatt.arizona.edu/accessibility (retrieved 2025-11-20)
[^quick]: Arizona Quickstart Accessibility Guidelines — https://quickstart.arizona.edu/best-practices/accessibility-guidelines (retrieved 2025-11-20)
[^webaim]: WebAIM portal — https://webaim.org (retrieved 2025-11-20)
[^oie]: Office of Institutional Equity — https://equity.arizona.edu (retrieved 2025-11-20)
[^title2]: DOJ ADA Title II Regulations (2024 web & mobile + WCAG 2.1) — https://www.ada.gov/law-and-regs/regulations/title-ii-2010-regulations/ (retrieved 2025-11-20)
[^campus]: UA Campus Accessibility portal — https://www.arizona.edu/campus-accessibility (retrieved 2025-11-20)
[^buy]: Buying Accessible IT — https://itaccessibility.arizona.edu/buying-accessible-it (retrieved 2025-11-20)
