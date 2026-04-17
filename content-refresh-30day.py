#!/usr/bin/env python3
"""
Content Refresh — 30-Day Cycle
────────────────────────────────
Runs monthly. For each article older than 30 days:
  - Refreshes the date to today
  - Rotates 1-2 internal cross-links to different articles in the same category
  - Ensures Amazon links still use the correct affiliate tag
  - Logs changes for audit

Usage:
  python3 content-refresh-30day.py

Schedule (crontab):
  0 4 1 * * cd /path/to/clean-burn && python3 content-refresh-30day.py
"""

import json
import re
import random
from datetime import datetime, timedelta

ARTICLES_PATH = "client/src/data/articles.json"
AFFILIATE_TAG = "spankyspinola-20"
LOG_PATH = "content-refresh-log.txt"

# Master toggle - set to True to enable automated content refresh
AUTO_GEN_ENABLED = True

def main():
    if not AUTO_GEN_ENABLED:
        print("AUTO_GEN_ENABLED is False. Skipping 30-day refresh.")
        return

    with open(ARTICLES_PATH) as f:
        articles = json.load(f)

    today = datetime.now().strftime("%Y-%m-%d")
    cutoff = (datetime.now() - timedelta(days=30)).strftime("%Y-%m-%d")
    changes = []

    # Build category index for cross-link rotation
    by_category = {}
    for a in articles:
        cat = a["category_slug"]
        if cat not in by_category:
            by_category[cat] = []
        by_category[cat].append(a)

    for article in articles:
        if article["date"] > cutoff:
            continue  # Skip recently updated articles

        slug = article["slug"]
        mods = []

        # 1. Update date
        old_date = article["date"]
        article["date"] = today
        mods.append(f"date: {old_date} -> {today}")

        # 2. Rotate 1-2 internal cross-links
        body = article["body_html"]
        internal_links = re.findall(r'href="(/[^"]+)"', body)
        same_cat = [a for a in by_category.get(article["category_slug"], []) if a["slug"] != slug]

        if internal_links and same_cat:
            # Pick 1-2 links to rotate
            to_rotate = random.sample(internal_links, min(2, len(internal_links)))
            for old_href in to_rotate:
                new_target = random.choice(same_cat)
                new_href = f"/{new_target['category_slug']}/{new_target['slug']}"
                if new_href != old_href:
                    body = body.replace(f'href="{old_href}"', f'href="{new_href}"', 1)
                    mods.append(f"link: {old_href} -> {new_href}")

        # 3. Ensure article has at least 3 Amazon links
        amazon_count = len(re.findall(r'amazon\.com', body))
        if amazon_count < 3:
            mods.append(f"WARNING: only {amazon_count} Amazon links (need 3+)")

        # 4. Fix any Amazon links missing affiliate tag
        def fix_amazon_tag(match):
            url = match.group(1)
            if f"tag={AFFILIATE_TAG}" not in url:
                if "?" in url:
                    url += f"&tag={AFFILIATE_TAG}"
                else:
                    url += f"?tag={AFFILIATE_TAG}"
            return f'href="{url}"'

        body = re.sub(r'href="(https://www\.amazon\.com/[^"]*)"', fix_amazon_tag, body)
        article["body_html"] = body

        if mods:
            changes.append(f"[{slug}] " + "; ".join(mods))

    # Save
    with open(ARTICLES_PATH, "w") as f:
        json.dump(articles, f, ensure_ascii=False)

    # Log
    log_entry = f"\n{'='*60}\n30-DAY REFRESH: {today}\nArticles updated: {len(changes)}\n{'='*60}\n"
    for c in changes:
        log_entry += f"  {c}\n"

    with open(LOG_PATH, "a") as f:
        f.write(log_entry)

    print(f"30-day refresh complete. Updated {len(changes)} articles.")
    print(f"Log written to {LOG_PATH}")

if __name__ == "__main__":
    main()
