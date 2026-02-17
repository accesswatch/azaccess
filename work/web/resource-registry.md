---
layout: default
title: External Resource Registry
summary: "Curated collection of accessibility tools, services, learning resources, and assistive technologies — vetted and maintained by the UA Digital Accessibility team."
breadcrumb_parent: Tools & Checklists
breadcrumb_parent_url: tools-checklists.html
owner: Accessibility Program Office
last_reviewed: 2026-01-15
next_review: 2026-04-15
tags:
  - topic:governance
  - topic:tools
sources:
  - DOJ ADA Title II Regulations — https://www.ada.gov/law-and-regs/regulations/title-ii-2010-regulations/
  - W3C Web Accessibility Initiative — https://www.w3.org/WAI/
  - Microsoft Accessibility — https://www.microsoft.com/en-us/accessibility
  - Google Workspace Accessibility — https://workspace.google.com/learn-more/accessibility/
  - Apple Developer Accessibility — https://developer.apple.com/accessibility/
  - Adobe Accessibility — https://www.adobe.com/accessibility.html
  - Accessibility | Home — https://accessibility.arizona.edu
---

<nav class="toc" aria-label="Table of contents">
<h2>On This Page</h2>
<ul>
<li><a href="#how-we-curate">How We Curate This Registry</a></li>
<li><a href="#testing">Testing Tools</a></li>
<li><a href="#learning">Learning Resources</a></li>
<li><a href="#services">Services &amp; Consultants</a></li>
<li><a href="#assistive">Assistive Technologies</a></li>
<li><a href="#community">Community &amp; News</a></li>
<li><a href="#ua-internal">UA Internal Resources</a></li>
<li><a href="#choosing">Choosing the Right Tool</a></li>
<li><a href="#suggest">Suggest a Resource</a></li>
</ul>
</nav>

<div class="callout callout-info">
<h3>Why This Registry Exists</h3>
<p>Navigating the accessibility tool landscape can be overwhelming. This registry is maintained by the UA Digital Accessibility team to give you vetted, reliable recommendations — whether you're a developer running your first audit, a content creator checking contrast, or a leader evaluating enterprise tools. Every resource listed here has been reviewed for accuracy, reliability, and relevance to higher education.</p>
</div>

## How We Curate This Registry {#how-we-curate}

Every resource in this registry is evaluated against four criteria before inclusion:

1. **Accuracy:** Does it reflect current WCAG standards (2.1/2.2)?
2. **Reliability:** Is it actively maintained with regular updates?
3. **Relevance:** Does it serve UA's specific needs in higher education?
4. **Accessibility:** Is the resource itself accessible to people with disabilities?

Resources are reviewed quarterly. Items that become outdated, unmaintained, or inaccurate are removed. If you find a broken link or outdated information, please [let us know](support.html).

## Testing Tools {#testing}

Automated testing catches roughly 30–40% of accessibility issues. The remaining 60–70% require manual testing with assistive technologies and human judgment. Use a combination of tools for the most complete coverage.

### Automated Testing

These tools scan your content and flag potential WCAG violations. They're fast and great for catching common issues, but they can't evaluate things like whether alt text is *meaningful* or whether focus order is *logical*.

