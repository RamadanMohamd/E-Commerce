export interface Review {
  id: string;
  rating: number;
  comment: string;
  author: {
    name: string;
    avatar?: string;
  };
  date: string;
  helpful: number;
  verified?: boolean;
}

export interface RatingDistribution {
  5: number;
  4: number;
  3: number;
  2: number;
  1: number;
}

export interface ReviewsStats {
  averageRating: number;
  totalReviews: number;
  distribution: RatingDistribution;
}

export interface ReviewFilter {
  rating?: number;
  topic?: string;
  withMedia?: boolean;
}

export interface ProductReviewsProps {
  reviews: Review[];
  stats: ReviewsStats;
  title?: string;
  onFilterChange?: (filter: ReviewFilter) => void;
  onHelpful?: (reviewId: string) => void;
  onReport?: (reviewId: string) => void;
  className?: string;
}
