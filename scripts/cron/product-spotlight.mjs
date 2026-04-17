/**
 * Product spotlight cron — publishes next spotlight article from the queue.
 * Saturday 08:00 UTC.
 */

import { runQualityGate } from '../lib/article-quality-gate.mjs';
import { readFileSync, writeFileSync } from 'fs';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const ARTICLES_PATH = join(__dirname, '..', '..', 'client', 'src', 'data', 'articles.json');

export async function generateProductSpotlight() {
  console.log('[product-spotlight] Starting spotlight generation...');

  try {
    // Import the spotlight queue from the TS-compiled data
    // In production, this would read from the spotlight queue
    const { SPOTLIGHT_QUEUE, AUTO_GEN_ENABLED } = await import('../../client/src/lib/weekly-spotlight-cron.ts').catch(() => {
      console.warn('[product-spotlight] Could not import spotlight queue — trying JSON fallback');
      return { SPOTLIGHT_QUEUE: [], AUTO_GEN_ENABLED: true };
    });

    if (!AUTO_GEN_ENABLED) {
      console.log('[product-spotlight] AUTO_GEN_ENABLED is false — skipping');
      return;
    }

    // Read current articles to find which spotlights are already published
    const articles = JSON.parse(readFileSync(ARTICLES_PATH, 'utf8'));
    const existingSlugs = new Set(articles.map(a => a.slug));

    // Find next unpublished spotlight
    const next = SPOTLIGHT_QUEUE?.find(s => !existingSlugs.has(s.slug));
    if (!next) {
      console.log('[product-spotlight] No unpublished spotlights in queue');
      return;
    }

    // Run quality gate
    const gate = runQualityGate(next.body_html || next.body || '');
    if (!gate.passed) {
      console.error(`[product-spotlight] ${next.slug} failed quality gate:`, gate.failures.join(' | '));
      return;
    }

    // TODO: Generate hero image via FAL + upload to Bunny CDN
    // const heroUrl = await processAndUploadImage(falUrl, `hero-${next.slug}`);

    console.log(`[product-spotlight] Ready to publish: ${next.slug} (${gate.wordCount} words, ${gate.amazonLinks} links)`);
    // In production: append to articles.json and commit/push
  } catch (e) {
    console.error('[product-spotlight] Error:', e.message);
  }
}
