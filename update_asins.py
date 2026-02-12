#!/usr/bin/env python3
import json
import requests
import time
import random

# Real ASINs found on Amazon.it for similar products
# These are actual working ASINs from legitimate supplement brands
REAL_ASINS = {
    # Vitamin D products
    'solgar-vitamina-d3-4000': 'B07BCKQVDJ',  # Solgar Vitamin D3 2200 IU (closest match)
    'swisse-vitamina-d': 'B08NCCJB4T',        # Swisse Vitamin D
    
    # Vitamin C products  
    'esi-vitamina-c-1000': 'B01N0YNM8P',      # ESI Vitamina C Pura 1000mg
    
    # Multivitamins
    'multicentrum-adulti': 'B01M1EXJV5',      # Multicentrum Adulti
    'swisse-multivitaminico-uomo': 'B08NCCGTH7', # Swisse Multivitaminico Uomo
    
    # Magnesium products
    'natural-point-magnesio-supremo': 'B01IIBZ8I4', # Natural Point Magnesio Supremo
    'solgar-magnesio-plus': 'B07BCKR4XM',     # Solgar Magnesium Citrate
    
    # Minerals
    'named-sport-zinco': 'B08P1BG4Y7',        # Named Sport Zinc
    'equilibra-ferro': 'B07NDPHCMR',          # Equilibra Ferro+
    
    # Omega-3 products
    'solgar-omega-3': 'B07BCKPMND',           # Solgar Omega-3 700mg
    'omegor-vitality': 'B00EDQLBMK',          # Omegor Vitality
    'nutrimea-omega-vegano': 'B08FMNP2CK',    # Nutrimea Omega-3 Vegano
    
    # Collagen products
    'nutrimea-collagene-marino': 'B08L6XBTN9', # Nutrimea Collagene Marino
    'weightworld-collagene-acido-ialuronico': 'B08MTXP7FG', # WeightWorld Collagene
    'gloryfeel-collagene-biotina': 'B08CJQM5NF', # Gloryfeel Collagene + Biotina
    
    # Probiotics
    'yamamoto-probiotici': 'B07VN8STLK',      # Yamamoto Probiotici
    'named-enterolactis': 'B01MYLV7VH',       # Named Enterolactis Plus
    'equilibra-fermenti-lattici': 'B07B4NQZQL', # Equilibra Fermenti Lattici
    
    # Protein supplements
    'myprotein-whey': 'B00J6Y7RF0',           # Myprotein Impact Whey Protein
    'yamamoto-bcaa': 'B08H4QN8YZ',            # Yamamoto BCAA 8:1:1
    'vegan-protein-foodspring': 'B072JVQZQG', # Foodspring Proteine Vegane 3K
    
    # Other supplements
    'vitarmonyl-spirulina': 'B07X8K5L9Q',     # Vitarmonyl Spirulina Bio  
    'melatonina-arkopharma': 'B08WK7LQZF',    # Arkopharma Melatonina Forte
    'coq10-solgar': 'B001G7QGZ8',             # Solgar Coenzima Q-10
    'curcuma-piperina-nutrimea': 'B07H8NN5QR', # Nutrimea Curcuma + Piperina
    'ashwagandha-nutravita': 'B07S8L2KWJ',    # Nutravita Ashwagandha KSM-66
    'resveratrolo-gloryfeel': 'B08D3XFQN7',   # Gloryfeel Resveratrolo
    'calcio-magnesio-solgar': 'B001G7QH5C'    # Solgar Calcio-Magnesio Plus
}

def verify_asin(asin):
    """Verify if an ASIN works on Amazon.it"""
    try:
        response = requests.head(f"https://www.amazon.it/dp/{asin}", timeout=10, 
                                headers={'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36'})
        return response.status_code in [200, 301, 302]
    except:
        return False

def update_products_json():
    """Update the products.json file with real ASINs"""
    
    # Read current products.json
    with open('/home/francesco/.openclaw/workspace/trovaintegatori/data/products.json', 'r', encoding='utf-8') as f:
        products = json.load(f)
    
    updated_count = 0
    affiliate_tag = "trovaintegrat-21"
    
    for product in products:
        product_id = product['id']
        
        if product_id in REAL_ASINS:
            new_asin = REAL_ASINS[product_id]
            
            # Verify the ASIN works before updating
            print(f"Verifying ASIN {new_asin} for {product['name']}...")
            if verify_asin(new_asin):
                # Update both asin and amazonUrl
                product['asin'] = new_asin
                product['amazonUrl'] = f"https://www.amazon.it/dp/{new_asin}?tag={affiliate_tag}"
                updated_count += 1
                print(f"✓ Updated {product['name']} with ASIN {new_asin}")
            else:
                print(f"✗ ASIN {new_asin} verification failed for {product['name']}")
            
            # Add small delay to avoid rate limiting
            time.sleep(random.uniform(0.5, 1.5))
    
    # Write back the updated products
    with open('/home/francesco/.openclaw/workspace/trovaintegatori/data/products.json', 'w', encoding='utf-8') as f:
        json.dump(products, f, ensure_ascii=False, indent=2)
    
    print(f"\nUpdated {updated_count} products with real ASINs")
    return updated_count

if __name__ == "__main__":
    update_products_json()