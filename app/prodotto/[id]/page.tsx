import { notFound } from 'next/navigation';
import { getProductById, getProducts, getCategoryBySlug, getSimilarProducts } from '@/lib/data';
import RatingStars from '@/components/RatingStars';
import ProductCard from '@/components/ProductCard';
import AffiliateDisclosure from '@/components/AffiliateDisclosure';
import AmazonButton from '@/components/AmazonButton';
import AddToCompareButton from '@/components/AddToCompareButton';
import ImageLightbox from '@/components/ImageLightbox';
import Link from 'next/link';
import type { Metadata } from 'next';

const baseUrl = 'https://trovaintegratori.it';

interface ProductPageProps {
  params: Promise<{ id: string }>;
}

export async function generateStaticParams() {
  const products = getProducts();
  return products.map((product) => ({
    id: product.id,
  }));
}

export async function generateMetadata({ params }: ProductPageProps): Promise<Metadata> {
  const { id } = await params;
  const product = getProductById(id);
  
  if (!product) {
    return { title: 'Prodotto non trovato' };
  }

  const category = getCategoryBySlug(product.category);
  const categoryName = category ? category.name : '';
  const title = `${product.name} - €${product.price.toFixed(2)} | ${categoryName} | Confronta Prezzo`;
  const description = `${product.name} di ${product.brand} — integratore ${categoryName.toLowerCase()} a €${product.price.toFixed(2)} su Amazon Italia. ⭐ ${product.rating}/5 (${product.reviewCount} recensioni). ${product.description.slice(0, 120)} Confronta e risparmia.`;
  const url = `${baseUrl}/prodotto/${product.id}`;

  return {
    title,
    description,
    alternates: { canonical: url },
    openGraph: {
      title: `${product.name} - ${product.brand}`,
      description: product.description,
      type: 'website',
      url,
      images: product.imageUrl.startsWith('http') ? [{ url: product.imageUrl, width: 500, height: 500, alt: product.name }] : [],
    },
    twitter: {
      card: 'summary',
      title: `${product.name} - €${product.price.toFixed(2)}`,
      description: product.description,
    },
  };
}

