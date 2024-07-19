import { ProductCartType } from "../../types/cart";
import { useState } from "react";
import { formartCurrency } from "../../util/util";

type Props = {
  productCart: ProductCartType;
  updateItem: (productId: string, quantity: number) => void;
  onDelete: (productId: string) => void;
};

const CartListItem = ({ productCart, updateItem, onDelete }: Props) => {
  const [quantity, setQuantity] = useState(productCart.quantity);

  const increaseQuantity = () => {
    const newQuantity = quantity + 1;
    setQuantity(newQuantity);
    updateItem(productCart._id, newQuantity);
  };

  const decreaseQuantity = () => {
    const newQuantity = quantity - 1;
    setQuantity(newQuantity);
    updateItem(productCart._id, newQuantity);
  };

  return (
    <div className="relative flex py-8 sm:py-10 xl:py-2 first:pt-0 last:pb-0">
      <div className="relative flex-shrink-0 overflow-hidden rounded-xl">
        <img
          alt="Rey Nylon Backpack"
          loading="lazy"
          decoding="async"
          data-nimg="fill"
          className="object-contain object-center w-20 sm:w-[120px]"
          src={productCart.attribute.image}
        />
        <a className="absolute inset-0" href="/product-detail" />
      </div>
      <div className="flex flex-col justify-between ml-3 sm:ml-6 grow">
        <div className="flex justify-between items-center gap-3 sm:gap-10">
          <div className="">
            <h3 className="text-base font-semibold">
              <a href="/product-detail">{productCart.product.name}</a>
            </h3>
            <div className="mt-1.5 sm:mt-2.5 flex text-sm text-[#334155]">
              <div className="flex items-center space-x-1.5">
                <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none">
                  <path
                    d="M7.01 18.0001L3 13.9901C1.66 12.6501 1.66 11.32 3 9.98004L9.68 3.30005L17.03 10.6501C17.4 11.0201 17.4 11.6201 17.03 11.9901L11.01 18.0101C9.69 19.3301 8.35 19.3301 7.01 18.0001Z"
                    stroke="currentColor"
                    strokeWidth="1.5"
                    strokeMiterlimit={10}
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  <path
                    d="M8.35 1.94995L9.69 3.28992"
                    stroke="currentColor"
                    strokeWidth="1.5"
                    strokeMiterlimit={10}
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  <path
                    d="M2.07 11.92L17.19 11.26"
                    stroke="currentColor"
                    strokeWidth="1.5"
                    strokeMiterlimit={10}
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  <path
                    d="M3 22H16"
                    stroke="currentColor"
                    strokeWidth="1.5"
                    strokeMiterlimit={10}
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  <path
                    d="M18.85 15C18.85 15 17 17.01 17 18.24C17 19.26 17.83 20.09 18.85 20.09C19.87 20.09 20.7 19.26 20.7 18.24C20.7 17.01 18.85 15 18.85 15Z"
                    stroke="currentColor"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  ></path>
                </svg>
                <span>{productCart.attribute.name}</span>
              </div>
            </div>
            <div className="mt-3">
              <div className="flex items-center border-2 border-[#ff385c] rounded-lg py-1 px-2 md:py-1.5 md:px-2.5 text-sm font-medium w-max">
                <span className="text-[#ff385c] !leading-none ">
                  {formartCurrency(productCart.attribute.price)}
                </span>
              </div>
            </div>
          </div>
          <div className="flex flex-col sm:flex-row justify-between sm:w-52 shrink-0">
            <div className="relative text-center">
              <div className="relative z-10 flex items-center justify-center space-x-5 nc-NcInputNumber">
                <div className="flex items-center justify-between w-[104px]">
                  <button
                    onClick={decreaseQuantity}
                    className="flex items-center justify-center w-8 h-8 bg-white border rounded-full border-neutral-400 dark:border-neutral-500 focus:outline-none hover:border-neutral-700 dark:hover:border-neutral-400 disabled:hover:border-neutral-400 dark:disabled:hover:border-neutral-500 disabled:opacity-50 disabled:cursor-default"
                    type="button"
                    disabled={quantity === 1}
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 24 24"
                      fill="currentColor"
                      aria-hidden="true"
                      className="w-4 h-4"
                    >
                      <path
                        fillRule="evenodd"
                        d="M3.75 12a.75.75 0 01.75-.75h15a.75.75 0 010 1.5h-15a.75.75 0 01-.75-.75z"
                        clipRule="evenodd"
                      />
                    </svg>
                  </button>
                  <span className="flex-1 block leading-none text-center select-none">
                    {quantity}
                  </span>
                  <button
                    onClick={increaseQuantity}
                    className="flex items-center justify-center w-8 h-8 bg-white border rounded-full border-neutral-400 dark:border-neutral-500 focus:outline-none hover:border-neutral-700 dark:hover:border-neutral-400 disabled:hover:border-neutral-400 dark:disabled:hover:border-neutral-500 disabled:opacity-50 disabled:cursor-default"
                    type="button"
                    disabled={quantity === productCart.attribute.stock}
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 24 24"
                      fill="currentColor"
                      aria-hidden="true"
                      className="w-4 h-4"
                    >
                      <path
                        fillRule="evenodd"
                        d="M12 3.75a.75.75 0 01.75.75v6.75h6.75a.75.75 0 010 1.5h-6.75v6.75a.75.75 0 01-1.5 0v-6.75H4.5a.75.75 0 010-1.5h6.75V4.5a.75.75 0 01.75-.75z"
                        clipRule="evenodd"
                      />
                    </svg>
                  </button>
                </div>
              </div>
            </div>
            <div className="mt-10 justify-end sm:mt-0">
              <button
                onClick={() => onDelete(productCart._id)}
                className="relative z-10 flex items-center font-medium text-[#0284C7] hover:text-primary-500 text-sm"
              >
                <span>Remove</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CartListItem;
