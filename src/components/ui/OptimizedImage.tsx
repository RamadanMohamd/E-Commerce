import React from 'react';

interface OptimizedImageProps {
  src: string;
  fallback?: string;
  alt: string;
  className?: string;
  loading?: 'lazy' | 'eager';
  fetchPriority?: 'high' | 'low' | 'auto';
  width?: number;
  height?: number;
  decoding?: 'async' | 'sync' | 'auto';
}

export const OptimizedImage: React.FC<OptimizedImageProps> = ({
  src,
  fallback,
  alt,
  className = '',
  loading = 'lazy',
  fetchPriority,
  width,
  height,
  decoding = 'async',
}) => {
  // If we have a WebP source and a fallback, use picture element
  if (src.endsWith('.webp') && fallback) {
    return (
      <picture>
        <source srcSet={src} type="image/webp" />
        <img
          src={fallback}
          alt={alt}
          className={className}
          loading={loading}
          fetchPriority={fetchPriority}
          width={width}
          height={height}
          decoding={decoding}
        />
      </picture>
    );
  }

  // Otherwise, use regular img tag
  return (
    <img
      src={src}
      alt={alt}
      className={className}
      loading={loading}
      fetchPriority={fetchPriority}
      width={width}
      height={height}
      decoding={decoding}
    />
  );
};
