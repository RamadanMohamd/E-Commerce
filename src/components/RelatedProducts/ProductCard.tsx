import React from 'react';
import { Star } from 'lucide-react';
import { cn } from '@/lib/utils';
import { OptimizedImage } from '@/components/ui/OptimizedImage';
import type { RelatedProduct } from '@/types/relatedProducts';
import { useSettingsStore } from '@/store/settingsStore';
import { formatPrice, getCurrencySymbol } from '@/lib/currency';

interface ProductCardProps {
  product: RelatedProduct;
  onClick?: (product: RelatedProduct) => void;
}

export const ProductCard: React.FC<ProductCardProps> = ({ product, onClick }) => {
  const { currency } = useSettingsStore();
  const hasDiscount = product.salePrice && product.salePrice < product.price;
  const currencySymbol = getCurrencySymbol(currency);
  
  return (
    <div
      onClick={() => onClick?.(product)}
      onKeyDown={(e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          onClick?.(product);
        }
      }}
      className="cursor-pointer"
      role="button"
      tabIndex={0}
      aria-label={`View ${product.name} - ${product.brand}, ${currencySymbol}${product.salePrice || product.price}`}
    >
      {/* Product Image */}
      <div className="relative bg-[#f5f5f5] aspect-[3/4] overflow-hidden rounded-2xl mb-3">
        <OptimizedImage
          src={product.imageWebp || product.image}
          fallback={product.imageWebp ? product.image : undefined}
          alt={product.name}
          className="w-full h-full object-cover"
          loading="lazy"
        />
      </div>

      {/* Product Info */}
      <div className="space-y-2">
        {/* Brand */}
        <p className="text-sm font-bold text-[#1a1a1a]">
          {product.brand}
        </p>

        {/* Price */}
        <div className="flex items-center gap-2">
          {hasDiscount ? (
            <>
              <span className="text-2xl font-bold text-[#1a1a1a]">
                {formatPrice(product.salePrice!, currency)}
              </span>
              <span className="text-sm text-[#6b7280] line-through font-normal">
                {formatPrice(product.price, currency)}
              </span>
            </>
          ) : (
            <span className="text-2xl font-bold text-[#1a1a1a]">
              {formatPrice(product.price, currency)}
            </span>
          )}
        </div>

        {/* Description */}
        <p className="text-sm text-[#6b7280] font-normal line-clamp-2">
          {product.description}
        </p>

        {/* Rating & Sold Count */}
        <div className="flex items-center gap-2">
          <div className="flex items-center gap-1">
            <Star className="w-5 h-5 fill-[#f59e0b] text-[#f59e0b]" />
            <span className="text-sm font-bold text-[#1a1a1a]">
              {product.rating.toFixed(1)}
            </span>
          </div>
          <span className="text-sm text-[#6b7280] font-normal">
            {product.soldCount.toLocaleString()} Sold
          </span>
        </div>
      </div>
    </div>
  );
};
