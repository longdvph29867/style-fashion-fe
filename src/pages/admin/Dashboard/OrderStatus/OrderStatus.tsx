import { useEffect, useState } from "react";
import { IOrderStatus } from "../../../../types/admin/dashboard";
import dashboardService from "../../../../services/admin/dashboard.service";
import TitleDashboard from "../../../../components/Common/Admin/TitleDashboard/TitleDashboard";
import PickerWithType from "../PickerWithType/PickerWithType";
import moment from "moment";

const OrderStatus = () => {
  const [orderStatus, setOrderStatus] = useState<IOrderStatus[]>([]);

  const fetchData = async (type: string, time: number, year: number) => {
    try {
      const res = await dashboardService.getOrderByStatus(type, time, year);
      if (res?.data) {
        setOrderStatus(res.data);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const onChangeTime = (type: string, time: string) => {
    const year = moment(time, "DD-MM-YYYY").year();
    let timeFomart;
    if(type == "week") {
      timeFomart = moment(time, "DD-MM-YYYY").week();
    }
    else if(type == "month") {
      timeFomart = moment(time, "DD-MM-YYYY").month() + 1;
    }
    else {
      timeFomart = moment(time, "DD-MM-YYYY").year();
    }
    fetchData(type, timeFomart, year);
  };

  useEffect(() => {
    fetchData('week', Number(moment().format("WW")), Number(moment().format("YYYY")));
  }, []);

  return (
    <>
      
      <div className="flex items-center justify-between">
      <TitleDashboard
        title="Thống kê đơn hàng"
        subtitle="Thống kê theo trạng thái"
      />
        <div>
          <PickerWithType onChange={onChangeTime} />
        </div>
      </div>
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
