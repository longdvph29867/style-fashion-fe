import CartListItem from "../../components/Carts/CartListItem";
import TotalOrder from "../../components/Carts/TotalOrder";
import { RootState } from "../../Toolkits/store";
import { useDispatch, useSelector } from "react-redux";
import cartService from "../../services/cartService";
import { debounce, hiddenSpinner, showSpinner } from "../../util/util";
import { deleteProductCart, setQuantityCart } from "../../Toolkits/cartSlice";
import cartEmpty from "../../assets/cart-empty.svg";
import { Link } from "react-router-dom";

const CartList = () => {
  const dispatch = useDispatch();
  const carts = useSelector((state: RootState) => state.cartSlice.carts);
  const user = useSelector((state: RootState) => state.userSlice.userInfo);

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
          <div className="flex items-center gap-2 mt-4">
            <Link to={"/"} className="hover:text-slate-800 text-gray-400">
              Trang chủ
            </Link>
            <span>/</span>
            <span className="text-slate-800 font-semibold">Giỏ hàng</span>
          </div>
        </div>
      </div>
      <div className="w-full lg:flex justify-between container mt-16">
        <div className="lg:w-[80%]">
          {carts.map((cart) => (
            <CartListItem
              key={cart._id}
              onDelete={handleDelete}
              productCart={cart}
              updateItem={handleUpdateItemProductCart}
            />
          ))}
          {carts.length === 0 && (
            <div className="text-center">
              <img className="mx-auto" src={cartEmpty} alt="" width={200} />
              <span className="font-medium italic">
                Chưa có sản phẩm nào trong giỏ hàng. Thêm ít nhất 1 sản phẩm để
                tiến hành thanh toán
              </span>
            </div>
          )}
        </div>
        <div className="border-t lg:border-t-0 lg:border-l border-slate-200 my-10 lg:my-0 lg:mx-10 xl:lg:mx-14 2xl:mx-16" />
        <TotalOrder productCart={carts} />
      </div>
    </div>
  );
};

export default CartList;
