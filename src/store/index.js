import { configureStore } from "@reduxjs/toolkit";
import {
  cartReducer,
  addProductToCart,
  removeProductFromCart,
  addQuantityToProduct,
  removeQuantityFromProduct,
  emptyCart,
} from "./slices/cartSlice";
import { loadCart, saveCart } from "./localStorage";

const storedCart = loadCart();
const store = configureStore({
  reducer: {
    cart: cartReducer,
  },
  preloadedState: {
    cart: storedCart,
  },
});

store.subscribe(() => {
  const state = store.getState();
  saveCart(state.cart);
});

export { store };
export {
  addProductToCart,
  removeProductFromCart,
  addQuantityToProduct,
  removeQuantityFromProduct,
  emptyCart,
};
