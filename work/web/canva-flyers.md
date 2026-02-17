---
layout: default
title: "Canva & Accessible Flyers"
summary: "Step-by-step guide to creating flyers, social graphics, and visual communications in Canva that meet WCAG 2.2 AA standards — so every viewer can access your message."
breadcrumb_parent: Documents & Media
breadcrumb_parent_url: documents-media.html
owner: Digital Accessibility Team
last_reviewed: 2026-02-17
next_review: 2026-05-17
tags:
  - persona:content-creators
  - format:design
sources:
  - WebAIM Alt Text — https://webaim.org/techniques/alttext/
  - W3C Images Tutorial — https://www.w3.org/WAI/tutorials/images/
  - Adobe Accessible PDFs — https://www.adobe.com/accessibility.html
  - UA Quickstart Accessibility — https://quickstart.arizona.edu/best-practices/accessibility-guidelines
  - Canva Accessibility Features — https://www.canva.com/accessibility/
  - WCAG 2.2 — https://www.w3.org/TR/WCAG22/
---

<nav class="toc" aria-label="Table of contents">
<h2>On This Page</h2>
<ul>
<li><a href="#why">Why Flyer Accessibility Matters</a></li>
<li><a href="#before-you-start">Before You Start</a></li>
<li><a href="#step-by-step">Step-by-Step: Building an Accessible Flyer</a></li>
<li><a href="#canva-features">Canva's Built-In Accessibility Features</a></li>
<li><a href="#contrast">Color &amp; Contrast</a></li>
<li><a href="#text-images">Text in Images</a></li>
<li><a href="#export">Exporting &amp; File Formats</a></li>
<li><a href="#publishing">Publishing Patterns by Channel</a></li>
<li><a href="#before-after">Before &amp; After Examples</a></li>
<li><a href="#checklist">Accessibility Checklist</a></li>
<li><a href="#common-mistakes">Common Mistakes</a></li>
<li><a href="#resources">Resources</a></li>
</ul>
</nav>

<div class="callout callout-info">
<h3>UA Digital Accessibility Support</h3>
<p>Need help making a flyer or graphic accessible? The Digital Accessibility team offers quick consultations for content creators. <a href="https://forms.office.com/Pages/ResponsePage.aspx?id=BVXjXo7rKUmTfWRd9QEyiLCO6hETU85MhSR1uWmtS-FUQTRKWjE5SzVPVDNaVUwyRTdCRUg4Q1lVUSQlQCN0PWcu" target="_blank" rel="noopener">Submit a consultation request</a> or email <a href="mailto:accessibility@arizona.edu">accessibility@arizona.edu</a>.</p>
</div>

## Why Flyer Accessibility Matters {#why}

Flyers are one of the most common communication formats at UA — event announcements, program promotions, call-for-proposals, and department newsletters all rely on visual graphics. But a flyer that's published only as an image is invisible to:

- **Screen reader users** — They hear nothing unless alt text is provided
- **People with low vision** — They can't zoom into a flat image without losing quality
- **People with color vision deficiency** — Color-only information is missed
- **People on slow connections** — Large image files may not load at all

> **The rule is simple:** If the flyer contains information people need, that information must be available in an accessible format — not just as pixels in a picture.

### WCAG Success Criteria That Apply

| Criterion | Requirement | Relevance to Flyers |
|---|---|---|
| 1.1.1 Non-text Content | All non-text content has a text alternative | Every flyer image needs alt text |
| 1.4.3 Contrast (Minimum) | 4.5:1 for normal text, 3:1 for large text | Text on the flyer must be readable |
| 1.4.5 Images of Text | Use real text instead of images of text | Prefer HTML text over text baked into images |
| 1.4.11 Non-text Contrast | 3:1 for UI components and graphical objects | Icons and meaningful graphics need contrast |

## Before You Start {#before-you-start}

### Choose Your Starting Point

| Scenario | Recommended Approach |
|---|---|
| Simple event announcement | Skip Canva — use an HTML email or web page instead. Real text is always more accessible than an image. |
| Visual promotion that needs brand impact | Use Canva, but **always create a text alternative** alongside the graphic |
| Social media graphic | Use Canva for the visual, write the full content in the post text, and add platform alt text |
| Printable poster | Use Canva for design, export as PDF with selectable text when possible |

