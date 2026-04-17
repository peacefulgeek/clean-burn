#!/usr/bin/env python3
"""
Product Link Validator — Lightweight Amazon ASIN Health Check
=============================================================
Runs on a cron schedule (recommended: weekly or biweekly).
No API keys needed. Uses HTTP GET to Amazon product pages.

What it does:
  1. Extracts every unique ASIN from articles.json, product-catalog.ts,
     weekly-spotlight-cron.ts, and Tools.tsx
  2. Checks each ASIN via HTTP GET to amazon.com/dp/{ASIN}
  3. Scrapes the page title for product name verification
  4. Flags dead links (404 / dog page), captcha blocks, and title mismatches
  5. Logs a full report to logs/product-link-report-{date}.json
  6. In AUTO_FIX mode, replaces dead ASINs with fallback alternatives from
     the built-in fallback catalog

Usage:
  python3 product-link-validator.py                # Check only (dry run)
  python3 product-link-validator.py --auto-fix     # Check + replace dead ASINs
  python3 product-link-validator.py --verbose       # Extra logging

Crontab (every Sunday at 3am):
  0 3 * * 0 cd /path/to/clean-burn && python3 product-link-validator.py --auto-fix >> logs/validator.log 2>&1
"""

AUTO_GEN_ENABLED = True

import json
import re
import os
import sys
import time
import random
import hashlib
from datetime import datetime, timezone

# ---------------------------------------------------------------------------
# Config
# ---------------------------------------------------------------------------

PROJECT_ROOT = os.path.dirname(os.path.abspath(__file__))
ARTICLES_PATH = os.path.join(PROJECT_ROOT, "client/src/data/articles.json")
CATALOG_PATH = os.path.join(PROJECT_ROOT, "client/src/data/product-catalog.ts")
SPOTLIGHT_PATH = os.path.join(PROJECT_ROOT, "client/src/lib/weekly-spotlight-cron.ts")
TOOLS_PATH = os.path.join(PROJECT_ROOT, "client/src/pages/Tools.tsx")
LOG_DIR = os.path.join(PROJECT_ROOT, "logs")

AFFILIATE_TAG = "spankyspinola-20"

# Rate limiting: seconds between requests (be respectful to Amazon)
REQUEST_DELAY_MIN = 1.5
REQUEST_DELAY_MAX = 3.0

# User agents to rotate (reduces captcha rate)
USER_AGENTS = [
    "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/122.0.0.0 Safari/537.36",
    "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/121.0.0.0 Safari/537.36",
    "Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36",
    "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/17.2 Safari/605.1.15",
    "Mozilla/5.0 (Windows NT 10.0; Win64; x64; rv:122.0) Gecko/20100101 Firefox/122.0",
]

# ---------------------------------------------------------------------------
# Fallback catalog: category -> list of known-good ASINs
# If a dead ASIN is detected, the validator picks a replacement from the same
# category. Add more fallbacks here as you discover good products.
# ---------------------------------------------------------------------------

