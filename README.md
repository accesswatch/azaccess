# Accessibility at Arizona - Prototype Site

This repository contains the prototype for the University of Arizona Digital Accessibility website.

## 🌐 Live Site

Visit the live prototype: [https://YOUR-USERNAME.github.io/azaccess/work/web/home.html](https://YOUR-USERNAME.github.io/azaccess/work/web/home.html)

## 📋 About

This site provides comprehensive accessibility guidance for students, faculty, staff, and visitors at the University of Arizona. It includes:

- **Persona-based guidance** for different roles (students, faculty, staff, developers, etc.)
- **Hub pages** for documents, media, web/apps, teaching, and governance
- **Tools and checklists** for accessibility testing and compliance
- **Support resources** and contact information
- **Blog** with updates on accessibility initiatives

## 🏗️ Structure

- `work/web/` - Main prototype files
  - `home.html` - Homepage with quick links and hubs
  - `personas.html` - Persona gateway page
  - `accessibility-101.html` - Introduction to accessibility
  - Various hub and guide pages
  - `styles.css` - Shared stylesheet

## 🚀 Publishing to GitHub Pages

### Quick Start: Automated Deployment (Recommended)

**One command does everything!**

```powershell
.\deploy-gh.ps1
```

This script automatically:
- ✅ Initializes git repository
- ✅ Creates GitHub repository
- ✅ Pushes your code
- ✅ Enables GitHub Pages
- ✅ Provides your live URL

**Requirements:**
- GitHub CLI installed: `winget install --id GitHub.cli`
- Authenticated: `gh auth login`

**Your site goes live in 2 minutes at:** `https://YOUR-USERNAME.github.io/azaccess/`

---

### Manual Setup (Alternative)

If you prefer to do it manually or don't have GitHub CLI:

1. **Initialize git** (run from `c:\code\azaccess`):
   ```powershell
   git init
   git add .
   git commit -m "Initial commit: Accessibility prototype site"
   git branch -M main
   ```

2. **Create GitHub repository**:
   - Go to https://github.com/new
   - Name: `azaccess`
   - Public repository
   - Don't initialize with README

3. **Push to GitHub**:
   ```powershell
   git remote add origin https://github.com/YOUR-USERNAME/azaccess.git
   git push -u origin main
   ```

4. **Enable GitHub Pages**:
   - Repository Settings > Pages
   - Source: Deploy from a branch
   - Branch: `main`, Folder: `/ (root)`
   - Save

### Making Updates

After making changes to your HTML, CSS, or other files:

```powershell
# Quick update (auto-detects your username)
.\update-site.ps1 "Description of your changes"

# Or manually:
git add .
git commit -m "Description of your changes"
git push
```

GitHub Pages automatically rebuilds your site (1-2 minutes).

## 🧪 Local Development

To test locally, run a simple HTTP server from the root directory:

### Using Python:
```bash
python -m http.server 8000
```

Then visit: `http://localhost:8000/work/web/home.html`

### Using Node.js:
```bash
npx http-server -p 8000
```

## ✨ Features

- **WCAG 2.2 compliant** design patterns
- **Responsive layout** that works on mobile and desktop
- **Skip links** for keyboard navigation
- **High contrast** color scheme (Arizona brand colors)
- **Semantic HTML** structure
- **Clear focus indicators** for keyboard users

## 📞 Contact

For questions about accessibility at the University of Arizona:
- Email: accessibility@arizona.edu
- Phone: 520-621-3268

## 📄 License

© 2025 The Arizona Board of Regents on behalf of The University of Arizona
