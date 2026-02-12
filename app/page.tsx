import HeroNew from '@/components/HeroNew';
import CategoryCard from '@/components/CategoryCard';
import ProductCard from '@/components/ProductCard';
import Footer from '@/components/Footer';
import AffiliateDisclosure from '@/components/AffiliateDisclosure';
import { getCategories, getFeaturedProducts, getProductCountByCategory } from '@/lib/data';
import Link from 'next/link';

export default function Home() {
  const categories = getCategories();
  const featuredProducts = getFeaturedProducts(8);

  return (
    <main className="min-h-screen">
      <HeroNew />
      
      {/* Categories Section */}
      <section id="categorie" className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Esplora per Categoria
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Trova facilmente gli integratori che cerchi navigando tra le nostre categorie principali
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {categories.map((category) => (
              <CategoryCard
                key={category.slug}
                category={category}
                productCount={getProductCountByCategory(category.slug)}
              />
            ))}
          </div>
        </div>
      </section>

      {/* Featured Products Section */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Prodotti Più Popolari
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              I nostri integratori più apprezzati, selezionati in base alle recensioni e alla popolarità
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            {featuredProducts.map((product) => (
              <Link key={product.id} href={`/prodotto/${product.id}`}>
                <ProductCard product={product} />
              </Link>
            ))}
          </div>

          <div className="text-center">
            <Link
              href="/confronta"
              className="inline-flex items-center justify-center px-6 py-3 border border-transparent text-base font-medium rounded-md text-white bg-emerald-600 hover:bg-emerald-700 transition"
            >
              Vedi tutti i prodotti
            </Link>
          </div>
        </div>
      </section>

      {/* How it Works Section */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Come Funziona
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Confronta e risparmia sui tuoi integratori preferiti in 3 semplici passi
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Step 1 */}
            <div className="text-center">
              <div className="w-16 h-16 bg-emerald-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl">🔍</span>
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-3">
                1. Cerca
              </h3>
              <p className="text-gray-600">
                Cerca i tuoi integratori preferiti per categoria, marca o principio attivo. 
                Usa i nostri filtri per trovare esattamente quello che cerchi.
              </p>
            </div>

            {/* Step 2 */}
            <div className="text-center">
              <div className="w-16 h-16 bg-emerald-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl">⚖️</span>
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-3">
                2. Confronta
              </h3>
              <p className="text-gray-600">
                Confronta prezzi, composizione e recensioni. La nostra AI ti aiuta a capire 
                quale prodotto offre il miglior rapporto qualità-prezzo.
              </p>
            </div>

            {/* Step 3 */}
            <div className="text-center">
              <div className="w-16 h-16 bg-emerald-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl">💰</span>
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-3">
                3. Risparmia
              </h3>
              <p className="text-gray-600">
                Acquista direttamente su Amazon Italia al miglior prezzo disponibile. 
                Tutti i nostri link sono sicuri e aggiornati.
              </p>
            </div>
          </div>

          <div className="text-center mt-12">
            <Link
              href="/confronta"
              className="inline-flex items-center justify-center px-8 py-4 text-lg font-semibold text-white bg-emerald-600 hover:bg-emerald-700 rounded-lg transition"
            >
              🤖 Inizia a Confrontare
            </Link>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-emerald-600">
        <div className="max-w-4xl mx-auto text-center px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-white mb-4">
            Pronto a Risparmiare sui Tuoi Integratori?
          </h2>
          <p className="text-xl text-emerald-100 mb-8">
            Unisciti a migliaia di utenti che già usano TrovaIntegratori per confrontare prezzi e trovare le migliori offerte
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/confronta"
              className="inline-flex items-center justify-center px-8 py-4 text-lg font-semibold text-emerald-600 bg-white hover:bg-gray-50 rounded-lg transition"
            >
              Inizia Subito il Confronto
            </Link>
            <Link
              href="/come-funziona"
              className="inline-flex items-center justify-center px-8 py-4 text-lg font-semibold text-white border-2 border-white hover:bg-emerald-700 rounded-lg transition"
            >
              Scopri Come Funziona
            </Link>
          </div>
        </div>
      </section>

      {/* Affiliate Disclosure */}
      <div className="bg-gray-50 py-4">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <AffiliateDisclosure variant="footer" />
        </div>
      </div>

      <Footer />
    </main>
  );
}