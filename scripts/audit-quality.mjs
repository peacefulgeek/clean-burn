/**
 * Retroactive quality gate audit — run once to find which articles fail.
 * Usage: node scripts/audit-quality.mjs > quality-audit.json
 */

import { runQualityGate } from './lib/article-quality-gate.mjs';
import { readFileSync } from 'fs';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const ARTICLES_PATH = join(__dirname, '..', 'client', 'src', 'data', 'articles.json');

const articles = JSON.parse(readFileSync(ARTICLES_PATH, 'utf8'));
const report = { total: articles.length, failed: [], passed: 0 };

for (const a of articles) {
  const g = runQualityGate(a.body_html || '');
  if (g.passed) {
    report.passed++;
  } else {
    report.failed.push({ slug: a.slug, failures: g.failures, wordCount: g.wordCount });
  }
}

console.log(JSON.stringify(report, null, 2));
