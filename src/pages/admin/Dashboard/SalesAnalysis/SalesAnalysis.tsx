import { FC } from "react";
import { Divider } from "antd";
import TitleDashboard from "../../../../components/Common/Admin/TitleDashboard/TitleDashboard";
import { Chart } from "react-google-charts";

const SalesAnalysis: FC = () => {
  const data = [
    ["Month", "Sales", "Đơn hàng"],
    ["Jan", 1000, 400],
    ["Feb", 1170, 460],
    ["Mar", 660, 1120],
    // ["Apr", 1030, 540],
    // ["May", 850, 300],
    // ["Jun", 950, 700],
    // ["Jul", 1200, 900],
    // ["Aug", 1300, 1000],
    // ["Sep", 900, 600],
    ["Oct", 1100, 750],
    ["Nov", 1250, 800],
    ["Dec", 1500, 950],
  ];
  const options = {
    // vAxis: { title: "Amount" },
    // hAxis: { title: "Month" },
    colors: ["#fe385c"],
    chartArea: {
      left: "8%",
      top: "6%",
      height: "80%",
      width: "90%",
    },
    seriesType: "bars",
    bar: { groupWidth: "30%" },
    annotations: {
      alwaysOutside: true,
      textStyle: {
        fontSize: 12,
        color: "#000",
        auraColor: "none",
      },
    },
    tooltip: {
      trigger: "none",
    },
    series: { 1: { type: "line" } }, // Makes the third series (Profit) a line chart
  };
  return (
    <>
      <TitleDashboard
        title="Phân tích bán hàng"
        subtitle="Tổng quan về doanh thu bán hàng"
      />
      <div className="flex gap-10 mt-8">
        <div className="flex-grow">
          <h2 className="font-semibold">Doanh số</h2>
          <div>
            <Chart
              chartType="ComboChart"
              width="100%"
              height="400px"
              data={data}
              options={options}
            />
          </div>
        </div>
        <div className="border" />
        <div className="w-1/3">
          <div className="grid grid-cols-2">
            <div className="font-semibold text-content">
              <p>Lượt truy cập</p>
              <p className="text-title text-xl my-1">0</p>
              <p>Vs hôm qua 0,00%</p>
            </div>
            <div className="font-semibold text-content">
              <p>Lượt truy cập</p>
              <p className="text-title text-xl my-1">0</p>
              <p>Vs hôm qua 0,00%</p>
            </div>
          </div>
          <Divider />
          <div className="grid grid-cols-2">
            <div className="font-semibold text-content">
              <p>Lượt truy cập</p>
              <p className="text-title text-xl my-1">0</p>
              <p>Vs hôm qua 0,00%</p>
            </div>
            <div className="font-semibold text-content">
              <p>Lượt truy cập</p>
              <p className="text-title text-xl my-1">0</p>
              <p>Vs hôm qua 0,00%</p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default SalesAnalysis;
