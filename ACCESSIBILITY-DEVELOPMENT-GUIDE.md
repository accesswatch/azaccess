# Accessibility Development Guide

Complete step-by-step instructions for using all accessibility tools, configurations, and agents in this project.

---

## Table of Contents

1. [Initial Setup](#1-initial-setup)
2. [VS Code Extensions](#2-vs-code-extensions)
3. [Axe-Core Linting](#3-axe-core-linting)
4. [Automated Testing](#4-automated-testing)
5. [MCP Servers](#5-mcp-servers)
6. [Claude Agents](#6-claude-agents)
7. [GitHub Workflow](#7-github-workflow)
8. [GitHub Actions CI/CD](#8-github-actions-cicd)
9. [Manual Testing Checklist](#9-manual-testing-checklist)
10. [NPM Scripts Reference](#10-npm-scripts-reference)
11. [Troubleshooting](#11-troubleshooting)

---

## 1. Initial Setup

### Step 1.1: Clone and Install

```bash
# Clone the repository
git clone https://github.com/accesswatch/azaccess.git
cd azaccess

# Install Node.js dependencies
npm install

# Install Playwright browser (required for testing)
npx playwright install chromium
```

### Step 1.2: Verify Installation

```bash
# Check axe-core is installed
npm list axe-core
# Should show: axe-core@4.11.0

# Check Playwright is installed
npx playwright --version
# Should show: Version 1.57.0 or higher
```

### Step 1.3: Start Local Server

```bash
# Start the development server
npm start

# You should see:
# Serving! http://localhost:3000
```

Keep this terminal open. Open a new terminal for running tests.

### Step 1.4: Verify Server is Running

Open http://localhost:3000/home.html in your browser. You should see the Accessibility at Arizona home page.

---

## 2. VS Code Extensions

### Step 2.1: Open the Project in VS Code

```bash
code .
```

### Step 2.2: Install Recommended Extensions

1. VS Code will show a popup: **"This workspace has extension recommendations"**
2. Click **"Install All"**

**Or install manually:**

| Extension                | ID                                      | Purpose                 |
| ------------------------ | --------------------------------------- | ----------------------- |
| Axe Accessibility Linter | `deque-systems.vscode-axe-linter`       | Real-time WCAG checking |
| Playwright Test          | `ms-playwright.playwright`              | Run accessibility tests |
| GitHub Copilot           | `github.copilot`                        | AI assistance           |
| GitHub Copilot Chat      | `github.copilot-chat`                   | Chat with agents        |
| Prettier                 | `esbenp.prettier-vscode`                | Code formatting         |
| Code Spell Checker       | `streetsidesoftware.code-spell-checker` | Catch typos             |

**To install manually:**

1. Press `Ctrl+Shift+X` (Windows) or `Cmd+Shift+X` (Mac)
2. Search for the extension name
3. Click **Install**

### Step 2.3: Verify Settings Are Applied

1. Press `Ctrl+,` (Windows) or `Cmd+,` (Mac) to open Settings
2. Click the **Workspace** tab
3. Search for "axe-linter"
4. You should see rules configured for WCAG 2.2

The project's `.vscode/settings.json` automatically configures:

- ✅ Axe-linter WCAG 2.2 AA rules
- ✅ Format on save
- ✅ Accessibility spell check terms
- ✅ HTML validation

### Step 2.4: Reload VS Code

Press `Ctrl+Shift+P` → type "Reload Window" → press Enter

---

## 3. Axe-Core Linting

### How It Works

The axe-linter extension scans your HTML in real-time and highlights WCAG violations.

### Step 3.1: See Linting in Action

1. Open `docs/home.html`
2. Look for yellow/red squiggly underlines
3. Hover over a squiggle to see the issue

**Example issue:**

```
[axe-linter] Images must have alternate text (image-alt)
WCAG 1.1.1 Level A
```

### Step 3.2: Fix an Issue

1. Hover over the squiggle
2. Click **Quick Fix** (lightbulb icon)
3. Select the suggested fix
4. Or manually edit the code

### Step 3.3: View All Problems

1. Press `Ctrl+Shift+M` (Windows) or `Cmd+Shift+M` (Mac)
2. The **Problems** panel shows all accessibility issues
3. Click an issue to jump to it

### Step 3.4: Run Command-Line Audit

```bash
# Make sure server is running first (npm start)

# Audit key pages (10 most important)
npm run audit

# Audit ALL HTML files
npm run audit:all

# Audit specific files
node scripts/axe-audit.js docs/home.html docs/faculty.html
```

### Step 3.5: View Audit Report

After running an audit:

1. Open `reports/axe-report-latest.html` in a browser
2. Report shows:
   - Summary of all violations by severity
   - Each page's issues
   - Affected HTML elements
   - Links to "How to fix" documentation

---

## 4. Automated Testing

### Step 4.1: Run All Accessibility Tests

```bash
# Ensure server is running (npm start in another terminal)

# Run the full test suite
npm run test:a11y
```

**What gets tested:**

- WCAG 2.2 AA compliance on all key pages
- Keyboard navigation (Tab, Enter, Escape)
- Focus indicators visibility
- Color contrast ratios
- Heading hierarchy
- Image alt text
- Form label associations
- ARIA attribute validity
- Responsive layouts (320px, 768px, 1280px)

### Step 4.2: Run Tests with Interactive UI

```bash
npm run test:a11y:ui
```

This opens Playwright's UI where you can:

- See all tests organized by category
- Run individual tests
- Watch tests execute in the browser
- Debug failing tests step-by-step

### Step 4.3: View Test Report

```bash
npm run test:a11y:report
```

Opens an HTML report showing:

- Pass/fail status for each test
- Screenshots of failures
- Detailed error messages

### Step 4.4: Run Lighthouse Audit

```bash
# Server must be running
npm run lighthouse
```

Opens `reports/lighthouse.html` with:

- Accessibility score (target: 90+)
- Specific issues found
- Opportunities for improvement

---

## 5. MCP Servers

MCP (Model Context Protocol) servers extend Copilot Chat's capabilities with specialized tools.

### Step 5.1: Enable MCP in VS Code

1. Press `Ctrl+,` (Windows) or `Cmd+,` (Mac) to open Settings
2. Search for **"mcp"**
3. Find **"Chat: Mcp Enabled"**
4. Check the box to **enable**
5. **Restart VS Code** (not just reload - fully quit and reopen)

### Step 5.2: Verify MCP Servers Are Configured

1. Open `.vscode/mcp-servers.json`
2. You should see 5 servers configured:
   - `playwright-a11y` - Browser automation
   - `github` - GitHub integration
   - `firecrawl` - Web scraping
   - `memory` - Knowledge storage
   - `context7` - Documentation lookup

### Step 5.3: Set Environment Variables (Required for Some Servers)

**For GitHub server:**

1. Create a GitHub Personal Access Token:

   - Go to https://github.com/settings/tokens
   - Click "Generate new token (classic)"
   - Select scopes: `repo`, `read:org`
   - Copy the token

2. Set the environment variable:

**Windows (PowerShell - run as Admin):**

```powershell
[System.Environment]::SetEnvironmentVariable('GITHUB_TOKEN', 'your-token-here', 'User')
```

**Windows (Command Prompt):**

```cmd
setx GITHUB_TOKEN "your-token-here"
```

**Mac/Linux:**

```bash
echo 'export GITHUB_TOKEN="your-token-here"' >> ~/.bashrc
source ~/.bashrc
```

3. Restart VS Code

**For Firecrawl server (optional):**

- Sign up at https://firecrawl.dev
- Get your API key
- Set `FIRECRAWL_API_KEY` the same way

### Step 5.4: Using MCP Servers in Copilot Chat

Open Copilot Chat: `Ctrl+Shift+I` (Windows) or `Cmd+Shift+I` (Mac)

#### Playwright Server - Browser Automation

**Test keyboard navigation:**

```
Use Playwright to test if the skip link on home.html works.
Tab to it and press Enter, then verify focus moves to main content.
```

**Check focus indicators:**

```
Navigate to roles.html with Playwright and tab through all interactive elements.
Take a screenshot of each focused element to verify focus indicators are visible.
```

**Test form accessibility:**

```
Go to support.html, find the contact form, and verify each input has an associated label.
```

#### GitHub Server - Issues & PRs

**Create an issue:**

```
Create an accessibility issue in this repo titled "Missing alt text on faculty page"
with severity "serious" and WCAG criterion "1.1.1".
```

**Search code:**

```
Search this repository for all uses of tabindex.
```

**List issues:**

```
Show me all open issues with the "accessibility" label.
```

#### Memory Server - Store Patterns

**Remember a decision:**

```
Remember: Our project standard for focus indicators is
outline: 3px solid var(--ua-maroon) with outline-offset: 2px
```

**Recall later:**

```
What's our standard for focus indicators?
```

#### Context7 Server - Documentation

**Get ARIA docs:**

```
Get documentation for how to properly use aria-live regions for dynamic content.
```

**Look up patterns:**

```
Show me the WAI-ARIA Authoring Practices for accessible modal dialogs.
```

---

## 6. Claude Agents

The project includes specialized Claude agents that are automatically available in VS Code. These agents have deep expertise in accessibility and follow project-specific standards.

### How Agents Work in VS Code

The agent definitions in `.github/agents/` are automatically loaded by Claude. When you ask accessibility-related questions, Claude uses this expertise. You can also explicitly invoke agents using `@workspace` with context.

### Step 6.1: Accessibility Auditor Agent

**Purpose:** Comprehensive WCAG 2.2 AA audits

**How to use - Open Copilot Chat and type:**

```
Audit this component for WCAG 2.2 AA accessibility:

<div class="card" onclick="showDetails()">
  <img src="product.jpg">
  <span style="color: #999">Product Name</span>
  <div class="price">$49.99</div>
</div>
```

**What you'll get:**

- ❌ **1.1.1 Non-text Content** - Image missing alt text
- ❌ **1.4.3 Contrast** - #999 text has 2.8:1 ratio (needs 4.5:1)
- ❌ **2.1.1 Keyboard** - onclick on div not keyboard accessible
- ❌ **4.1.2 Name, Role, Value** - Interactive element lacks proper role

Each issue includes severity, who's affected, and how to fix.

### Step 6.2: Accessibility Remediation Agent

**Purpose:** Fix specific accessibility issues with working code

**How to use:**

```
Fix these accessibility issues in my navigation:

Current code:
<div class="hamburger" onclick="toggle()">☰</div>
<div class="menu" style="display:none">
  <a href="/">Home</a>
  <a href="/about">About</a>
</div>

Issues:
1. Hamburger is not a button
2. No keyboard support
3. No ARIA attributes
4. No focus trap when open
```

**What you'll get:**

- Complete fixed code
- Explanation of each change
- Testing instructions

### Step 6.3: Content Accessibility Agent

**Purpose:** Review content for plain language and readability

**How to use:**

```
Review this content for the students page:

"The Office of Digital Accessibility is responsible for ensuring
that all university digital resources conform to applicable
accessibility standards and regulations. Students who experience
barriers accessing university digital content should utilize the
established remediation request workflow to effectuate resolution
of identified accessibility deficiencies."
```

**What you'll get:**

- Readability score (this is grade 16+ - too complex!)
- Plain language rewrite at grade 8 level
- Structure improvements
- Simpler word choices

### Step 6.4: Quick Prompts for Common Tasks

**Audit a specific file:**

```
@workspace Audit docs/faculty.html for WCAG 2.2 AA. List all issues by severity.
```

**Fix a component:**

```
@workspace Make this accordion keyboard accessible with proper ARIA:
[paste your code]
```

**Generate accessible component:**

```
@workspace Create an accessible dropdown menu that:
- Opens with Enter/Space
- Navigates with arrow keys
- Closes with Escape
- Traps focus when open
- Has proper ARIA
```

**Check color contrast:**

```
@workspace Check if these color combinations meet WCAG AA:
- Text #595959 on background #ffffff
- Link #AB0520 on background #f5f5f5
```

**Review PR for accessibility:**

```
@workspace Review the changes in this PR for accessibility issues.
Focus on keyboard navigation and screen reader compatibility.
```

---

## 7. GitHub Workflow

### Step 7.1: Before Creating a PR

```bash
# 1. Start the server
npm start

# 2. In another terminal, run accessibility audit
npm run audit

# 3. Run automated tests
npm run test:a11y

# 4. Fix any issues found

# 5. Commit your changes
git add .
git commit -m "a11y: description of your accessibility improvements"
```

### Step 7.2: Create a Pull Request

1. Push your branch:

   ```bash
   git push origin your-branch-name
   ```

2. Go to GitHub and click **"Create Pull Request"**

3. The PR template automatically fills with:

   - Accessibility checklist
   - Testing requirements
   - WCAG criteria section

4. **Complete all checklist items** before requesting review

### Step 7.3: Automated CI Checks

When you create a PR, GitHub Actions automatically runs:

1. **axe-core tests** on all key pages
2. **Lighthouse accessibility audit**
3. Posts results as a **comment on your PR**

If checks fail, click "Details" to see which tests failed.

### Step 7.4: Report an Accessibility Issue

1. Go to repository **Issues** tab
2. Click **"New Issue"**
3. Select **"Accessibility Issue"** template
4. Fill in:
   - **WCAG Criterion** (e.g., "1.4.3 Contrast")
   - **Severity** (Critical/Serious/Moderate/Minor)
   - **Who is affected** (Screen reader users, keyboard users, etc.)
   - **Steps to reproduce**
   - **Expected vs actual behavior**

---

## 8. GitHub Actions CI/CD

This section explains how to deploy the accessibility testing framework as a GitHub Action so tests run automatically in the cloud whenever code changes.

### Why Use GitHub Actions for Accessibility Testing?

| Benefit                    | Description                                |
| -------------------------- | ------------------------------------------ |
| **Automated Gating**       | Block merges if accessibility tests fail   |
| **Consistent Environment** | Same tests run on every PR, every time     |
| **No Local Setup Needed**  | Reviewers don't need local tools installed |
| **Historical Records**     | All test results are archived              |
| **Team Visibility**        | Everyone sees accessibility status on PRs  |

### Understanding the Workflow File

GitHub Actions use YAML files in `.github/workflows/`. Our accessibility workflow is at `.github/workflows/accessibility.yml`.

### Step 8.1: View the Existing Workflow

Open [.github/workflows/accessibility.yml](.github/workflows/accessibility.yml) to see the current configuration:

```yaml
name: Accessibility Testing

on:
  push:
    branches: [main]
    paths:
      - "docs/**"
      - "scripts/**"
      - "tests/**"
      - "*.html"
      - "package.json"
      - "playwright.a11y.config.js"
  pull_request:
    branches: [main]
  schedule:
    - cron: "0 6 * * 1" # Weekly on Monday at 6 AM UTC
  workflow_dispatch: # Manual trigger from Actions tab
```

**What this means:**

- **`name:`** - The workflow name that appears in GitHub's Actions tab
- **`on:`** - Triggers that start the workflow
- **`push:`** - Runs when code is pushed to main branch
- **`pull_request:`** - Runs when a PR targets main branch (always runs, not just on path changes)
- **`paths:`** - Only triggers push events when these files change (saves CI minutes)
- **`schedule:`** - Runs weekly to catch any regressions
- **`workflow_dispatch:`** - Allows manual triggering from the Actions tab

### Step 8.2: Understanding the Jobs

The workflow has one job called `accessibility-audit` with concurrency controls:

```yaml
# Cancel redundant runs when a new commit is pushed
concurrency:
  group: accessibility-${{ github.ref }}
  cancel-in-progress: true

# Minimum required permissions for security
permissions:
  contents: read
  pull-requests: write
  actions: read

jobs:
  accessibility-audit:
    runs-on: ubuntu-latest
    timeout-minutes: 20
    name: Accessibility Audit
```

**What this means:**

- **`runs-on: ubuntu-latest`** - Uses GitHub's free Ubuntu Linux runners
- **`timeout-minutes: 20`** - Prevents runaway jobs from consuming CI minutes
- **`concurrency`** - Cancels redundant runs when you push new commits quickly
- **`permissions`** - Limits what the workflow can access (security best practice)
- Each job runs in a fresh, isolated virtual machine

### Step 8.3: Understanding Each Step

#### Step 1: Checkout Code

```yaml
- name: Checkout repository
  uses: actions/checkout@v4
```

Downloads your repository code into the runner. Required for any workflow.

#### Step 2: Setup Node.js

```yaml
- name: Setup Node.js
  uses: actions/setup-node@v4
  with:
    node-version: "20"
    cache: "npm"
```

- Installs Node.js version 20
- **`cache: 'npm'`** - Caches `node_modules` for faster future runs

#### Step 3: Install Dependencies

```yaml
- name: Install dependencies
  run: npm ci
```

**`npm ci`** (clean install) is faster and more reliable than `npm install` for CI:

- Installs exact versions from `package-lock.json`
- Deletes `node_modules` first for clean slate

#### Step 4: Install Playwright Browsers

```yaml
- name: Cache Playwright browsers
  id: playwright-cache
  uses: actions/cache@v4
  with:
    path: ~/.cache/ms-playwright
    key: playwright-${{ runner.os }}-${{ hashFiles('package-lock.json') }}

- name: Install Playwright browsers
  if: steps.playwright-cache.outputs.cache-hit != 'true'
  run: npx playwright install --with-deps chromium
```

- **Caches Playwright browsers** to speed up future runs (saves ~1-2 minutes)
- Downloads Chromium browser for testing only if not already cached
- **`--with-deps`** - Also installs system dependencies (required on Linux)

#### Step 5: Start Local Server

```yaml
- name: Start server and wait for it
  run: |
    npx serve docs -p 3000 &
    npx wait-on http://localhost:3000 --timeout 30000
    echo "✅ Server is ready at http://localhost:3000"
```

- **`&`** - Runs server in background so workflow continues
- **`wait-on`** - Waits until server responds (more reliable than `sleep`)
- **`--timeout 30000`** - Fails after 30 seconds if server doesn't start

#### Step 6: Run Playwright Tests

```yaml
- name: Run Playwright accessibility tests
  id: playwright-tests
  run: npx playwright test --config=playwright.a11y.config.js
  continue-on-error: true
```

- Runs all accessibility tests using axe-core
- **`id: playwright-tests`** - Allows referencing this step's outcome later
- **`continue-on-error: true`** - Workflow continues even if tests fail (so we can upload reports and post comments)

#### Step 7: Run Lighthouse

```yaml
- name: Run Lighthouse accessibility audit
  id: lighthouse
  uses: treosh/lighthouse-ci-action@v11
  with:
    urls: |
      http://localhost:3000/home.html
      http://localhost:3000/roles.html
      http://localhost:3000/accessibility-101.html
      http://localhost:3000/students.html
      http://localhost:3000/faculty.html
      http://localhost:3000/developers.html
      http://localhost:3000/content-creators.html
      http://localhost:3000/support.html
    configPath: .github/lighthouse-config.json
    uploadArtifacts: true
  continue-on-error: true
```

- Runs Google Lighthouse accessibility audits on all key pages
- Uses configuration from `.github/lighthouse-config.json` (requires 90% score)
- Uploads detailed reports as artifacts

#### Step 8: Upload Reports

```yaml
- name: Upload Playwright report
  uses: actions/upload-artifact@v4
  if: always()
  with:
    name: playwright-report-${{ github.run_number }}
    path: playwright-report/
    retention-days: 30

- name: Upload Lighthouse report
  uses: actions/upload-artifact@v4
  if: always()
  with:
    name: lighthouse-report-${{ github.run_number }}
    path: .lighthouseci/
    retention-days: 30
```

- **`if: always()`** - Uploads even if tests failed
- **`retention-days: 30`** - Keeps reports for 30 days before auto-deletion
- **Unique names** with run number prevent artifact conflicts

#### Step 9: Comment on PR

```yaml
- name: Comment on PR with detailed results
  if: github.event_name == 'pull_request' && always()
  uses: actions/github-script@v7
```

- Only runs for pull requests
- Posts a detailed comment with:
  - Pass/fail status table for each test suite
  - Links to view the full workflow run
  - Manual testing checklist with checkboxes
- **Updates existing comment** instead of creating duplicates on each push

### Step 8.4: How to Trigger the Workflow

The workflow runs automatically when you:

1. **Push to main:**

   ```bash
   git push origin main
   ```

2. **Create or update a PR:**

   ```bash
   git push origin your-feature-branch
   # Then create PR on GitHub
   ```

3. **Manually from GitHub:**
   - Go to **Actions** tab
   - Select **"Accessibility Testing"** workflow
   - Click **"Run workflow"** button (if enabled)

### Step 8.5: Viewing Workflow Results

#### In the Actions Tab

1. Go to your repository on GitHub
2. Click the **"Actions"** tab
3. You'll see a list of all workflow runs
4. Click a run to see details

#### Understanding Status Icons

| Icon           | Meaning              |
| -------------- | -------------------- |
| 🟢 Green check | All tests passed     |
| 🔴 Red X       | Some tests failed    |
| 🟡 Yellow dot  | Workflow is running  |
| ⚪ Gray circle | Workflow was skipped |

#### Viewing Detailed Results

1. Click on a workflow run
2. Click on the **"accessibility-audit"** job
3. Expand each step to see output
4. Look for failed steps highlighted in red

### Step 8.6: Downloading Test Reports

After a workflow completes:

1. Go to the workflow run page
2. Scroll to **"Artifacts"** section at the bottom
3. Click **"accessibility-report"** to download
4. Extract the ZIP file
5. Open `playwright-report/index.html` in a browser

### Step 8.7: Understanding PR Check Status

When a workflow runs on a PR:

1. You'll see a **"Checks"** section on the PR page
2. Shows status: ✅ Passing, ❌ Failing, or 🟡 Pending
3. Click **"Details"** to see the full workflow

**Requiring checks to pass before merge:**

1. Go to **Settings** → **Branches**
2. Click **"Add rule"** (or edit existing rule)
3. Check **"Require status checks to pass before merging"**
4. Select **"Accessibility Audit"** from the list
5. Click **"Save changes"**

Now PRs cannot be merged until accessibility tests pass.

### Step 8.8: Customizing the Workflow

#### Adding More Pages to Test

Edit `.github/workflows/accessibility.yml`:

```yaml
- name: Run Lighthouse accessibility audit
  uses: treosh/lighthouse-ci-action@v11
  with:
    urls: |
      http://localhost:3000/home.html
      http://localhost:3000/roles.html
      http://localhost:3000/accessibility-101.html
      http://localhost:3000/faculty.html        # Add more URLs
      http://localhost:3000/students.html       # Add more URLs
      http://localhost:3000/developers.html     # Add more URLs
```

#### Setting Accessibility Score Thresholds

Edit `.github/lighthouse-config.json`:

```json
{
  "ci": {
    "assert": {
      "assertions": {
        "categories:accessibility": ["error", { "minScore": 0.9 }]
      }
    }
  }
}
```

This fails the build if accessibility score drops below 90%.

#### Adding Scheduled Runs

Add a schedule trigger to run tests automatically (e.g., nightly):

```yaml
on:
  push:
    branches: [main]
  pull_request:
    branches: [main]
  schedule:
    - cron: "0 6 * * *" # Runs daily at 6 AM UTC
```

Cron syntax: `minute hour day-of-month month day-of-week`

#### Running on Multiple Browsers

Edit `playwright.a11y.config.js` to test on multiple browsers:

```javascript
projects: [
  {
    name: 'chromium',
    use: { ...devices['Desktop Chrome'] },
  },
  {
    name: 'firefox',
    use: { ...devices['Desktop Firefox'] },
  },
  {
    name: 'webkit',
    use: { ...devices['Desktop Safari'] },
  },
],
```

And update the workflow to install all browsers:

```yaml
- name: Install Playwright browsers
  run: npx playwright install --with-deps
```

### Step 8.9: Creating a New Workflow from Scratch

If you need to create a brand new accessibility workflow:

**Step 1: Create the file**

```bash
mkdir -p .github/workflows
touch .github/workflows/my-a11y-tests.yml
```

**Step 2: Add basic structure**

```yaml
name: My Accessibility Tests

on:
  push:
    branches: [main]
  pull_request:
    branches: [main]

jobs:
  test:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4

      - uses: actions/setup-node@v4
        with:
          node-version: "20"
          cache: "npm"

      - run: npm ci

      - run: npx playwright install --with-deps chromium

      - name: Start server
        run: npx serve docs -p 3000 &

      - name: Wait for server
        run: npx wait-on http://localhost:3000 --timeout 30000

      - name: Run accessibility tests
        run: npx playwright test

      - uses: actions/upload-artifact@v4
        if: always()
        with:
          name: test-results
          path: playwright-report/
```

**Step 3: Commit and push**

```bash
git add .github/workflows/my-a11y-tests.yml
git commit -m "ci: Add accessibility testing workflow"
git push origin main
```

### Step 8.10: Debugging Failed Workflows

#### View Full Logs

1. Go to the failed workflow run
2. Click the failed job
3. Click on the failed step
4. Read the error message carefully

#### Common Errors and Fixes

**Error: "Can't find package.json"**

```
npm ERR! Could not read package.json
```

**Fix:** Ensure `actions/checkout@v4` is the first step.

---

**Error: "npx: command not found"**

```
/bin/bash: npx: command not found
```

**Fix:** Add the Node.js setup step before any npm/npx commands:

```yaml
- uses: actions/setup-node@v4
  with:
    node-version: "20"
```

---

**Error: "Cannot connect to server"**

```
Error: connect ECONNREFUSED 127.0.0.1:3000
```

**Fix:** Ensure server starts before tests run:

```yaml
- name: Start server
  run: npx serve docs -p 3000 &

- name: Wait for server
  run: npx wait-on http://localhost:3000 --timeout 30000
```

Install `wait-on` if needed: `npm install -D wait-on`

---

**Error: "Browser executable not found"**

```
Error: Executable doesn't exist at /home/runner/.cache/ms-playwright/chromium-XXX
```

**Fix:** Install Playwright browsers with system dependencies:

```yaml
- run: npx playwright install --with-deps chromium
```

---

**Error: "Permission denied"**

```
Error: EACCES: permission denied
```

**Fix:** Ensure you have write access to the repository. Check your `GITHUB_TOKEN` permissions if using custom actions.

### Step 8.11: Advanced: Adding Slack/Email Notifications

Get notified when accessibility tests fail:

#### Slack Notification

```yaml
- name: Notify Slack on failure
  if: failure()
  uses: slackapi/slack-github-action@v1.24.0
  with:
    channel-id: "YOUR-CHANNEL-ID"
    slack-message: |
      🚨 Accessibility tests failed!
      Repository: ${{ github.repository }}
      Branch: ${{ github.ref_name }}
      Commit: ${{ github.sha }}
      View: ${{ github.server_url }}/${{ github.repository }}/actions/runs/${{ github.run_id }}
  env:
    SLACK_BOT_TOKEN: ${{ secrets.SLACK_BOT_TOKEN }}
```

**Setup:**

1. Create a Slack App at https://api.slack.com/apps
2. Add OAuth scope: `chat:write`
3. Install app to your workspace
4. Copy Bot User OAuth Token
5. In GitHub repo: **Settings** → **Secrets** → **Actions** → **New secret**
6. Name: `SLACK_BOT_TOKEN`, Value: your token

#### Email Notification (via GitHub)

GitHub can email you automatically:

1. Go to your GitHub **Settings** (profile, not repo)
2. Click **Notifications**
3. Under "Actions", check **"Send notifications for failed workflows only"**

### Step 8.12: Advanced: Matrix Testing

Test across multiple configurations simultaneously:

```yaml
jobs:
  accessibility-test:
    runs-on: ubuntu-latest
    strategy:
      matrix:
        browser: [chromium, firefox, webkit]
        viewport: [desktop, mobile]
        include:
          - viewport: desktop
            width: 1280
            height: 720
          - viewport: mobile
            width: 375
            height: 667

    steps:
      - uses: actions/checkout@v4

      - uses: actions/setup-node@v4
        with:
          node-version: "20"

      - run: npm ci

      - run: npx playwright install --with-deps ${{ matrix.browser }}

      - name: Run tests
        run: |
          npx playwright test \
            --project=${{ matrix.browser }} \
            --viewport-size=${{ matrix.width }},${{ matrix.height }}
```

This creates 6 parallel test runs (3 browsers × 2 viewports).

### Step 8.13: Advanced: Caching for Faster Builds

Speed up workflows by caching dependencies:

```yaml
- name: Cache Playwright browsers
  uses: actions/cache@v4
  with:
    path: ~/.cache/ms-playwright
    key: playwright-${{ runner.os }}-${{ hashFiles('package-lock.json') }}
    restore-keys: |
      playwright-${{ runner.os }}-

- name: Install Playwright (if not cached)
  run: npx playwright install --with-deps chromium
```

### Step 8.14: Security Best Practices

#### Don't Expose Secrets

❌ **Never do this:**

```yaml
- run: echo "Token is ${{ secrets.GITHUB_TOKEN }}"
```

✅ **Do this instead:**

```yaml
- run: npm test
  env:
    API_KEY: ${{ secrets.API_KEY }}
```

#### Limit Token Permissions

Add permissions block to restrict what the workflow can do:

```yaml
permissions:
  contents: read # Read repository code
  pull-requests: write # Comment on PRs
  issues: write # Create issues
```

#### Pin Action Versions

Use specific versions instead of `@main`:

```yaml
# Good - pinned version
- uses: actions/checkout@v4.1.1

# Risky - could change unexpectedly
- uses: actions/checkout@main
```

### Step 8.15: Cost Considerations

GitHub Actions provides free minutes:

| Plan       | Free Minutes/Month |
| ---------- | ------------------ |
| Free       | 2,000 minutes      |
| Pro        | 3,000 minutes      |
| Team       | 3,000 minutes      |
| Enterprise | 50,000 minutes     |

**Tips to reduce usage:**

1. **Use path filters** - Only run on relevant file changes
2. **Cache dependencies** - Faster builds = fewer minutes
3. **Cancel redundant runs** - Add this to your workflow:
   ```yaml
   concurrency:
     group: ${{ github.workflow }}-${{ github.ref }}
     cancel-in-progress: true
   ```
4. **Run expensive tests only on PRs** - Not on every push

### Step 8.16: Complete Enhanced Workflow Example

Here's a production-ready workflow with all best practices:

```yaml
name: Accessibility Testing

on:
  push:
    branches: [main]
    paths:
      - "docs/**"
      - "scripts/**"
      - "*.html"
      - "tests/**"
  pull_request:
    branches: [main]
  schedule:
    - cron: "0 6 * * 1" # Weekly on Monday at 6 AM UTC

# Cancel redundant runs
concurrency:
  group: a11y-${{ github.ref }}
  cancel-in-progress: true

# Minimum required permissions
permissions:
  contents: read
  pull-requests: write

jobs:
  accessibility-audit:
    runs-on: ubuntu-latest
    timeout-minutes: 15
    name: Accessibility Audit

    steps:
      - name: Checkout repository
        uses: actions/checkout@v4

      - name: Setup Node.js
        uses: actions/setup-node@v4
        with:
          node-version: "20"
          cache: "npm"

      - name: Cache Playwright browsers
        id: playwright-cache
        uses: actions/cache@v4
        with:
          path: ~/.cache/ms-playwright
          key: playwright-${{ runner.os }}-${{ hashFiles('package-lock.json') }}

      - name: Install dependencies
        run: npm ci

      - name: Install Playwright browsers
        if: steps.playwright-cache.outputs.cache-hit != 'true'
        run: npx playwright install --with-deps chromium

      - name: Start server and wait
        run: |
          npx serve docs -p 3000 &
          npx wait-on http://localhost:3000 --timeout 30000

      - name: Run Playwright accessibility tests
        run: npx playwright test --config=playwright.a11y.config.js

      - name: Run Lighthouse audits
        uses: treosh/lighthouse-ci-action@v11
        with:
          urls: |
            http://localhost:3000/home.html
            http://localhost:3000/roles.html
            http://localhost:3000/accessibility-101.html
          configPath: .github/lighthouse-config.json
          uploadArtifacts: true

      - name: Upload test report
        uses: actions/upload-artifact@v4
        if: always()
        with:
          name: accessibility-report-${{ github.run_number }}
          path: |
            playwright-report/
            .lighthouseci/
          retention-days: 30

      - name: Post PR comment
        if: github.event_name == 'pull_request' && always()
        uses: actions/github-script@v7
        with:
          script: |
            const fs = require('fs');
            let status = '${{ job.status }}' === 'success' ? '✅' : '❌';
            let comment = `## ${status} Accessibility Audit Results\n\n`;

            if ('${{ job.status }}' === 'success') {
              comment += '🎉 All automated accessibility tests passed!\n\n';
            } else {
              comment += '⚠️ Some accessibility tests failed. Please review.\n\n';
            }

            comment += '### Artifacts\n';
            comment += `- [View Full Report](${context.serverUrl}/${context.repo.owner}/${context.repo.repo}/actions/runs/${context.runId})\n\n`;

            comment += '### Manual Testing Checklist\n';
            comment += 'Please verify before merge:\n';
            comment += '- [ ] Keyboard navigation works\n';
            comment += '- [ ] Screen reader announces content correctly\n';
            comment += '- [ ] Focus indicators are visible\n';
            comment += '- [ ] Color contrast meets requirements\n';
            comment += '- [ ] Content is readable at 200% zoom\n';

            github.rest.issues.createComment({
              issue_number: context.issue.number,
              owner: context.repo.owner,
              repo: context.repo.repo,
              body: comment
            });
```

### Step 8.17: Verifying Your Workflow Works

After setting up or modifying your workflow:

1. **Make a small change** to an HTML file
2. **Create a branch:**
   ```bash
   git checkout -b test-workflow
   ```
3. **Commit and push:**
   ```bash
   git add .
   git commit -m "test: Verify accessibility workflow"
   git push origin test-workflow
   ```
4. **Create a PR** on GitHub
5. **Watch the Actions tab** - you should see the workflow start
6. **Review the results** when it completes

### Step 8.18: Quick Reference - Workflow Commands

```bash
# View all workflow runs from CLI (requires GitHub CLI)
gh run list

# Watch a running workflow
gh run watch

# View specific run details
gh run view <run-id>

# Download artifacts from a run
gh run download <run-id>

# Manually trigger a workflow
gh workflow run accessibility.yml
```

Install GitHub CLI: https://cli.github.com/

---

## 9. Manual Testing Checklist

Automated tools catch 30-40% of issues. Always perform manual testing.

### Step 9.1: Keyboard Testing

| Test              | Keys                | Expected Result                         |
| ----------------- | ------------------- | --------------------------------------- |
| Navigate forward  | `Tab`               | Focus moves to next interactive element |
| Navigate backward | `Shift + Tab`       | Focus moves to previous element         |
| Activate button   | `Enter` or `Space`  | Button action triggers                  |
| Follow link       | `Enter`             | Page navigates                          |
| Skip link         | `Tab` (first press) | Skip link appears, is focused           |
| Use skip link     | `Enter`             | Focus jumps to main content             |
| Close modal       | `Escape`            | Modal closes, focus returns             |
| Menu items        | `Arrow keys`        | Navigate within menu                    |

**Test procedure:**

1. Put your mouse aside
2. Press Tab from the URL bar
3. Tab through the entire page
4. Verify you can reach and use everything

### Step 9.2: Screen Reader Testing

**NVDA on Windows (Free):**

1. Download: https://www.nvaccess.org/download/
2. Install and start NVDA
3. Open the site in Chrome or Firefox

| Keys            | Action                          |
| --------------- | ------------------------------- |
| `Insert + Down` | Read page from current position |
| `Tab`           | Next focusable element          |
| `H`             | Next heading                    |
| `D`             | Next landmark region            |
| `B`             | Next button                     |
| `K`             | Next link                       |
| `Insert + F7`   | Show all links                  |

**VoiceOver on Mac (Built-in):**

1. Enable: `Cmd + F5`
2. Open the site in Safari

| Keys           | Action                         |
| -------------- | ------------------------------ |
| `VO + A`       | Read all from current position |
| `VO + →`       | Next element                   |
| `VO + Cmd + H` | Next heading                   |
| `VO + Cmd + L` | Next link                      |
| `VO + U`       | Open rotor (element lists)     |

_VO = Control + Option_

### Step 9.3: Visual Testing

| Test             | How                               | Pass Criteria                         |
| ---------------- | --------------------------------- | ------------------------------------- |
| Focus indicators | Tab through page                  | Clear visible focus on every element  |
| Contrast         | Browser DevTools                  | 4.5:1 for text, 3:1 for UI            |
| Zoom 200%        | `Ctrl/Cmd + +` twice              | No horizontal scroll, content reflows |
| Zoom 400%        | Keep zooming                      | Still readable and usable             |
| High contrast    | Windows: Settings → High Contrast | All content visible                   |
| Dark mode        | OS dark mode setting              | All text readable                     |

---

## 10. NPM Scripts Reference

| Command                    | Description                                 |
| -------------------------- | ------------------------------------------- |
| `npm start`                | Start local server at http://localhost:3000 |
| `npm test`                 | Run all tests (alias for test:a11y)         |
| `npm run test:a11y`        | Run Playwright accessibility tests          |
| `npm run test:a11y:ui`     | Run tests with interactive UI               |
| `npm run test:a11y:report` | Open HTML test report in browser            |
| `npm run audit`            | Audit key pages with axe-core               |
| `npm run audit:all`        | Audit ALL HTML files                        |
| `npm run lighthouse`       | Run Lighthouse accessibility audit          |

---

## 11. Troubleshooting

### Problem: "Cannot connect to server"

**Solution:**

```bash
# Terminal 1: Start server
npm start

# Terminal 2: Run tests
npm run test:a11y
```

### Problem: Axe-linter extension not highlighting issues

**Solution:**

1. Check extension is installed:

   - `Ctrl+Shift+X` → Search "axe accessibility linter"
   - Should say "Installed"

2. Reload VS Code:

   - `Ctrl+Shift+P` → "Reload Window"

3. Check workspace settings loaded:
   - Open `.vscode/settings.json`
   - Should contain `"axe-linter.rules"`

### Problem: Playwright tests failing immediately

**Solution:**

```bash
# Reinstall Playwright browsers
npx playwright install chromium

# Verify installation
npx playwright --version
```

### Problem: MCP servers not available in chat

**Solution:**

1. Open Settings (`Ctrl+,`)
2. Search "mcp"
3. Ensure "Chat: Mcp Enabled" is checked
4. **Fully restart VS Code** (Quit → Reopen)
5. Wait 10-15 seconds for servers to initialize

### Problem: GitHub MCP server returns errors

**Solution:**

1. Verify token is set:
   ```bash
   echo $GITHUB_TOKEN
   ```
2. Token needs these scopes: `repo`, `read:org`
3. Regenerate token if expired

### Problem: Claude not using accessibility expertise

**Solution:** Be explicit in your prompt:

```
Following WCAG 2.2 AA and this project's accessibility standards,
audit this code for accessibility issues:
[your code]
```

---

## Quick Reference Card

```
┌─────────────────────────────────────────────────────────────────┐
│                  ACCESSIBILITY QUICK REFERENCE                   │
├─────────────────────────────────────────────────────────────────┤
│ SERVER                                                          │
│   npm start                 Start server at localhost:3000      │
├─────────────────────────────────────────────────────────────────┤
│ TESTING                                                         │
│   npm run audit             Audit key pages                     │
│   npm run audit:all         Audit all HTML files                │
│   npm run test:a11y         Run Playwright tests                │
│   npm run test:a11y:ui      Interactive test UI                 │
│   npm run lighthouse        Lighthouse audit                    │
├─────────────────────────────────────────────────────────────────┤
│ VS CODE SHORTCUTS                                               │
│   Ctrl+Shift+M              Problems panel (all issues)         │
│   Ctrl+Shift+I              Open Copilot Chat                   │
│   Ctrl+.                    Quick Fix                           │
│   Ctrl+Shift+P              Command palette                     │
├─────────────────────────────────────────────────────────────────┤
│ WCAG CONTRAST MINIMUMS                                          │
│   Normal text (<18px)       4.5:1 ratio                         │
│   Large text (≥18px bold)   3:1 ratio                           │
│   UI components             3:1 ratio                           │
├─────────────────────────────────────────────────────────────────┤
│ PROJECT COLOR VARIABLES                                         │
│   --ua-text                 #0C234B (body text)                 │
│   --ua-muted-text           #595959 (secondary text)            │
│   --ua-maroon               #AB0520 (links, focus)              │
│   --ua-background           #f5f5f5 (page background)           │
└─────────────────────────────────────────────────────────────────┘
```

---

## Resources

| Resource                 | URL                                                                         |
| ------------------------ | --------------------------------------------------------------------------- |
| WCAG 2.2 Quick Reference | https://www.w3.org/WAI/WCAG22/quickref/                                     |
| axe-core Rules           | https://github.com/dequelabs/axe-core/blob/develop/doc/rule-descriptions.md |
| Playwright A11y Testing  | https://playwright.dev/docs/accessibility-testing                           |
| WAI-ARIA Practices       | https://www.w3.org/WAI/ARIA/apg/                                            |
| WebAIM                   | https://webaim.org/                                                         |
| Deque University         | https://dequeuniversity.com/                                                |
| Color Contrast Checker   | https://webaim.org/resources/contrastchecker/                               |