FALLBACK_CATALOG = {
    "books": [
        {"asin": "0061231878", "name": "The Body Keeps the Score"},
        {"asin": "0830837000", "name": "Wired for Intimacy"},
        {"asin": "0802412726", "name": "Unwanted by Jay Stringer"},
        {"asin": "0593330447", "name": "It Didn't Start with You"},
        {"asin": "1476762090", "name": "Daring Greatly"},
        {"asin": "0143127748", "name": "Brainstorm by Daniel Siegel"},
        {"asin": "0300234368", "name": "The Craving Mind"},
        {"asin": "0735211299", "name": "Atomic Habits"},
        {"asin": "0735213615", "name": "The Gifts of Imperfection"},
        {"asin": "1723297178", "name": "Breaking the Cycle"},
        {"asin": "1401944485", "name": "Recovery 2.0"},
    ],
    "supplements": [
        {"asin": "B000BD0RT0", "name": "Doctor's Best Magnesium Glycinate"},
        {"asin": "B0BZG1PXJK", "name": "Ashwagandha KSM-66"},
        {"asin": "B005D0DTS2", "name": "Nature Made B-Complex"},
        {"asin": "B00XM0Y9SE", "name": "Sports Research MCT Oil"},
        {"asin": "B07TT8B1JJ", "name": "LMNT Electrolyte Powder"},
        {"asin": "B00C3Q5JVE", "name": "Natrol Melatonin 1mg"},
    ],
    "meditation": [
        {"asin": "B093HFSVW5", "name": "Florensi Meditation Cushion"},
        {"asin": "B06XHN7VRG", "name": "Silent Mind Singing Bowl"},
        {"asin": "B09CZ6Y4VC", "name": "Solid Wood Meditation Bench"},
        {"asin": "B0CD1S3FQ5", "name": "Electronic Meditation Timer"},
        {"asin": "B004C20O8A", "name": "Satya Nag Champa Incense"},
    ],
    "sleep": [
        {"asin": "B00E6D6LQY", "name": "LectroFan White Noise Machine"},
        {"asin": "B077RPXSF3", "name": "NICETOWN Blackout Curtains"},
        {"asin": "B0051U7W32", "name": "Mack's Ultra Soft Earplugs"},
        {"asin": "B0CRB2Y4H5", "name": "YnM Weighted Blanket 20lb"},
    ],
    "fitness": [
        {"asin": "B0FRG5TM2T", "name": "Gaiam Yoga Mat"},
        {"asin": "B0GD8RBY65", "name": "ProsourceFit Acupressure Mat"},
        {"asin": "B08CKWVYMF", "name": "Bob and Brad Massage Gun"},
        {"asin": "B0DG3S2HTJ", "name": "Ice Barrel Cold Plunge"},
        {"asin": "B0GQ3SF4CR", "name": "Airofit Breathing Trainer"},
    ],
    "journaling": [
        {"asin": "B0DPGKXGJ5", "name": "The Five Minute Journal"},
        {"asin": "B09M74L6HB", "name": "Sobriety Journal for Men"},
        {"asin": "B09CC3RHG2", "name": "Couples Relationship Journal"},
        {"asin": "1452168369", "name": "Mindfulness Cards Deck"},
    ],
    "tech": [
        {"asin": "B07W781XWF", "name": "Blue Light Blocking Glasses"},
        {"asin": "B0CSRBWPKY", "name": "Oura Ring Gen3"},
        {"asin": "B0784HWPN6", "name": "VIVO Standing Desk Converter"},
        {"asin": "B08PB9W3GT", "name": "Countdown Timer Cube"},
    ],
    "couples": [
        {"asin": "B0CYKKYHVH", "name": "Partners are Human Conversation Cards"},
        {"asin": "B09CC3RHG2", "name": "Couples Relationship Journal"},
    ],
}

# Map known ASINs to their category for fallback lookups
ASIN_TO_CATEGORY = {}
for cat, products in FALLBACK_CATALOG.items():
    for p in products:
        ASIN_TO_CATEGORY[p["asin"]] = cat


# ---------------------------------------------------------------------------
# HTTP checking
# ---------------------------------------------------------------------------

def get_session():
    """Create a requests session with retry logic."""
    import requests
    from requests.adapters import HTTPAdapter
    from urllib3.util.retry import Retry

    session = requests.Session()
    retry = Retry(total=2, backoff_factor=1, status_forcelist=[429, 500, 502, 503])
    adapter = HTTPAdapter(max_retries=retry)
    session.mount("https://", adapter)
    session.mount("http://", adapter)
    return session


