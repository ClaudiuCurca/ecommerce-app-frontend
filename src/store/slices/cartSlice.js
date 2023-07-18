import { createSlice } from "@reduxjs/toolkit";

const cartSlice = createSlice({
  name: "cart",
  initialState: [],
  reducers: {
    addProductToCart(state, action) {
      const { productId } = action.payload;
      const existingProduct = state.find(
        (item) => item.productId === productId
      );

      if (existingProduct) {
        existingProduct.productQuantity++;
      } else {
        state.push(action.payload);
      }
    },

    removeProductFromCart(state, action) {
      return state.filter((item) => item.productId !== action.payload);
    },

    addQuantityToProduct(state, action) {
      const productId = action.payload;
      const productToUpdate = state.find(
        (item) => item.productId === productId
      );
      if (productToUpdate.productQuantity < productToUpdate.productMaxCount) {
        productToUpdate.productQuantity++;
      }
    },

    removeQuantityFromProduct(state, action) {
      const productId = action.payload;
      const productToUpdate = state.find(
        (item) => item.productId === productId
      );
      if (productToUpdate.productQuantity > 1) {
        productToUpdate.productQuantity--;
      }
    },

    emptyCart(state, action) {
      return [];
    },
  },
});

export const {
  addProductToCart,
  removeProductFromCart,
  addQuantityToProduct,
  removeQuantityFromProduct,
  emptyCart,
} = cartSlice.actions;
export const cartReducer = cartSlice.reducer;
