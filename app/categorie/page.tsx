import { getCategories, getProductsByCategory } from '@/lib/data';
import Link from 'next/link';
import type { Metadata } from 'next';

const baseUrl = 'https://trovaintegratori.it';

export const metadata: Metadata = {
  title: 'Tutte le Categorie di Integratori',
  description: 'Esplora tutte le categorie di integratori alimentari: vitamine, minerali, omega-3, collagene, probiotici, proteine, aminoacidi, creatina, pre-workout, dimagranti e superfood. Confronta prezzi su Amazon Italia.',
  alternates: { canonical: `${baseUrl}/categorie` },
  openGraph: {
    title: 'Categorie Integratori - TrovaIntegratori.it',
    description: 'Esplora tutte le categorie di integratori alimentari e confronta prezzi su Amazon Italia.',
    type: 'website',
    url: `${baseUrl}/categorie`,
  },
};

export default function CategoriePage() {
  const categories = getCategories();

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'CollectionPage',
    name: 'Categorie Integratori',
    description: 'Tutte le categorie di integratori alimentari su TrovaIntegratori.it',
    url: `${baseUrl}/categorie`,
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <h1 className="text-3xl sm:text-4xl font-bold text-slate-900 mb-2">
          Categorie Integratori
        </h1>
        <p className="text-lg text-slate-600 mb-10">
          Esplora tutte le categorie di integratori alimentari e confronta prezzi su Amazon Italia.
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {categories.map((category) => {
            const productCount = getProductsByCategory(category.slug).length;
            return (
              <Link
                key={category.slug}
                href={`/categoria/${category.slug}`}
                className="group block bg-white border border-slate-200 rounded-xl p-6 hover:shadow-lg hover:border-emerald-300 transition-all"
              >
                <div className="text-4xl mb-3">{category.icon}</div>
                <h2 className="text-xl font-bold text-slate-900 group-hover:text-emerald-600 transition mb-2">
                  {category.name}
                </h2>
                <p className="text-sm text-slate-600 mb-3">
                  {category.description}
                </p>
                <div className="text-sm font-medium text-emerald-600">
                  {productCount} prodotti →
                </div>
                {category.subcategories && category.subcategories.length > 0 && (
                  <div className="mt-3 pt-3 border-t border-slate-100 flex flex-wrap gap-1.5">
                    {category.subcategories.map((sub: { slug: string; name: string }) => (
                      <span
                        key={sub.slug}
                        className="text-xs bg-slate-100 text-slate-600 px-2 py-0.5 rounded-full"
                      >
                        {sub.name}
                      </span>
                    ))}
                  </div>
                )}
              </Link>
            );
          })}
        </div>
      </div>
    </>
  );
}
