import type { MetadataRoute } from 'next';
import { getProducts, getCategories } from '@/lib/data';
import { getAllPosts } from '@/lib/blog';
import comparisons from '@/data/comparisons.json';

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = 'https://trovaintegratori.it';
  const products = getProducts();
  const categories = getCategories();

  // Static pages
  const staticPages = [
    {
      url: baseUrl,
      lastModified: new Date(),
      changeFrequency: 'daily' as const,
      priority: 1,
    },
    {
      url: `${baseUrl}/confronta`,
      lastModified: new Date(),
      changeFrequency: 'weekly' as const,
      priority: 0.9,
    },
    {
      url: `${baseUrl}/come-funziona`,
      lastModified: new Date(),
      changeFrequency: 'monthly' as const,
      priority: 0.7,
    },
    {
      url: `${baseUrl}/chi-siamo`,
      lastModified: new Date(),
      changeFrequency: 'monthly' as const,
      priority: 0.6,
    },
    {
      url: `${baseUrl}/contatti`,
      lastModified: new Date(),
      changeFrequency: 'monthly' as const,
      priority: 0.6,
    },
    {
      url: `${baseUrl}/categorie`,
      lastModified: new Date(),
      changeFrequency: 'weekly' as const,
      priority: 0.9,
    },
  ];

  // Category pages
  const categoryPages = categories.map((category) => ({
    url: `${baseUrl}/categoria/${category.slug}`,
    lastModified: new Date(),
    changeFrequency: 'weekly' as const,
    priority: 0.8,
  }));

  // Product pages
  const productPages = products.map((product) => ({
    url: `${baseUrl}/prodotto/${product.id}`,
    lastModified: new Date(product.lastUpdated),
    changeFrequency: 'weekly' as const,
    priority: 0.7,
  }));

  // Comparison index
  const comparisonIndex = [{
    url: `${baseUrl}/confronto`,
    lastModified: new Date(),
    changeFrequency: 'weekly' as const,
    priority: 0.8,
  }];

  // Comparison pages
  const comparisonPages = comparisons.map((c) => ({
    url: `${baseUrl}/confronto/${c.slug}`,
    lastModified: new Date(),
    changeFrequency: 'monthly' as const,
    priority: 0.8,
  }));

  // Blog pages
  const posts = getAllPosts();
  const blogIndex = [{
    url: `${baseUrl}/blog`,
    lastModified: new Date(),
    changeFrequency: 'weekly' as const,
    priority: 0.8,
  }];
  const blogPages = posts.map((post) => ({
    url: `${baseUrl}/blog/${post.slug}`,
    lastModified: new Date(post.date),
    changeFrequency: 'monthly' as const,
    priority: 0.7,
  }));

  // Blog tag pages
  const tagSet = new Set<string>();
  posts.forEach(p => p.tags.forEach(t => tagSet.add(t)));
  const tagPages = Array.from(tagSet).map(tag => ({
    url: `${baseUrl}/blog/tag/${encodeURIComponent(tag)}`,
    lastModified: new Date(),
    changeFrequency: 'weekly' as const,
    priority: 0.5,
  }));

  return [...staticPages, ...blogIndex, ...blogPages, ...tagPages, ...comparisonIndex, ...comparisonPages, ...categoryPages, ...productPages];
}