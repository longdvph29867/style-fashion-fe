import { https } from "../config/axios";
const orderService = {
    getAllOrders() {
        return https.get(`/orders`)
    },
    cancelOrder(orderId: string) {
        return https.put(`/orders/${orderId}`, { paymentStatus: 7 })
    },
}

export default orderService;