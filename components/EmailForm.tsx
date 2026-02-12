"use client";

import { useState } from "react";

export default function EmailForm() {
  const [email, setEmail] = useState("");
  const [privacy, setPrivacy] = useState(false);
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!privacy) {
      alert("Devi accettare la privacy policy");
      return;
    }

    setStatus("loading");
    
    // TODO: Integrazione futura con sistema email (Mailchimp, ConvertKit, etc)
    setTimeout(() => {
      setStatus("success");
      setEmail("");
      setPrivacy(false);
    }, 1000);
  };

  return (
    <section id="email-form" className="py-20 px-4 bg-gradient-to-br from-blue-600 to-green-600">
      <div className="max-w-4xl mx-auto text-center">
        <h2 className="text-4xl font-bold text-white mb-4">
          Iscriviti per l'Early Access
        </h2>
        <p className="text-xl text-blue-100 mb-8">
          Sii tra i primi a risparmiare. Ti avviseremo al lancio e avrai accesso a funzionalità esclusive.
        </p>
        
        {status === "success" ? (
          <div className="bg-white rounded-lg p-8 shadow-xl">
            <div className="text-6xl mb-4">✅</div>
            <h3 className="text-2xl font-bold text-gray-900 mb-2">
              Grazie per l'iscrizione!
            </h3>
            <p className="text-gray-600">
              Ti invieremo un'email appena saremo online. A presto!
            </p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="bg-white rounded-lg p-8 shadow-xl">
            <div className="mb-4">
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="tua-email@esempio.it"
                required
                className="w-full px-6 py-4 text-lg border-2 border-gray-200 rounded-lg focus:border-blue-600 focus:outline-none"
              />
            </div>
            
            <div className="mb-6 text-left">
              <label className="flex items-start gap-3 cursor-pointer">
                <input
                  type="checkbox"
                  checked={privacy}
                  onChange={(e) => setPrivacy(e.target.checked)}
                  required
                  className="mt-1 w-5 h-5"
                />
                <span className="text-sm text-gray-600">
                  Accetto la <a href="#" className="text-blue-600 underline">Privacy Policy</a> e autorizzo il trattamento dei miei dati personali per ricevere comunicazioni sul lancio del servizio.
                </span>
              </label>
            </div>
            
            <button
              type="submit"
              disabled={status === "loading"}
              className="w-full bg-blue-600 text-white px-8 py-4 rounded-lg text-lg font-semibold hover:bg-blue-700 transition-all shadow-lg hover:shadow-xl disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {status === "loading" ? "Invio in corso..." : "Avvisami al Lancio 🚀"}
            </button>
            
            <p className="mt-4 text-sm text-gray-600">
              Niente spam. Solo una email quando saremo pronti.
            </p>
          </form>
        )}
      </div>
    </section>
  );
}
