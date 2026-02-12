interface AffiliateDisclosureProps {
  variant?: 'banner' | 'footer' | 'inline';
  className?: string;
}

export default function AffiliateDisclosure({ 
  variant = 'footer', 
  className = '' 
}: AffiliateDisclosureProps) {
  const baseClasses = "text-sm";
  
  const variantClasses = {
    banner: "bg-amber-50 border border-amber-200 text-amber-800 p-3 rounded-md",
    footer: "text-gray-600 text-center",
    inline: "text-gray-600"
  };

  const content = {
    banner: (
      <div className="flex items-start gap-3">
        <span className="text-lg">ℹ️</span>
        <div>
          <strong>Informativa Affiliazione:</strong> In qualità di Affiliato Amazon, 
          riceviamo un guadagno dagli acquisti idonei. I prezzi e la disponibilità 
          dei prodotti possono variare. Le valutazioni sono fornite a scopo informativo.
        </div>
      </div>
    ),
    footer: (
      <div>
        <strong>Affiliazione Amazon:</strong> In qualità di Affiliato Amazon, 
        riceviamo un guadagno dagli acquisti idonei effettuati tramite i nostri link. 
        I prezzi mostrati potrebbero non essere aggiornati in tempo reale.
      </div>
    ),
    inline: (
      <span>
        *In qualità di Affiliato Amazon, riceviamo un guadagno dagli acquisti idonei.
      </span>
    )
  };

  return (
    <div className={`${baseClasses} ${variantClasses[variant]} ${className}`}>
      {content[variant]}
    </div>
  );
}