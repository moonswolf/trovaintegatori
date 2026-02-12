'use client';

import RatingStars from './RatingStars';

interface Review {
  author: string;
  rating: number;
  title: string;
  text: string;
  date: string;
  verified: boolean;
}

interface ReviewCardProps {
  review: Review;
}

export default function ReviewCard({ review }: ReviewCardProps) {
  // Format date to Italian format
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('it-IT', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  return (
    <div className="border border-gray-200 rounded-lg p-4 bg-white">
      {/* Rating and verified badge */}
      <div className="flex items-center justify-between mb-2">
        <RatingStars rating={review.rating} size="sm" />
        {review.verified && (
          <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-green-100 text-green-800">
            ✓ Acquisto verificato
          </span>
        )}
      </div>

      {/* Review title */}
      <h4 className="font-semibold text-gray-900 mb-2">
        {review.title}
      </h4>

      {/* Review text */}
      <p className="text-gray-700 text-sm leading-relaxed mb-3">
        {review.text}
      </p>

      {/* Author and date */}
      <div className="flex items-center justify-between text-xs text-gray-500">
        <span className="font-medium">{review.author}</span>
        <span>{formatDate(review.date)}</span>
      </div>
    </div>
  );
}