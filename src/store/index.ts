import { ActionType, CartType } from '@/types/types';
import { create } from 'zustand';
import { persist } from 'zustand/middleware';
const INITIAL_STATE = {
  products: [],
  quantity: 0,
  totalPrice: 0,
};

export const useCartStore = create(
  persist<CartType & ActionType>(
    (set, get) => ({
      products: INITIAL_STATE.products,
      quantity: INITIAL_STATE.quantity,
      totalPrice: INITIAL_STATE.totalPrice,

      addToCart(item) {
        const products = get().products;
        const productInState = products.find(
          (product) =>
            product.title === item.title &&
            product.optionTitle === item.optionTitle
        );
        if (!productInState)
          set((state) => ({
            products: [...state.products, item],
            quantity: state.quantity + item.quantity,
            totalPrice: +state.totalPrice + +item.price,
          }));
        else {
          const updatetProducts = products.map((obj) =>
            (obj.title === productInState.title &&
            obj.optionTitle === productInState.optionTitle)
              ? {
                  ...obj,
                  quantity: item.quantity + obj.quantity,
                  price: +item.price + +obj.price,
                }
              : obj
          );
          set((state) => ({
            products: updatetProducts,
            quantity: state.quantity + item.quantity,
            totalPrice: +state.totalPrice + +item.price,
          }));
        }
      },
      removeFromCart(item) {
        set((state) => ({
          products: state.products.filter((product) => (product.optionTitle!==item.optionTitle)&&(product.title!==item.optionTitle)),
          quantity: state.quantity - item.quantity,
          totalPrice: state.totalPrice - +item.price,
        }));
      },
      clearCart() {
        set(() => ({
          products: [],
          quantity: 0,
          totalPrice: 0,
        }));
      },
    }),
    { name: 'cart', skipHydration: true }
  )
);
