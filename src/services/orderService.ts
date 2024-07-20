import { CheckoutType } from "../types/orderType";
import { https } from "../config/axios";

const orderService = {
  createCOD(data: CheckoutType) {
    return https.post(`orders`, data);
  },
  createVNPAY( data: CheckoutType) {
    return https.post(`orders/vnpay`, data);
  },
};

export default orderService;
