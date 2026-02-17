---
layout: default
breadcrumb_parent: "Web & Apps"
breadcrumb_parent_url: web-app.html
title: Mobile App Accessibility Roadmap
summary: "A phased approach to making University of Arizona mobile applications accessible to all users — with platform-specific code, testing matrices, and alignment to the April 2026 Title II deadline."
owner: Arizona Digital + Mobile App Guild
last_reviewed: 2026-02-17
next_review: 2026-05-17
tags:
  - persona:mobile-dev
  - format:apps
sources:
  - DOJ ADA Title II Regulations — https://www.ada.gov/law-and-regs/regulations/title-ii-2010-regulations/
  - Apple Human Interface Guidelines Accessibility — https://developer.apple.com/design/human-interface-guidelines/accessibility
  - Apple Developer Accessibility — https://developer.apple.com/accessibility/
  - Android Accessibility Developer Guide — https://developer.android.com/guide/topics/ui/accessibility
  - Material Design Accessibility — https://m3.material.io/foundations/accessible-design/overview
  - W3C Mobile Accessibility — https://www.w3.org/WAI/standards-guidelines/mobile/
  - WCAG 2.2 — https://www.w3.org/TR/WCAG22/
  - Accessibility | Home — https://accessibility.arizona.edu
---

<nav class="toc" aria-label="Table of contents">
<h2>On This Page</h2>
<ul>
<li><a href="#overview">Overview</a></li>
<li><a href="#compliance">Compliance Deadlines</a></li>
<li><a href="#wcag-mapping">WCAG Mapping for Mobile</a></li>
<li><a href="#phase-1">Phase 1: Foundation (Weeks 1–4)</a></li>
<li><a href="#phase-2">Phase 2: Core Compliance (Weeks 5–12)</a></li>
<li><a href="#phase-3">Phase 3: Enhanced Experience (Weeks 13–20)</a></li>
<li><a href="#phase-4">Phase 4: Maintenance &amp; Culture</a></li>
<li><a href="#code-examples">Platform-Specific Code Examples</a></li>
<li><a href="#testing-matrix">Testing Matrix</a></li>
<li><a href="#checklist">Implementation Checklist</a></li>
<li><a href="#resources">Resources</a></li>
</ul>
</nav>

<div class="callout callout-info">
<h3>UA Mobile App Guild</h3>
<p>This roadmap was developed with the UA Mobile App Guild. Mobile developers at Arizona: join the <code>#ua-mobile-dev</code> Slack channel for real-time support, monthly audit syncs, and shared code reviews. Contact <a href="mailto:accessibility@arizona.edu">accessibility@arizona.edu</a> for an invitation.</p>
</div>

## Overview {#overview}

This roadmap outlines how mobile app teams at the University of Arizona can systematically reach and maintain WCAG 2.1 AA compliance. It's organized into four phases — from baseline audit through ongoing maintenance — so you can plan sprints, allocate resources, and track progress concretely.

### Who This Is For

- **Mobile developers** building iOS (SwiftUI/UIKit) and Android (Jetpack Compose/XML) applications
- **Product managers** planning accessibility sprints and allocating resources
- **QA engineers** setting up accessibility testing pipelines
- **Designers** creating mobile interfaces that support assistive technologies

### What's at Stake

Mobile apps created or maintained by public universities are covered under ADA Title II. Non-compliance after the deadline can result in Department of Justice enforcement actions, Office for Civil Rights complaints, and private lawsuits — in addition to the exclusion of students, faculty, and staff who depend on assistive technology.

## Compliance Deadlines {#compliance}

### Title II §35.200 — Web and Mobile App Accessibility

| Entity Size | Deadline | WCAG Level |
|---|---|---|
| Population ≥ 50,000 | **April 24, 2026** | WCAG 2.1 AA |
| Population < 50,000 | April 26, 2027 | WCAG 2.1 AA |

**UA falls in the ≥ 50,000 bracket.** Treat **April 24, 2026** as the hard compliance target for all flagship apps.

### What "Compliance" Means for Mobile Apps

The DOJ rule applies WCAG 2.1 AA to mobile apps, covering:

- All native app screens and user flows
- In-app web views and hybrid content
- Push notifications and their linked content
- Authentication flows (login, MFA, password reset)
- Content loaded dynamically (feeds, search results)

