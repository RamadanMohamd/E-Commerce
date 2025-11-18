import { describe, test, expect, beforeEach } from 'vitest';
import { useCartStore } from '../../store/cartStore';

describe('Cart Store - Unit Tests', () => {
  // Reset cart before each test
  beforeEach(() => {
    useCartStore.getState().clearCart();
  });

  describe('addItem', () => {
    test('should add item to empty cart', () => {
      const { addItem } = useCartStore.getState();

      addItem({
        productId: '1',
        variantId: 'v1',
        productName: 'Test Product',
        productImage: '/test.jpg',
        color: 'Red',
        size: 'M',
        price: 50,
        salePrice: 40,
        quantity: 1,
      });

      const items = useCartStore.getState().items;
      expect(items).toHaveLength(1);
      expect(items[0].productName).toBe('Test Product');
      expect(items[0].color).toBe('Red');
      expect(items[0].size).toBe('M');
      expect(items[0].quantity).toBe(1);
    });

    test('should add multiple different items to cart', () => {
      const { addItem } = useCartStore.getState();

      addItem({
        productId: '1',
        variantId: 'v1',
        productName: 'Product 1',
        productImage: '/test1.jpg',
        color: 'Red',
        size: 'M',
        price: 50,
        salePrice: 40,
        quantity: 1,
      });

      addItem({
        productId: '2',
        variantId: 'v2',
        productName: 'Product 2',
        productImage: '/test2.jpg',
        color: 'Blue',
        size: 'L',
        price: 60,
        salePrice: 50,
        quantity: 1,
      });

      const items = useCartStore.getState().items;
      expect(items).toHaveLength(2);
      expect(items[0].productName).toBe('Product 1');
      expect(items[1].productName).toBe('Product 2');
    });

    test('should add same product with different variants as separate items', () => {
      const { addItem } = useCartStore.getState();

      // Same product, different color
      addItem({
        productId: '1',
        variantId: 'v1',
        productName: 'T-Shirt',
        productImage: '/red.jpg',
        color: 'Red',
        size: 'M',
        price: 50,
        salePrice: 40,
        quantity: 1,
      });

      addItem({
        productId: '1',
        variantId: 'v2',
        productName: 'T-Shirt',
        productImage: '/blue.jpg',
        color: 'Blue',
        size: 'M',
        price: 50,
        salePrice: 40,
        quantity: 1,
      });

      const items = useCartStore.getState().items;
      expect(items).toHaveLength(2);
      expect(items[0].color).toBe('Red');
      expect(items[1].color).toBe('Blue');
    });

    test('should increase quantity when adding item with same product and variant', () => {
      const { addItem } = useCartStore.getState();

      addItem({
        productId: '1',
        variantId: 'v1',
        productName: 'Test Product',
        productImage: '/test.jpg',
        color: 'Red',
        size: 'M',
        price: 50,
        salePrice: 40,
        quantity: 1,
      });

      // Add same item again
      addItem({
        productId: '1',
        variantId: 'v1',
        productName: 'Test Product',
        productImage: '/test.jpg',
        color: 'Red',
        size: 'M',
        price: 50,
        salePrice: 40,
        quantity: 2,
      });

      const items = useCartStore.getState().items;
      expect(items).toHaveLength(1);
      expect(items[0].quantity).toBe(3); // 1 + 2
    });

    test('should add item with quantity greater than 1', () => {
      const { addItem } = useCartStore.getState();

      addItem({
        productId: '1',
        variantId: 'v1',
        productName: 'Test Product',
        productImage: '/test.jpg',
        color: 'Red',
        size: 'M',
        price: 50,
        salePrice: 40,
        quantity: 5,
      });

      const items = useCartStore.getState().items;
      expect(items).toHaveLength(1);
      expect(items[0].quantity).toBe(5);
    });

    test('should generate correct unique ID for items', () => {
      const { addItem } = useCartStore.getState();

      addItem({
        productId: '123',
        variantId: 'v1',
        productName: 'Test Product',
        productImage: '/test.jpg',
        color: 'Red',
        size: 'M',
        price: 50,
        salePrice: 40,
        quantity: 1,
      });

      const items = useCartStore.getState().items;
      expect(items[0].id).toBe('123-Red-M');
    });
  });

  describe('removeItem', () => {
    test('should remove item from cart', () => {
      const { addItem, removeItem } = useCartStore.getState();

      addItem({
        productId: '1',
        variantId: 'v1',
        productName: 'Test Product',
        productImage: '/test.jpg',
        color: 'Red',
        size: 'M',
        price: 50,
        salePrice: 40,
        quantity: 1,
      });

      const itemId = useCartStore.getState().items[0].id;
      removeItem(itemId);

      expect(useCartStore.getState().items).toHaveLength(0);
    });

    test('should only remove specified item and keep others', () => {
      const { addItem, removeItem } = useCartStore.getState();

      addItem({
        productId: '1',
        variantId: 'v1',
        productName: 'Product 1',
        productImage: '/test1.jpg',
        color: 'Red',
        size: 'M',
        price: 50,
        salePrice: 40,
        quantity: 1,
      });

      addItem({
        productId: '2',
        variantId: 'v2',
        productName: 'Product 2',
        productImage: '/test2.jpg',
        color: 'Blue',
        size: 'L',
        price: 60,
        salePrice: 50,
        quantity: 1,
      });

      const firstItemId = useCartStore.getState().items[0].id;
      removeItem(firstItemId);

      const items = useCartStore.getState().items;
      expect(items).toHaveLength(1);
      expect(items[0].productName).toBe('Product 2');
    });

    test('should handle removing non-existent item gracefully', () => {
      const { addItem, removeItem } = useCartStore.getState();

      addItem({
        productId: '1',
        variantId: 'v1',
        productName: 'Test Product',
        productImage: '/test.jpg',
        color: 'Red',
        size: 'M',
        price: 50,
        salePrice: 40,
        quantity: 1,
      });

      removeItem('non-existent-id');

      const items = useCartStore.getState().items;
      expect(items).toHaveLength(1); // Item should still exist
    });
  });

  describe('updateQuantity', () => {
    test('should increase item quantity', () => {
      const { addItem, updateQuantity } = useCartStore.getState();

      addItem({
        productId: '1',
        variantId: 'v1',
        productName: 'Test Product',
        productImage: '/test.jpg',
        color: 'Red',
        size: 'M',
        price: 50,
        salePrice: 40,
        quantity: 1,
      });

      const itemId = useCartStore.getState().items[0].id;
      updateQuantity(itemId, 5);

      expect(useCartStore.getState().items[0].quantity).toBe(5);
    });

    test('should decrease item quantity', () => {
      const { addItem, updateQuantity } = useCartStore.getState();

      addItem({
        productId: '1',
        variantId: 'v1',
        productName: 'Test Product',
        productImage: '/test.jpg',
        color: 'Red',
        size: 'M',
        price: 50,
        salePrice: 40,
        quantity: 5,
      });

      const itemId = useCartStore.getState().items[0].id;
      updateQuantity(itemId, 2);

      expect(useCartStore.getState().items[0].quantity).toBe(2);
    });

    test('should remove item when quantity is set to 0', () => {
      const { addItem, updateQuantity } = useCartStore.getState();

      addItem({
        productId: '1',
        variantId: 'v1',
        productName: 'Test Product',
        productImage: '/test.jpg',
        color: 'Red',
        size: 'M',
        price: 50,
        salePrice: 40,
        quantity: 1,
      });

      const itemId = useCartStore.getState().items[0].id;
      updateQuantity(itemId, 0);

      expect(useCartStore.getState().items).toHaveLength(0);
    });

    test('should remove item when quantity is negative', () => {
      const { addItem, updateQuantity } = useCartStore.getState();

      addItem({
        productId: '1',
        variantId: 'v1',
        productName: 'Test Product',
        productImage: '/test.jpg',
        color: 'Red',
        size: 'M',
        price: 50,
        salePrice: 40,
        quantity: 1,
      });

      const itemId = useCartStore.getState().items[0].id;
      updateQuantity(itemId, -1);

      expect(useCartStore.getState().items).toHaveLength(0);
    });

    test('should only update specified item quantity', () => {
      const { addItem, updateQuantity } = useCartStore.getState();

      addItem({
        productId: '1',
        variantId: 'v1',
        productName: 'Product 1',
        productImage: '/test1.jpg',
        color: 'Red',
        size: 'M',
        price: 50,
        salePrice: 40,
        quantity: 1,
      });

      addItem({
        productId: '2',
        variantId: 'v2',
        productName: 'Product 2',
        productImage: '/test2.jpg',
        color: 'Blue',
        size: 'L',
        price: 60,
        salePrice: 50,
        quantity: 1,
      });

      const firstItemId = useCartStore.getState().items[0].id;
      updateQuantity(firstItemId, 10);

      const items = useCartStore.getState().items;
      expect(items[0].quantity).toBe(10);
      expect(items[1].quantity).toBe(1); // Should remain unchanged
    });
  });

  describe('clearCart', () => {
    test('should clear all items from cart', () => {
      const { addItem, clearCart } = useCartStore.getState();

      addItem({
        productId: '1',
        variantId: 'v1',
        productName: 'Product 1',
        productImage: '/test1.jpg',
        color: 'Red',
        size: 'M',
        price: 50,
        salePrice: 40,
        quantity: 1,
      });

      addItem({
        productId: '2',
        variantId: 'v2',
        productName: 'Product 2',
        productImage: '/test2.jpg',
        color: 'Blue',
        size: 'L',
        price: 60,
        salePrice: 50,
        quantity: 1,
      });

      clearCart();

      expect(useCartStore.getState().items).toHaveLength(0);
    });

    test('should handle clearing already empty cart', () => {
      const { clearCart } = useCartStore.getState();

      clearCart();

      expect(useCartStore.getState().items).toHaveLength(0);
    });
  });

  describe('getTotalItems', () => {
    test('should return 0 for empty cart', () => {
      const { getTotalItems } = useCartStore.getState();

      expect(getTotalItems()).toBe(0);
    });

    test('should return correct count for single item', () => {
      const { addItem, getTotalItems } = useCartStore.getState();

      addItem({
        productId: '1',
        variantId: 'v1',
        productName: 'Test Product',
        productImage: '/test.jpg',
        color: 'Red',
        size: 'M',
        price: 50,
        salePrice: 40,
        quantity: 3,
      });

      expect(getTotalItems()).toBe(3);
    });

    test('should sum quantities of multiple items', () => {
      const { addItem, getTotalItems } = useCartStore.getState();

      addItem({
        productId: '1',
        variantId: 'v1',
        productName: 'Product 1',
        productImage: '/test1.jpg',
        color: 'Red',
        size: 'M',
        price: 50,
        salePrice: 40,
        quantity: 2,
      });

      addItem({
        productId: '2',
        variantId: 'v2',
        productName: 'Product 2',
        productImage: '/test2.jpg',
        color: 'Blue',
        size: 'L',
        price: 60,
        salePrice: 50,
        quantity: 3,
      });

      expect(getTotalItems()).toBe(5); // 2 + 3
    });

    test('should update count after removing item', () => {
      const { addItem, removeItem, getTotalItems } = useCartStore.getState();

      addItem({
        productId: '1',
        variantId: 'v1',
        productName: 'Product 1',
        productImage: '/test1.jpg',
        color: 'Red',
        size: 'M',
        price: 50,
        salePrice: 40,
        quantity: 2,
      });

      addItem({
        productId: '2',
        variantId: 'v2',
        productName: 'Product 2',
        productImage: '/test2.jpg',
        color: 'Blue',
        size: 'L',
        price: 60,
        salePrice: 50,
        quantity: 3,
      });

      const firstItemId = useCartStore.getState().items[0].id;
      removeItem(firstItemId);

      expect(getTotalItems()).toBe(3);
    });
  });

  describe('getTotalPrice', () => {
    test('should return 0 for empty cart', () => {
      const { getTotalPrice } = useCartStore.getState();

      expect(getTotalPrice()).toBe(0);
    });

    test('should calculate price for single item', () => {
      const { addItem, getTotalPrice } = useCartStore.getState();

      addItem({
        productId: '1',
        variantId: 'v1',
        productName: 'Test Product',
        productImage: '/test.jpg',
        color: 'Red',
        size: 'M',
        price: 50,
        salePrice: 40,
        quantity: 1,
      });

      expect(getTotalPrice()).toBe(40); // Uses salePrice
    });

    test('should calculate total with quantity', () => {
      const { addItem, getTotalPrice } = useCartStore.getState();

      addItem({
        productId: '1',
        variantId: 'v1',
        productName: 'Test Product',
        productImage: '/test.jpg',
        color: 'Red',
        size: 'M',
        price: 50,
        salePrice: 40,
        quantity: 3,
      });

      expect(getTotalPrice()).toBe(120); // 40 * 3 (uses salePrice)
    });

    test('should sum prices of multiple items', () => {
      const { addItem, getTotalPrice } = useCartStore.getState();

      addItem({
        productId: '1',
        variantId: 'v1',
        productName: 'Product 1',
        productImage: '/test1.jpg',
        color: 'Red',
        size: 'M',
        price: 50,
        salePrice: 40,
        quantity: 2,
      });

      addItem({
        productId: '2',
        variantId: 'v2',
        productName: 'Product 2',
        productImage: '/test2.jpg',
        color: 'Blue',
        size: 'L',
        price: 30,
        salePrice: 25,
        quantity: 3,
      });

      expect(getTotalPrice()).toBe(155); // (40 * 2) + (25 * 3) = 155 (uses salePrice)
    });

    test('should update total after quantity change', () => {
      const { addItem, updateQuantity, getTotalPrice } = useCartStore.getState();

      addItem({
        productId: '1',
        variantId: 'v1',
        productName: 'Test Product',
        productImage: '/test.jpg',
        color: 'Red',
        size: 'M',
        price: 50,
        salePrice: 40,
        quantity: 2,
      });

      const itemId = useCartStore.getState().items[0].id;
      updateQuantity(itemId, 5);

      expect(getTotalPrice()).toBe(200); // 40 * 5 (uses salePrice)
    });

    test('should update total after removing item', () => {
      const { addItem, removeItem, getTotalPrice } = useCartStore.getState();

      addItem({
        productId: '1',
        variantId: 'v1',
        productName: 'Product 1',
        productImage: '/test1.jpg',
        color: 'Red',
        size: 'M',
        price: 50,
        salePrice: 40,
        quantity: 2,
      });

      addItem({
        productId: '2',
        variantId: 'v2',
        productName: 'Product 2',
        productImage: '/test2.jpg',
        color: 'Blue',
        size: 'L',
        price: 30,
        salePrice: 25,
        quantity: 3,
      });

      const firstItemId = useCartStore.getState().items[0].id;
      removeItem(firstItemId);

      expect(getTotalPrice()).toBe(75); // 25 * 3 (uses salePrice)
    });

    test('should calculate correctly with decimal prices', () => {
      const { addItem, getTotalPrice } = useCartStore.getState();

      addItem({
        productId: '1',
        variantId: 'v1',
        productName: 'Test Product',
        productImage: '/test.jpg',
        color: 'Red',
        size: 'M',
        price: 19.99,
        salePrice: 15.99,
        quantity: 3,
      });

      expect(getTotalPrice()).toBeCloseTo(47.97, 2); // 15.99 * 3 (uses salePrice)
    });
  });

  describe('Edge Cases and Complex Scenarios', () => {
    test('should handle adding, updating, and removing items in sequence', () => {
      const { addItem, updateQuantity, removeItem, getTotalItems, getTotalPrice } = useCartStore.getState();

      // Add items
      addItem({
        productId: '1',
        variantId: 'v1',
        productName: 'Product 1',
        productImage: '/test1.jpg',
        color: 'Red',
        size: 'M',
        price: 50,
        salePrice: 40,
        quantity: 2,
      });

      addItem({
        productId: '2',
        variantId: 'v2',
        productName: 'Product 2',
        productImage: '/test2.jpg',
        color: 'Blue',
        size: 'L',
        price: 30,
        salePrice: 25,
        quantity: 3,
      });

      expect(getTotalItems()).toBe(5);
      expect(getTotalPrice()).toBe(155); // (40 * 2) + (25 * 3) = 155 (uses salePrice)

      // Update quantity
      const firstItemId = useCartStore.getState().items[0].id;
      updateQuantity(firstItemId, 1);

      expect(getTotalItems()).toBe(4);
      expect(getTotalPrice()).toBe(115); // (40 * 1) + (25 * 3) = 115 (uses salePrice)

      // Remove item
      removeItem(firstItemId);

      expect(getTotalItems()).toBe(3);
      expect(getTotalPrice()).toBe(75); // 25 * 3 = 75 (uses salePrice)
    });

    test('should maintain cart state after multiple operations', () => {
      const { addItem, updateQuantity, clearCart } = useCartStore.getState();

      addItem({
        productId: '1',
        variantId: 'v1',
        productName: 'Product 1',
        productImage: '/test1.jpg',
        color: 'Red',
        size: 'M',
        price: 50,
        salePrice: 40,
        quantity: 1,
      });

      let items = useCartStore.getState().items;
      expect(items).toHaveLength(1);

      clearCart();
      expect(useCartStore.getState().items).toHaveLength(0);

      addItem({
        productId: '2',
        variantId: 'v2',
        productName: 'Product 2',
        productImage: '/test2.jpg',
        color: 'Blue',
        size: 'L',
        price: 60,
        salePrice: 50,
        quantity: 2,
      });

      expect(useCartStore.getState().items).toHaveLength(1);
      expect(useCartStore.getState().items[0].productName).toBe('Product 2');
    });
  });
});
