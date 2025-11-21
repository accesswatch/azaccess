# Phase 4 — Page-Level Outlines
_Date: 2025-11-20_

These outlines translate the Phase 3 IA into concrete content plans for each major page. Every outline lists:
- **Purpose & audience**
- **Content sections with component notes**
- **Shared block references** (from `work/shared/` once created)
- **Key calls-to-action (CTAs)**
- **Authority links** (UA + vendor)

All pages require front matter with `title`, `summary`, `owner`, `last_reviewed`, `next_review`, and `tags` (persona, format, tool).

---

## 0. Shared Elements
- **Global skip link:** `Skip to main content` -> `#maincontent`.
- **Top alert ribbon:** surfaces Title II countdown or urgent notices; references `shared/site-alerts.md`.
- **Footer:** UA global footer + Accessibility contact info, disability statement, land acknowledgment, review date.

---

## 1. Home (`index.md`)
**Purpose:** Executive snapshot + quick pathways for every persona.

| Section                             | Content Notes                                                                                                            | Components & Blocks                                                                                                                                                  |
| ----------------------------------- | ------------------------------------------------------------------------------------------------------------------------ | -------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Hero                                | Title II countdown (April 24, 2026 / April 26, 2027), WCAG 2.2 AA status, CTA to executive brief.                        | Metric chips referencing `shared/title-ii-brief.md`                                                                                                                  |
| Build Accessibility Into Everything | Pulls from Accessibility “Getting Started” (keyboard, headings, contrast, documents, inclusive events).                  | Use cards referencing `shared/web-keyboard.md`, `shared/heading-basics.md`, `shared/color-contrast.md`, `shared/documents-overview.md`, `shared/events-inclusive.md` |
| Persona gateways                    | Tiles for Students, Faculty, Staff, Developers, Mobile, Content Creators, Communications, Leadership with top-task list. | Pull intros from `shared/persona-snippets.json`                                                                                                                      |
| Services & Consultations            | Visual map of consultation forms; highlight response SLAs.                                                               | Embed `shared/consultation-map.md` + `shared/service-levels.md`                                                                                                      |
| Metrics dashboard                   | KPI tiles (caption coverage, top 50 sites at WCAG 2.2, consultation throughput).                                         | `shared/metrics-kpis.md`                                                                                                                                             |
| Latest guidance & blog              | Teasers for Document & Media updates, Web/App updates, blog posts.                                                       | Include `shared/blog-cta.md`                                                                                                                                         |

Key CTAs: "Request an Accessibility Consultation," "View Title II Readiness," "Explore Persona Guides"

---

## 2. Personas Landing (`personas/index.md`)
**Purpose:** Direct visitors to persona hubs with clarity on tasks.

Sections:
1. **Intro:** Explains personas + how to use guides; link to consultation map.
2. **Persona cards grid:** Each card shows executive summary, top three tasks, key CTAs.
3. **Shared resources:** e.g., inclusive language guide, training calendar.

References: `shared/persona-template.md`, `shared/training-calendar.md`.

---

## 3. Persona Hubs (examples)
Create `personas/student.md`, `personas/faculty.md`, etc., using consistent template.

### Template Structure
1. **Hero summary:** Need statement + success metric.
2. **Top Tasks & Scenarios:** Table linking to UA workflows (DRC portal, UCATT help, etc.).
3. **Guidance Blocks:** Each scenario expands into steps, deadlines, "Do this/Don’t do this" accordions. Use `shared/do-dont.md`.
4. **Tools & Contacts:** Buttons for relevant forms, phone numbers.
5. **Training & Community:** Link to workshops, peer networks (e.g., Access at Adobe, UCATT events).
6. **Feedback:** Provide link to barrier report or contact form.

Each persona page references relevant shared blocks (e.g., `shared/doc-word.md` for content creators, `shared/mobile-roadmap.md` for mobile devs).

---