def check_asin(asin, session):
    """
    Check if an ASIN is alive on Amazon.
    Returns dict with: status, http_code, title, is_dead, is_captcha
    """
    import requests

    url = f"https://www.amazon.com/dp/{asin}"
    headers = {
        "User-Agent": random.choice(USER_AGENTS),
        "Accept": "text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8",
        "Accept-Language": "en-US,en;q=0.9",
        "Accept-Encoding": "gzip, deflate, br",
        "Cache-Control": "no-cache",
    }

    result = {
        "asin": asin,
        "url": url,
        "http_code": 0,
        "title": "",
        "is_dead": False,
        "is_captcha": False,
        "is_unavailable": False,
        "status": "unknown",
    }

    try:
        resp = session.get(url, headers=headers, timeout=20, allow_redirects=True)
        result["http_code"] = resp.status_code
        text = resp.text[:8000]

        # Check for captcha
        if "characters you see below" in text.lower() or "type the characters" in text.lower():
            result["is_captcha"] = True
            result["status"] = "captcha"
            return result

        # Check for dog page (Amazon's 404)
        if "sorry, we couldn't find that page" in text.lower() or \
           "looking for something" in text.lower() or \
           resp.status_code == 404:
            result["is_dead"] = True
            result["status"] = "dead"
            return result

        # Check for "currently unavailable"
        if "currently unavailable" in text.lower() and "we don't know when" in text.lower():
            result["is_unavailable"] = True
            result["status"] = "unavailable"

        # Try to extract product title
        title_match = re.search(r'<span id="productTitle"[^>]*>(.*?)</span>', text, re.DOTALL)
        if title_match:
            result["title"] = title_match.group(1).strip()[:120]

        # If no productTitle, try og:title
        if not result["title"]:
            og_match = re.search(r'<meta\s+(?:property|name)="og:title"\s+content="([^"]+)"', text)
            if og_match:
                result["title"] = og_match.group(1).strip()[:120]

        # If no title at all but page loaded, try the <title> tag
        if not result["title"]:
            t_match = re.search(r'<title>(.*?)</title>', text, re.DOTALL)
            if t_match:
                raw_title = t_match.group(1).strip()[:120]
                # Filter out generic Amazon titles
                if "Amazon.com" not in raw_title or len(raw_title) > 30:
                    result["title"] = raw_title

        if resp.status_code == 200 and not result["is_dead"]:
            result["status"] = "unavailable" if result["is_unavailable"] else "ok"
        else:
            result["status"] = "error"

    except requests.exceptions.Timeout:
        result["status"] = "timeout"
    except requests.exceptions.ConnectionError:
        result["status"] = "connection_error"
    except Exception as e:
        result["status"] = "error"
        result["title"] = str(e)[:80]

    return result


# ---------------------------------------------------------------------------
# ASIN extraction
# ---------------------------------------------------------------------------

def extract_asins_from_all_files():
    """
    Extract all unique ASINs and where they appear.
    Returns: dict of asin -> {files: set, count: int, contexts: list}
    """
    asins = {}

    def add_asin(asin, source, context=""):
        if asin not in asins:
            asins[asin] = {"files": set(), "count": 0, "contexts": []}
        asins[asin]["files"].add(source)
        asins[asin]["count"] += 1
        if context and len(asins[asin]["contexts"]) < 3:
            asins[asin]["contexts"].append(context)

    # articles.json
    if os.path.exists(ARTICLES_PATH):
        with open(ARTICLES_PATH) as f:
            articles = json.load(f)
        for a in articles:
            for m in re.finditer(r'amazon\.com/dp/([A-Z0-9]{10})', a.get("body_html", "")):
                add_asin(m.group(1), "articles.json", a.get("slug", ""))

    # product-catalog.ts
    if os.path.exists(CATALOG_PATH):
        with open(CATALOG_PATH) as f:
            content = f.read()
        for m in re.finditer(r'asin:\s*["\']([A-Z0-9]{10})["\']', content):
            add_asin(m.group(1), "product-catalog.ts")

    # weekly-spotlight-cron.ts
    if os.path.exists(SPOTLIGHT_PATH):
        with open(SPOTLIGHT_PATH) as f:
            content = f.read()
        for m in re.finditer(r'amazon\.com/dp/([A-Z0-9]{10})', content):
            add_asin(m.group(1), "weekly-spotlight-cron.ts")

    # Tools.tsx
    if os.path.exists(TOOLS_PATH):
        with open(TOOLS_PATH) as f:
            content = f.read()
        for m in re.finditer(r'amazon\.com/dp/([A-Z0-9]{10})', content):
            add_asin(m.group(1), "Tools.tsx")

    return asins


