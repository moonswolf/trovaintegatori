'use client';

import { useCompare } from './CompareContext';

interface AddToCompareButtonProps {
  productId: string;
  variant?: 'icon' | 'full';
}

export default function AddToCompareButton({ productId, variant = 'icon' }: AddToCompareButtonProps) {
  const { addToCompare, removeFromCompare, isInCompare, compareIds } = useCompare();
  const inCompare = isInCompare(productId);

  const handleClick = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (inCompare) {
      removeFromCompare(productId);
    } else if (compareIds.length < 4) {
      addToCompare(productId);
    }
  };

  if (variant === 'full') {
    return (
      <button
        onClick={handleClick}
        className={`px-4 py-2 rounded-lg font-semibold text-sm transition whitespace-nowrap ${
          inCompare
            ? 'bg-emerald-100 text-emerald-700 border border-emerald-300'
            : 'bg-gray-100 text-gray-700 hover:bg-emerald-50 hover:text-emerald-600 border border-gray-200'
        }`}
      >
        {inCompare ? '✓ Nel confronto' : '⚖️ Aggiungi al confronto'}
      </button>
    );
  }

  return (
    <button
      onClick={handleClick}
      className={`w-8 h-8 rounded-lg flex items-center justify-center text-sm transition ${
        inCompare
          ? 'bg-emerald-100 text-emerald-700 border border-emerald-300'
          : 'bg-gray-100 text-gray-500 hover:bg-emerald-50 hover:text-emerald-600 border border-gray-200 animate-pulse-subtle'
      }`}
      title={inCompare ? 'Rimuovi dal confronto' : 'Aggiungi al confronto'}
    >
      {inCompare ? '✓' : '+'}
    </button>
  );
}
