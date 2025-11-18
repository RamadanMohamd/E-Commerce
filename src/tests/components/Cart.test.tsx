import React from 'react';
import { describe, it, expect, beforeEach, vi } from 'vitest';
import { render, screen, act } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import Cart from '@/components/Cart';
import { useCartStore } from '@/store/cartStore';

vi.mock('@/hooks/useTranslation', () => ({
  useTranslation: () => ({
    t: (key: string) => {
      const translations: Record<string, string> = {
        'cart.title': 'Shopping Cart',
        'cart.emptyMessage': 'Your cart is empty',
        'cart.checkout': 'Checkout',
        'cart.clearCart': 'Clear Cart',
        'cart.total': 'Total',
        'cart.proceedingToCheckout': 'Proceeding to checkout...',
        'products.color': 'Color',
        'products.size': 'Size',
      };
      return translations[key] || key;
    },
  }),
}));

describe('Cart Page Component', () => {
  beforeEach(() => {
    const { clearCart } = useCartStore.getState();
    clearCart();
  });

  it('should render cart page with title', () => {
    render(<Cart />);
    
    expect(screen.getByText('Shopping Cart')).toBeInTheDocument();
  });

  it('should show empty cart message when no items', () => {
    render(<Cart />);
    
    expect(screen.getByText('Your cart is empty')).toBeInTheDocument();
    
    expect(screen.queryByText('Checkout')).not.toBeInTheDocument();
    expect(screen.queryByText('Clear Cart')).not.toBeInTheDocument();
  });

  it('should display shopping bag icon when empty', () => {
    const { container } = render(<Cart />);
    
    const icon = container.querySelector('svg');
    expect(icon).toBeInTheDocument();
  });

  it('should display cart items with all details', () => {
    act(() => {
      const { addItem } = useCartStore.getState();
      addItem({
        productId: '1',
        variantId: '1',
        productName: 'Red Sneakers',
        productImage: 'sneakers.jpg',
        color: 'Red',
        size: '42',
        price: 120,
        salePrice: 100,
        quantity: 2,
      });
    });

    render(<Cart />);
    
    expect(screen.getByText('Red Sneakers')).toBeInTheDocument();
    expect(screen.getByText(/Color.*Red/i)).toBeInTheDocument();
    expect(screen.getByText(/Size.*42/i)).toBeInTheDocument();
    expect(screen.getByText('2')).toBeInTheDocument();
  });

  it('should display product image with correct src and alt', () => {
    act(() => {
      const { addItem } = useCartStore.getState();
      addItem({
        productId: '1',
        variantId: '1',
        productName: 'Test Product',
        productImage: 'https://example.com/product.jpg',
        color: 'blue',
        size: 'M',
        price: 100,
        salePrice: 80,
        quantity: 1,
      });
    });

    render(<Cart />);
    
    const image = screen.getByAltText('Test Product');
    expect(image).toBeInTheDocument();
    expect(image).toHaveAttribute('src', 'https://example.com/product.jpg');
  });

  it('should show both original and sale price', () => {
    act(() => {
      const { clearCart, addItem } = useCartStore.getState();
      clearCart();
      addItem({
        productId: '1',
        variantId: '1',
        productName: 'Test Product',
        productImage: 'test.jpg',
        color: 'red',
        size: 'M',
        price: 100,
        salePrice: 80,
        quantity: 1,
      });
    });

    render(<Cart />);
    
    // Check that both prices appear (original strikethrough and sale price)
    const priceElements = screen.getAllByText((content, element) => {
      return element?.textContent === '£100.00';
    });
    expect(priceElements.length).toBeGreaterThan(0);
    
    const salePriceElements = screen.getAllByText((content, element) => {
      return element?.textContent === '£80.00';
    });
    expect(salePriceElements.length).toBeGreaterThan(0);
  });

  it('should only show sale price when no discount', () => {
    act(() => {
      const { addItem } = useCartStore.getState();
      addItem({
        productId: '1',
        variantId: '1',
        productName: 'Test Product',
        productImage: 'test.jpg',
        color: 'red',
        size: 'M',
        price: 80,
        salePrice: 80,
        quantity: 1,
      });
    });

    render(<Cart />);
    
    // Should only show one price
    const prices = screen.getAllByText('£80.00');
    expect(prices.length).toBe(2); // One for item, one for total
  });

  it('should increase quantity when plus button clicked', async () => {
    const user = userEvent.setup();
    
    act(() => {
      const { addItem } = useCartStore.getState();
      addItem({
        productId: '1',
        variantId: '1',
        productName: 'Test Product',
        productImage: 'test.jpg',
        color: 'red',
        size: 'M',
        price: 100,
        salePrice: 80,
        quantity: 1,
      });
    });

    const { rerender } = render(<Cart />);
    
    const buttons = screen.getAllByRole('button');
    const plusButton = buttons.find(btn => btn.querySelector('svg.lucide-plus'));
    if (plusButton) {
      await user.click(plusButton);
    }
    
    rerender(<Cart />);
    
    const { items } = useCartStore.getState();
    expect(items[0].quantity).toBe(2);
  });

  it('should decrease quantity when minus button clicked', async () => {
    const user = userEvent.setup();
    
    act(() => {
      const { addItem } = useCartStore.getState();
      addItem({
        productId: '1',
        variantId: '1',
        productName: 'Test Product',
        productImage: 'test.jpg',
        color: 'red',
        size: 'M',
        price: 100,
        salePrice: 80,
        quantity: 3,
      });
    });

    const { rerender } = render(<Cart />);
    
    const buttons = screen.getAllByRole('button');
    const minusButton = buttons.find(btn => btn.querySelector('svg.lucide-minus'));
    if (minusButton) {
      await user.click(minusButton);
    }
    
    rerender(<Cart />);
    
    const { items } = useCartStore.getState();
    expect(items[0].quantity).toBe(2);
  });

  it('should remove item when quantity becomes 0', async () => {
    const user = userEvent.setup();
    
    act(() => {
      const { addItem } = useCartStore.getState();
      addItem({
        productId: '1',
        variantId: '1',
        productName: 'Test Product',
        productImage: 'test.jpg',
        color: 'red',
        size: 'M',
        price: 100,
        salePrice: 80,
        quantity: 1,
      });
    });

    const { rerender } = render(<Cart />);
    
    expect(screen.getByText('Test Product')).toBeInTheDocument();
    
    const buttons = screen.getAllByRole('button');
    const minusButton = buttons.find(btn => btn.querySelector('svg.lucide-minus'));
    if (minusButton) {
      await user.click(minusButton);
    }
    
    rerender(<Cart />);
    
    expect(screen.queryByText('Test Product')).not.toBeInTheDocument();
    expect(screen.getByText('Your cart is empty')).toBeInTheDocument();
  });

  it('should remove item when trash button clicked', async () => {
    const user = userEvent.setup();
    
    act(() => {
      const { addItem } = useCartStore.getState();
      addItem({
        productId: '1',
        variantId: '1',
        productName: 'Test Product',
        productImage: 'test.jpg',
        color: 'red',
        size: 'M',
        price: 100,
        salePrice: 80,
        quantity: 2,
      });
    });

    const { rerender } = render(<Cart />);
    
    expect(screen.getByText('Test Product')).toBeInTheDocument();
    
    // Find trash button
    const buttons = screen.getAllByRole('button');
    const trashButton = buttons.find(btn => btn.querySelector('svg.lucide-trash-2'));
    if (trashButton) {
      await user.click(trashButton);
    }
    
    rerender(<Cart />);
    
    expect(screen.queryByText('Test Product')).not.toBeInTheDocument();
  });

  it('should calculate and display correct total', () => {
    act(() => {
      const { clearCart, addItem } = useCartStore.getState();
      clearCart();
      addItem({
        productId: '1',
        variantId: '1',
        productName: 'Product 1',
        productImage: 'test1.jpg',
        color: 'red',
        size: 'M',
        price: 100,
        salePrice: 80,
        quantity: 2,
      });
      addItem({
        productId: '2',
        variantId: '2',
        productName: 'Product 2',
        productImage: 'test2.jpg',
        color: 'blue',
        size: 'L',
        price: 60,
        salePrice: 50,
        quantity: 1,
      });
    });

    render(<Cart />);
    
    expect(screen.getByText('Total')).toBeInTheDocument();
    
    const { getTotalPrice } = useCartStore.getState();
    const total = getTotalPrice();
    expect(total).toBe(210);
  });

  it('should show checkout button when items exist', () => {
    act(() => {
      const { addItem } = useCartStore.getState();
      addItem({
        productId: '1',
        variantId: '1',
        productName: 'Test Product',
        productImage: 'test.jpg',
        color: 'red',
        size: 'M',
        price: 100,
        salePrice: 80,
        quantity: 1,
      });
    });

    render(<Cart />);
    
    expect(screen.getByText('Checkout')).toBeInTheDocument();
  });

  it('should show clear cart button when items exist', () => {
    act(() => {
      const { addItem } = useCartStore.getState();
      addItem({
        productId: '1',
        variantId: '1',
        productName: 'Test Product',
        productImage: 'test.jpg',
        color: 'red',
        size: 'M',
        price: 100,
        salePrice: 80,
        quantity: 1,
      });
    });

    render(<Cart />);
    
    expect(screen.getByText('Clear Cart')).toBeInTheDocument();
  });

  it('should clear all items when clear cart button clicked', async () => {
    const user = userEvent.setup();
    
    act(() => {
      const { addItem } = useCartStore.getState();
      addItem({
        productId: '1',
        variantId: '1',
        productName: 'Product 1',
        productImage: 'test1.jpg',
        color: 'red',
        size: 'M',
        price: 100,
        salePrice: 80,
        quantity: 1,
      });
      addItem({
        productId: '2',
        variantId: '2',
        productName: 'Product 2',
        productImage: 'test2.jpg',
        color: 'blue',
        size: 'L',
        price: 60,
        salePrice: 50,
        quantity: 1,
      });
    });

    const { rerender } = render(<Cart />);
    
    expect(screen.getByText('Product 1')).toBeInTheDocument();
    expect(screen.getByText('Product 2')).toBeInTheDocument();
    
    const clearButton = screen.getByText('Clear Cart');
    await user.click(clearButton);
    
    rerender(<Cart />);
    
    expect(screen.queryByText('Product 1')).not.toBeInTheDocument();
    expect(screen.queryByText('Product 2')).not.toBeInTheDocument();
    expect(screen.getByText('Your cart is empty')).toBeInTheDocument();
  });

  it('should display multiple items correctly', () => {
    act(() => {
      const { addItem } = useCartStore.getState();
      addItem({
        productId: '1',
        variantId: '1',
        productName: 'Product 1',
        productImage: 'test1.jpg',
        color: 'red',
        size: 'M',
        price: 100,
        salePrice: 80,
        quantity: 1,
      });
      addItem({
        productId: '2',
        variantId: '2',
        productName: 'Product 2',
        productImage: 'test2.jpg',
        color: 'blue',
        size: 'L',
        price: 60,
        salePrice: 50,
        quantity: 2,
      });
      addItem({
        productId: '3',
        variantId: '3',
        productName: 'Product 3',
        productImage: 'test3.jpg',
        color: 'green',
        size: 'S',
        price: 40,
        salePrice: 30,
        quantity: 1,
      });
    });

    render(<Cart />);
    
    expect(screen.getByText('Product 1')).toBeInTheDocument();
    expect(screen.getByText('Product 2')).toBeInTheDocument();
    expect(screen.getByText('Product 3')).toBeInTheDocument();
  });

  it('should update total when item quantity changes', async () => {
    const user = userEvent.setup();
    
    act(() => {
      const { clearCart, addItem } = useCartStore.getState();
      clearCart();
      addItem({
        productId: '1',
        variantId: '1',
        productName: 'Test Product',
        productImage: 'test.jpg',
        color: 'red',
        size: 'M',
        price: 100,
        salePrice: 50,
        quantity: 1,
      });
    });

    // Verify initial total is 50
    expect(useCartStore.getState().getTotalPrice()).toBe(50);

    const { rerender } = render(<Cart />);
    
    const buttons = screen.getAllByRole('button');
    const plusButton = buttons.find(btn => btn.querySelector('svg.lucide-plus'));
    if (plusButton) {
      await user.click(plusButton);
    }
    
    rerender(<Cart />);
    
    // After increasing quantity, total should be £100.00
    expect(useCartStore.getState().getTotalPrice()).toBe(100);
  });
});
