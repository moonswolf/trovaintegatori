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

        {/* Steps */}
        <div className="space-y-6 mb-12">
          {[
            {
              num: '1',
              title: 'Cerca il Tuo Integratore',
              text: 'Usa la barra di ricerca per trovare l\'integratore che ti interessa. Puoi cercare per nome del prodotto, principio attivo o categoria (es. Vitamina D3, Omega 3, Magnesio).',
            },
            {
              num: '2',
              title: 'Confronta i Prezzi',
              text: 'Il nostro sistema confronta automaticamente i prezzi da Amazon.it, farmacie online e e-commerce specializzati. L\'intelligenza artificiale analizza anche la composizione e ti suggerisce alternative più economiche.',
            },
            {
              num: '3',
              title: 'Acquista al Prezzo Migliore',
              text: 'Clicca sul negozio con il prezzo migliore e completa l\'acquisto direttamente sul loro sito. Noi ti mostriamo dove risparmiare, loro gestiscono l\'ordine e la spedizione.',
            },
          ].map((step) => (
            <div key={step.num} className="bg-white rounded-lg border border-slate-200 p-6 md:p-8">
              <div className="text-emerald-600 font-bold text-sm uppercase tracking-wider mb-2">
                Step {step.num}
              </div>
              <h2 className="text-xl md:text-2xl font-bold text-gray-900 mb-3">{step.title}</h2>
              <p className="text-gray-700 leading-relaxed">{step.text}</p>
            </div>
          ))}
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
