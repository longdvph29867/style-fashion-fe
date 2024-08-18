import CartListItem from "../../components/Carts/CartListItem";
import TotalOrder from "../../components/Carts/TotalOrder";
import { RootState } from "../../Toolkits/store";
import { useDispatch, useSelector } from "react-redux";
import cartService from "../../services/cartService";
import { debounce } from "../../util/util";
import cartEmpty from "../../assets/cart-empty.svg";
import { Link } from "react-router-dom";
import { localUserService } from "../../services/localService";
import Checkbox from "../../components/Checkbox.tsx/Checkbox";
import { message } from "antd";
import { selectProduct } from "../../Toolkits/checkoutSlice";
import { ChangeEvent } from "react";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

const CartList = () => {
  const dispatch = useDispatch();
  const selectedProduct = useSelector(
    (state: RootState) => state.checkoutSlice.products
  );
  const queryClient = useQueryClient();
  const userId = localUserService.get()?.id;
  const { data } = useQuery({
    queryKey: ["carts"],
    queryFn: () => cartService.getCartByUserId(userId!).then((res) => res.data),
    refetchInterval: 3 * 60 * 1000,
    enabled: !!userId,
  });

  const mutationUpdate = useMutation({
    mutationFn: ({ id, quantity }: { id: string; quantity: number }) =>
      cartService.updateCart(id, quantity),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["carts"] });
    },
    onError: (err) => {
      message.error(err.message);
    },
  });

  const mutationDelete = useMutation({
    mutationFn: (id: string) => cartService.deleteCartItem(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["carts"] });
    },
    onError: (err) => {
      message.error(err.message);
    },
  });

  const handleUpdateItemProductCart = debounce(
    (id: string, quantity: number) => {
      mutationUpdate.mutate({ id, quantity });
    },
    500
  );

  const handleDelete = (idItemCart: string) => {
    mutationDelete.mutate(idItemCart);
  };

  const handleSelectProduct = (e: ChangeEvent<HTMLInputElement>) => {
    const idProductCart = e.target.value;
    if (!data) {
      return;
    }
    const productCart = data.find((c) => c._id === idProductCart);
    if (selectedProduct.some((product) => product._id === idProductCart)) {
      dispatch(
        selectProduct(
          selectedProduct.filter((product) => product._id !== idProductCart)
        )
      );
    } else {
      dispatch(selectProduct([...selectedProduct, productCart]));
    }
  };
  console.log(data);

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
          {data?.map((cart) => (
            <div key={cart._id} className="flex items-center gap-5">
              <Checkbox
                value={cart._id}
                onChange={handleSelectProduct}
                name="product-cart"
                isChecked={selectedProduct.some(
                  (product) => product._id === cart._id
                )}
                disabled={cart.variant === null || cart.variant.stock === 0}
              />
              <CartListItem
                key={cart._id}
                onDelete={handleDelete}
                productCart={cart}
                updateItem={handleUpdateItemProductCart}
              />
            </div>
          ))}
          {!data ||
            (data?.length === 0 && (
              <div className="text-center">
                <img className="mx-auto" src={cartEmpty} alt="" width={200} />
                <span className="font-medium italic">
                  Chưa có sản phẩm nào trong giỏ hàng. Thêm ít nhất 1 sản phẩm
                  để tiến hành thanh toán
                </span>
              </div>
            ))}
        </div>
        <div className="border-t lg:border-t-0 lg:border-l border-slate-200 my-10 lg:my-0 lg:mx-10 xl:lg:mx-14 2xl:mx-16" />
        <TotalOrder selectedProduct={selectedProduct} />
      </div>
    </div>
  );
};

export default CartList;
