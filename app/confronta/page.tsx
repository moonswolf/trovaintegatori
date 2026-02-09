'use client';

import { useState } from 'react';

// Database sample prodotti
const PRODUCTS_DB = [
  {
    id: 1,
    name: "Vitamina D3 4000 UI",
    brand: "Solgar",
    category: "Vitamina D",
    price: 18.50,
    composition: "Colecalciferolo 100mcg (4000 UI)",
    form: "Capsule vegetali",
    quantity: "60 capsule",
    image: "💊",
    store: "Amazon",
    asin: "B001234567",
    affiliateLink: "https://amazon.it/dp/B001234567?tag=trovaintegatori-21"
  },
  {
    id: 2,
    name: "Vitamina D3 Plus",
    brand: "Vegavero",
    category: "Vitamina D",
    price: 12.90,
    composition: "Colecalciferolo 100mcg (4000 UI), Olio di cocco",
    form: "Capsule softgel",
    quantity: "200 capsule",
    image: "💊",
    store: "Amazon",
    asin: "B002345678",
    affiliateLink: "https://amazon.it/dp/B002345678?tag=trovaintegrati-21"
  },
  {
    id: 3,
    name: "Magnesio Supremo",
    brand: "Natural Point",
    category: "Magnesio",
    price: 15.20,
    composition: "Magnesio citrato 375mg",
    form: "Polvere",
    quantity: "300g",
    image: "🥫",
    store: "Farmacia Igea",
    asin: null,
    affiliateLink: "https://farmaciaigea.com/magnesio-supremo"
  },
  {
    id: 4,
    name: "Magnesio Completo",
    brand: "Solgar",
    category: "Magnesio",
    price: 22.50,
    composition: "Magnesio citrato 400mg, Vitamina B6 2mg",
    form: "Compresse",
    quantity: "100 compresse",
    image: "💊",
    store: "Amazon",
    asin: "B003456789",
    affiliateLink: "https://amazon.it/dp/B003456789?tag=trovaintegrati-21"
  },
  {
    id: 5,
    name: "Collagene Marino",
    brand: "Nutrimea",
    category: "Collagene",
    price: 29.90,
    composition: "Collagene idrolizzato 5000mg, Vitamina C 80mg",
    form: "Polvere",
    quantity: "300g",
    image: "🥫",
    store: "Amazon",
    asin: "B004567890",
    affiliateLink: "https://amazon.it/dp/B004567890?tag=trovaintegrati-21"
  },
  {
    id: 6,
    name: "Collagene + Acido Ialuronico",
    brand: "WeightWorld",
    category: "Collagene",
    price: 24.99,
    composition: "Collagene 1000mg, Acido Ialuronico 100mg, Vitamina C 40mg",
    form: "Capsule",
    quantity: "120 capsule",
    image: "💊",
    store: "Amazon",
    asin: "B005678901",
    affiliateLink: "https://amazon.it/dp/B005678901?tag=trovaintegrati-21"
  },
  {
    id: 7,
    name: "Omega 3 Fish Oil",
    brand: "Omegor",
    category: "Omega-3",
    price: 32.50,
    composition: "EPA 500mg, DHA 250mg per capsula",
    form: "Capsule softgel",
    quantity: "60 capsule",
    image: "💊",
    store: "Farmacia Igea",
    asin: null,
    affiliateLink: "https://farmaciaigea.com/omega3-omegor"
  },
  {
    id: 8,
    name: "Omega 3 Triple Strength",
    brand: "Solgar",
    category: "Omega-3",
    price: 38.90,
    composition: "EPA 504mg, DHA 378mg per capsula",
    form: "Capsule softgel",
    quantity: "50 capsule",
    image: "💊",
    store: "Amazon",
    asin: "B006789012",
    affiliateLink: "https://amazon.it/dp/B006789012?tag=trovaintegrati-21"
  },
  {
    id: 9,
    name: "Vitamina D3 Gocce",
    brand: "Nutrimea",
    category: "Vitamina D",
    price: 14.90,
    composition: "Colecalciferolo 50mcg per goccia (2000 UI)",
    form: "Gocce",
    quantity: "50ml",
    image: "💧",
    store: "Amazon",
    asin: "B007890123",
    affiliateLink: "https://amazon.it/dp/B007890123?tag=trovaintegrati-21"
  },
  {
    id: 10,
    name: "Magnesio + Potassio",
    brand: "Massigen",
    category: "Magnesio",
    price: 11.90,
    composition: "Magnesio 375mg, Potassio 300mg",
    form: "Bustine effervescenti",
    quantity: "24 bustine",
    image: "📦",
    store: "Farmacia Igea",
    asin: null,
    affiliateLink: "https://farmaciaigea.com/magnesio-potassio"
  },
  {
    id: 11,
    name: "Collagene + Biotina",
    brand: "Gloryfeel",
    category: "Collagene",
    price: 19.97,
    composition: "Collagene 500mg, Biotina 2.5mg, Vitamina C 40mg",
    form: "Capsule",
    quantity: "180 capsule",
    image: "💊",
    store: "Amazon",
    asin: "B008901234",
    affiliateLink: "https://amazon.it/dp/B008901234?tag=trovaintegrati-21"
  },
  {
    id: 12,
    name: "Omega 3 Vegano",
    brand: "Nutravita",
    category: "Omega-3",
    price: 26.99,
    composition: "DHA da alghe 250mg, EPA 125mg",
    form: "Capsule softgel vegetali",
    quantity: "60 capsule",
    image: "💊",
    store: "Amazon",
    asin: "B009012345",
    affiliateLink: "https://amazon.it/dp/B009012345?tag=trovaintegrati-21"
  }
];

