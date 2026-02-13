'use client';

import { useState } from 'react';

export default function Contatti() {
  const [formData, setFormData] = useState({
    nome: '',
    email: '',
    messaggio: ''
  });
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('loading');

    // TODO: Qui integrerai il tuo servizio email (SendGrid, Resend, ecc.)
    // Per ora simula l'invio
    setTimeout(() => {
      setStatus('success');
      setFormData({ nome: '', email: '', messaggio: '' });
      
      // Reset dopo 3 secondi
      setTimeout(() => setStatus('idle'), 3000);
    }, 1000);
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-purple-50 to-white">
      <div className="max-w-4xl mx-auto px-4 py-16">
        <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-8">
          Contattaci
        </h1>

        <p className="text-xl text-gray-700 mb-12 leading-relaxed">
          Hai domande, suggerimenti o hai trovato un bug? Siamo qui per aiutarti! 
          Compila il form qui sotto e ti risponderemo il prima possibile.
        </p>

        <div className="grid md:grid-cols-2 gap-8">
          {/* Form */}
          <div className="bg-white rounded-lg shadow-md p-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">Invia un Messaggio</h2>
            
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label htmlFor="nome" className="block text-sm font-medium text-gray-700 mb-2">
                  Nome *
                </label>
                <input
                  type="text"
                  id="nome"
                  required
                  value={formData.nome}
                  onChange={(e) => setFormData({...formData, nome: e.target.value})}
                  className="w-full px-4 py-2 text-gray-900 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 outline-none transition"
                  placeholder-gray-600 placeholder="Il tuo nome"
                />
              </div>

              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                  Email *
                </label>
                <input
                  type="email"
                  id="email"
                  required
                  value={formData.email}
                  onChange={(e) => setFormData({...formData, email: e.target.value})}
                  className="w-full px-4 py-2 text-gray-900 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 outline-none transition"
                  placeholder-gray-600 placeholder="tua@email.it"
                />
              </div>

              <div>
                <label htmlFor="messaggio" className="block text-sm font-medium text-gray-700 mb-2">
                  Messaggio *
                </label>
                <textarea
                  id="messaggio"
                  required
                  value={formData.messaggio}
                  onChange={(e) => setFormData({...formData, messaggio: e.target.value})}
                  rows={6}
                  className="w-full px-4 py-2 text-gray-900 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 outline-none transition resize-none"
                  placeholder-gray-600 placeholder="Scrivi qui il tuo messaggio..."
                />
              </div>

              <button
                type="submit"
                disabled={status === 'loading'}
                className="w-full bg-emerald-600 text-white py-3 rounded-lg font-semibold hover:bg-emerald-700 transition disabled:bg-gray-400 disabled:cursor-not-allowed"
              >
                {status === 'loading' ? 'Invio in corso...' : 'Invia Messaggio'}
              </button>

              {status === 'success' && (
                <div className="bg-green-50 border border-green-200 text-green-800 px-4 py-3 rounded-lg">
                  ✓ Messaggio inviato con successo! Ti risponderemo presto.
                </div>
              )}

              {status === 'error' && (
                <div className="bg-red-50 border border-red-200 text-red-800 px-4 py-3 rounded-lg">
                  ✗ Si è verificato un errore. Riprova tra poco.
                </div>
              )}
            </form>
          </div>

          {/* Info di contatto e FAQ */}
          <div className="space-y-6">
            <div className="bg-white rounded-lg shadow-md p-8">
              <h3 className="text-xl font-bold text-gray-900 mb-4">Altre Informazioni</h3>
              
              <div className="space-y-4">
                <div>
                  <h4 className="font-semibold text-gray-900 mb-2">📧 Email Diretta</h4>
                  <p className="text-gray-700">
                    <a href="mailto:info@trovaintegratori.it" className="text-emerald-600 hover:text-emerald-700">
                      info@trovaintegratori.it
                    </a>
                  </p>
                </div>

                <div>
                  <h4 className="font-semibold text-gray-900 mb-2">⏰ Tempo di Risposta</h4>
                  <p className="text-gray-700">
                    Ti rispondiamo generalmente entro 24-48 ore lavorative.
                  </p>
                </div>

                <div>
                  <h4 className="font-semibold text-gray-900 mb-2">🐛 Segnala un Bug</h4>
                  <p className="text-gray-700">
                    Hai trovato un problema tecnico? Descrivici cosa non funziona nel form - 
                    lo risolveremo il prima possibile!
                  </p>
                </div>
              </div>
            </div>

            <div className="bg-emerald-50 rounded-lg p-6">
              <h3 className="font-bold text-gray-900 mb-3">Prima di Contattarci</h3>
              <p className="text-gray-700 text-sm mb-3">
                La risposta alla tua domanda potrebbe già essere disponibile:
              </p>
              <ul className="space-y-2 text-sm">
                <li>
                  <a href="/come-funziona" className="text-emerald-600 hover:text-emerald-700 font-medium">
                    → Come funziona il comparatore
                  </a>
                </li>
                <li>
                  <a href="/chi-siamo" className="text-emerald-600 hover:text-emerald-700 font-medium">
                    → Chi siamo e come guadagniamo
                  </a>
                </li>
              </ul>
            </div>

            <div className="bg-blue-50 rounded-lg p-6">
              <h3 className="font-bold text-gray-900 mb-2">💡 Suggerimenti</h3>
              <p className="text-gray-700 text-sm">
                Hai un'idea per migliorare TrovaIntegratori? Ci piacerebbe sentirla! 
                Il nostro obiettivo è creare il miglior comparatore per la community italiana.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
