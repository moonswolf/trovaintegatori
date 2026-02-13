import Link from 'next/link';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Pagina non trovata',
  description: 'La pagina che stai cercando non esiste. Torna alla home per esplorare i nostri integratori.',
};

export default function NotFound() {
  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center">
      <div className="text-center px-4">
        <div className="text-8xl mb-6">🔍</div>
        <h1 className="text-4xl font-bold text-gray-900 mb-4">Pagina non trovata</h1>
        <p className="text-lg text-gray-600 mb-8 max-w-md mx-auto">
          La pagina che stai cercando non esiste o è stata spostata.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link
            href="/"
            className="inline-flex items-center justify-center px-6 py-3 bg-emerald-600 text-white font-semibold rounded-lg hover:bg-emerald-700 transition"
          >
            Torna alla Home
          </Link>
          <Link
            href="/confronta"
            className="inline-flex items-center justify-center px-6 py-3 border-2 border-emerald-600 text-emerald-600 font-semibold rounded-lg hover:bg-emerald-50 transition"
          >
            Confronta Integratori
          </Link>
        </div>
      </div>
    </div>
  );
}
