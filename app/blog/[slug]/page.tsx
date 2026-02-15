import { notFound } from 'next/navigation';
import Link from 'next/link';
import { getAllPosts, getPostBySlug, getRelatedProducts } from '@/lib/blog';
import type { Metadata } from 'next';
import BlogArticle from './BlogArticle';
import ProductCard from '@/components/ProductCard';

interface Props {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  return getAllPosts().map(post => ({ slug: post.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const post = getPostBySlug(slug);
  if (!post) return {};

  return {
    title: `${post.title} | TrovaIntegratori.it`,
    description: post.excerpt,
    openGraph: {
      title: post.title,
      description: post.excerpt,
      type: 'article',
      publishedTime: post.date,
      url: `https://trovaintegratori.it/blog/${post.slug}`,
    },
    alternates: {
      canonical: `https://trovaintegratori.it/blog/${post.slug}`,
    },
  };
}

export default async function BlogPostPage({ params }: Props) {
  const { slug } = await params;
  const post = getPostBySlug(slug);
  if (!post) notFound();

  const relatedProducts = getRelatedProducts(post.relatedProducts);

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: post.title,
    datePublished: post.date,
    description: post.excerpt,
    url: `https://trovaintegratori.it/blog/${post.slug}`,
    publisher: {
      '@type': 'Organization',
      name: 'TrovaIntegratori.it',
      url: 'https://trovaintegratori.it',
    },
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        {/* Breadcrumb */}
        <nav className="text-sm text-slate-500 mb-6 flex items-center gap-2">
          <Link href="/" className="hover:text-emerald-600 transition">Home</Link>
          <span>/</span>
          <Link href="/blog" className="hover:text-emerald-600 transition">Blog</Link>
          <span>/</span>
          <span className="text-slate-700 line-clamp-1">{post.title}</span>
        </nav>

        {/* Header */}
        <header className="mb-8">
          <div className="flex items-center gap-3 mb-4">
            <span className="text-xs font-medium bg-emerald-100 text-emerald-700 px-2.5 py-1 rounded-full capitalize">
              {post.category}
            </span>
            <time className="text-sm text-slate-500" dateTime={post.date}>
              {new Date(post.date).toLocaleDateString('it-IT', { day: 'numeric', month: 'long', year: 'numeric' })}
            </time>
          </div>
          <h1 className="text-3xl sm:text-4xl font-bold text-slate-900 mb-4">
            {post.title}
          </h1>
          {post.tags.length > 0 && (
            <div className="flex flex-wrap gap-2">
              {post.tags.map(tag => (
                <Link key={tag} href={`/blog/tag/${tag}`} className="text-xs bg-slate-100 text-slate-600 hover:bg-emerald-100 hover:text-emerald-700 px-2.5 py-1 rounded-full transition">
                  {tag}
                </Link>
              ))}
            </div>
          )}
        </header>

        {/* Content */}
        <BlogArticle content={post.content} />

        {/* Related Products */}
        {relatedProducts.length > 0 && (
          <section className="mt-12 pt-8 border-t border-slate-200">
            <h2 className="text-2xl font-bold text-slate-900 mb-6">Prodotti Consigliati</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {relatedProducts.map(product => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          </section>
        )}

        {/* Back to Blog */}
        <div className="mt-10 pt-6 border-t border-slate-200">
          <Link
            href="/blog"
            className="inline-flex items-center text-sm font-medium text-emerald-600 hover:text-emerald-700 transition"
          >
            <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
            Torna al Blog
          </Link>
        </div>
      </div>
    </>
  );
}
