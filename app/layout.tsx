import type { Metadata } from "next";
import Script from "next/script";
import "./globals.css";
import Navbar from "@/components/Navbar";
import { CompareProvider } from "@/components/CompareContext";
import CompareBar from "@/components/CompareBar";

const baseUrl = "https://trovaintegratori.it";

export const metadata: Metadata = {
  metadataBase: new URL(baseUrl),
  title: {
    default: "TrovaIntegratori.it - Confronta Prezzi Integratori e Vitamine",
    template: "%s | TrovaIntegratori.it",
  },
  description:
    "Confronta prezzi di oltre 50 integratori su Amazon Italia. Vitamine, proteine, creatina, omega-3, probiotici e molto altro. Risparmia fino al 40% con il nostro comparatore gratuito.",
  keywords: [
    "integratori",
    "vitamine",
    "confronto prezzi integratori",
    "integratori online",
    "proteine",
    "creatina",
    "omega 3",
    "probiotici",
    "integratori amazon",
    "migliori integratori",
  ],
  authors: [{ name: "TrovaIntegratori.it" }],
  creator: "TrovaIntegratori.it",
  publisher: "TrovaIntegratori.it",
  alternates: {
    canonical: baseUrl,
    languages: { "it-IT": baseUrl },
  },
  openGraph: {
    title: "TrovaIntegratori.it - Confronta Prezzi Integratori e Vitamine",
    description:
      "Confronta prezzi di oltre 50 integratori su Amazon Italia. Risparmia fino al 40% con il nostro comparatore gratuito.",
    type: "website",
    locale: "it_IT",
    url: baseUrl,
    siteName: "TrovaIntegratori.it",
  },
  twitter: {
    card: "summary_large_image",
    title: "TrovaIntegratori.it - Confronta Prezzi Integratori",
    description:
      "Confronta prezzi di oltre 50 integratori su Amazon Italia. Risparmia fino al 40%.",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: "TrovaIntegratori.it",
    url: baseUrl,
    description:
      "Comparatore di prezzi per integratori alimentari, vitamine e prodotti per il benessere in Italia.",
    sameAs: [],
  };

  return (
    <html lang="it">
      <head>
        <Script
          src="https://www.googletagmanager.com/gtag/js?id=G-FHKSW9LYR1"
          strategy="afterInteractive"
        />
        <Script id="google-analytics" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', 'G-FHKSW9LYR1');
          `}
        </Script>
        <link rel="canonical" href={baseUrl} />
        <meta name="geo.region" content="IT" />
        <meta name="geo.placename" content="Italia" />
        <meta httpEquiv="content-language" content="it-IT" />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body className="antialiased pb-20">
        <CompareProvider>
          <Navbar />
          {children}
          <CompareBar />
        </CompareProvider>
      </body>
    </html>
  );
}