### UA Brand Compliance

Before designing, review these resources:

- **Color tokens:** Use [UA brand colors](https://brand.arizona.edu/applying-the-brand/colors){:target="_blank" rel="noopener"} — Arizona Red (#AB0520), UA Blue (#0C234B), and White are your safest high-contrast combinations
- **Logo usage:** Download approved logos from [brand.arizona.edu](https://brand.arizona.edu){:target="_blank" rel="noopener"} and follow clear-space rules
- **Templates:** Check if your college or unit has approved Canva templates — start from those rather than from scratch
- See the [Accessible Branding guide](brand-identity.html) for complete UA color contrast ratios

## Step-by-Step: Building an Accessible Flyer {#step-by-step}

### Step 1: Set Up Your Canvas

1. Open [canva.com](https://www.canva.com){:target="_blank" rel="noopener"} and sign in with your UA credentials (if your unit has Canva for Teams)
2. Choose a template or create a custom size
3. **Start with a solid background color** — busy photo backgrounds make text harder to read for everyone

### Step 2: Establish Visual Hierarchy

Organize information in a clear, logical reading order — top to bottom, most important first:

1. **Event/program title** — largest text, highest contrast
2. **Date, time, and location** — prominent but secondary
3. **Brief description** — what it is and who it's for
4. **Call to action** — register, RSVP, learn more
5. **Contact information** — email, phone, URL
6. **Logos and branding** — bottom or corner placement

> **Why order matters:** When you provide a text alternative, you'll list information in this same order. A logical visual hierarchy makes the text version natural to write.

### Step 3: Choose Accessible Typography

- **Font size:** Minimum 24pt for body text on a standard flyer (8.5×11). Titles should be 36pt or larger.
- **Font weight:** Use medium or bold weights. Avoid thin/light weights that disappear at small sizes.
- **Font choice:** Stick to clean sans-serif fonts — Open Sans, Lato, Montserrat, or [Atkinson Hyperlegible](https://brailleinstitute.org/freefont){:target="_blank" rel="noopener"} are excellent choices.
- **Avoid:** Script fonts, decorative fonts, all-uppercase for more than a few words, and fonts with ambiguous letterforms (where "I", "l", and "1" look alike).

### Step 4: Apply Color with Intention

- **Primary text:** Use UA Navy (#0C234B) or black on white/light backgrounds for body text
- **Accent text:** Arizona Red (#AB0520) on white is 7.3:1 — excellent for headings and emphasis
- **Avoid:** Light colors on light backgrounds, text directly on photos without an overlay
- **Test:** Use the [WebAIM Contrast Checker](https://webaim.org/resources/contrastchecker/){:target="_blank" rel="noopener"} to verify every text/background combination
- **Don't rely on color alone:** If you color-code sections (e.g., red = deadline), also add a text label or icon

### Step 5: Handle Images and Icons

- **Decorative images:** Background patterns, border decorations — these get empty alt text (`alt=""`) when published
- **Informational images:** Photos that convey meaning, icons that indicate actions — these need descriptive alt text
- **Charts or data visuals:** Always provide the data in text form alongside or below the visual
- **UA logos:** Alt text should be "University of Arizona" (or empty if the university name appears as text nearby)

### Step 6: Review Reading Order

Before exporting:

1. Hide all images and decorative elements mentally — does the text alone make sense?
2. Read content top-to-bottom, left-to-right — is the order logical?
3. Check that no essential information is conveyed only through visual position or color
4. Verify that dates, times, and locations are unambiguous ("Friday, March 6, 2026" not "this Friday")

## Canva's Built-In Accessibility Features {#canva-features}

Canva has added several accessibility tools — use them:

### Alt Text in Canva

1. Select an image or graphic element
2. Click the **"…" (More)** menu on the element toolbar
3. Select **"Alternative text"**
4. Write a concise description (or mark as decorative)
5. This alt text carries through to some export formats (PDF)

### Canva Accessibility Checker

1. Click the **"Accessibility"** button in the bottom toolbar (person icon)
2. Canva will flag:
   - Missing alt text on images
   - Low contrast text
   - Text that may be too small
3. Address each flagged issue before exporting

### Additional Canva Features

- **Color palette generator:** Canva suggests palettes — always verify contrast before using
- **Text spacing controls:** Adjust letter and line spacing for readability
- **Grid and alignment tools:** Maintain consistent visual structure
- **Resize (Magic Resize):** When resizing for different platforms, re-check that text remains large enough and contrast is maintained

## Color & Contrast {#contrast}

### Quick Reference: UA Brand Color Contrast Ratios

| Foreground | Background | Ratio | Passes For |
|---|---|---|---|
| UA Navy (#0C234B) | White (#FFFFFF) | 14.2:1 | All text sizes |
| Arizona Red (#AB0520) | White (#FFFFFF) | 7.3:1 | All text sizes |
| White (#FFFFFF) | UA Navy (#0C234B) | 14.2:1 | All text sizes |
| White (#FFFFFF) | Arizona Red (#AB0520) | 7.3:1 | All text sizes |
| Oasis Blue (#378DBD) | White (#FFFFFF) | 3.2:1 | Large text only (24px+ or 18.5px bold) |
| UA Navy (#0C234B) | Cool Gray (#E2E9EB) | 11.3:1 | All text sizes |

### Text Over Photos

If you must place text over a photograph:

1. **Add a solid overlay:** Use a semi-transparent rectangle (80–90% opacity) in UA Navy or white behind the text
2. **Test the worst case:** Check contrast against the lightest and darkest areas of the photo that show through
3. **Better alternative:** Use a solid color block for the text area and place the photo separately
4. **Avoid:** Transparent text overlays, text directly on busy images, gradient overlays that create uneven contrast

## Text in Images: The Core Problem {#text-images}

**Flyers are fundamentally images of text** — and images of text are one of the biggest accessibility barriers on the web. Here's how to handle this:

### The Hierarchy of Accessible Approaches

1. **Best: Native HTML/text** — Send your message as a web page or email with real text. No image needed.
2. **Good: Image + full text alternative** — Publish the flyer image alongside a complete text version of all content.
3. **Acceptable: Image with comprehensive alt text** — For simple flyers (short text), provide detailed alt text that includes all the information.
4. **Unacceptable: Image alone** — A flyer posted as a PNG/JPG with no alt text or text alternative.

### Writing Alt Text for Flyers

When a flyer is published as an image, the alt text should include **all essential information**, not just a description of the visual design:

**Poor alt text:**
> "Colorful flyer for upcoming event"

**Good alt text (for simple flyers):**
> "Spring Research Symposium. Friday, March 13, 2026, 9 AM to 4 PM. Student Union Memorial Center, Rincon Room. Open to all UA students and faculty. Register at research.arizona.edu. Contact: symposium@arizona.edu"

**For complex flyers with lots of content:** Alt text has practical limits (~125 characters is the guideline, though not a hard technical limit). Use `alt` for a brief summary and provide a linked text alternative:

```html
<img src="spring-symposium-flyer.png" 
     alt="Spring Research Symposium — full details in text below">
<!-- Full text version follows -->
```

## Exporting & File Formats {#export}

### Format Comparison

| Format | Accessibility | Best For | Limitations |
|---|---|---|---|
| **PNG** | Needs alt text where published | Web, social media, email embedding | No selectable text, fixed resolution |
| **JPG** | Needs alt text where published | Photos, email embedding | No selectable text, compression artifacts |
| **PDF (Standard)** | Often inaccessible — flattened text | Print, attachments | Canva PDFs rarely have proper tags or reading order |
| **PDF (with selectable text)** | Better — text is selectable and searchable | Print + digital distribution | Still may lack proper heading structure and reading order |
| **SVG** | Can include accessible text | Web graphics | Not supported by all platforms |

### Export Recommendations

1. **For web publishing:** Export as PNG + create an HTML text alternative on the same page
2. **For email:** Export as PNG + include all flyer text in the email body
3. **For social media:** Export as PNG + write all content in the post caption
4. **For print:** Export as PDF (Print quality) — accessibility applies to digital distribution, not physical paper
5. **For attachments:** Export as PDF with "Include text" option + add document title in File > Settings

### Canva PDF Export Steps

1. Click **Share → Download**
2. Select **PDF Standard** or **PDF Print**
3. Check **"Flatten PDF"** — **uncheck this** (flattened PDFs are images, not selectable text)
4. Download and open in Adobe Acrobat to verify text is selectable
5. In Acrobat, add document title: **File → Properties → Description → Title**

## Publishing Patterns by Channel {#publishing}

### Email (Outlook, Gmail, Mailchimp)

**Pattern:** Flyer image + full text in the email body

```
Subject: Spring Research Symposium — March 13

[Flyer image with alt text: "Spring Research Symposium flyer — details below"]

Spring Research Symposium
Friday, March 13, 2026, 9:00 AM – 4:00 PM
Student Union Memorial Center, Rincon Room

Join us for a day of interdisciplinary research presentations...

Register: [link to registration page]
Questions: symposium@arizona.edu
```

**Key rules:**
- Never send a flyer image as the only content
- Include all text from the flyer in the email body
- Add alt text to the embedded image
- Use a descriptive subject line (not "See attached flyer")
- For mass emails via Mailchimp or Emma, test with the preview/accessibility tools

### Website / Event Pages

**Pattern:** Flyer image as supplementary visual + HTML content as primary

```html
<!-- Primary content — accessible HTML -->
<article>
  <h2>Spring Research Symposium</h2>
  <p><strong>Date:</strong> Friday, March 13, 2026</p>
  <p><strong>Time:</strong> 9:00 AM – 4:00 PM</p>
  <p><strong>Location:</strong> Student Union Memorial Center, Rincon Room</p>
  <p>Join us for a day of interdisciplinary research presentations...</p>
  <a href="/register">Register Now</a>
</article>

<!-- Supplementary visual — the flyer -->
<aside>
  <img src="symposium-flyer.png" 
       alt="Spring Research Symposium promotional flyer">
</aside>
```

**Key rules:**
- The web page content should stand alone without the image
- Use semantic HTML: headings, paragraphs, lists, links
- The flyer image is supplementary — a nice visual, not the information source
- Add the flyer image in an `<aside>` or at the end, not as the hero

### Social Media (Instagram, Facebook, X/Twitter, LinkedIn)

**Pattern:** Image + full content in caption + platform alt text

1. **Write the caption first** — include all essential information from the flyer
2. **Upload the image** and add alt text through the platform's accessibility feature:
   - Instagram: Advanced Settings → Write Alt Text
   - Facebook: Edit Photo → Alternative Text
   - X/Twitter: Add description (link in image upload)
   - LinkedIn: Alt text option on image upload
3. **Hashtags:** Use CamelCase (#AccessibilityMatters, not #accessibilitymatters)
4. **Emojis:** Use sparingly; screen readers read each emoji name aloud. Place at the end, not between words.

### D2L Brightspace / LMS

**Pattern:** Flyer as supporting visual + full HTML content in the announcement

1. Create a new **Announcement** or **Content** item
2. Write the full content in the HTML editor using headings, lists, and links
3. Insert the flyer image and add alt text through the image properties dialog
4. **Do not** upload a flyer image as the sole content of an announcement

## Before & After Examples {#before-after}

### Example 1: Event Announcement

**Before (Inaccessible):**
- Flyer posted as JPG on department website
- No alt text
- Light gray text on light blue background (2.8:1 contrast)
- Event details only in the image — no text on the page
- Date written as "Next Thursday" with no specific date

**After (Accessible):**
- Event details published as HTML on the web page (heading, date, time, location, description, registration link)
- Flyer image included as supplementary visual with alt text: "Wildcat Welcome event promotional flyer"
- UA Navy text on white background (14.2:1 contrast)
- Specific date: "Thursday, August 21, 2026"
- Registration link with descriptive text: "Register for Wildcat Welcome"

### Example 2: Newsletter Graphic

**Before (Inaccessible):**
- Multi-section newsletter designed entirely in Canva
- Exported as single PNG and emailed as the entire email body
- Screen readers announce only "image" (no alt text)
- Text at 10pt equivalent — unreadable when zoomed

**After (Accessible):**
- Newsletter content written as HTML email with proper headings and sections
- Individual graphics used as section illustrations with alt text
- All links are real HTML links (not "click here" text baked into images)
- Font size minimum 16px; headings 20–24px

## Accessibility Checklist {#checklist}

Use this checklist before publishing any flyer or graphic from Canva:

### Design Phase

- [ ] Started from a solid background (not a busy photo)
- [ ] Information follows a logical top-to-bottom hierarchy
- [ ] Font size is 24pt+ for body text (standard flyer size)
- [ ] Font is clean and readable (sans-serif, medium/bold weight)
- [ ] Color contrast meets 4.5:1 for normal text, 3:1 for large text
- [ ] Color is not the only way to convey information
- [ ] Text over images has a solid or semi-transparent overlay
- [ ] All dates include day of week, month, date, and year
- [ ] Contact information is complete (email, phone, or URL)

### In Canva

- [ ] Alt text added to meaningful images (via element menu)
- [ ] Ran Canva's built-in accessibility checker
- [ ] Decorative elements don't interfere with text readability
- [ ] Reading order makes sense when read top-to-bottom

### Export & Publish

- [ ] Chose appropriate export format (PNG for web/social, PDF for print/attachments)
- [ ] PDF is not flattened (text is selectable)
- [ ] Added document title to PDF exports (via Acrobat)

### Publishing

- [ ] Email: All flyer text repeated in the email body
- [ ] Web: HTML content is the primary information source, flyer is supplementary
- [ ] Social media: Full content in caption + platform alt text added
- [ ] LMS: Full content in announcement text + image has alt text
- [ ] Alt text for the flyer image includes all essential information (or references text below)

## Common Mistakes {#common-mistakes}

| Mistake | Why It's a Problem | Fix |
|---|---|---|
| Posting a flyer image as the only content | Screen reader users get zero information | Add full text alternative |
| "See flyer for details" | Forces users to decode an image they may not be able to see | Write details in text |
| Light text on photo backgrounds | Fails contrast; unreadable in sunlight or on poor displays | Add solid overlay, check contrast |
| Using Canva's decorative fonts | Hard to read for people with dyslexia or low vision | Use clean sans-serif fonts |
| "Click here" or raw URLs | Meaningless to screen reader users; hard to use on mobile | Write descriptive link text |
| Flattened PDF export | Text becomes an image; not searchable, not readable by AT | Uncheck "Flatten PDF" |
| Date as "this Friday" | Ambiguous once the flyer circulates beyond the original context | Use full date with day of week |
| Missing alt text on social media | Most people skip this; it's the single biggest fix you can make | Use each platform's alt text feature |

## Resources {#resources}

### Guides & References

- [WebAIM: Alt Text and Images](https://webaim.org/techniques/alttext/){:target="_blank" rel="noopener"}
- [W3C: Images and Text Alternatives](https://www.w3.org/WAI/tutorials/images/){:target="_blank" rel="noopener"}
- [Canva Accessibility Features](https://www.canva.com/accessibility/){:target="_blank" rel="noopener"}
- [UA Quickstart Accessibility Guidelines](https://quickstart.arizona.edu/best-practices/accessibility-guidelines){:target="_blank" rel="noopener"}

### Related Pages on This Site

- [Color & Contrast Guidelines](color-contrast.html)
- [Accessible Branding](brand-identity.html) — UA color contrast ratios and typography
- [Accessible Documents Overview](documents-media.html)
- [Writing Meaningful Link Text](meaningful-links.html)
- [Adobe Creative Suite Accessibility](adobe-media.html) — For advanced design work beyond Canva
- [Social Media Accessibility](social-media.html)

### Tools

- [WebAIM Contrast Checker](https://webaim.org/resources/contrastchecker/){:target="_blank" rel="noopener"}
- [Colour Contrast Analyser (desktop app)](https://www.tpgi.com/color-contrast-checker/){:target="_blank" rel="noopener"}
- [Who Can Use](https://www.whocanuse.com/){:target="_blank" rel="noopener"} — See how colors appear to people with color vision deficiency

### Need Help?

Contact [accessibility@arizona.edu](mailto:accessibility@arizona.edu) for guidance on accessible flyers and graphics, or [request a consultation](https://forms.office.com/Pages/ResponsePage.aspx?id=BVXjXo7rKUmTfWRd9QEyiLCO6hETU85MhSR1uWmtS-FUQTRKWjE5SzVPVDNaVUwyRTdCRUg4Q1lVUSQlQCN0PWcu){:target="_blank" rel="noopener"}.
