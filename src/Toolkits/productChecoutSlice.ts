import { createSlice } from "@reduxjs/toolkit";
import { ProductCartType } from "../types/cart";

const initialState: { products: ProductCartType[] } = { products: [] };

const productCheckout = createSlice({
  name: "product-checkout",
  initialState,
  reducers: {
    selectProduct: (state, action) => {
      state.products = action.payload;
    },
    removeProduct: (state, action) => {
      const newState = state.products.filter((product) => product._id === action.payload);
      state.products = newState;
    },
  },
});

export const { selectProduct, removeProduct } = productCheckout.actions;
export default productCheckout.reducer;
