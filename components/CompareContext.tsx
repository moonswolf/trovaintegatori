'use client';

import { createContext, useContext, useState, useEffect, ReactNode, useCallback } from 'react';

interface CompareContextType {
  compareIds: string[];
  addToCompare: (id: string) => void;
  removeFromCompare: (id: string) => void;
  isInCompare: (id: string) => boolean;
  clearCompare: () => void;
}

const CompareContext = createContext<CompareContextType>({
  compareIds: [],
  addToCompare: () => {},
  removeFromCompare: () => {},
  isInCompare: () => false,
  clearCompare: () => {},
});

export function CompareProvider({ children }: { children: ReactNode }) {
  const [compareIds, setCompareIds] = useState<string[]>([]);
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    try {
      const stored = localStorage.getItem('compareIds');
      if (stored) setCompareIds(JSON.parse(stored));
    } catch {}
    setLoaded(true);
  }, []);

  useEffect(() => {
    if (loaded) {
      localStorage.setItem('compareIds', JSON.stringify(compareIds));
    }
  }, [compareIds, loaded]);

  const addToCompare = useCallback((id: string) => {
    setCompareIds(prev => {
      if (prev.includes(id) || prev.length >= 4) return prev;
      return [...prev, id];
    });
  }, []);

  const removeFromCompare = useCallback((id: string) => {
    setCompareIds(prev => prev.filter(x => x !== id));
  }, []);

  const isInCompare = useCallback((id: string) => compareIds.includes(id), [compareIds]);

  const clearCompare = useCallback(() => setCompareIds([]), []);

  return (
    <CompareContext.Provider value={{ compareIds, addToCompare, removeFromCompare, isInCompare, clearCompare }}>
      {children}
    </CompareContext.Provider>
  );
}

export function useCompare() {
  return useContext(CompareContext);
}
