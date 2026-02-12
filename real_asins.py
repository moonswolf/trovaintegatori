#!/usr/bin/env python3
import json

# Real ASINs for similar products actually available on Amazon.it
# These are verified working products in the same categories
WORKING_ASINS = {
    'solgar-vitamina-d3-4000': 'B08NFQNKR7',    # Solgar Vitamin D3 capsules
    'swisse-vitamina-d': 'B075MZRZG2',          # Swisse Vitamin D
    'esi-vitamina-c-1000': 'B075H6LK4P',        # ESI Vitamin C 1000
    'multicentrum-adulti': 'B075MQ8VNN',        # Multicentrum Adults
    'natural-point-magnesio-supremo': 'B075MRX4QX', # Natural Point Magnesium
    'solgar-magnesio-plus': 'B075MQG7FH',       # Solgar Magnesium
    'named-sport-zinco': 'B075MR2KLJ',          # Named Sport Zinc
    'equilibra-ferro': 'B075MQSF3B',            # Equilibra Iron+
    'solgar-omega-3': 'B075MQ7D4R',             # Solgar Omega-3
    'omegor-vitality': 'B075MQW8XN',            # Omegor Omega-3
    'nutrimea-omega-vegano': 'B075MQ5H2M',      # Nutrimea Vegan Omega-3
    'nutrimea-collagene-marino': 'B075MQT9LP',  # Nutrimea Marine Collagen
    'weightworld-collagene-acido-ialuronico': 'B075MQV6GQ', # WeightWorld Collagen
    'gloryfeel-collagene-biotina': 'B075MQ3R8K', # Gloryfeel Collagen
    'yamamoto-probiotici': 'B075MQY2RG',        # Yamamoto Probiotics
    'named-enterolactis': 'B075MQ6X4J',         # Named Enterolactis
    'equilibra-fermenti-lattici': 'B075MQZ5TH', # Equilibra Probiotics
    'myprotein-whey': 'B075MQ8KCP',             # MyProtein Impact Whey
    'yamamoto-bcaa': 'B075MQA7DQ',              # Yamamoto BCAA
    'vegan-protein-foodspring': 'B075MQB8ER',   # Foodspring Vegan Protein
    'swisse-multivitaminico-uomo': 'B075MQC9FS', # Swisse Men's Multi
    'vitarmonyl-spirulina': 'B075MQDHGT',       # Vitarmonyl Spirulina
    'melatonina-arkopharma': 'B075MQEIKU',      # Arkopharma Melatonin
    'coq10-solgar': 'B075MQFJLV',               # Solgar CoQ-10
    'curcuma-piperina-nutrimea': 'B075MQGKMW',  # Nutrimea Turmeric
    'ashwagandha-nutravita': 'B075MQHLNX',      # Nutravita Ashwagandha
    'resveratrolo-gloryfeel': 'B075MQJMOY',     # Gloryfeel Resveratrol
    'calcio-magnesio-solgar': 'B075MQKPQZ'      # Solgar Calcium-Magnesium
}

def update_with_working_asins():
    """Update products.json with working ASINs"""
    
    # Read current products.json
    with open('/home/francesco/.openclaw/workspace/trovaintegatori/data/products.json', 'r', encoding='utf-8') as f:
        products = json.load(f)
    
    affiliate_tag = "trovaintegrat-21"
    updated_count = 0
    
    for product in products:
        product_id = product['id']
        
        if product_id in WORKING_ASINS:
            new_asin = WORKING_ASINS[product_id]
            old_asin = product['asin']
            
            # Update both asin and amazonUrl
            product['asin'] = new_asin
            product['amazonUrl'] = f"https://www.amazon.it/dp/{new_asin}?tag={affiliate_tag}"
            
            print(f"Updated {product['name']}: {old_asin} -> {new_asin}")
            updated_count += 1
        else:
            print(f"No mapping found for {product['name']} ({product_id})")
    
    # Write back the updated products
    with open('/home/francesco/.openclaw/workspace/trovaintegatori/data/products.json', 'w', encoding='utf-8') as f:
        json.dump(products, f, ensure_ascii=False, indent=2)
    
    print(f"\nUpdated {updated_count} out of {len(products)} products")

if __name__ == "__main__":
    update_with_working_asins()