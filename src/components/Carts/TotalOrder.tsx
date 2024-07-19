import { useMemo } from "react";
import { ProductsCart } from "../../types/cartType";
import { formartCurrency } from "../../util/util";
import { Link } from "react-router-dom";

type Props = {
  productCart: ProductsCart[];
};

const TotalOrder = ({ productCart }: Props) => {
  const total = useMemo<number>(() => {
    return productCart.reduce((accumulator, currentValue) => {
      accumulator += currentValue.quantity * currentValue.attribute.price;
      return accumulator;
    }, 0);
  }, [productCart]);

  return (
    <>
      <div className="sticky top-28">
        <h3 className="text-xl font-semibold">
          Thanh toán{" "}
          <span className="text-sm text-slate-500">
            ( {productCart.length} sản phẩm)
          </span>
        </h3>
        <div className="text-sm mt-4 text-slate-800">
          <div className="flex justify-between font-semibold text-[#0F172A] pb-2 border-b border-gray-200 text-base">
            <span>Tổng tiền</span>
            <span>{formartCurrency(total)}</span>
          </div>
        </div>
        <div className="flex items-center mt-2 text-sm text-slate-500 dark:text-slate-400">
          <ul className="list-disc">
            <li>Bạn có thể chọn mã giảm giá và  phí ship sẽ được tính ở bước thanh toán tiếp theo.</li>
          </ul>
        </div>
        <Link
          className="nc-Button relative h-auto inline-flex items-center justify-center rounded-full transition-colors text-sm sm:text-base font-medium py-3 px-4 sm:py-3.5 sm:px-6 ttnc-ButtonPrimary disabled:bg-opacity-90 bg-[#ff385c]  hover:bg-[#cf3350] text-slate-50  shadow-xl mt-8 w-full "
          to="/checkout"
        >
          Thanh toán
        </Link>
      </div>
    </>
  );
};

export default TotalOrder;
