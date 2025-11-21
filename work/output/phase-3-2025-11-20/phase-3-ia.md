# Phase 3 — Information Architecture Blueprint
_Date: 2025-11-20_

## Executive Overview
The accessibility.arizona.edu redesign centers on a persona-driven, content-rich architecture that unifies UA’s distributed services (DRC, UCATT, Equity, Procurement, Arizona Digital) while anchoring every page in actionable guidance. The proposed IA honors the required top-level navigation (Home, Personas, Document & Media Accessibility, Web & App Accessibility, Teaching & Learning, Procurement & Vendors, Tools & Checklists, Policies/Title II, Accessibility Blog, Support & Consultations) and weaves in shared content blocks, canonical source references, and update cadences.

Key design tenets:
1. **Executive-summary-first** sections with progressive disclosure (accordions, tabbed blocks) to balance leadership needs and practitioner depth.
2. **Shared content registry** powering reusable guidance (e.g., “Accessible Word Basics”) to avoid duplicate editing and ensure consistent updates.
3. **Cross-system integration** with UCATT Brightspace resources, DRC forms, Campus Accessibility logistics, Quickstart components, and external vendor documentation (Microsoft, Google, Apple, Adobe) for format-specific help.[^ucatt][^drc][^campus][^quick][^msft][^google][^apple][^adobe]
4. **Compliance alignment** with DOJ Title II §35.200 web/mobile rule and WCAG 2.2 AA checkpoints.[^title2][^wai]

---

## Top-Level Navigation & Page Purpose
| Nav Item                            | Primary Audience(s)                                                                     | Purpose & Key Elements                                                                                                                                          | Shared Blocks Referenced                                                                                                               |
| ----------------------------------- | --------------------------------------------------------------------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------- | -------------------------------------------------------------------------------------------------------------------------------------- |
| **Home**                            | All personas                                                                            | Hero: Title II readiness ticker + executive CTA; featured pathways by persona; “Build accessibility into everything” anchors; metrics snapshot.                 | `shared/site-alerts.md`, `shared/metrics-kpis.md`                                                                                      |
| **Personas**                        | Students, Faculty, Staff, Developers, Mobile teams, Content creators, Comms, Leadership | Landing page with persona cards linking to dedicated hubs (from Phase 2). Each hub surfaces top tasks, UA workflows, “Why this matters,” and curated resources. | `shared/persona-template.md`, `shared/consultation-map.md`                                                                             |
| **Document & Media Accessibility**  | Content creators, communications, faculty                                               | Format-specific guides (Microsoft 365, Google Workspace, PDFs, Adobe, media). Includes quick checklists, examples, and vendor links.                            | `shared/doc-word.md`, `shared/doc-google.md`, `shared/pdf-remediation.md`, `shared/media-captioning.md`, `shared/email-newsletters.md` |
| **Web & App Accessibility**         | Web devs, Arizona Digital, app teams                                                    | WCAG 2.2 AA checklist, Quickstart patterns, skip-link guidance, mobile app timelines, testing toolkit, exception process.                                       | `shared/web-keyboard.md`, `shared/skip-link-snippet.md`, `shared/mobile-roadmap.md`, `shared/testing-tools.md`                         |
| **Teaching & Learning (LMS)**       | Faculty, instructional designers, students                                              | D2L Brightspace accessibility checklist, Panopto/Zoom/VoiceThread guidance, UCATT consultation intake, inclusive pedagogy playbooks.                            | `shared/lms-panopto.md`, `shared/lms-brightspace.md`, `shared/pedagogy-checklist.md`                                                   |
| **Procurement & Vendors**           | Staff, purchasing, IT leads                                                             | Buying Accessible IT workflow, VPAT intake, contract clauses, vendor FAQ, Procure Access linkage.                                                               | `shared/procurement-steps.md`, `shared/vpat-review.md`, `shared/vendor-faq.md`                                                         |
| **Tools & Checklists**              | All practitioners                                                                       | Master index of quick-reference PDFs/MD (keyboard testing, color contrast, doc prep), with filters by persona/format.                                           | `shared/checklist-index.json`                                                                                                          |
| **Policies, Title II & Governance** | Leadership, compliance                                                                  | Executive brief on §35.200 timelines, UA governance charter, review cadence calendar, resource registry, metrics.                                               | `shared/title-ii-brief.md`, `shared/governance-charter.md`, `shared/resource-registry.md`                                              |
| **Accessibility Blog**              | Campus community                                                                        | Taggable posts (personas, formats, UA stories). Includes template referencing shared intro/outro blocks and calls-to-action.                                    | `shared/blog-template.md`, `shared/blog-cta.md`                                                                                        |
| **Support & Consultations**         | All                                                                                     | Single intake map linking to consultation forms (Accessibility, DRC, Captioning, Procurement, Barrier reports), live support hours, SLAs.                       | `shared/consultation-map.md`, `shared/service-levels.md`                                                                               |

