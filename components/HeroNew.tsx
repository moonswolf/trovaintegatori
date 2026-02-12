import Link from 'next/link';

export default function HeroNew() {
  return (
    <div className="bg-gradient-to-b from-emerald-50 to-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="pt-20 pb-16 text-center lg:pt-32">
          {/* Main Heading */}
          <h1 className="mx-auto max-w-4xl font-display text-5xl font-bold tracking-tight text-gray-900 sm:text-7xl">
            Confronta e{' '}
            <span className="relative whitespace-nowrap text-emerald-600">
              <svg
                aria-hidden="true"
                viewBox="0 0 418 42"
                className="absolute left-0 top-2/3 h-[0.58em] w-full fill-emerald-300/70"
                preserveAspectRatio="none"
              >
                <path d="m203.371.916c-26.013-2.078-76.686 1.963-124.73 9.946L67.3 12.749C35.421 18.062 18.2 21.766 6.004 25.934 1.244 27.561.828 27.778.874 28.61c.07 1.214.828 1.121 9.595-1.176 9.072-2.377 17.15-3.92 39.246-7.496C123.565 7.986 157.869 4.492 195.942 5.046c7.461.108 19.25 1.696 19.17 2.582-.107 1.183-7.874 4.31-25.75 10.366-21.992 7.45-35.43 12.534-36.701 13.884-2.173 2.308-.202 4.407 4.442 4.734 2.654.187 3.263.157 15.593-.78 35.401-2.686 57.944-3.488 88.365-3.143 46.327.526 75.721 2.23 130.788 7.584 19.787 1.924 20.814 1.98 24.557 1.332l.066-.011c1.201-.203 1.53-1.825.399-2.335-2.911-1.31-4.893-1.604-22.048-3.261-57.509-5.556-87.871-7.36-132.059-7.842-23.239-.254-33.617-.116-50.627.674-11.629.54-42.371 2.494-46.696 2.967-2.359.259 8.133-3.625 26.504-9.81 23.239-7.825 27.934-10.149 28.304-14.005.417-4.348-3.529-6-16.878-7.066Z" />
              </svg>
              <span className="relative">Risparmia</span>
            </span>{' '}
            sugli Integratori
          </h1>

          {/* Subtitle */}
          <p className="mx-auto mt-6 max-w-2xl text-lg tracking-tight text-gray-700">
            Trova i migliori prezzi per integratori alimentari su Amazon Italia. 
            Confronta prodotti, leggi recensioni e risparmia sui tuoi acquisti.
          </p>

          {/* CTA Buttons */}
          <div className="mt-10 flex justify-center gap-x-6">
            <Link
              href="/confronta"
              className="group inline-flex items-center justify-center rounded-full bg-emerald-600 px-8 py-4 text-sm font-semibold text-white hover:bg-emerald-700 hover:text-slate-100 focus:outline-none focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-emerald-600 active:bg-emerald-800 active:text-emerald-100 transition"
            >
              🤖 Confronta con AI
            </Link>
            <Link
              href="#categorie"
              className="group inline-flex ring-1 items-center justify-center rounded-full ring-slate-200 px-8 py-4 text-sm focus:outline-none hover:ring-slate-300 active:bg-slate-100 active:text-slate-600 focus-visible:outline-blue-600 focus-visible:ring-slate-300 transition"
            >
              <span className="ml-3">Esplora categorie</span>
            </Link>
          </div>

          {/* Trust Badges */}
          <div className="mt-16 flex justify-center">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-3xl">
              <div className="flex flex-col items-center">
                <div className="w-12 h-12 bg-emerald-100 rounded-full flex items-center justify-center mb-3">
                  <span className="text-2xl">💰</span>
                </div>
                <h3 className="font-semibold text-gray-900 mb-1">Prezzi Aggiornati</h3>
                <p className="text-sm text-gray-600 text-center">
                  Monitoriamo costantemente i prezzi per garantirti sempre le migliori offerte
                </p>
              </div>
              
              <div className="flex flex-col items-center">
                <div className="w-12 h-12 bg-emerald-100 rounded-full flex items-center justify-center mb-3">
                  <span className="text-2xl">🛡️</span>
                </div>
                <h3 className="font-semibold text-gray-900 mb-1">Link Sicuri Amazon</h3>
                <p className="text-sm text-gray-600 text-center">
                  Tutti i link portano direttamente ad Amazon Italia per acquisti sicuri
                </p>
              </div>
              
              <div className="flex flex-col items-center">
                <div className="w-12 h-12 bg-emerald-100 rounded-full flex items-center justify-center mb-3">
                  <span className="text-2xl">🤖</span>
                </div>
                <h3 className="font-semibold text-gray-900 mb-1">Confronto AI</h3>
                <p className="text-sm text-gray-600 text-center">
                  Intelligenza artificiale per confronti dettagliati tra prodotti
                </p>
              </div>
            </div>
          </div>

          {/* Stats */}
          <div className="mt-16 border-t border-gray-200 pt-8">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
              <div className="text-center">
                <div className="text-2xl font-bold text-emerald-600">30+</div>
                <div className="text-sm text-gray-600">Prodotti disponibili</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-emerald-600">6</div>
                <div className="text-sm text-gray-600">Categorie principali</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-emerald-600">100%</div>
                <div className="text-sm text-gray-600">Link sicuri Amazon</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-emerald-600">AI</div>
                <div className="text-sm text-gray-600">Confronto intelligente</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}