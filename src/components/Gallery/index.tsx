import React from 'react';
import { ImageZoomViewer } from './ImageZoomViewer';
import type { GalleryImage } from '@/types/gallery';
import { Button } from '@/components/ui/button';

interface ProductGalleryProps {
  images: GalleryImage[];
  selectedImage: string;
  onImageChange: (imageName: string) => void;
  className?: string;
}

export const ProductGallery: React.FC<ProductGalleryProps> = ({
  images,
  selectedImage,
  onImageChange,
  className = '',
}) => {


  if (!images.length) {
    return (
      <div className="w-full flex items-center justify-center h-96 rounded-lg">
        <p className="text-text-secondary">No images available</p>
      </div>
    );
  }

  return (
    <div className={`w-full ${className}`}>
      {/* Main Image */}
      <div className="relative mb-4" style={{ contain: 'layout style paint' }}>
        {/* Main Image Container */}
        <div className="relative overflow-hidden rounded-lg" style={{ willChange: 'opacity' }}>
          {/* Spacer image to maintain aspect ratio */}
          <img
            src={images[0]?.value}
            alt=""
            aria-hidden="true"
            className="invisible h-full w-full object-contain min-h-[500px] max-h-[600px]"
            loading="eager"
            fetchPriority="high"
            decoding="async"
            width="800"
            height="600"
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 800px"
          />

          {/* Zoomable Images */}
          {images.map((image) => (
            <ImageZoomViewer
              key={image.id}
              src={image.value}
              alt={`${image.name} product image`}
              isActive={selectedImage === image.name}
            />
          ))}


        </div>

      </div>

      {/* Horizontal Thumbnails at the bottom */}
      <div className="flex gap-3 overflow-x-auto pb-2 scrollbar-thin scrollbar-thumb-border scrollbar-track-surface">
        {images.map((image, index) => (
          <Button
            key={image.id}
            onClick={() => onImageChange(image.name)}
            variant="ghost"
            size="sm"
            className={`w-20 h-20 sm:w-24 sm:h-24 flex-shrink-0 overflow-hidden rounded-lg transition-all duration-300 ease-in-out hover:shadow-md focus:outline-none focus:ring-0 p-0 ${
              selectedImage === image.name
                ? 'border-2 border-[#1a1a1a] shadow-md'
                : 'border-2 border-transparent hover:border-[#e5e7eb]'
            }`}
            aria-label={`View ${image.name} image`}
            aria-pressed={selectedImage === image.name}
          >
            <img
              src={image.value}
              loading="lazy"
              alt={`${image.name} view ${index + 1}`}
              className="h-full w-full object-cover"
              width="96"
              height="96"
              sizes="96px"
            />
          </Button>
        ))}
      </div>
    </div>
  );
};

export default ProductGallery;
