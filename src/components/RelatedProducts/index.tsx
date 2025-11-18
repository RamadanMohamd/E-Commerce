import React from 'react';
import { cn } from '@/lib/utils';
import { ProductCard } from './ProductCard';
import { useTranslation } from '@/hooks/useTranslation';
import { Button } from '@/components/ui/button';
import type { RelatedProductsProps } from '@/types/relatedProducts';

export const RelatedProducts: React.FC<RelatedProductsProps> = ({
  products,
  title,
  onViewAll,
  onProductClick,
  className = '',
}) => {
  const { t } = useTranslation();
  const displayTitle = title || t('products.relatedProduct');
  if (!products.length) return null;

  return (
    <section className={cn('w-full py-6 md:py-8', className)}>
      {/* Header */}
      <div className="flex items-center justify-between mb-6 md:mb-8">
        <h2 className="text-2xl md:text-3xl font-bold text-gray-900">{displayTitle}</h2>
        {onViewAll && (
          <Button
            variant="link"
            size="sm"
            onClick={onViewAll}
            className="text-sm font-medium text-gray-900 underline hover:no-underline transition-all"
          >
            {t('products.viewAll')}
          </Button>
        )}
      </div>

      {/* Products Grid */}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4 md:gap-6">
        {products.map((product) => (
          <ProductCard
            key={product.id}
            product={product}
            onClick={onProductClick}
          />
        ))}
      </div>
    </section>
  );
};

export default RelatedProducts;
