/**
 * Article generation cron — generates new articles via Anthropic with quality gate.
 * Requires ANTHROPIC_API_KEY env var.
 */

import { runQualityGate } from '../lib/article-quality-gate.mjs';
import { extractAsinsFromText, verifyAsin } from '../lib/amazon-verify.mjs';

export async function generateNewArticle() {
  const apiKey = process.env.ANTHROPIC_API_KEY;
  if (!apiKey) {
    console.warn('[generate-article] ANTHROPIC_API_KEY not set — skipping');
    return { stored: false, reason: 'no-api-key' };
  }

  for (let attempt = 1; attempt <= 3; attempt++) {
    try {
      const article = await generateFromAnthropic(apiKey);

      // Verify every ASIN before gate check
      const asins = extractAsinsFromText(article.body);
      for (const asin of asins) {
        const check = await verifyAsin(asin);
        if (!check.valid) {
          console.warn(`[generate-article] Dead ASIN ${asin} in generated content — attempt ${attempt}`);
        }
      }

      const gate = runQualityGate(article.body);
      if (gate.passed) {
        await storeArticle(article);
        console.log(`[generate-article] stored ${article.slug} (${gate.wordCount} words, ${gate.amazonLinks} links)`);
        return { stored: true, attempts: attempt };
      }
      console.warn(`[generate-article] attempt ${attempt} failed:`, gate.failures.join(' | '));
    } catch (e) {
      console.error(`[generate-article] attempt ${attempt} error:`, e.message);
    }
  }
  console.error('[generate-article] abandoned after 3 attempts — NOT storing broken article');
  return { stored: false, reason: 'quality-gate-exhausted' };
}

async function generateFromAnthropic(apiKey) {
  // TODO: Implement Anthropic API call with GENERATION_HARD_RULES prompt
  // This is a placeholder — replace with actual Anthropic SDK integration
  console.log('[generate-article] Anthropic generation not yet configured');
  throw new Error('Anthropic generation not yet configured — add your prompt and API call here');
}

async function storeArticle(article) {
  // TODO: Store article to articles.json or database
  // For static site: read articles.json, append, write back
  // For DB-backed: INSERT INTO articles
  console.log(`[generate-article] Would store: ${article.slug}`);
}
