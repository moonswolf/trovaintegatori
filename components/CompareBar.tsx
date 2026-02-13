'use client';

import { useCompare } from './CompareContext';
import { getProductById } from '@/lib/data';
import { useRouter } from 'next/navigation';
import { useState } from 'react';

export default function CompareBar() {
  const { compareIds, removeFromCompare, clearCompare } = useCompare();
  const router = useRouter();
  const [minimized, setMinimized] = useState(false);

  if (compareIds.length === 0) return null;

  const products = compareIds.map(id => getProductById(id)).filter(Boolean);

  const handleCompare = () => {
    router.push(`/confronta?ids=${compareIds.join(',')}`);
  };

  if (minimized) {
    return (
      <div className="fixed bottom-4 right-4 z-50">
        <button
          onClick={() => setMinimized(false)}
          className="bg-emerald-600 text-white px-4 py-3 rounded-lg shadow-lg font-semibold text-sm flex items-center gap-2 hover:bg-emerald-700 transition"
        >
          ⚖️ Confronta ({compareIds.length})
        </button>
      </div>
    );
  }

  return (
    <div className="fixed bottom-0 left-0 right-0 z-50 bg-white border-t-2 border-emerald-500 shadow-[0_-4px_20px_rgba(0,0,0,0.1)]">
      <div className="max-w-7xl mx-auto px-4 py-3">
        <div className="flex items-center justify-between gap-4">
          {/* Products */}
          <div className="flex items-center gap-2 overflow-x-auto flex-1 min-w-0">
            <span className="text-sm text-gray-600 whitespace-nowrap hidden md:inline">
              {compareIds.length} prodott{compareIds.length === 1 ? 'o' : 'i'} selezionat{compareIds.length === 1 ? 'o' : 'i'}
            </span>
            <div className="flex gap-2">
              {products.map(p => p && (
                <div key={p.id} className="flex items-center gap-1 bg-gray-100 rounded-lg px-2 py-1 min-w-0">
                  <div className="w-8 h-8 flex-shrink-0">
                    {p.imageUrl?.startsWith('http') ? (
                      <img src={p.imageUrl} alt={p.name} className="w-8 h-8 object-contain" />
                    ) : (
                      <span className="text-lg">💊</span>
                    )}
                  </div>
                  <span className="text-xs text-gray-700 truncate max-w-[80px] md:max-w-[120px]">{p.name}</span>
                  <button
                    onClick={() => removeFromCompare(p.id)}
                    className="text-gray-400 hover:text-red-500 flex-shrink-0 text-xs ml-1"
                  >
                    ✕
                  </button>
                </div>
              ))}
            </div>
          </div>

          {/* Actions */}
          <div className="flex items-center gap-2 flex-shrink-0">
            <button
              onClick={handleCompare}
              disabled={compareIds.length < 2}
              className="bg-emerald-600 text-white px-4 py-2 rounded-lg font-semibold text-sm whitespace-nowrap hover:bg-emerald-700 transition disabled:bg-gray-300 disabled:cursor-not-allowed"
            >
              Confronta ({compareIds.length})
            </button>
            <button
              onClick={() => setMinimized(true)}
              className="text-gray-400 hover:text-gray-600 text-lg"
              title="Minimizza"
            >
              ▾
            </button>
            <button
              onClick={clearCompare}
              className="text-gray-400 hover:text-red-500 text-sm"
              title="Rimuovi tutti"
            >
              ✕
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
