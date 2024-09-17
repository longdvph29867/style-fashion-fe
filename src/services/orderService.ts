import { https } from "../config/axios";

const orderService = {
  createCOD(data: any) {
    return https.post(`orders`, data);
  },
  createVNPAY(data: any) {
    return https.post(`orders/vnpay`, data);
  },
  createVnpayV2(orderId: string) {
    return https.post(`orders/vnpay-order-payment/${orderId}`);
  },
  getAllOrders(limit: number, page: number) {
    return https.get(`/orders?limit=${limit}&page=${page}`);
  },
  getAllOrdersV2(queryUrl: string) {
    if (queryUrl) {
      return https.get(`/orders?${queryUrl}`);
    } else {
      return https.get(`/orders?sortBy=createdAt:desc`);
    }
  },
  getAllOrderUser(id: string, limit: number, page: number, orderStatus: any) {
    if (orderStatus) {
      return https.get(`/orders/user/${id}?orderStatus=${orderStatus}&limit=${limit}&page=${page}`);
    } else {
      return https.get(`/orders/user/${id}?limit=${limit}&page=${page}`);
    }
  },
  getAllOrderUserByStatusCode(id: string, statusCode: any) {
    return https.get(`/orders/user/${id}?orderStatus=${statusCode}`)
  },
  getOrderDetail(orderId: string) {
    return https.get(`/orders/detail/${orderId}`)
  },
  updateStatusOrder(orderId: string, statusCode: number, userId: string) {
    return https.put(`/orders/${orderId}`, { orderStatus: statusCode, user: userId })
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
