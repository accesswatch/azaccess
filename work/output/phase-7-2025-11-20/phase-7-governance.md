# Phase 7 — Governance & Continuous Improvement Plan
_Date: 2025-11-20_

This plan operationalizes ongoing governance, change management, and automation for accessibility.arizona.edu and related services.

---

## 1. Governance Structure
| Role                                     | Responsibilities                                                           | Cadence                                  |
| ---------------------------------------- | -------------------------------------------------------------------------- | ---------------------------------------- |
| Executive Sponsor (CIO/Provost designee) | Approves roadmap/budget, escalates cross-unit mandates.                    | Quarterly Steering Committee             |
| Accessibility Program Office             | Maintains roadmap, KPIs, shared content registry, change log, crosswalk.   | Monthly Ops Standup + quarterly steering |
| Digital Accessibility Team               | Consultations, audits, remediation guidance, shared block maintenance.     | Weekly sprint reviews                    |
| DRC                                      | Student accommodations, event access, barrier reports, instructor support. | Weekly sync with Accessibility team      |
| UCATT                                    | Teaching & learning tooling, multimedia services, training calendar.       | Bi-weekly with Accessibility team        |
| Procurement + Legal                      | Enforce accessible purchasing workflows, VPAT tracking, contract clauses.  | Monthly                                  |
| Arizona Digital                          | CMS, Quickstart patterns, prototypes, front-end QA.                        | Bi-weekly design/dev sync                |

---

## 2. Processes
### 2.1 Change Log
- Use `shared/changelog.md` to record each release (date, change summary, owner).
- Mirror entries in project tracker (Jira/ADO) for traceability; publish quarterly highlights to leadership.

### 2.2 Resource Registry
- `shared/resource-registry.md` lists authoritative sources with review dates.
- Automation: schedule reminders 30 days before `next_review` via Trellis/Power Automate; owners confirm updates or document rationale if source unchanged.

### 2.3 Content Lifecycle
1. **Plan** (quarterly): Prioritize pages/blocks for refresh based on analytics, user feedback, compliance gaps.
2. **Draft**: Update markdown in `work/shared/` or `work/output/` branches; cite UA + vendor sources.
3. **Review**: Accessibility PMO + content owner review; optional SME check (DRC, UCATT, Procurement).
4. **Publish**: Merge to main branch, trigger automated site build, run regression tests.
5. **Verify**: Conduct spot checks (keyboard, screen reader, automated scan) and record in QA log.

### 2.4 Consultation & Service Levels
- Follow `shared/service-levels.md`; monitor SLA compliance monthly.
- Escalate high-risk issues (Title II exposure, legal complaints) to Executive Sponsor within 24 hours.

### 2.5 Exception Handling
- Fundamental alteration or undue burden claims must include: description, impacted criteria, alternative access plan, approval by Legal + Executive Sponsor.
- Track exceptions in a secure log; review quarterly to retire resolved cases.

---

## 3. Automation & Tooling
| Automation                | Description                                                                           | Owner                                       | Status                       |
| ------------------------- | ------------------------------------------------------------------------------------- | ------------------------------------------- | ---------------------------- |
| Resource review reminders | Power Automate flow reads `resource-registry.md`, emails owners before review dates.  | Accessibility PMO                           | Planned (Feb 2026)           |
| Link/contrast monitoring  | SiteImprove or equivalent monitors top sites for broken links, contrast regressions.  | Digital Accessibility                       | Active                       |
| CI accessibility gate     | axe-core / Accessibility Insights CLI runs on pull requests for prototypes/templates. | Arizona Digital                             | Active                       |
| KPI dashboard             | Power BI pulling from SiteImprove, ServiceNow/Trellis, Panopto analytics.             | Accessibility PMO + Institutional Analytics | In progress (pilot Jan 2026) |
| VPAT tracker              | Trellis form feeding dashboard for procurement reviews, remediation status.           | Procurement                                 | Planned (Jan 2026)           |

---

## 4. Metrics & Reporting
- **Quarterly Steering Pack:** KPI snapshot (`shared/metrics-kpis.md`), crosswalk updates, major risks, training stats.
- **Annual Report:** Summary of progress vs. Title II roadmap, budget needs, success stories, upcoming priorities.
- **Public Transparency:** Publish high-level metrics and change log entries on the site to demonstrate accountability.

---

## 5. Training & Capacity
| Audience          | Requirement                                                    | Delivery                                      |
| ----------------- | -------------------------------------------------------------- | --------------------------------------------- |
| Content creators  | Complete Document & Media 101 or equivalent before CMS access. | UCATT workshops + recorded modules            |
| Developers        | Complete WCAG 2.2 + testing training annually.                 | Arizona Digital sessions + self-paced modules |
| Procurement staff | Annual refresher on VPAT review & accessible contracts.        | Procurement + Accessibility joint workshop    |
| Leadership        | Biannual Title II readiness briefing.                          | Accessibility PMO                             |

Track completion via LMS or Trellis, linking to NetID. Non-compliance escalates to supervisors.

---

## 6. Feedback & Continuous Improvement
- Collect feedback via consultation follow-up surveys, site feedback form, and Accessibility Advisory Board meetings.
- Analyze ServiceNow/Trellis data for recurring pain points to inform roadmap.
- Host quarterly community forums (students, faculty, staff) to share updates and gather input.

---

## 7. Next-Year Priorities (2026)
1. Complete WCAG 2.2 AA audits for all top-50 public sites and mobile apps before April 2026.
2. Automate shared-block linting (front matter completeness, link validation, style checks).
3. Expand persona coverage with multilingual summaries and alternate formats.
4. Launch Support & Consultations interactive map with analytics on request types.
5. Establish Title II compliance playbook for colleges/units with decentralized sites.

---

## References
- Accessibility | Home — https://accessibility.arizona.edu
- UCATT — https://ucatt.arizona.edu
- Disability Resource Center — https://drc.arizona.edu
- Buying Accessible IT — https://itaccessibility.arizona.edu/buying-accessible-it
- DOJ ADA Title II Regulations — https://www.ada.gov/law-and-regs/regulations/title-ii-2010-regulations/
- W3C Web Accessibility Initiative — https://www.w3.org/WAI/
