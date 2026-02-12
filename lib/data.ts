import { Product, Category } from '@/types/product';
import productsData from '@/data/products.json';
import categoriesData from '@/data/categories.json';

export function getProducts(): Product[] {
  return productsData as Product[];
}

export function getCategories(): Category[] {
  return categoriesData as Category[];
}

export function getProductById(id: string): Product | undefined {
  return getProducts().find(product => product.id === id);
}

export function getProductsByCategory(categorySlug: string): Product[] {
  return getProducts().filter(product => product.category === categorySlug);
}

export function getProductsBySubcategory(subcategorySlug: string): Product[] {
  return getProducts().filter(product => product.subcategory === subcategorySlug);
}

export function getCategoryBySlug(slug: string): Category | undefined {
  return getCategories().find(category => category.slug === slug);
}

export function getProductCountByCategory(categorySlug: string): number {
  return getProductsByCategory(categorySlug).length;
}

export function getFeaturedProducts(limit: number = 8): Product[] {
  // Get products with highest ratings and good review counts
  return getProducts()
    .filter(product => product.inStock)
    .sort((a, b) => {
      const scoreA = a.rating * Math.log(a.reviewCount + 1);
      const scoreB = b.rating * Math.log(b.reviewCount + 1);
      return scoreB - scoreA;
    })
    .slice(0, limit);
}

export function getPopularBrands(): string[] {
  const brandCounts = new Map<string, number>();
  
  getProducts().forEach(product => {
    brandCounts.set(product.brand, (brandCounts.get(product.brand) || 0) + 1);
  });

  return Array.from(brandCounts.entries())
    .sort((a, b) => b[1] - a[1])
    .map(([brand]) => brand)
    .slice(0, 10);
}

export function searchProducts(query: string): Product[] {
  const searchTerms = query.toLowerCase().split(' ');
  
  return getProducts().filter(product => {
    const searchableText = [
      product.name,
      product.brand,
      product.description,
      product.composition,
      ...product.highlights
    ].join(' ').toLowerCase();

    return searchTerms.every(term => searchableText.includes(term));
  });
}

export function getSimilarProducts(productId: string, limit: number = 4): Product[] {
  const product = getProductById(productId);
  if (!product) return [];

  // Get products from same category/subcategory, exclude current product
  return getProducts()
    .filter(p => 
      p.id !== productId && 
      (p.category === product.category || p.subcategory === product.subcategory)
    )
    .sort((a, b) => {
      // Prioritize same subcategory, then same brand
      if (a.subcategory === product.subcategory && b.subcategory !== product.subcategory) return -1;
      if (b.subcategory === product.subcategory && a.subcategory !== product.subcategory) return 1;
      
      if (a.brand === product.brand && b.brand !== product.brand) return -1;
      if (b.brand === product.brand && a.brand !== product.brand) return 1;
      
      // Then by rating
      return b.rating - a.rating;
    })
    .slice(0, limit);
}