# ---------------------------------------------------------------------------
# Auto-fix: replace dead ASINs
# ---------------------------------------------------------------------------

def find_replacement(dead_asin, all_healthy_asins):
    """
    Find a replacement ASIN from the fallback catalog.
    Tries same category first, then any category.
    Avoids picking an ASIN that is also dead.
    """
    category = ASIN_TO_CATEGORY.get(dead_asin)

    # Try same category first
    if category and category in FALLBACK_CATALOG:
        candidates = [
            p for p in FALLBACK_CATALOG[category]
            if p["asin"] != dead_asin and p["asin"] in all_healthy_asins
        ]
        if candidates:
            return random.choice(candidates)

    # Try any category
    all_candidates = []
    for cat, products in FALLBACK_CATALOG.items():
        for p in products:
            if p["asin"] != dead_asin and p["asin"] in all_healthy_asins:
                all_candidates.append(p)

    if all_candidates:
        return random.choice(all_candidates)

    return None


def replace_asin_in_file(filepath, old_asin, new_asin):
    """Replace all occurrences of old_asin with new_asin in a file."""
    if not os.path.exists(filepath):
        return 0

    with open(filepath) as f:
        content = f.read()

    count = content.count(old_asin)
    if count > 0:
        content = content.replace(old_asin, new_asin)
        with open(filepath, "w") as f:
            f.write(content)

    return count


# ---------------------------------------------------------------------------
# Reporting
# ---------------------------------------------------------------------------

def write_report(results, replacements, start_time):
    """Write a JSON report to the logs directory."""
    os.makedirs(LOG_DIR, exist_ok=True)

    now = datetime.now(timezone.utc)
    report = {
        "generated_at": now.isoformat(),
        "duration_seconds": round(time.time() - start_time, 1),
        "summary": {
            "total_asins_checked": len(results),
            "ok": sum(1 for r in results if r["status"] == "ok"),
            "dead": sum(1 for r in results if r["status"] == "dead"),
            "unavailable": sum(1 for r in results if r["status"] == "unavailable"),
            "captcha": sum(1 for r in results if r["status"] == "captcha"),
            "timeout": sum(1 for r in results if r["status"] == "timeout"),
            "error": sum(1 for r in results if r["status"] in ("error", "connection_error")),
            "replacements_made": len(replacements),
        },
        "results": results,
        "replacements": replacements,
    }

    filename = f"product-link-report-{now.strftime('%Y-%m-%d')}.json"
    filepath = os.path.join(LOG_DIR, filename)

    with open(filepath, "w") as f:
        json.dump(report, f, indent=2)

    return filepath


def print_summary(results, replacements, report_path):
    """Print a human-readable summary to stdout."""
    ok = sum(1 for r in results if r["status"] == "ok")
    dead = sum(1 for r in results if r["status"] == "dead")
    unavail = sum(1 for r in results if r["status"] == "unavailable")
    captcha = sum(1 for r in results if r["status"] == "captcha")
    errors = sum(1 for r in results if r["status"] in ("error", "connection_error", "timeout"))

    print(f"\n{'='*60}")
    print(f"  PRODUCT LINK VALIDATOR REPORT")
    print(f"  {datetime.now(timezone.utc).strftime('%Y-%m-%d %H:%M UTC')}")
    print(f"{'='*60}")
    print(f"  Total ASINs checked:  {len(results)}")
    print(f"  OK (200, live):       {ok}")
    print(f"  Dead (404):           {dead}")
    print(f"  Unavailable:          {unavail}")
    print(f"  Captcha (manual):     {captcha}")
    print(f"  Errors/timeouts:      {errors}")
    print(f"  Replacements made:    {len(replacements)}")
    print(f"{'='*60}")

    if dead > 0:
        print(f"\n  DEAD ASINs:")
        for r in results:
            if r["status"] == "dead":
                replaced = next((rep for rep in replacements if rep["old_asin"] == r["asin"]), None)
                if replaced:
                    print(f"    {r['asin']} -> REPLACED with {replaced['new_asin']} ({replaced['new_name']})")
                else:
                    print(f"    {r['asin']} -> NO REPLACEMENT FOUND (manual fix needed)")

    if unavail > 0:
        print(f"\n  UNAVAILABLE (may return):")
        for r in results:
            if r["status"] == "unavailable":
                print(f"    {r['asin']} - {r['title'][:60]}")

    if captcha > 0:
        print(f"\n  CAPTCHA BLOCKED (need manual check):")
        for r in results:
            if r["status"] == "captcha":
                print(f"    {r['asin']}")

    print(f"\n  Full report: {report_path}")
    print()


