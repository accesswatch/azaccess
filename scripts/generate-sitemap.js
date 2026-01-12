const fs = require("fs").promises;
const path = require("path");

// Config: set your public base URL here
const BASE_URL = process.env.SITE_BASE || "http://accessibility.arizona.edu";
const ROOT = path.resolve(__dirname, "..");
const OUT = path.join(ROOT, "sitemap.xml");

async function findHtml(dir) {
  const entries = await fs.readdir(dir, { withFileTypes: true });
  const files = [];
  for (const e of entries) {
    const full = path.join(dir, e.name);
    if (e.isDirectory()) {
      files.push(...(await findHtml(full)));
    } else if (e.isFile() && e.name.toLowerCase().endsWith(".html")) {
      files.push(full);
    }
  }
  return files;
}

function toUrl(filePath) {
  // make repo-root-relative path and convert backslashes
  let rel = path.relative(ROOT, filePath).replace(/\\/g, "/");
  return `${BASE_URL}/${rel}`;
}

async function buildSitemap() {
  const files = await findHtml(ROOT);
  // sort for stable output
  files.sort();

  const header = `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n`;
  const footer = `</urlset>\n`;

  const body = files
    .map((f) => {
      const loc = toUrl(f);
      return `  <url><loc>${loc}</loc><changefreq>monthly</changefreq><priority>0.5</priority></url>`;
    })
    .join("\n");

  const xml = header + body + "\n" + footer;
  await fs.writeFile(OUT, xml, "utf8");
  console.log("Wrote", OUT, "entries:", files.length);
}

buildSitemap().catch((err) => {
  console.error(err);
  process.exitCode = 1;
});