## 4. Document & Media Accessibility (`documents/index.md`)
**Purpose:** Provide actionable guidance by format/tool.

Sections:
1. **Executive Summary:** Why accessible docs matter; Title II references; CTA to training.
2. **Format Tabs:**
   - Microsoft 365 (Word, PowerPoint, Excel, Outlook) — link to `shared/doc-word.md`, `shared/doc-powerpoint.md`, `shared/doc-excel.md`, `shared/email-outlook.md` with checklists, video demos, references to Microsoft Accessibility and Disability Answer Desk.[^msft]
   - Google Workspace (Docs, Sheets, Slides, Gmail) — `shared/doc-google.md`, `shared/email-gmail.md`; include instructions for alt text, braille, captions referencing Google support articles.[^google]
   - Adobe (Acrobat, InDesign, Firefly, Premiere) — `shared/pdf-remediation.md`, `shared/adobe-media.md`; cite Adobe accessibility principles and Auto-tag API.[^adobe]
   - Media & Streaming (Panopto, Zoom, YouTube, social video) — `shared/media-captioning.md`, `shared/audio-description.md` referencing UCATT + Accessibility guidance.
3. **Quick Checklists:** Downloadable summaries (PDF/HTML) for each format.
4. **Examples library:** Before/after assets for syllabi, slide decks, newsletters.
5. **Tooling & Support:** Links to training, office hours, vendor support (Microsoft Disability Answer Desk, Google support, Adobe accessibility contact).

---

## 5. Web & App Accessibility (`web-app/index.md`)
**Purpose:** WCAG 2.2 AA implementation guidance for UA sites and apps.

Sections:
1. **Executive Summary & Title II alignment:** Outline April 2026/2027 compliance deadlines, fundamental alteration guidance.[^title2]
2. **Quickstart & Component Patterns:** Grid referencing Quickstart docs (headings, links, cards) plus code samples; embed `shared/skip-link-snippet.md`, `shared/focus-management.md`.
3. **WCAG 2.2 AA Checklist:** Organized by perceivable, operable, understandable, robust; map to UA components and tests.
4. **Testing Toolkit:** Manual + automated methods (axe, Accessibility Insights, Screen readers). Reference Microsoft Accessibility for AI/test tools, W3C WAI for guidance.[^msft][^wai]
5. **Mobile App Section:** Title II §35.200 scope, iOS/Android guidelines, Apple Developer references; include `shared/mobile-roadmap.md` and link to Apple API docs.[^apple]
6. **Exception & Equivalency Process:** Form to document undue burden/fundamental alteration claims; governance contact.
7. **Training & Community:** Link to Arizona Digital, UCATT developer meetups.

---

## 6. Teaching & Learning (LMS) (`teaching/index.md`)
**Purpose:** Centralize inclusive teaching workflows.

Sections:
1. **Executive summary:** Connect inclusive design with student success metrics and Title II communication requirements.
2. **Brightspace checklist:** Module for building accessible content, assessments, discussions; integrate `shared/lms-brightspace.md` referencing UCATT resources.[^ucatt]
3. **Media workflow:** Panopto, Zoom, VoiceThread captioning and transcripts; `shared/media-captioning.md`.
4. **Inclusive pedagogy playbooks:** Scenario-based guidance (STEM labs, writing courses, collaborative classrooms) with checklists.
5. **Events & Training:** UCATT workshops, AI teaching labs, Quickstart training.
6. **Support & escalation:** Instructor Help Center, DRC instructor portal, consultation form.

---

## 7. Procurement & Vendors (`procurement/index.md`)
**Purpose:** Ensure all IT purchases meet accessibility standards.

