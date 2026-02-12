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
    <nav className="bg-white shadow-md sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center space-x-2">
            <span className="text-2xl">🏥</span>
            <span className="text-xl font-bold text-emerald-600">TrovaIntegratori</span>
          </Link>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center space-x-8">
            <Link href="/" className="text-gray-700 hover:text-emerald-600 transition">
              Home
            </Link>
            
            {/* Categories Dropdown */}
            <div className="relative">
              <button
                onMouseEnter={() => setIsCategoriesOpen(true)}
                onMouseLeave={() => setIsCategoriesOpen(false)}
                className="text-gray-700 hover:text-emerald-600 transition flex items-center gap-1"
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
                      className="block px-4 py-2 hover:bg-gray-50 text-gray-700 hover:text-emerald-600 transition"
                    >
                      <div className="flex items-center gap-3">
                        <span className="text-lg">{category.icon}</span>
                        <div>
                          <div className="font-medium">{category.name}</div>
                          <div className="text-xs text-gray-600 line-clamp-1">
                            {category.description.slice(0, 50)}...
                          </div>
                        </div>
                      </div>
                    </Link>
                  ))}
                </div>
              )}
            </div>

            <Link href="/confronta" className="text-gray-700 hover:text-emerald-600 transition font-medium">
              🤖 Confronta Prezzi
            </Link>
            <Link href="/come-funziona" className="text-gray-700 hover:text-emerald-600 transition">
              Come Funziona
            </Link>
            <Link href="/chi-siamo" className="text-gray-700 hover:text-emerald-600 transition">
              Chi Siamo
            </Link>
            <Link href="/contatti" className="text-gray-700 hover:text-emerald-600 transition">
              Contatti
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="md:hidden p-2 rounded-md text-gray-700 hover:bg-gray-100"
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
          <div className="md:hidden pb-4 space-y-2 border-t border-gray-200 mt-2 pt-4">
            <Link 
              href="/" 
              className="block px-4 py-2 text-gray-700 hover:bg-gray-100 rounded"
              onClick={() => setIsMenuOpen(false)}
            >
              Home
            </Link>
            
            {/* Mobile Categories */}
            <div className="px-4 py-2">
              <div className="text-gray-700 font-medium mb-2">Categorie</div>
              <div className="pl-4 space-y-1">
                {categories.map((category) => (
                  <Link
                    key={category.slug}
                    href={`/categoria/${category.slug}`}
                    className="block py-1 text-gray-600 hover:text-emerald-600 transition text-sm"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    {category.icon} {category.name}
                  </Link>
                ))}
              </div>
            </div>
            
            <Link 
              href="/confronta" 
              className="block px-4 py-2 text-gray-700 hover:bg-gray-100 rounded font-medium"
              onClick={() => setIsMenuOpen(false)}
            >
              🤖 Confronta Prezzi
            </Link>
            <Link 
              href="/come-funziona" 
              className="block px-4 py-2 text-gray-700 hover:bg-gray-100 rounded"
              onClick={() => setIsMenuOpen(false)}
            >
              Come Funziona
            </Link>
            <Link 
              href="/chi-siamo" 
              className="block px-4 py-2 text-gray-700 hover:bg-gray-100 rounded"
              onClick={() => setIsMenuOpen(false)}
            >
              Chi Siamo
            </Link>
            <Link 
              href="/contatti" 
              className="block px-4 py-2 text-gray-700 hover:bg-gray-100 rounded"
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