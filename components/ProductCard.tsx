'use client';

import { Product } from '@/types/product';
import RatingStars from './RatingStars';
import AmazonButton from './AmazonButton';
import AddToCompareButton from './AddToCompareButton';
import { useState } from 'react';

interface ProductCardProps {
  product: Product;
  onClick?: () => void;
  isSelected?: boolean;
  showFullDescription?: boolean;
}

export default function ProductCard({ 
  product, 
  onClick, 
  isSelected = false, 
  showFullDescription = false 
}: ProductCardProps) {
  const discount = product.originalPrice ? Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100) : 0;
  const [imgError, setImgError] = useState(false);

  return (
    <div
      className={`bg-white rounded-lg border border-slate-200 overflow-hidden transition-all duration-200 cursor-pointer group ${
        isSelected ? 'ring-2 ring-emerald-500 border-emerald-300' : 'hover:shadow-md hover:-translate-y-0.5'
      }`}
      onClick={onClick}
    >
      <div className="p-6">
        {/* Product Image */}
        <div className="w-full h-32 bg-white rounded-lg mb-4 flex items-center justify-center overflow-hidden relative">
          {product.imageUrl && product.imageUrl.startsWith('http') && !imgError ? (
            <img src={product.imageUrl} alt={product.name} className="h-full w-auto object-contain" loading="lazy" onError={() => setImgError(true)} />
          ) : (
            <div className="text-4xl">💊</div>
          )}
          {/* Compare button */}
          <div className="absolute top-1 right-1">
            <AddToCompareButton productId={product.id} variant="icon" />
          </div>
        </div>

        {/* Discount Badge */}
        {discount > 0 && (
          <div className="absolute top-4 left-4 bg-red-500 text-white text-sm font-bold px-2 py-1 rounded-lg">
            -{discount}%
          </div>
        )}

        {/* Brand */}
        <div className="text-sm font-semibold text-emerald-600 mb-1">
          {product.brand}
        </div>

        {/* Product Name */}
        <h3 className="font-bold text-lg text-gray-900 mb-2 line-clamp-2">
          {product.name}
        </h3>

        {/* Rating */}
        <div className="flex items-center gap-2 mb-3">
          <RatingStars rating={product.rating} />
          <span className="text-sm text-gray-600">
            ({product.reviewCount})
          </span>
        </div>

        {/* Description */}
        {showFullDescription ? (
          <p className="text-sm text-gray-600 mb-4">{product.description}</p>
        ) : (
          <p className="text-sm text-gray-600 mb-4 line-clamp-2">{product.description}</p>
        )}

        {/* Key Details */}
        <div className="space-y-1 text-xs text-gray-600 mb-4">
          <div><strong>Formato:</strong> {product.form}</div>
          <div><strong>Quantità:</strong> {product.quantity}</div>
          <div><strong>Prezzo per unità:</strong> {product.pricePerUnit}</div>
        </div>

        {/* Highlights */}
        {product.highlights && product.highlights.length > 0 && (
          <div className="mb-4">
            <div className="flex flex-wrap gap-1">
              {product.highlights.slice(0, 3).map((highlight, index) => (
                <span
                  key={index}
                  className="inline-block bg-emerald-100 text-emerald-800 text-xs px-2 py-1 rounded-lg"
                >
                  {highlight}
                </span>
              ))}
            </div>
          </div>
        )}

        {/* Price Section */}
        <div className="border-t pt-4 flex items-center justify-between">
          <div>
            <div className="flex items-center gap-2">
              <span className="text-2xl font-bold text-emerald-600">
                €{product.price.toFixed(2)}
              </span>
              {product.originalPrice && product.originalPrice > product.price && (
                <span className="text-sm text-gray-600 line-through">
                  €{product.originalPrice.toFixed(2)}
                </span>
              )}
            </div>
            {!product.inStock && (
              <div className="text-xs text-red-600 font-medium">Non disponibile</div>
            )}
          </div>

          {/* CTA Button */}
          <div>
            {isSelected ? (
              <div className="bg-emerald-600 text-white px-4 py-2 rounded-lg font-semibold text-sm">
                ✓ Selezionato
              </div>
            ) : (
              <AmazonButton
                amazonUrl={product.amazonUrl}
                inStock={product.inStock}
                className={`px-4 py-2 rounded-lg font-semibold text-sm whitespace-nowrap transition ${
                  product.inStock 
                    ? 'bg-emerald-600 text-white hover:bg-emerald-700' 
                    : 'bg-gray-300 text-gray-600 cursor-not-allowed'
                }`}
              >
                Vedi su Amazon
              </AmazonButton>
            )}
          </div>
        </div>

        {/* Stock Status */}
        {product.inStock && (
          <div className="mt-2 flex items-center gap-1 text-xs text-green-600">
            <span className="w-2 h-2 bg-green-500 rounded-full"></span>
            Disponibile
          </div>
        )}
      </div>
    </div>
  );
}
