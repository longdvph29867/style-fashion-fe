import { memo } from "react";
import cashOnDelivery from "../../assets/img/cash-on-delivery.png";
import imgCheck from "../../assets/img/img-check.png";
import logoVnpayQr from "../../assets/img/Logo-VNPAY-QR-1.png";
import PaymentMethodSvg from "../../assets/svgs/PaymentMethodSvg";

type Props = {
  selectShippingMethod: (value: any) => void;
  shippingMethod: string;
};
const PaymentMethod = ({ selectShippingMethod, shippingMethod }: Props) => {
  return (
    <div className="scroll-mt-24">
      {/*  */}
      <div className="border border-slate-200 rounded-xl">
        <div className="p-6 flex flex-col sm:flex-row items-start">
          <span className="hidden sm:block">
            <PaymentMethodSvg />
          </span>
          <div className="sm:ml-8">
            <h3 className="text-slate-700 flex">
              <span className="uppercase tracking-tight">
                Phương thức thanh toán
              </span>
              <svg
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth="2.5"
                stroke="currentColor"
                className="w-5 h-5 ml-3 text-slate-900"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M4.5 12.75l6 6 9-13.5"
                />
              </svg>
            </h3>
          </div>
        </div>
        {/* method */}
        <div className="px-6 pb-6">
          <div className="grid grid-cols-2 gap-5">
            <label
              onClick={() => selectShippingMethod("COD")}
              className={`relative flex items-center justify-center p-3 border border-slate-700 rounded-xl overflow-hidden`}
            >
              <img
                className="w-16 h-16"
                src={cashOnDelivery}
                alt="cash-on-delivery"
              />
              <span className="pl-3">Thanh Toán khi nhận hàng</span>
              {shippingMethod === "COD" && (
                <img
                  className="absolute top-0 right-0 w-10"
                  src={imgCheck}
                  alt="img-check"
                />
              )}
            </label>
            <label
              onClick={() => selectShippingMethod("VNPAY")}
              className={`relative flex items-center justify-center p-3 border border-slate-700 rounded-xl overflow-hidden`}
            >
              <img className="" src={logoVnpayQr} alt="Logo-VNPAY-QR" />
              {shippingMethod === "VNPAY" && (
                <img
                  className="absolute top-0 right-0 w-10"
                  src={imgCheck}
                  alt="img-check"
                />
              )}
            </label>
          </div>
        </div>
      </div>
    </div>
  );
};

export default memo(PaymentMethod);
