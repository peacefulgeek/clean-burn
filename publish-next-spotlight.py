#!/usr/bin/env python3
"""
Publish Next Product Spotlight Article
───────────────────────────────────────
Run every Saturday (manually or via cron) to:
  1. Pick the next unpublished spotlight from the queue
  2. Generate hero image via FAL.ai
  3. Generate OG image via PIL
  4. Upload both to Bunny CDN
  5. Append the article to articles.json with today's date

Usage:
  python3 publish-next-spotlight.py

Cron (every Saturday 6 AM UTC):
  0 6 * * 6 cd /path/to/clean-burn && python3 publish-next-spotlight.py >> /var/log/spotlight-cron.log 2>&1

All credentials are in-code. No env vars needed.
"""

import json
import os
import sys
import time
import requests
from io import BytesIO
from datetime import datetime

try:
    from PIL import Image, ImageDraw, ImageFont
except ImportError:
    print("Installing Pillow...")
    os.system("pip3 install Pillow")
    from PIL import Image, ImageDraw, ImageFont

# ── Config ──
BUNNY_STORAGE_ZONE = "clean-burn"
BUNNY_STORAGE_HOST = "ny.storage.bunnycdn.com"
BUNNY_ACCESS_KEY = "518477f6-0581-4a01-98b6bbf6a63e-7d7e-4e50"
BUNNY_CDN_BASE = "https://clean-burn.b-cdn.net"
AFFILIATE_TAG = "spankyspinola-20"

SCRIPT_DIR = os.path.dirname(os.path.abspath(__file__))
ARTICLES_PATH = os.path.join(SCRIPT_DIR, "client/src/data/articles.json")

# FAL.ai - uses the same key as generate-images.py
FAL_API_KEY = os.environ.get("FAL_KEY", "")

