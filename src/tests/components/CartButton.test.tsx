import React from 'react';
import { describe, it, expect, beforeEach, vi } from 'vitest';
import { render, screen, waitFor, act } from '@testing-library/react';
import { CartButton } from '@/components/header/CartButton';
import { useCartStore } from '@/store/cartStore';

vi.mock('@/components/CartMenu', () => ({
  CartMenu: ({ children }: { children: React.ReactNode }) => (
    <div data-testid="cart-menu-wrapper">{children}</div>
  ),
}));

describe('CartButton Component', () => {
  beforeEach(() => {
    const { clearCart } = useCartStore.getState();
    clearCart();
  });

  it('should render cart button with icon', () => {
    render(<CartButton />);
    
    const button = screen.getByRole('button', { name: /shopping cart/i });
    expect(button).toBeInTheDocument();
    expect(button).toHaveAttribute('data-testid', 'cart-button');
  });

  it('should not show badge when cart is empty', () => {
    render(<CartButton />);
    
    const badge = screen.queryByText('0');
    expect(badge).not.toBeInTheDocument();
  });

  it('should show correct item count in badge', () => {
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

    render(<CartButton />);
    
    const badge = screen.getByText('2');
    expect(badge).toBeInTheDocument();
  });

  it('should show "99+" when item count exceeds 99', () => {
    const { addItem } = useCartStore.getState();
    
    // Add item with quantity > 99
    addItem({
      productId: '1',
      variantId: '1',
      productName: 'Test Product',
      productImage: 'test.jpg',
      color: 'red',
      size: 'M',
      price: 100,
      salePrice: 80,
      quantity: 100,
    });

    render(<CartButton />);
    
    const badge = screen.getByText('99+');
    expect(badge).toBeInTheDocument();
  });

  it('should update badge count when items are added', () => {
    const { rerender } = render(<CartButton />);
    
    // Initially empty
    expect(screen.queryByText('1')).not.toBeInTheDocument();
    
    // Add item
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
    
    rerender(<CartButton />);
    
    const badge = screen.getByText('1');
    expect(badge).toBeInTheDocument();
  });

  it('should update badge count when items are removed', () => {
    const { addItem } = useCartStore.getState();
    
    // Add two items
    const item1 = addItem({
      productId: '1',
      variantId: '1',
      productName: 'Test Product 1',
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
      productName: 'Test Product 2',
      productImage: 'test2.jpg',
      color: 'blue',
      size: 'L',
      price: 100,
      salePrice: 80,
      quantity: 1,
    });

    const { rerender } = render(<CartButton />);
    
    expect(screen.getByText('2')).toBeInTheDocument();
    
    act(() => {
      const { items, removeItem } = useCartStore.getState();
      const firstItemId = items[0].id;
      removeItem(firstItemId);
    });
    
    rerender(<CartButton />);
        expect(screen.getByText('1')).toBeInTheDocument();
  });

  it('should hide badge when cart is cleared', () => {
    const { addItem, clearCart } = useCartStore.getState();
    
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

    const { rerender } = render(<CartButton />);
    
    // Badge should be visible
    expect(screen.getByText('1')).toBeInTheDocument();
    
    // Clear cart
    act(() => {
      clearCart();
    });
    rerender(<CartButton />);
    
    // Badge should be hidden
    expect(screen.queryByText('1')).not.toBeInTheDocument();
  });

  it('should apply animate-ring class when items are added', async () => {
    const { addItem } = useCartStore.getState();
    
    const { rerender } = render(<CartButton />);
    
    // Add item
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
    
    rerender(<CartButton />);
    
    const badge = screen.getByText('1');
    expect(badge.className).toContain('animate-ring');
    
    // Animation should remove after timeout
    await waitFor(() => {
      expect(badge.className).not.toContain('animate-ring');
    }, { timeout: 700 });
  });

  it('should sum quantities from multiple items', () => {
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
      quantity: 3,
    });
    
    addItem({
      productId: '2',
      variantId: '2',
      productName: 'Product 2',
      productImage: 'test2.jpg',
      color: 'blue',
      size: 'L',
      price: 100,
      salePrice: 80,
      quantity: 2,
    });

    render(<CartButton />);
    
    const badge = screen.getByText('5');
    expect(badge).toBeInTheDocument();
  });

  it('should have proper accessibility attributes', () => {
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

    render(<CartButton />);
    
    const button = screen.getByRole('button');
    expect(button).toHaveAttribute('aria-label', 'Shopping cart with 3 items');
  });

  it('should apply custom className prop', () => {
    render(<CartButton className="custom-class" />);
    
    const button = screen.getByTestId('cart-button');
    expect(button.className).toContain('custom-class');
  });

  it('should have focus styles removed', () => {
    render(<CartButton />);
    
    const button = screen.getByTestId('cart-button');
    expect(button.className).toContain('focus:outline-none');
    expect(button.className).toContain('focus:ring-0');
    expect(button.className).toContain('border-0');
  });
});
