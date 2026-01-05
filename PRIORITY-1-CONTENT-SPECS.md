# Priority 1: Content Specifications

Detailed content requirements for the 10 most critical empty pages.

---

## 1. color-contrast.html

### Title
Color & Contrast: Meeting WCAG Requirements

### Page Introduction
Learn how to choose colors that everyone can see, including people with low vision and color blindness. This guide covers WCAG contrast requirements, testing tools, and practical fixes.

### Section 1: Why Contrast Matters (150 words)
- 1 in 12 men have color vision deficiency
- Low vision affects millions; contrast helps everyone read
- Situational: bright sunlight, dim rooms, tired eyes
- Legal requirement under WCAG 2.2

### Section 2: WCAG Contrast Requirements (300 words)
**Table: Contrast Ratios**
| Element Type                    | Minimum Ratio | WCAG Criterion |
| ------------------------------- | ------------- | -------------- |
| Normal text (<18pt)             | 4.5:1         | 1.4.3          |
| Large text (≥18pt or 14pt bold) | 3:1           | 1.4.3          |
| UI components & graphics        | 3:1           | 1.4.11         |
| Enhanced (AAA)                  | 7:1 / 4.5:1   | 1.4.6          |

**What counts as "large text":**
- 18pt (24px) regular weight
- 14pt (18.5px) bold weight

**What needs contrast:**
- Body text, headings, labels
- Form field borders
- Icon-only buttons
- Focus indicators
- Charts and graphs

### Section 3: Testing Your Colors (250 words)
**Recommended Tools:**
1. **WebAIM Contrast Checker** - https://webaim.org/resources/contrastchecker/
2. **Colour Contrast Analyser (CCA)** - Desktop app, works with screen pixels
3. **axe DevTools** - Browser extension, scans full page
4. **Figma Contrast Plugin** - Check designs before development

**How to test:**
1. Identify foreground color (text/icon)
2. Identify background color
3. Enter both into checker
4. Verify ratio meets requirement
5. For gradients: test darkest foreground on lightest background

### Section 4: Common Problems & Fixes (400 words)
**Problem 1: Light gray text**
```css
/* ❌ Bad: 2.5:1 ratio */
color: #999999;
background: #ffffff;

/* ✅ Good: 4.6:1 ratio */
color: #767676;
background: #ffffff;
```

**Problem 2: Brand colors that fail**
- Option A: Darken the color slightly
- Option B: Use on dark background instead
- Option C: Reserve for large text only

**Problem 3: Placeholder text**
```css
/* ❌ Bad: Most defaults fail */
::placeholder { color: #aaa; }

/* ✅ Good: Meets 4.5:1 */
::placeholder { color: #767676; }
```

**Problem 4: Focus indicators**
- Default browser outline often sufficient
- Custom focus must have 3:1 against adjacent colors
- Use `outline-offset` to separate from element

### Section 5: Color Blindness Considerations (200 words)
Contrast alone doesn't help color blindness. Also:
- Don't use color as only indicator (add icons, patterns, text)
- Test with color blindness simulators
- Red/green is most common issue

**Tools:**
- Sim Daltonism (Mac)
- Color Oracle (Windows)
- Chrome DevTools → Rendering → Emulate vision deficiencies

### Section 6: Quick Reference Checklist
- [ ] Body text: 4.5:1 minimum
- [ ] Large text: 3:1 minimum  
- [ ] Form borders: 3:1 minimum
- [ ] Icons: 3:1 minimum
- [ ] Focus indicators: 3:1 minimum
- [ ] Don't rely on color alone
- [ ] Test with real tools, not just eyeballing

### Related Pages
- Brand Identity Guidelines
- Web Accessibility for Developers
- Testing Tools Directory

---

## 2. focus-management.html

### Title
Focus Management for Web Developers

### Page Introduction
When users navigate with keyboards or assistive technology, focus must move logically and be clearly visible. This guide covers focus indicators, tab order, and managing focus in dynamic content.

### Section 1: Focus Fundamentals (200 words)
- Focus = which element receives keyboard input
- Tab moves forward, Shift+Tab backward
- Only interactive elements receive focus by default
- Focus indicator must be visible (WCAG 2.4.7)

### Section 2: Visible Focus Indicators (300 words)
**Default browser focus:**
```css
/* Most browsers use outline */
:focus { outline: auto; }
```

