import { FC } from "react";
import OrderStatus from "./OrderStatus/OrderStatus";
import Line from "../../../components/Line/Line";
import SalesAnalysis from "./SalesAnalysis/SalesAnalysis";
// import TopSellingProducts from "./TopSellingProducts/TopSellingProducts";
import { Breadcrumb } from "antd";
import OrderList from "./OrderList/OrderList";

const Dashboard: FC = () => {
  return (
    <div className="space-y-10 min-w-[800px]">
      <Breadcrumb style={{ margin: "16px 0" }}>
        <Breadcrumb.Item>Trang chủ</Breadcrumb.Item>
      </Breadcrumb>
      <OrderStatus />
      <Line />
      <SalesAnalysis />
      <Line />
      {/* <TopSellingProducts /> */}
      <OrderList />
    </div>
  );
};

export default Dashboard;
