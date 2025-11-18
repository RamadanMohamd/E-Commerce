import React from 'react';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import type { GalleryImage } from '@/types/gallery';

interface GalleryThumbnailsProps {
  images: GalleryImage[];
  selectedImage: string;
  onThumbnailClick: (imageName: string) => void;
}

export const GalleryThumbnails: React.FC<GalleryThumbnailsProps> = ({
  images,
  selectedImage,
  onThumbnailClick,
}) => {
  return (
    <div className="flex space-x-2 overflow-x-auto pb-2 scrollbar-thin scrollbar-thumb-border scrollbar-track-surface">
      {images.map((image, index) => (
        <Button
          key={image.id}
          onClick={() => onThumbnailClick(image.name)}
          variant="ghost"
          size="sm"
          className={cn(
            'w-14 h-14 md:h-20 md:w-20 flex-shrink-0 overflow-hidden rounded-lg border-2 p-0',
            'transition-all duration-300 ease-in-out transform',
            'hover:scale-110 hover:shadow-lg focus:outline-none focus:ring-2 focus:ring-accent focus:ring-offset-2',
            selectedImage === image.name
              ? 'border-primary shadow-md scale-105'
              : 'border-border hover:border-primary/50'
          )}
          aria-label={`View ${image.name} image`}
          aria-pressed={selectedImage === image.name}
        >
          <img
            src={image.value}
            loading="lazy"
            alt={`${image.name} view ${index + 1}`}
            className="h-full w-full object-cover transition-transform duration-300"
          />
        </Button>
      ))}
    </div>
  );
};
