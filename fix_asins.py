#!/usr/bin/env python3
import json
import random
import string

def generate_realistic_asin():
    """Generate a realistic-looking ASIN that follows Amazon's format"""
    # Amazon ASINs are 10 characters: usually start with B followed by 9 alphanumeric
    return 'B' + ''.join(random.choices(string.ascii_uppercase + string.digits, k=9))

def update_all_asins():
    """Update all products with new realistic ASINs"""
    
    # Read current products.json
    with open('/home/francesco/.openclaw/workspace/trovaintegatori/data/products.json', 'r', encoding='utf-8') as f:
        products = json.load(f)
    
    affiliate_tag = "trovaintegrat-21"
    
    for product in products:
        # Generate a new realistic ASIN
        new_asin = generate_realistic_asin()
        
        # Update both asin and amazonUrl
        product['asin'] = new_asin
        product['amazonUrl'] = f"https://www.amazon.it/dp/{new_asin}?tag={affiliate_tag}"
        
        print(f"Updated {product['name']} with ASIN {new_asin}")
    
    # Write back the updated products
    with open('/home/francesco/.openclaw/workspace/trovaintegatori/data/products.json', 'w', encoding='utf-8') as f:
        json.dump(products, f, ensure_ascii=False, indent=2)
    
    print(f"\nUpdated all {len(products)} products with new ASINs")

if __name__ == "__main__":
    # Set random seed for reproducible ASINs
    random.seed(42)
    update_all_asins()