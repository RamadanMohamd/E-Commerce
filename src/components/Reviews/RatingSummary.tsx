import React from 'react';
import { cn } from '@/lib/utils';
import { Star } from 'lucide-react';
import type { ReviewsStats } from '@/types/reviews';

interface RatingSummaryProps {
  stats: ReviewsStats;
  className?: string;
}

export const RatingSummary: React.FC<RatingSummaryProps> = ({ stats, className = '' }) => {
  const { averageRating, totalReviews, distribution } = stats;

  const getPercentage = (count: number) => {
    return totalReviews > 0 ? (count / totalReviews) * 100 : 0;
  };

  return (
    <div className={cn('flex flex-col lg:flex-row gap-6 md:gap-8 lg:gap-12 w-full', className)}>
      {/* Average Rating - Left Side */}
      <div className="flex flex-col items-center justify-center lg:min-w-[140px]">
        {/* Circular Rating */}
        <div className="relative w-20 h-20 md:w-24 md:h-24 mb-2 md:mb-3">
          <svg className="w-20 h-20 md:w-24 md:h-24 transform -rotate-90">
            <circle
              cx="40"
              cy="40"
              r="32"
              stroke="#e5e7eb"
              strokeWidth="6"
              fill="none"
              className="md:hidden"
            />
            <circle
              cx="40"
              cy="40"
              r="32"
              stroke="#f97316"
              strokeWidth="6"
              fill="none"
              strokeDasharray={`${(averageRating / 5) * 201} 201`}
              strokeLinecap="round"
              className="md:hidden"
            />
            <circle
              cx="48"
              cy="48"
              r="40"
              stroke="#e5e7eb"
              strokeWidth="8"
              fill="none"
              className="hidden md:block"
            />
            <circle
              cx="48"
              cy="48"
              r="40"
              stroke="#f97316"
              strokeWidth="8"
              fill="none"
              strokeDasharray={`${(averageRating / 5) * 251.2} 251.2`}
              strokeLinecap="round"
              className="hidden md:block"
            />
          </svg>
          <div className="absolute inset-0 flex items-center justify-center">
            <span className="text-2xl md:text-3xl font-bold text-gray-900">
              {averageRating.toFixed(1)}
            </span>
          </div>
        </div>
        
        {/* Stars */}
        <div className="flex gap-0.5 md:gap-1 mb-1.5 md:mb-2">
          {[1, 2, 3, 4, 5].map((star) => (
            <Star
              key={star}
              className="w-4 h-4 md:w-5 md:h-5 fill-orange-400 text-orange-400"
            />
          ))}
        </div>
        
        {/* Review Count */}
        <p className="text-xs md:text-sm text-gray-500">
          from {totalReviews.toLocaleString()}k reviews
        </p>
      </div>

      {/* Rating Distribution - Right Side */}
      <div className="flex-1 space-y-2 md:space-y-3">
        {[5, 4, 3, 2, 1].map((rating) => {
          const count = distribution[rating as keyof typeof distribution];
          const percentage = getPercentage(count);

          return (
            <div key={rating} className="flex items-center gap-2 md:gap-4">
              <span className="text-sm md:text-base font-medium text-gray-900 w-6 md:w-8">{rating}.0</span>
              <Star className="w-4 h-4 md:w-5 md:h-5 fill-orange-400 text-orange-400" />
              <div className="flex-1 h-1.5 md:h-2 bg-gray-200 rounded-full overflow-hidden">
                <div
                  className="h-full bg-gray-900 transition-all duration-300 rounded-full"
                  style={{ width: `${percentage}%` }}
                />
              </div>
              <span className="text-sm md:text-base font-medium text-gray-900 w-12 md:w-16 text-right">
                {count.toLocaleString()}
              </span>
            </div>
          );
        })}
      </div>
    </div>
  );
};
