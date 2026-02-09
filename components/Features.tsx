export default function Features() {
  const features = [
    {
      icon: "🔍",
      title: "Confronta Prezzi",
      description: "Compara automaticamente prezzi da Amazon, farmacie online e oltre 10 e-commerce italiani. Trova sempre il miglior affare."
    },
    {
      icon: "🔔",
      title: "Alert Prezzi",
      description: "Imposta avvisi personalizzati e ricevi notifiche immediate quando il prezzo dell'integratore che cerchi scende."
    },
    {
      icon: "🤖",
      title: "Trova il Migliore",
      description: "L'intelligenza artificiale analizza composizione e recensioni per suggerirti l'integratore più adatto alle tue esigenze."
    }
  ];

  return (
    <section className="py-20 px-4 bg-white">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-gray-900 mb-4">
            Come Funziona
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            La piattaforma intelligente per risparmiare sui tuoi integratori
          </p>
        </div>
        
        <div className="grid md:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <div 
              key={index}
              className="bg-gradient-to-br from-blue-50 to-green-50 p-8 rounded-2xl shadow-sm hover:shadow-lg transition-shadow"
            >
              <div className="text-5xl mb-4">{feature.icon}</div>
              <h3 className="text-2xl font-bold text-gray-900 mb-3">
                {feature.title}
              </h3>
              <p className="text-gray-600 leading-relaxed">
                {feature.description}
              </p>
            </div>
          ))}
        </div>
        
        <div className="mt-16 bg-blue-600 text-white p-8 rounded-2xl text-center">
          <h3 className="text-2xl font-bold mb-2">Risparmia in Media €120/anno</h3>
          <p className="text-blue-100">
            Gli utenti che confrontano i prezzi risparmiano mediamente il 35% sui loro acquisti di integratori
          </p>
        </div>
      </div>
    </section>
  );
}
