import { https } from "../config/axios";
const orderService = {
    getAllOrders() {
        return https.get(`/orders`)
    },
    getOrderDetail(orderId: string) {
        return https.get(`/orders/detail/${orderId}`)
    },
    receivedOrder(orderId: string) {
        return https.put(`/orders/${orderId}`, { paymentStatus: 5 })
    },
    cancelOrder(orderId: string) {
        return https.put(`/orders/${orderId}`, { paymentStatus: 7 })
    },
}

export default orderService;