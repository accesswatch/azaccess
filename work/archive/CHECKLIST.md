# ✅ Pre-Flight Checklist

Use this checklist before your meeting to ensure everything is ready.

## Site Content Review

- [ ] Homepage (home.html) displays correctly
- [ ] All navigation links work
- [ ] Role pages are complete
- [ ] Hub pages are complete
- [ ] Support contact information is correct
- [ ] No placeholder text remains (check for "Lorem ipsum", "TODO", etc.)
- [ ] Footer copyright year is 2025
- [ ] All email links work: accessibility@arizona.edu
- [ ] Phone number is correct: 520-621-3268

## Accessibility Check

- [ ] Skip link works (press Tab on homepage)
- [ ] All links have visible focus indicators
- [ ] Color contrast meets WCAG AA standards
- [ ] All images have alt text (if any)
- [ ] Page titles are descriptive
- [ ] Headings are in logical order (h1 → h2 → h3)
- [ ] Forms have proper labels (if any)
- [ ] No keyboard traps

## Technical Validation

- [ ] HTML validates (use https://validator.w3.org/)
- [ ] CSS loads correctly
- [ ] No broken internal links
- [ ] Mobile responsive design works
- [ ] Site works in Chrome, Firefox, Safari, Edge
- [ ] Print styles are reasonable (if needed)

## GitHub Pages Setup

- [ ] .gitignore file created
- [ ] index.html redirect created
- [ ] README.md completed
- [ ] DEPLOY.md reviewed
- [ ] Git repository initialized
- [ ] Files committed to git
- [ ] GitHub repository created
- [ ] Code pushed to GitHub
- [ ] GitHub Pages enabled in settings
- [ ] Site is live and accessible

## Documentation

- [ ] README.md has correct repository URL
- [ ] DEPLOY.md instructions are clear
- [ ] Scripts (publish-to-github.ps1, update-site.ps1) tested
- [ ] Contact information is up to date

## Meeting Prep

- [ ] Test the live URL before the meeting
- [ ] Prepare to demo key features:
  - Homepage navigation
  - Role selection
  - Hub pages
  - Support resources
  - Accessibility features (skip link, focus indicators)
- [ ] Have backup plan if internet fails (local server)
- [ ] Note any known issues or planned improvements

## Quick Test Commands

```powershell
# Test locally
cd c:\code\azaccess
python -m http.server 8000
# Visit: http://localhost:8000/work/web/home.html

# Check git status
git status

# Validate HTML (if you have validator installed)
# Or use: https://validator.w3.org/
```

## Post-Meeting Tasks

- [ ] Collect feedback
- [ ] Note requested changes
- [ ] Update priority list
- [ ] Schedule follow-up if needed

---

**Ready to go?** Run through the checklist one more time, then you're all set! 🎉
