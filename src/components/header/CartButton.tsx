import React, { useEffect, useState } from 'react';
import { ShoppingCart } from 'lucide-react';
import { Button } from '../ui/button';
import { CartMenu } from '../CartMenu';
import { useCartStore } from '@/store/cartStore';

export interface CartButtonProps {
  className?: string;
}

export const CartButton: React.FC<CartButtonProps> = ({
  className = '',
}) => {
  const { getTotalItems } = useCartStore();
  const itemCount = getTotalItems();
  const [animate, setAnimate] = useState(false);

  useEffect(() => {
    if (itemCount > 0) {
      setAnimate(true);
      const timer = setTimeout(() => setAnimate(false), 600);
      return () => clearTimeout(timer);
    }
  }, [itemCount]);

  return (
    <CartMenu>
      <Button
        variant="ghost"
        size="md"
        className={`relative ${className} focus:outline-none focus:ring-0 border-0`}
        aria-label={`Shopping cart with ${itemCount} items`}
        data-testid="cart-button"
      >
        <ShoppingCart className="h-5 w-5" />
        {itemCount > 0 && (
          <span className={`absolute -top-1 -right-1 h-5 w-5 rounded-full bg-black text-white text-xs flex items-center justify-center font-semibold transition-transform duration-300 ${animate ? 'animate-ring' : ''}`}>
            {itemCount > 99 ? '99+' : itemCount}
          </span>
        )}
      </Button>
    </CartMenu>
  );
};
