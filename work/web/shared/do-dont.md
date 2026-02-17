---
title: "Accessibility Do's and Don'ts"
summary: Quick-reference poster-style guides for common accessibility tasks. Print these out or share with your team.
owner: Accessibility Content Team
last_reviewed: 2026-01-15
next_review: 2026-04-15
tags:
  - topic:quick-reference
  - persona:all
sources:
  - Accessibility | Home — https://accessibility.arizona.edu
  - 6 Tips for Accessible Documents — https://itaccessibility.arizona.edu/content/ms-office
  - Video Captioning Info — https://itaccessibility.arizona.edu/content/captioning-info
---

> These guides align with [University of Arizona digital accessibility standards](https://accessibility.arizona.edu). The Disability Resource Center provides consultation for accessible content creation. [Submit a consultation request](https://forms.office.com/Pages/ResponsePage.aspx?id=BVXjXo7rKUmTfWRd9QEyiLCO6hETU85MhSR1uWmtS-FUQTRKWjE5SzVPVDNaVUwyRTdCRUg4Q1lVUSQlQCN0PWcu) or contact [accessibility@arizona.edu](mailto:accessibility@arizona.edu).

## Images & Alt Text

**Do**
- Add alt text to all meaningful images
- Describe the image's purpose, not just what it shows
- Keep alt text concise (under 125 characters)
- Mark decorative images as decorative (empty `alt=""`)
- Describe charts and graphs with key data points

**Don't**
- Leave images without alt text
- Start alt text with "Image of" or "Picture of"
- Write overly long, detailed descriptions
- Use images of text instead of real text
- Repeat information already in surrounding text

## Headings & Structure

**Do**
- Use one H1 per page
- Nest headings logically (H2, then H3, etc.)
- Use headings to create a logical outline
- Apply heading styles in Word, not just bold text
- Make headings descriptive and unique

**Don't**
- Skip heading levels (H2 → H4)
- Use headings for visual styling alone
- Make bold paragraphs instead of real headings
- Use multiple H1s on a page
- Create empty or vague headings

## Links

**Do**
- Write descriptive link text
- Make link text unique on the page
- Indicate file types (PDF, Word)
- Warn if link opens in new window
- Use `<a>` for navigation, `<button>` for actions

**Don't**
- Use "click here" or "read more" alone
- Use URLs as link text
- Link entire paragraphs
- Open links in new tabs without warning
- Style buttons as links or vice versa

## Color & Contrast

**Do**
- Use 4.5:1 contrast for normal text
- Use 3:1 contrast for large text and UI
- Test colors with a contrast checker
- Use color + another indicator (icon, text)
- Test designs in grayscale

**Don't**
- Use light gray text on white backgrounds
- Rely on color alone to convey meaning
- Use red/green as only differentiator
- Ignore focus indicator contrast
- Skip testing with color blindness simulators

## Forms

**Do**
- Label every form field
- Associate labels with inputs programmatically
- Group related fields with fieldset/legend
- Provide clear error messages
- Indicate required fields explicitly

**Don't**
- Use placeholder as the only label
- Rely on color alone to show errors
- Time out forms too quickly
- Reset forms without warning
- Use CAPTCHAs without alternatives

## Keyboard & Focus

**Do**
- Make all functionality keyboard-accessible
- Keep focus indicators visible
- Maintain logical tab order
- Provide skip links
- Let users Escape from modals

**Don't**
- Remove focus outlines without replacement
- Create keyboard traps
- Use positive tabindex values
- Require mouse for any feature
- Auto-advance focus unexpectedly

## Video & Audio

**Do**
- Add captions to all videos
- Edit auto-captions for accuracy
- Include speaker identification
- Provide transcripts for audio
- Add audio descriptions when needed

**Don't**
- Rely on auto-captions without editing
- Autoplay video with sound
- Flash content more than 3 times/second
- Omit speaker names in captions
- Use audio without text alternative

## Documents

**Do**
- Use built-in heading styles
- Run accessibility checker before sharing
- Add alt text to images
- Create real tables with headers
- Use meaningful hyperlink text

**Don't**
- Create structure with manual formatting
- Use text boxes for layout in Word
- Scan documents as images without OCR
- Create fake tables with tabs/spaces
- Share inaccessible PDFs

## Social Media

**Do**
- Add alt text to images (most platforms support it)
- Use CamelCase for hashtags (#AccessibilityMatters)
- Put @mentions and hashtags at the end
- Add captions to video content
- Describe animated GIFs

**Don't**
- Post images without descriptions
- Overuse emojis or special characters
- Use ASCII art or decorative text
- Post videos without captions
- Share inaccessible content

## Printable Posters

Download these guides to share with your team:
- General Accessibility Do's and Don'ts (PDF)
- Document Accessibility Quick Reference (PDF)
- Social Media Accessibility Guide (PDF)

## Related Resources

- [Accessibility 101](accessibility-101.html)
- [Heading Structure Best Practices](heading-basics.html)
- [Writing Meaningful Link Text](meaningful-links.html)
- [Color & Contrast Guidelines](color-contrast.html)
- [UA Digital Accessibility Home](https://accessibility.arizona.edu)
- [6 Tips for Accessible Documents (itaccessibility.arizona.edu)](https://itaccessibility.arizona.edu/content/ms-office)
- [Video Captioning Info (itaccessibility.arizona.edu)](https://itaccessibility.arizona.edu/content/captioning-info)
