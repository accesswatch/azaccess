"""
Generate per-course Markdown files from the spreadsheet export.

Usage:
  python import_courses.py ../Digital_Accessibility_Framework_Course_Mapping__4_.xlsx ../content/courses

This script reads the spreadsheet and writes one .md file per course with YAML frontmatter.
"""
import sys
import os
import pandas as pd
from pathlib import Path

def slugify(s):
    return ''.join(c.lower() if c.isalnum() else '-' for c in s).strip('-').replace('--','-')

def main(src_xlsx, out_dir):
    df = pd.read_excel(src_xlsx)
    Path(out_dir).mkdir(parents=True, exist_ok=True)
    for idx, row in df.iterrows():
        title = str(row.get('Course Title') or row.get('Course') or row.get('Course Title'))
        if not title or title.lower().startswith('nan'):
            continue
        framework = row.get('Framework', '')
        typ = row.get('Type', '')
        duration = row.get('Length', '')
        level = row.get('Level', '')
        desc = row.get('Description', '')
        slug = slugify(title)
        filename = Path(out_dir) / f"{slug}.md"
        front = ["---",
                 f"title: \"{title}\"",
                 f"slug: \"{slug}\"",
                 f"framework: \"{framework}\"",
                 f"type: \"{typ}\"",
                 f"duration: \"{duration}\"",
                 f"level: \"{level}\"",
                 f"description_excerpt: \"{desc}\"",
                 f"linkedin_url: \"\"",
                 f"source: \"imported_spreadsheet\"",
                 f"date_added: \"{pd.Timestamp('today').date()}\"",
                 "---\n"]
        with open(filename, 'w', encoding='utf-8') as f:
            f.write('\n'.join(front))
            f.write('\n')
            f.write(desc or '')
    print(f"Wrote course files to {out_dir}")

if __name__ == '__main__':
    if len(sys.argv) < 3:
        print('Usage: import_courses.py <source-xlsx> <output-dir>')
        sys.exit(1)
    main(sys.argv[1], sys.argv[2])
