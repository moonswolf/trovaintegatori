import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import { getProductById } from './data';
import { Product } from '@/types/product';

export interface BlogPost {
  title: string;
  slug: string;
  date: string;
  category: string;
  excerpt: string;
  tags: string[];
  relatedProducts: string[];
  content: string;
}

const blogDir = path.join(process.cwd(), 'content/blog');

export function getAllPosts(): BlogPost[] {
  if (!fs.existsSync(blogDir)) return [];
  
  const files = fs.readdirSync(blogDir).filter(f => f.endsWith('.md'));
  
  return files
    .map(filename => {
      const raw = fs.readFileSync(path.join(blogDir, filename), 'utf-8');
      const { data, content } = matter(raw);
      return {
        title: data.title,
        slug: data.slug,
        date: data.date,
        category: data.category,
        excerpt: data.excerpt,
        tags: data.tags || [],
        relatedProducts: data.relatedProducts || [],
        content,
      } as BlogPost;
    })
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
}

export function getPostBySlug(slug: string): BlogPost | undefined {
  return getAllPosts().find(p => p.slug === slug);
}

export function getPostsByCategory(category: string): BlogPost[] {
  return getAllPosts().filter(p => p.category === category);
}

export function getRelatedProducts(productIds: string[]): Product[] {
  return productIds
    .map(id => getProductById(id))
    .filter((p): p is Product => p !== undefined);
}
