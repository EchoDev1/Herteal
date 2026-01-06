import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { CartItem } from '@/types/cart';
import { Product } from '@/types/product';
import { TAX_RATE, SHIPPING_COST, FREE_SHIPPING_THRESHOLD } from '@/lib/constants';

interface CartStore {
  items: CartItem[];
  addItem: (product: Product, size: string, color: string, quantity: number) => void;
  removeItem: (productId: string, size: string, color: string) => void;
  updateQuantity: (productId: string, size: string, color: string, quantity: number) => void;
  clearCart: () => void;
  itemCount: number;
  subtotal: number;
  tax: number;
  shipping: number;
  total: number;
}

export const useCartStore = create<CartStore>()(
  persist(
    (set, get) => ({
      items: [],

      addItem: (product, size, color, quantity) => {
        const items = get().items;
        const existingItemIndex = items.findIndex(
          (item) =>
            item.product.id === product.id &&
            item.selectedSize === size &&
            item.selectedColor === color
        );

        if (existingItemIndex > -1) {
          // Update quantity if item already exists
          const newItems = [...items];
          newItems[existingItemIndex].quantity += quantity;
          set({ items: newItems });
        } else {
          // Add new item
          set({
            items: [...items, { product, selectedSize: size, selectedColor: color, quantity }],
          });
        }
      },

      removeItem: (productId, size, color) => {
        set({
          items: get().items.filter(
            (item) =>
              !(
                item.product.id === productId &&
                item.selectedSize === size &&
                item.selectedColor === color
              )
          ),
        });
      },

      updateQuantity: (productId, size, color, quantity) => {
        if (quantity <= 0) {
          get().removeItem(productId, size, color);
          return;
        }

        const items = get().items;
        const itemIndex = items.findIndex(
          (item) =>
            item.product.id === productId &&
            item.selectedSize === size &&
            item.selectedColor === color
        );

        if (itemIndex > -1) {
          const newItems = [...items];
          newItems[itemIndex].quantity = quantity;
          set({ items: newItems });
        }
      },

      clearCart: () => {
        set({ items: [] });
      },

      get itemCount() {
        return get().items.reduce((total, item) => total + item.quantity, 0);
      },

      get subtotal() {
        return get().items.reduce(
          (total, item) => total + item.product.price * item.quantity,
          0
        );
      },

      get tax() {
        return get().subtotal * TAX_RATE;
      },

      get shipping() {
        const subtotal = get().subtotal;
        return subtotal >= FREE_SHIPPING_THRESHOLD ? 0 : SHIPPING_COST;
      },

      get total() {
        return get().subtotal + get().tax + get().shipping;
      },
    }),
    {
      name: 'herteal-cart',
    }
  )
);
