import { notFound } from 'next/navigation';
import { getCategoryBySlug, getProductsByCategory, getCategories } from '@/lib/data';
import ProductGrid from '@/components/ProductGrid';
import AffiliateDisclosure from '@/components/AffiliateDisclosure';
import FAQ from '@/components/FAQ';
import Link from 'next/link';
import type { Metadata } from 'next';
import faqData from '@/data/faqs.json';

const baseUrl = 'https://trovaintegratori.it';

interface CategoryPageProps {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  const categories = getCategories();
  return categories.map((category) => ({
    slug: category.slug,
  }));
}

export async function generateMetadata({ params }: CategoryPageProps): Promise<Metadata> {
  const { slug } = await params;
  const category = getCategoryBySlug(slug);
  
  if (!category) {
    return { title: 'Categoria non trovata' };
  }

  const productCount = getProductsByCategory(slug).length;
  const title = `${category.name} - Confronta ${productCount} Integratori`;
  const description = `${category.description} Confronta prezzi di ${productCount} prodotti ${category.name.toLowerCase()} e trova le migliori offerte su Amazon Italia.`;
  const url = `${baseUrl}/categoria/${slug}`;

  return {
    title,
    description,
    alternates: { canonical: url },
    openGraph: {
      title: `Integratori ${category.name} - Confronta Prezzi`,
      description,
      type: 'website',
      url,
    },
    twitter: {
      card: 'summary',
      title: `Integratori ${category.name} - Confronta Prezzi`,
      description,
    },
  };
}

export default async function CategoryPage({ params }: CategoryPageProps) {
  const { slug } = await params;
  const category = getCategoryBySlug(slug);
  
  if (!category) {
    notFound();
  }

  const products = getProductsByCategory(slug);
  const inStockProducts = products.filter(p => p.inStock);
  const averagePrice = products.length > 0 
    ? (products.reduce((sum, p) => sum + p.price, 0) / products.length).toFixed(2)
    : '0';
  const priceRange = products.length > 0 ? {
    min: Math.min(...products.map(p => p.price)).toFixed(2),
    max: Math.max(...products.map(p => p.price)).toFixed(2)
  } : { min: '0', max: '0' };

  // JSON-LD ItemList
  const itemListJsonLd = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    name: `Integratori ${category.name}`,
    description: category.description,
    numberOfItems: products.length,
    itemListElement: products.map((product, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: product.name,
      url: `${baseUrl}/prodotto/${product.id}`,
    })),
  };

  const breadcrumbJsonLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: baseUrl },
      { "@type": "ListItem", position: 2, name: category.name, item: `${baseUrl}/categoria/${slug}` },
    ],
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(itemListJsonLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }} />

      {/* Breadcrumb */}
      <nav aria-label="Breadcrumb" className="bg-white border-b">
        <div className="max-w-7xl mx-auto px-4 py-4">
          <ol className="flex text-sm">
            <li><Link href="/" className="text-emerald-600 hover:text-emerald-700">Home</Link></li>
            <span className="mx-2 text-gray-600">/</span>
            <li><span className="text-gray-900 font-medium">{category.name}</span></li>
          </ol>
        </div>
      </nav>

      {/* Category Header */}
      <div className="bg-white">
        <div className="max-w-7xl mx-auto px-4 py-12">
          <div className="text-center">
            <div className="mb-4">
              <h1 className="text-4xl md:text-5xl font-bold text-slate-900">
                Integratori di {category.name}
              </h1>
            </div>
            <p className="text-lg md:text-xl text-gray-600 mb-8 max-w-4xl mx-auto">{category.description}</p>

            {/* Stats */}
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8 max-w-4xl mx-auto">
              <div className="bg-gray-50 rounded-lg p-4 text-center">
                <div className="text-2xl font-bold text-emerald-600">{products.length}</div>
                <div className="text-sm text-gray-600">Prodotti totali</div>
              </div>
              <div className="bg-gray-50 rounded-lg p-4 text-center">
                <div className="text-2xl font-bold text-emerald-600">{inStockProducts.length}</div>
                <div className="text-sm text-gray-600">Disponibili ora</div>
              </div>
              <div className="bg-gray-50 rounded-lg p-4 text-center">
                <div className="text-2xl font-bold text-emerald-600">€{averagePrice}</div>
                <div className="text-sm text-gray-600">Prezzo medio</div>
              </div>
              <div className="bg-gray-50 rounded-lg p-4 text-center">
                <div className="text-2xl font-bold text-emerald-600">€{priceRange.min} - €{priceRange.max}</div>
                <div className="text-sm text-gray-600">Range prezzi</div>
              </div>
            </div>

            {/* Subcategories */}
            <div>
              <h2 className="font-semibold text-gray-900 mb-4">Sottocategorie</h2>
              <div className="flex flex-wrap justify-center gap-2 max-w-4xl mx-auto">
                {category.subcategories.map((subcategory) => {
                  const subcatProducts = products.filter(p => p.subcategory === subcategory.slug);
                  return (
                    <span key={subcategory.slug} className="inline-flex items-center bg-emerald-100 text-emerald-800 px-3 py-1 rounded-lg text-sm">
                      {subcategory.name}
                      <span className="ml-1 text-xs">({subcatProducts.length})</span>
                    </span>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Products */}
      <div className="max-w-7xl mx-auto px-4 py-8">
        {products.length > 0 ? (
          <>
            <div className="mb-6">
              <h2 className="text-2xl font-bold text-gray-900 mb-2">Tutti i prodotti di {category.name}</h2>
              <p className="text-gray-600">Confronta prezzi e caratteristiche per trovare l&apos;integratore perfetto per te</p>
            </div>
            <ProductGrid products={products} category={slug} showFilters={true} showSorting={true} />
            <div className="mt-16 bg-emerald-50 rounded-lg p-8 text-center">
              <h3 className="text-xl font-bold text-gray-900 mb-4">Non trovi quello che cerchi?</h3>
              <p className="text-gray-600 mb-6">Prova il nostro comparatore con intelligenza artificiale per confrontare prodotti simili</p>
              <Link href="/confronta" className="inline-flex items-center justify-center px-6 py-3 bg-emerald-600 text-white font-semibold rounded-lg hover:bg-emerald-700 transition">
                Confronta con AI
              </Link>
            </div>
          </>
        ) : (
          <div className="text-center py-16">
            <div className="text-5xl mb-4 text-slate-300">📦</div>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Nessun prodotto disponibile</h2>
            <p className="text-gray-600 mb-8">Al momento non abbiamo prodotti disponibili in questa categoria.</p>
            <Link href="/" className="inline-flex items-center justify-center px-6 py-3 bg-emerald-600 text-white font-semibold rounded-lg hover:bg-emerald-700 transition">
              Esplora altre categorie
            </Link>
          </div>
        )}
        {/* Category FAQ */}
        {faqData.categories[slug as keyof typeof faqData.categories] && (
          <FAQ
            items={faqData.categories[slug as keyof typeof faqData.categories]}
            title={`Domande Frequenti su ${category.name}`}
            subtitle={`Le risposte alle domande più cercate sugli integratori di ${category.name.toLowerCase()}`}
          />
        )}

        <div className="mt-12">
          <AffiliateDisclosure variant="banner" />
        </div>
      </div>
    </div>
  );
}