# ── Spotlight Queue ──
# Each dict is a complete article ready to publish.
# Order matters - first unpublished one gets picked.
SPOTLIGHT_QUEUE = [
    {
        "title": "Why a Weighted Blanket Became My Secret Weapon Against Evening Urges",
        "slug": "weighted-blanket-recovery-review",
        "category_slug": "the-recovery",
        "category_name": "The Recovery",
        "reading_time": 9,
        "meta_description": "How a 20-pound weighted blanket transformed my evenings from the most vulnerable time in recovery to the most restorative. An honest review.",
        "meta_keywords": "weighted blanket, anxiety relief, evening urges, recovery tools, deep pressure stimulation, nervous system regulation",
        "image_description": "A dark weighted blanket draped over a couch in a dimly lit room with warm amber lamplight. A cup of tea sits on a side table. The scene is cozy, safe, and grounding.",
        "image_alt": "A weighted blanket draped over a couch in warm lamplight.",
        "faq_count": 3,
        "opener_type": "personal",
        "backlink_type": "product",
        "conclusion_type": "actionable",
        "has_lived_experience": True,
        "named_refs_used": "Matthew Walker",
        "kalesh_phrases_used": "24, 29",
        "cross_links": ["how-to-navigate-recovery-with-depression", "the-vagus-nerve-connection-to-compulsive-behavior", "how-sleep-deprivation-fuels-relapse"],
        "amazon_asin": "B0C1LBMZ5G",
    },
    {
        "title": "The Journal That Actually Works: Why I Recommend the Five Minute Journal for Recovery",
        "slug": "five-minute-journal-recovery-review",
        "category_slug": "the-return",
        "category_name": "The Return",
        "reading_time": 8,
        "meta_description": "An honest review of the Five Minute Journal and why structured gratitude practice became an essential part of my recovery from compulsive behavior.",
        "meta_keywords": "five minute journal, gratitude journal, recovery journaling, morning routine, positive psychology, habit formation, recovery tools",
        "image_description": "An open journal with a pen resting on it, placed on a clean wooden desk next to a small plant. Soft natural morning light illuminates the pages. The scene is simple, intentional, and hopeful.",
        "image_alt": "An open journal with a pen on a wooden desk in morning light.",
        "faq_count": 3,
        "opener_type": "personal",
        "backlink_type": "product",
        "conclusion_type": "tender",
        "has_lived_experience": True,
        "named_refs_used": "Robert Emmons",
        "kalesh_phrases_used": "31, 40",
        "cross_links": ["how-to-rewire-your-morning-brain", "the-neuroscience-of-willpower-and-why-it-fails", "how-to-retrain-your-arousal-response"],
        "amazon_asin": "B0B2HR3PMV",
    },
    {
        "title": "Blue Light Blocking Glasses: A Small Change That Made a Real Difference in My Recovery",
        "slug": "blue-light-glasses-recovery-review",
        "category_slug": "the-rewire",
        "category_name": "The Rewire",
        "reading_time": 8,
        "meta_description": "How blue light blocking glasses improved my sleep, reduced evening screen cravings, and became an unexpected tool in my recovery from compulsive porn use.",
        "meta_keywords": "blue light glasses, sleep improvement, screen time, melatonin, circadian rhythm, recovery tools, evening routine",
        "image_description": "A pair of amber-tinted glasses resting on a dark wooden surface next to a closed laptop, with warm evening light in the background. The scene suggests winding down and intentional rest.",
        "image_alt": "Amber-tinted blue light blocking glasses on a desk next to a closed laptop.",
        "faq_count": 3,
        "opener_type": "gut-punch",
        "backlink_type": "product",
        "conclusion_type": "actionable",
        "has_lived_experience": True,
        "named_refs_used": "Matthew Walker, Andrew Huberman",
        "kalesh_phrases_used": "29, 40",
        "cross_links": ["how-sleep-deprivation-fuels-relapse", "how-to-rewire-your-morning-brain", "the-neuroscience-of-willpower-and-why-it-fails"],
        "amazon_asin": "B0BVD2JY5B",
    },
    {
        "title": "Breathwork Trainer Review: The Tool That Taught Me to Breathe Through Urges",
        "slug": "breathwork-trainer-device-review",
        "category_slug": "the-rewire",
        "category_name": "The Rewire",
        "reading_time": 9,
        "meta_description": "An honest review of using a respiratory trainer for breathwork practice in addiction recovery - how controlled breathing became my most reliable urge management tool.",
        "meta_keywords": "breathwork trainer, respiratory training, urge management, vagus nerve, breathwork recovery, parasympathetic activation, breathing exercises",
        "image_description": "A small breathing trainer device resting on a meditation cushion in a calm, minimalist room. Soft natural light filters through sheer curtains. The scene conveys stillness and intentional practice.",
        "image_alt": "A breathing trainer device on a meditation cushion in soft natural light.",
        "faq_count": 3,
        "opener_type": "personal",
        "backlink_type": "product",
        "conclusion_type": "tender",
        "has_lived_experience": True,
        "named_refs_used": "Stephen Porges, Andrew Huberman",
        "kalesh_phrases_used": "24, 29, 40",
        "cross_links": ["the-vagus-nerve-connection-to-compulsive-behavior", "how-to-retrain-your-arousal-response", "how-to-rewire-your-morning-brain"],
        "amazon_asin": "B0CJKL5VFQ",
    },
]

# ── Body HTML for each spotlight (keyed by slug) ──
# The full body_html is stored in the TS module; here we reference the same content.
# For the cron to work standalone, the body_html is loaded from the TS file at runtime.
# This keeps the Python script lean while the TS module is the single source of truth.


def upload_to_bunny(data, remote_path, content_type="image/webp"):
    """Upload file data to Bunny CDN storage."""
    url = f"https://{BUNNY_STORAGE_HOST}/{BUNNY_STORAGE_ZONE}/{remote_path}"
    headers = {"AccessKey": BUNNY_ACCESS_KEY, "Content-Type": content_type}
    resp = requests.put(url, data=data, headers=headers, timeout=60)
    resp.raise_for_status()
    return f"{BUNNY_CDN_BASE}/{remote_path}"


