'use client';

import Link from 'next/link';
import { useState } from 'react';

export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

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
            <Link href="/confronta" className="text-gray-700 hover:text-emerald-600 transition font-medium">
              Confronta Prezzi
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
          <div className="md:hidden pb-4 space-y-2">
            <Link 
              href="/" 
              className="block px-4 py-2 text-gray-700 hover:bg-gray-100 rounded"
              onClick={() => setIsMenuOpen(false)}
            >
              Home
            </Link>
            <Link 
              href="/confronta" 
              className="block px-4 py-2 text-gray-700 hover:bg-gray-100 rounded font-medium"
              onClick={() => setIsMenuOpen(false)}
            >
              Confronta Prezzi
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
