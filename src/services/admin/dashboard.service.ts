import { https } from "../../config/axios";

const dashboardService = {
  async getOrderByStatus(type: string, time: number, year: number) {
    return https.get(
      `/statistics/order-status?type=${type}&time=${time}&year=${year}`
    );
  },
  async getOrderStatistic(
    type: string,
    time: number,
    year: number,
    orderStatus: number
  ) {
    return https.get(
      `/statistics/order?type=${type}&time=${time}&year=${year}&orderStatus=${orderStatus}`
    );
  },
};

export default dashboardService;
