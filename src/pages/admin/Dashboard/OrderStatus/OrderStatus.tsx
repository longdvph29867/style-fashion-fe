import { useEffect, useState } from "react";
import { IOrderStatus } from "../../../../types/admin/dashboard";
import dashboardService from "../../../../services/admin/dashboard.service";
import TitleDashboard from "../../../../components/Common/Admin/TitleDashboard/TitleDashboard";

const OrderStatus = () => {
  const [orderStatus, setOrderStatus] = useState<IOrderStatus[]>([]);

  const fetchData = async () => {
    try {
      const res = await dashboardService.getOrderByStatus("month", 7, 2024);
      if (res?.data) {
        setOrderStatus(res.data);
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <>
      <TitleDashboard
        title="Thống kê đơn hàng"
        subtitle="Thống kê theo trạng thái"
      />
      <div className="grid grid-cols-4 gap-10 mt-8">
        {orderStatus.map((item, index) => (
          <div key={index} className="text-center text-lg">
            <span className="text-primary font-semibold">{item.count}</span>
            <p className="font-medium text-base">{item.name}</p>
          </div>
        ))}
      </div>
    </>
  );
};

export default OrderStatus;
