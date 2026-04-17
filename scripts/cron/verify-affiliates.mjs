/**
 * ASIN health check cron — verifies all Amazon links are still valid.
 * Sundays 05:00 UTC.
 * Logs broken ASINs for manual review or auto-replacement.
 */

import { verifyAsinBatch, extractAsinsFromText } from '../lib/amazon-verify.mjs';
import { readFileSync, writeFileSync, mkdirSync } from 'fs';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const ARTICLES_PATH = join(__dirname, '..', '..', 'client', 'src', 'data', 'articles.json');
const LOGS_DIR = join(__dirname, '..', '..', 'logs');

export async function verifyAffiliateLinks() {
  console.log('[verify-affiliates] Starting ASIN health check...');

  // Collect all unique ASINs from articles
  const articles = JSON.parse(readFileSync(ARTICLES_PATH, 'utf8'));
  const allAsins = new Set();
  for (const a of articles) {
    const asins = extractAsinsFromText(a.body_html || '');
    asins.forEach(asin => allAsins.add(asin));
  }

  console.log(`[verify-affiliates] Found ${allAsins.size} unique ASINs across ${articles.length} articles`);

  // Verify in batches with rate limiting
  const results = await verifyAsinBatch([...allAsins], 2500);

  const valid = results.filter(r => r.valid);
  const invalid = results.filter(r => !r.valid);

  console.log(`[verify-affiliates] Results: ${valid.length} valid, ${invalid.length} invalid`);

  if (invalid.length > 0) {
    console.warn('[verify-affiliates] Invalid ASINs:');
    for (const r of invalid) {
      console.warn(`  ${r.asin}: ${r.reason}`);
    }
  }

  // Save report
  mkdirSync(LOGS_DIR, { recursive: true });
  const report = {
    timestamp: new Date().toISOString(),
    totalAsins: allAsins.size,
    valid: valid.length,
    invalid: invalid.length,
    invalidDetails: invalid,
    validDetails: valid.map(r => ({ asin: r.asin, title: r.title }))
  };

  const reportPath = join(LOGS_DIR, `asin-health-${new Date().toISOString().split('T')[0]}.json`);
  writeFileSync(reportPath, JSON.stringify(report, null, 2));
  console.log(`[verify-affiliates] Report saved to ${reportPath}`);

  return report;
}
