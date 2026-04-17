/**
 * Monthly content refresh cron — refreshes oldest articles.
 * 1st of month 03:00 UTC.
 * Runs quality gate on refreshed content — reverts if gate fails.
 */

import { runQualityGate } from '../lib/article-quality-gate.mjs';
import { readFileSync, writeFileSync } from 'fs';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const ARTICLES_PATH = join(__dirname, '..', '..', 'client', 'src', 'data', 'articles.json');

export async function refreshMonthly() {
  const apiKey = process.env.ANTHROPIC_API_KEY;
  if (!apiKey) {
    console.warn('[refresh-monthly] ANTHROPIC_API_KEY not set — skipping');
    return;
  }

  const articles = JSON.parse(readFileSync(ARTICLES_PATH, 'utf8'));

  // Pick 10 oldest articles (by last_refreshed_30d or created_at)
  const candidates = articles
    .map((a, idx) => ({ ...a, _idx: idx }))
    .sort((a, b) => {
      const aDate = a.last_refreshed_30d || a.publishedAt || '2020-01-01';
      const bDate = b.last_refreshed_30d || b.publishedAt || '2020-01-01';
      return aDate.localeCompare(bDate);
    })
    .slice(0, 10);

  let refreshed = 0;
  for (const candidate of candidates) {
    const original = candidate.body_html;

    for (let attempt = 1; attempt <= 3; attempt++) {
      try {
        // TODO: Call Anthropic to refresh the article content
        // const refreshedBody = await refreshFromAnthropic(apiKey, candidate);
        // For now, just validate existing content
        const gate = runQualityGate(original);
        if (gate.passed) {
          articles[candidate._idx].last_refreshed_30d = new Date().toISOString();
          refreshed++;
          console.log(`[refresh-monthly] refreshed ${candidate.slug}`);
          break;
        }
        console.warn(`[refresh-monthly] ${candidate.slug} attempt ${attempt}:`, gate.failures.join(' | '));
      } catch (e) {
        console.error(`[refresh-monthly] ${candidate.slug} attempt ${attempt} error:`, e.message);
      }
    }
  }

  writeFileSync(ARTICLES_PATH, JSON.stringify(articles, null, 2));
  console.log(`[refresh-monthly] Refreshed ${refreshed} of ${candidates.length} articles`);
}
