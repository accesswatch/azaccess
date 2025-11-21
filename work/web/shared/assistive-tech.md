---
title: Assistive Technology Coverage
summary: Required assistive technologies for testing, training, and support across personas.
owner: Digital Accessibility QA + DRC
last_reviewed: 2025-11-20
next_review: 2026-02-20
tags:
  - topic:assistive-technology
sources:
  - Freedom Scientific (JAWS, Fusion, ZoomText) — https://www.freedomscientific.com/
  - NV Access (NVDA) — https://www.nvaccess.org/
  - Apple VoiceOver — https://www.apple.com/accessibility/voiceover/
  - Google TalkBack — https://support.google.com/accessibility/android/answer/6007100
---

| Assistive Tech               | Platform                                | Key Use Cases                                                                                                               |
| ---------------------------- | --------------------------------------- | --------------------------------------------------------------------------------------------------------------------------- |
| **JAWS for Windows**         | Windows desktop (Edge, Chrome, Firefox) | Primary screen reader for many students/staff; test forms, tables, dynamic widgets.                                         |
| **NVDA**                     | Windows desktop                         | Free/open-source screen reader; use with Firefox for standards-aligned testing.                                             |
| **VoiceOver**                | macOS, iOS, iPadOS                      | Required for all Apple devices; test Safari navigation, rotor interactions, mobile gestures.                                |
| **TalkBack**                 | Android                                 | Validate touch gestures, focus order, and announcements on Android apps/webviews.                                           |
| **Fusion (JAWS + ZoomText)** | Windows                                 | Combination of screen reader + magnifier used by low-vision power users; ensure apps run smoothly with large text + speech. |
| **ZoomText**                 | Windows                                 | Magnification and color adjustments for low vision; verify layouts don’t break at 200%+ zoom.                               |

## Expectations
- **All personas** must understand how their deliverables impact people using these AT solutions.
- **Testing**: Critical journeys should be tested with at least JAWS or NVDA, plus VoiceOver/TalkBack for mobile. Include ZoomText/Fusion for visual zoom scenarios.
- **Training**: Offer intro sessions for students/faculty/staff on using AT with UA platforms; partner with DRC for licensing (JAWS/Fusion/ZoomText) and NV Access for community resources.
- **Support**: Document known issues, workarounds, and vendor tickets referencing specific AT.
