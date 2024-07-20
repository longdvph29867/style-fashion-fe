import { CartType } from "../../types/cartType";
import { formartCurrency } from "../../util/util";
import iconPlus from "../../assets/img/iconPlus.svg";
type Props = {
  productList: CartType | null;
};
const ListOrder = ({ productList }: Props) => {
  return (
    <div className="mt-8">
      {productList?.products_cart?.map((item) => (
        <div className="relative flex border-b last:border-0 border-[#e5e7eb] py-7 first:pt-0 last:pb-0">
          <div className="relative h-36 w-24 sm:w-28 flex-shrink-0 overflow-hidden rounded-xl bg-slate-100">
            <img
              className="h-full w-full object-contain object-center"
              src={item.product.thumbnail}
            />
          </div>
          <div className="ml-3 sm:ml-6 flex flex-1 flex-col">
            <div>
              <div className="flex justify-between">
                <div className="flex-[2]">
                  <h3 className="text-base font-semibold">
                    <a href="/product-detail" className="my-line-3">
                      {item.product.name}
                    </a>
                  </h3>
                  <div className="mt-1.5 sm:mt-2.5 flex text-sm text-slate-600">
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
                        />
                      </svg>
                      <span>{item.attribute.name}</span>
                    </div>
                    <span className="mx-4 border-l border-slate-600" />
                    <div className="flex items-center space-x-1.5">
                      <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none">
                        <path
                          d="M21 9V3H15"
                          stroke="currentColor"
                          strokeWidth="1.5"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                        <path
                          d="M3 15V21H9"
                          stroke="currentColor"
                          strokeWidth="1.5"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                        <path
                          d="M21 3L13.5 10.5"
                          stroke="currentColor"
                          strokeWidth="1.5"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                        <path
                          d="M10.5 13.5L3 21"
                          stroke="currentColor"
                          strokeWidth="1.5"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                      </svg>
                      <span>2XL</span>
                    </div>
                  </div>
                </div>
                <div className="hidden flex-1 sm:flex justify-end">
                  <div className="mt-0.5">
                    <div className="flex items-center border-2 border-green-500 rounded-lg py-1 px-2 md:py-1.5 md:px-2.5 text-sm font-medium">
                      <span className="text-green-500 !leading-none">
                        {formartCurrency(item.attribute.price)}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="flex mt-auto sm:pt-4 items-end justify-between text-sm">
              <div className=" text-center relative">
                <div className="flex items-center justify-between space-x-5 relative z-10">
                  <div className="flex items-center justify-between w-[104px] sm:w-28">
                    <button
                      className="w-8 h-8 rounded-full flex items-center justify-center border border-neutral-400 bg-white focus:outline-none hover:border-neutral-700 disabled:hover:border-neutral-400 disabled:opacity-50 disabled:cursor-default"
                      type="button"
                      disabled
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
                    <span className="select-none block flex-1 text-center leading-none">
                      {item.quantity}
                    </span>
                    <button
                      className="w-8 h-8 rounded-full flex items-center justify-center border border-neutral-400 bg-white focus:outline-none hover:border-neutral-700 disabled:hover:border-neutral-400 disabled:opacity-50 disabled:cursor-default"
                      type="button"
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
              <a href="#" className="relative z-10 flex items-center mt-3">
                <span className="font-medium text-[#0284c7] hover:text-[#0ea5e9] text-sm">
                  Remove
                </span>
              </a>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default ListOrder;