**Custom focus styles:**
```css
/* ✅ Good: Clear, visible focus */
:focus {
  outline: 3px solid #005EA2;
  outline-offset: 2px;
}

/* ✅ Also good: high contrast ring */
:focus-visible {
  outline: 2px solid #000;
  box-shadow: 0 0 0 4px #fff, 0 0 0 6px #000;
}
```

**Never do this:**
```css
/* ❌ Removes focus for everyone */
:focus { outline: none; }
```

**:focus-visible best practice:**
- Shows focus only for keyboard users
- Hides focus ring for mouse clicks
- Progressive enhancement

### Section 3: Tab Order (250 words)
**Natural tab order:**
- Follows DOM order (not visual order)
- Don't use positive tabindex (tabindex="1")
- Use tabindex="0" to add elements to tab order
- Use tabindex="-1" for programmatic focus only

**Fixing tab order:**
1. Reorder HTML to match visual layout
2. Use CSS for visual positioning
3. Use CSS `order` property carefully (doesn't change tab order)

### Section 4: Managing Focus in Dynamic Content (400 words)
**Modal dialogs:**
```javascript
// When opening modal:
modal.showModal(); // Native dialog handles focus

// For custom modals:
function openModal(modal) {
  previousFocus = document.activeElement;
  modal.hidden = false;
  modal.querySelector('[autofocus]')?.focus() 
    || modal.querySelector('button, [href], input')?.focus();
}

function closeModal(modal) {
  modal.hidden = true;
  previousFocus?.focus();
}
```

**Single-page app navigation:**
```javascript
// After route change, focus main content
router.afterEach(() => {
  document.getElementById('main-content').focus();
  // Or announce with live region
});
```

**Accordion/disclosure:**
```javascript
// Focus stays on trigger, content appears below
button.addEventListener('click', () => {
  const expanded = button.getAttribute('aria-expanded') === 'true';
  button.setAttribute('aria-expanded', !expanded);
  panel.hidden = expanded;
});
```

**Deleted items:**
```javascript
// When removing item from list:
function deleteItem(item) {
  const nextItem = item.nextElementSibling || item.previousElementSibling;
  item.remove();
  nextItem?.querySelector('button')?.focus();
  // Or focus the list heading
}
```

### Section 5: Focus Trapping (200 words)
Required for modals to prevent focus escaping:

```javascript
function trapFocus(container) {
  const focusable = container.querySelectorAll(
    'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
  );
  const first = focusable[0];
  const last = focusable[focusable.length - 1];

  container.addEventListener('keydown', (e) => {
    if (e.key !== 'Tab') return;
    
    if (e.shiftKey && document.activeElement === first) {
      e.preventDefault();
      last.focus();
    } else if (!e.shiftKey && document.activeElement === last) {
      e.preventDefault();
      first.focus();
    }
  });
}
```

### Section 6: Testing Focus
1. Unplug your mouse
2. Tab through entire page
3. Verify: Can you reach everything? See where you are? Get back?
4. Test with screen reader (NVDA, VoiceOver)

### Checklist
- [ ] All interactive elements have visible focus
- [ ] Tab order matches visual reading order
- [ ] Modals trap and restore focus
- [ ] Route changes announce or focus content
- [ ] Removed content moves focus appropriately

---

## 3. pdf-remediation.html

### Title
PDF Remediation: Making PDFs Accessible

### Page Introduction
Many PDFs are inaccessible by default. This guide covers when to remediate vs. recreate, step-by-step Acrobat workflows, and quality testing.

### Section 1: Decision Framework (200 words)
**When to remediate existing PDF:**
- Document is already final/approved
- Source file unavailable
- Simple structure (mostly text)

**When to recreate from source:**
- Source Word/InDesign file available
- Complex tables or forms
- Major structural issues
- Faster than remediation

**When to provide alternative:**
- PDF is scanned image (no OCR)
- Extremely complex (technical drawings)
- Budget constraints

### Section 2: Adobe Acrobat Pro Workflow (500 words)
**Step 1: Run Accessibility Check**
1. Open PDF in Acrobat Pro
2. Tools → Accessibility → Full Check
3. Review report, note issues

**Step 2: Add Document Properties**
1. File → Properties → Description
2. Add Title (required!)
3. Set Language (Initial View → Language)

**Step 3: Fix Reading Order**
1. Tools → Accessibility → Reading Order
2. Click "Show Order Panel"
3. Drag items to correct sequence
4. Tag figures, tables, headings appropriately

**Step 4: Add Alt Text to Images**
1. Right-click image tag
2. Edit Alternate Text
3. Or mark as decorative (artifact)

**Step 5: Fix Tables**
1. Select table in tag tree
2. Right-click → Table Editor
3. Mark header cells as TH
4. Set scope (row/column)

**Step 6: Check Forms**
1. Tools → Prepare Form
2. Verify all fields have labels
3. Add tooltip for additional context
4. Set tab order

**Step 7: Final Check**
1. Run Full Check again
2. Test with screen reader
3. Check logical reading order

### Section 3: Creating Accessible PDFs from Word (300 words)
**Before exporting:**
- [ ] Use Styles for headings (Heading 1, 2, 3)
- [ ] Add alt text to images (right-click → Edit Alt Text)
- [ ] Use real tables (Insert → Table), not tabs
- [ ] Run Accessibility Checker (Review tab)

**Export settings:**
1. File → Save As → PDF
2. Options → Check "Document structure tags"
3. Check "Create bookmarks using Headings"

### Section 4: Common Issues & Fixes
| Issue                 | Fix                        |
| --------------------- | -------------------------- |
| No tags               | Run "Add Tags to Document" |
| Images missing alt    | Add through Tags panel     |
| Wrong reading order   | Use Reading Order tool     |
| Table without headers | Use Table Editor           |
| No document title     | File → Properties → Title  |
| Scanned/image PDF     | Run OCR first              |

### Section 5: Testing Tools
- **Adobe Acrobat Checker** - Built-in, catches most issues
- **PAC 2024** - Free, thorough, PDF/UA validation
- **NVDA** - Test with real screen reader
- **Keyboard** - Tab through forms

### Section 6: When to Outsource
Consider vendors for:
- Large document backlogs (100+ pages)
- Complex technical documents
- Forms with many fields
- Tight deadlines

### Checklist
- [ ] Document has title
- [ ] Language is set
- [ ] Tags exist and are correct
- [ ] Reading order is logical
- [ ] Images have alt text
- [ ] Tables have headers
- [ ] Forms have labels
- [ ] Passes Acrobat/PAC check

---

## 4. web-keyboard.html

### Title
Keyboard Accessibility for Web

### Page Introduction
All functionality must be available to keyboard users. This guide covers making your site fully keyboard-navigable.

### Sections
1. Why keyboard accessibility matters (users, legal, power users)
2. Essential keyboard behaviors (Tab, Enter, Space, Arrow keys, Escape)
3. Common interactive patterns (buttons, links, menus, tabs, accordions)
4. Testing with keyboard only
5. Common failures and fixes
6. ARIA keyboard patterns

---

## 5. testing-tools.html

### Title
Accessibility Testing Tools Directory

### Sections
1. Automated testing tools (axe, WAVE, Lighthouse, Pa11y)
2. Manual testing tools (screen readers, keyboard, zoom)
3. Design tools (contrast checkers, Figma plugins)
4. When to use each tool
5. Tool comparison table
6. Setting up automated testing in CI/CD

---

## 6. media-captioning.html

### Title
Video Captions & Audio Descriptions

### Sections
1. Captions vs subtitles vs transcripts
2. Caption requirements (WCAG 1.2.2, quality standards)
3. How to add captions (YouTube, Panopto, Premiere)
4. Caption quality checklist
5. Audio description basics
6. Live captioning for events

---

## 7. heading-basics.html

### Title
Heading Structure Best Practices

### Sections
1. Why headings matter (navigation, structure, SEO)
2. Heading hierarchy rules (one H1, logical nesting)
3. Common mistakes (skipping levels, visual-only headings)
4. How to check heading structure
5. Before/after examples

---

## 8. meaningful-links.html

### Title
Writing Accessible Link Text

### Sections
1. Why "click here" fails
2. Link text guidelines (descriptive, unique, concise)
3. Good and bad examples
4. Links vs buttons
5. Opening new windows
6. Testing link clarity

---

## 9. do-dont.html

### Title
Accessibility Do's and Don'ts

### Sections
Visual reference cards for:
- General content
- Designing for screen readers
- Designing for low vision
- Designing for dyslexia
- Designing for physical disabilities
- Designing for deaf users

---

## 10. lms-brightspace.html

### Title
Brightspace Accessibility Checklist

### Sections
1. Course homepage setup
2. Content items and modules
3. Discussions and assignments
4. Quizzes and assessments
5. Brightspace HTML editor tips
6. Checking accessibility in Brightspace

---

*Each page should be 800-1500 words with practical examples, code snippets where relevant, and actionable checklists.*
