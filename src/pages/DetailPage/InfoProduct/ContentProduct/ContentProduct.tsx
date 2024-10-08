import { ChangeEvent, useEffect, useRef, useState } from "react";
import { message, Rate } from "antd";
import {
  formartCurrency,
  hiddenSpinner,
  showSpinner,
} from "../../../../util/util";
import cartService from "../../../../services/cartService";
import { localUserService } from "../../../../services/localService";
import { IoRemoveOutline } from "react-icons/io5";
import Variant from "../../../../components/DetailComponent/Variant";
import { IProduct, IVariant } from "../../../../types/productType";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { AddCartType } from "../../../../types/cart";

type Props = {
  setCurrentImage: (value: string) => void;
  product: IProduct;
};

const ContentProduct = ({ setCurrentImage, product }: Props) => {
  const [variantSelected, setVariantSelected] = useState<IVariant | null>(null);
  const [quantity, setQuantity] = useState(1);
  const [price, setPrice] = useState<number[]>([]);
  const [showMaxQuantity, setShowMaxQuantity] = useState<boolean>(false);
  const userId = localUserService.get()?.id;
  const stockRef = useRef(0);
  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: (item: AddCartType) => cartService.addToCart(item),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["carts"] });
      message.success("Thêm sản phẩm thành công!");
    },
    onError: (err) => {
      message.error(err.message);
    },
  });

  useEffect(() => {
    if (product) {
      const totalStock = product?.variants.reduce(
        (total, item) => total + item.stock,
        0
      );
      stockRef.current = totalStock;
    }
  }, [product]);

  useEffect(() => {
    if (product) {
      const minPrice = Math.min(
        ...product.variants.map((varriant) => varriant.currentPrice)
      );
      const maxPrice = Math.max(
        ...product.variants.map((varriant) => varriant.currentPrice)
      );
      if (minPrice === maxPrice) {
        setPrice([minPrice]);
      } else {
        setPrice([minPrice, maxPrice]);
      }
    }
  }, [product]);

  const handleChangeInput = (e: ChangeEvent<HTMLInputElement>) => {
    const value = parseInt(e.target.value);
    if (!variantSelected) {
      message.error("Vui lòng chọn loại sản phẩm!");
      return;
    } else if (value < 0 || value > variantSelected.stock) {
      setShowMaxQuantity(true);
      setQuantity(1);
    } else {
      setShowMaxQuantity(false);
      setQuantity(value);
    }
  };

  const handleChangeQuantity = (value: number) => {
    if (!variantSelected) {
      message.error("Vui lòng chọn loại hàng!");
      return;
    } else if (quantity + value < 1) {
      return;
    } else if (quantity + value > variantSelected.stock && value > 0) {
      setShowMaxQuantity(true);
      return;
    }
    setShowMaxQuantity(false);
    setQuantity(quantity + value);
  };

  const handleAddToCart = async () => {
    console.log("add to cart");

    if (!variantSelected) {
      message.error("Vui lòng chọn loại sản phẩm!");
    } else if (showMaxQuantity) {
      return;
    } else if (!userId) {
      message.error("Vui lòng đăng nhập để thêm sản phẩm!");
    } else {
      showSpinner();
      mutation.mutate({
        user: userId,
        product: product.id,
        variant: variantSelected.id,
        quantity: quantity,
      });
      hiddenSpinner();
    }
  };

  const handleChangeVariant = (value: IVariant | null) => {
    if (showMaxQuantity) {
      setShowMaxQuantity(false);
    }
    setVariantSelected(value);
  };

  return (
    <div>
      <div>
        <h2 className="text-2xl font-semibold sm:text-3xl">{product?.name}</h2>
        <div className="flex items-center mt-5 space-x-4 sm:space-x-5">
          <div className="flex gap-2 items-center text-[#fe385c]">
            {variantSelected ? (
              <span className="text-[#fe385c] text-xl font-bold !leading-none">
                {formartCurrency(variantSelected.currentPrice)}
              </span>
            ) : (
              price.map((amount, index) => (
                <span
                  key={index}
                  className="text-[#fe385c] text-xl font-bold !leading-none flex gap-1"
                >
                  {index > 0 && <IoRemoveOutline />}
                  {formartCurrency(amount)}
                </span>
              ))
            )}
          </div>
          <div className="border-l h-7 border-slate-300" />
          <div className="flex items-center">
            <a href="#" className="flex items-center text-base font-medium">
              <div className="relative h-6">
                <Rate
                  className="text-sm"
                  disabled
                  defaultValue={product?.scoreReview}
                  count={5}
                />
              </div>
              <div className="ml-1.5 flex text-sm">
                <span>{product?.scoreReview}</span>
              </div>
            </a>
            <span className="hidden sm:block mx-2.5">·</span>
            <div className="items-center hidden text-sm sm:flex">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth="1.5"
                stroke="currentColor"
                aria-hidden="true"
                className="w-3.5 h-3.5"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M9.813 15.904L9 18.75l-.813-2.846a4.5 4.5 0 00-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 003.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 003.09 3.09L15.75 12l-2.846.813a4.5 4.5 0 00-3.09 3.09zM18.259 8.715L18 9.75l-.259-1.035a3.375 3.375 0 00-2.455-2.456L14.25 6l1.036-.259a3.375 3.375 0 002.455-2.456L18 2.25l.259 1.035a3.375 3.375 0 002.456 2.456L21.75 6l-1.035.259a3.375 3.375 0 00-2.456 2.456zM16.894 20.567L16.5 21.75l-.394-1.183a2.25 2.25 0 00-1.423-1.423L13.5 18.75l1.183-.394a2.25 2.25 0 001.423-1.423l.394-1.183.394 1.183a2.25 2.25 0 001.423 1.423l1.183.394-1.183.394a2.25 2.25 0 00-1.423 1.423z"
                ></path>
              </svg>
              <span className="ml-1 leading-none">Mới</span>
            </div>
          </div>
        </div>
      </div>
      {/* SELECT SIZE FROM ATTRIBUTES */}
      <div className="my-8 space-y-2">
        <div>
          <div className="font-semibold text-[#222]">Thuộc Tính:</div>
          <div className="">
            <Variant
              dataAttriubute={product?.attributes ?? []}
              dataVariant={product?.variants ?? []}
              setImage={setCurrentImage}
              setVariant={handleChangeVariant}
            />
          </div>
          <div className="mt-1 ml-3">
            <span className="text-sm text-[#222] italic">
              {variantSelected ? variantSelected.stock : stockRef.current} sản
              phẩm
            </span>
          </div>
        </div>
      </div>
      <div className="flex space-x-3.5">
        <div>
          <div className="relative flex items-center max-w-[8rem]">
            <button
              onClick={() => handleChangeQuantity(-1)}
              className="bg-gray-100 hover:bg-gray-200 border border-gray-300 rounded-s-lg p-3 h-11"
            >
              <svg
                className="w-3 h-3 text-gray-900"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 18 2"
              >
                <path
                  stroke="currentColor"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M1 1h16"
                />
              </svg>
            </button>
            <input
              type="number"
              className="bg-gray-50 border-x-0 border-y border-gray-300 h-11 font-medium text-center text-gray-900 text-base block w-full outline-none"
              required
              value={quantity}
              onChange={handleChangeInput}
            />
            <button
              onClick={() => handleChangeQuantity(1)}
              className="bg-gray-100 hover:bg-gray-200 border border-gray-300 rounded-e-lg p-3 h-11"
            >
              <svg
                className="w-3 h-3 text-gray-900"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 18 18"
              >
                <path
                  stroke="currentColor"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M9 1v16M1 9h16"
                />
              </svg>
            </button>
          </div>
          <p className="text-[#e03] italic text-xs mt-1 h-5">
            {showMaxQuantity && (
              <span>Chọn tối đa {variantSelected?.stock} sản phẩm</span>
            )}
          </p>
        </div>
        <button
          onClick={handleAddToCart}
          className=" inline-flex items-center justify-center rounded-lg text-sm sm:text-base font-medium py-2 px-3 sm:py-3.5 sm:px-6 bg-[#fc385c] hover:bg-[#f85d79] text-slate-50 shadow-xl h-11"
        >
          <svg
            className="hidden sm:inline-block w-5 h-5 mb-0.5"
            viewBox="0 0 9 9"
            fill="#fff"
          >
            <path d="M2.99997 4.125C3.20708 4.125 3.37497 4.29289 3.37497 4.5C3.37497 5.12132 3.87865 5.625 4.49997 5.625C5.12129 5.625 5.62497 5.12132 5.62497 4.5C5.62497 4.29289 5.79286 4.125 5.99997 4.125C6.20708 4.125 6.37497 4.29289 6.37497 4.5C6.37497 5.53553 5.5355 6.375 4.49997 6.375C3.46444 6.375 2.62497 5.53553 2.62497 4.5C2.62497 4.29289 2.79286 4.125 2.99997 4.125Z" />
            <path d="M6.37497 2.625H7.17663C7.76685 2.625 8.25672 3.08113 8.29877 3.66985L8.50924 6.61641C8.58677 7.70179 7.72715 8.625 6.63901 8.625H2.36094C1.2728 8.625 0.413174 7.70179 0.490701 6.61641L0.70117 3.66985C0.743222 3.08113 1.23309 2.625 1.82331 2.625H2.62497L2.62497 2.25C2.62497 1.21447 3.46444 0.375 4.49997 0.375C5.5355 0.375 6.37497 1.21447 6.37497 2.25V2.625ZM3.37497 2.625H5.62497V2.25C5.62497 1.62868 5.12129 1.125 4.49997 1.125C3.87865 1.125 3.37497 1.62868 3.37497 2.25L3.37497 2.625ZM1.82331 3.375C1.62657 3.375 1.46328 3.52704 1.44926 3.72328L1.2388 6.66985C1.19228 7.32107 1.70805 7.875 2.36094 7.875H6.63901C7.29189 7.875 7.80766 7.32107 7.76115 6.66985L7.55068 3.72328C7.53666 3.52704 7.37337 3.375 7.17663 3.375H1.82331Z" />
          </svg>
          <span className="ml-3">Thêm vào giỏ hàng</span>
        </button>
      </div>
    </div>
  );
};

export default ContentProduct;
