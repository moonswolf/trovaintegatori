#!/usr/bin/env node
/**
 * Scans content/blog/*.md and generates data/blog-categories.json
 * with only categories that have published articles.
 * Run before build (prebuild script in package.json).
 */
const fs = require('fs');
const path = require('path');
const matter = require('gray-matter');

const blogDir = path.join(__dirname, '..', 'content', 'blog');
const outFile = path.join(__dirname, '..', 'data', 'blog-categories.json');

const categoryNames = {
  'vitamine': 'Vitamine',
  'minerali': 'Minerali',
  'omega-3': 'Omega 3',
  'sport': 'Sport & Performance',
  'probiotici': 'Probiotici',
  'bellezza': 'Bellezza',
  'sonno': 'Sonno',
  'adattogeni': 'Adattogeni',
  'superfood': 'Superfood',
  'antiossidanti': 'Antiossidanti',
  'dimagrimento': 'Dimagrimento',
  'guide': 'Guide',
  'classifiche': 'Classifiche',
  'articolazioni': 'Articolazioni',
};

const cats = new Set();
if (fs.existsSync(blogDir)) {
  for (const file of fs.readdirSync(blogDir)) {
    if (!file.endsWith('.md')) continue;
    const { data } = matter(fs.readFileSync(path.join(blogDir, file), 'utf8'));
    if (data.category) cats.add(data.category);
  }
}

const result = Array.from(cats).sort().map(slug => ({
  slug,
  name: categoryNames[slug] || slug.charAt(0).toUpperCase() + slug.slice(1),
}));

fs.writeFileSync(outFile, JSON.stringify(result, null, 2));
console.log(`Generated ${result.length} blog categories:`, result.map(c => c.name).join(', '));
