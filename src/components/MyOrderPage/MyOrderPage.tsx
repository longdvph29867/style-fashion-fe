import React from "react";
import ItemMyOrder from "./ItemMyOrder";

type Props = {};

const MyOrderPage = (props: Props) => {
  return (
    <div className="">
      <h2 className="text-2xl sm:text-3xl lg:text-4xl font-semibold">
        Lịch Sử Đơn Hàng
      </h2>
      <div className="mt-10 border-[1px] border-slate-200 rounded-t-[10px]">
        <div className="p-[32px] flex justify-between bg-slate-50 border-b-[1px] border-slate-200">
          <div className="">
            <div className="mb-1">
              <span className="text-lg font-semibold">#WU3746HGG12</span>
            </div>
            <div>
              <span className="text-slate-500 mr-2">Aug 8, 2023</span>
              <span className="text-[#0EA5E9]">Delivered</span>
            </div>
          </div>
          <div className="">
            <button className="flex items-center justify-center rounded-full border-slate-300 bg-white py-3 px-6 text-sm hover:bg-gray-100 font-medium text-slate-700">
              Xem đơn hàng
            </button>
          </div>
        </div>
        {/* <!-- order --> */}
        <div className="">
          <ItemMyOrder />
          <ItemMyOrder />
          <ItemMyOrder />
          <ItemMyOrder />
        </div>
      </div>
    </div>
  );
};

export default MyOrderPage;
