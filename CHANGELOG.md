# Changelog

All notable changes to the Accessibility at Arizona site will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.1.0/).

---

## [Unreleased]

---

## [2026-01-09] - Navigation Overhaul & Accessibility Improvements

### Added - Project Infrastructure for Accessibility

#### Documentation

- **`ACCESSIBILITY-DEVELOPMENT-GUIDE.md`**: Comprehensive guide for using all accessibility tools, MCP servers, agents, and testing workflows (moved to root)
- **`vscode-terminal-accessibility.md`**: VS Code terminal accessibility guide (moved to root)
- **`ACCESSIBILITY-CI-PROPOSAL.md`**: Proposal for implementing automated accessibility checking in Arizona Quick Start via GitHub Actions (designed for orgs without GitHub Copilot)

#### GitHub Configuration

- **`.github/copilot-instructions.md`**: Custom GitHub Copilot instructions for accessibility-first code generation
- **`.github/CONTRIBUTING.md`**: Contribution guidelines with accessibility requirements
- **`.github/PULL_REQUEST_TEMPLATE.md`**: PR template with accessibility checklist
- **`.github/ISSUE_TEMPLATE/accessibility-issue.md`**: Issue template for reporting accessibility barriers
- **`.github/ISSUE_TEMPLATE/feature-request.md`**: Feature request template with accessibility considerations

#### Agents

- **`.github/agents/accessibility-auditor.md`**: Agent for comprehensive WCAG 2.2 AA audits
- **`.github/agents/accessibility-remediation.md`**: Agent for fixing accessibility issues
- **`.github/agents/content-accessibility.md`**: Agent for plain language and content accessibility

#### MCP Server Configuration

- **`.vscode/mcp-servers.json`**: MCP servers configured:
  - **Playwright**: Browser automation for accessibility testing
  - **GitHub**: Issues and PR integration
  - **Firecrawl**: Web scraping for external site audits
  - **Memory**: Knowledge graph for accessibility patterns
  - **Context7**: Library documentation for ARIA and accessibility APIs
- **`.vscode/extensions.json`**: Recommended VS Code extensions for accessibility development
- **`.vscode/settings.json`**: Project settings with axe-linter WCAG 2.2 rules

#### Automated Testing & Auditing

- **`.github/workflows/accessibility.yml`**: GitHub Actions workflow for CI/CD accessibility testing
- **`.github/lighthouse-config.json`**: Lighthouse CI configuration with WCAG assertions
- **`playwright.a11y.config.js`**: Playwright configuration for accessibility tests
- **`tests/accessibility/wcag.spec.js`**: Comprehensive WCAG 2.2 AA test suite with axe-core
- **`scripts/axe-audit.js`**: Node.js script for command-line accessibility audits with HTML reporting

#### NPM Scripts

- `npm start` - Start local server on port 3000
- `npm run audit` - Run axe-core audit on key pages
- `npm run audit:all` - Audit all HTML files
- `npm run test:a11y` - Run Playwright accessibility tests
- `npm run test:a11y:ui` - Interactive test UI
- `npm run lighthouse` - Run Lighthouse accessibility audit

### Fixed - Hamburger Menu Accessibility

Improved mobile navigation accessibility in `scripts/header.js`:

#### Keyboard & Screen Reader Improvements

- **Added `aria-label` to hamburger button**: "Open navigation menu" / "Close navigation menu" (toggles dynamically)
- **Added `id="primary-nav"` to nav element**: Now properly referenced by `aria-controls`
- **Added `aria-hidden` management**: Nav sections hidden from screen readers when collapsed on mobile
- **Role selector now included in focus trap**: Select and button elements in `.role-selector` are now focusable
- **Improved focusable element selector**: Now includes `select` and `input` elements
- **Added resize handler**: `aria-hidden` state updates when viewport changes

#### HTML Updates (all pages)

- Button: Added `aria-label="Open navigation menu"`
- Nav: Added `id="primary-nav"` and improved `aria-label="Primary navigation"`

### Changed - Navigation Structure (Based on NNG Research)

Implemented recommendations from Nielsen Norman Group's ["Audience-Based Navigation: 5 Reasons to Avoid It"](https://www.nngroup.com/articles/audience-based-navigation/) article.

#### Primary Navigation Restructure

- **Moved task-based navigation to primary position**: Documents & Media, Web & Apps, Teaching & Learning, Procurement, Tools & Checklists now appear first
- **Demoted "Guides by Role" to utility navigation**: Role-based navigation is now secondary, reducing cognitive load
- **Removed "I Am A..." from primary nav**: Users no longer need to self-identify before accessing content

#### Audience Labels Updated to "For [Audience]" Pattern

