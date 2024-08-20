import { useSelector } from "react-redux";
import { RootState } from "../Toolkits/store";
import { useMemo } from "react";

export const useSelectedCarts = () => {
  const { selectItem, carts } = useSelector(
    (state: RootState) => state.cartSlice
  );
  return useMemo(() => {
    return carts.filter((cartItem) => selectItem.includes(cartItem._id));
  }, [selectItem, carts]);
};
