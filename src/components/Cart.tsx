import React from 'react';
import { useCartStore } from '@/store/cartStore';
import { Button } from '@/components/ui/button';
import { Trash2, Plus, Minus, ShoppingBag } from 'lucide-react';
import { useTranslation } from '@/hooks/useTranslation';
import { useSettingsStore } from '@/store/settingsStore';
import { formatPrice } from '@/lib/currency';

const Cart: React.FC = () => {
    const { t } = useTranslation();
    const { currency } = useSettingsStore();
    const { items, removeItem, updateQuantity, clearCart, getTotalPrice } = useCartStore();

    return (
        <div className="p-4 max-w-4xl mx-auto">
            <h1 className="text-2xl font-bold mb-4">{t('cart.title')}</h1>
            {items.length === 0 ? (
                <div className="flex flex-col items-center justify-center py-12 text-center">
                    <ShoppingBag className="w-16 h-16 text-gray-300 mb-4" />
                    <p className="text-gray-500 text-lg">{t('cart.emptyMessage')}</p>
                </div>
            ) : (
                <>
                    <div className="space-y-4 mb-6">
                        {items.map((item) => (
                            <div key={item.id} className="flex gap-4 p-4 border rounded-lg">
                                {/* Product Image */}
                                <div className="w-24 h-24 rounded-lg overflow-hidden bg-gray-100 flex-shrink-0">
                                    <img
                                        src={item.productImage}
                                        alt={item.productName}
                                        className="w-full h-full object-cover"
                                        loading="lazy"
                                    />
                                </div>

                                {/* Product Details */}
                                <div className="flex-1">
                                    <p className="font-semibold text-lg mb-1">{item.productName}</p>
                                    <div className="flex gap-3 text-sm text-gray-500 mb-3">
                                        <span>{t('products.color')}: {item.color}</span>
                                        <span>•</span>
                                        <span>{t('products.size')}: {item.size}</span>
                                    </div>
                                    
                                    <div className="flex items-center justify-between">
                                        {/* Quantity Controls */}
                                        <div className="flex items-center gap-3">
                                            <Button
                                                variant="outline"
                                                size="sm"
                                                onClick={() => updateQuantity(item.id, item.quantity - 1)}
                                            >
                                                <Minus className="h-4 w-4" />
                                            </Button>
                                            <span className="font-medium w-8 text-center">
                                                {item.quantity}
                                            </span>
                                            <Button
                                                variant="outline"
                                                size="sm"
                                                onClick={() => updateQuantity(item.id, item.quantity + 1)}
                                            >
                                                <Plus className="h-4 w-4" />
                                            </Button>
                                        </div>

                                        {/* Price and Remove */}
                                        <div className="flex items-center gap-4">
                                            <div className="text-right">
                                                {item.salePrice && item.salePrice < item.price ? (
                                                        <span className="text-sm text-gray-400 line-through">
                                                        {formatPrice(item.price, currency)}
                                                        </span>
                                                    ) : null}
                                                    <span className="text-lg font-semibold">
                                                    {formatPrice(item.salePrice || item.price, currency)}
                                                    </span>
                                            </div>
                                            <Button
                                                variant="ghost"
                                                size="sm"
                                                className="text-red-500 hover:text-red-700 hover:bg-red-50"
                                                onClick={() => removeItem(item.id)}
                                            >
                                                <Trash2 className="h-5 w-5" />
                                            </Button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>

                    {/* Cart Summary */}
                    <div className="border-t pt-4 space-y-4">
                        <div className="flex justify-between text-xl font-bold">
                            <span>{t('cart.total')}</span>
                            <span>{formatPrice(getTotalPrice(), currency)}</span>
                        </div>
                        
                        <div className="flex gap-4">
                            <Button
                                className="flex-1"
                                size="lg"
                                onClick={() => alert(t('cart.proceedingToCheckout'))}
                            >
                                {t('cart.checkout')}
                            </Button>
                            <Button
                                variant="outline"
                                size="lg"
                                className="text-red-500 hover:text-red-700 hover:bg-red-50"
                                onClick={clearCart}
                            >
                                <Trash2 className="h-5 w-5 mr-2" />
                                {t('cart.clearCart')}
                            </Button>
                        </div>
                    </div>
                </>
            )}
        </div>
    );
};

export default Cart;