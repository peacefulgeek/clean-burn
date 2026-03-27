import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const articles = JSON.parse(fs.readFileSync(path.join(__dirname, '../client/src/data/articles.json'), 'utf-8'));

const domain = 'https://cleanburn.love';
const today = new Date().toISOString().split('T')[0];
const published = articles
  .filter(a => a.date <= today)
  .sort((a, b) => b.date.localeCompare(a.date))
  .slice(0, 20);

const escapeXml = (s) => s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');

let rss = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom">
  <channel>
    <title>The Clean Burn</title>
    <link>${domain}</link>
    <description>Breaking Free From Porn Without Shame — Evidence-based recovery through neuroscience, somatic practices, and consciousness.</description>
    <language>en-us</language>
    <lastBuildDate>${new Date().toUTCString()}</lastBuildDate>
    <atom:link href="${domain}/rss.xml" rel="self" type="application/rss+xml"/>
    <managingEditor>kalesh@kalesh.love (Kalesh)</managingEditor>
`;

for (const art of published) {
  rss += `    <item>
      <title>${escapeXml(art.title)}</title>
      <link>${domain}/${art.category_slug}/${art.slug}</link>
      <guid isPermaLink="true">${domain}/${art.category_slug}/${art.slug}</guid>
      <description>${escapeXml(art.meta_description)}</description>
      <pubDate>${new Date(art.date + 'T12:00:00Z').toUTCString()}</pubDate>
      <category>${escapeXml(art.category_name)}</category>
    </item>
`;
}

rss += `  </channel>
</rss>`;

const outDir = path.join(__dirname, '../dist/public');
if (!fs.existsSync(outDir)) {
  fs.mkdirSync(outDir, { recursive: true });
}
fs.writeFileSync(path.join(outDir, 'rss.xml'), rss);
console.log(`RSS feed generated: ${published.length} articles`);
