---
layout: default
breadcrumb_parent: "Documents & Media"
breadcrumb_parent_url: documents-media.html
title: Adobe Creative Suite Accessibility
summary: "Create accessible content in InDesign, Photoshop, Illustrator, Premiere Pro, After Effects, and Acrobat Pro — with step-by-step workflows, WCAG mappings, and UA-specific guidance."
owner: UCATT Multimedia + Adobe & Arizona Team
last_reviewed: 2026-02-17
next_review: 2026-05-17
tags:
  - format:adobe
  - persona:content-creators
sources:
  - Adobe Accessibility — https://www.adobe.com/accessibility.html
  - Adobe Creating Accessible PDFs — https://helpx.adobe.com/indesign/using/creating-accessible-pdfs.html
  - WCAG 2.2 — https://www.w3.org/TR/WCAG22/
  - PDF/UA Standard — https://pdfa.org/resource/pdfua-in-a-nutshell/
  - Accessibility | Home — https://accessibility.arizona.edu
  - UA Software Licensing — https://softwarelicense.arizona.edu
---

<nav class="toc" aria-label="Table of contents">
<h2>On This Page</h2>
<ul>
<li><a href="#overview">Overview &amp; Choosing the Right App</a></li>
<li><a href="#indesign">Adobe InDesign</a></li>
<li><a href="#photoshop">Adobe Photoshop</a></li>
<li><a href="#illustrator">Adobe Illustrator</a></li>
<li><a href="#premiere">Adobe Premiere Pro</a></li>
<li><a href="#after-effects">Adobe After Effects</a></li>
<li><a href="#acrobat">Adobe Acrobat Pro</a></li>
<li><a href="#checklists">Accessibility Checklists</a></li>
<li><a href="#ua-resources">UA Resources &amp; Licensing</a></li>
</ul>
</nav>

<div class="callout callout-info">
<h3>UA Adobe Licensing</h3>
<p>The University of Arizona provides Adobe Creative Cloud licenses to faculty, staff, and students. Check <a href="https://softwarelicense.arizona.edu" target="_blank" rel="noopener">softwarelicense.arizona.edu</a> for current availability, or contact your department IT coordinator. For Adobe-specific training and support, email <a href="mailto:adobe@arizona.edu">adobe@arizona.edu</a>.</p>
</div>

## Overview & Choosing the Right App {#overview}

Adobe Creative Suite is powerful — but accessibility doesn't happen automatically. Each application has different capabilities and limitations when it comes to producing accessible output. Choosing the right tool for the job is the first step.

### When to Use Which App

| Task | Best Tool | Accessibility Notes |
|---|---|---|
| Multi-page documents (reports, brochures, newsletters) | **InDesign** | Best path to accessible tagged PDFs. Use paragraph styles mapped to PDF tags. |
| Single-page flyers or posters | **InDesign** or [Canva](canva-flyers.html) | InDesign for complex layouts; Canva for quick turnaround. Always provide a text alternative. |
| Photo editing and image creation | **Photoshop** | Output is raster images — accessibility depends on where the image is placed (alt text, context). |
| Vector graphics, logos, infographics | **Illustrator** | SVG export can include accessibility metadata. Always provide text alternatives for complex graphics. |
| Video production | **Premiere Pro** | Built-in captioning tools. Always add and review captions before publishing. |
| Motion graphics and animation | **After Effects** | High risk for accessibility issues (motion, flashing). Always provide static alternatives. |
| PDF checking and remediation | **Acrobat Pro** | Essential final step for any PDF. Run accessibility check and fix issues before distribution. |

### The Accessibility Workflow

Regardless of which app you use, the workflow is the same:

1. **Plan structure first** — Decide on heading hierarchy, reading order, and content organization before designing
2. **Build accessibility in** — Use styles, tags, alt text, and semantic structure as you create
3. **Check before export** — Use the app's built-in checks where available
4. **Verify the output** — Test the exported file (PDF in Acrobat, video with captions, images with alt text in context)
5. **Provide alternatives** — For complex visual content, always provide a text-based alternative

