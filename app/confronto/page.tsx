import { Metadata } from 'next';
import Link from 'next/link';
import comparisons from '@/data/comparisons.json';

export const metadata: Metadata = {
  title: 'Confronti Integratori: Guide Comparative Complete',
  description:
    'Confronti dettagliati tra i migliori integratori: vitamina D3 vs D2, creatina monoidrato vs HCL, whey vs caseina, e molto altro. Guide basate su evidenze scientifiche.',
  alternates: { canonical: 'https://trovaintegratori.it/confronto' },
  openGraph: {
    title: 'Confronti Integratori | TrovaIntegratori.it',
    description:
      'Guide comparative complete per scegliere gli integratori giusti. Confronti basati su studi scientifici.',
    url: 'https://trovaintegratori.it/confronto',
    type: 'website',
    locale: 'it_IT',
  },
};

export default function ConfrontiIndexPage() {
  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <nav className="text-sm text-gray-500 mb-6">
        <Link href="/" className="hover:text-emerald-600">Home</Link>
        <span className="mx-2">/</span>
        <span className="text-gray-700">Confronti</span>
      </nav>

      <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
        ⚖️ Confronti tra Integratori
      </h1>
      <p className="text-lg text-gray-600 mb-8 max-w-2xl">
        Guide comparative dettagliate per aiutarti a scegliere gli integratori
        giusti. Ogni confronto è basato su evidenze scientifiche e fonti
        autorevoli.
      </p>

      <div className="grid gap-4">
        {comparisons.map((comp) => (
          <Link
            key={comp.slug}
            href={`/confronto/${comp.slug}`}
            className="block border border-gray-200 rounded-xl p-5 hover:border-emerald-300 hover:shadow-md transition bg-white"
          >
            <h2 className="text-xl font-bold text-gray-900 mb-2">
              ⚖️ {comp.title}
            </h2>
            <p className="text-gray-600 text-sm line-clamp-2">
              {comp.metaDescription}
            </p>
            <span className="inline-block mt-3 text-sm text-emerald-600 font-medium">
              Leggi il confronto completo →
            </span>
          </Link>
        ))}
      </div>
    </div>
  );
}
