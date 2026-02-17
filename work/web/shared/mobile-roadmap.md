---
title: Mobile App Accessibility Roadmap
summary: A phased approach to making University of Arizona mobile applications accessible to all users, aligned with the 2026 Title II compliance deadline.
owner: Arizona Digital + Mobile App Guild
last_reviewed: 2026-01-15
next_review: 2026-04-15
tags:
  - persona:mobile-dev
  - format:apps
sources:
  - DOJ ADA Title II Regulations — https://www.ada.gov/law-and-regs/regulations/title-ii-2010-regulations/
  - Apple Developer Accessibility — https://developer.apple.com/accessibility/
  - Android Accessibility Developer Guide — https://developer.android.com/guide/topics/ui/accessibility
  - W3C Mobile Accessibility — https://www.w3.org/WAI/standards-guidelines/mobile/
  - Accessibility | Home — https://accessibility.arizona.edu
---

> This roadmap was developed in collaboration with the UA Mobile App Guild. If you are a mobile developer at Arizona, join our Slack channel `#ua-mobile-dev` for real-time support and monthly audit syncs.

## Overview

This roadmap outlines how mobile app teams at Arizona can systematically improve accessibility. Whether you're building a new app or improving an existing one, follow these phases to ensure your app works for everyone and meets our legal requirements under ADA Title II.

## Compliance Deadlines (Title II §35.200)

- **Entities ≥ 50,000 population:** Conform to WCAG 2.1 AA for web and mobile apps by **April 24, 2026**.
- **Entities < 50,000:** Deadline **April 26, 2027**. UA falls in the earlier window; treat April 2026 as the compliance target for flagship apps.

## Phase 1: Foundation (Weeks 1–4)

### Goals
- Establish baseline accessibility audit
- Fix critical blockers that prevent access entirely
- Set up automated testing in CI/CD pipeline

### Key Actions
- **Run accessibility scanner** — Use Accessibility Inspector (iOS) or Accessibility Scanner (Android)
- **Test with screen readers** — VoiceOver (iOS) and TalkBack (Android)
- **Fix missing labels** — Ensure all interactive elements have accessible names
- **Check touch targets** — Minimum 44×44 points (iOS) or 48×48 dp (Android)
- **Document current state** — Create accessibility backlog with prioritized issues

## Phase 2: Core Compliance (Weeks 5–12)

### Goals
- Achieve WCAG 2.1 Level AA for all core user flows
- Implement proper focus management
- Support Dynamic Type and display accommodations

### Key Actions
- **Semantic structure** — Use native components with proper roles and traits
- **Color contrast** — Minimum 4.5:1 for text, 3:1 for large text and UI components
- **Dynamic Type support** — Text scales from 100% to 235% without loss of functionality
- **Focus order** — Logical reading order that matches visual layout
- **Error handling** — Accessible error messages that identify the problem and solution
- **Motion** — Respect "Reduce Motion" system setting

## Phase 3: Enhanced Experience (Weeks 13–20)

### Goals
- Go beyond compliance to create an excellent accessible experience
- Optimize for assistive technology power users
- Ensure feature parity for all users

### Key Actions
- **Custom actions** — Add rotor actions (iOS) or custom accessibility actions (Android) for complex interactions
- **Live regions** — Announce dynamic content changes appropriately
- **Haptic feedback** — Provide tactile confirmation for important actions
- **Voice Control support** — Ensure app works with voice commands
- **Switch Control** — Test and optimize for switch access users

## Phase 4: Maintenance & Culture (Ongoing)

### Goals
- Prevent accessibility regressions
- Build accessibility into team culture
- Establish feedback channels with users

### Key Actions
- **Automated testing** — Run accessibility checks on every PR
- **Manual testing sprints** — Quarterly deep-dive testing with assistive technologies
- **User testing** — Include people with disabilities in usability studies
- **Team training** — Annual accessibility training for all developers
- **Documentation** — Maintain accessibility guidelines in your design system

## Implementation Checklist

- [ ] **Platform semantics:** Use native controls where possible; supply `accessibilityLabel`, `accessibilityHint`, and traits/roles.
- [ ] **Focus order & gestures:** Ensure logical focus traversal, provide alternatives for complex gestures, support external keyboards.
- [ ] **Dynamic text & display accommodations:** Respect user font size, Bold Text, High Contrast, Reduce Motion.
- [ ] **Color & contrast:** Adhere to 4.5:1 contrast; avoid color-only state indicators.
- [ ] **Notifications & haptics:** Offer text equivalents for audio cues, avoid disruptive autoplay.
- [ ] **Testing matrix:** Document devices/OS versions used for QA; include assistive tech combos (VoiceOver + Braille, TalkBack + Switch Access).

## Resources

- [Mobile Accessibility Guide](mobile.html) — Overview of mobile accessibility
- [Apple Accessibility Developer Documentation](https://developer.apple.com/accessibility/)
- [Android Accessibility Developer Guide](https://developer.android.com/guide/topics/ui/accessibility)
- [W3C Mobile Accessibility](https://www.w3.org/WAI/standards-guidelines/mobile/)
- [Testing Tools](testing-tools.html) — Tools for accessibility testing

## Need Help?

Contact [accessibility@arizona.edu](mailto:accessibility@arizona.edu) for guidance on mobile app accessibility, audit support, or questions about this roadmap.

- Mobile App Guild office hours for code reviews
- Digital Accessibility consultation intake for design reviews and audits
- Apple/Google partner contacts for escalations when platform bugs block compliance