### WCAG Criteria That Apply to Creative Content

| Criterion | Requirement | Adobe Relevance |
|---|---|---|
| 1.1.1 Non-text Content (A) | Text alternatives for all non-text content | Alt text for images, infographics, charts |
| 1.2.2 Captions (A) | Captions for prerecorded audio in video | Premiere Pro captions |
| 1.3.1 Info and Relationships (A) | Structure conveyed programmatically | InDesign paragraph styles → PDF tags |
| 1.3.2 Meaningful Sequence (A) | Correct reading order | InDesign Articles panel, Acrobat reading order |
| 1.4.3 Contrast Minimum (AA) | 4.5:1 for text, 3:1 for large text | All apps — check text contrast |
| 1.4.5 Images of Text (AA) | Use real text instead of images of text | Photoshop, Illustrator — avoid text in images |
| 1.4.11 Non-text Contrast (AA) | 3:1 for UI components and graphics | Icons, chart elements, meaningful borders |
| 2.3.1 Three Flashes (A) | No more than 3 flashes per second | After Effects, Premiere Pro |

---

## Adobe InDesign {#indesign}

InDesign is the best Adobe tool for creating accessible PDFs — when used correctly. The key is building structure with paragraph styles that map to PDF tags, so assistive technology can navigate your document.

### Structure with Paragraph Styles

- **Create styles:** Define paragraph styles for Heading 1, Heading 2, Heading 3, Body Text, List Item, Caption, etc.
- **Apply consistently:** Use styles exclusively — never manually format text by changing size/weight directly
- **Map to PDF tags:** This is the critical step that makes your PDF accessible

**Why this matters (WCAG 1.3.1):** Screen reader users navigate PDFs by heading, just like web pages. Without proper tags, a beautifully designed brochure is an undifferentiated wall of text.

### Setting Up Tag Export

1. Open **Window → Styles → Paragraph Styles**
2. Right-click a style → **Edit [style name]**
3. Go to **Export Tagging** tab
4. Set the **PDF Tag** for each style:

| Paragraph Style | PDF Tag | Purpose |
|---|---|---|
| Title | `<H1>` | Document title (one per document) |
| Heading 1 | `<H1>` | Main sections |
| Heading 2 | `<H2>` | Subsections |
| Heading 3 | `<H3>` | Sub-subsections |
| Body Text | `<P>` | Regular paragraphs |
| List Item | `<LI>` | Bulleted or numbered list items |
| Caption | `<Caption>` | Image and table captions |
| Pull Quote | `<BlockQuote>` | Quoted text |

5. Repeat for all styles in your document

### Adding Alt Text to Images

1. Select the image frame
2. **Object → Object Export Options** (or right-click → Object Export Options)
3. In the **Alt Text** tab:
   - Source: **Custom**
   - Enter your description in the text field
4. For decorative images:
   - Check **Apply Tag: Artifact** (this tells assistive technology to skip it)

**Guidelines:**
- Describe the image's **purpose** in the document, not just what it shows
- Keep alt text under 125 characters for simple images
- For complex images (charts, infographics), provide a longer description nearby in the document text
- Photos: describe people, actions, settings relevant to the content
- Charts: summarize the key data point or trend

### Articles Panel for Reading Order

The Articles panel controls the order in which content is read by assistive technology — critical for multi-column layouts.

1. Open **Window → Articles**
2. Click the **New Article** icon (+ button)
3. Name the article (e.g., "Main Content")
4. Drag content frames into the article **in the order they should be read**
5. For multi-page documents, add frames page by page in reading sequence

**Common reading order mistakes:**
- Sidebars read before the main content they relate to
- Footnotes read in the middle of body text
- Captions separated from their images
- Headers/footers read as part of the main flow

### Tables in InDesign

- Create tables using **Table → Insert Table** (never fake tables with tabs or text frames)
- Select header row(s), then **Table → Convert Rows → To Header**
- Headers repeat on each page/column break and are properly tagged in PDF
- Keep tables simple — avoid merged cells when possible
- Add a table summary or caption above the table

### Exporting Accessible PDFs