interface Product {
  id: number;
  name: string;
  brand: string;
  category: string;
  price: number;
  composition: string;
  form: string;
  quantity: string;
  image: string;
  store: string;
  asin: string | null;
  affiliateLink: string;
}

export default function Confronta() {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [selectedProducts, setSelectedProducts] = useState<Product[]>([]);
  const [analysis, setAnalysis] = useState<any>(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [error, setError] = useState('');

  // Categorie uniche
  const categories = ['all', ...Array.from(new Set(PRODUCTS_DB.map(p => p.category)))];

  // Filtra prodotti
  const filteredProducts = PRODUCTS_DB.filter(p => {
    const matchesSearch = p.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         p.brand.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         p.composition.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === 'all' || p.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

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
          <p className="text-xl text-gray-600">
            Seleziona 2-3 prodotti e scopri quale offre il miglior rapporto qualità-prezzo
          </p>
        </div>

        {/* Search and filters */}
        <div className="bg-white rounded-lg shadow-md p-6 mb-8">
          <div className="grid md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Cerca prodotto
              </label>
              <input
                type="text"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder="Es: Vitamina D, Magnesio, Omega 3..."
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 outline-none"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Categoria
              </label>
              <select
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 outline-none"
              >
                {categories.map(cat => (
                  <option key={cat} value={cat}>
                    {cat === 'all' ? 'Tutte le categorie' : cat}
                  </option>
                ))}
              </select>
            </div>
          </div>
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
                  <span>{p.image}</span>
                  <span className="font-medium">{p.name}</span>
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
                  <div className="text-sm text-gray-600">Risparmio</div>
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
              <span>🤖</span> Analisi AI
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

        {/* Products grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredProducts.map(product => {
            const isSelected = selectedProducts.find(p => p.id === product.id);
            return (
              <div
                key={product.id}
                className={`bg-white rounded-lg shadow-md overflow-hidden transition-all cursor-pointer ${
                  isSelected ? 'ring-4 ring-emerald-500 shadow-xl' : 'hover:shadow-lg'
                }`}
                onClick={() => toggleProduct(product)}
              >
                <div className="p-6">
                  <div className="text-5xl mb-4 text-center">{product.image}</div>
                  <h3 className="font-bold text-lg text-gray-900 mb-2">{product.name}</h3>
                  <p className="text-sm text-gray-600 mb-3">{product.brand}</p>
                  
                  <div className="space-y-2 text-sm mb-4">
                    <div className="flex items-start">
                      <span className="font-medium text-gray-700 mr-2">Composizione:</span>
                      <span className="text-gray-600">{product.composition}</span>
                    </div>
                    <div className="flex items-start">
                      <span className="font-medium text-gray-700 mr-2">Formato:</span>
                      <span className="text-gray-600">{product.form}</span>
                    </div>
                    <div className="flex items-start">
                      <span className="font-medium text-gray-700 mr-2">Quantità:</span>
                      <span className="text-gray-600">{product.quantity}</span>
                    </div>
                  </div>

                  <div className="border-t pt-4 flex items-center justify-between">
                    <div>
                      <div className="text-2xl font-bold text-emerald-600">€{product.price.toFixed(2)}</div>
                      <div className="text-xs text-gray-500">{product.store}</div>
                    </div>
                    {isSelected ? (
                      <div className="bg-emerald-600 text-white px-4 py-2 rounded-lg font-semibold">
                        ✓ Selezionato
                      </div>
                    ) : (
                      <button className="bg-gray-100 text-gray-700 px-4 py-2 rounded-lg font-semibold hover:bg-gray-200 transition">
                        Seleziona
                      </button>
                    )}
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {filteredProducts.length === 0 && (
          <div className="text-center py-12 text-gray-500">
            Nessun prodotto trovato. Prova a modificare i filtri di ricerca.
          </div>
        )}
      </div>
    </div>
  );
}
