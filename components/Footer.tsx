'use client';

import Link from 'next/link';
import { useEffect, useState } from 'react';
import { getCategories } from '@/lib/data';
import { Category } from '@/types/product';
import AffiliateDisclosure from './AffiliateDisclosure';

export default function Footer() {
  const [categories, setCategories] = useState<Category[]>([]);
  const currentYear = new Date().getFullYear();

  useEffect(() => {
    setCategories(getCategories());
  }, []);

  return (
    <footer className="bg-gray-900 text-gray-300">
      {/* Main Footer */}
      <div className="py-12 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-8">
            {/* Company Info */}
            <div>
              <div className="flex items-center space-x-2 mb-4">
                <span className="text-2xl">🏥</span>
                <span className="text-xl font-bold text-white">TrovaIntegratori</span>
              </div>
              <p className="text-sm mb-4">
                Il comparatore intelligente per trovare integratori e vitamine 
                al miglior prezzo su Amazon Italia.
              </p>
              <div className="flex space-x-4">
                <Link href="/confronta" className="bg-emerald-600 hover:bg-emerald-700 text-white px-4 py-2 rounded-lg text-sm font-medium transition">
                  🤖 Confronta Ora
                </Link>
              </div>
            </div>

            {/* Categories */}
            <div>
              <h4 className="text-white font-semibold mb-4">Categorie</h4>
              <ul className="space-y-2 text-sm">
                {categories.slice(0, 6).map((category) => (
                  <li key={category.slug}>
                    <Link 
                      href={`/categoria/${category.slug}`} 
                      className="hover:text-white transition-colors flex items-center gap-2"
                    >
                      <span>{category.icon}</span>
                      {category.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
            
            {/* Pages */}
            <div>
              <h4 className="text-white font-semibold mb-4">Navigazione</h4>
              <ul className="space-y-2 text-sm">
                <li>
                  <Link href="/" className="hover:text-white transition-colors">
                    Home
                  </Link>
                </li>
                <li>
                  <Link href="/confronta" className="hover:text-white transition-colors">
                    Confronta Prezzi
                  </Link>
                </li>
                <li>
                  <Link href="/come-funziona" className="hover:text-white transition-colors">
                    Come Funziona
                  </Link>
                </li>
                <li>
                  <Link href="/chi-siamo" className="hover:text-white transition-colors">
                    Chi Siamo
                  </Link>
                </li>
                <li>
                  <Link href="/contatti" className="hover:text-white transition-colors">
                    Contatti
                  </Link>
                </li>
              </ul>
            </div>
            
            {/* Legal & Info */}
            <div>
              <h4 className="text-white font-semibold mb-4">Informazioni</h4>
              <ul className="space-y-2 text-sm mb-4">
                <li>
                  <Link href="#" className="hover:text-white transition-colors">
                    Privacy Policy
                  </Link>
                </li>
                <li>
                  <Link href="#" className="hover:text-white transition-colors">
                    Termini e Condizioni
                  </Link>
                </li>
                <li>
                  <Link href="#" className="hover:text-white transition-colors">
                    Cookie Policy
                  </Link>
                </li>
              </ul>
              
              {/* Project Status */}
              <div className="bg-emerald-900 bg-opacity-30 border border-emerald-700 rounded-lg p-3">
                <p className="text-emerald-400 font-semibold mb-1 text-xs">✨ Live Now</p>
                <p className="text-xs">Confronta subito i migliori prezzi</p>
              </div>
            </div>
          </div>
          
        </div>
      </div>

      {/* Copyright */}
      <div className="bg-gray-950 py-4 px-4">
        <div className="max-w-7xl mx-auto text-center text-sm">
          <p className="text-gray-400">
            © {currentYear} TrovaIntegratori.it - Tutti i diritti riservati
          </p>
          <p className="mt-1 text-gray-500 text-xs">
            Made with ❤️ in Italy | Powered by AI
          </p>
        </div>
      </div>
    </footer>
  );
}