> **Key point:** Compliance is measured by **user flows**, not individual screens. If a user can't complete a core task (register for classes, check grades, request accommodations) using assistive technology, that flow is non-compliant.

## WCAG Mapping for Mobile {#wcag-mapping}

Not every WCAG criterion translates directly to mobile, and some are more critical than others. Here's how the most impactful criteria map to mobile development:

### Critical (blocks access entirely if missing)

| WCAG | Criterion | Mobile Implementation |
|---|---|---|
| 1.1.1 | Non-text Content | `accessibilityLabel` (iOS) / `contentDescription` (Android) on all meaningful images, icons, and controls |
| 1.3.1 | Info and Relationships | Proper semantic roles and traits; group related elements with `accessibilityElement` containers |
| 2.1.1 | Keyboard | Full external keyboard support; all elements reachable via Tab/Enter/Arrow; Switch Control / Switch Access support |
| 2.4.3 | Focus Order | Logical reading order matching visual layout; `accessibilityElements` ordering (iOS) / `traversalBefore`/`traversalAfter` (Android) |
| 4.1.2 | Name, Role, Value | Every control has an accessible name, correct role, and current state announced |

### High Priority (degrades experience significantly)

| WCAG | Criterion | Mobile Implementation |
|---|---|---|
| 1.3.4 | Orientation | Support both portrait and landscape (don't lock orientation unless essential) |
| 1.4.3 | Contrast Minimum | 4.5:1 for text, 3:1 for large text and UI components |
| 1.4.4 | Resize Text | Support Dynamic Type (iOS) and font scaling (Android) up to 200% minimum |
| 1.4.11 | Non-text Contrast | 3:1 for icons, borders, focus indicators, and custom controls |
| 2.4.7 | Focus Visible | Clear focus indicator for external keyboard navigation |
| 2.5.1 | Pointer Gestures | Provide single-pointer alternatives for multi-finger gestures (pinch, multi-tap) |
| 2.5.5 | Target Size | Minimum 44×44 pt (iOS) or 48×48 dp (Android) for all interactive elements |

### Important (required for full AA compliance)

| WCAG | Criterion | Mobile Implementation |
|---|---|---|
| 1.4.10 | Reflow | Content reflows without horizontal scroll at all Dynamic Type sizes |
| 1.4.12 | Text Spacing | Text adapts when users override spacing settings |
| 2.4.6 | Headings and Labels | Screen headings are descriptive and announced as headings by VoiceOver/TalkBack |
| 2.5.8 | Target Size (Minimum) | 24×24 CSS pixels minimum (WCAG 2.2) |
| 3.3.1 | Error Identification | Errors announced by screen readers with `UIAccessibility.post(.announcement)` or `AccessibilityEvent` |
| 3.3.2 | Labels or Instructions | Input fields have associated labels announced by assistive technology |

## Phase 1: Foundation (Weeks 1–4) {#phase-1}

### Goals
- Establish a baseline accessibility audit
- Fix critical blockers that prevent access entirely
- Set up automated testing in the CI/CD pipeline

### Key Actions

#### 1. Run Baseline Audit
- **iOS:** Use Xcode Accessibility Inspector (Xcode → Open Developer Tool → Accessibility Inspector)
- **Android:** Use [Accessibility Scanner](https://play.google.com/store/apps/details?id=com.google.android.apps.accessibility.auditor){:target="_blank" rel="noopener"} app
- **Both:** Navigate every screen with VoiceOver (iOS) and TalkBack (Android)
- Record every issue in your issue tracker with severity levels

#### 2. Fix Critical Blockers
- **Missing labels:** Add `accessibilityLabel` to every interactive element
- **Missing roles:** Set `accessibilityTraits` (iOS) or roles (Android) on custom controls
- **Touch targets:** Ensure all tappable elements are at least 44×44 pt (iOS) or 48×48 dp (Android)
- **Keyboard traps:** Verify no screen traps focus when using an external keyboard or Switch Control

#### 3. Set Up Automated Testing
- **iOS:** Add `XCUIElement` accessibility audits to your UI test suite
- **Android:** Integrate [Accessibility Test Framework](https://github.com/google/Accessibility-Test-Framework-for-Android){:target="_blank" rel="noopener"} or [Espresso Accessibility Checks](https://developer.android.com/training/testing/espresso/accessibility-checking){:target="_blank" rel="noopener"}
- **Both:** Fail the CI build on critical accessibility violations

#### 4. Document Current State
- Create an accessibility backlog sorted by impact (who is blocked, not just what's wrong)
- Baseline VoiceOver and TalkBack screen recordings for comparison later
- Map each issue to a WCAG success criterion using the [WCAG mapping table above](#wcag-mapping)

## Phase 2: Core Compliance (Weeks 5–12) {#phase-2}

### Goals
- Achieve WCAG 2.1 Level AA for all core user flows
- Implement proper focus management
- Support Dynamic Type and display accommodations

### Key Actions

#### 1. Semantic Structure
- Use native platform components whenever possible (they have accessibility built in)
- For custom controls, implement the full accessibility API (name, role, value, state)
- Group related content into accessibility containers for logical navigation

#### 2. Color Contrast
- Test all text against backgrounds: 4.5:1 for body text, 3:1 for large text (18pt+ or 14pt+ bold)
- Test non-text elements: 3:1 for icons, borders, and custom controls
- Verify contrast in both light and dark mode
- Don't rely on color alone for state (use icons, labels, or patterns too)

#### 3. Dynamic Type / Font Scaling
- **iOS:** Use `UIFont.preferredFont(forTextStyle:)` or SwiftUI's `.font(.body)` — never hardcode font sizes
- **Android:** Use `sp` units for text; test with system font scale at 200%
- **Both:** Verify no content is clipped, truncated, or overlapping at maximum text size
- Support at minimum 200% scaling; ideally up to the platform maximum

#### 4. Focus Order and Management
- Tab order must match visual reading order
- When new content appears (alerts, sheets, loading states), move focus appropriately
- When content is dismissed, return focus to the element that triggered it
- Announce loading states and content changes to screen readers

#### 5. Error Handling
- Errors must be announced by assistive technology (not just visually displayed)
- Error messages must identify the field and describe what went wrong
- Suggest corrections when possible
- Don't clear user input when showing an error

#### 6. Motion and Animations
- Check `UIAccessibility.isReduceMotionEnabled` (iOS) or `Settings.Global.getFloat(ANIMATOR_DURATION_SCALE)` (Android)
- Provide reduced or no-animation alternatives
- Never flash content more than 3 times per second
- Auto-playing carousels must have pause/stop controls

## Phase 3: Enhanced Experience (Weeks 13–20) {#phase-3}

### Goals
- Go beyond compliance to create an excellent accessible experience
- Optimize for assistive technology power users
- Ensure feature parity for all input methods

### Key Actions

#### 1. Custom Actions
- **iOS:** Add custom rotor actions for complex interactions (swipe to delete, drag-to-reorder)
- **Android:** Implement `AccessibilityNodeInfo.AccessibilityAction` for custom interactions
- Provide accessible alternatives for gesture-based features (swipe, pinch, long-press)

#### 2. Live Regions
- **iOS:** Post `UIAccessibility.Notification.announcement` for dynamic content updates
- **Android:** Use `android:accessibilityLiveRegion="polite"` (or "assertive" for critical updates)
- Announce loading states, form submission results, and content updates
- Don't over-announce — only communicate meaningful state changes

#### 3. Voice Control Support
- Ensure all visible text matches the accessibility label (Voice Control users say what they see)
- Test with Voice Control (iOS) and Voice Access (Android)
- Add labels to icon-only buttons (visible labels are preferred)

#### 4. Switch Control / Switch Access
- Test all flows with switch access — every element must be reachable sequentially
- Avoid custom gesture requirements without switch-friendly alternatives
- Time-based interactions must have extended time options

#### 5. Haptic Feedback
- Provide haptic confirmation for important actions (submit, delete, error)
- Don't rely on haptics as the only feedback — always combine with visual and auditory cues
- Use platform-standard haptic patterns (success, warning, error)

## Phase 4: Maintenance & Culture (Ongoing) {#phase-4}

### Goals
- Prevent accessibility regressions
- Build accessibility into team culture
- Establish feedback channels with users

### Automated Testing (Every PR)

- Run accessibility checks in CI/CD — fail the build on critical violations
- **iOS:** `XCUIApplication().performAccessibilityAudit()` (Xcode 15+)
- **Android:** `AccessibilityChecks.enable()` in Espresso tests
- Track accessibility issue count over time — it should trend down

### Manual Testing Sprints (Quarterly)

Conduct a quarterly deep-dive accessibility audit:

1. Navigate every screen with VoiceOver/TalkBack
2. Complete all core user flows with an external keyboard only
3. Test at maximum Dynamic Type / font scale
4. Test in both orientations (portrait and landscape)
5. Test in dark mode and high contrast mode
6. Record screen reader sessions for comparison with previous quarter

### User Testing (Semi-annually)

- Include people with disabilities in usability studies
- Partner with the [Disability Resource Center](https://drc.arizona.edu){:target="_blank" rel="noopener"} to recruit testers
- Focus testing on core flows: authentication, primary task completion, settings
- Compensate participants fairly for their time

### Team Training

- Annual accessibility training for all developers and designers
- Pair new team members with an accessibility champion for onboarding
- Share accessibility wins in team retrospectives
- Maintain a team-specific accessibility style guide or checklist

## Platform-Specific Code Examples {#code-examples}

### iOS — SwiftUI

```swift
// Accessible button with label and hint
Button(action: submitForm) {
    HStack {
        Image(systemName: "paperplane.fill")
            .accessibilityHidden(true) // decorative icon
        Text("Submit Application")
    }
}
.accessibilityLabel("Submit Application")
.accessibilityHint("Double-tap to submit your completed application")

// Accessible image
Image("campus-photo")
    .accessibilityLabel("Old Main building on the UA campus at sunset")

// Decorative image
Image("decorative-border")
    .accessibilityHidden(true)

// Grouping related elements
VStack {
    Text("Dr. Maria Chen")
    Text("Associate Director, Digital Accessibility")
    Text("accessibility@arizona.edu")
}
.accessibilityElement(children: .combine)
// VoiceOver reads all three as one unit

// Dynamic Type support — use system text styles
Text("Welcome to UA")
    .font(.title) // automatically scales with Dynamic Type

// Respecting Reduce Motion
@Environment(\.accessibilityReduceMotion) var reduceMotion

withAnimation(reduceMotion ? nil : .easeInOut) {
    showContent.toggle()
}

// Announcing dynamic content changes
UIAccessibility.post(
    notification: .announcement,
    argument: "Application submitted successfully"
)
```

### iOS — UIKit

```swift
// Accessible label on a custom control
let favoriteButton = UIButton(type: .custom)
favoriteButton.setImage(UIImage(systemName: "heart"), for: .normal)
favoriteButton.accessibilityLabel = "Add to favorites"
favoriteButton.accessibilityTraits = .button

// Toggle state
favoriteButton.accessibilityValue = isFavorited ? "Favorited" : "Not favorited"

// Custom accessibility action
let deleteAction = UIAccessibilityCustomAction(
    name: "Delete item",
    target: self,
    selector: #selector(deleteItem)
)
cell.accessibilityCustomActions = [deleteAction]

// Dynamic Type
label.font = UIFont.preferredFont(forTextStyle: .body)
label.adjustsFontForContentSizeCategory = true
```

### Android — Jetpack Compose

```kotlin
// Accessible button
Button(
    onClick = { submitForm() },
    modifier = Modifier.semantics {
        contentDescription = "Submit Application"
    }
) {
    Icon(
        imageVector = Icons.Default.Send,
        contentDescription = null // decorative, text is the label
    )
    Text("Submit Application")
}

// Accessible image
Image(
    painter = painterResource(R.drawable.campus_photo),
    contentDescription = "Old Main building on the UA campus at sunset"
)

// Decorative image
Image(
    painter = painterResource(R.drawable.decorative_border),
    contentDescription = null // null = decorative in Compose
)

// Heading semantics
Text(
    text = "Application Status",
    modifier = Modifier.semantics { heading() },
    style = MaterialTheme.typography.headlineMedium
)

// Live region for dynamic updates
Text(
    text = statusMessage,
    modifier = Modifier.semantics {
        liveRegion = LiveRegionMode.Polite
    }
)

// Minimum touch target
IconButton(
    onClick = { toggleFavorite() },
    modifier = Modifier.size(48.dp) // meets 48dp minimum
) {
    Icon(
        imageVector = if (isFavorited) Icons.Filled.Favorite 
                      else Icons.Outlined.FavoriteBorder,
        contentDescription = if (isFavorited) "Remove from favorites" 
                             else "Add to favorites"
    )
}

// Respecting Reduce Motion
val reduceMotion = LocalReducedMotion.current
val animationSpec = if (reduceMotion) snap() else tween(300)
```

### Android — XML Views

```kotlin
// Setting accessibility properties programmatically
imageView.contentDescription = "Old Main building on the UA campus at sunset"

// Making a custom view accessible
customControl.importantForAccessibility = View.IMPORTANT_FOR_ACCESSIBILITY_YES
customControl.accessibilityDelegate = object : View.AccessibilityDelegate() {
    override fun onInitializeAccessibilityNodeInfo(
        host: View, info: AccessibilityNodeInfo
    ) {
        super.onInitializeAccessibilityNodeInfo(host, info)
        info.roleDescription = "Slider"
        info.text = "Volume: $currentValue percent"
        info.addAction(
            AccessibilityNodeInfo.AccessibilityAction(
                AccessibilityNodeInfo.ACTION_SCROLL_FORWARD,
                "Increase volume"
            )
        )
    }
}

// Announcing updates
announceForAccessibility("Application submitted successfully")

// Touch target in XML layout
<ImageButton
    android:layout_width="48dp"
    android:layout_height="48dp"
    android:contentDescription="@string/settings"
    android:src="@drawable/ic_settings" />
```

## Testing Matrix {#testing-matrix}

### Required Device/AT Combinations

Test each core user flow on these combinations. The matrix covers the most common assistive technology pairings based on the WebAIM Screen Reader Survey and platform usage data.

| Priority | Device | OS | Screen Reader | Browser / Context | Notes |
|---|---|---|---|---|---|
| **Primary** | iPhone (recent) | iOS 17+ | VoiceOver | Safari / Native | Most common iOS AT combo |
| **Primary** | Android (Pixel or Samsung) | Android 14+ | TalkBack | Chrome / Native | Most common Android AT combo |
| **Secondary** | iPad | iPadOS 17+ | VoiceOver + Keyboard | Safari / Native | Tests keyboard + touch combo |
| **Secondary** | Any Android | Android 14+ | Switch Access | Native | Tests sequential navigation |
| **Tertiary** | iPhone | iOS 17+ | Voice Control | Native | Tests voice-based interaction |
| **Tertiary** | Any device | Any | External keyboard only | Native | Tests keyboard-only (no AT) |

### Core User Flows to Test

For each flow, document pass/fail across all required device/AT combinations:

| Flow | What to Verify |
|---|---|
| **Authentication** | Login, MFA, password reset — all completable with each AT |
| **Primary task** | The main thing users do (e.g., register for classes, check grades) |
| **Search** | Find content, filter results, navigate to result |
| **Settings/Profile** | Change preferences, update information |
| **Notifications** | Receive, read, and act on notifications |
| **Error recovery** | Encounter an error, understand it, correct it |

### Testing Checklist per Screen

- [ ] All interactive elements have accessible names (announced by screen reader)
- [ ] Screen reader focus order matches visual layout
- [ ] Custom controls announce their role, state, and value
- [ ] Touch targets are at least 44×44 pt (iOS) or 48×48 dp (Android)
- [ ] Text scales correctly at 200% Dynamic Type / font size
- [ ] Content works in both portrait and landscape orientation
- [ ] Color contrast meets 4.5:1 for text, 3:1 for UI components
- [ ] No keyboard or focus traps
- [ ] Loading states and errors are announced to screen readers
- [ ] No flashing content (more than 3 per second)
- [ ] Works with Reduce Motion / Reduce Transparency settings

## Implementation Checklist {#checklist}

### Phase 1 — Foundation (Weeks 1–4)

- [ ] Ran Accessibility Inspector (iOS) and Accessibility Scanner (Android) on all screens
- [ ] Tested all screens with VoiceOver and TalkBack
- [ ] Fixed missing labels on all interactive elements
- [ ] Touch targets meet minimum size requirements
- [ ] Created accessibility backlog in issue tracker
- [ ] Set up automated accessibility checks in CI/CD

### Phase 2 — Core Compliance (Weeks 5–12)

- [ ] All native controls used where possible; custom controls fully implement accessibility API
- [ ] Color contrast meets WCAG AA for all text and UI components (light and dark mode)
- [ ] Dynamic Type / font scaling works to 200% without clipping or overflow
- [ ] Focus order is logical on all screens
- [ ] Errors are announced by screen reader with field identification and correction suggestion
- [ ] Reduce Motion setting is respected — no unnecessary animation

### Phase 3 — Enhanced Experience (Weeks 13–20)

- [ ] Custom actions provided for complex gestures (swipe-to-delete, drag-to-reorder)
- [ ] Live regions announce dynamic content changes appropriately
- [ ] Voice Control / Voice Access tested and working
- [ ] Switch Control / Switch Access tested on all core flows
- [ ] Haptic feedback provided for important actions (combined with visual/auditory)

### Phase 4 — Maintenance (Ongoing)

- [ ] CI/CD blocks PRs with critical accessibility regressions
- [ ] Quarterly manual accessibility audit completed
- [ ] Semi-annual user testing with people with disabilities
- [ ] Annual team training completed
- [ ] Accessibility issue count trending down quarter over quarter

## Resources {#resources}

### Platform Documentation

- [Apple Accessibility Developer Guide](https://developer.apple.com/accessibility/){:target="_blank" rel="noopener"}
- [Apple Human Interface Guidelines — Accessibility](https://developer.apple.com/design/human-interface-guidelines/accessibility){:target="_blank" rel="noopener"}
- [Android Accessibility Developer Guide](https://developer.android.com/guide/topics/ui/accessibility){:target="_blank" rel="noopener"}
- [Material Design 3 Accessibility](https://m3.material.io/foundations/accessible-design/overview){:target="_blank" rel="noopener"}

### Standards & Legal

- [WCAG 2.1 (W3C Recommendation)](https://www.w3.org/TR/WCAG21/){:target="_blank" rel="noopener"}
- [WCAG 2.2 (W3C Recommendation)](https://www.w3.org/TR/WCAG22/){:target="_blank" rel="noopener"}
- [W3C Mobile Accessibility](https://www.w3.org/WAI/standards-guidelines/mobile/){:target="_blank" rel="noopener"}
- [DOJ ADA Title II Final Rule](https://www.ada.gov/law-and-regs/regulations/title-ii-2010-regulations/){:target="_blank" rel="noopener"}

### Testing Tools

- [Accessibility Inspector (Xcode)](https://developer.apple.com/documentation/accessibility/accessibility-inspector){:target="_blank" rel="noopener"}
- [Accessibility Scanner (Android)](https://play.google.com/store/apps/details?id=com.google.android.apps.accessibility.auditor){:target="_blank" rel="noopener"}
- [Accessibility Test Framework for Android](https://github.com/google/Accessibility-Test-Framework-for-Android){:target="_blank" rel="noopener"}
- [Resource Registry](resource-registry.html) — Comprehensive tool and resource listing

### On This Site

- [Mobile Accessibility Guide](mobile.html) — Overview of mobile accessibility fundamentals
- [Testing Tools Guide](testing-tools.html) — Full testing tool walkthroughs
- [Compliance Timeline](compliance-timeline.html) — Title II deadlines and planning

### Need Help?

Contact [accessibility@arizona.edu](mailto:accessibility@arizona.edu) for guidance on mobile app accessibility, audit support, or questions about this roadmap.

- **Mobile App Guild** office hours for code reviews and pairing sessions
- **Digital Accessibility consultation** for design reviews and audits — [submit a request](https://forms.office.com/Pages/ResponsePage.aspx?id=BVXjXo7rKUmTfWRd9QEyiLCO6hETU85MhSR1uWmtS-FUQTRKWjE5SzVPVDNaVUwyRTdCRUg4Q1lVUSQlQCN0PWcu){:target="_blank" rel="noopener"}
- **Apple/Google partner contacts** for escalation when platform bugs block compliance
