import { CartType } from "../../types/cartType";
import List_Order from "./ListOrder";
import { formartCurrency } from "../../util/util";
import { memo } from "react";
type Props = {
  productList: CartType | null;
  shippingfee: number;
  subTotal: number;
  confirmOrder: () => void;
};
const OrderSummary = ({
  productList,
  shippingfee,
  subTotal,
  confirmOrder,
}: Props) => {
  return (
    <div className="w-full lg:w-[36%]">
      <h3 className="text-lg font-semibold">Tóm Tắt Đơn Hàng</h3>
      {/* List Product Order */}
      <List_Order productList={productList} />
      {/* Discount code */}
      <div className="mt-10 pt-6 text-sm text-slate-500 border-t border-slate-200/70">
        <label
          className="font-medium text-neutral-900 text-sm"
          data-nc-id="Label"
        >
          Mã giảm giá
        </label>
        <div className="flex mt-1.5">
          <input
            className="block w-full border outline-none border-neutral-200 focus:ring focus:ring-[#bae6fd80] focus:border-[#7dd3fc] bg-white disabled:bg-neutral-200 dark:disabled:bg-neutral-800 rounded-2xl text-sm font-normal h-10 px-4 py-3 flex-1"
            type="text"
          />
          <button className="text-neutral-700 border border-neutral-200 hover:bg-neutral-100 rounded-2xl px-4 ml-3 font-medium text-sm bg-neutral-200/70 w-24 flex justify-center items-center transition-colors">
            Thêm
          </button>
        </div>
      </div>
      {/* Subtotal */}
      <div className="mt-4 flex justify-between py-2.5">
        <span className="text-sm text-slate-600">Tổng tiền hàng</span>
        <span className="font-semibold text-sm text-slate-900">
          {formartCurrency(subTotal)}
        </span>
      </div>
      {/* Shipping*/}
      <div className="flex justify-between py-2.5">
        <span className="text-sm text-slate-600">Phí vận chuyển</span>
        <span className="font-semibold text-sm text-slate-900">
          {formartCurrency(shippingfee)}
        </span>
      </div>

      <div className="flex justify-between py-2.5">
        <span className="text-sm text-slate-600">Voucher giảm giá</span>
        <span className="font-semibold text-sm text-slate-900">
          {formartCurrency(0)}
        </span>
      </div>
      {/* Order total */}
      <div className="flex justify-between font-semibold text-slate-900 text-base pt-4">
        <span>Tổng tiền đơn hàng</span>
        <span>{formartCurrency(subTotal + shippingfee)}</span>
      </div>
      <button
        onClick={confirmOrder}
        className="relative h-auto inline-flex items-center justify-center rounded-full transition-colors text-sm sm:text-base font-medium py-3 px-4 sm:py-3.5 sm:px-6 disabled:bg-opacity-90 bg-slate-900 hover:bg-slate-800 text-slate-50 shadow-xl mt-8 w-full focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-6000"
      >
        Xác nhận đơn hàng
      </button>
      <div className="mt-5 text-sm text-slate-500 flex items-center justify-center">
        <p className="block relative pl-5">
          <svg
            className="w-4 h-4 absolute -left-1 top-0.5"
            viewBox="0 0 24 24"
            fill="none"
          >
            <path
              d="M12 22C17.5 22 22 17.5 22 12C22 6.5 17.5 2 12 2C6.5 2 2 6.5 2 12C2 17.5 6.5 22 12 22Z"
              stroke="currentColor"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            <path
              d="M12 8V13"
              stroke="currentColor"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            <path
              d="M11.9945 16H12.0035"
              stroke="currentColor"
              strokeWidth={2}
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
          Tìm hiểu thêm về{" "}
          <a className="text-slate-900 underline font-medium">Thuế</a>{" "}
          <span>và</span>{" "}
          <a className="text-slate-900 underline font-medium">
            Thông tin Vận Chuyển
          </a>{" "}
        </p>
      </div>
    </div>
  );
};

export default memo(OrderSummary);
