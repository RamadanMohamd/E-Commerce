import React from 'react';
import { ThumbsUp, ThumbsDown } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Star } from 'lucide-react';
import { DashedSeparator } from '@/components/DashedSeparator';
import type { Review } from '@/types/reviews';

interface ReviewCardProps {
  review: Review;
  className?: string;
  isLast?: boolean;
}

export const ReviewCard: React.FC<ReviewCardProps> = ({
  review,
  className = '',
  isLast = false,
}) => {
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    const year = date.getFullYear();
    const hours = String(date.getHours()).padStart(2, '0');
    const minutes = String(date.getMinutes()).padStart(2, '0');
    return `${month} ${day}, ${year} ${hours}:${minutes} PM`;
  };

  return (
    <div className={cn('pb-6 mb-6', className)}>
      {/* Rating Stars */}
      <div className="flex items-center gap-1 mb-3">
        {[1, 2, 3, 4, 5].map((star) => (
          <Star
            key={star}
            className={cn(
              'w-4 h-4',
              star <= review.rating
                ? 'fill-orange-400 text-orange-400'
                : 'fill-gray-200 text-gray-200'
            )}
          />
        ))}
      </div>

      {/* Review Text */}
      <p className="text-base text-gray-900 mb-2 font-medium">{review.comment}</p>
      <p className="text-sm text-gray-700 mb-4">{formatDate(review.date)}</p>

      {/* Author Info */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          {review.author.avatar ? (
            <img
              src={review.author.avatar}
              alt={review.author.name}
              className="w-10 h-10 rounded-full object-cover object-center"
              loading="lazy"
            />
          ) : (
            <div className="w-10 h-10 rounded-full bg-[#e5e7eb] flex items-center justify-center">
              <span className="text-sm font-semibold text-[#6b7280]">
                {review.author.name.charAt(0).toUpperCase()}
              </span>
            </div>
          )}
          <div>
            <p className="text-sm font-medium text-gray-900">{review.author.name}</p>
          </div>
        </div>

        {/* Actions - Like/Dislike (display only) */}
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-2 text-sm text-gray-700">
            <ThumbsUp className="w-5 h-5" strokeWidth={1.5} />
            <span className="font-medium">{review.helpful}</span>
          </div>
          <div className="flex items-center gap-2 text-sm text-gray-700">
            <ThumbsDown className="w-5 h-5" strokeWidth={1.5} />
          </div>
        </div>
      </div>
      {/* Dashed Separator - Hidden for last card */}
      {!isLast && (
        <div className="pt-6">
          <DashedSeparator />
        </div>
      )}
    </div>
  );
};
