import React from 'react';
import { useImageZoom } from '@/hooks/useImageZoom';
import { cn } from '@/lib/utils';

interface ImageZoomViewerProps {
  src: string;
  alt: string;
  isActive: boolean;
}

export const ImageZoomViewer: React.FC<ImageZoomViewerProps> = ({
  src,
  alt,
  isActive,
}) => {
  const {
    zoomState,
    imageRef,
    handleMouseEnter,
    handleMouseLeave,
    handleMouseMove,
  } = useImageZoom();

  return (
    <div
      ref={imageRef}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      onMouseMove={handleMouseMove}
      className={cn(
        'absolute inset-0 h-full w-full rounded-lg overflow-hidden',
        'transition-opacity duration-300 ease-out will-change-opacity',
        isActive ? 'z-20 opacity-100' : 'opacity-0 pointer-events-none'
      )}
      style={{
        cursor: zoomState.isZooming ? 'zoom-in' : 'default',
        contentVisibility: isActive ? 'visible' : 'hidden',
      }}
    >
      {/* Container that will hold both normal and zoomed view */}
      <div className="relative h-full w-full">
        {/* Main Image - visible when not zooming */}
        <img
          src={src}
          alt={alt}
          className={cn(
            'h-full w-full object-contain transition-opacity duration-300 ease-out',
            zoomState.isZooming ? 'opacity-0' : 'opacity-100'
          )}
          loading="eager"
          fetchPriority="high"
          decoding="async"
          width="800"
          height="600"
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 800px"
        />

        {/* Zoomed Image - preload in background */}
        <link rel="preload" as="image" href={src} />
        <div
          className={cn(
            'absolute inset-0 bg-white transition-opacity duration-200 ease-out',
            zoomState.isZooming ? 'opacity-100' : 'opacity-0'
          )}
          style={{
            backgroundImage: `url(${src})`,
            backgroundSize: '250%',
            backgroundPosition: zoomState.backgroundPosition,
            backgroundRepeat: 'no-repeat',
            willChange: zoomState.isZooming ? 'transform' : 'auto',
            transform: 'translateZ(0)',
          }}
        />
      </div>
    </div>
  );
};
