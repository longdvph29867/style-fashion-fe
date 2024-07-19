import CartListItem from "./CartListItem";
import TotalOrder from "./TotalOrder";
import { RootState } from "../../Toolkits/store";
import { useDispatch, useSelector } from "react-redux";
import cartService from "../../services/cartService";
import { debounce, hiddenSpinner, showSpinner } from "../../util/util";
import { deleteProductCart, setQuantityCart } from "../../Toolkits/cartSlice";
import { useEffect } from "react";

const CartList = () => {
  const dispatch = useDispatch();
  const carts = useSelector((state: RootState) => state.cartSlice.carts);
  const user = useSelector((state: RootState) => state.userSlice.userInfo);

  useEffect(() => {
    if (carts.length == 0) {
      showSpinner();
    } else {
      hiddenSpinner();
    }
  }, [carts]);

  const handleUpdateItemProductCart = debounce(
    (idItemCart: string, quantity: number) => {
      if (user) {
        showSpinner();
        cartService
          .updateCart(user?.id, idItemCart, quantity)
          .then(() => dispatch(setQuantityCart({ idItemCart, quantity })))
          .finally(() => {
            hiddenSpinner();
          });
      }
    },
    500
  );

  const handleDelete = (idItemCart: string) => {
    if (user) {
      showSpinner();
      cartService
        .deleteCartItem("666eaa54b5ee1db4f34bb02c", idItemCart)
        .then(() => dispatch(deleteProductCart({ idItemCart })))
        .finally(() => {
          hiddenSpinner();
        });
    }
  };

  return (
    <div className="my-20">
      <div className="mt-14 sm:mt-20 container">
        <div className="">
          {/* Title */}
          <div className="max-w-2xl">
            <h2 className="text-3xl xl:text-4xl font-semibold">Giỏ hàng</h2>
          </div>
        </div>
      </div>
      <div className="w-full lg:flex justify-between container mt-16">
        <div className="shrink">
          {carts.map((cart) => (
            <CartListItem
              key={cart._id}
              onDelete={handleDelete}
              productCart={cart}
              updateItem={handleUpdateItemProductCart}
            />
          ))}
        </div>
        <div className="flex-shrink-0 border-t lg:border-t-0 lg:border-l border-slate-200 my-10 lg:my-0 lg:mx-10 xl:lg:mx-14 2xl:mx-16 w-80"  />
        <TotalOrder productCart={carts} />
      </div>
    </div>
  );
};

export default CartList;