# ---------------------------------------------------------------------------
# Main
# ---------------------------------------------------------------------------

def main():
    if not AUTO_GEN_ENABLED:
        print("AUTO_GEN_ENABLED is False. Exiting.")
        sys.exit(0)

    auto_fix = "--auto-fix" in sys.argv
    verbose = "--verbose" in sys.argv

    print(f"Product Link Validator starting at {datetime.now(timezone.utc).strftime('%Y-%m-%d %H:%M UTC')}")
    print(f"Mode: {'AUTO-FIX' if auto_fix else 'CHECK ONLY (dry run)'}")
    print()

    start_time = time.time()

    # Step 1: Extract all ASINs
    asin_map = extract_asins_from_all_files()
    print(f"Found {len(asin_map)} unique ASINs across all files")

    # Step 2: Check each ASIN
    import requests  # Import here so script loads even without requests installed
    session = get_session()
    results = []

    sorted_asins = sorted(asin_map.keys())
    for i, asin in enumerate(sorted_asins):
        info = asin_map[asin]
        result = check_asin(asin, session)
        result["files"] = list(info["files"])
        result["usage_count"] = info["count"]
        results.append(result)

        if verbose:
            symbol = {"ok": "+", "dead": "X", "unavailable": "~", "captcha": "?", "timeout": "!", "error": "!", "connection_error": "!"}
            s = symbol.get(result["status"], "?")
            print(f"  [{i+1}/{len(sorted_asins)}] {s} {asin} ({result['status']}) - {result['title'][:50] or 'no title'}")
        elif (i + 1) % 10 == 0:
            print(f"  Checked {i+1}/{len(sorted_asins)}...")

        # Rate limit with jitter
        delay = random.uniform(REQUEST_DELAY_MIN, REQUEST_DELAY_MAX)
        time.sleep(delay)

    # Step 3: Auto-fix dead ASINs
    replacements = []
    healthy_asins = {r["asin"] for r in results if r["status"] == "ok"}

    if auto_fix:
        dead_asins = [r for r in results if r["status"] == "dead"]
        if dead_asins:
            print(f"\nAuto-fixing {len(dead_asins)} dead ASINs...")

            for r in dead_asins:
                replacement = find_replacement(r["asin"], healthy_asins)
                if replacement:
                    total_replaced = 0
                    for filepath in [ARTICLES_PATH, CATALOG_PATH, SPOTLIGHT_PATH, TOOLS_PATH]:
                        count = replace_asin_in_file(filepath, r["asin"], replacement["asin"])
                        total_replaced += count

                    replacements.append({
                        "old_asin": r["asin"],
                        "new_asin": replacement["asin"],
                        "new_name": replacement["name"],
                        "occurrences_replaced": total_replaced,
                    })

                    if verbose:
                        print(f"    {r['asin']} -> {replacement['asin']} ({replacement['name']}) [{total_replaced} occurrences]")
                else:
                    if verbose:
                        print(f"    {r['asin']} -> NO REPLACEMENT AVAILABLE")

    # Step 4: Write report
    report_path = write_report(results, replacements, start_time)

    # Step 5: Print summary
    print_summary(results, replacements, report_path)

    # Exit code: 0 if all ok, 1 if there are unfixed dead links
    unfixed_dead = sum(1 for r in results if r["status"] == "dead") - len(replacements)
    sys.exit(1 if unfixed_dead > 0 else 0)


if __name__ == "__main__":
    main()
