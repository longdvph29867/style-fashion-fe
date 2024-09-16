import { FC, useEffect, useMemo, useState } from "react";
import { Skeleton } from "antd";
import TitleDashboard from "../../../../components/Common/Admin/TitleDashboard/TitleDashboard";
import { Chart } from "react-google-charts";
import { IOrderStatistic } from "../../../../types/admin/dashboard";
import dashboardService from "../../../../services/admin/dashboard.service";
import moment from "moment";
import { formartCurrency } from "../../../../util/util";
import PickerWithType from "../PickerWithType/PickerWithType";
const SalesAnalysis: FC = () => {
  const [orderStatistic, setOrderStatistic] = useState<IOrderStatistic[]>([]);
  const fetchData = async (type: string, time: number, year: number) => {
    try {
      const res = await dashboardService.getOrderStatistic(
        type,
        time,
        year,
        2
      );
      if (res?.data) {
        setOrderStatistic(res.data);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const data = useMemo(() => {
    return [
      ["Time", "Doanh số", "Đơn hàng"],
      ...(orderStatistic.map((item) => {
        return [
          moment(item.time).format(item.time.length != 7 ? "DD/MM" : "MM"),
          Number(item.totalAmount) / 1000,
          item.count,
        ];
      }) || []),
    ];
  }, [orderStatistic]);

  useEffect(() => {
    fetchData('week', Number(moment().format("WW")), Number(moment().format("YYYY")));
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
    tooltip: {
      trigger: "focus",
      isHtml: true,
    },
    // series: { 1: { type: "line" } },
    series: {
      0: { type: "bars" },
      1: {
        type: "line",
        targetAxisIndex: 1,
        lineWidth: 1,
        pointSize: 2,
        color: "#9370DB",
      },
    },
    vAxis: {
      format: "",
      gridlines: {
        count: 0,
        color: "#eee",
      },
    },
  };
  const onChangeTime = (type: string, time: string) => {
    const year = moment(time, "DD-MM-YYYY").year();
    let timeFomart;
    if (type == "week") {
      timeFomart = moment(time, "DD-MM-YYYY").week();
    }
    else if (type == "month") {
      timeFomart = moment(time, "DD-MM-YYYY").month() + 1;
    }
    else {
      timeFomart = moment(time, "DD-MM-YYYY").year();
    }
    fetchData(type, timeFomart, year);
  };
  return (
    <>
      <div className="flex items-center justify-between">
        <TitleDashboard
          title="Phân tích bán hàng"
          subtitle="Tổng quan về doanh thu bán hàng"
        />
        <div>
          <PickerWithType onChange={onChangeTime} />
        </div>
      </div>
      <div className="flex gap-10 mt-8">
        <div className="flex-grow">
          <h2 className="font-semibold">
            Doanh số{" "}
            <span className="text-xs italic font-light">(nghìn đồng)</span>
          </h2>
          <div>
            {orderStatistic.length > 0 ? (
              <Chart
                chartType="ComboChart"
                width="100%"
                height="400px"
                data={data}
                options={options}
              />
            ) : <Skeleton.Button
              active
              className="!w-full !h-80 !rounded-2xl"
            />}
          </div>
        </div>
        <div className="border" />
        <div className="w-1/3">
          <h2 className="font-semibold text-xl">Doanh số</h2>
          <div className="grid grid-cols-2 gap-y-4 max-h-96 overflow-y-auto">
            {orderStatistic.map((item, index) => (
              <div
                key={index}
                className="font-semibold text-content border-b pb-4"
              >
                <p>{moment(item.time).format("DD/MM")}</p>
                <p className="text-title text-lg my-1">
                  {formartCurrency(item.totalAmount)}
                </p>
                <p>
                  {item.count} <span className="font-light">đơn hàng</span>
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
};

export default SalesAnalysis;
