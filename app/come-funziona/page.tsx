import Link from 'next/link';
import FAQ from '@/components/FAQ';
import faqData from '@/data/faqs.json';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Come Funziona il Comparatore di Integratori',
  description: 'Scopri come confrontare prezzi di integratori in 3 semplici passi: cerca, confronta e risparmia fino al 40% su Amazon e farmacie online.',
  alternates: { canonical: 'https://trovaintegratori.it/come-funziona' },
  openGraph: {
    title: 'Come Funziona - TrovaIntegratori.it',
    description: 'Confronta prezzi di integratori in 3 semplici passi.',
    type: 'website',
    url: 'https://trovaintegratori.it/come-funziona',
  },
};

export default function ComeFunziona() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-50 to-white">
      <div className="max-w-4xl mx-auto px-4 py-16">
        <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-8">
          Come Funziona
        </h1>

        <p className="text-xl text-gray-700 mb-12 leading-relaxed">
          TrovaIntegratori rende semplicissimo confrontare i prezzi di integratori e vitamine. 
          Ecco come funziona in 3 semplici step:
        </p>

        {/* Step 1 */}
        <div className="bg-white rounded-lg shadow-md p-8 mb-8 border-l-4 border-emerald-600">
          <div className="flex items-center mb-4">
            <div className="bg-emerald-600 text-white w-12 h-12 rounded-full flex items-center justify-center text-xl font-bold mr-4">
              1
            </div>
            <h2 className="text-2xl font-bold text-gray-900">Cerca il Tuo Integratore</h2>
          </div>
          <p className="text-gray-700 mb-4 ml-16">
            Usa la barra di ricerca per trovare l'integratore che ti interessa. Puoi cercare per:
          </p>
          <ul className="list-disc list-inside text-gray-700 ml-20 space-y-2">
            <li>Nome del prodotto (es. "Vitamina D3")</li>
            <li>Principio attivo (es. "Colecalciferolo")</li>
            <li>Categoria (es. "Omega 3", "Magnesio")</li>
          </ul>
        </div>

        {/* Step 2 */}
        <div className="bg-white rounded-lg shadow-md p-8 mb-8 border-l-4 border-blue-600">
          <div className="flex items-center mb-4">
            <div className="bg-blue-600 text-white w-12 h-12 rounded-full flex items-center justify-center text-xl font-bold mr-4">
              2
            </div>
            <h2 className="text-2xl font-bold text-gray-900">Confronta i Prezzi</h2>
          </div>
          <p className="text-gray-700 mb-4 ml-16">
            Il nostro sistema confronta automaticamente i prezzi da:
          </p>
          <ul className="list-disc list-inside text-gray-700 ml-20 space-y-2">
            <li><strong>Amazon.it</strong> - Il marketplace più grande</li>
            <li><strong>Farmacie Online</strong> - Farmacia Igea, DocPeter, eFarma</li>
            <li><strong>E-commerce Specializzati</strong> - Altri negozi affidabili</li>
          </ul>
          <div className="bg-blue-50 rounded p-4 mt-4 ml-16">
            <p className="text-sm text-gray-700">
              <strong>Suggerimento AI:</strong> La nostra intelligenza artificiale analizza anche la 
              composizione e ti suggerisce prodotti equivalenti che potrebbero costarti ancora meno.
            </p>
          </div>
        </div>

        {/* Step 3 */}
        <div className="bg-white rounded-lg shadow-md p-8 mb-8 border-l-4 border-purple-600">
          <div className="flex items-center mb-4">
            <div className="bg-purple-600 text-white w-12 h-12 rounded-full flex items-center justify-center text-xl font-bold mr-4">
              3
            </div>
            <h2 className="text-2xl font-bold text-gray-900">Acquista al Prezzo Migliore</h2>
          </div>
          <p className="text-gray-700 mb-4 ml-16">
            Clicca sul negozio con il prezzo migliore e completa l'acquisto direttamente sul loro sito. 
            Noi ti mostriamo dove risparmiare, loro gestiscono l'ordine e la spedizione.
          </p>
          <div className="bg-purple-50 rounded p-4 mt-4 ml-16">
            <p className="text-sm text-gray-700">
              <strong>Funzione Alert:</strong> Se il prezzo non ti convince, puoi impostare un alert. 
              Ti avviseremo via email quando il prezzo scende sotto la soglia che hai scelto.
            </p>
          </div>
        </div>

        {/* Features Extra */}
        <div className="bg-gradient-to-r from-emerald-50 to-blue-50 rounded-lg p-8 mb-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-6 text-center">
            Funzionalità Extra
          </h2>
          <div className="grid md:grid-cols-2 gap-6">
            <div className="bg-white rounded-lg p-6">
              <h3 className="font-bold text-lg text-gray-900 mb-2">Storico Prezzi</h3>
              <p className="text-gray-700">
                Visualizza l'andamento del prezzo negli ultimi mesi per capire se è il momento giusto per acquistare.
              </p>
            </div>
            <div className="bg-white rounded-lg p-6">
              <h3 className="font-bold text-lg text-gray-900 mb-2">Analisi AI</h3>
              <p className="text-gray-700">
                L'intelligenza artificiale confronta le composizioni e identifica prodotti equivalenti più economici.
              </p>
            </div>
            <div className="bg-white rounded-lg p-6">
              <h3 className="font-bold text-lg text-gray-900 mb-2">Watchlist</h3>
              <p className="text-gray-700">
                Salva i tuoi integratori preferiti e ricevi notifiche quando vanno in offerta.
              </p>
            </div>
            <div className="bg-white rounded-lg p-6">
              <h3 className="font-bold text-lg text-gray-900 mb-2">100% Gratuito</h3>
              <p className="text-gray-700">
                Nessun costo, nessun abbonamento. Confronta tutti gli integratori che vuoi gratuitamente.
              </p>
            </div>
          </div>
        </div>

        {/* FAQ Section with Schema */}
        <div className="mb-8">
          <FAQ
            items={faqData['come-funziona']}
            title="Domande Frequenti sul Comparatore"
            subtitle="Tutto quello che devi sapere su come funziona il nostro servizio"
          />
        </div>

        {/* CTA finale */}
        <div className="text-center">
          <Link 
            href="/confronta"
            className="inline-block bg-emerald-600 text-white px-8 py-4 rounded-lg text-lg font-semibold hover:bg-emerald-700 transition shadow-lg"
          >
            Prova il Comparatore Ora →
          </Link>
          <p className="text-gray-600 mt-4">
            Nessuna registrazione richiesta. Inizia subito a risparmiare!
          </p>
        </div>
      </div>
    </div>
  );
}
