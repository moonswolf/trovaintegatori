export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-gray-900 text-gray-300 py-12 px-4">
      <div className="max-w-6xl mx-auto">
        <div className="grid md:grid-cols-3 gap-8 mb-8">
          <div>
            <h3 className="text-white text-xl font-bold mb-4">TrovaIntegratori.it</h3>
            <p className="text-sm">
              Il comparatore intelligente per trovare integratori e vitamine al miglior prezzo online.
            </p>
          </div>
          
          <div>
            <h4 className="text-white font-semibold mb-4">Link Utili</h4>
            <ul className="space-y-2 text-sm">
              <li>
                <a href="#" className="hover:text-white transition-colors">Privacy Policy</a>
              </li>
              <li>
                <a href="#" className="hover:text-white transition-colors">Termini e Condizioni</a>
              </li>
              <li>
                <a href="#" className="hover:text-white transition-colors">Cookie Policy</a>
              </li>
              <li>
                <a href="#" className="hover:text-white transition-colors">Contatti</a>
              </li>
            </ul>
          </div>
          
          <div>
            <h4 className="text-white font-semibold mb-4">Stato Progetto</h4>
            <div className="bg-green-900 bg-opacity-30 border border-green-700 rounded-lg p-4">
              <p className="text-green-400 font-semibold mb-1">🚧 In Sviluppo</p>
              <p className="text-sm">Lancio previsto: Febbraio 2025</p>
            </div>
          </div>
        </div>
        
        <div className="border-t border-gray-800 pt-8 text-center text-sm">
          <p>
            © {currentYear} TrovaIntegratori.it - P.IVA IT{"{tua_piva}"} - Tutti i diritti riservati
          </p>
          <p className="mt-2 text-gray-500">
            Made with ❤️ in Italy
          </p>
        </div>
      </div>
    </footer>
  );
}
