#!/usr/bin/env python3
"""
Amazon Product Image Scraper
Fetches real product images from Amazon.it and updates products.json
"""

import json
import re
import time
import requests
from urllib.parse import urljoin

# Configuration
USER_AGENT = "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36"
HEADERS = {
    "User-Agent": USER_AGENT,
    "Accept-Language": "it-IT,it;q=0.9",
    "Accept": "text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,*/*;q=0.8",
    "Accept-Encoding": "gzip, deflate, br",
    "DNT": "1",
    "Connection": "keep-alive",
    "Upgrade-Insecure-Requests": "1",
}

def extract_amazon_image_url(html_content):
    """Extract the main product image URL from Amazon HTML"""
    # Pattern for Amazon product images
    patterns = [
        r'https://m\.media-amazon\.com/images/I/[^"]*\._AC_[^"]*\.jpg',
        r'https://images-na\.ssl-images-amazon\.com/images/I/[^"]*\._AC_[^"]*\.jpg',
        r'https://m\.media-amazon\.com/images/I/[^"]*\.jpg',
    ]
    
    for pattern in patterns:
        matches = re.findall(pattern, html_content)
        if matches:
            # Get the first match and convert to large size
            image_url = matches[0]
            # Replace size suffix with _AC_SL500_ for large image
            image_url = re.sub(r'\._AC_[^\.]*\.jpg', '._AC_SL500_.jpg', image_url)
            return image_url
    
    # Fallback: try to find any Amazon image URL
    general_pattern = r'"(https://[^"]*amazon[^"]*\.jpg)"'
    matches = re.findall(general_pattern, html_content)
    if matches:
        for match in matches:
            if 'images/I/' in match:
                # Convert to large size
                large_url = re.sub(r'\._AC_[^\.]*\.jpg', '._AC_SL500_.jpg', match)
                return large_url
    
    return None

def verify_image_url(url):
    """Verify that the image URL returns HTTP 200"""
    try:
        response = requests.head(url, headers=HEADERS, timeout=10)
        return response.status_code == 200
    except:
        return False

def fetch_amazon_product_image(asin):
    """Fetch the main product image URL for an Amazon ASIN"""
    url = f"https://www.amazon.it/dp/{asin}"
    
    try:
        print(f"Fetching {asin}... ", end="", flush=True)
        response = requests.get(url, headers=HEADERS, timeout=15)
        
        if response.status_code != 200:
            print(f"❌ HTTP {response.status_code}")
            return None
        
        # Extract image URL
        image_url = extract_amazon_image_url(response.text)
        
        if image_url:
            # Verify the image URL works
            if verify_image_url(image_url):
                print(f"✅ Found image")
                return image_url
            else:
                print(f"⚠️  Image URL not accessible")
                return None
        else:
            print(f"❌ No image found")
            return None
            
    except Exception as e:
        print(f"❌ Error: {e}")
        return None

def main():
    """Main function to scrape Amazon images and update products.json"""
    
    # Load products
    print("Loading products.json...")
    with open('data/products.json', 'r', encoding='utf-8') as f:
        products = json.load(f)
    
    print(f"Found {len(products)} products")
    
    # Counter for statistics
    updated = 0
    skipped = 0
    errors = 0
    
    # Process each product
    for i, product in enumerate(products, 1):
        asin = product.get('asin')
        current_image = product.get('imageUrl', '')
        
        print(f"\n[{i}/{len(products)}] {product.get('name', 'Unknown')[:60]}...")
        
        # Skip if no ASIN
        if not asin:
            print("❌ No ASIN found")
            errors += 1
            continue
        
        # Skip if already has real image (not placeholder)
        if current_image and not current_image.endswith('placeholder.svg'):
            print(f"⏭️  Already has image: {current_image}")
            skipped += 1
            continue
        
        # Fetch the image
        image_url = fetch_amazon_product_image(asin)
        
        if image_url:
            product['imageUrl'] = image_url
            updated += 1
        else:
            errors += 1
        
        # Sleep to avoid rate limiting
        time.sleep(1.5)
        
        # Save progress every 10 products
        if i % 10 == 0:
            print(f"\n💾 Saving progress... (Updated: {updated}, Skipped: {skipped}, Errors: {errors})")
            with open('data/products.json', 'w', encoding='utf-8') as f:
                json.dump(products, f, indent=2, ensure_ascii=False)
    
    # Save final results
    print(f"\n💾 Saving final results...")
    with open('data/products.json', 'w', encoding='utf-8') as f:
        json.dump(products, f, indent=2, ensure_ascii=False)
    
    # Print statistics
    print(f"\n📊 Final Statistics:")
    print(f"   ✅ Updated: {updated}")
    print(f"   ⏭️  Skipped: {skipped}")
    print(f"   ❌ Errors: {errors}")
    print(f"   📊 Total: {len(products)}")
    
    print(f"\n🎉 Script completed!")

if __name__ == "__main__":
    main()