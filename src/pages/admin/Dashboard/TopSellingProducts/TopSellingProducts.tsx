import moment from "moment";
import { useEffect, useMemo, useState } from "react";
import dashboardService from "../../../../services/admin/dashboard.service";
import { ITopSellingProduct } from "../../../../types/admin/dashboard";
import TitleDashboard from "../../../../components/Common/Admin/TitleDashboard/TitleDashboard";
import Chart from "react-google-charts";
import PickerWithType from "../PickerWithType/PickerWithType";

const TopSellingProducts = () => {
  const [topSellingProduct, setTopSellingProduct] = useState<
    ITopSellingProduct[]
  >([]);
  const fetchData = async (type: string, time: number, year: number) => {
    try {
      const res = await dashboardService.getTopSellingProduct(
        type,
        time,
        year,
        "7,9"
      );
      if (res?.data) {
        setTopSellingProduct(res.data);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const data = useMemo(() => {
    return [
      ["Sản phẩm", "Số lượng"],
      ...(topSellingProduct.map((item) => {
        return [item.productName.slice(0, 30) + "...", item.totalQuantity];
      }) || []),
    ];
  }, [topSellingProduct]);

  useEffect(() => {
    fetchData(
      "week",
      Number(moment().format("WW")),
      Number(moment().format("YYYY"))
    );
  }, []);
  const options = {
    colors: ["#fe385c"],
    chartArea: {
      left: "8%",
      top: "6%",
      height: "80%",
      width: "88%",
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
    bars: "horizontal",
  };
  const onChangeTime = (type: string, time: string) => {
    const year = moment(time, "DD-MM-YYYY").year();
    let timeFomart;
    if (type == "week") {
      timeFomart = moment(time, "DD-MM-YYYY").week();
    } else if (type == "month") {
      timeFomart = moment(time, "DD-MM-YYYY").month() + 1;
    } else {
      timeFomart = moment(time, "DD-MM-YYYY").year();
    }
    fetchData(type, timeFomart, year);
  };
  return (
    <>
      <div className="flex items-center justify-between">
        <TitleDashboard
          title="Phân tích hàng hoá"
          subtitle="Tổng quan về số lượng bán hàng hoá"
        />
        <div>
          <PickerWithType onChange={onChangeTime} />
        </div>
      </div>
      <div className="flex gap-10 mt-8">
        <div className="flex-grow">
          <h2 className="font-semibold">Top sản phẩm bán chạy</h2>
          <div>
            {topSellingProduct.length > 0 ? (
              <Chart
                chartType="Bar"
                width="100%"
                height="400px"
                data={data}
                options={options}
              />
            ) : (
              <p>Chưa có dữ liệu...</p>
            )}
          </div>
        </div>
        <div className="border" />
        <div className="w-1/3">
          <h2 className="font-semibold text-xl">Top sản phẩm bán chạy</h2>
          <div className="">
            {topSellingProduct.map((item, index) => (
              <div
                key={index}
                className="font-semibold text-content border-b pb-4"
              >
                <p className="text-title text-lg my-1">{item.totalQuantity}</p>
                <p>
                  {item.productName} <span className="font-light"></span>
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
};

export default TopSellingProducts;