1. **File → Export** (Ctrl+E / Cmd+E)
2. Choose **Adobe PDF (Print)** or **Adobe PDF (Interactive)**
3. In the export dialog:
   - ✅ **Create Tagged PDF**
   - ✅ **Use Structure for Tab Order**
   - Set **Bookmarks** to create from headings/structure
4. After export, **always verify in Acrobat Pro** — InDesign export is a starting point, not a guarantee

> **Pro tip:** Export to PDF (Print) for most documents. PDF (Interactive) is for documents with buttons, form fields, or hyperlinks that need to remain interactive.

---

## Adobe Photoshop {#photoshop}

Photoshop creates raster images — bitmaps of pixels. The output itself has no semantic structure, so accessibility depends entirely on **how the image is used** in its destination (website, email, document).

### The Photoshop Accessibility Paradox

Photoshop is inherently accessible-neutral: it creates pictures. The accessibility work happens when you **place** the image somewhere:
- On a website → provide `alt` text in the HTML
- In a document → add alt text in Word/InDesign
- On social media → use the platform's alt text feature
- In an email → add alt text in the email editor

Your job in Photoshop is to create images that **support** accessibility.

### Color and Contrast

- **Check contrast:** Use the Info panel (Window → Info) to compare foreground/background color values
- **Simulate color blindness:** View → Proof Setup → Color Blindness — choose Protanopia or Deuteranopia
- **Don't use color alone:** Add patterns, labels, icons, or textures to distinguish elements in charts and graphics
- **Test in grayscale:** Image → Mode → Grayscale (work on a copy!) — can you still distinguish all elements?

### Text in Images

> **Avoid text in images whenever possible.** Use real HTML text on web pages, real text in documents, and text in email bodies. When text is baked into an image, it can't be resized, searched, translated, or read by assistive technology.

**When you must include text in an image:**
- Use high contrast (4.5:1 minimum for normal text, 3:1 for large text ≥ 24px)
- Use large, clear sans-serif fonts (minimum 16pt equivalent)
- Keep text to an absolute minimum — headlines only, not paragraphs
- Document every word of text for alt text when the image is placed
- Consider providing the text content separately (caption, description, adjacent text)

### Exporting for Web

- **File → Export → Export As** — preferred for web assets
- **PNG:** Graphics with sharp edges, text, transparency
- **JPG:** Photographs and continuous-tone images
- Optimize file size without sacrificing readability (large files = slow loads = poor experience)
- Remember: add alt text where the image is **placed**, not in Photoshop

### Social Media Graphics

1. Keep text minimal and large (can someone read it on a phone screen?)
2. Ensure high contrast between text and background
3. Document all text content — you'll need it for the alt text and caption
4. Test with color blindness simulation (View → Proof Setup)
5. Leave space for platform UI elements (profile picture overlays, action buttons)
6. See the [Canva & Accessible Flyers guide](canva-flyers.html) for publishing patterns

---

## Adobe Illustrator {#illustrator}

Illustrator creates vector graphics — scalable illustrations, logos, icons, and infographics. The SVG export format offers unique accessibility opportunities.

### SVG Accessibility

SVG (Scalable Vector Graphics) is an XML-based format that can include accessibility information natively. This makes it the most accessible image format for the web.

```html
<!-- Accessible SVG with title and description -->
<svg role="img" aria-labelledby="chart-title chart-desc"
     xmlns="http://www.w3.org/2000/svg" viewBox="0 0 400 300">
  <title id="chart-title">UA Enrollment by College, Fall 2025</title>
  <desc id="chart-desc">Bar chart showing enrollment. 
    College of Science leads with 8,200 students, followed by 
    Engineering at 6,100 and Liberal Arts at 5,800.</desc>
  <!-- graphic content -->
</svg>
```

```html
<!-- Decorative SVG — hide from assistive technology -->
<svg aria-hidden="true" focusable="false">
  <!-- decorative pattern or border -->
</svg>
```

### Adding Metadata in Illustrator

