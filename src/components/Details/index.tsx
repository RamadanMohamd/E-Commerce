import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { DashedSeparator } from '@/components/DashedSeparator';
import type { Details as ProductDetailsType, VariationProp } from '@/types/products';
import { Star } from 'lucide-react';
import { cn } from '@/lib/utils';
import { useDetailsStore } from '../../store/detailsStore';
import { useCartStore } from '../../store/cartStore';
import SeeMore from '@/components/SeeMore';
import { useTranslation } from '@/hooks/useTranslation';
import { useSettingsStore } from '@/store/settingsStore';
import { formatPrice } from '@/lib/currency';

interface DetailsProps {
  product: ProductDetailsType;
  className?: string;
}

export const Details: React.FC<DetailsProps> = ({ 
  product,
  className = '' 
}) => {
  const { t } = useTranslation();
  const { currency } = useSettingsStore();
  const [quantity, setQuantity] = useState(1);
  const [showSuccessMessage, setShowSuccessMessage] = useState(false);
  const { 
    availableColors, 
    availableSizes, 
    selectedVariations,
    selectedVariant,
    setSelectedVariation 
  } = useDetailsStore();
  const { addItem } = useCartStore();

  const hasDiscount = product.sale_price < product.price;
  const discountPercentage = hasDiscount 
    ? Math.round(((product.price - product.sale_price) / product.price) * 100)
    : 0;

  // Get display price - prioritize selected variant, fallback to product
  const displayPrice = selectedVariant ? selectedVariant.price : product.price;
  const displayOriginalPrice = selectedVariant ? selectedVariant.price + 100 : product.price;
  const hasVariantDiscount = displayOriginalPrice > displayPrice;

  // Debug: Log price values
  console.log('Price Debug:', {
    productPrice: product.price,
    productSalePrice: product.sale_price,
    selectedVariant: selectedVariant,
    variantPrice: selectedVariant?.price,
    variantSalePrice: selectedVariant?.sale_price,
    displayPrice,
    displayOriginalPrice,
    hasVariantDiscount
  });

  const handleAddToCart = () => {
    if (selectedVariant && selectedVariations.color && selectedVariations.size) {
      // Find the color variation to get the image URL
      const selectedColorVariation = availableColors.find(
        color => color.name === selectedVariations.color
      );
      
      // Use the color's image URL if available, otherwise use product thumb
      const isImageUrl = selectedColorVariation?.value && 
        (selectedColorVariation.value.startsWith('http') || selectedColorVariation.value.startsWith('/'));
      const variantImage = isImageUrl ? selectedColorVariation.value : product.thumb;

      addItem({
        productId: product.id,
        variantId: selectedVariant.id,
        productName: product.name,
        productImage: variantImage || product.thumb,
        color: selectedVariations.color,
        size: selectedVariations.size,
        price: selectedVariant.price,
        salePrice: selectedVariant.sale_price,
        quantity: quantity,
      });
      
      setShowSuccessMessage(true);
      setTimeout(() => setShowSuccessMessage(false), 3000);
      setQuantity(1);
    } else {
      alert(
        `⚠️ Please select a valid color and size combination\n\n` +
        `Current Selection:\n` +
        `Color: ${selectedVariations.color || 'Not selected'}\n` +
        `Size: ${selectedVariations.size || 'Not selected'}`
      );
    }
  };

  const handleCheckout = () => {
    if (selectedVariant) {
      alert(`Proceeding to checkout!\nTotal: ${formatPrice((selectedVariant.sale_price * quantity), currency)}`);
    } else {
      alert('Please select a valid color and size combination');
    }
  };

  return (
    <div className={cn('w-full space-y-6', className)}>
      {/* Brand and Product Name */}
      <div className="space-y-3">
        <p className="text-sm text-[#6b7280] font-normal">
          {product.slug || 'John Lewis ANYDAY'}
        </p>
        <h1 className="text-[28px] md:text-[32px] leading-tight font-bold text-[#1a1a1a]">
          {product.name}
        </h1>
        
        {/* Price and Rating */}
        <div className="flex items-start md:items-center justify-between flex-col md:flex-row gap-3 md:gap-0">
          <div className="flex items-center gap-3">
            {hasVariantDiscount ? (
              <>
                <span className="text-[18px] text-[#6b7280] line-through font-normal">
                  {formatPrice(displayOriginalPrice, currency)}
                </span>
                <span className="text-[32px] font-bold text-[#1a1a1a]">
                  {formatPrice(displayPrice, currency)}
                </span>
              </>
            ) : (
              <span className="text-[32px] font-bold text-[#1a1a1a]">
                {formatPrice(displayPrice, currency)}
              </span>
            )}
          </div>
          
          <div className="flex items-center gap-2">
            <span className="text-[#6b7280] text-base font-normal">
              1,238 {t('products.sold')}
            </span>
            <span className="w-1 h-1 rounded-full bg-[#d1d5db]" />
            <div className="flex items-center gap-1">
              <Star className="w-5 h-5 fill-[#fbbf24] text-[#fbbf24]" />
              <span className="font-bold text-base text-[#1a1a1a]">4.5</span>
            </div>
          </div>
        </div>
      </div>

      {/* Dashed Separator */}
      <DashedSeparator />

      {/* Description */}
      {product.description && (
        <div>
          <p className="text-base font-normal text-[#6b7280] mb-2">{t('products.description')}:</p>
          <SeeMore title="" content={product.description} />
        </div>
      )}

      {/* Color Selection */}
      {availableColors.length > 0 && (
        <div>
          <p className="text-base font-normal text-[#6b7280] mb-3">
            {t('products.color')}: <span className="text-[#1a1a1a] font-bold">{selectedVariations.color}</span>
          </p>
          <div className="flex gap-3">
            {availableColors.map((color: VariationProp) => {
              return (
                <Button
                  key={color.id}
                  onClick={() => setSelectedVariation('color', color.name)}
                  variant="outline"
                  className={cn(
                    'w-[64px] h-[40px] rounded-xl transition-all focus:outline-none focus:ring-0 p-0',
                    selectedVariations.color === color.name
                      ? ''
                      : 'border-2 border-[#d1d5db] hover:border-[#9ca3af]'
                  )}
                  style={{backgroundColor: color.name}}
                  title={color.name}
                  aria-label={`Select ${color.name} color`}
                />
              );
            })}
          </div>
        </div>
      )}

      {/* Size Selection */}
      {availableSizes.length > 0 && (
        <div>
          <div className="flex items-center justify-between mb-3">
            <p className="text-base font-normal text-[#6b7280]">
              {t('products.size')}: <span className="text-[#1a1a1a] font-bold">{selectedVariations.size}</span>
            </p>
            <Button variant="link" size="sm" className="text-sm !text-black underline hover:no-underline font-normal focus:outline-none focus:ring-0">
              {t('products.viewSizeChart')}
            </Button>
          </div>
          <div className="flex flex-wrap gap-3">
            {availableSizes.map((size: VariationProp) => (
              <Button
                key={size.id}
                onClick={() => setSelectedVariation('size', size.name)}
                variant="ghost"
                size="md"
                className={cn(
                  'min-w-[56px] h-[44px] px-4 rounded-lg border-2 font-bold transition-all text-base focus:outline-none focus:ring-0',
                  selectedVariations.size === size.name
                    ? 'border-transparent bg-[#1a1a1a] text-white hover:bg-[#1a1a1a] hover:!text-black hover:text-white hover:scale-100 cursor-default'
                    : 'border-[#e5e7eb] bg-white  text-[#6b7280] hover:text-black hover:border-[#9ca3af]'
                )}
              >
                {size.name}
              </Button>
            ))}
          </div>
        </div>
      )}

      {/* Quantity and Actions */}
      <div className="space-y-4">
        <div className="flex items-center gap-4">
          <span className="font-semibold text-[#6b7280]">{t('products.quantity')}:</span>
          <div className="flex items-center border-2 border-[#e5e7eb] rounded-lg overflow-hidden">
            <Button
              onClick={() => setQuantity(Math.max(1, quantity - 1))}
              variant="ghost"
              size="sm"
              className="w-10 h-10 flex items-center justify-center text-[#1a1a1a] text-xl font-semibold hover:bg-[#f3f4f6] transition-colors duration-200 focus:outline-none active:bg-[#e5e7eb]"
              aria-label="Decrease quantity"
            >
              −
            </Button>
            <span className="w-16 h-10 flex items-center justify-center border-x-2 border-[#e5e7eb] font-bold text-[#1a1a1a] text-base">
              {quantity}
            </span>
            <Button
              onClick={() => setQuantity(quantity + 1)}
              variant="ghost"
              size="sm"
              className="w-10 h-10 flex items-center justify-center text-[#1a1a1a] text-xl font-semibold hover:bg-[#f3f4f6] transition-colors duration-200 focus:outline-none active:bg-[#e5e7eb]"
              aria-label="Increase quantity"
            >
              +
            </Button>
          </div>
        </div>

        {showSuccessMessage && (
          <div className="flex items-center gap-2 text-green-600 font-semibold text-base transition-all duration-300 ease-in-out animate-in fade-in slide-in-from-top-2">
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
            </svg>
            {t('cart.addedToCart')}
          </div>
        )}

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row gap-4">
          <Button
            onClick={handleAddToCart}
            className="flex-1 !bg-black text-white hover:bg-[#1a1a1a] h-[52px] text-base font-semibold rounded-lg focus:outline-none focus:ring-black border-0"
          >
            {t('products.addToCart')}
          </Button>
          <Button
            variant="outline"
            className="flex-1 border-2 border-black text-black hover:bg-gray-50 h-[52px] text-base font-semibold rounded-lg focus:outline-none focus:ring-0 bg-white"
          >
            {t('products.checkoutNow')}
          </Button>
        </div>
      </div>

      {/* Delivery Info */}
      <Button variant="link" size="sm" className="text-sm !text-[#1a1a1a] font-normal underline hover:no-underline focus:outline-none focus:ring-0">
        {t('products.deliveryTnC')}
      </Button>

      {/* Stock Info */}
      {selectedVariant && selectedVariant.quantity > 0 && (
        <div className="flex items-center gap-2 text-sm">
          <div className="w-2 h-2 rounded-full bg-success" />
          <span className="text-text-secondary">
            {selectedVariant.quantity} {t('products.itemsInStock')}
          </span>
        </div>
      )}
    </div>
  );
};

export default Details;
