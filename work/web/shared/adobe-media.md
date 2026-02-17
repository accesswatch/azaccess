---
title: Adobe Creative Suite Accessibility
summary: Create accessible content in InDesign, Photoshop, Illustrator, Premiere Pro, After Effects, and Acrobat Pro.
owner: UCATT Multimedia + Adobe & Arizona Team
last_reviewed: 2026-01-15
next_review: 2026-04-15
tags:
  - format:adobe
  - persona:content-creators
sources:
  - Adobe Accessibility — https://www.adobe.com/accessibility.html
  - Adobe Creating Accessible PDFs — https://helpx.adobe.com/indesign/using/creating-accessible-pdfs.html
  - Accessibility | Home — https://accessibility.arizona.edu
---

## Adobe InDesign

InDesign is excellent for creating accessible PDFs when used correctly.

### Structure with Paragraph Styles
- **Create styles:** Define paragraph styles for Heading 1, Heading 2, Body Text, etc.
- **Apply consistently:** Use styles instead of manual formatting
- **Map to PDF tags:** Edit Export Tagging — Map styles to PDF tags

### Setting Up Tag Export
1. Open **Window → Styles → Paragraph Styles**
2. Right-click a style → **Edit [style name]**
3. Go to **Export Tagging**
4. Set PDF Tag (e.g., "H1" for Heading 1)
5. Repeat for all styles

### Adding Alt Text
1. Select the image
2. **Object → Object Export Options**
3. Check "Alt Text Source: Custom"
4. Enter your description
5. For decorative images, check "Apply Tag: Artifact"

### Articles Panel for Reading Order
1. Open **Window → Articles**
2. Create a new article
3. Drag content into the article in reading order
4. InDesign will use this order when exporting to PDF

### Tables in InDesign
- Create tables using **Table → Insert Table**
- Select header row(s), then **Table → Convert Rows → To Header**
- Headers will be properly tagged in the exported PDF

### Exporting Accessible PDFs
1. **File → Export** (or Ctrl+E)
2. Choose Adobe PDF (Interactive) or Adobe PDF (Print)
3. In the export dialog:
   - Check "Create Tagged PDF"
   - Check "Use Structure for Tab Order"
   - Set "Bookmarks" to create from structure
4. Verify the PDF in Acrobat Pro

## Adobe Photoshop

Photoshop creates raster images that need alt text when placed in documents.

### Color and Contrast
- **Check contrast:** Use the Info panel to compare color values
- **Simulate color blindness:** View → Proof Setup → Color Blindness (Protanopia/Deuteranopia)
- **Don't use color alone:** Add patterns, labels, or icons to distinguish elements

### Text in Images

> **Avoid text in images when possible.** If you must include text:
> - Use high contrast (4.5:1 minimum)
> - Use large, clear fonts
> - Document the text in alt text or captions
> - Consider providing the text content separately

### Exporting for Web
- **File → Export → Export As** (or File → Save for Web)
- Use appropriate formats: PNG for graphics, JPEG for photos
- Optimize file size without sacrificing readability
- Remember: alt text is added where the image is placed, not in Photoshop

### Creating Accessible Social Media Graphics
1. Keep text minimal and large
2. Ensure high contrast
3. Document all text for alt text
4. Test with color blindness simulation
5. Leave space for platform UI elements

## Adobe Illustrator

Illustrator creates vector graphics that can be made more accessible.

### SVG Accessibility
SVG files can include accessibility information:

```html
<svg role="img" aria-labelledby="title desc">
  <title id="title">Chart Title</title>
  <desc id="desc">Description of the chart...</desc>
  <!-- graphic content -->
</svg>
```

### Adding Metadata in Illustrator
1. **File → File Info**
2. Add Title and Description
3. This metadata can be referenced for alt text

### Exporting Accessible SVGs
1. **File → Export → Export As**
2. Choose SVG format
3. In SVG Options:
   - Set "Responsive" for scalability
   - Include metadata if added

### Creating Accessible Infographics
- Use clear visual hierarchy
- Don't rely on color alone for meaning
- Include text labels directly on graphics
- Create a text-based alternative version
- Export at appropriate resolution

