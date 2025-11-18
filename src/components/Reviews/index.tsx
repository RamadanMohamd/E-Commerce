import React, { useState } from 'react';
import { cn } from '@/lib/utils';
import { RatingSummary } from './RatingSummary';
import { ReviewCard } from './ReviewCard';
import { ReviewFilters } from './ReviewFilters';
import { DashedSeparator } from '@/components/DashedSeparator';
import { Button } from '@/components/ui/button';
import type { ProductReviewsProps } from '@/types/reviews';

export const ProductReviews: React.FC<ProductReviewsProps> = ({
  reviews,
  stats,
  title = 'Product Reviews',
  className = '',
}) => {
  const [activeTab, setActiveTab] = useState<'all' | 'withPhoto' | 'withDescription'>('all');

  if (!reviews.length) return null;

  return (
    <section className={cn('w-full', className)}>
      {/* Header - Full Width */}
      <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-6 md:mb-8">{title}</h2>
      <div className="rounded-2xl p-6 md:p-8 w-full block relative mb-6 md:mb-8">
        {/* Dashed border using SVG */}
        <div className="absolute inset-0 rounded-2xl pointer-events-none">
          <svg className="w-full h-full" preserveAspectRatio="none">
            <rect
              x="1"
              y="1"
              width="calc(100% - 2px)"
              height="calc(100% - 2px)"
              rx="16"
              ry="16"
              fill="none"
              stroke="#A3A3A3"
              strokeWidth="1"
              strokeDasharray="6 6"
            />
          </svg>
        </div>
        <div className="relative z-10">
          <RatingSummary stats={stats} />
        </div>
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-[300px_1fr] xl:grid-cols-[400px_1fr] gap-6 md:gap-8">

        {/* Left Column: Rating Summary & Filters */}
        <div className="space-y-6">
          {/* Rating Summary */}


          {/* Filters */}
          <div className="rounded-lg p-4 md:p-6 relative sticky top-4 self-start">
            {/* Dashed border around parent */}
            <div className="absolute inset-0 rounded-lg pointer-events-none">
              <svg className="w-full h-full" preserveAspectRatio="none">
                <rect
                  x="1"
                  y="1"
                  width="calc(100% - 2px)"
                  height="calc(100% - 2px)"
                  rx="8"
                  ry="8"
                  fill="none"
                  stroke="#A3A3A3"
                  strokeWidth="1"
                  strokeDasharray="6 6"
                />
              </svg>
            </div>
            <div className="relative z-10">
              <div className="pb-3">
                <p className="text-base font-semibold text-gray-900">Reviews Filter</p>
              </div>
              <DashedSeparator />
              <div className="pt-4">
                <ReviewFilters />
              </div>
            </div>
          </div>
        </div>

        {/* Right Column: Reviews List */}
        <div>
          <p className="text-base font-semibold text-gray-900 mb-4 md:mb-6">Review Lists</p>
          {/* Tabs */}
          <div className="flex gap-2 md:gap-4 mb-6 md:mb-8 overflow-x-auto">
            <Button
              onClick={() => setActiveTab('all')}
              variant={activeTab === 'all' ? 'black' : 'ghost'}
              size="sm"
              className={cn('px-4 md:px-6 py-2 text-sm font-medium rounded-lg transition-all whitespace-nowrap border', activeTab === 'all' ? 'border-black' : 'border-gray-200')}
            >
              All Reviews
            </Button>
            <Button
              onClick={() => setActiveTab('withPhoto')}
              variant={activeTab === 'withPhoto' ? 'black' : 'ghost'}
              size="sm"
              className={cn('px-4 md:px-6 py-2 text-sm font-medium rounded-lg transition-all whitespace-nowrap border', activeTab === 'withPhoto' ? 'border-black' : 'border-gray-200')}
            >
              With Photo & Video
            </Button>
            <Button
              onClick={() => setActiveTab('withDescription')}
              variant={activeTab === 'withDescription' ? 'black' : 'ghost'}
              size="sm"
              className={cn('px-4 md:px-6 py-2 text-sm font-medium rounded-lg transition-all whitespace-nowrap border', activeTab === 'withDescription' ? 'border-black' : 'border-gray-200')}
            >
              With Description
            </Button>
          </div>

          {/* Reviews */}
          <div className="space-y-6">
            {reviews.map((review, index) => (
              <ReviewCard
                key={review.id}
                review={review}
                isLast={index === reviews.length - 1}
              />
            ))}
          </div>


        </div>
      </div>
    </section>
  );
};

export default ProductReviews;
