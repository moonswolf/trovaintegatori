import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Confronta Prezzi Integratori con AI',
  description: 'Confronta fino a 3 integratori con la nostra intelligenza artificiale. Analisi composizione, rapporto qualità-prezzo e raccomandazione personalizzata.',
  alternates: { canonical: 'https://trovaintegratori.it/confronta' },
  openGraph: {
    title: 'Confronta Integratori con AI - TrovaIntegratori.it',
    description: 'Confronta fino a 3 integratori con intelligenza artificiale.',
    type: 'website',
    url: 'https://trovaintegratori.it/confronta',
  },
};

export default function ConfrontaLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
