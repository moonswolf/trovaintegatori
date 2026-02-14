'use client';

import Link from 'next/link';
import { useState, useEffect } from 'react';
import { getCategories } from '@/lib/data';
import { Category } from '@/types/product';

export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isCategoriesOpen, setIsCategoriesOpen] = useState(false);
  const [categories, setCategories] = useState<Category[]>([]);

  useEffect(() => {
    setCategories(getCategories());
  }, []);

  return (
    <nav className="bg-white border-b border-gray-200 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center space-x-2">
            <svg className="w-7 h-7 text-emerald-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z" />
            </svg>
            <span className="text-xl font-bold text-slate-900">TrovaIntegratori</span>
          </Link>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center space-x-8">
            <Link href="/" className="text-slate-600 hover:text-emerald-600 transition text-sm font-medium">
              Home
            </Link>
            
            {/* Categories Dropdown */}
            <div className="relative">
              <button
                onMouseEnter={() => setIsCategoriesOpen(true)}
                onMouseLeave={() => setIsCategoriesOpen(false)}
                className="text-slate-600 hover:text-emerald-600 transition flex items-center gap-1 text-sm font-medium"
              >
                Categorie
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </button>
              
              {isCategoriesOpen && (
                <div 
                  className="absolute top-full left-0 mt-1 bg-white border border-gray-200 rounded-lg shadow-lg py-2 w-64 z-50"
                  onMouseEnter={() => setIsCategoriesOpen(true)}
                  onMouseLeave={() => setIsCategoriesOpen(false)}
                >
                  {categories.map((category) => (
                    <Link
                      key={category.slug}
                      href={`/categoria/${category.slug}`}
                      className="block px-4 py-2 hover:bg-gray-50 text-slate-700 hover:text-emerald-600 transition"
                    >
                      <div className="flex items-center gap-3">
                        <span className="text-lg">{category.icon}</span>
                        <div>
                          <div className="font-medium text-sm">{category.name}</div>
                          <div className="text-xs text-slate-500 line-clamp-1">
                            {category.description.slice(0, 50)}...
                          </div>
                        </div>
                      </div>
                    </Link>
                  ))}
                </div>
              )}
            </div>

            <Link href="/confronta" className="text-slate-600 hover:text-emerald-600 transition text-sm font-medium">
              Confronta Prezzi
            </Link>
            <Link href="/confronto" className="text-slate-600 hover:text-emerald-600 transition text-sm font-medium">
              Confronti
            </Link>
            <Link href="/come-funziona" className="text-slate-600 hover:text-emerald-600 transition text-sm font-medium">
              Come Funziona
            </Link>
            <Link href="/blog" className="text-slate-600 hover:text-emerald-600 transition text-sm font-medium">
              Blog
            </Link>
            <Link href="/chi-siamo" className="text-slate-600 hover:text-emerald-600 transition text-sm font-medium">
              Chi Siamo
            </Link>
            <Link href="/contatti" className="text-slate-600 hover:text-emerald-600 transition text-sm font-medium">
              Contatti
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="md:hidden p-2 rounded-md text-slate-700 hover:bg-gray-100"
          >
            <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              {isMenuOpen ? (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              ) : (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              )}
            </svg>
          </button>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="md:hidden pb-4 space-y-1 border-t border-gray-200 mt-2 pt-4 max-h-[calc(100vh-5rem)] overflow-y-auto">
            <Link 
              href="/" 
              className="block px-4 py-3 text-slate-700 hover:bg-gray-50 rounded-lg text-sm"
              onClick={() => setIsMenuOpen(false)}
            >
              Home
            </Link>
            
            <Link 
              href="/confronta" 
              className="block px-4 py-3 text-slate-700 hover:bg-gray-50 rounded-lg text-sm font-medium"
              onClick={() => setIsMenuOpen(false)}
            >
              Confronta Prezzi
            </Link>
            <Link 
              href="/confronto" 
              className="block px-4 py-3 text-slate-700 hover:bg-gray-50 rounded-lg text-sm"
              onClick={() => setIsMenuOpen(false)}
            >
              Confronti
            </Link>

            {/* Mobile Categories - collapsible */}
            <button
              onClick={() => setIsCategoriesOpen(!isCategoriesOpen)}
              className="w-full flex items-center justify-between px-4 py-3 text-slate-700 hover:bg-gray-50 rounded-lg text-sm"
            >
              <span>Categorie</span>
              <svg className={`w-4 h-4 transition-transform ${isCategoriesOpen ? 'rotate-180' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
              </svg>
            </button>
            {isCategoriesOpen && (
              <div className="pl-6 pr-4 space-y-1 pb-2">
                {categories.map((category) => (
                  <Link
                    key={category.slug}
                    href={`/categoria/${category.slug}`}
                    className="block py-2 text-slate-600 hover:text-emerald-600 transition text-sm"
                    onClick={() => { setIsMenuOpen(false); setIsCategoriesOpen(false); }}
                  >
                    {category.icon} {category.name}
                  </Link>
                ))}
              </div>
            )}

            <Link 
              href="/blog" 
              className="block px-4 py-3 text-slate-700 hover:bg-gray-50 rounded-lg text-sm"
              onClick={() => setIsMenuOpen(false)}
            >
              Blog
            </Link>
            <Link 
              href="/come-funziona" 
              className="block px-4 py-3 text-slate-700 hover:bg-gray-50 rounded-lg text-sm"
              onClick={() => setIsMenuOpen(false)}
            >
              Come Funziona
            </Link>
            <Link 
              href="/chi-siamo" 
              className="block px-4 py-3 text-slate-700 hover:bg-gray-50 rounded-lg text-sm"
              onClick={() => setIsMenuOpen(false)}
            >
              Chi Siamo
            </Link>
            <Link 
              href="/contatti" 
              className="block px-4 py-3 text-slate-700 hover:bg-gray-50 rounded-lg text-sm"
              onClick={() => setIsMenuOpen(false)}
            >
              Contatti
            </Link>
          </div>
        )}
      </div>
    </nav>
  );
}
