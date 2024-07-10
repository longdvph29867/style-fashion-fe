import { CheckoutType } from "../types/orderType";
import { https } from "../config/axios";

const orderService = {
  create(userId: string, data: CheckoutType) {
    return https.post(`orders/${userId}`, data);
  },
};

export default orderService;
