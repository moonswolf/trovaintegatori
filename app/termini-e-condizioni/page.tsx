import type { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'Termini e Condizioni',
  description: 'Termini e condizioni d\'uso di TrovaIntegratori.it. Regole per l\'utilizzo del servizio di confronto prezzi integratori.',
  alternates: { canonical: 'https://trovaintegratori.it/termini-e-condizioni' },
  openGraph: {
    title: 'Termini e Condizioni - TrovaIntegratori.it',
    description: 'Termini e condizioni d\'uso di TrovaIntegratori.it.',
    type: 'website',
    url: 'https://trovaintegratori.it/termini-e-condizioni',
  },
};

export default function TerminiCondizioni() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-emerald-50 to-white">
      <div className="max-w-4xl mx-auto px-4 py-16">
        <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-8">
          Termini e Condizioni
        </h1>

        <div className="prose prose-lg max-w-none">
          <p className="text-sm text-gray-500 mb-8">Ultimo aggiornamento: 20 febbraio 2026</p>

          <h2 className="text-2xl font-bold text-gray-900 mt-10 mb-4">1. Informazioni Generali</h2>
          <p className="text-gray-700 mb-4">
            Il presente sito web, <strong>TrovaIntegratori.it</strong>, è di proprietà e gestito da <strong>Francesco Piombo</strong> 
            (di seguito &quot;il Titolare&quot;).
          </p>
          <ul className="list-disc pl-6 text-gray-700 mb-6 space-y-1">
            <li>Email: <a href="mailto:info@trovaintegratori.it" className="text-emerald-600 hover:underline">info@trovaintegratori.it</a></li>
            <li>Sito web del titolare: <a href="https://francescopiombo.it" target="_blank" rel="noopener noreferrer" className="text-emerald-600 hover:underline">francescopiombo.it</a></li>
          </ul>
          <p className="text-gray-700 mb-6">
            L&apos;utilizzo del sito implica l&apos;accettazione integrale dei presenti Termini e Condizioni. 
            Se non accetti questi termini, ti invitiamo a non utilizzare il sito.
          </p>

          <h2 className="text-2xl font-bold text-gray-900 mt-10 mb-4">2. Descrizione del Servizio</h2>
          <p className="text-gray-700 mb-4">
            TrovaIntegratori.it è un servizio gratuito di <strong>confronto prezzi</strong> per integratori alimentari, 
            vitamine e prodotti per il benessere disponibili su Amazon Italia.
          </p>
          <p className="text-gray-700 mb-6">
            Il sito fornisce informazioni comparative sui prezzi, recensioni e caratteristiche dei prodotti 
            per aiutare gli utenti a fare scelte di acquisto informate. <strong>TrovaIntegratori.it non vende 
            direttamente alcun prodotto.</strong>
          </p>

          <h2 className="text-2xl font-bold text-gray-900 mt-10 mb-4">3. Programma di Affiliazione</h2>
          <p className="text-gray-700 mb-4">
            TrovaIntegratori.it partecipa al <strong>Programma di Affiliazione Amazon EU</strong>, un programma 
            di affiliazione che consente ai siti di percepire una commissione pubblicitaria pubblicizzando 
            e fornendo link al sito Amazon.it.
          </p>
          <p className="text-gray-700 mb-6">
            I link presenti sul sito che rimandano a prodotti su Amazon.it sono <strong>link affiliati</strong>. 
            Ciò significa che se acquisti un prodotto dopo aver cliccato su uno di questi link, 
            TrovaIntegratori.it potrebbe ricevere una piccola commissione da Amazon, senza alcun costo 
            aggiuntivo per te.
          </p>

          <h2 className="text-2xl font-bold text-gray-900 mt-10 mb-4">4. Esclusione di Responsabilità</h2>
          <p className="text-gray-700 mb-4">
            Le informazioni presenti su TrovaIntegratori.it sono fornite a <strong>scopo puramente informativo</strong> e non costituiscono:
          </p>
          <ul className="list-disc pl-6 text-gray-700 mb-6 space-y-1">
            <li>Consiglio medico, nutrizionale o sanitario</li>
            <li>Raccomandazione all&apos;acquisto di specifici prodotti</li>
            <li>Garanzia sull&apos;accuratezza, completezza o aggiornamento dei prezzi e delle informazioni mostrate</li>
          </ul>
          <p className="text-gray-700 mb-4">
            I prezzi e la disponibilità dei prodotti sono soggetti a variazioni da parte di Amazon e possono 
            differire da quanto mostrato sul sito. <strong>Il prezzo effettivo e la disponibilità sono sempre 
            quelli indicati su Amazon.it al momento dell&apos;acquisto.</strong>
          </p>
          <p className="text-gray-700 mb-6">
            Prima di assumere qualsiasi integratore alimentare, ti consigliamo di consultare il tuo medico 
            o un professionista sanitario qualificato.
          </p>

          <h2 className="text-2xl font-bold text-gray-900 mt-10 mb-4">5. Proprietà Intellettuale</h2>
          <p className="text-gray-700 mb-6">
            Tutti i contenuti presenti sul sito (testi, grafica, logo, layout, codice) sono di proprietà 
            del Titolare o utilizzati con le dovute autorizzazioni. È vietata la riproduzione, distribuzione 
            o modifica dei contenuti senza autorizzazione scritta del Titolare. I marchi e i loghi dei prodotti 
            mostrati appartengono ai rispettivi proprietari.
          </p>

          <h2 className="text-2xl font-bold text-gray-900 mt-10 mb-4">6. Link a Siti Esterni</h2>
          <p className="text-gray-700 mb-6">
            Il sito contiene link verso siti esterni, in particolare Amazon.it. Il Titolare non è responsabile 
            per i contenuti, le politiche sulla privacy o le pratiche di siti terzi. L&apos;accesso a siti esterni 
            avviene sotto la esclusiva responsabilità dell&apos;utente.
          </p>

          <h2 className="text-2xl font-bold text-gray-900 mt-10 mb-4">7. Limitazione di Responsabilità</h2>
          <p className="text-gray-700 mb-6">
            Il Titolare non sarà responsabile per eventuali danni diretti, indiretti, incidentali o consequenziali 
            derivanti dall&apos;utilizzo o dall&apos;impossibilità di utilizzo del sito, inclusi eventuali errori nelle 
            informazioni sui prodotti o nei prezzi mostrati.
          </p>

          <h2 className="text-2xl font-bold text-gray-900 mt-10 mb-4">8. Modifiche ai Termini</h2>
          <p className="text-gray-700 mb-6">
            Il Titolare si riserva il diritto di modificare i presenti Termini e Condizioni in qualsiasi momento. 
            Le modifiche saranno pubblicate su questa pagina con aggiornamento della data in alto. 
            L&apos;uso continuato del sito dopo le modifiche implica l&apos;accettazione dei nuovi termini.
          </p>

          <h2 className="text-2xl font-bold text-gray-900 mt-10 mb-4">9. Legge Applicabile e Foro Competente</h2>
          <p className="text-gray-700 mb-6">
            I presenti Termini e Condizioni sono regolati dalla legge italiana. Per qualsiasi controversia 
            derivante dall&apos;uso del sito sarà competente il Foro del luogo di residenza del Titolare.
          </p>

          <h2 className="text-2xl font-bold text-gray-900 mt-10 mb-4">10. Contatti</h2>
          <p className="text-gray-700 mb-6">
            Per qualsiasi domanda relativa ai presenti Termini e Condizioni, puoi contattarci all&apos;indirizzo{' '}
            <a href="mailto:info@trovaintegratori.it" className="text-emerald-600 hover:underline">info@trovaintegratori.it</a>.
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
