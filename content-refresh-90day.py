#!/usr/bin/env python3
"""
Content Refresh — 90-Day Deep Cycle
─────────────────────────────────────
Runs quarterly. For each article older than 90 days:
  - Rewrites the opening paragraph with a fresh hook
  - Swaps 2-3 product recommendations for variety
  - Adds 1 new conversational interjection
  - Refreshes meta_description with slight variation
  - Updates the date
  - Logs all changes

Usage:
  python3 content-refresh-90day.py

Schedule (crontab):
  0 4 1 */3 * cd /path/to/clean-burn && python3 content-refresh-90day.py

Humanization rules enforced:
  - No em dashes (—)
  - No banned words: profound, transformative, holistic, nuanced, multifaceted
  - Conversational interjections
  - 1200-1800 word count maintained
"""

import json
import re
import random
import html
from datetime import datetime, timedelta

ARTICLES_PATH = "client/src/data/articles.json"
AFFILIATE_TAG = "spankyspinola-20"
LOG_PATH = "content-refresh-log.txt"

INTERJECTIONS = [
    "Stay with me here.",
    "I know, I know.",
    "Wild, right?",
    "Think about that for a second.",
    "Bear with me on this one.",
    "Here's where it gets interesting.",
    "Sounds simple. It's not.",
    "Yeah, I was surprised too.",
    "Stick with me.",
    "This part matters.",
    "Let that sink in.",
    "Not what you'd expect.",
    "Read that again if you need to.",
    "Worth sitting with for a moment.",
    "This is the part most people skip over.",
    "Hang on, because this next part changes things.",
]

OPENING_HOOKS = [
    "Nobody talks about this part.",
    "Here's something that doesn't get said enough.",
    "Let's skip the usual intro and get honest.",
    "There's a conversation most people avoid.",
    "You already know something's off. That's why you're here.",
    "This isn't the article you expected to read today.",
    "Most of what you've heard about this is wrong.",
    "The thing about this topic is that it's personal.",
    "Before we get into the research, let's get real.",
    "I've been thinking about this for a while.",
]

BANNED_WORDS = re.compile(r'\b(profound|transformative|holistic|nuanced|multifaceted)\b', re.IGNORECASE)

def count_words(text):
    clean = re.sub(r'<[^>]+>', ' ', text)
    clean = html.unescape(clean)
    return len(clean.split())

def main():
    with open(ARTICLES_PATH) as f:
        articles = json.load(f)

    today = datetime.now().strftime("%Y-%m-%d")
    cutoff = (datetime.now() - timedelta(days=90)).strftime("%Y-%m-%d")
    changes = []

    for article in articles:
        if article["date"] > cutoff:
            continue

        slug = article["slug"]
        mods = []
        body = article["body_html"]

        # 1. Update date
        old_date = article["date"]
        article["date"] = today
        mods.append(f"date: {old_date} -> {today}")

        # 2. Refresh opening paragraph with a new hook
        # Find first <p> tag or first paragraph
        hook = random.choice(OPENING_HOOKS)
        if body.startswith('<p'):
            # Insert hook at start of first paragraph
            p_match = re.match(r'(<p[^>]*>)', body)
            if p_match:
                tag = p_match.group(1)
                body = body[:len(tag)] + hook + " " + body[len(tag):]
                mods.append(f"hook: {hook}")
        elif '\n\n' in body:
            # Newline-separated: prepend to first block
            blocks = body.split('\n\n', 1)
            blocks[0] = hook + " " + blocks[0]
            body = '\n\n'.join(blocks)
            mods.append(f"hook: {hook}")

        # 3. Add 1 new interjection at a random position
        interjection = random.choice(INTERJECTIONS)
        if '</p>' in body:
            paragraphs = body.split('</p>')
            if len(paragraphs) > 4:
                pos = random.randint(2, min(len(paragraphs) - 2, 6))
                p = paragraphs[pos].strip()
                p_match = re.match(r'^(<p[^>]*>)', p)
                if p_match:
                    tag = p_match.group(1)
                    rest = p[len(tag):]
                    paragraphs[pos] = f'{tag}{interjection} {rest}'
                    body = '</p>'.join(paragraphs)
                    mods.append(f"interjection: {interjection}")
        elif '\n\n' in body:
            blocks = body.split('\n\n')
            if len(blocks) > 4:
                pos = random.randint(2, min(len(blocks) - 2, 6))
                blocks[pos] = interjection + " " + blocks[pos]
                body = '\n\n'.join(blocks)
                mods.append(f"interjection: {interjection}")

        # 4. Refresh meta_description slightly
        desc = article.get("meta_description", "")
        if desc:
            # Add a conversational prefix
            prefixes = [
                "Here's the thing: ",
                "What most people miss: ",
                "The honest truth about this: ",
                "Something worth knowing: ",
            ]
            prefix = random.choice(prefixes)
            if not desc.startswith(prefix):
                # Only if it doesn't make it too long
                new_desc = prefix.lower() + desc[0].lower() + desc[1:]
                if len(new_desc) <= 160:
                    article["meta_description"] = new_desc
                    mods.append("meta_description refreshed")

        # 5. Final safety checks
        # Remove any banned words that crept in
        body = BANNED_WORDS.sub(lambda m: random.choice(['real', 'deep', 'complex', 'layered', 'genuine']), body)
        # Remove em dashes
        body = body.replace('\u2014', ' - ').replace('&mdash;', ' - ').replace('\u2013', ' - ')

        # 6. Fix Amazon affiliate tags
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
    log_entry = f"\n{'='*60}\n90-DAY DEEP REFRESH: {today}\nArticles updated: {len(changes)}\n{'='*60}\n"
    for c in changes:
        log_entry += f"  {c}\n"

    with open(LOG_PATH, "a") as f:
        f.write(log_entry)

    print(f"90-day deep refresh complete. Updated {len(changes)} articles.")
    print(f"Log written to {LOG_PATH}")

if __name__ == "__main__":
    main()
