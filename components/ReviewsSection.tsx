'use client';

import { useState } from 'react';
import ReviewCard from './ReviewCard';
import RatingStars from './RatingStars';

interface Review {
  author: string;
  rating: number;
  title: string;
  text: string;
  date: string;
  verified: boolean;
}

interface ReviewsSectionProps {
  reviews: Review[];
}

export default function ReviewsSection({ reviews }: ReviewsSectionProps) {
  const [showAllReviews, setShowAllReviews] = useState(false);
  const [sortBy, setSortBy] = useState<'recent' | 'rating'>('recent');

  if (!reviews || reviews.length === 0) {
    return null;
  }

  // Calculate average rating
  const averageRating = reviews.reduce((sum, review) => sum + review.rating, 0) / reviews.length;
  const totalReviews = reviews.length;

  // Sort reviews
  const sortedReviews = [...reviews].sort((a, b) => {
    if (sortBy === 'recent') {
      return new Date(b.date).getTime() - new Date(a.date).getTime();
    } else {
      return b.rating - a.rating;
    }
  });

  // Determine how many reviews to show
  const reviewsToShow = showAllReviews ? sortedReviews : sortedReviews.slice(0, 3);
  const hasMoreReviews = reviews.length > 3;

  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 mb-8">
      {/* Header with average rating */}
      <div className="flex items-center justify-between mb-6">
        <div>
          <h3 className="text-xl font-semibold text-gray-900 mb-2">
            Recensioni clienti
          </h3>
          <div className="flex items-center gap-3">
            <RatingStars rating={averageRating} size="md" showRating />
            <span className="text-sm text-gray-600">
              ({totalReviews} recensioni)
            </span>
          </div>
        </div>

        {/* Sort options */}
        <div className="flex items-center gap-2 text-sm">
          <span className="text-gray-600">Ordina per:</span>
          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value as 'recent' | 'rating')}
            className="border border-gray-300 rounded px-2 py-1 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="recent">Più recenti</option>
            <option value="rating">Valutazione più alta</option>
          </select>
        </div>
      </div>

      {/* Reviews grid */}
      <div className="space-y-4 mb-4">
        {reviewsToShow.map((review, index) => (
          <ReviewCard key={`${review.author}-${review.date}-${index}`} review={review} />
        ))}
      </div>

      {/* Show more/less button */}
      {hasMoreReviews && (
        <div className="text-center pt-4 border-t border-gray-200">
          <button
            onClick={() => setShowAllReviews(!showAllReviews)}
            className="text-blue-600 hover:text-blue-800 font-medium text-sm transition-colors duration-200"
          >
            {showAllReviews ? (
              <>
                <span>Nascondi alcune recensioni</span>
                <svg className="inline ml-1 w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 15l7-7 7 7" />
                </svg>
              </>
            ) : (
              <>
                <span>Mostra tutte le recensioni ({totalReviews})</span>
                <svg className="inline ml-1 w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </>
            )}
          </button>
        </div>
      )}
    </div>
  );
}