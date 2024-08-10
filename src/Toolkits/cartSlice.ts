import { createSlice } from "@reduxjs/toolkit";
import { ProductCartType } from "../types/cart";

const initialState: { carts: ProductCartType[] } = { carts: [] };

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    setCartAll: (state, action) => {
      state.carts = action.payload;
    },
    setQuantityCart: (state, action) => {
      const { idItemCart, quantity } = action.payload;
      const existingItem = state.carts.find((item) => item._id === idItemCart);
      if (existingItem) {
        existingItem.quantity = quantity;
      }
    },
    deleteProductCart: (state, action) => {
      const { idItemCart } = action.payload;
      state.carts = state.carts.filter((item) => item._id !== idItemCart);
    },
  },
});

export const { setCartAll, setQuantityCart, deleteProductCart } = cartSlice.actions;
export default cartSlice.reducer;
