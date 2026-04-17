/**
 * Broken image audit — find articles with broken hero images.
 * Usage: node scripts/audit-images.mjs > broken-images.json
 */

import { readFileSync } from 'fs';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const ARTICLES_PATH = join(__dirname, '..', 'client', 'src', 'data', 'articles.json');

const articles = JSON.parse(readFileSync(ARTICLES_PATH, 'utf8'));
const broken = [];

for (const a of articles) {
  const urls = [
    a.heroImage || a.hero_url,
    ...[...((a.body_html || '').matchAll(/<img[^>]+src="([^"]+)"/gi))].map(m => m[1])
  ].filter(Boolean);

  for (const url of urls) {
    if (url.startsWith('data:')) continue;
    try {
      const res = await fetch(url, { method: 'HEAD' });
      if (res.status !== 200) {
        broken.push({ id: a.id, slug: a.slug, url, status: res.status });
      }
    } catch (e) {
      broken.push({ id: a.id, slug: a.slug, url, error: e.message });
    }
    await new Promise(r => setTimeout(r, 100));
  }
}

console.log(JSON.stringify(broken, null, 2));
