import { notFound } from 'next/navigation';
import { getCategoryBySlug, getProductsByCategory, getCategories } from '@/lib/data';
import ProductGrid from '@/components/ProductGrid';
import AffiliateDisclosure from '@/components/AffiliateDisclosure';
import Link from 'next/link';
import type { Metadata } from 'next';

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
    return {
      title: 'Categoria non trovata - TrovaIntegratori',
    };
  }

  const productCount = getProductsByCategory(slug).length;

  return {
    title: `${category.name} - Confronta Prezzi Integratori | TrovaIntegratori`,
    description: `${category.description} Confronta prezzi di ${productCount} prodotti e trova le migliori offerte su Amazon Italia.`,
    openGraph: {
      title: `${category.name} - Confronta Prezzi Integratori`,
      description: category.description,
      type: 'website',
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

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Breadcrumb */}
      <div className="bg-white border-b">
        <div className="max-w-7xl mx-auto px-4 py-4">
          <nav className="flex text-sm">
            <Link href="/" className="text-emerald-600 hover:text-emerald-700">
              Home
            </Link>
            <span className="mx-2 text-gray-600">/</span>
            <span className="text-gray-900 font-medium">{category.name}</span>
          </nav>
        </div>
      </div>

      {/* Category Header */}
      <div className="bg-white">
        <div className="max-w-7xl mx-auto px-4 py-12">
          <div className="text-center">
            {/* Title with inline icon */}
            <div className="flex items-center justify-center gap-3 mb-4">
              <span className="text-2xl">{category.icon}</span>
              <h1 className="text-4xl md:text-5xl font-bold text-gray-900">
                Integratori di {category.name}
              </h1>
            </div>
            
            {/* Description */}
            <p className="text-lg md:text-xl text-gray-600 mb-8 max-w-4xl mx-auto">
              {category.description}
            </p>

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
                <div className="text-2xl font-bold text-emerald-600">€{priceRange.min}-{priceRange.max}</div>
                <div className="text-sm text-gray-600">Range prezzi</div>
              </div>
            </div>

            {/* Subcategories */}
            <div>
              <h3 className="font-semibold text-gray-900 mb-4">Sottocategorie</h3>
              <div className="flex flex-wrap justify-center gap-2 max-w-4xl mx-auto">
                {category.subcategories.map((subcategory) => {
                  const subcatProducts = products.filter(p => p.subcategory === subcategory.slug);
                  return (
                    <span
                      key={subcategory.slug}
                      className="inline-flex items-center bg-emerald-100 text-emerald-800 px-3 py-1 rounded-full text-sm"
                    >
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

      {/* Products Section */}
      <div className="max-w-7xl mx-auto px-4 py-8">
        {products.length > 0 ? (
          <>
            <div className="mb-6">
              <h2 className="text-2xl font-bold text-gray-900 mb-2">
                Tutti i prodotti di {category.name}
              </h2>
              <p className="text-gray-600">
                Confronta prezzi e caratteristiche per trovare l'integratore perfetto per te
              </p>
            </div>

            <ProductGrid
              products={products}
              category={slug}
              showFilters={true}
              showSorting={true}
            />

            {/* CTA Section */}
            <div className="mt-16 bg-emerald-50 rounded-lg p-8 text-center">
              <h3 className="text-xl font-bold text-gray-900 mb-4">
                Non trovi quello che cerchi?
              </h3>
              <p className="text-gray-600 mb-6">
                Prova il nostro comparatore con intelligenza artificiale per confrontare prodotti simili
              </p>
              <Link
                href="/confronta"
                className="inline-flex items-center justify-center px-6 py-3 bg-emerald-600 text-white font-semibold rounded-lg hover:bg-emerald-700 transition"
              >
                🤖 Confronta con AI
              </Link>
            </div>
          </>
        ) : (
          <div className="text-center py-16">
            <div className="text-6xl mb-4">📦</div>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">
              Nessun prodotto disponibile
            </h2>
            <p className="text-gray-600 mb-8">
              Al momento non abbiamo prodotti disponibili in questa categoria.
            </p>
            <Link
              href="/"
              className="inline-flex items-center justify-center px-6 py-3 bg-emerald-600 text-white font-semibold rounded-lg hover:bg-emerald-700 transition"
            >
              Esplora altre categorie
            </Link>
          </div>
        )}

        {/* Affiliate Disclosure */}
        <div className="mt-12">
          <AffiliateDisclosure variant="banner" />
        </div>
      </div>
    </div>
  );
}