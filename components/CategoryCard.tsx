import Link from 'next/link';
import { Category } from '@/types/product';

interface CategoryCardProps {
  category: Category;
  productCount?: number;
}

export default function CategoryCard({ category, productCount }: CategoryCardProps) {
  return (
    <Link href={`/categoria/${category.slug}`}>
      <div className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg hover:-translate-y-1 transition-all duration-200 group">
        <div className="p-6">
          {/* Icon */}
          <div className="w-16 h-16 bg-gradient-to-br from-emerald-100 to-emerald-200 rounded-lg mb-4 flex items-center justify-center group-hover:from-emerald-200 group-hover:to-emerald-300 transition-colors">
            <span className="text-3xl">{category.icon}</span>
          </div>

          {/* Category Name */}
          <h3 className="font-bold text-xl text-gray-900 mb-2 group-hover:text-emerald-600 transition-colors">
            {category.name}
          </h3>

          {/* Description */}
          <p className="text-sm text-gray-600 mb-4 line-clamp-3">
            {category.description}
          </p>

          {/* Product Count */}
          {productCount !== undefined && (
            <div className="text-sm text-emerald-600 font-medium mb-3">
              {productCount} prodotti disponibili
            </div>
          )}

          {/* Subcategories */}
          <div className="space-y-1">
            <div className="text-xs text-gray-600 font-medium">Sottocategorie:</div>
            <div className="flex flex-wrap gap-1">
              {category.subcategories.slice(0, 4).map((sub, index) => (
                <span
                  key={sub.slug}
                  className="text-xs bg-gray-100 text-gray-700 px-2 py-1 rounded-full"
                >
                  {sub.name}
                </span>
              ))}
              {category.subcategories.length > 4 && (
                <span className="text-xs text-gray-600">
                  +{category.subcategories.length - 4} altre
                </span>
              )}
            </div>
          </div>

          {/* Call to Action */}
          <div className="mt-4 pt-4 border-t border-gray-100">
            <div className="flex items-center justify-between">
              <span className="text-sm font-medium text-emerald-600 group-hover:text-emerald-700 transition-colors">
                Esplora categoria
              </span>
              <svg
                className="w-4 h-4 text-emerald-600 group-hover:text-emerald-700 group-hover:translate-x-1 transition-all"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M9 5l7 7-7 7"
                />
              </svg>
            </div>
          </div>
        </div>
      </div>
    </Link>
  );
}