# Complete Deployment & CI/CD Guide

This guide provides step-by-step instructions for deploying the UA Digital Accessibility site to GitHub Pages and configuring automated accessibility testing via GitHub Actions.

---

## Table of Contents

1. [Prerequisites](#prerequisites)
2. [Local Development Setup](#local-development-setup)
3. [Initial GitHub Repository Setup](#initial-github-repository-setup)
4. [Enable GitHub Pages](#enable-github-pages)
5. [GitHub Actions Setup](#github-actions-setup)
6. [Configure Branch Protection Rules](#configure-branch-protection-rules)
7. [Running Tests Locally](#running-tests-locally)
8. [Making Updates](#making-updates)
9. [Understanding the CI Pipeline](#understanding-the-ci-pipeline)
10. [Custom Domain Setup](#custom-domain-setup-optional)
11. [Troubleshooting](#troubleshooting)
12. [Resources](#resources)

---

## Prerequisites

### Required Software (Local Development)

| Software | Version | Purpose |
|----------|---------|---------|
| [Node.js](https://nodejs.org/) | 20.x LTS | JavaScript runtime |
| [Git](https://git-scm.com/) | 2.40+ | Version control |
| [PowerShell](https://docs.microsoft.com/powershell/) | 7.x | Scripting (Windows) |

### Required Accounts

- **GitHub Account** with repository creation permissions
- **GitHub Personal Access Token** (for pushing code)

### Verify Installation

```powershell
# Check Node.js
node --version    # Should show v20.x.x

# Check npm
npm --version     # Should show 10.x.x

# Check Git
git --version     # Should show git version 2.x.x
```

---

## Local Development Setup

### Step 1: Clone or Initialize Repository

**If starting fresh:**

```powershell
cd s:\code\azaccess
git init
git add .
git commit -m "Initial commit: UA Digital Accessibility prototype"
git branch -M main
```

**If cloning existing:**

```powershell
git clone https://github.com/accesswatch/azaccess.git
cd azaccess
```

### Step 2: Install Node.js Dependencies

```powershell
npm install
```

This installs:
- `axe-core` - WCAG accessibility testing engine
- `@axe-core/playwright` - Playwright integration for axe
- `playwright` - Browser automation for testing
- `serve` - Local development server
- `wait-on` - Utility for waiting on server startup

### Step 3: Install Playwright Browsers

```powershell
npx playwright install chromium
```

### Step 4: Start Local Development Server

```powershell
npm start
```

Visit: http://localhost:3000/home.html

---

## Initial GitHub Repository Setup

### Step 1: Create GitHub Repository

1. Go to https://github.com/new
2. Fill in the details:
   - **Repository name:** `azaccess`
   - **Description:** `University of Arizona Digital Accessibility Resources`
   - **Visibility:** `Public` (required for free GitHub Pages)
   - **DO NOT** check "Add a README file"
   - **DO NOT** add .gitignore or license
3. Click **Create repository**

### Step 2: Create Personal Access Token

GitHub no longer accepts passwords for Git operations. Create a token:

1. Go to **GitHub.com** → Click your profile picture → **Settings**
2. Scroll down to **Developer settings** (left sidebar, bottom)
3. Click **Personal access tokens** → **Tokens (classic)**
4. Click **Generate new token** → **Generate new token (classic)**
5. Configure the token:
   - **Note:** `azaccess deployment`
   - **Expiration:** 90 days (or custom)
   - **Scopes:** Check these boxes:
     - ✅ `repo` (Full control of private repositories)
     - ✅ `workflow` (Update GitHub Action workflows)
6. Click **Generate token**
7. **COPY THE TOKEN NOW** - You won't see it again!

### Step 3: Connect Local Repository to GitHub

```powershell
# Add the remote origin (replace YOUR-USERNAME)
git remote add origin https://github.com/YOUR-USERNAME/azaccess.git

# Push to GitHub
git push -u origin main
```

When prompted for credentials:
- **Username:** Your GitHub username
- **Password:** Paste your Personal Access Token (NOT your GitHub password)

### Step 4: Store Credentials (Optional)

To avoid entering credentials every time:

```powershell
# Store credentials in Windows Credential Manager
git config --global credential.helper wincred
```

---

## Enable GitHub Pages

### Step 1: Configure Pages Settings

1. Go to your repository on GitHub
2. Click **Settings** tab (gear icon)
3. Click **Pages** in the left sidebar
4. Under **Build and deployment**:
   - **Source:** Deploy from a branch
   - **Branch:** `main`
   - **Folder:** `/ (root)`
5. Click **Save**

### Step 2: Wait for Initial Deployment

- GitHub will automatically build and deploy your site
- This takes 1-3 minutes
- A green checkmark appears when complete

### Step 3: Access Your Site

Your site is now live at:

```
https://YOUR-USERNAME.github.io/azaccess/
```

The `index.html` redirects visitors to:

```
https://YOUR-USERNAME.github.io/azaccess/docs/home.html
```

---

## GitHub Actions Setup

The repository includes pre-configured GitHub Actions workflows for automated accessibility testing. Here's how to ensure they work correctly.

### Step 1: Enable GitHub Actions

1. Go to your repository on GitHub
2. Click the **Actions** tab
3. If prompted, click **I understand my workflows, go ahead and enable them**

### Step 2: Verify Workflow File Exists

The workflow file should already exist at:

```
.github/workflows/accessibility.yml
```

This workflow:
- Runs on every push to `main`
- Runs on every pull request to `main`
- Runs weekly on Monday at 6 AM UTC
- Can be triggered manually

### Step 3: Configure Workflow Permissions

1. Go to **Settings** → **Actions** → **General**
2. Scroll to **Workflow permissions**
3. Select **Read and write permissions**
4. Check **Allow GitHub Actions to create and approve pull requests**
5. Click **Save**

### Step 4: Verify Required Files

Ensure these files exist in your repository:

```
.github/
├── workflows/
│   └── accessibility.yml    # Main CI workflow
├── lighthouse-config.json   # Lighthouse settings
├── PULL_REQUEST_TEMPLATE.md # PR template
└── ISSUE_TEMPLATE/          # Issue templates
    └── accessibility-issue.yml

playwright.a11y.config.js    # Playwright config
package.json                 # Dependencies
tests/
└── accessibility/
    └── wcag.spec.js         # Accessibility tests
```

### Step 5: Test the Workflow

**Option A: Manual Trigger**

1. Go to **Actions** tab
2. Click **Accessibility Testing** workflow
3. Click **Run workflow** dropdown
4. Select `main` branch
5. Click **Run workflow**

**Option B: Push a Commit**

```powershell
# Make a small change
git add .
git commit -m "Test: Trigger accessibility workflow"
git push
```

### Step 6: View Workflow Results

1. Go to **Actions** tab
2. Click on the running/completed workflow
3. View:
   - **Job Summary** - Pass/fail status
   - **Artifacts** - Downloadable HTML reports
   - **Logs** - Detailed test output

---

## Configure Branch Protection Rules

Protect the `main` branch to require passing accessibility tests before merging.

### Step 1: Access Branch Protection Settings

1. Go to **Settings** → **Branches**
2. Under "Branch protection rules", click **Add branch protection rule**

### Step 2: Configure Protection Rules

1. **Branch name pattern:** `main`

2. Check these options:
   - ✅ **Require a pull request before merging**
     - ✅ Require approvals: `1`
   - ✅ **Require status checks to pass before merging**
     - ✅ Require branches to be up to date before merging
     - Search and add: `Accessibility Audit`
   - ✅ **Require conversation resolution before merging**
   - ✅ **Do not allow bypassing the above settings**

3. Click **Create** or **Save changes**

### Step 3: Verify Protection

Now when creating a pull request:
- The accessibility workflow will run automatically
- Merging is blocked until tests pass
- PR comments show detailed accessibility results

---

## Running Tests Locally

### Quick Accessibility Audit

```powershell
# Run all accessibility tests
npm test

# Run with Playwright UI (visual debugging)
npm run test:a11y:ui

# View HTML report after tests complete
npm run test:a11y:report
```

### Audit Specific Pages

```powershell
# Audit key pages only
npm run audit

# Audit ALL HTML files (takes longer)
npm run audit:all
```

### Lighthouse Accessibility Audit

```powershell
# Start server first
npm start

# In another terminal, run Lighthouse
npm run lighthouse
```

### Available npm Scripts

| Command | Description |
|---------|-------------|
| `npm start` | Start local dev server on port 3000 |
| `npm test` | Run all Playwright accessibility tests |
| `npm run test:a11y` | Run accessibility tests |
| `npm run test:a11y:ui` | Run tests with visual UI |
| `npm run test:a11y:report` | View HTML test report |
| `npm run audit` | Run axe-core audit on key pages |
| `npm run audit:all` | Run axe-core audit on ALL pages |
| `npm run lighthouse` | Run Lighthouse accessibility audit |

---

## Making Updates

### Standard Workflow

```powershell
# 1. Create a feature branch
git checkout -b feature/update-home-page

# 2. Make your changes...

# 3. Run local tests
npm test

# 4. Commit changes
git add .
git commit -m "Update home page accessibility improvements"

# 5. Push feature branch
git push -u origin feature/update-home-page

# 6. Create Pull Request on GitHub
# → GitHub Actions will run automatically
# → Review accessibility report in PR comments
# → Merge when all checks pass
```

### Quick Updates (Direct to Main)

For minor changes when branch protection allows:

```powershell
# Quick update script
.\update-site.ps1 "Description of changes"

# Or manually:
git add .
git commit -m "Fix: Improve color contrast on buttons"
git push
```

### Update Deployment Script

The `update-site.ps1` script automates common tasks:

```powershell
# Usage
.\update-site.ps1 "Your commit message"

# What it does:
# 1. Stages all changes
# 2. Commits with your message
# 3. Pushes to GitHub
# 4. Triggers GitHub Actions
```

---

## Understanding the CI Pipeline

### Workflow Triggers

The `.github/workflows/accessibility.yml` runs when:

| Trigger | Description |
|---------|-------------|
| `push` to `main` | Any commit to main branch |
| `pull_request` to `main` | Any PR targeting main |
| `schedule` (cron) | Weekly on Monday 6 AM UTC |
| `workflow_dispatch` | Manual trigger from Actions tab |

### What Gets Tested

1. **Playwright + axe-core Tests**
   - Automated WCAG 2.2 AA compliance
   - Tests all pages in `docs/` directory
   - Zero false-positive design

2. **Lighthouse Accessibility Audit**
   - Google's accessibility scoring
   - Tests key pages for 90%+ score
   - Includes best practices

### Test Results

After each run:

| Artifact | Contents |
|----------|----------|
| `playwright-report-{run}` | Detailed HTML report with violations |
| `lighthouse-report-{run}` | Lighthouse HTML reports per page |

### PR Comments

When testing a pull request, the workflow automatically posts:
- ✅/❌ Pass/fail status for each test suite
- 📊 Links to full reports
- ✋ Manual testing checklist

---

## Custom Domain Setup (Optional)

### Step 1: Add CNAME File

Create a file named `CNAME` (no extension) in the repository root:

```
accessibility.arizona.edu
```

### Step 2: Configure DNS

Contact your domain administrator to add:

| Record Type | Host | Value |
|-------------|------|-------|
| CNAME | `accessibility` | `YOUR-USERNAME.github.io` |

Or for apex domain:

| Record Type | Host | Value |
|-------------|------|-------|
| A | `@` | `185.199.108.153` |
| A | `@` | `185.199.109.153` |
| A | `@` | `185.199.110.153` |
| A | `@` | `185.199.111.153` |

### Step 3: Enable in GitHub

1. Go to **Settings** → **Pages**
2. Under **Custom domain**, enter your domain
3. Click **Save**
4. Check **Enforce HTTPS** (after DNS propagates)

### Step 4: Wait for DNS Propagation

DNS changes can take 24-48 hours to propagate globally.

---

## Troubleshooting

### GitHub Actions Issues

#### Workflow Not Running

1. Check **Actions** tab is enabled
2. Verify workflow file is in `.github/workflows/`
3. Check file triggers match your branch name
4. Ensure `workflow` scope in your PAT

#### Tests Failing in CI but Pass Locally

```powershell
# Ensure dependencies match
rm -r node_modules
npm ci  # Uses package-lock.json exactly

# Run in CI mode locally
$env:CI = "true"
npm test
```

#### Permission Denied on PR Comments

1. Go to **Settings** → **Actions** → **General**
2. Enable **Read and write permissions**
3. Re-run the failed workflow

### Git/GitHub Issues

#### "Permission denied" When Pushing

```powershell
# Check remote URL
git remote -v

# Switch to HTTPS if using SSH
git remote set-url origin https://github.com/YOUR-USERNAME/azaccess.git

# Use Personal Access Token as password
```

#### "Repository not found"

- Verify repository exists on GitHub
- Check spelling of username/repo name
- Ensure PAT has `repo` scope

### Site Issues

#### Site Not Updating

1. Check **Actions** tab for failed builds
2. Clear browser cache (Ctrl+Shift+R)
3. Wait 5-10 minutes for propagation
4. Verify GitHub Pages is enabled

#### 404 Errors

- Ensure file paths are correct
- Check case sensitivity (GitHub Pages is case-sensitive)
- Verify all files were committed and pushed

### Local Testing Issues

#### Port 3000 Already in Use

```powershell
# Find process using port 3000
netstat -ano | findstr :3000

# Kill the process (replace PID)
taskkill /PID <PID> /F

# Or use a different port
npx serve docs -p 3001
```

#### Playwright Browser Not Found

```powershell
# Reinstall browsers
npx playwright install chromium

# With system dependencies
npx playwright install --with-deps chromium
```

---

## Site Structure

```
azaccess/
├── .github/
│   ├── workflows/
│   │   └── accessibility.yml  # CI/CD workflow
│   ├── lighthouse-config.json # Lighthouse settings
│   ├── PULL_REQUEST_TEMPLATE.md
│   └── ISSUE_TEMPLATE/
├── docs/                      # Main site content
│   ├── home.html              # Homepage
│   ├── styles.css             # Shared styles
│   ├── roles.html             # Role selection hub
│   ├── accessibility-101.html # Introduction guide
│   └── [50+ content pages]
├── scripts/
│   └── axe-audit.js           # Local audit script
├── tests/
│   └── accessibility/
│       └── wcag.spec.js       # Playwright tests
├── index.html                 # Root redirect
├── package.json               # Dependencies & scripts
├── playwright.a11y.config.js  # Playwright config
├── publish-to-github.ps1      # Initial setup script
├── update-site.ps1            # Quick update script
└── DEPLOY.md                  # This file
```

---

## Resources

### Documentation

- [GitHub Pages Documentation](https://docs.github.com/en/pages)
- [GitHub Actions Documentation](https://docs.github.com/en/actions)
- [Playwright Documentation](https://playwright.dev/)
- [axe-core Rules](https://dequeuniversity.com/rules/axe/)

### Tools

- [axe DevTools Browser Extension](https://www.deque.com/axe/devtools/)
- [Lighthouse Chrome Extension](https://chrome.google.com/webstore/detail/lighthouse)
- [WAVE Web Accessibility Evaluator](https://wave.webaim.org/)

### Standards

- [WCAG 2.2 Guidelines](https://www.w3.org/TR/WCAG22/)
- [WAI-ARIA Authoring Practices](https://www.w3.org/WAI/ARIA/apg/)

---

## Need Help?

- **GitHub Issues:** https://github.com/accesswatch/azaccess/issues
- **GitHub Pages Help:** https://github.com/orgs/community/discussions/categories/pages
- **UA Accessibility Team:** accessibility@arizona.edu

---

*Last updated: January 2026*
