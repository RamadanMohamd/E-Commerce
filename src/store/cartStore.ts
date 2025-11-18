import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export interface CartItem {
  id: string; 
  productId: string;
  variantId: string; // ID of the selected product variant
  productName: string;
  productImage: string; // Image URL for the selected color variant
  color: string;
  size: string;
  price: number;
  salePrice: number;
  quantity: number;
}

interface CartState {
  items: CartItem[];
  addItem: (item: Omit<CartItem, 'id'>) => void;
  removeItem: (id: string) => void;
  updateQuantity: (id: string, quantity: number) => void;
  clearCart: () => void;
  getTotalItems: () => number;
  getTotalPrice: () => number;
}

export const useCartStore = create<CartState>()(
  persist(
    (set, get) => ({
      items: [],

      addItem: (item) => {
        const items = get().items;
        const id = `${item.productId}-${item.color}-${item.size}`;
        
        const existingItemIndex = items.findIndex(
          (i) => i.id === id
        );

        if (existingItemIndex > -1) {
          const updatedItems = [...items];
          updatedItems[existingItemIndex].quantity += item.quantity;
          set({ items: updatedItems });
        } else {
          set({ items: [...items, { ...item, id }] });
        }
      },

      removeItem: (id) => {
        set({ items: get().items.filter((item) => item.id !== id) });
      },

      updateQuantity: (id, quantity) => {
        if (quantity <= 0) {
          get().removeItem(id);
          return;
        }
        
        const items = get().items;
        const updatedItems = items.map((item) =>
          item.id === id ? { ...item, quantity } : item
        );
        set({ items: updatedItems });
      },

      clearCart: () => {
        set({ items: [] });
      },

      getTotalItems: () => {
        return get().items.reduce((total, item) => total + item.quantity, 0);
      },

      getTotalPrice: () => {
        return get().items.reduce(
          (total, item) => total + item.salePrice * item.quantity,
          0
        );
      },
    }),
    {
      name: 'cart-storage',
    }
  )
);
