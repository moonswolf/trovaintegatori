#!/usr/bin/env python3
"""
TrovaIntegratori Price Tracker
Scrapes current prices from Amazon.it, updates products.json,
stores price history, and sends Telegram alerts on price drops.
"""

import json, re, time, os, sys
from datetime import datetime
from urllib.request import Request, urlopen
from urllib.parse import quote

UA = "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36"
SCRIPT_DIR = os.path.dirname(os.path.abspath(__file__))
PROJECT_DIR = os.path.dirname(SCRIPT_DIR)
PRODUCTS_FILE = os.path.join(PROJECT_DIR, "data", "products.json")
HISTORY_FILE = os.path.join(PROJECT_DIR, "data", "price-history.json")

TELEGRAM_BOT_TOKEN = os.environ.get("TELEGRAM_BOT_TOKEN", "")
TELEGRAM_CHANNEL = os.environ.get("TELEGRAM_CHANNEL", "@trovaintegratori")
AFFILIATE_TAG = "trovaintegrat-21"
DROP_THRESHOLD = 0.05  # 5% price drop triggers alert


def fetch_product_data(asin):
    """Scrape product data from Amazon.it"""
    try:
        url = f"https://www.amazon.it/dp/{asin}"
        req = Request(url, headers={
            "User-Agent": UA,
            "Accept-Language": "it-IT,it;q=0.9"
        })
        html = urlopen(req, timeout=15).read().decode("utf-8", errors="ignore")
        data = {}

        # Title
        m = re.search(r'id="productTitle"[^>]*>\s*([^<]+)', html)
        if m:
            data["title"] = m.group(1).strip()

        # Price
        whole = re.search(r'class="a-price-whole">([^<]+)', html)
        frac = re.search(r'class="a-price-fraction">([^<]+)', html)
        if whole and frac:
            price_str = whole.group(1).replace(",", "").replace(".", "") + "." + frac.group(1)
            try:
                data["price"] = float(price_str)
            except ValueError:
                pass

        # Rating
        m = re.search(r'class="a-icon-alt">([0-9],[0-9]) su 5', html)
        if m:
            data["rating"] = float(m.group(1).replace(",", "."))

        # Review count
        m = re.search(r'id="acrCustomerReviewText"[^>]*>\(?([0-9.]+)\)?', html)
        if m:
            data["reviewCount"] = int(m.group(1).replace(".", ""))

        # Image
        imgs = re.findall(r'https://m\.media-amazon\.com/images/I/[^"]+?\._AC_[^"]+?\.jpg', html)
        if imgs:
            img_url = re.sub(r'\._AC_[^.]+\.', '._AC_SL500_.', imgs[0])
            data["imageUrl"] = img_url

        return data
    except Exception as e:
        return {"error": str(e)}


def send_telegram(text, photo_url=None):
    """Send message to Telegram channel, with photo if available"""
    try:
        if photo_url and photo_url.startswith("http"):
            url = f"https://api.telegram.org/bot{TELEGRAM_BOT_TOKEN}/sendPhoto"
            payload = json.dumps({
                "chat_id": TELEGRAM_CHANNEL,
                "photo": photo_url,
                "caption": text,
                "parse_mode": "HTML"
            }).encode("utf-8")
        else:
            url = f"https://api.telegram.org/bot{TELEGRAM_BOT_TOKEN}/sendMessage"
            payload = json.dumps({
                "chat_id": TELEGRAM_CHANNEL,
                "text": text,
                "parse_mode": "HTML",
                "disable_web_page_preview": False
            }).encode("utf-8")
        req = Request(url, data=payload, headers={"Content-Type": "application/json"})
        urlopen(req, timeout=10)
        return True
    except Exception as e:
        print(f"  Telegram error: {e}")
        return False


def main():
    today = datetime.now().strftime("%Y-%m-%d")
    print(f"=== TrovaIntegratori Price Update — {today} ===\n")

    # Load products
    with open(PRODUCTS_FILE, "r") as f:
        products = json.load(f)

    # Load price history
    if os.path.exists(HISTORY_FILE):
        with open(HISTORY_FILE, "r") as f:
            history = json.load(f)
    else:
        history = {}

    alerts = []
    updated = 0

    for i, p in enumerate(products):
        asin = p["asin"]
        old_price = p.get("price", 0)
        print(f"[{i+1}/{len(products)}] {p['name'][:50]}... ({asin})", flush=True)

        data = fetch_product_data(asin)

        if "price" in data:
            new_price = data["price"]
            p["price"] = new_price
            p["lastUpdated"] = today

            if "rating" in data:
                p["rating"] = data["rating"]
            if "reviewCount" in data:
                p["reviewCount"] = data["reviewCount"]
            if "imageUrl" in data:
                p["imageUrl"] = data["imageUrl"]

            # Store in history
            if asin not in history:
                history[asin] = {"name": p["name"], "prices": []}
            history[asin]["prices"].append({
                "date": today,
                "price": new_price
            })
            # Keep last 90 days
            history[asin]["prices"] = history[asin]["prices"][-90:]

            # Check for price drop
            if old_price > 0 and new_price < old_price:
                drop_pct = (old_price - new_price) / old_price
                if drop_pct >= DROP_THRESHOLD:
                    alerts.append({
                        "name": p["name"],
                        "old_price": old_price,
                        "new_price": new_price,
                        "drop_pct": drop_pct,
                        "url": p["amazonUrl"],
                        "imageUrl": p.get("imageUrl", "")
                    })
                    print(f"  🔻 PRICE DROP: €{old_price:.2f} → €{new_price:.2f} (-{drop_pct*100:.0f}%)")

            print(f"  ✅ €{new_price:.2f} (was €{old_price:.2f})")
            updated += 1
        else:
            print(f"  ❌ No data: {data.get('error', 'unknown')}")

        time.sleep(1.5)

    # Save updated products
    with open(PRODUCTS_FILE, "w") as f:
        json.dump(products, f, indent=2, ensure_ascii=False)

    # Save price history
    with open(HISTORY_FILE, "w") as f:
        json.dump(history, f, indent=2, ensure_ascii=False)

    print(f"\n✅ Updated {updated}/{len(products)} products")

    # Send Telegram alerts for price drops
    if alerts:
        print(f"\n🔔 Sending {len(alerts)} price drop alerts...")
        for a in alerts:
            text = (
                f"📉 <b>Prezzo in calo!</b>\n\n"
                f"<b>{a['name'][:60]}</b>\n"
                f"💰 <s>€{a['old_price']:.2f}</s> → <b>€{a['new_price']:.2f}</b> "
                f"(-{a['drop_pct']*100:.0f}%)\n\n"
                f"🛒 <a href=\"{a['url']}\">Acquista su Amazon</a>"
            )
            send_telegram(text, a.get("imageUrl"))
            time.sleep(0.5)
    else:
        print("\nNessun calo di prezzo significativo rilevato.")

    print("\nDone!")


if __name__ == "__main__":
    main()
