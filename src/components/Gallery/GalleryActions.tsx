import React from 'react';
import { Heart, Share2, ChevronLeft, ChevronRight } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface GalleryActionsProps {
  onPrevious: () => void;
  onNext: () => void;
  onLike?: () => void;
  onShare?: () => void;
}

export const GalleryActions: React.FC<GalleryActionsProps> = ({
  onPrevious,
  onNext,
  onLike,
  onShare,
}) => {
  return (
    <div className="flex shrink-0 flex-col items-center justify-between gap-6">
      <div className="flex flex-col gap-3">
        {onLike && (
          <Button
            variant="ghost"
            size="sm"
            onClick={onLike}
            className="rounded-lg bg-surface p-3 hover:bg-surface/80 transition-all duration-300 ease-in-out hover:scale-110 active:scale-95"
            aria-label="Add to favorites"
          >
            <Heart size={20} className="text-text-primary transition-colors duration-200" />
          </Button>
        )}
        {onShare && (
          <Button
            variant="ghost"
            size="sm"
            onClick={onShare}
            className="rounded-lg bg-surface p-3 hover:bg-surface/80 transition-all duration-300 ease-in-out hover:scale-110 active:scale-95"
            aria-label="Share product"
          >
            <Share2 size={20} className="text-text-primary transition-colors duration-200" />
          </Button>
        )}
      </div>

      <div className="flex flex-col gap-3">
        <Button
          variant="ghost"
          size="sm"
          onClick={onPrevious}
          className="rounded-lg bg-surface p-3 hover:bg-surface/80 transition-all duration-300 ease-in-out hover:scale-110 active:scale-95"
          aria-label="Previous image"
        >
          <ChevronLeft size={20} className="text-text-primary transition-colors duration-200" />
        </Button>
        <Button
          variant="ghost"
          size="sm"
          onClick={onNext}
          className="rounded-lg bg-surface p-3 hover:bg-surface/80 transition-all duration-300 ease-in-out hover:scale-110 active:scale-95"
          aria-label="Next image"
        >
          <ChevronRight size={20} className="text-text-primary transition-colors duration-200" />
        </Button>
      </div>
    </div>
  );
};
