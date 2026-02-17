---
layout: default
title: "Accessibility Do's and Don'ts"
summary: "Quick-reference poster-style guides for common accessibility tasks — with WCAG criteria, real-world impact, and practical examples for every category."
breadcrumb_parent: Tools & Checklists
breadcrumb_parent_url: tools-checklists.html
owner: Accessibility Content Team
last_reviewed: 2026-02-17
next_review: 2026-05-17
tags:
  - topic:quick-reference
  - persona:all
sources:
  - WCAG 2.2 — https://www.w3.org/TR/WCAG22/
  - WebAIM Articles — https://webaim.org/articles/
  - Accessibility | Home — https://accessibility.arizona.edu
  - 6 Tips for Accessible Documents — https://itaccessibility.arizona.edu/content/ms-office
  - Video Captioning Info — https://itaccessibility.arizona.edu/content/captioning-info
  - Deque University — https://dequeuniversity.com/
---

<nav class="toc" aria-label="Table of contents">
<h2>On This Page</h2>
<ul>
<li><a href="#why">Why Do's and Don'ts Matter</a></li>
<li><a href="#images">Images &amp; Alt Text</a></li>
<li><a href="#headings">Headings &amp; Structure</a></li>
<li><a href="#links">Links</a></li>
<li><a href="#color">Color &amp; Contrast</a></li>
<li><a href="#forms">Forms</a></li>
<li><a href="#keyboard">Keyboard &amp; Focus</a></li>
<li><a href="#video">Video &amp; Audio</a></li>
<li><a href="#documents">Documents</a></li>
<li><a href="#social">Social Media</a></li>
<li><a href="#posters">Printable Posters</a></li>
</ul>
</nav>

<div class="callout callout-info">
<h3>UA Digital Accessibility Support</h3>
<p>These guides align with <a href="https://accessibility.arizona.edu" target="_blank" rel="noopener">University of Arizona digital accessibility standards</a> and WCAG 2.2 Level AA. The Digital Accessibility team provides consultation for accessible content creation. <a href="https://forms.office.com/Pages/ResponsePage.aspx?id=BVXjXo7rKUmTfWRd9QEyiLCO6hETU85MhSR1uWmtS-FUQTRKWjE5SzVPVDNaVUwyRTdCRUg4Q1lVUSQlQCN0PWcu" target="_blank" rel="noopener">Submit a consultation request</a> or contact <a href="mailto:accessibility@arizona.edu">accessibility@arizona.edu</a>.</p>
</div>

## Why Do's and Don'ts Matter {#why}

Accessibility isn't a checklist you run at the end — it's a set of habits you build into your daily work. These do's and don'ts distill WCAG 2.2 Level AA requirements into quick, actionable guidance that anyone can follow, regardless of technical background.

### The Numbers Tell the Story

- **26% of U.S. adults** have some type of disability (CDC, 2023)
- **Up to 1 in 12 men** have some form of color vision deficiency
- **40–60% of web accessibility issues** can be caught by following basic do's and don'ts
- **100% of UA digital content** must meet WCAG 2.2 AA by the Title II compliance deadline

### How to Use This Page

Each category below includes:

- **Do's:** Practices that make your content accessible
- **Don'ts:** Common mistakes that create barriers
- **WCAG criteria:** The specific standard each practice addresses
- **Real-world impact:** Who is affected and how