Sections:
1. **Executive summary:** Outline responsibilities (everyone shares accountability) referencing Buying Accessible IT.[^buy]
2. **Procurement workflow:** Step-by-step (identify need → gather VPAT → review with Accessibility team → contract clauses) using `shared/procurement-steps.md`.
3. **Templates & clauses:** Provide copy-ready RFP language, contract requirements, acceptance testing checklists; include Procure Access reference (Adobe participation).[^
adobe]
4. **VPAT evaluation:** Guidance on WCAG 2.x vs. EN 301 549; link to `shared/vpat-review.md` and vendor FAQ.
5. **Exception handling:** Document fundamental alteration/undue burden process, interim accommodations.
6. **Training & Office hours:** Schedule, contacts.

---

## 8. Tools & Checklists (`tools/index.md`)
**Purpose:** Single catalog of quick references.

Layout:
- Filterable list (persona, format, tool) backed by `shared/checklist-index.json`.
- Each entry includes summary, last reviewed date, download link.
- Featured tools: Accessibility Insights (Microsoft), WAVE, Colour Contrast Analyser, UA-specific templates.

---

## 9. Policies, Title II & Governance (`policies/index.md`)
**Purpose:** Communicate legal obligations, governance, review cadence.

Sections:
1. **Executive brief:** Title II §§35.130/35.200 overview, deadlines, scope. CTA to download PDF brief.
2. **Governance model:** Roles (Accessibility Team, DRC, UCATT, Equity, Procurement), meeting cadence, change control; `shared/governance-charter.md`.
3. **Resource registry:** Table from `shared/resource-registry.md` with filters.
4. **Review calendar:** Upcoming audits, release notes; references `shared/changelog.md`.
5. **Reporting pathways:** Link to compliance hotlines, DOJ contact info, Equity reporting.

---

## 10. Accessibility Blog (`blog/index.md` + post template)
**Purpose:** Share updates, case studies, success stories.

- **Index:** Tag filters (persona, format, tool, event). Feature cards include summary, date, last reviewed, CTA.
- **Post template:**
  1. Title
  2. Summary (≤ 160 characters)
  3. Publish date / Last reviewed
  4. Tags
  5. Executive takeaway block (two bullets)
  6. Body organized with headings, callout boxes for “Why this matters” and “Next steps”
  7. Related resources list referencing shared blocks.

---

## 11. Support & Consultations (`support/index.md`)
**Purpose:** Central triage for help requests.

Sections:
1. **Intro + service promise:** Response time expectations.
2. **Interactive decision map:** Start with “What do you need?” options (digital review, captioning, procurement, event planning, barrier report). Each path reveals CTA button (Forms, phone, email) and next steps. Powered by `shared/consultation-map.md`.
3. **Office hours & live support:** Calendar, contact methods, drop-in labs.
4. **Service catalog:** Table describing each service, owner, SLA.
5. **Feedback loop:** Link to satisfaction survey, barrier report, accessibility@arizona.edu email.

---

## Next Steps for Content Production
1. Create shared block files referenced above with tags and metadata.
2. Draft actual page content following these outlines, ensuring references to UA sites (Accessibility, DRC, UCATT, Quickstart, Buying Accessible IT) and vendor resources (Microsoft, Google, Apple, Adobe, W3C WAI, DOJ Title II).
3. Run each page through accessibility QA (headings, landmarks, skip links, color contrast examples) and document tests.

---

## References
Detailed citations listed in `references.md`.

[^msft]: Microsoft Accessibility — https://www.microsoft.com/en-us/accessibility
[^google]: Google Workspace Accessibility resources — https://workspace.google.com/learn-more/accessibility/ (menu links to Docs/Slides help)
[^adobe]: Accessibility at Adobe — https://www.adobe.com/accessibility.html
[^title2]: DOJ ADA Title II Regulations — https://www.ada.gov/law-and-regs/regulations/title-ii-2010-regulations/
[^wai]: W3C Web Accessibility Initiative — https://www.w3.org/WAI/
[^ucatt]: UCATT Home — https://ucatt.arizona.edu
[^buy]: Buying Accessible IT — https://itaccessibility.arizona.edu/buying-accessible-it
[^apple]: Apple Developer Accessibility — https://developer.apple.com/accessibility/
