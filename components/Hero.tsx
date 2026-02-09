export default function Hero() {
  return (
    <section className="relative bg-gradient-to-br from-blue-50 to-green-50 py-20 px-4">
      <div className="max-w-6xl mx-auto text-center">
        <div className="mb-6">
          <span className="inline-block bg-green-100 text-green-800 px-4 py-2 rounded-full text-sm font-medium mb-4">
            🚀 Lancio Febbraio 2025
          </span>
        </div>
        
        <h1 className="text-5xl md:text-6xl font-bold text-gray-900 mb-6 leading-tight">
          Trova l'Integratore al<br />
          <span className="text-blue-600">Prezzo Migliore</span>
        </h1>
        
        <p className="text-xl md:text-2xl text-gray-600 mb-8 max-w-3xl mx-auto">
          Confronta prezzi da Amazon, farmacie e e-commerce.<br />
          <strong className="text-green-600">Risparmia fino al 40%</strong> sui tuoi integratori preferiti.
        </p>
        
        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
          <a 
            href="#email-form" 
            className="bg-blue-600 text-white px-8 py-4 rounded-lg text-lg font-semibold hover:bg-blue-700 transition-all shadow-lg hover:shadow-xl"
          >
            Iscriviti per Early Access
          </a>
          <button className="text-gray-700 px-8 py-4 rounded-lg text-lg font-semibold hover:bg-white transition-all">
            Scopri Come Funziona ↓
          </button>
        </div>
        
        <div className="mt-12 flex flex-wrap justify-center gap-8 text-gray-600">
          <div className="flex items-center gap-2">
            <svg className="w-5 h-5 text-green-600" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
            </svg>
            <span>Confronto automatico</span>
          </div>
          <div className="flex items-center gap-2">
            <svg className="w-5 h-5 text-green-600" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
            </svg>
            <span>Alert prezzi</span>
          </div>
          <div className="flex items-center gap-2">
            <svg className="w-5 h-5 text-green-600" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
            </svg>
            <span>100% gratuito</span>
          </div>
        </div>
      </div>
    </section>
  );
}
