import { configureStore } from "@reduxjs/toolkit";
import userSlice from "./userSlice";
import cartSlice from "./cartSlice";
import productCheckout from "./productChecoutSlice";

const store = configureStore({
  reducer: {
    userSlice,
    cartSlice,
    productCheckout,
  },
});
export default store;

export type RootState = ReturnType<typeof store.getState>;
