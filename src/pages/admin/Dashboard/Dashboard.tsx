import { FC } from "react";
import OrderStatus from "./OrderStatus/OrderStatus";
import Line from "../../../components/Line/Line";
import SalesAnalysis from "./SalesAnalysis/SalesAnalysis";
import TopSellingProducts from "./TopSellingProducts/TopSellingProducts";

const Dashboard: FC = () => {
  return (
    <div className="p-6 space-y-10">
      <OrderStatus />
      <Line />
      <SalesAnalysis />
      <Line />
      <TopSellingProducts/>
    </div>
  );
};

export default Dashboard;