| Before                     | After                            |
| -------------------------- | -------------------------------- |
| Student or Family Member   | For Students & Families          |
| Faculty or Instructor      | For Faculty & Instructors        |
| Staff Member               | For Staff Members                |
| Developer                  | For Developers & Technical Teams |
| Mobile App Team            | For Mobile Developers            |
| Content Creator            | For Content & Communications     |
| Communications / Marketing | For Communications Teams         |
| Leadership / Executive     | For Leaders & Executives         |
| Visitor / Community        | For Visitors & Community         |

#### Persona Consolidation

- Merged "Developer" + "Mobile App Team" → **For Developers & Technical Teams**
- Merged "Content Creator" + "Communications / Marketing" → **For Content & Communications**
- Reduced from 9 audience options to 7 mutually exclusive categories

#### Role Selector Updates

- Label changed: "I am a..." → "Find resources for..."
- Placeholder changed: "Choose your role" → "Select an audience..."
- Added CSS styling to make selector visually secondary
- Selector now collapses into mobile menu

#### URL Simplification

- `persona-students.html` → `students.html`
- `persona-faculty.html` → `faculty.html`
- `persona-staff.html` → `staff.html`
- `persona-developers.html` → `developers.html`
- `persona-mobile.html` → `mobile.html`
- `persona-content.html` → `content-creators.html`
- `persona-comms.html` → `communications.html`
- `persona-leadership.html` → `leadership.html`
- `persona-public.html` → `visitors.html`

### Changed - Color Contrast Improvements (WCAG 2.1 AA Compliance)

#### Muted Text Colors

- Added CSS variables for accessible muted text:
  - `--ua-muted-text: #595959` (7:1 contrast ratio on white)
  - `--ua-muted-text-light: #767676` (4.5:1 minimum for small text)
- Updated all `#666` text to `#595959` across site
- Updated all `#777` text to `#595959`
- Updated all `#555` text to `#595959`

#### Files Updated for Contrast

- `index.html` - `.muted` and `.lead` classes
- `home.html` - Banner "or" text opacity (0.7 → 0.9)
- `wizard.html` - `.muted` class
- `search.html` - Result text and count colors
- `templates-downloads.html` - Meta and description text
- `blog-template.html` - `.blog-meta` class
- `champions-directory.html` - Role text
- `changelog.html` - `.release-date` class
- `consultation-map.html` - Category text
- `blog-cta.html` - Time text
- `glossary.html` - Abbreviation and see-also text
- `role-template.html` - Card descriptions
- `ai-assistant.html` - Note text
- `keyboard-shortcuts.js` - Dialog styling

#### Dark Mode Improvements

- Added `--ua-card-bg` variable for explicit card backgrounds
- Added dark mode muted text colors (`#b0b0b0`, `#999999`)
- Fixed `.muted`, `.page-meta`, `.time-estimate` visibility in dark mode
- Fixed banner CTA colors in dark mode
- Fixed metric chip readability

#### High Contrast Mode Improvements

- Added muted text overrides for `prefers-contrast: more`
- All gray text becomes black for maximum contrast
- Border width increased to 2px for better visibility

### Added - Visual Improvements

#### Card Styling

- Added subtle box shadow to `.card` elements: `box-shadow: 0 1px 3px rgba(0, 0, 0, 0.08)`
- Improves visual separation on light backgrounds

#### Role Selector Styling (New CSS)

```css
.role-selector {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  font-size: 0.85rem;
}
```

- Semi-transparent background on dark header
- Responsive collapse on mobile
- Styled select and button elements

#### Navigation Separator Visibility

- Improved nav separator opacity: `rgba(255, 255, 255, 0.45)` → `rgba(255, 255, 255, 0.7)`
- Improved tag list hover border visibility

### Fixed - Keyboard Shortcuts Dialog

- Updated `keyboard-shortcuts.js` heading color: `#666` → `#595959`
- Updated note text color: `#666` → `#595959`
- Updated kbd border color: `#ccc` → `#999` for better visibility
- Updated border-top color: `#eee` → `#d5d5d5`

### Files Modified

- `docs/styles.css` - Major CSS updates
- `docs/home.html` - Navigation restructure
- `docs/roles.html` - Title, headings, card labels
- `docs/wizard.html` - Navigation updates
- `docs/keyboard-shortcuts.js` - Contrast fixes
- 100+ HTML files - Navigation, dropdowns, breadcrumbs via batch update

---

## [2026-01-05] - Initial Release

### Added

- Initial site structure and content
- Role-based persona pages
- Document accessibility guides
- Web & app accessibility guides
- Teaching & learning resources
- Procurement guidance
- Tools & checklists
- Support request forms
- AI assistant integration
- Accessibility statement

---

## Contributing

When making changes to this project, please:

1. Add an entry to the [Unreleased] section
2. Use the format: `### Changed/Added/Fixed/Removed - Brief Description`
3. Include specific file names when relevant
4. Reference any external resources or research that informed changes
