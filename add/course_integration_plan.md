# Course Integration Plan — Digital Accessibility Framework

Purpose: capture a practical, low-risk approach to integrate the LinkedIn Learning course mapping into the site.

## Desired data model (per course)
- **title**: string
- **slug**: string (kebab-case)
- **framework**: `Understand|Prepare|Build|Maintain`
- **type**: `Course|Learning Path`
- **duration**: string (e.g., `1h 24m`)
- **level**: string
- **description_excerpt**: short summary (1–3 sentences)
- **linkedin_url**: external URL (placeholder if unknown)
- **source**: `LinkedIn Learning` or `imported_spreadsheet`
- **date_added**: ISO date

## Immediate action (fast, no external scraping)
1. Use the spreadsheet descriptions (already exported to `Digital_Accessibility_Framework_Course_Mapping.md`).
2. Generate one Markdown file per course under `content/courses/` with YAML frontmatter containing the data model above and the spreadsheet description used for `description_excerpt`.
3. Add a course listing page on the site that groups courses by `framework` and renders a CTA button linking to `linkedin_url` (which can be filled later).

Benefits: quick, no scraping or auth required; content is ready to publish and attributed.

## Enrichment (optional)
- Goal: add canonical LinkedIn URLs and short meta descriptions.
- Methods:
  - Manual: Admin copy/paste of each LinkedIn URL (fast for ~30 courses).
  - Automated (programmatic): use a search API (Bing Web Search API) to find `site:linkedin.com/learning "{course title}"` and extract `og:description` or `meta[name=description]`.
  - LinkedIn Learning Admin/API: If you have an admin account, request CSV export or API access for canonical meta and URLs.

## Implementation details — static site (recommended)
- Folder: `content/courses/`
- File format: Markdown with YAML frontmatter, example:

```yaml
---
title: "Accessibility-First Design"
slug: "accessibility-first-design"
framework: "Understand"
type: "Course"
duration: "1h 24m"
level: "Intermediate"
description_excerpt: "How to prioritize accessibility in digital design to create more inclusive, resilient, and user-friendly products."
linkedin_url: "https://www.linkedin.com/learning/..."
source: "imported_spreadsheet"
date_added: "2025-12-08"
---

Course page content and additional notes.
```

## Implementation details — CMS (alternative)
- Import a CSV/JSON into CMS with the fields listed above.
- Build a front-end component that queries CMS and groups by `framework`.

## Tooling (optional automation)
- `scripts/generate_course_md.py` — reads the spreadsheet and writes `content/courses/*.md` files.
- `scripts/refresh_linkedin_meta.py` — given a list of `linkedin_url`s (or API key), fetches page metadata and updates `description_excerpt`.

## Minimal `requirements.txt` (for automation scripts)
- pandas
- requests
- beautifulsoup4
- openpyxl

## Next steps I can do for you
- Option 1: Generate `content/courses/*.md` files using the spreadsheet descriptions (no external scraping). (I can do this now.)
- Option 2: Generate the automation scripts (`generate_course_md.py`, `refresh_linkedin_meta.py`, `requirements.txt`, README) so you can run enrichment with keys/credentials.
- Option 3: Attempt automated enrichment for N courses if you provide a search API key or LinkedIn admin access.

Choose one option and I will proceed.
