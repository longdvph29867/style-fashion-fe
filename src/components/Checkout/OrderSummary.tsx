import List_Order from "./ListOrder";
import { formartCurrency } from "../../util/util";
import { memo } from "react";
import { ICart } from "../../types/cart";
import { HiOutlineTicket, HiOutlineChevronRight } from "react-icons/hi2";

type Props = {
  productCheckout: ICart[];
  shippingfee: number;
  subTotal: number;
  onOpenVoucher: () => void;
  confirmOrder: () => void;
  voucherName: string | undefined;
  discountAmount: number;
};
const OrderSummary = ({
  productCheckout,
  shippingfee,
  subTotal,
  onOpenVoucher,
  confirmOrder,
  voucherName,
  discountAmount,
}: Props) => {
  return (
    <div className="w-full lg:w-[36%]">
      <h3 className="text-lg font-semibold">Tóm Tắt Đơn Hàng</h3>
      {/* List Product Order */}
      <List_Order productCheckout={productCheckout} />
      {/* Discount code */}
      <div className="mt-10 pt-6 text-sm text-slate-500 border-t border-slate-200/70 flex justify-between">
        <div className="flex items-center gap-2">
          <HiOutlineTicket className="text-neutral-900" fontSize={24} />
          <label
            className="font-medium text-neutral-900 text-lg leading-none"
            data-nc-id="Label"
          >
            Mã giảm giá
          </label>
        </div>
        <div className="flex mt-1.5">
          <button
            className="text-neutral-500 hover:text-neutral-900 duration-200 font-medium text-sm flex justify-center items-center transition-colors"
            onClick={onOpenVoucher}
          >
            Chọn voucher
            <HiOutlineChevronRight />
          </button>
        </div>
      </div>
      {voucherName && (
        <span className="text-green-500">Đã áp dụng voucher {voucherName}</span>
      )}
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
          -{formartCurrency(discountAmount)}
        </span>
      </div>
      {/* Order total */}
      <div className="flex justify-between font-semibold text-slate-900 text-base pt-4">
        <span>Tổng tiền đơn hàng</span>
        <span>{formartCurrency(subTotal + shippingfee - discountAmount)}</span>
      </div>
      <button
        onClick={confirmOrder}
        className="relative h-auto inline-flex items-center justify-center rounded-full transition-colors text-sm sm:text-base font-medium py-3 px-4 sm:py-3.5 sm:px-6 disabled:bg-opacity-90 bg-primary2  hover:bg-[#cf3350] text-slate-50 shadow-xl mt-8 w-full focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-6000"
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
