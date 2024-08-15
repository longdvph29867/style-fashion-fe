import { configureStore } from "@reduxjs/toolkit";
import userSlice from "./userSlice";
import checkoutSlice from "./checkoutSlice";

const store = configureStore({
  reducer: {
    userSlice,
    checkoutSlice,
  },
});
export default store;

export type RootState = ReturnType<typeof store.getState>;
