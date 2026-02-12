'use client';

import { useState, useMemo } from 'react';
import Link from 'next/link';
import ProductCard from './ProductCard';
import { Product, ProductFilters, ProductSort } from '@/types/product';

interface ProductGridProps {
  products: Product[];
  onProductSelect?: (product: Product) => void;
  selectedProducts?: Product[];
  showFilters?: boolean;
  showSorting?: boolean;
  category?: string;
}

export default function ProductGrid({
  products,
  onProductSelect,
  selectedProducts = [],
  showFilters = true,
  showSorting = true,
  category
}: ProductGridProps) {
  const [filters, setFilters] = useState<ProductFilters>({
    category,
    inStockOnly: false
  });
  const [sort, setSort] = useState<ProductSort>({
    field: 'name',
    direction: 'asc'
  });
  const [searchTerm, setSearchTerm] = useState('');

  // Get unique brands from products
  const brands = useMemo(() => {
    const brandSet = new Set(products.map(p => p.brand));
    return Array.from(brandSet).sort();
  }, [products]);

  // Get price range
  const priceRange = useMemo(() => {
    const prices = products.map(p => p.price);
    return {
      min: Math.min(...prices),
      max: Math.max(...prices)
    };
  }, [products]);

  // Filter and sort products
  const filteredAndSortedProducts = useMemo(() => {
    let filtered = products.filter(product => {
      // Search term
      if (searchTerm) {
        const searchLower = searchTerm.toLowerCase();
        const matchesSearch = 
          product.name.toLowerCase().includes(searchLower) ||
          product.brand.toLowerCase().includes(searchLower) ||
          product.composition.toLowerCase().includes(searchLower) ||
          product.description.toLowerCase().includes(searchLower);
        if (!matchesSearch) return false;
      }

      // Category filter
      if (filters.category && product.category !== filters.category) return false;
      
      // Subcategory filter
      if (filters.subcategory && product.subcategory !== filters.subcategory) return false;
      
      // Price range
      if (filters.minPrice && product.price < filters.minPrice) return false;
      if (filters.maxPrice && product.price > filters.maxPrice) return false;
      
      // Brand filter
      if (filters.brand && product.brand !== filters.brand) return false;
      
      // Stock filter
      if (filters.inStockOnly && !product.inStock) return false;

      return true;
    });

    // Sort products
    filtered.sort((a, b) => {
      let aValue = a[sort.field];
      let bValue = b[sort.field];

      if (sort.field === 'name' || sort.field === 'brand') {
        aValue = (aValue as string).toLowerCase();
        bValue = (bValue as string).toLowerCase();
      }

      if (aValue < bValue) return sort.direction === 'asc' ? -1 : 1;
      if (aValue > bValue) return sort.direction === 'asc' ? 1 : -1;
      return 0;
    });

    return filtered;
  }, [products, filters, sort, searchTerm]);

  const handleFilterChange = (key: keyof ProductFilters, value: any) => {
    setFilters(prev => ({ ...prev, [key]: value }));
  };

  const handleSortChange = (field: ProductSort['field']) => {
    setSort(prev => ({
      field,
      direction: prev.field === field && prev.direction === 'asc' ? 'desc' : 'asc'
    }));
  };

  return (
    <div className="space-y-6">
      {/* Search Bar */}
      <div className="max-w-md">
        <input
          type="text"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          placeholder="Cerca prodotti..."
          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 outline-none"
        />
      </div>

      {/* Filters and Sorting */}
      {(showFilters || showSorting) && (
        <div className="bg-white rounded-lg shadow-sm p-4">
          <div className="grid grid-cols-1 md:grid-cols-4 lg:grid-cols-6 gap-4">
            {/* Brand Filter */}
            {showFilters && (
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Marca
                </label>
                <select
                  value={filters.brand || ''}
                  onChange={(e) => handleFilterChange('brand', e.target.value || undefined)}
                  className="w-full px-3 py-2 text-sm border border-gray-300 rounded-md focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
                >
                  <option value="">Tutte le marche</option>
                  {brands.map(brand => (
                    <option key={brand} value={brand}>{brand}</option>
                  ))}
                </select>
              </div>
            )}

            {/* Price Range */}
            {showFilters && (
              <>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Prezzo min
                  </label>
                  <input
                    type="number"
                    value={filters.minPrice || ''}
                    onChange={(e) => handleFilterChange('minPrice', e.target.value ? Number(e.target.value) : undefined)}
                    placeholder={`€${priceRange.min}`}
                    min={priceRange.min}
                    max={priceRange.max}
                    step="0.5"
                    className="w-full px-3 py-2 text-sm border border-gray-300 rounded-md focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Prezzo max
                  </label>
                  <input
                    type="number"
                    value={filters.maxPrice || ''}
                    onChange={(e) => handleFilterChange('maxPrice', e.target.value ? Number(e.target.value) : undefined)}
                    placeholder={`€${priceRange.max}`}
                    min={priceRange.min}
                    max={priceRange.max}
                    step="0.5"
                    className="w-full px-3 py-2 text-sm border border-gray-300 rounded-md focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
                  />
                </div>
              </>
            )}

            {/* Stock Filter */}
            {showFilters && (
              <div className="flex items-center">
                <input
                  type="checkbox"
                  id="inStock"
                  checked={filters.inStockOnly}
                  onChange={(e) => handleFilterChange('inStockOnly', e.target.checked)}
                  className="h-4 w-4 text-emerald-600 focus:ring-emerald-500 border-gray-300 rounded"
                />
                <label htmlFor="inStock" className="ml-2 text-sm text-gray-700">
                  Solo disponibili
                </label>
              </div>
            )}

            {/* Sorting */}
            {showSorting && (
              <div className="md:col-span-2">
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Ordina per
                </label>
                <div className="flex gap-2">
                  <button
                    onClick={() => handleSortChange('name')}
                    className={`px-3 py-1 text-sm rounded-md transition ${
                      sort.field === 'name'
                        ? 'bg-emerald-600 text-white'
                        : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                    }`}
                  >
                    Nome {sort.field === 'name' && (sort.direction === 'asc' ? '↑' : '↓')}
                  </button>
                  <button
                    onClick={() => handleSortChange('price')}
                    className={`px-3 py-1 text-sm rounded-md transition ${
                      sort.field === 'price'
                        ? 'bg-emerald-600 text-white'
                        : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                    }`}
                  >
                    Prezzo {sort.field === 'price' && (sort.direction === 'asc' ? '↑' : '↓')}
                  </button>
                  <button
                    onClick={() => handleSortChange('rating')}
                    className={`px-3 py-1 text-sm rounded-md transition ${
                      sort.field === 'rating'
                        ? 'bg-emerald-600 text-white'
                        : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                    }`}
                  >
                    Rating {sort.field === 'rating' && (sort.direction === 'asc' ? '↑' : '↓')}
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      )}

      {/* Results Summary */}
      <div className="text-sm text-gray-600">
        {filteredAndSortedProducts.length} prodotto{filteredAndSortedProducts.length !== 1 ? 'i' : ''} trovato{filteredAndSortedProducts.length !== 1 ? 'i' : ''}
      </div>

      {/* Products Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredAndSortedProducts.map(product => (
          onProductSelect ? (
            <ProductCard
              key={product.id}
              product={product}
              onClick={() => onProductSelect(product)}
              isSelected={selectedProducts.some(p => p.id === product.id)}
            />
          ) : (
            <Link key={product.id} href={`/prodotto/${product.id}`}>
              <ProductCard
                product={product}
                isSelected={selectedProducts.some(p => p.id === product.id)}
              />
            </Link>
          )
        ))}
      </div>

      {/* No Results */}
      {filteredAndSortedProducts.length === 0 && (
        <div className="text-center py-12 text-gray-500">
          <div className="text-6xl mb-4">🔍</div>
          <h3 className="text-lg font-medium mb-2">Nessun prodotto trovato</h3>
          <p>Prova a modificare i filtri di ricerca o il termine di ricerca.</p>
        </div>
      )}
    </div>
  );
}