'use client';

import { useState } from 'react';
import { getProducts } from '@/lib/data';
import { Product } from '@/types/product';
import ProductGrid from '@/components/ProductGrid';
import AffiliateDisclosure from '@/components/AffiliateDisclosure';

export default function Confronta() {
  const [selectedProducts, setSelectedProducts] = useState<Product[]>([]);
  const [analysis, setAnalysis] = useState<any>(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [error, setError] = useState('');

  const products = getProducts();

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

        {/* Selected products summary */}
        {selectedProducts.length > 0 && (
          <div className="bg-emerald-50 border border-emerald-200 rounded-lg p-6 mb-8">
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-bold text-gray-900">
                Prodotti selezionati ({selectedProducts.length}/3)
              </h3>
              {selectedProducts.length >= 2 && (
                <button
                  onClick={handleCompare}
                  disabled={isAnalyzing}
                  className="bg-emerald-600 text-white px-6 py-2 rounded-lg font-semibold hover:bg-emerald-700 transition disabled:bg-gray-400"
                >
                  {isAnalyzing ? 'Analisi in corso...' : '🤖 Confronta con AI'}
                </button>
              )}
            </div>
            <div className="flex flex-wrap gap-2">
              {selectedProducts.map(p => (
                <div key={p.id} className="bg-white px-4 py-2 rounded-full flex items-center gap-2">
                  <span>💊</span>
                  <span className="font-medium">{p.brand} {p.name}</span>
                  <button
                    onClick={() => toggleProduct(p)}
                    className="text-red-500 hover:text-red-700 ml-2"
                  >
                    ✕
                  </button>
                </div>
              ))}
            </div>

            {priceSummary && (
              <div className="mt-4 grid grid-cols-3 gap-4 text-center">
                <div className="bg-white rounded p-3">
                  <div className="text-sm text-gray-600">Prezzo minimo</div>
                  <div className="text-xl font-bold text-green-600">€{priceSummary.min.toFixed(2)}</div>
                </div>
                <div className="bg-white rounded p-3">
                  <div className="text-sm text-gray-600">Prezzo massimo</div>
                  <div className="text-xl font-bold text-gray-900">€{priceSummary.max.toFixed(2)}</div>
                </div>
                <div className="bg-white rounded p-3">
                  <div className="text-sm text-gray-600">Risparmio potenziale</div>
                  <div className="text-xl font-bold text-emerald-600">
                    €{priceSummary.saving.toFixed(2)} ({priceSummary.savingPercent}%)
                  </div>
                </div>
              </div>
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

        {/* Products grid */}
        <div className="bg-white rounded-lg shadow-sm p-6">
          <div className="mb-6">
            <h2 className="text-2xl font-bold text-gray-900 mb-2">
              Tutti i Prodotti Disponibili
            </h2>
            <p className="text-gray-600">
              Cerca e filtra tra i nostri {products.length} integratori per trovare quelli da confrontare
            </p>
          </div>

          <ProductGrid
            products={products}
            onProductSelect={toggleProduct}
            selectedProducts={selectedProducts}
            showFilters={true}
            showSorting={true}
          />
        </div>

        {/* Affiliate Disclosure */}
        <div className="mt-8">
          <AffiliateDisclosure variant="banner" />
        </div>
      </div>
    </div>
  );
}