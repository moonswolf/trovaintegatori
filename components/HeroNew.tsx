import Link from 'next/link';
import products from '@/data/products.json';

export default function HeroNew() {
  const productCount = products.length;
  const categoryCount = new Set(products.map((p: any) => p.category)).size;
  return (
    <div className="bg-gradient-to-b from-slate-50 to-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="pt-20 pb-16 text-center lg:pt-32">
          {/* Main Heading */}
          <h1 className="mx-auto max-w-4xl font-display text-5xl font-bold tracking-tight text-slate-900 sm:text-7xl">
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
          <p className="mx-auto mt-6 max-w-2xl text-lg tracking-tight text-slate-600">
            Trova i migliori prezzi per integratori alimentari su Amazon Italia. 
            Confronta prodotti, leggi recensioni e risparmia sui tuoi acquisti.
          </p>

          {/* CTA Buttons */}
          <div className="mt-10 flex flex-col md:flex-row justify-center items-center gap-4 md:gap-6 px-4">
            <Link
              href="/confronta"
              className="w-full md:w-auto group inline-flex items-center justify-center rounded-lg bg-emerald-600 px-8 py-4 text-sm font-semibold text-white hover:bg-emerald-700 focus:outline-none focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-emerald-600 active:bg-emerald-800 transition"
            >
              Confronta con AI
            </Link>
            <Link
              href="#categorie"
              className="w-full md:w-auto group inline-flex ring-1 items-center justify-center rounded-lg ring-slate-200 px-8 py-4 text-sm focus:outline-none hover:ring-slate-300 active:bg-slate-100 active:text-slate-600 focus-visible:outline-blue-600 focus-visible:ring-slate-300 transition"
            >
              Esplora categorie
            </Link>
          </div>

          {/* Trust Badges */}
          <div className="mt-16 flex justify-center">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-3xl">
              <div className="flex flex-col items-center">
                <div className="w-12 h-12 bg-emerald-50 rounded-lg flex items-center justify-center mb-3">
                  <svg className="w-6 h-6 text-emerald-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v12m-3-2.818l.879.659c1.171.879 3.07.879 4.242 0 1.172-.879 1.172-2.303 0-3.182C13.536 12.219 12.768 12 12 12c-.725 0-1.45-.22-2.003-.659-1.106-.879-1.106-2.303 0-3.182s2.9-.879 4.006 0l.415.33M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <h3 className="font-semibold text-slate-900 mb-1">Prezzi Aggiornati</h3>
                <p className="text-sm text-slate-500 text-center">
                  Monitoriamo costantemente i prezzi per garantirti sempre le migliori offerte
                </p>
              </div>
              
              <div className="flex flex-col items-center">
                <div className="w-12 h-12 bg-emerald-50 rounded-lg flex items-center justify-center mb-3">
                  <svg className="w-6 h-6 text-emerald-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75m-3-7.036A11.959 11.959 0 013.598 6 11.99 11.99 0 003 9.749c0 5.592 3.824 10.29 9 11.623 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.571-.598-3.751h-.152c-3.196 0-6.1-1.248-8.25-3.285z" />
                  </svg>
                </div>
                <h3 className="font-semibold text-slate-900 mb-1">Link Sicuri Amazon</h3>
                <p className="text-sm text-slate-500 text-center">
                  Tutti i link portano direttamente ad Amazon Italia per acquisti sicuri
                </p>
              </div>
              
              <div className="flex flex-col items-center">
                <div className="w-12 h-12 bg-emerald-50 rounded-lg flex items-center justify-center mb-3">
                  <svg className="w-6 h-6 text-emerald-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M9.813 15.904L9 18.75l-.813-2.846a4.5 4.5 0 00-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 003.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 003.09 3.09L15.75 12l-2.846.813a4.5 4.5 0 00-3.09 3.09zM18.259 8.715L18 9.75l-.259-1.035a3.375 3.375 0 00-2.455-2.456L14.25 6l1.036-.259a3.375 3.375 0 002.455-2.456L18 2.25l.259 1.035a3.375 3.375 0 002.455 2.456L21.75 6l-1.036.259a3.375 3.375 0 00-2.455 2.456z" />
                  </svg>
                </div>
                <h3 className="font-semibold text-slate-900 mb-1">Confronto AI</h3>
                <p className="text-sm text-slate-500 text-center">
                  Intelligenza artificiale per confronti dettagliati tra prodotti
                </p>
              </div>
            </div>
          </div>

          {/* Stats */}
          <div className="mt-16 border-t border-gray-200 pt-8">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
              <div className="text-center">
                <div className="text-2xl font-bold text-emerald-600">{productCount}+</div>
                <div className="text-sm text-slate-500">Prodotti disponibili</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-emerald-600">{categoryCount}</div>
                <div className="text-sm text-slate-500">Categorie principali</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-emerald-600">100%</div>
                <div className="text-sm text-slate-500">Link sicuri Amazon</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-emerald-600">AI</div>
                <div className="text-sm text-slate-500">Confronto intelligente</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