export default async function ProductPage({ params }: ProductPageProps) {
  const { id } = await params;
  const product = getProductById(id);
  
  if (!product) {
    notFound();
  }

  const category = getCategoryBySlug(product.category);
  const similarProducts = getSimilarProducts(id, 4);
  const discount = product.originalPrice ? Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100) : 0;
  const ingredients = product.composition.split(',').map(ing => ing.trim());

  // JSON-LD Product
  const productJsonLd = {
    "@context": "https://schema.org",
    "@type": "Product",
    name: product.name,
    description: product.description,
    image: product.imageUrl,
    brand: { "@type": "Brand", name: product.brand },
    sku: product.asin,
    gtin: product.asin,
    aggregateRating: {
      "@type": "AggregateRating",
      ratingValue: product.rating,
      reviewCount: product.reviewCount,
      bestRating: 5,
      worstRating: 1,
    },
    offers: {
      "@type": "Offer",
      url: product.amazonUrl,
      priceCurrency: "EUR",
      price: product.price,
      availability: product.inStock ? "https://schema.org/InStock" : "https://schema.org/OutOfStock",
      seller: { "@type": "Organization", name: "Amazon.it" },
    },
  };

  // JSON-LD BreadcrumbList
  const breadcrumbJsonLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: baseUrl },
      { "@type": "ListItem", position: 2, name: category?.name || product.category, item: `${baseUrl}/categoria/${product.category}` },
      { "@type": "ListItem", position: 3, name: product.name, item: `${baseUrl}/prodotto/${product.id}` },
    ],
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(productJsonLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }} />

      {/* Breadcrumb */}
      <nav aria-label="Breadcrumb" className="bg-white border-b">
        <div className="max-w-7xl mx-auto px-4 py-4">
          <ol className="flex text-sm" itemScope itemType="https://schema.org/BreadcrumbList">
            <li itemProp="itemListElement" itemScope itemType="https://schema.org/ListItem">
              <Link href="/" itemProp="item" className="text-emerald-600 hover:text-emerald-700">
                <span itemProp="name">Home</span>
              </Link>
              <meta itemProp="position" content="1" />
            </li>
            <span className="mx-2 text-gray-600">/</span>
            <li itemProp="itemListElement" itemScope itemType="https://schema.org/ListItem">
              <Link href={`/categoria/${product.category}`} itemProp="item" className="text-emerald-600 hover:text-emerald-700">
                <span itemProp="name">{category?.name}</span>
              </Link>
              <meta itemProp="position" content="2" />
            </li>
            <span className="mx-2 text-gray-600">/</span>
            <li itemProp="itemListElement" itemScope itemType="https://schema.org/ListItem">
              <span itemProp="name" className="text-gray-900 font-medium">{product.name}</span>
              <meta itemProp="position" content="3" />
            </li>
          </ol>
        </div>
      </nav>

      {/* Product Details */}
      <div className="bg-white">
        <div className="max-w-7xl mx-auto px-4 py-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Product Image */}
            <div className="space-y-4">
              <div className="w-full h-96 bg-white rounded-lg flex items-center justify-center relative overflow-hidden">
                <ImageLightbox
                  src={product.imageUrl}
                  alt={`${product.name} ${product.brand} - integratore`}
                  className="h-full w-auto object-contain"
                  fallback={<span className="text-7xl text-slate-300">💊</span>}
                />
                {discount > 0 && (
                  <div className="absolute top-4 right-4 bg-red-500 text-white text-lg font-bold px-3 py-2 rounded-lg">
                    -{discount}%
                  </div>
                )}
              </div>
              <div className="flex justify-center space-x-4 text-sm text-gray-600">
                <div className="flex items-center">
                  <span className="w-2 h-2 bg-green-500 rounded-full mr-2"></span>
                  Amazon Italia
                </div>
                <div className="flex items-center">
                  <span className="w-2 h-2 bg-blue-500 rounded-full mr-2"></span>
                  Spedizione Prime
                </div>
                <div className="flex items-center">
                  <span className="w-2 h-2 bg-purple-500 rounded-full mr-2"></span>
                  Reso gratuito
                </div>
              </div>
            </div>

            {/* Product Info */}
            <div className="space-y-6">
              <div>
                <span className="inline-block bg-emerald-100 text-emerald-800 text-sm font-medium px-3 py-1 rounded-lg">
                  {product.brand}
                </span>
              </div>
              <h1 className="text-4xl font-bold text-gray-900">{product.name}</h1>
              <div className="flex items-center gap-4">
                <RatingStars rating={product.rating} size="lg" showRating />
                <span className="text-gray-600">({product.reviewCount.toLocaleString()} recensioni)</span>
              </div>
              <p className="text-lg text-gray-700">{product.description}</p>

              {/* Price */}
              <div className="bg-gray-50 rounded-lg p-6 text-center md:text-left">
                <div className="flex items-center justify-center md:justify-start gap-4 mb-4">
                  <span className="text-4xl font-bold text-emerald-600">€{product.price.toFixed(2)}</span>
                  {product.originalPrice && product.originalPrice > product.price && (
                    <span className="text-xl text-gray-600 line-through">€{product.originalPrice.toFixed(2)}</span>
                  )}
                  {discount > 0 && (
                    <span className="bg-red-100 text-red-800 px-2 py-1 rounded text-sm font-medium">Risparmi {discount}%</span>
                  )}
                </div>
                <div className="text-sm text-gray-600 mb-4">
                  <strong>Prezzo per unità:</strong> {product.pricePerUnit}
                </div>
                <div className="flex items-center justify-center md:justify-start gap-2 mb-6">
                  <span className={`w-3 h-3 rounded-full ${product.inStock ? 'bg-green-500' : 'bg-red-500'}`}></span>
                  <span className={`font-medium ${product.inStock ? 'text-green-600' : 'text-red-600'}`}>
                    {product.inStock ? 'Disponibile' : 'Non disponibile'}
                  </span>
                </div>
                <AmazonButton
                  amazonUrl={product.amazonUrl}
                  inStock={product.inStock}
                  className={`w-full py-4 px-6 rounded-lg text-sm md:text-lg font-semibold whitespace-nowrap transition ${product.inStock ? 'bg-emerald-600 text-white hover:bg-emerald-700' : 'bg-gray-300 text-gray-600 cursor-not-allowed'}`}
                >
                  Acquista su Amazon Italia
                </AmazonButton>
                <div className="mt-4">
                  <AddToCompareButton productId={product.id} variant="full" />
                </div>
              </div>

              {/* Telegram Price Alert */}
              <a href="https://t.me/trovaintegratori" target="_blank" rel="noopener noreferrer" className="block bg-[#e8f4fd] border border-[#b8ddf0] rounded-lg p-4 hover:bg-[#d6ecf8] transition group">
                <div className="flex items-center gap-3 mb-2">
                  <svg className="w-6 h-6 flex-shrink-0 text-[#0088cc]" viewBox="0 0 24 24" fill="currentColor"><path d="M11.944 0A12 12 0 0 0 0 12a12 12 0 0 0 12 12 12 12 0 0 0 12-12A12 12 0 0 0 12 0a12 12 0 0 0-.056 0zm4.962 7.224c.1-.002.321.023.465.14a.506.506 0 0 1 .171.325c.016.093.036.306.02.472-.18 1.898-.962 6.502-1.36 8.627-.168.9-.499 1.201-.82 1.23-.696.065-1.225-.46-1.9-.902-1.056-.693-1.653-1.124-2.678-1.8-1.185-.78-.417-1.21.258-1.91.177-.184 3.247-2.977 3.307-3.23.007-.032.014-.15-.056-.212s-.174-.041-.249-.024c-.106.024-1.793 1.14-5.061 3.345-.48.33-.913.49-1.302.48-.428-.008-1.252-.241-1.865-.44-.752-.245-1.349-.374-1.297-.789.027-.216.325-.437.893-.663 3.498-1.524 5.83-2.529 6.998-3.014 3.332-1.386 4.025-1.627 4.476-1.635z"/></svg>
                  <span className="font-semibold text-[#0088cc] group-hover:text-[#006699] transition">Non perdere le offerte!</span>
                </div>
                <p className="text-sm text-[#3a7ca5] leading-relaxed">
                  Iscriviti al canale Telegram per ricevere subito una notifica quando il prezzo scende e scoprire nuove super offerte sugli integratori.
                </p>
              </a>

              {/* Highlights */}
              {product.highlights && product.highlights.length > 0 && (
                <div>
                  <h2 className="text-lg font-semibold text-gray-900 mb-3">Punti di forza</h2>
                  <ul className="space-y-2">
                    {product.highlights.map((highlight, index) => (
                      <li key={index} className="flex items-center">
                        <span className="w-2 h-2 bg-emerald-500 rounded-full mr-3"></span>
                        <span className="text-gray-700">{highlight}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Composition */}
      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="bg-white rounded-lg shadow-sm">
          <div className="p-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">Composizione e Ingredienti</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="space-y-4">
                <div className="flex justify-between py-3 border-b border-gray-200">
                  <span className="font-medium text-gray-700">Formato:</span>
                  <span className="text-gray-900">{product.form}</span>
                </div>
                <div className="flex justify-between py-3 border-b border-gray-200">
                  <span className="font-medium text-gray-700">Quantità:</span>
                  <span className="text-gray-900">{product.quantity}</span>
                </div>
                <div className="flex justify-between py-3 border-b border-gray-200">
                  <span className="font-medium text-gray-700">Marca:</span>
                  <span className="text-gray-900">{product.brand}</span>
                </div>
                <div className="flex justify-between py-3 border-b border-gray-200">
                  <span className="font-medium text-gray-700">ASIN:</span>
                  <span className="text-gray-900 font-mono text-sm">{product.asin}</span>
                </div>
              </div>
              <div>
                <h3 className="font-semibold text-gray-900 mb-3">Principi Attivi:</h3>
                <div className="bg-gray-50 rounded-lg p-4">
                  <div className="space-y-2">
                    {ingredients.map((ingredient, index) => (
                      <div key={index} className="flex items-start">
                        <span className="w-2 h-2 bg-emerald-500 rounded-full mr-3 mt-2 flex-shrink-0"></span>
                        <span className="text-gray-700">{ingredient}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Similar Products */}
      {similarProducts.length > 0 && (
        <section className="max-w-7xl mx-auto px-4 py-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Prodotti Simili</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {similarProducts.map((similarProduct) => (
              <Link key={similarProduct.id} href={`/prodotto/${similarProduct.id}`}>
                <ProductCard product={similarProduct} />
              </Link>
            ))}
          </div>
        </section>
      )}

      {/* CTA */}
      <section className="bg-emerald-50 border-t">
        <div className="max-w-4xl mx-auto text-center px-4 py-12">
          <h3 className="text-2xl font-bold text-gray-900 mb-4">Vuoi confrontare più prodotti?</h3>
          <p className="text-lg text-gray-600 mb-8">Usa il nostro comparatore con intelligenza artificiale per trovare l&apos;integratore perfetto per te</p>
          <Link href="/confronta" className="inline-flex items-center justify-center px-8 py-4 text-lg font-semibold text-white bg-emerald-600 hover:bg-emerald-700 rounded-lg transition">
            Confronta con AI
          </Link>
        </div>
      </section>
    </div>
  );
}
