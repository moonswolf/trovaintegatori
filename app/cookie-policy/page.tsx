import type { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'Cookie Policy',
  description: 'Cookie Policy di TrovaIntegratori.it. Informazioni sui cookie utilizzati dal sito per analytics e funzionamento tecnico.',
  alternates: { canonical: 'https://trovaintegratori.it/cookie-policy' },
  openGraph: {
    title: 'Cookie Policy - TrovaIntegratori.it',
    description: 'Cookie Policy di TrovaIntegratori.it.',
    type: 'website',
    url: 'https://trovaintegratori.it/cookie-policy',
  },
};

export default function CookiePolicy() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-emerald-50 to-white">
      <div className="max-w-4xl mx-auto px-4 py-16">
        <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-8">
          Cookie Policy
        </h1>

        <div className="prose prose-lg max-w-none">
          <p className="text-sm text-gray-500 mb-8">Ultimo aggiornamento: 20 febbraio 2026</p>

          <h2 className="text-2xl font-bold text-gray-900 mt-10 mb-4">1. Cosa Sono i Cookie</h2>
          <p className="text-gray-700 mb-6">
            I cookie sono piccoli file di testo che i siti web memorizzano sul tuo dispositivo (computer, 
            tablet o smartphone) durante la navigazione. Vengono utilizzati per far funzionare il sito in modo 
            efficiente e per fornire informazioni ai proprietari del sito.
          </p>

          <h2 className="text-2xl font-bold text-gray-900 mt-10 mb-4">2. Titolare del Trattamento</h2>
          <p className="text-gray-700 mb-4">
            Il titolare del trattamento è <strong>Francesco Piombo</strong>.
          </p>
          <ul className="list-disc pl-6 text-gray-700 mb-6 space-y-1">
            <li>Email: <a href="mailto:info@trovaintegratori.it" className="text-emerald-600 hover:underline">info@trovaintegratori.it</a></li>
            <li>Sito web: <a href="https://francescopiombo.it" target="_blank" rel="noopener noreferrer" className="text-emerald-600 hover:underline">francescopiombo.it</a></li>
          </ul>

          <h2 className="text-2xl font-bold text-gray-900 mt-10 mb-4">3. Tipologie di Cookie Utilizzati</h2>

          <h3 className="text-xl font-semibold text-gray-900 mt-6 mb-3">3.1 Cookie Tecnici (necessari)</h3>
          <p className="text-gray-700 mb-4">
            Sono cookie essenziali per il funzionamento del sito. Non richiedono il consenso dell&apos;utente 
            ai sensi dell&apos;art. 122, comma 1 del Codice Privacy.
          </p>
          <div className="overflow-x-auto mb-6">
            <table className="min-w-full text-sm border border-gray-200 rounded-lg">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-4 py-2 text-left font-semibold text-gray-900 border-b">Cookie</th>
                  <th className="px-4 py-2 text-left font-semibold text-gray-900 border-b">Finalità</th>
                  <th className="px-4 py-2 text-left font-semibold text-gray-900 border-b">Durata</th>
                </tr>
              </thead>
              <tbody className="text-gray-700">
                <tr className="border-b">
                  <td className="px-4 py-2">Preferenze di sessione</td>
                  <td className="px-4 py-2">Mantenimento delle preferenze durante la navigazione</td>
                  <td className="px-4 py-2">Sessione</td>
                </tr>
                <tr className="border-b">
                  <td className="px-4 py-2">Cookie di consenso</td>
                  <td className="px-4 py-2">Memorizzazione delle scelte sui cookie</td>
                  <td className="px-4 py-2">12 mesi</td>
                </tr>
              </tbody>
            </table>
          </div>

          <h3 className="text-xl font-semibold text-gray-900 mt-6 mb-3">3.2 Cookie Analitici (Google Analytics 4)</h3>
          <p className="text-gray-700 mb-4">
            Utilizziamo Google Analytics 4 (ID: G-FHKSW9LYR1) per raccogliere dati statistici anonimi 
            sull&apos;utilizzo del sito. Questi cookie ci aiutano a capire come gli utenti interagiscono con il sito 
            per migliorarne contenuti e funzionalità.
          </p>
          <div className="overflow-x-auto mb-6">
            <table className="min-w-full text-sm border border-gray-200 rounded-lg">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-4 py-2 text-left font-semibold text-gray-900 border-b">Cookie</th>
                  <th className="px-4 py-2 text-left font-semibold text-gray-900 border-b">Finalità</th>
                  <th className="px-4 py-2 text-left font-semibold text-gray-900 border-b">Durata</th>
                </tr>
              </thead>
              <tbody className="text-gray-700">
                <tr className="border-b">
                  <td className="px-4 py-2">_ga</td>
                  <td className="px-4 py-2">Distinguere gli utenti unici</td>
                  <td className="px-4 py-2">2 anni</td>
                </tr>
                <tr className="border-b">
                  <td className="px-4 py-2">_ga_*</td>
                  <td className="px-4 py-2">Mantenere lo stato della sessione</td>
                  <td className="px-4 py-2">2 anni</td>
                </tr>
              </tbody>
            </table>
          </div>
          <p className="text-gray-700 mb-6">
            Google Analytics anonimizza gli indirizzi IP degli utenti. Per maggiori informazioni: {' '}
            <a href="https://policies.google.com/privacy" target="_blank" rel="noopener noreferrer" className="text-emerald-600 hover:underline">
              Privacy Policy di Google
            </a>.
          </p>

          <h3 className="text-xl font-semibold text-gray-900 mt-6 mb-3">3.3 Cookie di Terze Parti (Amazon)</h3>
          <p className="text-gray-700 mb-6">
            Quando clicchi su un link affiliato verso Amazon.it, Amazon potrebbe impostare propri cookie 
            per tracciare la provenienza della visita e, in caso di acquisto, riconoscere la commissione di affiliazione 
            (tag: trovaintegrat-21). Questi cookie sono gestiti interamente da Amazon. Per maggiori informazioni: {' '}
            <a href="https://www.amazon.it/gp/help/customer/display.html?nodeId=GX7NJQ4ZB8MHFRNJ" target="_blank" rel="noopener noreferrer" className="text-emerald-600 hover:underline">
              Privacy e Cookie Policy di Amazon
            </a>.
          </p>

          <h2 className="text-2xl font-bold text-gray-900 mt-10 mb-4">4. Come Gestire i Cookie</h2>
          <p className="text-gray-700 mb-4">
            Puoi gestire le tue preferenze sui cookie in diversi modi:
          </p>
          <ul className="list-disc pl-6 text-gray-700 mb-6 space-y-2">
            <li>
              <strong>Impostazioni del browser:</strong> tutti i principali browser consentono di bloccare o 
              eliminare i cookie dalle impostazioni. Consulta la guida del tuo browser per istruzioni specifiche.
            </li>
            <li>
              <strong>Opt-out Google Analytics:</strong> installa il{' '}
              <a href="https://tools.google.com/dlpage/gaoptout" target="_blank" rel="noopener noreferrer" className="text-emerald-600 hover:underline">
                componente aggiuntivo per la disattivazione di Google Analytics
              </a>.
            </li>
          </ul>

          <h3 className="text-lg font-semibold text-gray-900 mt-6 mb-3">Link alle impostazioni cookie dei principali browser:</h3>
          <ul className="list-disc pl-6 text-gray-700 mb-6 space-y-1">
            <li><a href="https://support.google.com/chrome/answer/95647" target="_blank" rel="noopener noreferrer" className="text-emerald-600 hover:underline">Google Chrome</a></li>
            <li><a href="https://support.mozilla.org/it/kb/Gestione%20dei%20cookie" target="_blank" rel="noopener noreferrer" className="text-emerald-600 hover:underline">Mozilla Firefox</a></li>
            <li><a href="https://support.apple.com/it-it/guide/safari/sfri11471/mac" target="_blank" rel="noopener noreferrer" className="text-emerald-600 hover:underline">Apple Safari</a></li>
            <li><a href="https://support.microsoft.com/it-it/microsoft-edge/eliminare-i-cookie-in-microsoft-edge-63947406-40ac-c3b8-57b9-2a946a29ae09" target="_blank" rel="noopener noreferrer" className="text-emerald-600 hover:underline">Microsoft Edge</a></li>
          </ul>

          <div className="bg-amber-50 border border-amber-200 rounded-lg p-4 mb-6">
            <p className="text-amber-800 text-sm">
              <strong>Nota:</strong> la disattivazione dei cookie potrebbe compromettere alcune funzionalità del sito.
            </p>
          </div>

          <h2 className="text-2xl font-bold text-gray-900 mt-10 mb-4">5. Aggiornamenti alla Cookie Policy</h2>
          <p className="text-gray-700 mb-6">
            Questa Cookie Policy può essere aggiornata periodicamente. Ti invitiamo a consultare regolarmente 
            questa pagina per restare informato sulle modalità di utilizzo dei cookie.
          </p>

          <h2 className="text-2xl font-bold text-gray-900 mt-10 mb-4">6. Contatti</h2>
          <p className="text-gray-700 mb-6">
            Per qualsiasi domanda sui cookie utilizzati da questo sito, contattaci all&apos;indirizzo{' '}
            <a href="mailto:info@trovaintegratori.it" className="text-emerald-600 hover:underline">info@trovaintegratori.it</a>.
          </p>

          <div className="mt-12 pt-8 border-t border-gray-200 flex flex-wrap gap-4">
            <Link href="/privacy-policy" className="inline-block bg-slate-200 hover:bg-slate-300 text-slate-800 px-6 py-3 rounded-lg font-medium transition">
              Privacy Policy
            </Link>
            <Link href="/" className="inline-block bg-emerald-600 hover:bg-emerald-700 text-white px-6 py-3 rounded-lg font-medium transition">
              ← Torna alla Home
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
