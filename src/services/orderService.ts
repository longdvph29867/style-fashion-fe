import { CheckoutType } from "../types/orderType";
import { https } from "../config/axios";

const orderService = {
  createCOD(data: CheckoutType) {
    return https.post(`orders`, data);
  },
  createVNPAY(data: CheckoutType) {
    return https.post(`orders/vnpay`, data);
  },
  getAllOrders(limit: number, page: number) {
    return https.get(`/orders?limit=${limit}&page=${page}`);
  },
  getAllOrderUser(id: string) {
    return https.get(`/orders/user/${id}`)
  },
  getOrderDetail(orderId: string) {
    return https.get(`/orders/detail/${orderId}`)
  },
  updateStatusOrder(orderId: string, statusCode: number) {
    return https.put(`/orders/${orderId}`, { orderStatus: statusCode })
  },
  confirmOrder(orderId: string) {
    return https.put(`/orders/${orderId}`, { orderStatus: 4 })
  },
  deliveryOrder(orderId: string) {
    return https.put(`/orders/${orderId}`, { orderStatus: 5 })
  },
  deliveredOrder(orderId: string) {
    return https.put(`/orders/${orderId}`, { orderStatus: 6 })
  },
  failDeliveryOrder(orderId: string) {
    return https.put(`/orders/${orderId}`, { orderStatus: 7 })
  },
  receivedOrder(orderId: string) {
    return https.put(`/orders/${orderId}`, { orderStatus: 8 })
  },
  cancelOrder(orderId: string) {
    return https.put(`/orders/${orderId}`, { orderStatus: 9 })
  },
  reviewProduct(data: any) {
    return https.post(`/reviews`, data)
  }
};

export default orderService;