1. **File → File Info** (Ctrl+Alt+Shift+I / Cmd+Opt+Shift+I)
2. Add **Title** — becomes the SVG `<title>` element
3. Add **Description** — becomes the SVG `<desc>` element
4. This metadata carries through to SVG export

### Exporting Accessible SVGs

1. **File → Export → Export As**
2. Choose **SVG** format
3. In SVG Options:
   - ✅ Responsive (scales to container)
   - Decimal Places: 2 (balances precision and file size)
   - Minify: only for production (harder to edit later)
4. After export, verify the SVG includes `<title>` and `<desc>` elements

### Creating Accessible Infographics

Infographics are one of the most challenging accessibility problems — they convey complex information visually. Follow these guidelines:

1. **Plan the text alternative first** — Write the key message and data points in plain text before designing
2. **Use clear visual hierarchy** — Size, position, and contrast to show importance
3. **Don't rely on color alone** — Add patterns, labels, and textures to distinguish data
4. **Include text labels directly on the graphic** — Don't make viewers decode a color legend
5. **Create a companion text version** — A structured HTML page with headings, tables, and descriptions
6. **Export at multiple resolutions** — Allow users to zoom without quality loss (SVG is ideal)

> **For complex infographics:** Always provide a separate, structured text alternative. A brief alt text like "Infographic showing accessibility compliance data — see full description below" plus a detailed HTML version is the accessible pattern.

---

## Adobe Premiere Pro {#premiere}

Premiere Pro is UA's recommended video editing platform. Its built-in captioning tools make it one of the most accessible-friendly video editors available.

### Why Captions Are Non-Negotiable

- **Legal requirement:** WCAG 1.2.2 requires captions for all prerecorded video with audio
- **Title II deadline:** All UA video content must be captioned by April 2026
- **Beyond compliance:** Captions improve comprehension for ESL viewers, noisy environments, quiet settings, and search indexing
- **Auto-captions are a starting point, not a solution:** Auto-generated captions are typically 70–80% accurate — they miss proper nouns, technical terms, accented speech, and speaker changes

### Adding Captions — Step by Step

1. **Open the Text panel:** Window → Text
2. **Transcribe first:** Click "Transcribe Sequence" — Premiere generates an automatic transcription
3. **Review and correct:** Read every word. Fix names, technical terms, and misheard words. This is the most important step.
4. **Create captions from transcript:** Click "Create Captions" — Premiere generates timed caption segments
5. **Adjust timing:** Each caption should:
   - Appear when the speaker starts the phrase
   - Disappear after the last word (with a brief pause)
   - Stay on screen 1–6 seconds
   - Not overlap with the next caption

### Caption Formatting Standards

| Rule | Standard | Why |
|---|---|---|
| Maximum lines | 2 per caption | More lines are hard to read quickly |
| Maximum characters per line | 32 | Longer lines are hard to track |
| Maximum reading speed | 150–160 WPM | Faster rates lose viewers |
| Minimum display time | 1 second | Shorter flashes are unreadable |
| Maximum display time | 6 seconds | Stale captions confuse viewers |
| Speaker identification | [Dr. Park] or DR. PARK: | Essential for multi-speaker content |
| Sound descriptions | [applause] [music fades] | Convey non-speech audio information |
| Music | [♪ upbeat jazz ♪] | Describe genre/mood, not lyrics unless relevant |

### Transcription Workflow

For the most accurate results:

1. **Auto-transcribe** in Premiere (Window → Text → Transcribe Sequence)
2. **Export the transcript** as a text file
3. **Edit for accuracy** — fix every error (names, acronyms, specialized vocabulary)
4. **Re-import if needed** or edit directly in the Text panel
5. **Create captions** from the corrected transcript
6. **Verify timing** — play through the video with captions visible and check sync

### Exporting Captions

