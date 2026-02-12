'use client';

interface AmazonButtonProps {
  amazonUrl: string;
  inStock: boolean;
  className?: string;
  children: React.ReactNode;
}

export default function AmazonButton({ amazonUrl, inStock, className = '', children }: AmazonButtonProps) {
  const handleClick = () => {
    if (inStock) {
      window.open(amazonUrl, '_blank', 'noopener,noreferrer');
    }
  };

  return (
    <button
      onClick={handleClick}
      className={className}
      disabled={!inStock}
    >
      {children}
    </button>
  );
}