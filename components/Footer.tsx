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
    <footer className="bg-slate-900 text-slate-400">
      {/* Main Footer */}
      <div className="py-12 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-8">
            {/* Company Info */}
            <div>
              <div className="flex items-center space-x-2 mb-4">
                <svg className="w-6 h-6 text-emerald-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z" />
                </svg>
                <span className="text-lg font-bold text-white">TrovaIntegratori</span>
              </div>
              <p className="text-sm mb-4">
                Il comparatore intelligente per trovare integratori e vitamine 
                al miglior prezzo su Amazon Italia.
              </p>
              <div className="flex space-x-4">
                <Link href="/confronta" className="bg-emerald-600 hover:bg-emerald-700 text-white px-4 py-2 rounded-lg text-sm font-medium transition">
                  Confronta Ora
                </Link>
              </div>
            </div>

            {/* Categories */}
            <div>
              <h4 className="text-white font-semibold mb-4 text-sm uppercase tracking-wider">Categorie</h4>
              <ul className="space-y-2 text-sm">
                {categories.slice(0, 6).map((category) => (
                  <li key={category.slug}>
                    <Link 
                      href={`/categoria/${category.slug}`} 
                      className="hover:text-white transition-colors"
                    >
                      {category.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
            
            {/* Pages */}
            <div>
              <h4 className="text-white font-semibold mb-4 text-sm uppercase tracking-wider">Navigazione</h4>
              <ul className="space-y-2 text-sm">
                <li><Link href="/" className="hover:text-white transition-colors">Home</Link></li>
                <li><Link href="/confronta" className="hover:text-white transition-colors">Confronta Prezzi</Link></li>
                <li><Link href="/come-funziona" className="hover:text-white transition-colors">Come Funziona</Link></li>
                <li><Link href="/chi-siamo" className="hover:text-white transition-colors">Chi Siamo</Link></li>
                <li><Link href="/contatti" className="hover:text-white transition-colors">Contatti</Link></li>
              </ul>
            </div>
            
            {/* Confronti Popolari */}
            <div>
              <h4 className="text-white font-semibold mb-4 text-sm uppercase tracking-wider">Confronti Popolari</h4>
              <ul className="space-y-2 text-sm">
                <li><Link href="/confronto/vitamina-d3-vs-d2" className="hover:text-white transition-colors">Vitamina D3 vs D2</Link></li>
                <li><Link href="/confronto/creatina-monoidrato-vs-hcl" className="hover:text-white transition-colors">Creatina Monoidrato vs HCL</Link></li>
                <li><Link href="/confronto/whey-protein-vs-caseina" className="hover:text-white transition-colors">Whey vs Caseina</Link></li>
                <li><Link href="/confronto/magnesio-citrato-vs-bisglicinato" className="hover:text-white transition-colors">Magnesio Citrato vs Bisglicinato</Link></li>
                <li><Link href="/confronto/bcaa-vs-eaa" className="hover:text-white transition-colors">BCAA vs EAA</Link></li>
                <li><Link href="/confronto" className="hover:text-white transition-colors font-medium text-emerald-400">Tutti i confronti →</Link></li>
              </ul>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mt-8 pt-8 border-t border-slate-800">
            {/* Legal & Info */}
            <div>
              <h4 className="text-white font-semibold mb-4 text-sm uppercase tracking-wider">Informazioni</h4>
              <ul className="space-y-2 text-sm">
                <li><Link href="#" className="hover:text-white transition-colors">Privacy Policy</Link></li>
                <li><Link href="#" className="hover:text-white transition-colors">Termini e Condizioni</Link></li>
                <li><Link href="#" className="hover:text-white transition-colors">Cookie Policy</Link></li>
              </ul>
            </div>
          </div>
          
        </div>
      </div>

      {/* Copyright */}
      <div className="bg-slate-950 py-4 px-4">
        <div className="max-w-7xl mx-auto text-center text-sm">
          <p className="text-slate-500">
            © {currentYear} TrovaIntegratori.it — Tutti i diritti riservati
          </p>
          <p className="mt-1 text-slate-600 text-xs">
            Made in Italy · Powered by AI
          </p>
        </div>
      </div>
    </footer>
  );
}
