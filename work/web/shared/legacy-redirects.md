---
title: Legacy Link Crosswalk
summary: Map high-traffic bookmarks from itaccessibility.arizona.edu, accessibility.arizona.edu, and drc.arizona.edu to new destinations.
owner: Accessibility Program Office
last_reviewed: 2025-11-20
next_review: 2026-02-20
tags:
  - topic:redirects
  - topic:governance
sources:
  - UA Google Analytics exports (Oct 2025)
  - Legacy site audits (Oct–Nov 2025)
---

| Legacy URL / bookmark                                          | Primary audience    | Notes                                   | New destination                                                                                               |
| -------------------------------------------------------------- | ------------------- | --------------------------------------- | ------------------------------------------------------------------------------------------------------------- |
| https://itaccessibility.arizona.edu/                           | Staff, vendors      | Legacy IT Accessibility landing page.   | `home.html` (new Accessibility Home)                                                                          |
| https://itaccessibility.arizona.edu/buying-accessible-it       | Procurement staff   | Buying Accessible IT workflow.          | `work/web/procurement.html` (Procurement hub)                                                                 |
| https://itaccessibility.arizona.edu/buying-accessible-it/tools | Procurement staff   | Vendor tools & VPAT templates.          | `work/shared/procurement-steps.md` & `work/shared/vpat-review.md`                                             |
| https://itaccessibility.arizona.edu/get-help                   | Campus partners     | Consultation/contact form.              | `work/web/support.html` (Support & Consultations)                                                             |
| https://itaccessibility.arizona.edu/testing                    | Web developers      | Testing recommendations/axe references. | `work/shared/testing-tools.md` + `work/web/web-app.html`                                                      |
| https://itaccessibility.arizona.edu/training                   | Faculty/staff       | Training calendar + resources.          | `work/shared/training-calendar.md`                                                                            |
| https://accessibility.arizona.edu/faculty                      | Faculty/instructors | Legacy persona snippet.                 | `work/web/persona-faculty.html`                                                                               |
| https://accessibility.arizona.edu/staff                        | Staff/admin         | Legacy persona snippet.                 | `work/web/persona-staff.html`                                                                                 |
| https://accessibility.arizona.edu/students                     | Students            | Legacy persona snippet.                 | `work/web/persona-students.html`                                                                              |
| https://accessibility.arizona.edu/blog                         | Campus-wide         | News posts archive.                     | `work/web/blog.html`                                                                                          |
| https://drc.arizona.edu/asl-cart                               | Public, students    | ASL/CART request (canonical).           | Keep existing URL; reference in `work/web/persona-public.html` and `work/web/support.html`                    |
| https://drc.arizona.edu/report-barrier                         | Public, students    | Barrier report pointer.                 | `https://hood.accessiblelearning.com/s-Arizona/AccessReport.aspx` (already linked in Support & persona pages) |
| https://drc.arizona.edu/accommodations                         | Students            | Accommodation overview.                 | `work/web/persona-students.html` (top tasks)                                                                  |

## Implementation notes
1. Publish these redirects in the new site’s CMS/router so legacy bookmarks resolve automatically.
2. For links that must stay on DRC (ASL/CART, Access Report), highlight them on relevant persona/support pages so users landing here can find them quickly.
3. Review quarterly with UA Communications to ensure decommissioned pages continue to point to this hub until the legacy domains retire.
