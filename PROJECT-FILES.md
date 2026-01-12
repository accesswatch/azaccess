# Project Files Reference

This document describes the purpose and location of all critical files in the **Accessibility at Arizona** project.

**Last Updated:** January 9, 2026

---

## Quick Navigation

| Category           | Key File                                                                 |
| ------------------ | ------------------------------------------------------------------------ |
| 🚀 Getting Started | [README.md](#readmemd)                                                   |
| 📋 Deployment      | [DEPLOY.md](#deploymd)                                                   |
| 📖 Full Manual     | [ACCESSIBILITY-DEVELOPMENT-GUIDE.md](#accessibility-development-guidemd) |
| ✅ Testing         | [MANUAL-A11Y-REVIEW-CHECKLIST.md](#manual-a11y-review-checklistmd)       |
| 📝 Change Log      | [CHANGELOG.md](#changelogmd)                                             |
| 🔧 CI/CD Proposal  | [ACCESSIBILITY-CI-PROPOSAL.md](#accessibility-ci-proposalmd)             |

---

## Root Directory Files

### Essential Files (Keep)

#### README.md

**Purpose:** Main project documentation and quick start guide
**Contains:**

- Project overview and live site URL
- Repository structure
- Git/GitHub Pages deployment commands
- Quick update workflow

**Use when:** You need to understand the project or share it with someone new.

---

#### DEPLOY.md

**Purpose:** Detailed GitHub Pages deployment instructions
**Contains:**

- Step-by-step manual deployment guide
- PowerShell script usage
- Troubleshooting common deployment issues
- Custom domain setup (optional)

**Use when:** Publishing the site for the first time or debugging deployment issues.

---

#### CHANGELOG.md

**Purpose:** Project history and version tracking
**Contains:**

- All notable changes organized by date
- Navigation overhaul details (January 2026)
- Infrastructure additions (MCP servers, agents, workflows)
- Accessibility fixes applied

**Use when:** Reviewing what changed between versions or documenting new changes.

---

#### ACCESSIBILITY-CI-PROPOSAL.md

**Purpose:** 📝 **PROPOSAL** - Automated accessibility checking for Arizona Quick Start
**Contains:**

- Executive summary and problem statement
- GitHub Actions workflow configuration for CI/CD accessibility checks
- Tool selection (axe-core, Lighthouse CI, Pa11y)
- Implementation phases and timeline
- Resource requirements and success metrics
- Workarounds for organizations without GitHub Copilot

**Use when:** Presenting to the UA Digital Web Site Team about implementing accessibility CI/CD, or as a reference for setting up similar workflows in other projects.

**Note:** Designed for organizations without GitHub Copilot - relies entirely on open-source tools and GitHub Actions.

---

#### ACCESSIBILITY-DEVELOPMENT-GUIDE.md

**Purpose:** ⭐ **THE COMPREHENSIVE MANUAL** - Complete development guide
**Contains:**

- Available MCP servers and how to use them
- GitHub Copilot agents for accessibility
- Automated testing workflows
- WCAG 2.2 compliance patterns
- CI/CD pipeline configuration
- Troubleshooting guide

**Use when:** You need detailed guidance on any aspect of accessibility development for this project.

**This is the "extensive manual" you're looking for.**

---

#### vscode-terminal-accessibility.md

**Purpose:** VS Code terminal accessibility configuration guide
**Contains:**

- Terminal accessibility settings for VS Code
- Screen reader compatibility configuration
- Keyboard navigation tips for terminal use

**Use when:** Setting up VS Code for accessible terminal usage.

---

#### MANUAL-A11Y-REVIEW-CHECKLIST.md

**Purpose:** Human testing checklist for accessibility validation
**Contains:**

- Manual testing items that cannot be automated
- Skip link verification guidance
- Screen reader testing checklist
- Keyboard navigation testing
- Form and interactive component testing

**Use when:** Performing final accessibility QA before a release.

---

#### package.json

**Purpose:** Node.js project configuration
**Contains:**

- NPM scripts for testing and auditing
- Project dependencies (axe-core, Playwright, etc.)
- Available commands:
  - `npm start` - Local server on port 3000
  - `npm run audit` - Axe accessibility audit
  - `npm run test:a11y` - Playwright accessibility tests

**Use when:** Running automated tests or installing project dependencies.

---

### Deployment Scripts

#### deploy-gh.ps1

**Purpose:** Automated GitHub Pages deployment
**Use when:** First-time deployment to GitHub Pages

#### publish-to-github.ps1

**Purpose:** Initial git setup and GitHub repository creation
**Use when:** Setting up git for the first time

#### update-site.ps1

**Purpose:** Quick site updates after changes
**Usage:** `.\update-site.ps1 "Description of your changes"`

---

### Special Files

#### index.html

**Purpose:** Root redirect to the actual homepage
**Behavior:** Automatically redirects visitors to `docs/home.html`

#### .gitignore

**Purpose:** Excludes files from version control
**Contains:** Node modules, editor files, system files

---

## Documentation Folder (`docs/`)

### Primary Documentation

#### docs/README.md

**Purpose:** Documentation folder overview
**Contains:** Quick reference for files in the docs folder

---

### Website Content (HTML Pages in `docs/`)

The `docs/` folder contains 70+ HTML pages that make up the live website:

| Page Type       | Examples                                                                   |
| --------------- | -------------------------------------------------------------------------- |
| **Homepage**    | `home.html`                                                                |
| **Role Guides** | `persona-students.html`, `persona-faculty.html`, `persona-developers.html` |
| **Hub Pages**   | `documents-media.html`, `web-app.html`, `teaching-learning.html`           |
| **Reference**   | `glossary.html`, `faq.html`, `accessibility-101.html`                      |
| **Tools**       | `wizard.html`, `tools-checklists.html`, `testing-tools.html`               |
| **Examples**    | `before-after-examples.html`, `example-newsletter.html`                    |

---

## Configuration Folders

### `.vscode/`

| File               | Purpose                                              |
| ------------------ | ---------------------------------------------------- |
| `settings.json`    | Project settings with axe-linter WCAG 2.2 rules      |
| `extensions.json`  | Recommended VS Code extensions                       |
| `mcp-servers.json` | MCP server configurations (Playwright, GitHub, etc.) |
| `tasks.json`       | Build and run tasks                                  |

### `.github/`

| File/Folder                   | Purpose                                                  |
| ----------------------------- | -------------------------------------------------------- |
| `copilot-instructions.md`     | Custom Copilot instructions for accessibility-first code |
| `workflows/accessibility.yml` | CI/CD accessibility testing pipeline                     |
| `lighthouse-config.json`      | Lighthouse audit configuration                           |
| `agents/`                     | Copilot agent definitions for accessibility tasks        |
| `ISSUE_TEMPLATE/`             | Issue templates for accessibility reports                |
| `PULL_REQUEST_TEMPLATE.md`    | PR template with accessibility checklist                 |

---

## Testing & Scripts

### `tests/`

| File                         | Purpose                           |
| ---------------------------- | --------------------------------- |
| `accessibility/wcag.spec.js` | Playwright WCAG 2.2 AA test suite |

### `scripts/`

| File                    | Purpose                                              |
| ----------------------- | ---------------------------------------------------- |
| `axe-audit.js`          | Command-line accessibility audit with HTML reporting |
| `run-axe-playwright.js` | Automated scanning of all pages                      |
| `parse-axe-reports.js`  | Report analysis and prioritization                   |
| `apply-a11y-fixes.js`   | Automated HTML remediation                           |
| `header.js`             | Shared header/navigation JavaScript                  |
| `axe-reports/`          | JSON scan results (121 page reports)                 |

### `playwright.a11y.config.js`

**Purpose:** Playwright configuration for accessibility tests

---

## Archived/Redundant Files

The following files in the root directory contain **overlapping or historical information** that has been consolidated into other documents. Consider archiving or removing:

### Can Be Archived → `work/archive/`

| File                                  | Reason                                | Content Now In                      |
| ------------------------------------- | ------------------------------------- | ----------------------------------- |
| `START-HERE.md`                       | Redundant with README.md              | README.md                           |
| `CHECKLIST.md`                        | Pre-meeting checklist (one-time use)  | N/A - meeting completed             |
| `EXECUTIVE-SUMMARY.md`                | Historical remediation summary        | ACCESSIBILITY-REMEDIATION-REPORT.md |
| `ACCESSIBILITY-REMEDIATION-REPORT.md` | Historical - work completed           | Archive for reference               |
| `SITE-IMPROVEMENT-PLAN.md`            | Planning document - work in progress  | Consolidate to PROJECT-ROADMAP.md   |
| `SITE-IMPROVEMENT-RECOMMENDATIONS.md` | Planning document - overlaps above    | Consolidate to PROJECT-ROADMAP.md   |
| `CONTENT-QUALITY-REPORT.md`           | Audit report - findings documented    | Consolidate to PROJECT-ROADMAP.md   |
| `CONTENT-IMPROVEMENT-PLAN.md`         | Content planning - overlaps above     | Consolidate to PROJECT-ROADMAP.md   |
| `PRIORITY-1-CONTENT-SPECS.md`         | Content specs - detailed requirements | Keep if actively writing content    |

### Can Be Removed

| File                                 | Reason                                            |
| ------------------------------------ | ------------------------------------------------- |
| `docs.FullName`                      | Appears to be an error/temp file                  |
| `pages-run-20044246201.txt`          | Temporary log file                                |
| `accessibility for arizona.agent.md` | Agent definition (should be in `.github/agents/`) |

### Move to Appropriate Location

| File                                       | Move To                         |
| ------------------------------------------ | ------------------------------- |
| `ua-accessibility-articulate-resources.md` | `docs/` or convert to HTML page |

---

## Recommended File Structure After Cleanup

```
azaccess/
├── README.md                    # Quick start & overview
├── DEPLOY.md                    # Deployment guide
├── CHANGELOG.md                 # Version history
├── MANUAL-A11Y-REVIEW-CHECKLIST.md  # Manual testing guide
├── PROJECT-FILES.md             # This file
├── ACCESSIBILITY-DEVELOPMENT-GUIDE.md  # ⭐ MAIN MANUAL
├── vscode-terminal-accessibility.md    # VS Code terminal accessibility guide
├── package.json                 # NPM configuration
├── index.html                   # Root redirect
├── .gitignore
│
├── docs/                        # Website content
│   ├── home.html                # Homepage
│   ├── [70+ HTML pages]         # Site content
│   └── styles.css               # Shared styles
│
├── scripts/                     # Automation scripts
├── tests/                       # Automated tests
├── .vscode/                     # VS Code configuration
├── .github/                     # GitHub configuration & agents
│
└── work/
    └── archive/                 # Historical planning documents
        ├── START-HERE.md
        ├── CHECKLIST.md
        ├── EXECUTIVE-SUMMARY.md
        ├── ACCESSIBILITY-REMEDIATION-REPORT.md
        ├── SITE-IMPROVEMENT-PLAN.md
        ├── SITE-IMPROVEMENT-RECOMMENDATIONS.md
        ├── CONTENT-QUALITY-REPORT.md
        ├── CONTENT-IMPROVEMENT-PLAN.md
        └── PRIORITY-1-CONTENT-SPECS.md
```

---

## Quick Reference: Where to Find Things

| I need to...                     | Look in...                             |
| -------------------------------- | -------------------------------------- |
| Understand the project           | README.md                              |
| Deploy the site                  | DEPLOY.md                              |
| Run automated tests              | `npm run test:a11y` (see package.json) |
| Do manual accessibility testing  | MANUAL-A11Y-REVIEW-CHECKLIST.md        |
| Learn about MCP servers & agents | ACCESSIBILITY-DEVELOPMENT-GUIDE.md     |
| Configure VS Code                | .vscode/ folder                        |
| Set up CI/CD                     | .github/workflows/                     |
| See what changed                 | CHANGELOG.md                           |
| Find website content             | docs/\*.html                           |
| Write new accessibility tests    | tests/accessibility/                   |
| Run accessibility audits         | scripts/axe-audit.js                   |

---

## Summary

**Essential files to keep in root:**

1. `README.md` - Project overview
2. `DEPLOY.md` - Deployment guide
3. `CHANGELOG.md` - Change history
4. `MANUAL-A11Y-REVIEW-CHECKLIST.md` - Testing checklist
5. `PROJECT-FILES.md` - This reference document
6. `ACCESSIBILITY-DEVELOPMENT-GUIDE.md` - ⭐ Main development manual
7. `vscode-terminal-accessibility.md` - VS Code terminal accessibility guide
8. `package.json` - NPM config
9. `index.html` - Redirect
10. Deployment scripts (`.ps1` files)

**The comprehensive manual is:** `ACCESSIBILITY-DEVELOPMENT-GUIDE.md` (in root)

**Everything else can be archived** to `work/archive/` to keep the root directory clean.
