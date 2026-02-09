import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "TrovaIntegratori.it - Confronta Prezzi Integratori e Vitamine",
  description: "Risparmia fino al 40% confrontando prezzi di integratori da Amazon, farmacie online e e-commerce. Alert automatici quando il prezzo scende. Gratuito.",
  keywords: ["integratori", "vitamine", "confronto prezzi", "integratori online", "risparmio integratori", "comparatore prezzi"],
  openGraph: {
    title: "TrovaIntegratori.it - Il Comparatore di Prezzi per Integratori",
    description: "Confronta i prezzi di integratori e vitamine da oltre 10 store online. Risparmia fino al 40%.",
    type: "website",
    locale: "it_IT",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="it">
      <body className="antialiased">
        {children}
      </body>
    </html>
  );
}