def generate_og_image(title, category, width=1200, height=630):
    """Generate OG image with article title overlay using PIL."""
    img = Image.new("RGB", (width, height), color=(20, 18, 16))
    draw = ImageDraw.Draw(img)

    # Gold accent bar at top
    draw.rectangle([(0, 0), (width, 6)], fill=(255, 179, 71))

    # Category pill
    cat_text = category.upper()
    try:
        font_small = ImageFont.truetype("/usr/share/fonts/truetype/dejavu/DejaVuSans.ttf", 20)
        font_large = ImageFont.truetype("/usr/share/fonts/truetype/dejavu/DejaVuSans-Bold.ttf", 42)
        font_site = ImageFont.truetype("/usr/share/fonts/truetype/dejavu/DejaVuSans.ttf", 24)
    except Exception:
        font_small = ImageFont.load_default()
        font_large = ImageFont.load_default()
        font_site = ImageFont.load_default()

    draw.rectangle([(60, 200), (60 + len(cat_text) * 14 + 40, 240)], fill=(255, 179, 71))
    draw.text((80, 205), cat_text, fill=(20, 18, 16), font=font_small)

    # Title... word wrap
    words = title.split()
    lines = []
    current_line = ""
    for word in words:
        test_line = f"{current_line} {word}".strip()
        bbox = draw.textbbox((0, 0), test_line, font=font_large)
        if bbox[2] - bbox[0] > width - 120:
            lines.append(current_line)
            current_line = word
        else:
            current_line = test_line
    if current_line:
        lines.append(current_line)

    y = 270
    for line in lines[:3]:
        draw.text((60, y), line, fill=(255, 255, 255), font=font_large)
        y += 55

    # Site name
    draw.text((60, height - 80), "The Clean Burn", fill=(150, 150, 150), font=font_site)
    draw.text((60, height - 50), "cleanburn.love", fill=(100, 100, 100), font=font_small)

    # Bottom gold bar
    draw.rectangle([(0, height - 6), (width, height)], fill=(255, 179, 71))

    buffer = BytesIO()
    img.save(buffer, format="PNG", optimize=True)
    buffer.seek(0)
    return buffer.read()


def extract_body_html_from_ts(slug):
    """Extract body_html for a given slug from the TS spotlight queue module."""
    ts_path = os.path.join(SCRIPT_DIR, "client/src/lib/weekly-spotlight-cron.ts")
    if not os.path.exists(ts_path):
        return None

    with open(ts_path, "r") as f:
        content = f.read()

    # Find the slug in the TS file and extract its body_html
    marker = f'slug: "{slug}"'
    idx = content.find(marker)
    if idx == -1:
        return None

    # Find body_html after this slug
    bh_start = content.find("body_html: `", idx)
    if bh_start == -1:
        return None
    bh_start += len("body_html: `")
    bh_end = content.find("`,", bh_start)
    if bh_end == -1:
        return None

    return content[bh_start:bh_end]


