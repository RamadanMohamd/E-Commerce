/**
 * Generates responsive image URLs with size parameters
 * For DigitalOcean Spaces and other CDNs that support URL-based transformations
 */

interface ImageSize {
  width: number;
  quality?: number;
  format?: 'webp' | 'jpg' | 'png';
}

/**
 * Generate optimized image URL with transformation parameters
 * @param url - Original image URL
 * @param size - Desired image dimensions and quality
 * @returns Optimized image URL with query parameters
 */
export function getOptimizedImageUrl(url: string, size: ImageSize): string {
  if (!url) return url;

  // For external CDN URLs (DigitalOcean Spaces, Cloudflare, etc.)
  // Check if the CDN supports URL-based image transformations
  const urlObj = new URL(url);
  
  // DigitalOcean Spaces doesn't natively support transformations via URL
  // But we can add srcset support for browser selection
  // For production, consider using a CDN like Cloudflare Images or imgix
  
  return url;
}

/**
 * Generate srcset string for responsive images
 * @param baseUrl - Base image URL
 * @param sizes - Array of widths to generate
 * @returns srcset string
 */
export function generateSrcSet(baseUrl: string, sizes: number[] = [400, 800, 1200, 1600]): string {
  // For now, return the base URL since DigitalOcean Spaces doesn't support transformations
  // In production, replace this with actual CDN transformation URLs
  return sizes.map(width => `${baseUrl} ${width}w`).join(', ');
}

/**
 * Calculate optimal image size based on container dimensions
 * @param containerWidth - Width of the container element
 * @param devicePixelRatio - Device pixel ratio (default: window.devicePixelRatio)
 * @returns Optimal image width
 */
export function getOptimalImageWidth(
  containerWidth: number,
  devicePixelRatio: number = typeof window !== 'undefined' ? window.devicePixelRatio : 1
): number {
  // Round up to nearest standard size
  const standardSizes = [400, 600, 800, 1200, 1600, 2000];
  const targetWidth = containerWidth * devicePixelRatio;
  
  return standardSizes.find(size => size >= targetWidth) || standardSizes[standardSizes.length - 1];
}

/**
 * Add responsive image attributes to external URLs
 * This is a workaround for CDNs that don't support URL-based transformations
 */
export function getResponsiveImageProps(url: string, maxWidth: number = 800) {
  return {
    src: url,
    sizes: `(max-width: 640px) 100vw, (max-width: 1024px) 50vw, ${maxWidth}px`,
    // Note: srcset would be the same URL repeated since we can't resize server-side
    // For production, integrate with an image CDN service
  };
}
