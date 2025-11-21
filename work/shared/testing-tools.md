---
title: Accessibility Testing Toolkit
summary: Recommended manual and automated testing approaches for UA digital products.
owner: Digital Accessibility QA
last_reviewed: 2025-11-20
next_review: 2026-02-20
tags:
  - persona:developers
  - topic:testing
sources:
  - Accessibility | Home — https://accessibility.arizona.edu
  - Microsoft Accessibility (Accessibility Insights) — https://www.microsoft.com/en-us/accessibility
  - W3C Web Accessibility Initiative — https://www.w3.org/WAI/
---

## Testing layering strategy
1. **Design reviews**: Evaluate wireframes/prototypes against WCAG 2.2 AA before development.
2. **Automated scans**: Integrate Pa11y, axe-core, or Accessibility Insights for Web in CI/CD to catch programmatic issues early.
3. **Keyboard-only testing**: Verify focus order, visible focus states, trap avoidance, and activation with Enter/Space.
4. **Screen reader testing**: Use NVDA + Firefox (Windows), VoiceOver + Safari (macOS/iOS), TalkBack + Chrome (Android) for critical flows.
5. **Assistive tech pairings**: Expand to ZoomText, Dragon, Switch Control for high-impact services.

## Tool catalog
| Tool                                         | Purpose                                    | Notes                                                     |
| -------------------------------------------- | ------------------------------------------ | --------------------------------------------------------- |
| Accessibility Insights (Windows/Edge/Chrome) | FastPass automated + guided manual checks. | Provided by Microsoft; align results with WCAG mapping.   |
| axe DevTools / Pa11y CI                      | Automated rules engine                     | Integrate into pipelines; fail builds on critical issues. |
| WAVE                                         | Quick visual overlay for content editors.  | Spot color contrast, heading structure.                   |
| Lighthouse (Accessibility)                   | Performance + accessibility snapshot.      | Use in Chrome DevTools or CI.                             |
| Screen readers (NVDA, VoiceOver, TalkBack)   | Manual validation of semantics.            | Document expected announcements for components.           |
| Colour Contrast Analyser                     | Verify minimum ratios.                     | Required for custom palettes/imagery.                     |

## Documentation
- Log findings in Jira/DevOps with WCAG success criterion references.
- Attach screenshots, screen-reader transcripts, or videos for clarity.
- Track remediation SLA aligned with severity (e.g., critical blockers resolved before release).

## Support
- Digital Accessibility QA offers test plan templates and paired audits.
- Training available through Quickstart workshops and UCATT technology sessions.