---

## Shared Content Registry (Initial Entries)
Store shared blocks under `work/shared/` with YAML front matter for tags.

| File                          | Description                                                                                    | Tags                                      | Canonical Source                                                     |
| ----------------------------- | ---------------------------------------------------------------------------------------------- | ----------------------------------------- | -------------------------------------------------------------------- |
| `shared/doc-word.md`          | Microsoft 365 Word checklist (styles, alt text, export, checker).                              | formats:word, personas:content-creators   | Microsoft Accessibility docs, UA Accessibility site.[^msft][^access] |
| `shared/doc-google.md`        | Google Docs/Slides/Sheets accessibility guidance (headings, alt text, braille, voice typing).  | formats:google, personas:content-creators | Google Workspace help.[^google]                                      |
| `shared/pdf-remediation.md`   | Acrobat tagging workflow, auto-tag API notes, vendor escalation.                               | formats:pdf                               | Adobe Acrobat resources.[^adobe]                                     |
| `shared/mobile-roadmap.md`    | Title II mobile compliance timeline, Apple/Android API pointers, testing tools.                | personas:mobile-dev, formats:apps         | DOJ Title II, Apple Developer, Android docs.[^title2][^apple]        |
| `shared/testing-tools.md`     | Manual + automated testing toolkit (axe DevTools, Accessibility Insights, VoiceOver/TalkBack). | personas:dev                              | W3C/WAI, Microsoft Accessibility (Accessibility Insights).[^         |
| wai][^msft]                   |
| `shared/consultation-map.md`  | Visual decision tree for all UA consultation and request forms.                                | personas:all                              | UA forms (Accessibility, DRC, Procurement, Captioning).[^            |
| drc][^buy]                    |
| `shared/resource-registry.md` | Table of authoritative sources with owner, review frequency, next-review date.                 | governance                                | UA + external references.                                            |

---

## Canonical Source Mapping
| Topic                                      | UA Canonical Source                           | External Reference                                | Notes                                                                                                                                                       |
| ------------------------------------------ | --------------------------------------------- | ------------------------------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Student accommodations & barrier reporting | DRC portal                                    | DOJ Title II §35.130 for program access           | Mirror DRC forms and escalate compliance language.[^drc][^title2]                                                                                           |
| Digital content basics                     | Accessibility “Getting Started”, Quickstart   | W3C WAI tutorials                                 | UA copy includes local procedures; WAI for deeper dives.[^access][^quick][^wai]                                                                             |
| Microsoft 365 docs                         | UA shared block referencing Accessibility hub | Microsoft Accessibility (Disability Answer Desk)  | Link to Microsoft training and support channels.[^msft]                                                                                                     |
| Google Workspace docs                      | UA shared block                               | Google Workspace Accessibility (support articles) | Provide alt-text instructions for Gmail/Docs/Slides despite 404 landing page by linking directly to support articles surfaced via Learning Center.[^google] |
| Apple mobile development                   | UA mobile/app page                            | Apple Developer Accessibility docs                | Provide API samples and testing steps for VoiceOver, Switch Control.[^apple]                                                                                |
| Adobe creative tools                       | UA Document & Media hub (Adobe & Arizona)     | Adobe Accessibility portal (VPATs, initiatives)   | Highlight Firefly, Premiere, Acrobat features.[^adobe]                                                                                                      |
| Web standards                              | UA Web & App hub                              | W3C WAI + DOJ Title II                            | Map WCAG 2.2 AA success criteria to UA patterns.[^wai][^title2]                                                                                             |

