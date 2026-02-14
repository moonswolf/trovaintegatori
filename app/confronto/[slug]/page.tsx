import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import comparisons from '@/data/comparisons.json';
import { getProducts } from '@/lib/data';

type Comparison = (typeof comparisons)[number];

function getComparison(slug: string): Comparison | undefined {
  return comparisons.find((c) => c.slug === slug);
}

export function generateStaticParams() {
  return comparisons.map((c) => ({ slug: c.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const comp = getComparison(slug);
  if (!comp) return {};

  const url = `https://trovaintegratori.it/confronto/${comp.slug}`;
  return {
    title: comp.metaTitle,
    description: comp.metaDescription,
    alternates: { canonical: url },
    openGraph: {
      title: comp.metaTitle,
      description: comp.metaDescription,
      url,
      type: 'article',
      locale: 'it_IT',
      siteName: 'TrovaIntegratori.it',
    },
  };
}

export default async function ComparisonPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const comp = getComparison(slug);
  if (!comp) notFound();

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: comp.title,
    description: comp.metaDescription,
    url: `https://trovaintegratori.it/confronto/${comp.slug}`,
    publisher: {
      '@type': 'Organization',
      name: 'TrovaIntegratori.it',
      url: 'https://trovaintegratori.it',
    },
    datePublished: '2025-02-01',
    dateModified: new Date().toISOString().split('T')[0],
  };

  const faqJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: comp.faqs.map((faq) => ({
      '@type': 'Question',
      name: faq.question,
      acceptedAnswer: {
        '@type': 'Answer',
        text: faq.answer,
      },
    })),
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }}
      />

      <div className="max-w-4xl mx-auto px-4 py-8">
        {/* Breadcrumb */}
        <nav className="text-sm text-gray-500 mb-6">
          <Link href="/" className="hover:text-emerald-600">Home</Link>
          <span className="mx-2">/</span>
          <Link href="/confronto" className="hover:text-emerald-600">Confronti</Link>
          <span className="mx-2">/</span>
          <span className="text-gray-700">{comp.title}</span>
        </nav>

        {/* Title */}
        <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
          {comp.title}
        </h1>

        {/* Intro */}
        <div className="prose prose-lg max-w-none mb-10">
          {comp.intro.split('\n').map((p, i) => (
            <p key={i} className="text-gray-700 leading-relaxed">{p}</p>
          ))}
        </div>

        {/* Comparison Cards */}
        <h2 className="text-2xl font-bold text-gray-900 mb-6">Confronto Dettagliato</h2>
        <div className="grid md:grid-cols-2 gap-6 mb-10">
          {comp.products.map((product, idx) => (
            <div
              key={idx}
              className="border border-gray-200 rounded-xl p-6 bg-white shadow-sm hover:shadow-md transition"
            >
              <h3 className="text-xl font-bold text-gray-900 mb-3">
                {product.name}
              </h3>
              <p className="text-gray-600 text-sm mb-4">{product.description}</p>

              {/* Pros */}
              <div className="mb-4">
                <h4 className="font-semibold text-emerald-700 mb-2">Vantaggi</h4>
                <ul className="space-y-1">
                  {product.pros.map((pro, i) => (
                    <li key={i} className="text-sm text-gray-700 flex items-start gap-2">
                      <span className="text-emerald-500 mt-0.5 shrink-0">✓</span>
                      {pro}
                    </li>
                  ))}
                </ul>
              </div>

              {/* Cons */}
              <div className="mb-4">
                <h4 className="font-semibold text-red-700 mb-2">Svantaggi</h4>
                <ul className="space-y-1">
                  {product.cons.map((con, i) => (
                    <li key={i} className="text-sm text-gray-700 flex items-start gap-2">
                      <span className="text-red-500 mt-0.5 shrink-0">✗</span>
                      {con}
                    </li>
                  ))}
                </ul>
              </div>

              {/* Best For */}
              <div className="bg-emerald-50 rounded-lg p-3 mt-auto">
                <p className="text-sm text-emerald-800">
                  <span className="font-semibold">Ideale per: </span>
                  {product.bestFor}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* Verdict */}
        <div className="bg-gradient-to-r from-emerald-50 to-teal-50 border border-emerald-200 rounded-xl p-6 mb-10">
          <h2 className="text-2xl font-bold text-emerald-800 mb-3">Il Verdetto</h2>
          <p className="text-gray-800 leading-relaxed">{comp.verdict}</p>
        </div>

        {/* Conclusion */}
        <div className="mb-10">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Conclusione</h2>
          <p className="text-gray-700 leading-relaxed">{comp.conclusion}</p>
        </div>

        {/* Related Products */}
        {(() => {
          const relatedCat = (comp as any).relatedCategory || '';
          const allProducts = getProducts();
          const related = allProducts.filter(p => p.category === relatedCat).slice(0, 4);
          if (related.length === 0) return null;
          return (
            <div className="mb-10">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">Prodotti Correlati</h2>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
                {related.map(p => (
                  <Link key={p.id} href={`/prodotto/${p.id}`} className="bg-white border border-gray-200 rounded-lg p-4 hover:shadow-md transition text-center">
                    <div className="h-24 flex items-center justify-center mb-3">
                      {p.imageUrl?.startsWith('http') ? (
                        <img src={p.imageUrl} alt={p.name} className="max-h-24 object-contain" />
                      ) : (
                        <span className="text-4xl">💊</span>
                      )}
                    </div>
                    <p className="text-sm font-medium text-gray-900 line-clamp-2 mb-1">{p.name}</p>
                    <p className="text-emerald-600 font-bold">€{p.price.toFixed(2)}</p>
                  </Link>
                ))}
              </div>
              {comp.categoryLink && (
                <div className="text-center">
                  <Link 
                    href={comp.categoryLink} 
                    className="inline-flex items-center justify-center px-6 py-3 bg-emerald-600 text-white rounded-lg font-semibold hover:bg-emerald-700 transition"
                  >
                    Vedi tutti i prodotti della categoria →
                  </Link>
                </div>
              )}
            </div>
          );
        })()}

        {/* FAQ */}
        <div className="mb-10">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Domande Frequenti</h2>
          <div className="space-y-4">
            {comp.faqs.map((faq, i) => (
              <details
                key={i}
                className="border border-gray-200 rounded-lg p-4 group"
              >
                <summary className="font-semibold text-gray-900 cursor-pointer list-none flex justify-between items-center">
                  {faq.question}
                  <span className="text-gray-400 group-open:rotate-180 transition-transform">▼</span>
                </summary>
                <p className="mt-3 text-gray-700 leading-relaxed">{faq.answer}</p>
              </details>
            ))}
          </div>
        </div>

        {/* Sources */}
        <div className="mb-10">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Fonti e Riferimenti</h2>
          <ul className="space-y-2">
            {comp.sources.map((source, i) => (
              <li key={i} className="text-sm text-gray-600">
                <a
                  href={source.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-emerald-600 hover:underline"
                >
                  {source.title}
                </a>
              </li>
            ))}
          </ul>
        </div>

        {/* Other Comparisons */}
        <div className="border-t border-gray-200 pt-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Altri Confronti</h2>
          <div className="grid sm:grid-cols-2 gap-3">
            {comparisons
              .filter((c) => c.slug !== comp.slug)
              .slice(0, 4)
              .map((c) => (
                <Link
                  key={c.slug}
                  href={`/confronto/${c.slug}`}
                  className="p-3 border border-gray-200 rounded-lg hover:border-emerald-300 hover:bg-emerald-50 transition text-sm font-medium text-gray-700"
                >
                  {c.title}
                </Link>
              ))}
          </div>
        </div>
      </div>
    </>
  );
}
