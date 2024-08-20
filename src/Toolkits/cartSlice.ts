import { createSlice } from "@reduxjs/toolkit";
import { ICart } from "../types/cart";

const initialState: { selectItem: string[]; carts: ICart[] } = {
  selectItem: [],
  carts: [],
};

const checkoutSlice = createSlice({
  name: "carts",
  initialState,
  reducers: {
    selectProduct: (state, action) => {
      state.selectItem = action.payload;
    },
    setCart: (state, action) => {
      state.carts = action.payload;
    },
  },
});

export const { selectProduct, setCart } = checkoutSlice.actions;
export default checkoutSlice.reducer;
