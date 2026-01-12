# Proposal: Automated Accessibility Checking for Arizona Quick Start

**Prepared for:** University of Arizona Digital Web Site Team
**Prepared by:** Accessibility at Arizona
**Date:** January 9, 2026
**Version:** 1.0

---

## Executive Summary

This proposal recommends implementing automated accessibility checking as part of the Arizona Quick Start code check-in process using GitHub Actions. By integrating accessibility validation into the CI/CD pipeline, the University of Arizona can:

- **Prevent accessibility regressions** before they reach production
- **Reduce remediation costs** by catching issues early in development
- **Ensure WCAG 2.2 AA compliance** across all web properties
- **Support the university's commitment** to digital accessibility

This solution leverages open-source tools and requires no additional licensing costs beyond existing GitHub infrastructure.

---

## Table of Contents

1. [Problem Statement](#problem-statement)
2. [Proposed Solution](#proposed-solution)
3. [Technical Implementation](#technical-implementation)
4. [Tool Selection](#tool-selection)
5. [Workflow Configuration](#workflow-configuration)
6. [Implementation Phases](#implementation-phases)
7. [Resource Requirements](#resource-requirements)
8. [Success Metrics](#success-metrics)
9. [Limitations & Considerations](#limitations--considerations)
10. [Appendices](#appendices)

---

## Problem Statement

### Current Challenges

1. **Reactive Accessibility Fixes**: Accessibility issues are often discovered after deployment, requiring costly remediation
2. **Inconsistent Testing**: Manual accessibility testing is time-consuming and may be skipped under deadline pressure
3. **Knowledge Gaps**: Not all developers are accessibility experts, leading to unintentional barriers
4. **Scale**: With multiple web properties and frequent updates, manual review cannot keep pace
5. **Compliance Risk**: WCAG 2.2 AA compliance is required; violations expose the university to legal and reputational risk

### Cost of Late Detection

| Stage                             | Relative Cost to Fix |
| --------------------------------- | -------------------- |
| During development                | 1x                   |
| During code review                | 5x                   |
| After deployment                  | 10x                  |
| After user complaint/legal action | 100x+                |

**Automated checking at code check-in catches issues at the lowest-cost stage.**

---

## Proposed Solution

### Overview

Implement a GitHub Actions workflow that automatically runs accessibility checks on every pull request and merge to protected branches. The workflow will:

1. **Block merges** when critical accessibility violations are detected
2. **Generate reports** with specific remediation guidance
3. **Track trends** over time to measure improvement
4. **Integrate seamlessly** with existing Arizona Quick Start development workflows

### Architecture

```
┌─────────────────────────────────────────────────────────────────┐
│                     Developer Workflow                          │
├─────────────────────────────────────────────────────────────────┤
│                                                                 │
│   [Code Change] → [Push/PR] → [GitHub Actions Triggered]        │
│                                    │                            │
│                    ┌───────────────┼───────────────┐            │
│                    ▼               ▼               ▼            │
│              [axe-core]      [Lighthouse]     [Pa11y]           │
│                    │               │               │            │
│                    └───────────────┼───────────────┘            │
│                                    ▼                            │
│                         [Combined Report]                       │
│                                    │                            │
│                    ┌───────────────┼───────────────┐            │
│                    ▼               ▼               ▼            │
│               [Pass: ✅]    [Warning: ⚠️]    [Fail: ❌]          │
│               [Merge OK]    [Review Req]    [Block Merge]       │
│                                                                 │
└─────────────────────────────────────────────────────────────────┘
```

---

## Technical Implementation

### Prerequisites

- GitHub repository with Actions enabled
- Node.js environment (standard for most web projects)
- Protected branch rules configured

### Core Components

#### 1. Accessibility Testing Engine

We recommend a multi-tool approach for comprehensive coverage:

| Tool              | Purpose                     | Strengths                                                      |
| ----------------- | --------------------------- | -------------------------------------------------------------- |
| **axe-core**      | Automated WCAG testing      | Industry standard, zero false positives, extensive rule set    |
| **Lighthouse CI** | Performance + accessibility | Google-backed, familiar to developers, includes best practices |
| **Pa11y**         | HTML validation + WCAG      | Excellent for catching HTML structure issues                   |

#### 2. Test Execution Strategy

```yaml
# Parallel execution for speed
jobs:
  axe-scan:
    runs-on: ubuntu-latest
    # Scans rendered pages with axe-core

  lighthouse-audit:
    runs-on: ubuntu-latest
    # Runs Lighthouse accessibility audit

  html-validation:
    runs-on: ubuntu-latest
    # Validates HTML structure and ARIA usage

  report-aggregation:
    needs: [axe-scan, lighthouse-audit, html-validation]
    # Combines results and determines pass/fail
```

#### 3. Severity Classification

| Severity     | Action      | Examples                                                   |
| ------------ | ----------- | ---------------------------------------------------------- |
| **Critical** | Block merge | Missing alt text, no keyboard access, color contrast < 3:1 |
| **Serious**  | Block merge | Improper heading hierarchy, missing form labels            |
| **Moderate** | Warning     | Redundant ARIA, suboptimal link text                       |
| **Minor**    | Info only   | Best practice suggestions                                  |

---

## Tool Selection

### Primary: axe-core

**Why axe-core?**

- **Zero false positives** by design (Deque's guarantee)
- **WCAG 2.2 AA coverage** out of the box
- **Extensive documentation** and community support
- **Free and open source** (MPL-2.0 license)
- **Integration options**: CLI, Node.js API, browser extensions

**Installation:**

```bash
npm install @axe-core/cli axe-core --save-dev
```

### Secondary: Lighthouse CI

**Why Lighthouse?**

- **Familiar to developers** (Chrome DevTools integration)
- **Comprehensive audits** beyond accessibility
- **Historical tracking** with Lighthouse CI Server
- **GitHub integration** with status checks and comments

**Installation:**

```bash
npm install @lhci/cli --save-dev
```

### Tertiary: Pa11y

**Why Pa11y?**

- **HTML validation** that other tools miss
- **Configurable runners** (axe, htmlcs)
- **CI-friendly output** formats
- **Threshold configuration** for gradual adoption

**Installation:**

```bash
npm install pa11y pa11y-ci --save-dev
```

---

## Workflow Configuration

### Complete GitHub Actions Workflow

Create `.github/workflows/accessibility.yml`:

```yaml
name: Accessibility Checks

on:
  pull_request:
    branches: [main, develop]
  push:
    branches: [main]

env:
  NODE_VERSION: "20"
  BASE_URL: "http://localhost:3000"

jobs:
  # ============================================
  # Build and serve the site for testing
  # ============================================
  build:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4

      - name: Setup Node.js
        uses: actions/setup-node@v4
        with:
          node-version: ${{ env.NODE_VERSION }}
          cache: "npm"

      - name: Install dependencies
        run: npm ci

      - name: Build site
        run: npm run build

      - name: Upload build artifact
        uses: actions/upload-artifact@v4
        with:
          name: site-build
          path: dist/
          retention-days: 1

  # ============================================
  # axe-core accessibility scan
  # ============================================
  axe-scan:
    needs: build
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4

      - name: Setup Node.js
        uses: actions/setup-node@v4
        with:
          node-version: ${{ env.NODE_VERSION }}
          cache: "npm"

      - name: Download build artifact
        uses: actions/download-artifact@v4
        with:
          name: site-build
          path: dist/

      - name: Install dependencies
        run: npm ci

      - name: Start server
        run: npx serve dist -l 3000 &

      - name: Wait for server
        run: npx wait-on ${{ env.BASE_URL }}

      - name: Run axe-core scan
        run: |
          npx @axe-core/cli ${{ env.BASE_URL }} \
            --tags wcag2a,wcag2aa,wcag21a,wcag21aa,wcag22aa \
            --save axe-results.json \
            --exit
        continue-on-error: true

      - name: Upload axe results
        uses: actions/upload-artifact@v4
        with:
          name: axe-results
          path: axe-results.json

      - name: Check for critical violations
        run: |
          node -e "
            const results = require('./axe-results.json');
            const critical = results.violations?.filter(v =>
              v.impact === 'critical' || v.impact === 'serious'
            ) || [];
            if (critical.length > 0) {
              console.log('❌ Critical accessibility violations found:');
              critical.forEach(v => {
                console.log(\`  - \${v.id}: \${v.description} (\${v.impact})\`);
                console.log(\`    Help: \${v.helpUrl}\`);
              });
              process.exit(1);
            }
            console.log('✅ No critical accessibility violations');
          "

  # ============================================
  # Lighthouse accessibility audit
  # ============================================
  lighthouse-audit:
    needs: build
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4

      - name: Setup Node.js
        uses: actions/setup-node@v4
        with:
          node-version: ${{ env.NODE_VERSION }}
          cache: "npm"

      - name: Download build artifact
        uses: actions/download-artifact@v4
        with:
          name: site-build
          path: dist/

      - name: Install dependencies
        run: npm ci

      - name: Start server
        run: npx serve dist -l 3000 &

      - name: Wait for server
        run: npx wait-on ${{ env.BASE_URL }}

      - name: Run Lighthouse CI
        run: |
          npx lhci autorun \
            --collect.url=${{ env.BASE_URL }} \
            --collect.numberOfRuns=1 \
            --assert.preset=lighthouse:recommended \
            --assert.assertions.categories:accessibility=error \
            --assert.assertions.categories:accessibility.minScore=0.9
        env:
          LHCI_GITHUB_APP_TOKEN: ${{ secrets.LHCI_GITHUB_APP_TOKEN }}

      - name: Upload Lighthouse results
        uses: actions/upload-artifact@v4
        with:
          name: lighthouse-results
          path: .lighthouseci/

  # ============================================
  # Pa11y HTML validation
  # ============================================
  pa11y-scan:
    needs: build
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4

      - name: Setup Node.js
        uses: actions/setup-node@v4
        with:
          node-version: ${{ env.NODE_VERSION }}
          cache: "npm"

      - name: Download build artifact
        uses: actions/download-artifact@v4
        with:
          name: site-build
          path: dist/

      - name: Install dependencies
        run: npm ci

      - name: Start server
        run: npx serve dist -l 3000 &

      - name: Wait for server
        run: npx wait-on ${{ env.BASE_URL }}

      - name: Run Pa11y CI
        run: |
          npx pa11y-ci \
            --config .pa11yci.json \
            --json > pa11y-results.json
        continue-on-error: true

      - name: Upload Pa11y results
        uses: actions/upload-artifact@v4
        with:
          name: pa11y-results
          path: pa11y-results.json

      - name: Check Pa11y results
        run: |
          node -e "
            const results = require('./pa11y-results.json');
            const errors = results.total || 0;
            if (errors > 0) {
              console.log(\`❌ Pa11y found \${errors} issues\`);
              process.exit(1);
            }
            console.log('✅ Pa11y validation passed');
          "

  # ============================================
  # Aggregate results and report
  # ============================================
  report:
    needs: [axe-scan, lighthouse-audit, pa11y-scan]
    runs-on: ubuntu-latest
    if: always()
    steps:
      - uses: actions/checkout@v4

      - name: Download all results
        uses: actions/download-artifact@v4
        with:
          path: results/

      - name: Generate summary report
        run: |
          echo "## 🔍 Accessibility Check Results" >> $GITHUB_STEP_SUMMARY
          echo "" >> $GITHUB_STEP_SUMMARY

          echo "| Tool | Status |" >> $GITHUB_STEP_SUMMARY
          echo "|------|--------|" >> $GITHUB_STEP_SUMMARY

          # Check axe results
          if [ -f results/axe-results/axe-results.json ]; then
            echo "| axe-core | ✅ Completed |" >> $GITHUB_STEP_SUMMARY
          else
            echo "| axe-core | ⚠️ No results |" >> $GITHUB_STEP_SUMMARY
          fi

          # Check Lighthouse results
          if [ -d results/lighthouse-results ]; then
            echo "| Lighthouse | ✅ Completed |" >> $GITHUB_STEP_SUMMARY
          else
            echo "| Lighthouse | ⚠️ No results |" >> $GITHUB_STEP_SUMMARY
          fi

          # Check Pa11y results
          if [ -f results/pa11y-results/pa11y-results.json ]; then
            echo "| Pa11y | ✅ Completed |" >> $GITHUB_STEP_SUMMARY
          else
            echo "| Pa11y | ⚠️ No results |" >> $GITHUB_STEP_SUMMARY
          fi

          echo "" >> $GITHUB_STEP_SUMMARY
          echo "📚 [WCAG 2.2 Guidelines](https://www.w3.org/TR/WCAG22/)" >> $GITHUB_STEP_SUMMARY
          echo "" >> $GITHUB_STEP_SUMMARY
          echo "🛠️ [Remediation Guide](https://accesswatch.github.io/azaccess/)" >> $GITHUB_STEP_SUMMARY

      - name: Post PR comment
        if: github.event_name == 'pull_request'
        uses: actions/github-script@v7
        with:
          script: |
            const fs = require('fs');

            let comment = '## 🔍 Accessibility Check Results\n\n';

            // Read axe results if available
            try {
              const axeResults = JSON.parse(
                fs.readFileSync('results/axe-results/axe-results.json', 'utf8')
              );
              const violations = axeResults.violations || [];
              const critical = violations.filter(v =>
                v.impact === 'critical' || v.impact === 'serious'
              );

              if (critical.length > 0) {
                comment += `### ❌ ${critical.length} Critical/Serious Violations\n\n`;
                critical.forEach(v => {
                  comment += `- **${v.id}**: ${v.description}\n`;
                  comment += `  - Impact: ${v.impact}\n`;
                  comment += `  - [How to fix](${v.helpUrl})\n\n`;
                });
              } else {
                comment += '### ✅ No critical accessibility violations\n\n';
              }
            } catch (e) {
              comment += '### ⚠️ axe-core results not available\n\n';
            }

            comment += '---\n';
            comment += '📚 [WCAG 2.2 Guidelines](https://www.w3.org/TR/WCAG22/) | ';
            comment += '🛠️ [Remediation Guide](https://accesswatch.github.io/azaccess/)';

            github.rest.issues.createComment({
              issue_number: context.issue.number,
              owner: context.repo.owner,
              repo: context.repo.repo,
              body: comment
            });
```

### Pa11y Configuration File

Create `.pa11yci.json`:

```json
{
  "defaults": {
    "timeout": 30000,
    "wait": 1000,
    "standard": "WCAG2AA",
    "runners": ["axe", "htmlcs"],
    "chromeLaunchConfig": {
      "args": ["--no-sandbox", "--disable-setuid-sandbox"]
    },
    "hideElements": ".skip-a11y-test"
  },
  "urls": [
    "http://localhost:3000/",
    "http://localhost:3000/about/",
    "http://localhost:3000/contact/"
  ],
  "threshold": 0
}
```

### Lighthouse Configuration

Create `lighthouserc.js`:

```javascript
module.exports = {
  ci: {
    collect: {
      numberOfRuns: 1,
      settings: {
        onlyCategories: ["accessibility"],
        skipAudits: ["uses-long-cache-ttl"],
      },
    },
    assert: {
      assertions: {
        "categories:accessibility": ["error", { minScore: 0.9 }],
        "color-contrast": "error",
        "document-title": "error",
        "html-has-lang": "error",
        "image-alt": "error",
        "link-name": "error",
        "meta-viewport": "error",
      },
    },
    upload: {
      target: "temporary-public-storage",
    },
  },
};
```

---

## Implementation Phases

### Phase 1: Foundation (Weeks 1-2)

**Goal:** Basic accessibility checking on PRs

| Task                                          | Owner              | Duration |
| --------------------------------------------- | ------------------ | -------- |
| Install axe-core and configure basic workflow | Dev Team           | 2 days   |
| Configure protected branch rules              | DevOps             | 1 day    |
| Create initial page list for scanning         | QA                 | 1 day    |
| Test workflow on non-critical repository      | Dev Team           | 3 days   |
| Documentation and team training               | Accessibility Lead | 2 days   |

**Deliverables:**

- Working GitHub Action that runs axe-core on PRs
- Basic pass/fail status check
- Team trained on interpreting results

### Phase 2: Enhanced Scanning (Weeks 3-4)

**Goal:** Comprehensive multi-tool scanning

| Task                               | Owner              | Duration |
| ---------------------------------- | ------------------ | -------- |
| Add Lighthouse CI integration      | Dev Team           | 2 days   |
| Add Pa11y for HTML validation      | Dev Team           | 2 days   |
| Configure severity thresholds      | Accessibility Lead | 1 day    |
| Implement PR commenting            | Dev Team           | 1 day    |
| Create developer remediation guide | Accessibility Lead | 2 days   |

**Deliverables:**

- Three-tool scanning pipeline
- Automated PR comments with remediation links
- Developer quick-reference guide

### Phase 3: Optimization (Weeks 5-6)

**Goal:** Performance and coverage optimization

| Task                                        | Owner    | Duration |
| ------------------------------------------- | -------- | -------- |
| Optimize scan performance (parallelization) | Dev Team | 2 days   |
| Expand page coverage                        | QA       | 2 days   |
| Configure historical tracking               | DevOps   | 2 days   |
| Create accessibility dashboard              | Dev Team | 2 days   |

**Deliverables:**

- Sub-5-minute scan times
- 100% page coverage
- Trend visualization dashboard

### Phase 4: Rollout (Weeks 7-8)

**Goal:** Production deployment across Arizona Quick Start

| Task                                | Owner              | Duration |
| ----------------------------------- | ------------------ | -------- |
| Pilot with low-risk repositories    | Dev Team           | 3 days   |
| Gradual rollout to all repositories | DevOps             | 3 days   |
| Monitor and adjust thresholds       | Accessibility Lead | Ongoing  |
| Document lessons learned            | All                | 2 days   |

**Deliverables:**

- All Arizona Quick Start repositories protected
- Operational runbook
- Lessons learned document

---

## Resource Requirements

### Personnel

| Role               | Time Commitment | Duration |
| ------------------ | --------------- | -------- |
| DevOps Engineer    | 20%             | 8 weeks  |
| Frontend Developer | 30%             | 8 weeks  |
| Accessibility Lead | 25%             | 8 weeks  |
| QA Engineer        | 15%             | 8 weeks  |

### Infrastructure

| Resource       | Cost     | Notes                                    |
| -------------- | -------- | ---------------------------------------- |
| GitHub Actions | Included | Already available with GitHub Enterprise |
| axe-core       | Free     | Open source (MPL-2.0)                    |
| Lighthouse CI  | Free     | Open source                              |
| Pa11y          | Free     | Open source (LGPL-3.0)                   |
| **Total**      | **$0**   | No additional licensing required         |

### Estimated Total Effort

- **Initial Setup:** 80-100 hours
- **Ongoing Maintenance:** 4-8 hours/month
- **Developer Training:** 2 hours per developer (one-time)

---

## Success Metrics

### Key Performance Indicators (KPIs)

| Metric                           | Baseline | Target (6 months) | Target (12 months)        |
| -------------------------------- | -------- | ----------------- | ------------------------- |
| Critical violations per PR       | TBD      | -50%              | -90%                      |
| Average remediation time         | TBD      | -30%              | -60%                      |
| PRs blocked for accessibility    | 0%       | 100% (critical)   | 100% (critical + serious) |
| Accessibility score (Lighthouse) | TBD      | 90+               | 95+                       |
| Developer awareness (survey)     | TBD      | 70%               | 90%                       |

### Reporting Cadence

- **Weekly:** Automated report of blocked PRs and common violations
- **Monthly:** Trend analysis and top 10 recurring issues
- **Quarterly:** Executive summary with KPI progress

---

## Limitations & Considerations

### Technical Limitations

#### No GitHub Copilot Available

Since the organization does not have a GitHub Copilot plan, the following alternatives are recommended:

| Copilot Feature  | Alternative                                  |
| ---------------- | -------------------------------------------- |
| Code suggestions | axe DevTools browser extension + IDE linting |
| Fix generation   | Links to WCAG documentation in PR comments   |
| Inline guidance  | Pre-commit hooks with eslint-plugin-jsx-a11y |

**Recommended Developer Tools (No Copilot Required):**

1. **axe DevTools Browser Extension** (Free)

   - Real-time accessibility checking while developing
   - Intelligent guided tests
   - One-click issue highlighting

2. **eslint-plugin-jsx-a11y** (Free)

   - Catches accessibility issues in JSX/React code
   - IDE integration for real-time feedback
   - Configurable rules

3. **Accessibility Insights for Web** (Free, Microsoft)

   - Tab stops visualization
   - Color contrast checker
   - Automated + manual testing guidance

4. **VS Code Extensions:**
   - axe Accessibility Linter
   - Web Accessibility
   - Webhint

### Scanning Limitations

| Limitation                            | Mitigation                                                                   |
| ------------------------------------- | ---------------------------------------------------------------------------- |
| **Cannot detect all issues**          | Automated tools catch ~30-40% of WCAG issues; supplement with manual testing |
| **False negatives possible**          | Use multiple tools; require periodic manual audits                           |
| **Dynamic content challenges**        | Configure wait times; use authenticated scanning for SPAs                    |
| **Third-party component blind spots** | Audit component libraries separately                                         |

### Organizational Considerations

1. **Developer Training Required**: Budget time for team education
2. **Initial Slowdown Expected**: First PRs may take longer as developers learn
3. **Threshold Tuning Needed**: Start permissive, tighten over time
4. **Exception Process Required**: Define workflow for legitimate exceptions

---

## Appendices

### Appendix A: WCAG 2.2 AA Checklist (Automated Coverage)

| Guideline | Criterion              | axe-core | Lighthouse | Pa11y |
| --------- | ---------------------- | -------- | ---------- | ----- |
| 1.1.1     | Non-text Content       | ✅       | ✅         | ✅    |
| 1.3.1     | Info and Relationships | ✅       | ✅         | ✅    |
| 1.4.3     | Contrast (Minimum)     | ✅       | ✅         | ✅    |
| 1.4.11    | Non-text Contrast      | ✅       | ⚠️         | ⚠️    |
| 2.1.1     | Keyboard               | ✅       | ✅         | ✅    |
| 2.4.1     | Bypass Blocks          | ✅       | ✅         | ✅    |
| 2.4.4     | Link Purpose           | ✅       | ✅         | ✅    |
| 2.4.6     | Headings and Labels    | ✅       | ✅         | ✅    |
| 3.1.1     | Language of Page       | ✅       | ✅         | ✅    |
| 4.1.1     | Parsing                | ✅       | ⚠️         | ✅    |
| 4.1.2     | Name, Role, Value      | ✅       | ✅         | ✅    |

✅ = Full coverage | ⚠️ = Partial coverage | ❌ = Manual only

### Appendix B: Sample PR Comment Output

```markdown
## 🔍 Accessibility Check Results

### ❌ 2 Critical/Serious Violations

- **image-alt**: Images must have alternate text

  - Impact: critical
  - [How to fix](https://dequeuniversity.com/rules/axe/4.8/image-alt)

- **color-contrast**: Elements must meet minimum color contrast ratio thresholds
  - Impact: serious
  - [How to fix](https://dequeuniversity.com/rules/axe/4.8/color-contrast)

### ⚠️ 3 Moderate Issues (Non-blocking)

- **region**: All page content should be contained by landmarks
- **link-in-text-block**: Links must be distinguishable without relying on color
- **heading-order**: Heading levels should only increase by one

---

📚 [WCAG 2.2 Guidelines](https://www.w3.org/TR/WCAG22/) | 🛠️ [Remediation Guide](https://accesswatch.github.io/azaccess/)
```

### Appendix C: Exception Request Template

```markdown
## Accessibility Exception Request

**Repository:** [repo-name]
**PR Number:** #123
**Requested by:** @username
**Date:** YYYY-MM-DD

### Violation Details

- **Rule ID:** image-alt
- **Impact:** critical
- **Element:** `<img src="decorative.png">`

### Justification

[Explain why this exception is necessary]

### Mitigation

[Describe alternative accessibility measures taken]

### Expiration

- [ ] Permanent exception (requires Director approval)
- [x] Temporary exception until: YYYY-MM-DD

### Approvals

- [ ] Accessibility Lead
- [ ] Engineering Manager
- [ ] Director (if permanent)
```

### Appendix D: Quick Start Commands

```bash
# Install dependencies
npm install --save-dev @axe-core/cli @lhci/cli pa11y-ci

# Run local accessibility scan
npx @axe-core/cli http://localhost:3000 --tags wcag2aa

# Run Lighthouse audit
npx lhci autorun

# Run Pa11y scan
npx pa11y-ci

# Run all checks (add to package.json scripts)
npm run a11y:check
```

### Appendix E: Useful Resources

- [axe-core Documentation](https://www.deque.com/axe/core-documentation/)
- [Lighthouse CI Documentation](https://github.com/GoogleChrome/lighthouse-ci)
- [Pa11y Documentation](https://pa11y.org/)
- [WCAG 2.2 Quick Reference](https://www.w3.org/WAI/WCAG22/quickref/)
- [WebAIM Contrast Checker](https://webaim.org/resources/contrastchecker/)
- [Accessibility at Arizona](https://accesswatch.github.io/azaccess/)

---

## Contact & Support

For questions about this proposal or accessibility implementation:

- **Accessibility at Arizona:** accessibility@arizona.edu
- **Technical Support:** [Create an issue](https://github.com/accesswatch/azaccess/issues)
- **Documentation:** [https://accesswatch.github.io/azaccess/](https://accesswatch.github.io/azaccess/)

---

_© 2026 The Arizona Board of Regents on behalf of The University of Arizona_
