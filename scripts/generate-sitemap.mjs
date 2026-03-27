import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const articles = JSON.parse(fs.readFileSync(path.join(__dirname, '../client/src/data/articles.json'), 'utf-8'));

const domain = 'https://cleanburn.love';
const today = new Date().toISOString().split('T')[0];

const categories = ['the-brain', 'the-cost', 'the-recovery', 'the-rewire', 'the-return'];

let xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  <url>
    <loc>${domain}/</loc>
    <lastmod>${today}</lastmod>
    <changefreq>daily</changefreq>
    <priority>1.0</priority>
  </url>
  <url>
    <loc>${domain}/about</loc>
    <lastmod>${today}</lastmod>
    <changefreq>monthly</changefreq>
    <priority>0.8</priority>
  </url>
  <url>
    <loc>${domain}/quiz</loc>
    <lastmod>${today}</lastmod>
    <changefreq>monthly</changefreq>
    <priority>0.7</priority>
  </url>
`;

for (const cat of categories) {
  xml += `  <url>
    <loc>${domain}/category/${cat}</loc>
    <lastmod>${today}</lastmod>
    <changefreq>weekly</changefreq>
    <priority>0.9</priority>
  </url>
`;
}

// Only include published articles (date <= today)
const published = articles.filter(a => a.date <= today);
for (const art of published) {
  xml += `  <url>
    <loc>${domain}/${art.category_slug}/${art.slug}</loc>
    <lastmod>${art.date}</lastmod>
    <changefreq>monthly</changefreq>
    <priority>0.8</priority>
  </url>
`;
}

xml += `</urlset>`;

const outDir = path.join(__dirname, '../dist/public');
if (!fs.existsSync(outDir)) {
  fs.mkdirSync(outDir, { recursive: true });
}
fs.writeFileSync(path.join(outDir, 'sitemap.xml'), xml);
console.log(`Sitemap generated: ${published.length} articles`);