---

## Page-Level Structural Patterns
- **Hero pattern:** Summary + CTA + metric chip (e.g., "% of top sites at WCAG 2.2 AA").
- **Persona hubs:** Two-column layout (left nav sticky with top tasks; right column with guidance + resource cards). Use accordions for "Do this/Don’t do this" to reduce scrolling.
- **Guidance pages (Document & Media, Web & App):** Tabbed component for Executive Summary, Key Actions, Quick Checklist, Examples, UA/Vendor References.
- **Blogs:** Standard template with metadata (title, summary, published/last reviewed, tags, related resources) and accessible card grid for index.
- **Support page:** Roving-tabindex-friendly interactive map; each decision node has explicit link text (e.g., “Request IT Accessibility consultation (Forms – requires NetID)”).

---

## Metadata & Governance
- Every page includes front matter: `title`, `summary`, `last_reviewed`, `owner`, `next_review`. Automate reminders via resource registry.
- Publish quarterly release notes (mini changelog) referencing `shared/changelog.md`.
- Cross-link to Equity policy statements rather than duplicating text; highlight procurement obligations referencing Procure Access initiative.[^adobe]

---

## Integration Checklist
1. **UCATT:** Embed CTA blocks for Brightspace Next, Instructor Help Center, Adobe curriculum support on Teaching & Learning page.[^ucatt]
2. **DRC:** Surface Connect forms, ASL/CART request, barrier reporting, accessible events guide on Personas (Students, Staff) and Support page.[^drc]
3. **Campus Accessibility:** Link transportation, facilities, event space info within Support & Personas.[^campus]
4. **Quickstart / Arizona Digital:** Reference Quickstart accessibility guidelines, component docs, and training offerings on Web & App hub.[^quick]
5. **Procurement (Buying Accessible IT):** Centralize VPAT guidance, Trellis forms, and contact info on Procurement & Vendors page.[^buy]
6. **External Vendors:** Provide deep links to Microsoft, Google, Apple, Adobe accessibility docs within Document & Media and Web & App hubs to ensure tool-specific accuracy.[^msft][^google][^apple][^adobe]

---

## Next Actions
- ✅ Define IA structure and shared block registry.
- ☐ Build shared markdown blocks (`shared/*.md`) and hook them into persona/content pages (Phase 4 outlines).
- ☐ Draft governance metadata automation script (future task).

---

## References
Full citations live in `references.md` for this phase.

[^access]: Accessibility | Home — https://accessibility.arizona.edu
[^drc]: Disability Resource Center — https://drc.arizona.edu
[^campus]: Campus Accessibility portal — https://www.arizona.edu/campus-accessibility
[^ucatt]: UCATT Home — https://ucatt.arizona.edu
[^quick]: Quickstart Accessible Content — https://quickstart.arizona.edu/best-practices/accessibility-guidelines
[^buy]: Buying Accessible IT — https://itaccessibility.arizona.edu/buying-accessible-it
[^title2]: DOJ ADA Title II Regulations — https://www.ada.gov/law-and-regs/regulations/title-ii-2010-regulations/
[^wai]: W3C Web Accessibility Initiative — https://www.w3.org/WAI/
[^msft]: Microsoft Accessibility — https://www.microsoft.com/en-us/accessibility
[^google]: Google Workspace Accessibility (workspace.google.com/learn-more/accessibility – 404 landing, but navigation exposes product accessibility resources)
[^apple]: Apple Developer Accessibility — https://developer.apple.com/accessibility/
[^adobe]: Adobe Accessibility — https://www.adobe.com/accessibility.html
