import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Contattaci',
  description: 'Hai domande su TrovaIntegratori.it? Contattaci per suggerimenti, segnalazioni o informazioni. Rispondiamo entro 24-48 ore.',
  alternates: { canonical: 'https://trovaintegratori.it/contatti' },
  openGraph: {
    title: 'Contattaci - TrovaIntegratori.it',
    description: 'Hai domande? Contattaci per suggerimenti o informazioni.',
    type: 'website',
    url: 'https://trovaintegratori.it/contatti',
  },
};

export default function ContattiLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
