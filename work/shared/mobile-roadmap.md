---
title: Mobile App Accessibility Roadmap
summary: Timeline and tasks to meet DOJ Title II §35.200 web & mobile requirements for UA-managed apps.
owner: Arizona Digital + Mobile App Guild
last_reviewed: 2025-11-20
next_review: 2026-02-20
tags:
  - persona:mobile-dev
  - format:apps
sources:
  - DOJ ADA Title II Regulations — https://www.ada.gov/law-and-regs/regulations/title-ii-2010-regulations/
  - Apple Developer Accessibility — https://developer.apple.com/accessibility/
  - Accessibility | Home — https://accessibility.arizona.edu
---

## Compliance deadlines (Title II §35.200)
- **Entities ≥ 50,000 population:** Conform to WCAG 2.1 AA for web and mobile apps by **April 24, 2026**.
- **Entities < 50,000:** Deadline **April 26, 2027**. UA falls in the earlier window; treat April 2026 as the compliance target for flagship apps.

## Roadmap phases
1. **Inventory (Now – Dec 2025)**
   - Catalog all UA-owned or branded mobile apps (iOS, Android, cross-platform) with owners, frameworks, usage.
   - Document accessibility status, last audit date, and critical user flows.
2. **Design system alignment (Jan – Mar 2026)**
   - Map UA design tokens to platform accessibility APIs (Dynamic Type, High Contrast, Dark Mode, semantic colors).
   - Provide component guidance for focus indicators, accessible gestures, and error messaging.
3. **Audit & remediation (Feb – Sep 2026)**
   - Prioritize apps with student services, payments, academic data.
   - Conduct manual + automated testing (VoiceOver, TalkBack, Switch Control, Accessibility Scanner, Xcode Accessibility Inspector).
   - Log defects in shared backlog with severity tied to WCAG criteria.
4. **Ongoing governance (Oct 2026 onward)**
   - Embed accessibility gates in CI/CD (lint rules, snapshot tests for Dynamic Type, automated contrast checks).
   - Schedule annual audits and regression testing each release.

## Implementation checklist
- [ ] **Platform semantics:** Use native controls where possible; supply `accessibilityLabel`, `accessibilityHint`, and traits/roles.
- [ ] **Focus order & gestures:** Ensure logical focus traversal, provide alternatives for complex gestures, support external keyboards.
- [ ] **Dynamic text & display accommodations:** Respect user font size, Bold Text, High Contrast, Reduce Motion.
- [ ] **Color & contrast:** Adhere to 4.5:1 contrast; avoid color-only state indicators.
- [ ] **Notifications & haptics:** Offer text equivalents for audio cues, avoid disruptive autoplay.
- [ ] **Testing matrix:** Document devices/OS versions used for QA; include assistive tech combos (VoiceOver + Braille, TalkBack + Switch Access).

## Support
- Mobile App Guild office hours for code reviews.
- Digital Accessibility consultation intake for design reviews and audits.
- Apple/Google partner contacts for escalations when platform bugs block compliance.