| Resource | Platform | What It Tests | Cost |
|----------|----------|---------------|------|
| [axe DevTools](https://www.deque.com/axe/devtools/){:target="_blank" rel="noopener"} | Chrome, Firefox extension | WCAG 2.1 AA violations in web pages. Industry standard with the lowest false-positive rate. | Free (Pro tier available) |
| [WAVE](https://wave.webaim.org/){:target="_blank" rel="noopener"} | Browser extension, web service | Visual overlay showing errors, alerts, and structural elements directly on the page. Best for beginners. | Free |
| [Accessibility Insights](https://accessibilityinsights.io/){:target="_blank" rel="noopener"} | Chrome extension, Windows, Android | Web (FastPass + full Assessment), Windows apps, Android apps. Includes guided manual checks. | Free |
| [Pa11y](https://pa11y.org/){:target="_blank" rel="noopener"} | Command line, CI/CD | Headless accessibility testing for build pipelines. Supports WCAG 2.1 AA with HTML CodeSniffer or axe-core runners. | Free |
| [Lighthouse](https://developer.chrome.com/docs/lighthouse/){:target="_blank" rel="noopener"} | Chrome DevTools, CLI | Built into Chrome DevTools. Includes accessibility scoring alongside performance and SEO. Good starting point but less thorough than axe. | Free |

> **UA Recommendation:** Start with **axe DevTools** for web page testing. It has the most reliable rule set and lowest false-positive rate in the industry. Add **Accessibility Insights** when you need guided manual testing steps.

### Color & Contrast Testing

| Resource | Platform | Description | Cost |
|----------|----------|-------------|------|
| [Colour Contrast Analyser (CCA)](https://www.tpgi.com/color-contrast-checker/){:target="_blank" rel="noopener"} | Windows, macOS desktop app | Eyedropper tool to check contrast ratios of any on-screen elements. Tests against both AA and AAA thresholds. | Free |
| [WebAIM Contrast Checker](https://webaim.org/resources/contrastchecker/){:target="_blank" rel="noopener"} | Web | Enter hex values to check contrast. Shows pass/fail for normal text, large text, and UI components. | Free |
| [Who Can Use](https://www.whocanuse.com/){:target="_blank" rel="noopener"} | Web | Shows how a color combination appears to people with different types of color vision deficiency. | Free |
| [Stark](https://www.getstark.co/){:target="_blank" rel="noopener"} | Figma, Sketch, Adobe XD plugin | Contrast checking and color blindness simulation within design tools. Integrates into the design workflow. | Free tier available |

### Document & PDF Testing

| Resource | Platform | Description | Cost |
|----------|----------|-------------|------|
| [PAVE PDF Checker](https://pave.pdfua.foundation/){:target="_blank" rel="noopener"} | Web service | Free online PDF/UA validator. Tests PDF accessibility against the PDF/UA standard and provides detailed, actionable reports. | Free |
| [Adobe Acrobat Pro](https://www.adobe.com/acrobat/acrobat-pro.html){:target="_blank" rel="noopener"} | Windows, macOS | Built-in accessibility checker and remediation tools. UA has site license — check [softwarelicense.arizona.edu](https://softwarelicense.arizona.edu/){:target="_blank" rel="noopener"}. | UA site license |
| [Microsoft Accessibility Checker](https://support.microsoft.com/en-us/office/improve-accessibility-with-the-accessibility-checker){:target="_blank" rel="noopener"} | Word, PowerPoint, Excel, Outlook | Built-in checker in Microsoft 365. Run before exporting any document. Available to all UA users via Microsoft 365. | Included with M365 |
| [Grackle](https://www.grackledocs.com/){:target="_blank" rel="noopener"} | Google Docs, Sheets, Slides add-on | Accessibility checker for Google Workspace. Evaluates structure, alt text, contrast, and reading order. | Free tier available |

## Learning Resources {#learning}

Whether you're just starting your accessibility journey or looking to deepen expertise, these resources provide high-quality, standards-based education.

### Foundational Courses

| Resource | Provider | Level | Format | Cost |
|----------|----------|-------|--------|------|
| [W3C Introduction to Web Accessibility](https://www.w3.org/WAI/courses/foundations-course/){:target="_blank" rel="noopener"} | W3C / edX | Beginner | Self-paced online course, ~16 hours | Free (certificate available) |
| [web.dev Learn Accessibility](https://web.dev/learn/accessibility/){:target="_blank" rel="noopener"} | Google | Beginner–Intermediate | Interactive articles with exercises | Free |
| [Microsoft Accessibility Fundamentals](https://learn.microsoft.com/en-us/training/paths/accessibility-fundamentals/){:target="_blank" rel="noopener"} | Microsoft Learn | Beginner | Modular learning path, ~4 hours | Free |
| [Teach Access Tutorial](https://teachaccess.github.io/tutorial/){:target="_blank" rel="noopener"} | Teach Access | Beginner | Interactive web tutorial | Free |

### Advanced & Specialized Training

| Resource | Provider | Level | Focus | Cost |
|----------|----------|-------|-------|------|
| [Deque University](https://dequeuniversity.com/){:target="_blank" rel="noopener"} | Deque Systems | Intermediate–Advanced | Role-based curriculum: developers, designers, testers, managers. Includes IAAP exam prep. | Paid (volume discounts for institutions) |
| [WebAIM Training](https://webaim.org/training/){:target="_blank" rel="noopener"} | WebAIM | Intermediate | Customizable workshops, document accessibility, web development | Paid |
| [Inclusive Design Principles](https://inclusivedesignprinciples.org/){:target="_blank" rel="noopener"} | Inclusive Design Project | All levels | Design thinking framework for inclusive digital products | Free |

### Reference Libraries

| Resource | Description | Best For |
|----------|-------------|----------|
| [WebAIM Articles](https://webaim.org/articles/){:target="_blank" rel="noopener"} | Extensive library of accessibility technique articles, written for practitioners | Quick reference on specific topics (forms, tables, ARIA, etc.) |
| [A11y Style Guide](https://a11y-style-guide.com/style-guide/){:target="_blank" rel="noopener"} | Living style guide showcasing accessible web component patterns with code examples | Developers building UI components |
| [Inclusive Components](https://inclusive-components.design/){:target="_blank" rel="noopener"} | Heydon Pickering's deep-dive explorations of building common UI patterns accessibly | Advanced developers wanting to understand the *why* behind patterns |
| [WAI-ARIA Authoring Practices](https://www.w3.org/WAI/ARIA/apg/){:target="_blank" rel="noopener"} | Official W3C patterns and examples for ARIA widget implementation | Developers implementing custom widgets |
| [WCAG 2.2 Quick Reference](https://www.w3.org/WAI/WCAG22/quickref/){:target="_blank" rel="noopener"} | Filterable, searchable reference for all WCAG success criteria with techniques | Anyone needing to look up a specific WCAG criterion |

> **UA Recommendation:** Start with the **W3C Foundations Course** for broad context, then use **web.dev Learn Accessibility** for hands-on developer skills. Bookmark **WebAIM Articles** as your go-to reference.

## Services & Consultants {#services}

When you need expert help beyond what internal teams can provide — for audits, remediation, training, or strategic planning.

### When to Engage External Services

- **Large-scale audits:** Enterprise platforms, major website redesigns, or institution-wide assessments
- **Remediation support:** Complex PDF remediation, legacy system fixes, or high-volume document conversion
- **Specialized training:** Custom workshops for specific teams, tools, or technologies
- **Expert witness or legal support:** Responding to complaints or proactive legal compliance

### Accessibility Consultancies

| Organization | Specialties | Higher Ed Experience | Engagement Types |
|---|---|---|---|
| [Deque Systems](https://www.deque.com/){:target="_blank" rel="noopener"} | Web/mobile auditing, enterprise tooling, training | Extensive (partner with many universities) | Audits, training, platform licensing |
| [Level Access](https://www.levelaccess.com/){:target="_blank" rel="noopener"} | Accessibility management platform, monitoring, testing | Extensive | Platform + services, ongoing monitoring |
| [TPGi](https://www.tpgi.com/){:target="_blank" rel="noopener"} | Expert auditing, training, custom consulting | Strong | Audits, training, consulting |
| [Knowbility](https://knowbility.org/){:target="_blank" rel="noopener"} | Training, AIR certification, community programs | Strong (nonprofit, education-focused) | Training, certification, community events |
| [WebAIM (USU)](https://webaim.org/services/){:target="_blank" rel="noopener"} | Auditing, training, research, annual surveys | Extensive (part of Utah State University) | Audits, training, custom research |
| [Accessible Web (RAMP)](https://accessibleweb.com/){:target="_blank" rel="noopener"} | Compliance monitoring, remediation, WordPress | Growing | Platform, monitoring, remediation |

> **Procurement Tip:** Before engaging an external consultant, check with the [Digital Accessibility team](mailto:accessibility@arizona.edu) — we may already have a relationship or contract in place. See the [Accessible Procurement Process](procurement-steps.html) for vendor evaluation guidance.

## Assistive Technologies {#assistive}

Understanding assistive technologies helps you build better products and test more effectively. These are the tools people with disabilities actually use to access your content.

### Screen Readers

Screen readers convert on-screen content to synthesized speech or braille output. They're essential testing tools for any accessibility practitioner.

| Screen Reader | Platform | Description | Cost | Testing Priority |
|---|---|---|---|---|
| [NVDA](https://www.nvaccess.org/){:target="_blank" rel="noopener"} | Windows | Free, open-source screen reader. Most popular free option; widely used in education and enterprise. Download and learn it — this is your primary testing tool on Windows. | Free | **Primary** (Windows) |
| [JAWS](https://www.freedomscientific.com/products/software/jaws/){:target="_blank" rel="noopener"} | Windows | Industry-standard commercial screen reader. Dominant in enterprise and government environments. More features than NVDA but requires license. | Paid (UA may have licenses — check IT) | Secondary (Windows) |
| [VoiceOver](https://support.apple.com/voiceover){:target="_blank" rel="noopener"} | macOS, iOS, iPadOS | Apple's built-in screen reader. No installation needed — activate with Cmd+F5 (Mac) or triple-click Home/Side button (iOS). Essential for testing Apple platforms. | Built-in | **Primary** (Apple) |
| [TalkBack](https://support.google.com/accessibility/android/answer/6283677){:target="_blank" rel="noopener"} | Android | Google's built-in screen reader for Android devices. Activate in Settings → Accessibility. Essential for testing Android apps. | Built-in | **Primary** (Android) |
| [Narrator](https://support.microsoft.com/en-us/windows/complete-guide-to-narrator){:target="_blank" rel="noopener"} | Windows | Microsoft's built-in screen reader. Good for quick checks but less capable than NVDA/JAWS for comprehensive testing. | Built-in | Supplementary |

> **Testing Best Practice:** The WebAIM Screen Reader Survey consistently shows that NVDA + Chrome and JAWS + Chrome are the most commonly used desktop combinations. For mobile, VoiceOver + Safari (iOS) and TalkBack + Chrome (Android) are dominant. Test with at least one desktop and one mobile combination.

### Other Assistive Technologies

These technologies represent the broader spectrum of how people interact with digital content. Consider them during design and testing.

| Technology | What It Does | Testing Implications |
|---|---|---|
| [Dragon NaturallySpeaking](https://www.nuance.com/dragon.html){:target="_blank" rel="noopener"} | Voice recognition for hands-free computer control and dictation | All interactive elements must have visible labels matching their accessible names |
| [Switch Access](https://support.google.com/accessibility/android/answer/6122836){:target="_blank" rel="noopener"} | Navigate using one or more switches (buttons, sip-and-puff devices) | Focus order must be logical; all functionality reachable sequentially |
| [ZoomText](https://www.freedomscientific.com/products/software/zoomtext/){:target="_blank" rel="noopener"} | Screen magnification with optional screen reader features | Content must reflow when zoomed; avoid fixed-size containers |
| [Eye tracking](https://www.tobii.com/){:target="_blank" rel="noopener"} | Control computer with eye movement | Touch targets must be large enough; dwell-click support important |
| [Refreshable braille displays](https://www.humanware.com/en-usa/){:target="_blank" rel="noopener"} | Convert screen text to dynamic braille output | Proper semantic structure is critical; ARIA labels must be concise |

## Community & News {#community}

Stay current with accessibility developments, connect with practitioners, and participate in the broader community.

### Newsletters & Publications

| Resource | Frequency | Focus | Subscribe |
|---|---|---|---|
| [A11y Weekly](https://a11yweekly.com/){:target="_blank" rel="noopener"} | Weekly | Curated accessibility links — the most consistently useful newsletter in the field | Free email |
| [WebAIM Newsletter](https://webaim.org/newsletter/){:target="_blank" rel="noopener"} | Monthly | In-depth articles, survey results, and resource updates from the WebAIM team | Free email |
| [Accessibility in Government](https://accessibility.blog.gov.uk/){:target="_blank" rel="noopener"} | Irregular | UK Government Digital Service blog on accessibility — excellent case studies | RSS/web |

### Conferences & Events

| Event | When | Format | Cost |
|---|---|---|---|
| [axe-con](https://www.deque.com/axe-con/){:target="_blank" rel="noopener"} | Annual (March) | Virtual conference with talks from industry experts, role-based tracks | Free |
| [CSUN Assistive Technology Conference](https://www.csun.edu/cod/conference/){:target="_blank" rel="noopener"} | Annual (March) | Largest assistive technology conference in the world. In-person + virtual. | Paid |
| [Inclusive Design 24 (ID24)](https://inclusivedesign24.org/){:target="_blank" rel="noopener"} | Annual (various) | Free 24-hour online accessibility conference with global speakers | Free |
| [A11y Camp](https://a11ycamp.org.au/){:target="_blank" rel="noopener"} | Annual | Community-driven Australian accessibility unconference, open to all | Low cost |

### Communities of Practice

| Community | Platform | Focus |
|---|---|---|
| [The A11Y Project](https://www.a11yproject.com/){:target="_blank" rel="noopener"} | Web / GitHub | Community-driven effort to make accessibility easier. Excellent checklist and resource collection. |
| [WebAIM Discussion List](https://webaim.org/discussion/){:target="_blank" rel="noopener"} | Email list | Active community of accessibility practitioners — great for asking specific questions. |
| [EDUCAUSE IT Accessibility](https://www.educause.edu/community/it-accessibility-community-group){:target="_blank" rel="noopener"} | EDUCAUSE community | Higher education-specific accessibility community. Directly relevant to UA's work. |
| [#a11y on social media](https://www.a11yproject.com/follow/){:target="_blank" rel="noopener"} | Various | The `#a11y` hashtag (numeronym for "accessibility") is the gathering point across platforms. |

## UA Internal Resources {#ua-internal}

These are University of Arizona-specific resources, contacts, and services for accessibility support.

| ID | Resource | URL | UA Owner | Who It's For | Review |
|----|----------|-----|----------|-------------|--------|
| RR-01 | UA Digital Accessibility Home | [accessibility.arizona.edu](https://accessibility.arizona.edu){:target="_blank" rel="noopener"} | Digital Accessibility Team | Everyone | Quarterly |
| RR-02 | DRC — Disability Resource Center | [drc.arizona.edu](https://drc.arizona.edu){:target="_blank" rel="noopener"} | DRC | Students, Faculty, Staff | Quarterly |
| RR-03 | IT Accessibility Tips & Guides | [itaccessibility.arizona.edu](https://itaccessibility.arizona.edu){:target="_blank" rel="noopener"} | UITS | Content creators, Developers | Quarterly |
| RR-04 | UA Software Licensing | [softwarelicense.arizona.edu](https://softwarelicense.arizona.edu){:target="_blank" rel="noopener"} | UITS | Faculty, Staff | Semi-annual |
| RR-05 | UCATT Teaching Resources | [ucatt.arizona.edu](https://ucatt.arizona.edu){:target="_blank" rel="noopener"} | UCATT | Faculty, Instructors | Quarterly |
| RR-06 | UA Brand Guidelines | [brand.arizona.edu](https://brand.arizona.edu){:target="_blank" rel="noopener"} | MarCom | Content creators, Designers | Semi-annual |
| RR-07 | Arizona Quickstart | [quickstart.arizona.edu](https://quickstart.arizona.edu){:target="_blank" rel="noopener"} | Arizona Digital | Web developers | Quarterly |
| RR-08 | Accessibility Consultation Request | [Submit request](https://forms.office.com/Pages/ResponsePage.aspx?id=BVXjXo7rKUmTfWRd9QEyiLCO6hETU85MhSR1uWmtS-FUQTRKWjE5SzVPVDNaVUwyRTdCRUg4Q1lVUSQlQCN0PWcu){:target="_blank" rel="noopener"} | Digital Accessibility Team | Anyone needing help | — |

## Choosing the Right Tool {#choosing}

With so many options, here's how to pick the right tools for your role:

### If You're a Developer

1. Install **axe DevTools** browser extension — run it on every page you build
2. Download **NVDA** (Windows) — learn basic screen reader testing
3. Bookmark **WAI-ARIA Authoring Practices** — reference for custom widgets
4. Follow **A11y Weekly** — stay current on best practices

### If You're a Content Creator

1. Use the **Microsoft Accessibility Checker** in every document before sharing
2. Bookmark **WebAIM Contrast Checker** — test colors before publishing
3. Take the **W3C Foundations Course** — understand the basics
4. Use **Grackle** if you work in Google Workspace

### If You're a Designer

1. Install **Stark** in your design tool — check contrast as you design
2. Download the **Colour Contrast Analyser** — test anything on screen
3. Read **Inclusive Design Principles** — shift your design thinking
4. Bookmark the **contrast requirements table** in the [Brand Identity guide](brand-identity.html)

### If You're a Manager or Leader

1. Take the **Microsoft Accessibility Fundamentals** course — quick overview
2. Review the [Governance Charter](governance-charter.html) — understand UA's approach
3. Read the [Procurement Process](procurement-steps.html) — ensure accessible purchasing
4. Join the **EDUCAUSE IT Accessibility** community — connect with higher ed peers

### If You're a Faculty Member

1. Use the **Microsoft Accessibility Checker** before posting to D2L/Brightspace
2. Take the **W3C Foundations Course** — foundational knowledge
3. Check with **UCATT** for accessible teaching resources and templates
4. Read the [Accessible Syllabus Guide](example-syllabus.html)

## Suggest a Resource {#suggest}

Know of a great accessibility resource that should be listed here? We welcome suggestions from the UA community.

**To suggest a resource, include:**
- Resource name and URL
- Brief description of what it does
- Who would benefit from it
- Whether it's free or paid

Submit suggestions to [accessibility@arizona.edu](mailto:accessibility@arizona.edu) with "Resource Registry Suggestion" in the subject line, or use the [support page](support.html).

## Related Resources

- [Testing Tools Guide](testing-tools.html) — Detailed testing tool walkthroughs
- [Accessibility 101](accessibility-101.html) — Getting started with accessibility
- [Procurement Process](procurement-steps.html) — Evaluating vendor accessibility
- [Governance Charter](governance-charter.html) — UA's accessibility governance framework
