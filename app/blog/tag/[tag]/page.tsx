import Link from 'next/link';
import { getAllPosts } from '@/lib/blog';
import type { Metadata } from 'next';

interface Props {
  params: Promise<{ tag: string }>;
}

export async function generateStaticParams() {
  const posts = getAllPosts();
  const tags = new Set<string>();
  posts.forEach(p => p.tags.forEach(t => tags.add(t)));
  return Array.from(tags).map(tag => ({ tag }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { tag } = await params;
  return {
    title: `Articoli su "${tag}" | TrovaIntegratori.it`,
    description: `Tutti gli articoli e le guide su ${tag}. Scopri dosaggi, benefici e consigli.`,
    alternates: {
      canonical: `https://trovaintegratori.it/blog/tag/${encodeURIComponent(tag)}`,
    },
  };
}

export default async function TagPage({ params }: Props) {
  const { tag } = await params;
  const allPosts = getAllPosts();
  const posts = allPosts.filter(p => p.tags.includes(tag));

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      {/* Breadcrumb */}
      <nav className="text-sm text-slate-500 mb-6 flex items-center gap-2">
        <Link href="/" className="hover:text-emerald-600 transition">Home</Link>
        <span>/</span>
        <Link href="/blog" className="hover:text-emerald-600 transition">Blog</Link>
        <span>/</span>
        <span className="text-slate-700">Tag: {tag}</span>
      </nav>

      <div className="mb-10">
        <h1 className="text-3xl font-bold text-slate-900 mb-3">
          Tag: <span className="text-emerald-600">{tag}</span>
        </h1>
        <p className="text-slate-600">
          {posts.length} {posts.length === 1 ? 'articolo' : 'articoli'} con questo tag
        </p>
      </div>

      {posts.length === 0 ? (
        <p className="text-slate-500">Nessun articolo trovato per questo tag.</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {posts.map(post => (
            <Link
              key={post.slug}
              href={`/blog/${post.slug}`}
              className="block bg-white border border-slate-200 rounded-lg overflow-hidden hover:shadow-md transition-shadow duration-200"
            >
              <div className="p-6">
                <div className="flex items-center gap-3 mb-3">
                  <span className="text-xs font-medium bg-emerald-100 text-emerald-700 px-2.5 py-1 rounded-full capitalize">
                    {post.category}
                  </span>
                  <time className="text-xs text-slate-500" dateTime={post.date}>
                    {new Date(post.date).toLocaleDateString('it-IT', { day: 'numeric', month: 'long', year: 'numeric' })}
                  </time>
                </div>
                <h2 className="text-lg font-semibold text-slate-900 mb-2 line-clamp-2">
                  {post.title}
                </h2>
                <p className="text-sm text-slate-600 line-clamp-3">
                  {post.excerpt}
                </p>
                <span className="inline-block mt-4 text-sm font-medium text-emerald-600">
                  Leggi di più →
                </span>
              </div>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}
