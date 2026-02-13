'use client';

import { useState, useEffect, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import { getProducts, getProductById } from '@/lib/data';
import { Product } from '@/types/product';
import AffiliateDisclosure from '@/components/AffiliateDisclosure';

export default function Confronta() {
  return (
    <Suspense fallback={<div className="min-h-screen bg-gradient-to-b from-emerald-50 to-white flex items-center justify-center"><div className="text-lg text-gray-600">Caricamento...</div></div>}>
      <ConfrontaContent />
    </Suspense>
  );
}

function ConfrontaContent() {
  const [selectedProducts, setSelectedProducts] = useState<Product[]>([]);
  const [analysis, setAnalysis] = useState<any>(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [error, setError] = useState('');
  const [searchQuery, setSearchQuery] = useState('');
  const searchParams = useSearchParams();

  const products = getProducts();

  // Pre-load products from URL query params
  useEffect(() => {
    const ids = searchParams.get('ids');
    if (ids) {
      const preloaded = ids.split(',').map(id => getProductById(id)).filter(Boolean) as Product[];
      if (preloaded.length > 0) setSelectedProducts(preloaded);
    }
  }, [searchParams]);

  // Toggle selezione prodotto
  const toggleProduct = (product: Product) => {
    if (selectedProducts.find(p => p.id === product.id)) {
      setSelectedProducts(selectedProducts.filter(p => p.id !== product.id));
    } else {
      if (selectedProducts.length >= 3) {
        setError('Puoi confrontare massimo 3 prodotti alla volta');
        setTimeout(() => setError(''), 3000);
        return;
      }
      setSelectedProducts([...selectedProducts, product]);
    }
    setAnalysis(null);
  };

  // Confronta con AI
  const handleCompare = async () => {
    if (selectedProducts.length < 2) {
      setError('Seleziona almeno 2 prodotti da confrontare');
      setTimeout(() => setError(''), 3000);
      return;
    }

    setIsAnalyzing(true);
    setError('');

    try {
      const response = await fetch('/api/compare', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ products: selectedProducts })
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Errore nel confronto');
      }

      const data = await response.json();
      setAnalysis(data.analysis);
    } catch (err: any) {
      setError(err.message || 'Errore nel confronto. Riprova tra poco.');
      console.error('Comparison error:', err);
    } finally {
      setIsAnalyzing(false);
    }
  };

  // Calcola risparmio
  const getPriceSummary = () => {
    if (selectedProducts.length < 2) return null;
    const prices = selectedProducts.map(p => p.price);
    const min = Math.min(...prices);
    const max = Math.max(...prices);
    const saving = max - min;
    const savingPercent = ((saving / max) * 100).toFixed(0);
    return { min, max, saving, savingPercent };
  };

  const priceSummary = getPriceSummary();

  return (
    <div className="min-h-screen bg-gradient-to-b from-emerald-50 to-white">
      <div className="max-w-7xl mx-auto px-4 py-8">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            Confronta Prezzi Integratori
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Seleziona 2-3 prodotti dalla nostra collezione di oltre {products.length} integratori 
            e scopri quale offre il miglior rapporto qualità-prezzo con l'aiuto della nostra AI
          </p>
        </div>

        {/* Add products search */}
        <div className="bg-white rounded-lg shadow-sm p-6 mb-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-1">
            ➕ Aggiungi Prodotti al Confronto
          </h2>
          <p className="text-gray-600 text-sm mb-4">
            Cerca un integratore per aggiungerlo al confronto
          </p>

          <div className="relative">
            <input
              type="text"
              placeholder="🔍 Cerca per nome, marca o categoria..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 outline-none text-gray-900"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery('')}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
              >
                ✕
              </button>
            )}
          </div>

          {searchQuery.length >= 2 && (
            <div className="mt-4">
              {(() => {
                const query = searchQuery.toLowerCase();
                const results = products.filter(p =>
                  !selectedProducts.find(s => s.id === p.id) &&
                  (p.name.toLowerCase().includes(query) ||
                   p.brand.toLowerCase().includes(query) ||
                   p.category.toLowerCase().includes(query))
                );
                if (results.length === 0) {
                  return <p className="text-gray-500 text-sm py-4">Nessun prodotto trovato per &quot;{searchQuery}&quot;</p>;
                }
                return (
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 max-h-[400px] overflow-y-auto">
                    {results.slice(0, 12).map(product => (
                      <button
                        key={product.id}
                        onClick={() => { toggleProduct(product); setSearchQuery(''); }}
                        className="flex items-center gap-3 p-3 border border-gray-100 rounded-lg hover:bg-emerald-50 hover:border-emerald-200 transition text-left"
                      >
                        <div className="w-10 h-10 flex-shrink-0 bg-gray-50 rounded-lg flex items-center justify-center overflow-hidden">
                          {product.imageUrl?.startsWith('http') ? (
                            <img src={product.imageUrl} alt={product.name} className="w-10 h-10 object-contain" />
                          ) : (
                            <span className="text-lg">💊</span>
                          )}
                        </div>
                        <div className="min-w-0 flex-1">
                          <p className="text-sm font-medium text-gray-900">{product.name}</p>
                          <p className="text-xs text-gray-500">{product.brand} · €{product.price.toFixed(2)}</p>
                        </div>
                        <span className="text-emerald-600 text-lg flex-shrink-0">+</span>
                      </button>
                    ))}
                  </div>
                );
              })()}
            </div>
          )}
        </div>

        {/* Selected products summary */}
        {selectedProducts.length > 0 && (
          <div className="bg-emerald-50 border border-emerald-200 rounded-lg p-6 mb-8">
            <h3 className="font-bold text-gray-900 mb-3">
              Prodotti selezionati ({selectedProducts.length}/3)
            </h3>
            <div className="space-y-2 mb-4">
              {selectedProducts.map(p => (
                <div key={p.id} className="bg-white px-3 py-2 rounded-lg flex items-center gap-2">
                  <span className="flex-shrink-0">💊</span>
                  <a href={`/prodotto/${p.id}`} className="font-medium text-emerald-700 hover:text-emerald-900 hover:underline text-sm min-w-0">{p.brand} — {p.name}</a>
                  <button
                    onClick={() => toggleProduct(p)}
                    className="text-red-500 hover:text-red-700 flex-shrink-0 ml-auto"
                  >
                    ✕
                  </button>
                </div>
              ))}
            </div>

            {priceSummary && (
              <div className="mt-4 grid grid-cols-2 gap-4 text-center">
                <div className="bg-white rounded-lg p-3">
                  <div className="text-sm text-gray-600">Prezzo minimo</div>
                  <div className="text-xl font-bold text-green-600">€{priceSummary.min.toFixed(2)}</div>
                </div>
                <div className="bg-white rounded-lg p-3">
                  <div className="text-sm text-gray-600">Prezzo massimo</div>
                  <div className="text-xl font-bold text-gray-900">€{priceSummary.max.toFixed(2)}</div>
                </div>
                <div className="bg-white rounded-lg p-3 col-span-2">
                  <div className="text-sm text-gray-600">Risparmio potenziale</div>
                  <div className="text-xl font-bold text-emerald-600">
                    €{priceSummary.saving.toFixed(2)} ({priceSummary.savingPercent}%)
                  </div>
                </div>
              </div>
            )}

            {selectedProducts.length >= 2 && (
              <button
                onClick={handleCompare}
                disabled={isAnalyzing}
                className="w-full mt-4 bg-emerald-600 text-white px-6 py-3 rounded-lg font-semibold text-lg hover:bg-emerald-700 transition disabled:bg-gray-400"
              >
                {isAnalyzing ? '⏳ Analisi in corso...' : '🤖 Confronta con AI'}
              </button>
            )}
          </div>
        )}

        {/* Error message */}
        {error && (
          <div className="bg-red-50 border border-red-200 text-red-800 px-4 py-3 rounded-lg mb-6">
            {error}
          </div>
        )}

        {/* AI Analysis Results */}
        {analysis && (
          <div className="bg-white rounded-lg shadow-lg p-8 mb-8 border-2 border-emerald-200">
            <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center gap-2">
              <span>🤖</span> Analisi AI - Confronto Dettagliato
            </h2>

            <div className="space-y-6">
              <div>
                <h3 className="font-bold text-lg text-gray-900 mb-2">Livello di Equivalenza</h3>
                <p className="text-gray-700">{analysis.livello_equivalenza}</p>
              </div>

              <div>
                <h3 className="font-bold text-lg text-gray-900 mb-2">Miglior Rapporto Qualità-Prezzo</h3>
                <p className="text-gray-700">{analysis.migliore_rapporto_prezzo_qualita}</p>
              </div>

              <div>
                <h3 className="font-bold text-lg text-gray-900 mb-2">Differenze Principali</h3>
                <p className="text-gray-700">{analysis.differenze_principali}</p>
              </div>

              {analysis.avvertenze && (
                <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
                  <h3 className="font-bold text-lg text-gray-900 mb-2">⚠️ Avvertenze</h3>
                  <p className="text-gray-700">{analysis.avvertenze}</p>
                </div>
              )}

              <div className="bg-emerald-50 border border-emerald-200 rounded-lg p-4">
                <h3 className="font-bold text-lg text-gray-900 mb-2">💡 Raccomandazione Finale</h3>
                <p className="text-gray-700">{analysis.raccomandazione_finale}</p>
              </div>
            </div>

            <div className="mt-6 p-4 bg-gray-50 rounded text-sm text-gray-600">
              ℹ️ Questa analisi è generata da intelligenza artificiale e ha scopo puramente informativo. 
              Consulta sempre un medico o farmacista prima di assumere integratori.
            </div>
          </div>
        )}

        {/* Instructions */}
        {selectedProducts.length === 0 && (
          <div className="bg-white rounded-lg shadow-sm p-6 mb-8 text-center">
            <div className="text-6xl mb-4">🤖</div>
            <h3 className="text-xl font-semibold text-gray-900 mb-2">
              Come funziona il confronto AI
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-8">
              <div>
                <div className="w-12 h-12 bg-emerald-100 rounded-full flex items-center justify-center mx-auto mb-3">
                  <span className="text-xl">1️⃣</span>
                </div>
                <h4 className="font-medium mb-2">Seleziona prodotti</h4>
                <p className="text-sm text-gray-600">Scegli 2-3 integratori che vuoi confrontare dalla lista sottostante</p>
              </div>
              <div>
                <div className="w-12 h-12 bg-emerald-100 rounded-full flex items-center justify-center mx-auto mb-3">
                  <span className="text-xl">2️⃣</span>
                </div>
                <h4 className="font-medium mb-2">Avvia l'analisi</h4>
                <p className="text-sm text-gray-600">Clicca "Confronta con AI" per ottenere un'analisi dettagliata</p>
              </div>
              <div>
                <div className="w-12 h-12 bg-emerald-100 rounded-full flex items-center justify-center mx-auto mb-3">
                  <span className="text-xl">3️⃣</span>
                </div>
                <h4 className="font-medium mb-2">Leggi i risultati</h4>
                <p className="text-sm text-gray-600">Ricevi consigli personalizzati su composizione, prezzo e qualità</p>
              </div>
            </div>
          </div>
        )}

        {/* Affiliate Disclosure */}
        <div className="mt-8">
          <AffiliateDisclosure variant="banner" />
        </div>
      </div>
    </div>
  );
}