| Format | Type | Best For |
|---|---|---|
| **SRT** | Closed captions (sidecar file) | YouTube, Vimeo, most web players; user can toggle on/off |
| **VTT (WebVTT)** | Closed captions (sidecar file) | HTML5 video players, W3C standard |
| **Burned in** | Open captions (part of video) | Social media (Instagram, TikTok where closed captions aren't reliable) |

**Export closed captions:** File → Export → Captions — choose SRT or VTT
**Burn in captions:** In Export settings → Captions → Burn Captions Into Video

> **Best practice:** Provide **both** a burned-in version (for social media) and a version with sidecar captions (for web and LMS). Closed captions are preferred because users can control appearance (size, color, background).

### Audio Descriptions

When visual-only content conveys important information (text on screen, charts, actions without narration), provide audio descriptions:

- **Extended audio description:** Pause the video to add narrated description
- **Descriptive narration:** Include descriptions in the main narration script from the start
- **Text alternative:** Provide a transcript that includes visual descriptions: "[Slide showing three-step process: Plan, Build, Test]"

---

## Adobe After Effects {#after-effects}

Motion graphics and animations create the highest accessibility risks in the Adobe suite. Take extra care with this application.

### Motion Risks (WCAG 2.3.1, 2.3.2)

- **Flashing:** Content that flashes more than 3 times per second can trigger seizures in people with photosensitive epilepsy. This is a **critical safety issue**, not just a compliance checkbox.
- **Vestibular triggers:** Large-scale motion, parallax effects, and rapid zooming can cause dizziness, nausea, and disorientation in people with vestibular disorders.
- **Autoplay:** Animations that start automatically without user control are disruptive to everyone, especially screen reader users.

### Reducing Motion Risks

1. **Analyze your animation** for flashing: Use the [Photosensitive Epilepsy Analysis Tool (PEAT)](https://trace.umd.edu/peat/){:target="_blank" rel="noopener"} or [Harding Test](https://hardingfpa.com/){:target="_blank" rel="noopener"} to check for dangerous flash rates
2. **Provide static alternatives:** For every animation, create a static image version that conveys the same information
3. **Add content warnings:** If intense motion is essential, warn users before playback
4. **Support `prefers-reduced-motion`:** When animations are used on the web, respect this CSS media query
5. **Keep motion purposeful:** Every animation should communicate something — eliminate decorative motion

### Text in Animations

- Keep text on screen **long enough to read** — minimum 2 seconds for short phrases, longer for sentences
- Use high contrast (4.5:1 minimum) between text and all background frames
- Avoid text that moves, spins, or scales while the viewer should be reading it
- Provide a transcript or text alternative for text-heavy animations
- Test: pause each frame with text — is it readable?

### Web Animations (CSS/JS) from After Effects

When exporting animations for the web (via Lottie, Bodymovin, or CSS):

```css
/* Always respect user's motion preferences */
@media (prefers-reduced-motion: reduce) {
  .animation-container {
    animation: none;
    transition: none;
  }
  /* Show the final state or a static alternative */
  .animation-container::after {
    content: '';
    /* static version of the graphic */
  }
}
```

```javascript
// Check reduced motion preference in JavaScript
const prefersReducedMotion = window.matchMedia(
  '(prefers-reduced-motion: reduce)'
).matches;

if (prefersReducedMotion) {
  // Show static version, skip animation
  showStaticAlternative();
} else {
  // Play animation
  playAnimation();
}
```

---

## Adobe Acrobat Pro {#acrobat}

Acrobat Pro is the essential final step for **every** PDF your team produces. Even PDFs exported from InDesign with proper tagging need verification and often remediation in Acrobat.

### The Accessibility Check

1. **Tools → Accessibility** (or All Tools → Prepare for Accessibility in newer versions)
2. Click **Accessibility Check** (Full Check)
3. Leave all checking options selected (Document, Page Content, Forms, Tables, Alt Text)
4. Click **Start Checking**
5. Review the report — click each issue to navigate to it in the document
6. Fix issues directly or go back to the source application

### Understanding Results

| Icon | Meaning | Action |
|---|---|---|
| ✅ Pass | Meets requirements | No action needed |
| ❌ Fail | Does not meet requirements | Must fix before distribution |
| ⚠️ Needs manual check | Can't be verified automatically | You must verify visually/manually |
| ⏭️ Skipped | Check was not run | Run the full check |

### Common Issues and Fixes

| Issue | Where to Fix | How |
|---|---|---|
| Missing document title | File → Properties → Description | Add a descriptive title (not the filename) |
| Missing language | File → Properties → Advanced → Reading Options | Set the primary language (English) |
| Missing alt text | Tags panel → right-click image tag → Properties | Add alternative text description |
| Wrong reading order | View → Navigation Panels → Order | Drag elements to correct sequence |
| Untagged content | Tools → Accessibility → Reading Order | Draw boxes around content and assign tags |
| Missing table headers | Tags panel → find `<TD>` that should be `<TH>` → Properties | Change Scope to Row or Column |
| Empty tags | Tags panel → find empty tags | Delete empty tags or add content |
| Missing bookmarks | Bookmarks panel | Create bookmarks from headings manually |

### Reading Order Tool — Step by Step

The Reading Order tool is your primary remediation instrument:

1. **Tools → Accessibility → Reading Order** (or Set Alternate Text and Reading Order)
2. The page shows numbered regions indicating current reading order
3. **To fix reading order:** Click "Show Order Panel" → drag items up/down
4. **To tag content:** Draw a rectangle around untagged content → click the appropriate button (Text, Figure, Table, Heading 1–6, etc.)
5. **To mark decorative content:** Select the element → click "Background/Artifact" (removes from reading order)
6. **To fix a figure:** Select → click "Figure" → right-click → Edit Alternate Text

### PDF Remediation Workflow

For heavily inaccessible PDFs (scans, legacy documents, complex layouts):

1. **Can you go back to the source?** Edit in Word/InDesign, fix there, re-export. Always preferred.
2. **Is it a scan?** Run OCR first: Tools → Scan & OCR → Recognize Text
3. **Run the accessibility check** to identify all issues
4. **Fix in order:** Title/Language → Tags/Structure → Reading Order → Alt Text → Tables → Forms
5. **Re-run the check** to verify fixes
6. **Manual verification:** Navigate the PDF with a screen reader (NVDA or JAWS) to confirm

See the [PDF Remediation Guide](pdf-remediation.html) for detailed walkthroughs.

---

## Accessibility Checklists {#checklists}

### InDesign → PDF Checklist

- [ ] Created paragraph styles for all text levels (H1, H2, H3, Body, List Item, Caption)
- [ ] Mapped every paragraph style to the correct PDF tag (Export Tagging)
- [ ] Added alt text to all meaningful images (Object Export Options)
- [ ] Marked decorative images as Artifact
- [ ] Set reading order in the Articles panel
- [ ] Table headers designated (Table → Convert Rows → To Header)
- [ ] No merged table cells (or merged cells are properly tagged)
- [ ] Exported with "Create Tagged PDF" and "Use Structure for Tab Order" enabled
- [ ] Verified the PDF in Acrobat Pro (ran accessibility check)
- [ ] PDF has a document title (not just a filename)
- [ ] PDF language is set

### Photoshop / Illustrator — Images Checklist

- [ ] Text contrast meets 4.5:1 (normal) or 3:1 (large/bold) against all backgrounds
- [ ] Tested with color blindness simulation (View → Proof Setup → Color Blindness)
- [ ] Color is not the only indicator of meaning (added labels, patterns, or icons)
- [ ] Text in images is minimized — used only for headings/titles, not body text
- [ ] All text content documented for alt text when the image is placed
- [ ] SVG exports include `<title>` and `<desc>` elements (Illustrator)
- [ ] Complex infographics have a companion text alternative planned
- [ ] File size optimized for web delivery without sacrificing readability

### Premiere Pro — Video Checklist

- [ ] Auto-transcription reviewed and corrected word-by-word
- [ ] Captions timed correctly (sync with speech, 1–6 seconds per segment)
- [ ] Speaker identification included for multi-speaker content
- [ ] Sound effects and music described in captions ([applause], [♪ jazz ♪])
- [ ] Caption format: max 2 lines, max 32 characters per line, max 160 WPM
- [ ] No flashing content (or content analyzed with PEAT/Harding Test)
- [ ] Captions exported as SRT or VTT (closed) and/or burned in (open)
- [ ] Full transcript available as separate text document
- [ ] Audio descriptions provided for visual-only information (if applicable)

### After Effects — Animation Checklist

- [ ] No content flashes more than 3 times per second
- [ ] Tested with PEAT or Harding Test for photosensitive risk
- [ ] Static alternative version created for all animations
- [ ] Text stays on screen long enough to read (2+ seconds minimum)
- [ ] Text contrast meets 4.5:1 in every frame
- [ ] `prefers-reduced-motion` supported for web animations
- [ ] Content warning added for intense motion (if applicable)
- [ ] Transcript available for text-heavy animations

### Acrobat Pro — PDF Verification Checklist

- [ ] Full accessibility check run (all categories)
- [ ] All failures resolved
- [ ] Manual checks completed (reading order, alt text quality, table structure)
- [ ] Document has a title (File → Properties → Description)
- [ ] Document language is set (File → Properties → Advanced)
- [ ] Reading order verified with Order panel
- [ ] All images have appropriate alt text (or are marked as artifacts)
- [ ] Tables have designated header rows/columns
- [ ] Bookmarks exist for documents longer than 3 pages
- [ ] Tested with a screen reader (NVDA or JAWS)

---

## UA Resources & Licensing {#ua-resources}

### Adobe at UA

| Resource | URL | Description |
|---|---|---|
| Software Licensing | [softwarelicense.arizona.edu](https://softwarelicense.arizona.edu){:target="_blank" rel="noopener"} | Check current Adobe license availability and download links |
| Adobe Training | [adobe@arizona.edu](mailto:adobe@arizona.edu) | Request Adobe-specific training for your team |
| UCATT Multimedia | [ucatt.arizona.edu](https://ucatt.arizona.edu){:target="_blank" rel="noopener"} | Multimedia production support, captioning assistance, video accessibility |
| Accessibility Consultation | [Submit request](https://forms.office.com/Pages/ResponsePage.aspx?id=BVXjXo7rKUmTfWRd9QEyiLCO6hETU85MhSR1uWmtS-FUQTRKWjE5SzVPVDNaVUwyRTdCRUg4Q1lVUSQlQCN0PWcu){:target="_blank" rel="noopener"} | Get help with accessible document creation and remediation |

### Adobe Accessibility Conformance Reports

When evaluating Adobe products for procurement, request the relevant Accessibility Conformance Report (ACR):
- [Adobe Accessibility Conformance Reports](https://www.adobe.com/accessibility/compliance.html){:target="_blank" rel="noopener"}
- See the [Accessible Procurement Process](procurement-steps.html) for how to evaluate VPATs/ACRs

### Related Pages on This Site

- [PDF Remediation Guide](pdf-remediation.html) — Detailed PDF accessibility repair workflows
- [Video Captioning Guide](media-captioning.html) — Comprehensive captioning guidance beyond Premiere
- [Color and Contrast](color-contrast.html) — Contrast requirements and testing tools
- [Canva & Accessible Flyers](canva-flyers.html) — Simpler alternative for flyers and social graphics
- [Accessible Documents Overview](documents-overview.html) — Cross-format document accessibility
- [Accessible Branding](brand-identity.html) — UA brand colors, fonts, and contrast ratios
- [Resource Registry](resource-registry.html) — Testing tools and learning resources

### Need Help?

- **General accessibility questions:** [accessibility@arizona.edu](mailto:accessibility@arizona.edu)
- **Adobe licensing and training:** [adobe@arizona.edu](mailto:adobe@arizona.edu)
- **Captioning and video support:** [UCATT](https://ucatt.arizona.edu){:target="_blank" rel="noopener"}
- **Consultation request:** [Submit a request](https://forms.office.com/Pages/ResponsePage.aspx?id=BVXjXo7rKUmTfWRd9QEyiLCO6hETU85MhSR1uWmtS-FUQTRKWjE5SzVPVDNaVUwyRTdCRUg4Q1lVUSQlQCN0PWcu){:target="_blank" rel="noopener"}
