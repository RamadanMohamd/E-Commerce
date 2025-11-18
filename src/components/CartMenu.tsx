import React from 'react';
import { ShoppingBag, Trash2 } from 'lucide-react';
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from './ui/sheet';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { useCartStore } from '@/store/cartStore';
import { useTranslation } from '@/hooks/useTranslation';
import { useSettingsStore } from '@/store/settingsStore';
import { formatPrice } from '@/lib/currency';

interface CartMenuProps {
  children: React.ReactNode;
}

export const CartMenu: React.FC<CartMenuProps> = ({ children }) => {
  const { t } = useTranslation();
  const { currency } = useSettingsStore();
  const { items, removeItem, updateQuantity, clearCart, getTotalItems, getTotalPrice } = useCartStore();
  const [isOpen, setIsOpen] = React.useState(false);

  // Debug: Log cart items
  console.log('Cart Debug:', {
    items,
    totalItems: getTotalItems(),
    totalPrice: getTotalPrice()
  });

  const handleCheckout = () => {
    // Implement checkout logic
    alert(t('cart.proceedingToCheckout'));
  };

  return (
    <Sheet open={isOpen} onOpenChange={setIsOpen}>
      <SheetTrigger asChild>
        {children}
      </SheetTrigger>
      <SheetContent className="w-full sm:max-w-lg">
        <SheetHeader>
          <SheetTitle className="flex items-center gap-2">
            <ShoppingBag className="w-5 h-5" />
            {t('cart.title')}
            {getTotalItems() > 0 && (
              <span className="inline-flex items-center justify-center rounded-full bg-gray-200 text-gray-800 px-2.5 py-0.5 text-xs font-semibold">
                {getTotalItems()} {getTotalItems() === 1 ? t('cart.item') : t('cart.items')}
              </span>
            )}
          </SheetTitle>
          <SheetDescription>
            {items.length === 0 ? t('cart.empty') : t('cart.reviewItems')}
          </SheetDescription>
        </SheetHeader>

        <div className="flex flex-col h-full">
          {/* Cart Items */}
          <div className="flex-1 overflow-y-auto py-6 space-y-4">
            {items.length === 0 ? (
              <div className="flex flex-col items-center justify-center h-full text-center py-12">
                <ShoppingBag className="w-16 h-16 text-gray-300 mb-4" />
                <p className="text-gray-500 text-lg">{t('cart.emptyMessage')}</p>
                <Button
                  variant="outline"
                  className="mt-4"
                  onClick={() => setIsOpen(false)}
                >
                  {t('cart.continueShopping')}
                </Button>
              </div>
            ) : (
              items.map((item) => (
                <div key={item.id} className="flex gap-4 pb-4 border-b">
                  {/* Product Image */}
                  <div className="w-20 h-20 rounded-lg overflow-hidden bg-gray-100 flex-shrink-0">
                    <img
                      src={item.productImage}
                      alt={item.productName}
                      className="w-full h-full object-cover"
                      loading="lazy"
                    />
                  </div>

                  {/* Product Details */}
                  <div className="flex-1 min-w-0">
                    <p className="font-semibold text-sm mb-1 truncate">
                      {item.productName}
                    </p>
                    <div className="flex gap-2 text-xs text-gray-500 mb-2">
                      <span>{t('products.color')}: {item.color}</span>
                      <span>•</span>
                      <span>{t('products.size')}: {item.size}</span>
                    </div>
                    
                    {/* Price and Quantity Controls */}
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <Button
                          variant="outline"
                          size="sm"
                          className="h-7 w-7 flex items-center justify-center"
                          onClick={() => updateQuantity(item.id, item.quantity - 1)}
                        >
                    - 
                        </Button>
                        <span className="text-sm font-medium w-8 text-center">
                          {item.quantity}
                        </span>
                        <Button
                          variant="outline"
                          size="sm"
                          className="h-7 w-7 flex items-center justify-center"
                          onClick={() => updateQuantity(item.id, item.quantity + 1)}
                        >
                          + 
                        </Button>
                      </div>

                      <div className="flex items-center gap-2">
                        <div className="text-right">
                          {item.price > item.salePrice && (
                            <span className="text-xs text-gray-400 line-through block">
                              {formatPrice((item.price + 100 * item.quantity), currency)}
                            </span>
                          )}
                          <span className="font-bold text-sm">
                            {formatPrice((item.price * item.quantity), currency)}
                          </span>
                        </div>
                        <Button
                          variant="ghost"
                          size="sm"
                          className="h-7 w-7 text-red-500 hover:text-red-700 hover:bg-red-50"
                          onClick={() => removeItem(item.id)}
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>

          {/* Footer with Total and Actions */}
          {items.length > 0 && (
            <div className="border-t pt-4 space-y-4">
              <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span className="text-gray-600">{t('cart.subtotal')}</span>
                <span className="font-semibold">{formatPrice(getTotalPrice(), currency)}</span>
              </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">{t('cart.shipping')}</span>
                  <span className="font-semibold">{t('cart.free')}</span>
                </div>
                <Separator />
                <div className="flex justify-between text-base font-bold">
                  <span>{t('cart.total')}</span>
                  <span>{formatPrice(getTotalPrice(), currency)}</span>
                </div>
              </div>

              <div className="space-y-2">
                <Button
                  className="w-full !bg-black focus:ring-2  focus:ring-black"
                  size="lg"
                >
                  {t('cart.checkout')}
                </Button>
                <Button
                  variant="outline"
                  className="w-full"
                  onClick={() => setIsOpen(false)}
                >
                  {t('cart.continueShopping')}
                </Button>
                <Button
                  variant="ghost"
                  className="w-full text-red-500 hover:text-red-700 hover:bg-red-50"
                  onClick={clearCart}
                >
                  <Trash2 className="h-4 w-4 mr-2" />
                  {t('cart.clearCart')}
                </Button>
              </div>
            </div>
          )}
        </div>
      </SheetContent>
    </Sheet>
  );
};
