import { createSlice } from "@reduxjs/toolkit";
import { ICart } from "../types/cart";

const initialState: { products: ICart[] } = { products: [] };

const checkoutSlice = createSlice({
  name: "product-checkout",
  initialState,
  reducers: {
    selectProduct: (state, action) => {
      state.products = action.payload;
    },
  },
});

export const { selectProduct } = checkoutSlice.actions;
export default checkoutSlice.reducer;
