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
      const idProductCart = action.payload;
      if (state.selectItem.includes(idProductCart)) {
        state.selectItem = state.selectItem.filter(
          (item) => item !== idProductCart
        );
      } else {
        state.selectItem.push(idProductCart);
      }
    },
    setCart: (state, action) => {
      state.carts = action.payload;
      // state.selectItem = state.selectItem.filter((item) =>
      //   state.carts.some((cartItem) => cartItem._id === item)
      // );
    },
  },
});

export const { selectProduct, setCart } = checkoutSlice.actions;
export default checkoutSlice.reducer;
