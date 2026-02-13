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

  return (
    <a
      href={amazonUrl}
      target="_blank"
      rel="noopener noreferrer"
      className={className}
      onClick={(e) => e.stopPropagation()}
    >
      {children}
    </a>
  );
}