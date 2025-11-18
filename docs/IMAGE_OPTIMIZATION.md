# Image Optimization Guide

## Problem
Images from DigitalOcean Spaces are served at full resolution (300KB+) but displayed at smaller sizes, wasting bandwidth and slowing load times.

## Current Status
- Frontend is configured with responsive `sizes` attributes
- Images have proper width/height attributes
- Preload hints are optimized

## Required Backend/CDN Changes

### Option 1: Use Cloudflare Images (Recommended)
1. Proxy DigitalOcean Spaces through Cloudflare
2. Enable Cloudflare Image Resizing
3. Update image URLs to use transformation parameters:
   ```
   https://your-domain.com/cdn-cgi/image/width=800,quality=80,format=webp/image.jpg
   ```

### Option 2: Add Image Processing Lambda/Function
1. Create AWS Lambda or DigitalOcean Function
2. Install Sharp or similar image processing library
3. Generate multiple sizes on upload:
   - Thumbnail: 96x96
   - Small: 400w
   - Medium: 800w
   - Large: 1200w
   - Original: Keep as backup

### Option 3: Update API to Return Multiple Sizes
Modify the product API response to include multiple image URLs:
```json
{
  "images": [
    {
      "id": "1",
      "name": "brown",
      "original": "https://cdn.com/image.webp",
      "sizes": {
        "thumbnail": "https://cdn.com/image-96.webp",
        "small": "https://cdn.com/image-400.webp",
        "medium": "https://cdn.com/image-800.webp",
        "large": "https://cdn.com/image-1200.webp"
      }
    }
  ]
}
```

## Expected Savings
- Current: ~300KB per image
- Optimized: ~80-100KB per image (73% reduction)
- Total page savings: ~220KB

## Implementation Priority
**HIGH** - This is causing the largest performance impact (68% of LCP time)

## Testing
After implementation, verify:
1. Mobile devices receive smaller images (<100KB)
2. Desktop receives appropriately-sized images (~800-1200px)
3. Retina displays get 2x versions when needed
4. WebP format is served to supporting browsers

## Current Workaround
The frontend is configured to signal desired sizes via `sizes` attribute, but the browser still downloads the full image. Server-side resizing is required for actual savings.
