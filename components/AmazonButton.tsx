'use client';

interface AmazonButtonProps {
  amazonUrl: string;
  inStock: boolean;
  className?: string;
  children: React.ReactNode;
}

export default function AmazonButton({ amazonUrl, inStock, className = '', children }: AmazonButtonProps) {
  if (!inStock) {
    return (
      <button className={className} disabled>
        {children}
      </button>
    );
  }

  const handleClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    // GA4 affiliate click tracking
    if (typeof window !== 'undefined' && typeof window.gtag === 'function') {
      window.gtag('event', 'affiliate_click', {
        event_category: 'affiliate',
        event_label: amazonUrl,
        link_url: amazonUrl,
      });
    }
  };

  return (
    <a
      href={amazonUrl}
      target="_blank"
      rel="noopener noreferrer"
      className={className}
      onClick={handleClick}
    >
      {children}
    </a>
  );
}