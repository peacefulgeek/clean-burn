/**
 * Production entry point for Render.
 * Serves the static Vite build and registers all 5 cron schedules.
 * No external dispatcher. Self-contained cron schedules.
 */

import { createServer } from 'http';
import { readFileSync, existsSync } from 'fs';
import { join, extname } from 'path';
import { fileURLToPath } from 'url';

const __dirname = fileURLToPath(new URL('.', import.meta.url));
const DIST_DIR = join(__dirname, '..', 'dist', 'client');
const PORT = parseInt(process.env.PORT || '10000', 10);

// MIME types for static serving
const MIME = {
  '.html': 'text/html',
  '.js': 'application/javascript',
  '.css': 'text/css',
  '.json': 'application/json',
  '.png': 'image/png',
  '.jpg': 'image/jpeg',
  '.jpeg': 'image/jpeg',
  '.gif': 'image/gif',
  '.svg': 'image/svg+xml',
  '.webp': 'image/webp',
  '.ico': 'image/x-icon',
  '.woff': 'font/woff',
  '.woff2': 'font/woff2',
  '.ttf': 'font/ttf',
  '.txt': 'text/plain',
  '.xml': 'application/xml',
  '.webmanifest': 'application/manifest+json',
};

function serveFile(res, filePath) {
  try {
    if (!existsSync(filePath)) return false;
    const ext = extname(filePath);
    const mime = MIME[ext] || 'application/octet-stream';
    const data = readFileSync(filePath);
    res.writeHead(200, { 'Content-Type': mime, 'Cache-Control': ext === '.html' ? 'no-cache' : 'public, max-age=31536000' });
    res.end(data);
    return true;
  } catch {
    return false;
  }
}

const server = createServer((req, res) => {
  const url = new URL(req.url, `http://localhost:${PORT}`);
  const pathname = url.pathname;

  // Health check
  if (pathname === '/health') {
    res.writeHead(200, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify({ status: 'ok', uptime: process.uptime() }));
    return;
  }

  // Try to serve static file
  const filePath = join(DIST_DIR, pathname === '/' ? 'index.html' : pathname);
  if (serveFile(res, filePath)) return;

  // SPA fallback — serve index.html for client-side routing
  const indexPath = join(DIST_DIR, 'index.html');
  if (serveFile(res, indexPath)) return;

  res.writeHead(404);
  res.end('Not Found');
});

server.listen(PORT, '0.0.0.0', () => {
  console.log(`[server] Listening on 0.0.0.0:${PORT}`);
  console.log(`[server] Serving static files from ${DIST_DIR}`);
});

// -----------------------------------------------------------------------
// Cron schedules — all 5, gated by AUTO_GEN_ENABLED
// -----------------------------------------------------------------------
const AUTO_GEN = process.env.AUTO_GEN_ENABLED === 'true';

if (!AUTO_GEN) {
  console.log('[cron] AUTO_GEN_ENABLED != "true" — cron disabled');
} else {
  // Dynamic import node-cron (installed as dependency)
  const { default: cron } = await import('node-cron');

  // 1. Article generation — Mon-Fri 06:00 UTC (5/week)
  cron.schedule('0 6 * * 1-5', async () => {
    console.log(`[cron] generate-article ${new Date().toISOString()}`);
    try {
      const { generateNewArticle } = await import('./cron/generate-article.mjs');
      await generateNewArticle();
    } catch (e) { console.error('[cron] generate-article failed:', e); }
  }, { timezone: 'UTC' });

  // 2. Product spotlight — Saturday 08:00 UTC (1/week)
  cron.schedule('0 8 * * 6', async () => {
    console.log(`[cron] product-spotlight ${new Date().toISOString()}`);
    try {
      const { generateProductSpotlight } = await import('./cron/product-spotlight.mjs');
      await generateProductSpotlight();
    } catch (e) { console.error('[cron] product-spotlight failed:', e); }
  }, { timezone: 'UTC' });

  // 3. Monthly content refresh — 1st of month 03:00 UTC
  cron.schedule('0 3 1 * *', async () => {
    console.log(`[cron] refresh-monthly ${new Date().toISOString()}`);
    try {
      const { refreshMonthly } = await import('./cron/refresh-monthly.mjs');
      await refreshMonthly();
    } catch (e) { console.error('[cron] refresh-monthly failed:', e); }
  }, { timezone: 'UTC' });

  // 4. Quarterly content refresh — Jan/Apr/Jul/Oct 1st at 04:00 UTC
  cron.schedule('0 4 1 1,4,7,10 *', async () => {
    console.log(`[cron] refresh-quarterly ${new Date().toISOString()}`);
    try {
      const { refreshQuarterly } = await import('./cron/refresh-quarterly.mjs');
      await refreshQuarterly();
    } catch (e) { console.error('[cron] refresh-quarterly failed:', e); }
  }, { timezone: 'UTC' });

  // 5. ASIN health check — Sundays 05:00 UTC
  cron.schedule('0 5 * * 0', async () => {
    console.log(`[cron] asin-health-check ${new Date().toISOString()}`);
    try {
      const { verifyAffiliateLinks } = await import('./cron/verify-affiliates.mjs');
      await verifyAffiliateLinks();
    } catch (e) { console.error('[cron] asin-health-check failed:', e); }
  }, { timezone: 'UTC' });

  console.log('[cron] All 5 schedules registered (AUTO_GEN_ENABLED=true)');
}