Print the [poster versions](#posters) for your team space, or bookmark this page as a daily reference.

---

<div>
<h2 id="images">Images &amp; Alt Text</h2>

<p><strong>WCAG Criteria:</strong> <a href="https://www.w3.org/WAI/WCAG22/quickref/#non-text-content" target="_blank" rel="noopener">1.1.1 Non-text Content (A)</a>, <a href="https://www.w3.org/WAI/WCAG22/quickref/#images-of-text" target="_blank" rel="noopener">1.4.5 Images of Text (AA)</a></p>

<p><strong>Who's affected:</strong> Screen reader users hear nothing without alt text. People with low vision who use magnification can't zoom into images of text effectively. Students in low-bandwidth situations may not see images at all.</p>

<div class="do-dont-grid">
<div class="do-card" markdown="1">

### Do

- Add alt text to all meaningful images
- Describe the image's **purpose**, not just what it shows
- Keep alt text concise (under 125 characters)
- Mark decorative images as decorative (empty `alt=""`)
- Describe charts and graphs with key data points
- Use real text instead of images of text
- Include complex image descriptions via `longdesc` or a linked text alternative

</div>
<div class="dont-card" markdown="1">

### Don't

- Leave images without alt text
- Start alt text with "Image of" or "Picture of" (screen readers already announce "image")
- Write overly long, detailed descriptions for simple images
- Use images of text instead of real text
- Repeat information already in surrounding text
- Use CSS background images for meaningful content
- Forget alt text just because the image is "obvious"

</div>
</div>

<details>
<summary><strong>Example: Writing good alt text</strong></summary>

**Context-dependent alt text** — the same image may need different alt text depending on where it's used:

| Context | Alt Text |
|---|---|
| Photo on a "Meet the Team" page | "Dr. Maria Chen, Associate Director of Digital Accessibility" |
| Same photo as a decorative element | `alt=""` (empty — the name appears in text) |
| Chart showing enrollment trends | "Bar chart showing enrollment grew 12% from 2024 to 2026, with the largest increase in online programs" |
| UA logo linking to homepage | "University of Arizona — Go to homepage" |
| UA logo next to "University of Arizona" text | `alt=""` (the text already conveys the information) |

</details>

</div>

---

<div>
<h2 id="headings">Headings &amp; Structure</h2>

<p><strong>WCAG Criteria:</strong> <a href="https://www.w3.org/WAI/WCAG22/quickref/#info-and-relationships" target="_blank" rel="noopener">1.3.1 Info and Relationships (A)</a>, <a href="https://www.w3.org/WAI/WCAG22/quickref/#meaningful-sequence" target="_blank" rel="noopener">1.3.2 Meaningful Sequence (A)</a>, <a href="https://www.w3.org/WAI/WCAG22/quickref/#headings-and-labels" target="_blank" rel="noopener">2.4.6 Headings and Labels (AA)</a></p>

<p><strong>Who's affected:</strong> Screen reader users navigate pages by heading. Without proper headings, they must listen to the entire page linearly — imagine reading a textbook with no chapter titles or section breaks. People with cognitive disabilities rely on clear structure to understand content organization.</p>

<div class="do-dont-grid">
<div class="do-card" markdown="1">

### Do

- Use one H1 per page (the page title)
- Nest headings logically (H2, then H3, etc.)
- Use headings to create a logical outline
- Apply heading styles in Word/Google Docs, not just bold text
- Make headings descriptive and unique
- Use headings to break up long content into scannable sections

</div>
<div class="dont-card" markdown="1">

### Don't

- Skip heading levels (H2 → H4)
- Use headings for visual styling alone (making text big/bold)
- Make bold paragraphs instead of real headings
- Use multiple H1s on a page
- Create empty or vague headings ("More Info," "Stuff")
- Use headings inside table cells for layout

</div>
</div>

<details>
<summary><strong>Example: Heading hierarchy</strong></summary>

**Correct heading structure:**

```
H1: Financial Aid for Graduate Students
  H2: Types of Financial Aid
    H3: Fellowships and Assistantships
    H3: Loans
    H3: Work-Study
  H2: How to Apply
    H3: Application Deadlines
    H3: Required Documents
  H2: Contact the Financial Aid Office
```

**Incorrect — skipped levels and visual-only styling:**

```
H1: Financial Aid for Graduate Students
  H3: Types of Financial Aid    ← skipped H2
  BOLD TEXT: How to Apply        ← not a real heading
  H2: Contact Us                 ← back to H2 after H3
```

</details>

</div>

---

<div>
<h2 id="links">Links</h2>

<p><strong>WCAG Criteria:</strong> <a href="https://www.w3.org/WAI/WCAG22/quickref/#link-purpose-in-context" target="_blank" rel="noopener">2.4.4 Link Purpose in Context (A)</a>, <a href="https://www.w3.org/WAI/WCAG22/quickref/#link-purpose-link-only" target="_blank" rel="noopener">2.4.9 Link Purpose – Link Only (AAA)</a></p>

<p><strong>Who's affected:</strong> Screen reader users often pull up a list of all links on a page to navigate quickly. If every link says "click here" or "read more," the list is useless. Voice control users say the visible link text to activate it — ambiguous text makes this impossible.</p>

<div class="do-dont-grid">
<div class="do-card" markdown="1">

### Do

- Write descriptive link text that makes sense out of context
- Make link text unique on the page when pointing to different destinations
- Indicate file types and size (e.g., "Budget Report (PDF, 2.4 MB)")
- Warn if link opens in a new window (or use `aria-label`)
- Use `<a>` for navigation, `<button>` for actions
- Front-load the meaningful words in link text

</div>
<div class="dont-card" markdown="1">

### Don't

- Use "click here," "read more," or "learn more" alone
- Use raw URLs as link text (https://long-url...)
- Link entire paragraphs or sentences
- Open links in new tabs without warning
- Style buttons as links or vice versa
- Make links and surrounding text the same color/style (distinguish them)

</div>
</div>

<details>
<summary><strong>Example: Descriptive vs. vague links</strong></summary>

| Inaccessible | Accessible |
|---|---|
| To register for the workshop, [click here](#). | [Register for the March Accessibility Workshop](#). |
| Read more [here](#). | [Read the full accessibility policy](#). |
| Download: [https://example.edu/docs/report.pdf](#) | [2026 Accessibility Compliance Report (PDF, 1.2 MB)](#) |
| For more info, visit our [website](#). | Visit the [UA Digital Accessibility](https://accessibility.arizona.edu){:target="_blank" rel="noopener"} site for testing tools and training. |

</details>

</div>

---

<div>
<h2 id="color">Color &amp; Contrast</h2>

<p><strong>WCAG Criteria:</strong> <a href="https://www.w3.org/WAI/WCAG22/quickref/#use-of-color" target="_blank" rel="noopener">1.4.1 Use of Color (A)</a>, <a href="https://www.w3.org/WAI/WCAG22/quickref/#contrast-minimum" target="_blank" rel="noopener">1.4.3 Contrast Minimum (AA)</a>, <a href="https://www.w3.org/WAI/WCAG22/quickref/#non-text-contrast" target="_blank" rel="noopener">1.4.11 Non-text Contrast (AA)</a></p>

<p><strong>Who's affected:</strong> People with low vision need sufficient contrast to read text. People with color vision deficiency (up to 1 in 12 men) may not distinguish between certain colors. Everyone is affected by poor contrast in bright sunlight or on low-quality displays.</p>

<div class="do-dont-grid">
<div class="do-card" markdown="1">

### Do

- Use 4.5:1 contrast for normal text (under 18pt or 14pt bold)
- Use 3:1 contrast for large text (18pt+ or 14pt+ bold) and UI components
- Test colors with a [contrast checker](https://webaim.org/resources/contrastchecker/){:target="_blank" rel="noopener"}
- Use color **plus** another indicator (icon, text label, pattern)
- Test designs in grayscale to verify information isn't lost
- Ensure focus indicators have 3:1 contrast against their background

</div>
<div class="dont-card" markdown="1">

### Don't

- Use light gray text on white backgrounds
- Rely on color alone to convey meaning (red = error, green = success)
- Use red/green as the only differentiator
- Ignore focus indicator contrast
- Skip testing with color blindness simulators
- Assume dark mode automatically fixes contrast issues

</div>
</div>

<details>
<summary><strong>Example: Color-only vs. multi-cue communication</strong></summary>

**Inaccessible — color only:**
> Required fields are shown in red.
>
> *(A person with color blindness sees no difference)*

**Accessible — color plus text plus icon:**
> Required fields are marked with a red asterisk (*) and the word "Required."
>
> *(Everyone can identify required fields regardless of color perception)*

**UA brand safe combinations:** UA Navy (#0C234B) on white = 14.2:1 | Arizona Red (#AB0520) on white = 7.3:1 | See the [Accessible Branding guide](brand-identity.html) for complete ratios.

</details>

</div>

---

<div>
<h2 id="forms">Forms</h2>

<p><strong>WCAG Criteria:</strong> <a href="https://www.w3.org/WAI/WCAG22/quickref/#labels-or-instructions" target="_blank" rel="noopener">3.3.2 Labels or Instructions (A)</a>, <a href="https://www.w3.org/WAI/WCAG22/quickref/#error-identification" target="_blank" rel="noopener">3.3.1 Error Identification (A)</a>, <a href="https://www.w3.org/WAI/WCAG22/quickref/#error-suggestion" target="_blank" rel="noopener">3.3.3 Error Suggestion (AA)</a>, <a href="https://www.w3.org/WAI/WCAG22/quickref/#error-prevention-legal-financial-data" target="_blank" rel="noopener">3.3.4 Error Prevention (AA)</a></p>

<p><strong>Who's affected:</strong> Screen reader users rely on programmatic label associations — without them, a form field is announced as just "edit text" with no context. People with cognitive disabilities need clear instructions and error messages. People with motor disabilities need forms that don't time out while they're still typing.</p>

<div class="do-dont-grid">
<div class="do-card" markdown="1">

### Do

- Label every form field with a visible `<label>` element
- Associate labels with inputs programmatically (`for`/`id` pairing)
- Group related fields with `<fieldset>` and `<legend>`
- Provide clear, specific error messages ("Email must include @")
- Indicate required fields explicitly (asterisk + "Required")
- Offer suggestions when users make errors

</div>
<div class="dont-card" markdown="1">

### Don't

- Use placeholder text as the only label (it disappears on focus)
- Rely on color alone to show errors (red border without text message)
- Time out forms too quickly (allow at least 20 seconds per field)
- Reset forms without warning or confirmation
- Use CAPTCHAs without accessible alternatives
- Change context (navigate away) when a field value changes

</div>
</div>

<details>
<summary><strong>Example: Accessible form field</strong></summary>

```html
<!-- Accessible: visible label, associated, error message -->
<div class="form-group">
  <label for="email">Email address <span aria-hidden="true">*</span>
    <span class="sr-only">(required)</span>
  </label>
  <input type="email" id="email" name="email" 
         required aria-describedby="email-error"
         aria-invalid="true">
  <p id="email-error" class="error-message" role="alert">
    Please enter a valid email address (e.g., netid@arizona.edu)
  </p>
</div>
```

</details>

</div>

---

<div>
<h2 id="keyboard">Keyboard &amp; Focus</h2>

<p><strong>WCAG Criteria:</strong> <a href="https://www.w3.org/WAI/WCAG22/quickref/#keyboard" target="_blank" rel="noopener">2.1.1 Keyboard (A)</a>, <a href="https://www.w3.org/WAI/WCAG22/quickref/#no-keyboard-trap" target="_blank" rel="noopener">2.1.2 No Keyboard Trap (A)</a>, <a href="https://www.w3.org/WAI/WCAG22/quickref/#focus-visible" target="_blank" rel="noopener">2.4.7 Focus Visible (AA)</a>, <a href="https://www.w3.org/WAI/WCAG22/quickref/#focus-not-obscured-minimum" target="_blank" rel="noopener">2.4.11 Focus Not Obscured (AA)</a></p>

<p><strong>Who's affected:</strong> People who can't use a mouse — including people with motor disabilities, some blind users, power users who prefer keyboard navigation, and anyone with a temporary injury (broken arm, RSI). If your interface requires a mouse, these users are completely locked out.</p>

<div class="do-dont-grid">
<div class="do-card" markdown="1">

### Do

- Make **all** interactive elements keyboard-accessible
- Keep focus indicators visible (`outline: 3px solid var(--ua-maroon)`)
- Maintain logical tab order (matches visual reading order)
- Provide skip links ("Skip to main content")
- Let users press Escape to close modals and menus
- Return focus to the trigger element when closing a modal

</div>
<div class="dont-card" markdown="1">

### Don't

- Remove focus outlines with `outline: none` (without a visible replacement)
- Create keyboard traps (user can Tab in but can't Tab out)
- Use positive `tabindex` values (1, 2, 3...) — only use 0 or -1
- Require mouse hover for any essential feature
- Auto-advance focus unexpectedly without user action
- Hide focused elements behind sticky headers or footers

</div>
</div>

<details>
<summary><strong>Quick keyboard test for any page</strong></summary>

1. **Set down your mouse.** Don't touch it again until the test is done.
2. Press **Tab** to move forward through interactive elements
3. Press **Shift+Tab** to move backward
4. Press **Enter** or **Space** to activate buttons and links
5. Press **Arrow keys** to navigate within menus, tabs, and radio groups
6. Press **Escape** to close popups, modals, and menus

**Pass criteria:**
- Can you reach every interactive element?
- Can you see where focus is at all times?
- Can you activate everything?
- Can you get out of every component without getting stuck?
- Does focus order match the visual layout?

</details>

</div>

---

<div>
<h2 id="video">Video &amp; Audio</h2>

<p><strong>WCAG Criteria:</strong> <a href="https://www.w3.org/WAI/WCAG22/quickref/#captions-prerecorded" target="_blank" rel="noopener">1.2.2 Captions – Prerecorded (A)</a>, <a href="https://www.w3.org/WAI/WCAG22/quickref/#audio-description-or-media-alternative-prerecorded" target="_blank" rel="noopener">1.2.3 Audio Description (A)</a>, <a href="https://www.w3.org/WAI/WCAG22/quickref/#captions-live" target="_blank" rel="noopener">1.2.4 Captions – Live (AA)</a>, <a href="https://www.w3.org/WAI/WCAG22/quickref/#three-flashes-or-below-threshold" target="_blank" rel="noopener">2.3.1 Three Flashes (A)</a></p>

<p><strong>Who's affected:</strong> Deaf and hard-of-hearing users need captions. Blind users need audio descriptions of visual-only content. People with vestibular disorders are harmed by flashing content. People in noisy environments or quiet settings (library, bus) also benefit. Captions help ESL students and improve comprehension for everyone.</p>

<div class="do-dont-grid">
<div class="do-card" markdown="1">

### Do

- Add accurate captions to **all** videos
- Edit auto-generated captions for accuracy (they're typically 70–80% accurate)
- Include speaker identification ("[Dr. Park]" or "DR. PARK:")
- Provide transcripts for audio-only content (podcasts, recordings)
- Add audio descriptions when visual content isn't described in the narration
- Caption sound effects and music cues ("[applause]" "[upbeat music]")

</div>
<div class="dont-card" markdown="1">

### Don't

- Rely on auto-captions without editing (they miss names, jargon, and accented speech)
- Autoplay video with sound (users should have control)
- Flash content more than 3 times per second (seizure risk)
- Omit speaker names in multi-speaker captions
- Use audio without a text alternative
- Caption only some of the words (paraphrasing instead of full captions)

</div>
</div>

<details>
<summary><strong>Caption formatting best practices</strong></summary>

| Rule | Standard |
|---|---|
| Maximum lines per caption | 2 lines |
| Maximum characters per line | 32 characters |
| Maximum reading speed | 150–160 WPM |
| Minimum display time | 1 second |
| Maximum display time | 6 seconds |
| Speaker identification | [Name] or NAME: at start of segment |
| Sound descriptions | [in brackets, lowercase]: [door closes] |
| Music | [♪ upbeat jazz music ♪] |

**UA captioning support:** Panopto provides automatic captioning in D2L Brightspace. Always review and edit auto-captions before publishing. Contact [UCATT](https://ucatt.arizona.edu){:target="_blank" rel="noopener"} for captioning assistance.

</details>

</div>

---

<div>
<h2 id="documents">Documents</h2>

<p><strong>WCAG Criteria:</strong> <a href="https://www.w3.org/WAI/WCAG22/quickref/#info-and-relationships" target="_blank" rel="noopener">1.3.1 Info and Relationships (A)</a>, <a href="https://www.w3.org/WAI/WCAG22/quickref/#meaningful-sequence" target="_blank" rel="noopener">1.3.2 Meaningful Sequence (A)</a>, <a href="https://www.w3.org/WAI/WCAG22/quickref/#non-text-content" target="_blank" rel="noopener">1.1.1 Non-text Content (A)</a></p>

<p><strong>Who's affected:</strong> Screen reader users depend on document structure — headings, lists, tables — to understand and navigate content. Without structure, a Word document or PDF is a wall of undifferentiated text. Students using assistive technology are especially impacted when course materials are inaccessible.</p>

<div class="do-dont-grid">
<div class="do-card" markdown="1">

### Do

- Use built-in heading styles (Home → Styles in Word)
- Run the accessibility checker before sharing (Review → Check Accessibility)
- Add alt text to all images in the document
- Create real tables with designated header rows/columns
- Use meaningful hyperlink text (not raw URLs)
- Set the document language (File → Options → Language)
- Add a document title (File → Properties → Title)

</div>
<div class="dont-card" markdown="1">

### Don't

- Create structure with manual formatting (bold for headings, spaces for indentation)
- Use text boxes for layout in Word (screen readers may skip them entirely)
- Scan documents as images without OCR (they're just pictures of text)
- Create fake tables with tabs or spaces (no semantic structure)
- Share PDFs without checking accessibility first
- Forget to export from the source application (edit in Word, not in the PDF)

</div>
</div>

<details>
<summary><strong>The 5-minute accessibility check for any document</strong></summary>

1. **Run the checker:** Review → Check Accessibility (Word/PowerPoint) or Tools → Accessibility (Google Docs)
2. **Check headings:** View the Navigation Pane — does it show a logical outline?
3. **Check images:** Click each image — does it have alt text?
4. **Check tables:** Do tables have designated header rows? Are they simple (no merged cells)?
5. **Check links:** Are link texts descriptive? Do they make sense out of context?

**Time investment:** 5 minutes per document. **Impact:** Makes the document usable for the 26% of students, faculty, and staff who have a disability.

See the [6 Tips for Accessible Documents](https://itaccessibility.arizona.edu/content/ms-office){:target="_blank" rel="noopener"} from UA IT Accessibility.

</details>

</div>

---

<div>
<h2 id="social">Social Media</h2>

<p><strong>WCAG Criteria:</strong> <a href="https://www.w3.org/WAI/WCAG22/quickref/#non-text-content" target="_blank" rel="noopener">1.1.1 Non-text Content (A)</a>, <a href="https://www.w3.org/WAI/WCAG22/quickref/#captions-prerecorded" target="_blank" rel="noopener">1.2.2 Captions (A)</a>, <a href="https://www.w3.org/WAI/WCAG22/quickref/#images-of-text" target="_blank" rel="noopener">1.4.5 Images of Text (AA)</a></p>

<p><strong>Who's affected:</strong> Screen reader users on social media platforms rely entirely on alt text for images and captions for video. Hashtags without CamelCase are read as one garbled word. Emoji-heavy posts are announced character by character ("clapping hands clapping hands clapping hands fire fire 100 100").</p>

<div class="do-dont-grid">
<div class="do-card" markdown="1">

### Do

- Add alt text to images (most platforms support it)
- Use CamelCase for hashtags (#AccessibilityMatters, #BearDown)
- Put @mentions and hashtags at the end of the post
- Add captions to all video content
- Describe animated GIFs in the post text
- Write the key info in text — don't post flyer images as the only content

</div>
<div class="dont-card" markdown="1">

### Don't

- Post images without descriptions
- Overuse emojis (1–3 per post is fine; 10+ is a screen reader nightmare)
- Use ASCII art or decorative Unicode characters ("𝓕𝓪𝓷𝓬𝔂 𝓉𝓮𝔁𝓉" is unreadable to screen readers)
- Post videos without captions
- Share flyer images without the text content in the caption
- Use hashtags as #Every #Single #Word #Is #A #Hashtag

</div>
</div>

<details>
<summary><strong>Platform-specific alt text instructions</strong></summary>

| Platform | How to Add Alt Text |
|---|---|
| **Instagram** | Create post → Next → Advanced Settings → Write Alt Text |
| **Facebook** | Upload photo → Click "Edit" → Alternative Text → Custom Alt Text |
| **X (Twitter)** | Upload image → Click "Add description" on the image |
| **LinkedIn** | Upload image → Click the image → Alt text |
| **YouTube** | Upload/edit → Transcript section → Add subtitles/CC |

**Pro tip:** Write your alt text before you post — copy the key info from the flyer or graphic into a note, then paste it into the platform's alt text field.

</details>

</div>

---

## Printable Posters {#posters}

Download these guides to share with your team — print them, post them near shared computers, or share in your department Slack/Teams:

- General Accessibility Do's and Don'ts (PDF)
- Document Accessibility Quick Reference (PDF)
- Social Media Accessibility Guide (PDF)

> **Request custom posters:** Need a poster customized for your department or role? Contact [accessibility@arizona.edu](mailto:accessibility@arizona.edu) — we can create role-specific quick references for your team.

## Related Resources

### On This Site

- [Accessibility 101](accessibility-101.html) — Getting started with digital accessibility
- [Heading Structure Best Practices](heading-basics.html) — Deep dive into heading hierarchy
- [Writing Meaningful Link Text](meaningful-links.html) — Detailed link text guidance
- [Color & Contrast Guidelines](color-contrast.html) — Comprehensive contrast guide
- [Accessible Branding](brand-identity.html) — UA color ratios and font guidance
- [Accessible Documents Overview](documents-overview.html) — Document accessibility across formats
- [Media Captioning Guide](media-captioning.html) — Video and audio captioning
- [Social Media Accessibility](social-media.html) — Platform-specific guidance

### External Resources

- [WCAG 2.2 Quick Reference](https://www.w3.org/WAI/WCAG22/quickref/){:target="_blank" rel="noopener"} — Full searchable/filterable criteria
- [WebAIM Articles](https://webaim.org/articles/){:target="_blank" rel="noopener"} — Detailed technical articles on each topic
- [UA Digital Accessibility Home](https://accessibility.arizona.edu){:target="_blank" rel="noopener"}
- [6 Tips for Accessible Documents](https://itaccessibility.arizona.edu/content/ms-office){:target="_blank" rel="noopener"}
- [Video Captioning Info](https://itaccessibility.arizona.edu/content/captioning-info){:target="_blank" rel="noopener"}

### Need Help?

Contact [accessibility@arizona.edu](mailto:accessibility@arizona.edu) or [request a consultation](https://forms.office.com/Pages/ResponsePage.aspx?id=BVXjXo7rKUmTfWRd9QEyiLCO6hETU85MhSR1uWmtS-FUQTRKWjE5SzVPVDNaVUwyRTdCRUg4Q1lVUSQlQCN0PWcu){:target="_blank" rel="noopener"}.