## Adobe Premiere Pro

Create accessible video content with captions and audio descriptions.

### Adding Captions
1. **Window → Text** to open captions panel
2. Click "Create new caption track"
3. Choose format (CEA-608 for broadcast, SRT for web)
4. Add captions:
   - Click + to add a caption segment
   - Type the text
   - Adjust timing in the timeline

### Caption Best Practices
- **Speaker identification:** [John] or JOHN: for multiple speakers
- **Sound descriptions:** [door slams] [music playing]
- **Line length:** Maximum 2 lines, 32 characters each
- **Reading speed:** 150–160 words per minute maximum
- **Timing:** Sync with speech, leave on screen 1–6 seconds

### Transcription Workflow
1. **Window → Text → Transcribe Sequence**
2. Premiere creates automatic transcription
3. Review and correct the transcript
4. Click "Create Captions" to generate from transcript
5. Adjust timing as needed

### Exporting Captions
- **Open captions (burned in):** Export with "Burn Captions Into Video" enabled
- **Closed captions (sidecar file):** Export caption track as SRT or VTT
- Provide both when possible

## Adobe After Effects

Motion graphics and animations need accessibility considerations.

### Reducing Motion Risks
- **Avoid flashing:** No more than 3 flashes per second
- **Provide alternatives:** Offer static versions when possible
- **Warn users:** Add content warnings for intense motion
- **Consider prefers-reduced-motion:** Create alternative animations for web

### Text in Animations
- Keep text on screen long enough to read
- Use high contrast
- Avoid text that moves too quickly
- Provide transcripts for text-heavy animations

### Color Considerations
- Don't rely on color transitions alone to convey meaning
- Test with color blindness simulation
- Ensure sufficient contrast throughout animations

## Adobe Acrobat Pro

Acrobat Pro is essential for checking and remediating PDF accessibility.

### Accessibility Check
1. **Tools → Accessibility → Accessibility Check**
2. Select checking options (usually leave all checked)
3. Click "Start Checking"
4. Review the report and fix issues

### Common Issues and Fixes

| Issue | Fix |
|-------|-----|
| Missing alt text | Right-click image in Tags panel → Properties → Alt Text |
| Wrong reading order | Use Order panel to drag elements into correct sequence |
| Missing title | File → Properties → Description → Title |
| Missing language | File → Properties → Advanced → Reading Options → Language |
| Untagged content | Use Reading Order tool or manually add tags |

### Reading Order Tool
1. **Tools → Accessibility → Reading Order**
2. Draw rectangles around content
3. Click buttons to tag as Text, Figure, Table, etc.
4. Use "Show Order Panel" to verify sequence

See [Full PDF Remediation Guide](pdf-remediation.html) for more.

## Adobe Accessibility Checklist

### InDesign
- [ ] Used paragraph styles for all text
- [ ] Mapped styles to PDF tags
- [ ] Added alt text to all images
- [ ] Set reading order in Articles panel
- [ ] Table headers defined
- [ ] Exported with "Create Tagged PDF"

### Images (Photoshop/Illustrator)
- [ ] Sufficient color contrast
- [ ] Tested with color blindness simulation
- [ ] Text in images documented for alt text
- [ ] Color not the only indicator of meaning

### Video (Premiere Pro/After Effects)
- [ ] Captions added and timed correctly
- [ ] Speaker identification included
- [ ] Sound effects described in captions
- [ ] No flashing content (or warning provided)
- [ ] Transcript available

### PDFs (Acrobat)
- [ ] Ran accessibility checker
- [ ] All issues resolved or explained
- [ ] Document has title
- [ ] Language is set
- [ ] Reading order verified

## Related Resources

- [PDF Remediation Guide](pdf-remediation.html)
- [Video Captioning Guide](media-captioning.html)
- [Color and Contrast](color-contrast.html)
- [Document Accessibility Overview](documents-overview.html)
- [Adobe: Creating Accessible PDFs](https://helpx.adobe.com/indesign/using/creating-accessible-pdfs.html)
- Contact adobe@arizona.edu for training and license assistance
- Reference Adobe's Accessibility Conformance Reports for specific apps when working with procurement
