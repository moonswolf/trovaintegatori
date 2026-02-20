import type { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'Privacy Policy',
  description: 'Informativa sulla privacy di TrovaIntegratori.it. Scopri come trattiamo i tuoi dati personali e quali cookie utilizziamo.',
  alternates: { canonical: 'https://trovaintegratori.it/privacy-policy' },
  openGraph: {
    title: 'Privacy Policy - TrovaIntegratori.it',
    description: 'Informativa sulla privacy di TrovaIntegratori.it.',
    type: 'website',
    url: 'https://trovaintegratori.it/privacy-policy',
  },
};

export default function PrivacyPolicy() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-emerald-50 to-white">
      <div className="max-w-4xl mx-auto px-4 py-16">
        <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-8">
          Privacy Policy
        </h1>

        <div className="prose prose-lg max-w-none">
          <p className="text-sm text-gray-500 mb-8">Ultimo aggiornamento: 20 febbraio 2026</p>

          <h2 className="text-2xl font-bold text-gray-900 mt-10 mb-4">1. Titolare del Trattamento</h2>
          <p className="text-gray-700 mb-4">
            Il titolare del trattamento dei dati è <strong>Francesco Piombo</strong>.
          </p>
          <ul className="list-disc pl-6 text-gray-700 mb-6 space-y-1">
            <li>Email: <a href="mailto:info@trovaintegratori.it" className="text-emerald-600 hover:underline">info@trovaintegratori.it</a></li>
            <li>Sito web: <a href="https://francescopiombo.it" target="_blank" rel="noopener noreferrer" className="text-emerald-600 hover:underline">francescopiombo.it</a></li>
          </ul>

          <h2 className="text-2xl font-bold text-gray-900 mt-10 mb-4">2. Tipologia di Dati Raccolti</h2>
          <p className="text-gray-700 mb-4">
            TrovaIntegratori.it <strong>non raccoglie direttamente dati personali</strong> degli utenti. 
            Non è presente alcun form di registrazione, login o raccolta diretta di informazioni personali.
          </p>
          <p className="text-gray-700 mb-4">
            I dati raccolti in forma anonima e aggregata tramite strumenti di terze parti includono:
          </p>
          <ul className="list-disc pl-6 text-gray-700 mb-6 space-y-1">
            <li>Dati di navigazione (pagine visitate, durata della sessione, dispositivo utilizzato)</li>
            <li>Dati tecnici (indirizzo IP anonimizzato, browser, sistema operativo)</li>
            <li>Dati di interazione (click sui link affiliati verso Amazon)</li>
          </ul>

          <h2 className="text-2xl font-bold text-gray-900 mt-10 mb-4">3. Finalità del Trattamento</h2>
          <p className="text-gray-700 mb-4">I dati vengono trattati per le seguenti finalità:</p>
          <ul className="list-disc pl-6 text-gray-700 mb-6 space-y-1">
            <li><strong>Analisi statistica:</strong> comprendere come gli utenti utilizzano il sito per migliorarne contenuti e funzionalità</li>
            <li><strong>Funzionamento tecnico:</strong> garantire il corretto funzionamento del sito</li>
            <li><strong>Programma di affiliazione:</strong> tracciare i click verso Amazon Italia per il riconoscimento delle commissioni affiliate</li>
          </ul>

          <h2 className="text-2xl font-bold text-gray-900 mt-10 mb-4">4. Strumenti di Terze Parti</h2>
          
          <h3 className="text-xl font-semibold text-gray-900 mt-6 mb-3">Google Analytics 4 (GA4)</h3>
          <p className="text-gray-700 mb-4">
            Questo sito utilizza Google Analytics 4 (ID: G-FHKSW9LYR1), un servizio di analisi web fornito da Google LLC. 
            GA4 utilizza cookie per raccogliere informazioni in forma anonima e aggregata sull&apos;utilizzo del sito. 
            L&apos;indirizzo IP viene anonimizzato prima della memorizzazione.
          </p>
          <p className="text-gray-700 mb-4">
            Per maggiori informazioni: <a href="https://policies.google.com/privacy" target="_blank" rel="noopener noreferrer" className="text-emerald-600 hover:underline">Privacy Policy di Google</a>.
          </p>
          <p className="text-gray-700 mb-6">
            Puoi disattivare Google Analytics installando il{' '}
            <a href="https://tools.google.com/dlpage/gaoptout" target="_blank" rel="noopener noreferrer" className="text-emerald-600 hover:underline">
              componente aggiuntivo del browser per la disattivazione di Google Analytics
            </a>.
          </p>

          <h3 className="text-xl font-semibold text-gray-900 mt-6 mb-3">Programma di Affiliazione Amazon</h3>
          <p className="text-gray-700 mb-6">
            TrovaIntegratori.it partecipa al Programma di Affiliazione Amazon EU (tag: trovaintegrat-21). 
            Quando clicchi su un link verso Amazon, Amazon potrebbe impostare cookie per tracciare l&apos;acquisto 
            e riconoscere la commissione. Per maggiori informazioni consulta la{' '}
            <a href="https://www.amazon.it/gp/help/customer/display.html?nodeId=GX7NJQ4ZB8MHFRNJ" target="_blank" rel="noopener noreferrer" className="text-emerald-600 hover:underline">
              Privacy Policy di Amazon
            </a>.
          </p>

          <h2 className="text-2xl font-bold text-gray-900 mt-10 mb-4">5. Base Giuridica del Trattamento</h2>
          <p className="text-gray-700 mb-6">
            Il trattamento dei dati si basa sul <strong>legittimo interesse</strong> del titolare (art. 6, par. 1, lett. f del GDPR) 
            per i cookie tecnici necessari al funzionamento del sito, e sul <strong>consenso dell&apos;utente</strong> (art. 6, par. 1, lett. a del GDPR) 
            per i cookie analitici e di profilazione di terze parti.
          </p>

          <h2 className="text-2xl font-bold text-gray-900 mt-10 mb-4">6. Conservazione dei Dati</h2>
          <p className="text-gray-700 mb-6">
            I dati raccolti tramite Google Analytics vengono conservati per un periodo massimo di 14 mesi, 
            come configurato nelle impostazioni di GA4. I cookie di Amazon seguono le politiche di conservazione 
            definite da Amazon stessa.
          </p>

          <h2 className="text-2xl font-bold text-gray-900 mt-10 mb-4">7. Diritti dell&apos;Utente</h2>
          <p className="text-gray-700 mb-4">
            Ai sensi degli articoli 15-22 del Regolamento UE 2016/679 (GDPR), hai diritto di:
          </p>
          <ul className="list-disc pl-6 text-gray-700 mb-6 space-y-1">
            <li>Accedere ai tuoi dati personali</li>
            <li>Richiederne la rettifica o la cancellazione</li>
            <li>Limitare od opporti al trattamento</li>
            <li>Richiedere la portabilità dei dati</li>
            <li>Revocare il consenso in qualsiasi momento</li>
            <li>Proporre reclamo all&apos;Autorità Garante per la protezione dei dati personali (<a href="https://www.garanteprivacy.it" target="_blank" rel="noopener noreferrer" className="text-emerald-600 hover:underline">www.garanteprivacy.it</a>)</li>
          </ul>
          <p className="text-gray-700 mb-6">
            Per esercitare i tuoi diritti, contattaci all&apos;indirizzo{' '}
            <a href="mailto:info@trovaintegratori.it" className="text-emerald-600 hover:underline">info@trovaintegratori.it</a>.
          </p>

          <h2 className="text-2xl font-bold text-gray-900 mt-10 mb-4">8. Modifiche alla Privacy Policy</h2>
          <p className="text-gray-700 mb-6">
            Il titolare si riserva il diritto di modificare questa informativa in qualsiasi momento. 
            Le modifiche saranno pubblicate su questa pagina con aggiornamento della data in alto.
          </p>

          <div className="mt-12 pt-8 border-t border-gray-200">
            <Link href="/" className="inline-block bg-emerald-600 hover:bg-emerald-700 text-white px-6 py-3 rounded-lg font-medium transition">
              ← Torna alla Home
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
