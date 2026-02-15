import Link from 'next/link';
import { getAllPosts } from '@/lib/blog';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Blog - Guida agli Integratori | TrovaIntegratori.it',
  description: 'Articoli, guide e consigli sui migliori integratori alimentari. Scopri dosaggi, benefici e come scegliere gli integratori giusti per te.',
  openGraph: {
    title: 'Blog - Guida agli Integratori | TrovaIntegratori.it',
    description: 'Articoli, guide e consigli sui migliori integratori alimentari.',
    url: 'https://trovaintegratori.it/blog',
  },
  alternates: {
    canonical: 'https://trovaintegratori.it/blog',
  },
};

const POSTS_PER_PAGE = 9;

export default async function BlogPage({ searchParams }: { searchParams: Promise<{ page?: string; categoria?: string }> }) {
  const params = await searchParams;
  const allPosts = getAllPosts();
  const activeCategory = params.categoria || '';
  const posts = activeCategory ? allPosts.filter(p => p.category === activeCategory) : allPosts;
  const currentPage = Math.max(1, parseInt(params.page || '1'));
  const totalPages = Math.ceil(posts.length / POSTS_PER_PAGE);
  const paginatedPosts = posts.slice((currentPage - 1) * POSTS_PER_PAGE, currentPage * POSTS_PER_PAGE);

  // Collect unique categories from all posts
  const categorySet = new Set(allPosts.map(p => p.category));
  const availableCategories = Array.from(categorySet).sort();

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      {/* Header */}
      <div className="mb-10">
        <h1 className="text-3xl font-bold text-slate-900 mb-3">Blog</h1>
        <p className="text-slate-600 text-lg max-w-2xl">
          Guide, approfondimenti e consigli per scegliere gli integratori alimentari migliori per le tue esigenze.
        </p>
      </div>

      {/* Category Filter */}
      {availableCategories.length > 1 && (
        <div className="flex flex-wrap gap-2 mb-8">
          <Link
            href="/blog"
            className={`px-3 py-1.5 rounded-lg text-sm font-medium transition ${
              !activeCategory ? 'bg-emerald-600 text-white' : 'bg-white border border-slate-200 text-slate-700 hover:bg-slate-50'
            }`}
          >
            Tutti
          </Link>
          {availableCategories.map(cat => (
            <Link
              key={cat}
              href={`/blog?categoria=${cat}`}
              className={`px-3 py-1.5 rounded-lg text-sm font-medium transition capitalize ${
                activeCategory === cat ? 'bg-emerald-600 text-white' : 'bg-white border border-slate-200 text-slate-700 hover:bg-slate-50'
              }`}
            >
              {cat}
            </Link>
          ))}
        </div>
      )}

      {/* Posts Grid */}
      {paginatedPosts.length === 0 ? (
        <p className="text-slate-500">Nessun articolo disponibile.</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {paginatedPosts.map(post => (
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
                <h2 className="text-lg font-semibold text-slate-900 mb-2 line-clamp-2 group-hover:text-emerald-600">
                  {post.title}
                </h2>
                <p className="text-sm text-slate-600 line-clamp-3">
                  {post.excerpt}
                </p>
                <span className="inline-block mt-4 text-sm font-medium text-emerald-600">
                  Leggi di piu →
                </span>
              </div>
            </Link>
          ))}
        </div>
      )}

      {/* Pagination */}
      {totalPages > 1 && (
        <div className="mt-10 flex justify-center gap-2">
          {Array.from({ length: totalPages }, (_, i) => i + 1).map(page => (
            <Link
              key={page}
              href={`/blog?${activeCategory ? `categoria=${activeCategory}&` : ''}page=${page}`}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition ${
                page === currentPage
                  ? 'bg-emerald-600 text-white'
                  : 'bg-white border border-slate-200 text-slate-700 hover:bg-slate-50'
              }`}
            >
              {page}
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}