def main():
    today = datetime.utcnow().strftime("%Y-%m-%d")
    print(f"[spotlight] {today} - Checking for next spotlight to publish...")

    # Load existing articles
    with open(ARTICLES_PATH, "r") as f:
        articles = json.load(f)

    existing_slugs = {a["slug"] for a in articles}

    # Find next unpublished spotlight
    next_spot = None
    for spot in SPOTLIGHT_QUEUE:
        if spot["slug"] not in existing_slugs:
            next_spot = spot
            break

    if not next_spot:
        print("[spotlight] All spotlights in queue are published. Add more to SPOTLIGHT_QUEUE.")
        return

    slug = next_spot["slug"]
    print(f"[spotlight] Publishing: {next_spot['title']}")

    # Extract body_html from TS module
    body_html = extract_body_html_from_ts(slug)
    if not body_html:
        print(f"[spotlight] ERROR: Could not extract body_html for {slug} from TS module.")
        sys.exit(1)

    # Generate OG image and upload to Bunny
    print(f"[spotlight] Generating OG image...")
    og_data = generate_og_image(next_spot["title"], next_spot["category_name"])
    og_url = upload_to_bunny(og_data, f"v5og/{slug}.png", "image/png")
    print(f"[spotlight] OG uploaded: {og_url}")

    # For hero image: use a placeholder from the existing CDN or generate via FAL
    # If FAL_KEY is available, generate; otherwise use a category-appropriate existing image
    hero_url = f"{BUNNY_CDN_BASE}/v5/{slug}.webp"

    if FAL_API_KEY:
        print(f"[spotlight] Generating hero image via FAL.ai...")
        try:
            prompt = f"Editorial photography style, luminous warm lighting, no text, no words, no letters: {next_spot['image_description']}"
            fal_url = "https://queue.fal.run/fal-ai/flux/schnell"
            headers = {"Authorization": f"Key {FAL_API_KEY}", "Content-Type": "application/json"}
            payload = {
                "prompt": prompt,
                "image_size": {"width": 1200, "height": 675},
                "num_inference_steps": 4,
                "num_images": 1,
                "enable_safety_checker": True,
            }
            resp = requests.post(fal_url, json=payload, headers=headers, timeout=120)
            resp.raise_for_status()
            data = resp.json()
            if "images" in data and len(data["images"]) > 0:
                img_resp = requests.get(data["images"][0]["url"], timeout=60)
                img_resp.raise_for_status()
                img = Image.open(BytesIO(img_resp.content))
                if img.mode == "RGBA":
                    img = img.convert("RGB")
                buffer = BytesIO()
                img.save(buffer, format="WEBP", quality=82)
                buffer.seek(0)
                hero_url = upload_to_bunny(buffer.read(), f"v5/{slug}.webp")
                print(f"[spotlight] Hero uploaded: {hero_url}")
        except Exception as e:
            print(f"[spotlight] WARNING: FAL.ai generation failed ({e}), using placeholder hero URL")
    else:
        print(f"[spotlight] No FAL_KEY set - hero image must be uploaded manually to: {hero_url}")

    # Build the article object
    article = {
        "title": next_spot["title"],
        "slug": slug,
        "category_slug": next_spot["category_slug"],
        "category_name": next_spot["category_name"],
        "date": today,
        "reading_time": next_spot["reading_time"],
        "meta_description": next_spot["meta_description"],
        "meta_keywords": next_spot["meta_keywords"],
        "image_description": next_spot["image_description"],
        "image_alt": next_spot["image_alt"],
        "body_html": body_html,
        "hero_url": hero_url,
        "og_url": og_url,
        "faq_count": next_spot["faq_count"],
        "opener_type": next_spot["opener_type"],
        "backlink_type": next_spot["backlink_type"],
        "conclusion_type": next_spot["conclusion_type"],
        "has_lived_experience": next_spot["has_lived_experience"],
        "named_refs_used": next_spot["named_refs_used"],
        "kalesh_phrases_used": next_spot["kalesh_phrases_used"],
        "cross_links": next_spot["cross_links"],
    }

    # Append and save
    articles.append(article)
    with open(ARTICLES_PATH, "w") as f:
        json.dump(articles, f, ensure_ascii=False)

    print(f"[spotlight] ✓ Published '{next_spot['title']}' ({slug}) dated {today}")
    print(f"[spotlight] Total articles: {len(articles)}")
    print(f"[spotlight] Remaining in queue: {sum(1 for s in SPOTLIGHT_QUEUE if s['slug'] not in existing_slugs) - 1}")


if __name__ == "__main__":
    main()
