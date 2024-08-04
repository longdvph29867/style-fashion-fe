import { https } from "../../config/axios";

const dashboardService = {
  async getOrderByStatus(type: string, time: number, year: number) {
    return https.get(
      `/statistics/order-status?type=${type}&time=${time}&year=${year}`
    );
  },
};

export default dashboardService;
