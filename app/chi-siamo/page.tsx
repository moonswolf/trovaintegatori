import Link from 'next/link';

export default function ChiSiamo() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-emerald-50 to-white">
      <div className="max-w-4xl mx-auto px-4 py-16">
        <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-8">
          Chi Siamo
        </h1>

        <div className="prose prose-lg max-w-none">
          <p className="text-xl text-gray-700 mb-6 leading-relaxed">
            TrovaIntegratori.it è nato da una semplice constatazione: acquistare integratori e vitamine 
            in Italia significa spesso pagare più del necessario.
          </p>

          <div className="bg-white rounded-lg shadow-md p-8 mb-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">La Nostra Missione</h2>
            <p className="text-gray-700 mb-4">
              Aiutare gli italiani a risparmiare fino al 40% sui loro acquisti di integratori, 
              confrontando automaticamente i prezzi tra Amazon, farmacie online e e-commerce specializzati.
            </p>
            <p className="text-gray-700">
              Vogliamo rendere trasparente un mercato dove le differenze di prezzo per lo stesso prodotto 
              possono arrivare anche a €20-30, semplicemente confrontando diversi rivenditori.
            </p>
          </div>

          <div className="bg-emerald-50 rounded-lg p-8 mb-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Perché TrovaIntegratori</h2>
            <ul className="space-y-3 text-gray-700">
              <li className="flex items-start">
                <span className="text-emerald-600 mr-2">✓</span>
                <span><strong>Risparmio Reale:</strong> Confrontiamo i prezzi di oltre 10 store online in tempo reale</span>
              </li>
              <li className="flex items-start">
                <span className="text-emerald-600 mr-2">✓</span>
                <span><strong>Trasparenza:</strong> Non vendiamo direttamente - ti mostriamo dove trovare il prezzo migliore</span>
              </li>
              <li className="flex items-start">
                <span className="text-emerald-600 mr-2">✓</span>
                <span><strong>Intelligenza Artificiale:</strong> La nostra AI analizza la composizione e ti suggerisce prodotti equivalenti più economici</span>
              </li>
              <li className="flex items-start">
                <span className="text-emerald-600 mr-2">✓</span>
                <span><strong>Alert Automatici:</strong> Ti avvisiamo quando il prezzo del tuo integratore scende</span>
              </li>
            </ul>
          </div>

          <div className="bg-white rounded-lg shadow-md p-8 mb-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Come Guadagniamo</h2>
            <p className="text-gray-700 mb-4">
              TrovaIntegratori è gratuito per gli utenti. Guadagniamo piccole commissioni quando acquisti 
              tramite i nostri link affiliati con Amazon e farmacie partner.
            </p>
            <p className="text-gray-700 mb-4">
              Questo modello ci permette di:
            </p>
            <ul className="list-disc list-inside text-gray-700 space-y-2 ml-4">
              <li>Mantenere il servizio completamente gratuito</li>
              <li>Restare indipendenti nelle nostre raccomandazioni</li>
              <li>Continuare a migliorare il comparatore</li>
            </ul>
            <p className="text-gray-700 mt-4">
              <strong>Importante:</strong> Le commissioni non influenzano i prezzi che vedi - paghi lo stesso 
              prezzo che troveresti andando direttamente sul sito del negozio.
            </p>
          </div>

          <div className="bg-white rounded-lg shadow-md p-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Il Team</h2>
            <p className="text-gray-700 mb-4">
              Siamo un piccolo team di sviluppatori e appassionati di benessere che ha deciso di 
              rendere più accessibile il mondo degli integratori in Italia.
            </p>
            <p className="text-gray-700">
              Se hai domande, suggerimenti o vuoi segnalarci un problema, 
              <Link href="/contatti" className="text-emerald-600 hover:text-emerald-700 font-medium ml-1">
                contattaci qui
              </Link>.
            </p>
          </div>
        </div>

        <div className="mt-12 text-center">
          <Link 
            href="/confronta"
            className="inline-block bg-emerald-600 text-white px-8 py-4 rounded-lg text-lg font-semibold hover:bg-emerald-700 transition shadow-lg"
          >
            Inizia a Confrontare Prezzi →
          </Link>
        </div>
      </div>
    </div>
  );
}
