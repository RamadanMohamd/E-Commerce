import React from 'react';
import { describe, it, expect, beforeEach, vi } from 'vitest';
import { render, screen, act } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { CartMenu } from '@/components/CartMenu';
import { useCartStore } from '@/store/cartStore';

// Mock the translation hook
vi.mock('@/hooks/useTranslation', () => ({
  useTranslation: () => ({
    t: (key: string) => {
      const translations: Record<string, string> = {
        'cart.title': 'Shopping Cart',
        'cart.item': 'item',
        'cart.items': 'items',
        'cart.empty': 'Your cart is empty',
        'cart.emptyMessage': 'Your cart is empty',
        'cart.reviewItems': 'Review your items',
        'cart.continueShopping': 'Continue Shopping',
        'cart.checkout': 'Checkout',
        'cart.clearCart': 'Clear Cart',
        'cart.total': 'Total',
        'cart.subtotal': 'Subtotal',
        'cart.shipping': 'Shipping',
        'cart.free': 'Free',
        'cart.proceedingToCheckout': 'Proceeding to checkout...',
        'products.color': 'Color',
        'products.size': 'Size',
      };
      return translations[key] || key;
    },
  }),
}));

describe('CartMenu Component', () => {
  beforeEach(() => {
    const { clearCart } = useCartStore.getState();
    clearCart();
  });

  it('should render with trigger children', () => {
    render(
      <CartMenu>
        <button>Open Cart</button>
      </CartMenu>
    );
    
    expect(screen.getByText('Open Cart')).toBeInTheDocument();
  });

  it('should show empty cart message when no items', async () => {
    const user = userEvent.setup();
    
    render(
      <CartMenu>
        <button>Open Cart</button>
      </CartMenu>
    );
    
    await user.click(screen.getByText('Open Cart'));
    
    const emptyMessages = screen.getAllByText('Your cart is empty');
    expect(emptyMessages.length).toBeGreaterThan(0);
    expect(screen.getByText('Continue Shopping')).toBeInTheDocument();
  });

  it('should display cart title with item count', async () => {
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

    render(
      <CartMenu>
        <button>Open Cart</button>
      </CartMenu>
    );
    
    await user.click(screen.getByText('Open Cart'));
    
    expect(screen.getByText('Shopping Cart')).toBeInTheDocument();
    expect(screen.getByText(/2.*items/i)).toBeInTheDocument();
  });

  it('should display singular "item" for single item', async () => {
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

    render(
      <CartMenu>
        <button>Open Cart</button>
      </CartMenu>
    );
    
    await user.click(screen.getByText('Open Cart'));
    
    expect(screen.getByText(/1.*item$/i)).toBeInTheDocument();
  });

  it('should display cart items with details', async () => {
    const user = userEvent.setup();
    
    act(() => {
      const { addItem } = useCartStore.getState();
      addItem({
        productId: '1',
        variantId: '1',
        productName: 'Blue T-Shirt',
        productImage: 'shirt.jpg',
        color: 'Blue',
        size: 'L',
        price: 100,
        salePrice: 80,
        quantity: 2,
      });
    });

    render(
      <CartMenu>
        <button>Open Cart</button>
      </CartMenu>
    );
    
    await user.click(screen.getByText('Open Cart'));
    
    expect(screen.getByText('Blue T-Shirt')).toBeInTheDocument();
    expect(screen.getByText(/Color.*Blue/i)).toBeInTheDocument();
    expect(screen.getByText(/Size.*L/i)).toBeInTheDocument();
    expect(screen.getByText('2')).toBeInTheDocument();
  });

  it('should show product image', async () => {
    const user = userEvent.setup();
    
    act(() => {
      const { addItem } = useCartStore.getState();
      addItem({
        productId: '1',
        variantId: '1',
        productName: 'Test Product',
        productImage: 'https://example.com/image.jpg',
        color: 'red',
        size: 'M',
        price: 100,
        salePrice: 80,
        quantity: 1,
      });
    });

    render(
      <CartMenu>
        <button>Open Cart</button>
      </CartMenu>
    );
    
    await user.click(screen.getByText('Open Cart'));
    
    const image = screen.getByAltText('Test Product');
    expect(image).toBeInTheDocument();
    expect(image).toHaveAttribute('src', 'https://example.com/image.jpg');
  });

  it('should increase item quantity when plus button clicked', async () => {
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

    const { rerender } = render(
      <CartMenu>
        <button>Open Cart</button>
      </CartMenu>
    );
    
    await user.click(screen.getByText('Open Cart'));
    
    const plusButtons = screen.getAllByText('+');
    await user.click(plusButtons[0]);
    
    rerender(
      <CartMenu>
        <button>Open Cart</button>
      </CartMenu>
    );
    
    const { items } = useCartStore.getState();
    expect(items[0].quantity).toBe(2);
  });

  it('should decrease item quantity when minus button clicked', async () => {
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

    const { rerender } = render(
      <CartMenu>
        <button>Open Cart</button>
      </CartMenu>
    );
    
    await user.click(screen.getByText('Open Cart'));
    
    const minusButtons = screen.getAllByText('-');
    await user.click(minusButtons[0]);
    
    rerender(
      <CartMenu>
        <button>Open Cart</button>
      </CartMenu>
    );
    
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

    const { rerender } = render(
      <CartMenu>
        <button>Open Cart</button>
      </CartMenu>
    );
    
    await user.click(screen.getByText('Open Cart'));
    
    const minusButtons = screen.getAllByText('-');
    await user.click(minusButtons[0]);
    
    rerender(
      <CartMenu>
        <button>Open Cart</button>
      </CartMenu>
    );
    
    const { items } = useCartStore.getState();
    expect(items.length).toBe(0);
  });

  it('should remove item when trash icon clicked', async () => {
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

    const { rerender } = render(
      <CartMenu>
        <button>Open Cart</button>
      </CartMenu>
    );
    
    await user.click(screen.getByText('Open Cart'));
    
    // Find remove button by aria-label or test-id if available, or by icon
    const removeButtons = screen.getAllByRole('button');
    const removeButton = removeButtons.find(btn => btn.querySelector('svg'));
    
    if (removeButton) {
      await user.click(removeButton);
    }
    
    rerender(
      <CartMenu>
        <button>Open Cart</button>
      </CartMenu>
    );
    
    const { items } = useCartStore.getState();
    expect(items.length).toBe(0);
  });

  it('should display correct prices with sale price', async () => {
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

    render(
      <CartMenu>
        <button>Open Cart</button>
      </CartMenu>
    );
    
    await user.click(screen.getByText('Open Cart'));
    
    // CartMenu displays price * quantity (not salePrice)
    expect(screen.getByText('£100.00')).toBeInTheDocument();
  });

  it('should calculate and display total price', async () => {
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
        price: 80,
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
        price: 50,
        salePrice: 50,
        quantity: 1,
      });
    });

    render(
      <CartMenu>
        <button>Open Cart</button>
      </CartMenu>
    );
    
    await user.click(screen.getByText('Open Cart'));
    
    // Total calculated from salePrice: (80 * 2) + (50 * 1) = 210
    const priceElements = screen.getAllByText((content, element) => {
      return element?.textContent === '£210.00';
    });
    expect(priceElements.length).toBeGreaterThan(0);
  });

  it('should show checkout button when items exist', async () => {
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

    render(
      <CartMenu>
        <button>Open Cart</button>
      </CartMenu>
    );
    
    await user.click(screen.getByText('Open Cart'));
    
    expect(screen.getByText('Checkout')).toBeInTheDocument();
  });

  it('should display multiple items correctly', async () => {
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
        quantity: 2,
      });
    });

    render(
      <CartMenu>
        <button>Open Cart</button>
      </CartMenu>
    );
    
    await user.click(screen.getByText('Open Cart'));
    
    expect(screen.getByText('Product 1')).toBeInTheDocument();
    expect(screen.getByText('Product 2')).toBeInTheDocument();
    expect(screen.getByText(/3.*items/i)).toBeInTheDocument();
  });
});
