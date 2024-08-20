import { useMemo } from "react";
import { formartCurrency } from "../../util/util";
import { Link } from "react-router-dom";
import { useSelectedCarts } from "../../hooks";

const TotalOrder = () => {
  const selectedItem = useSelectedCarts();

  const total = useMemo<number>(() => {
    return selectedItem.reduce((accumulator, currentValue) => {
      return (
        accumulator + currentValue.quantity * currentValue.variant.currentPrice
      );
    }, 0);
  }, [selectedItem]);

  const handleLinkClick = (
    e: React.MouseEvent<HTMLAnchorElement, MouseEvent>
  ) => {
    if (selectedItem.length === 0) {
      e.preventDefault();
    }
  };

  return (
    <>
      <div className="sticky top-28">
        <h3 className="text-xl font-semibold">
          Thanh toán{" "}
          <span className="text-sm text-slate-500">
            ({selectedItem?.length ?? 0} sản phẩm)
          </span>
        </h3>
        <div className="text-sm mt-4 text-slate-800">
          <div className="flex justify-between font-semibold text-[#0F172A] pb-2 border-b border-gray-200 text-base">
            <span>Tổng tiền</span>
            <span>{formartCurrency(total)}</span>
          </div>
        </div>
        <div className="flex items-center mt-2 text-sm text-slate-500 dark:text-slate-400 pl-3">
          <ul className="list-disc">
            <li>
              Bạn có thể chọn mã giảm giá và phí ship sẽ được tính ở bước thanh
              toán tiếp theo.
            </li>
          </ul>
        </div>
        <Link
          onClick={handleLinkClick}
          className={`relative h-auto inline-flex items-center justify-center rounded-full transition-colors text-sm sm:text-base font-medium py-3 px-4 sm:py-3.5 sm:px-6 text-slate-50 shadow-xl mt-8 w-full ${
            selectedItem.length === 0
              ? "bg-[#ff385c]/50 cursor-no-drop"
              : "bg-[#ff385c]  hover:bg-[#cf3350]"
          }`}
          to="/checkout"
        >
          Thanh toán
        </Link>
      </div>
    </>
  );
};

export default TotalOrder;
