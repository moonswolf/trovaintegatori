import HeroNew from '@/components/HeroNew';
import CategoryCard from '@/components/CategoryCard';
import ProductCard from '@/components/ProductCard';
import Footer from '@/components/Footer';
import AffiliateDisclosure from '@/components/AffiliateDisclosure';
import FAQ from '@/components/FAQ';
import { getCategories, getFeaturedProducts, getProductCountByCategory } from '@/lib/data';
import Link from 'next/link';
import faqData from '@/data/faqs.json';

export default function Home() {
  const categories = getCategories();
  const featuredProducts = getFeaturedProducts(8);

  return (
    <main className="min-h-screen">
      <HeroNew />
      
      {/* Categories Section */}
      <section id="categorie" className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-slate-900 mb-4">
              Esplora per Categoria
            </h2>
            <p className="text-lg text-slate-500 max-w-2xl mx-auto">
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
      <section className="py-20 bg-slate-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-slate-900 mb-4">
              Prodotti Più Popolari
            </h2>
            <p className="text-lg text-slate-500 max-w-2xl mx-auto">
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
              className="inline-flex items-center justify-center px-6 py-3 text-sm font-medium rounded-lg text-white bg-emerald-600 hover:bg-emerald-700 transition"
            >
              Vedi tutti i prodotti
            </Link>
          </div>
        </div>
      </section>

      {/* How it Works Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-slate-900 mb-4">
              Come Funziona
            </h2>
            <p className="text-lg text-slate-500 max-w-2xl mx-auto">
              Confronta e risparmia sui tuoi integratori preferiti in 3 semplici passi
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Step 1 */}
            <div className="text-center">
              <div className="w-14 h-14 bg-emerald-50 rounded-lg flex items-center justify-center mx-auto mb-4">
                <svg className="w-7 h-7 text-emerald-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-slate-900 mb-3">
                1. Cerca
              </h3>
              <p className="text-slate-600">
                Cerca i tuoi integratori preferiti per categoria, marca o principio attivo. 
                Usa i nostri filtri per trovare esattamente quello che cerchi.
              </p>
            </div>

            {/* Step 2 */}
            <div className="text-center">
              <div className="w-14 h-14 bg-emerald-50 rounded-lg flex items-center justify-center mx-auto mb-4">
                <svg className="w-7 h-7 text-emerald-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M3 13.125C3 12.504 3.504 12 4.125 12h2.25c.621 0 1.125.504 1.125 1.125v6.75C7.5 20.496 6.996 21 6.375 21h-2.25A1.125 1.125 0 013 19.875v-6.75zM9.75 8.625c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125v11.25c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 01-1.125-1.125V8.625zM16.5 4.125c0-.621.504-1.125 1.125-1.125h2.25C20.496 3 21 3.504 21 4.125v15.75c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 01-1.125-1.125V4.125z" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-slate-900 mb-3">
                2. Confronta
              </h3>
              <p className="text-slate-600">
                Confronta prezzi, composizione e recensioni. La nostra AI ti aiuta a capire 
                quale prodotto offre il miglior rapporto qualità-prezzo.
              </p>
            </div>

            {/* Step 3 */}
            <div className="text-center">
              <div className="w-14 h-14 bg-emerald-50 rounded-lg flex items-center justify-center mx-auto mb-4">
                <svg className="w-7 h-7 text-emerald-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 18.75a60.07 60.07 0 0115.797 2.101c.727.198 1.453-.342 1.453-1.096V18.75M3.75 4.5v.75A.75.75 0 013 6h-.75m0 0v-.375c0-.621.504-1.125 1.125-1.125H20.25M2.25 6v9m18-10.5v.75c0 .414.336.75.75.75h.75m-1.5-1.5h.375c.621 0 1.125.504 1.125 1.125v9.75c0 .621-.504 1.125-1.125 1.125h-.375m1.5-1.5H21a.75.75 0 00-.75.75v.75m0 0H3.75m0 0h-.375a1.125 1.125 0 01-1.125-1.125V15m1.5 1.5v-.75A.75.75 0 003 15h-.75M15 10.5a3 3 0 11-6 0 3 3 0 016 0zm3 0h.008v.008H18V10.5zm-12 0h.008v.008H6V10.5z" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-slate-900 mb-3">
                3. Risparmia
              </h3>
              <p className="text-slate-600">
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
              Inizia a Confrontare
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

      {/* FAQ Section */}
      <FAQ
        items={faqData.homepage}
        title="Domande Frequenti sugli Integratori"
        subtitle="Risposte alle domande più comuni su integratori alimentari e sul nostro servizio di confronto prezzi"
      />

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
