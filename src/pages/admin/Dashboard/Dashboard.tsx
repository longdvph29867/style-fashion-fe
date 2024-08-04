import { Divider } from "antd";
import OrderStatus from "./OrderStatus/OrderStatus";
import TitleDashboard from "../../../components/Common/Admin/TitleDashboard/TitleDashboard";
import Line from "../../../components/Line/Line";

const Dashboard = () => {
  return (
    <>
      <div className="p-6 space-y-10">
        <OrderStatus />
        <Line />
        <TitleDashboard
          title="Phân tích bán hàng"
          subtitle="Tổng quan về doanh thu bán hàng"
        />
        <div className="flex gap-10 mt-8">
          <div className="flex-grow">
            <h2 className="font-semibold">Doanh số</h2>
            <div>
              <img
                src="https://gitiho.com/caches/p_medium_large//images/article/photos/132082/image_b%C4%91hh_3.jpg"
                alt=""
              />
            </div>
          </div>
          <div className="border" />
          <div className="w-1/3">
            <div className="grid grid-cols-2">
              <div className="font-semibold text-gray-600">
                <p>Lượt truy cập</p>
                <p className="text-black text-xl my-1">0</p>
                <p>Vs hôm qua 0,00%</p>
              </div>
              <div className="font-semibold text-gray-600">
                <p>Lượt truy cập</p>
                <p className="text-black text-xl my-1">0</p>
                <p>Vs hôm qua 0,00%</p>
              </div>
            </div>
            <Divider />
            <div className="grid grid-cols-2">
              <div className="font-semibold text-gray-600">
                <p>Lượt truy cập</p>
                <p className="text-black text-xl my-1">0</p>
                <p>Vs hôm qua 0,00%</p>
              </div>
              <div className="font-semibold text-gray-600">
                <p>Lượt truy cập</p>
                <p className="text-black text-xl my-1">0</p>
                <p>Vs hôm qua 0,00%</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Dashboard;
