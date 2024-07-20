import { https } from "../config/axios";
const orderService = {
    getAllOrders() {
        return https.get(`/orders??sortBy=createdAt%3Adesc&limit=100&page=1`)
    },
    getOrderDetail(orderId: string) {
        return https.get(`/orders/detail/${orderId}`)
    },
    receivedOrder(orderId: string) {
        return https.put(`/orders/${orderId}`, { orderStatus: 9 })
    },
    cancelOrder(orderId: string) {
        return https.put(`/orders/${orderId}`, { orderStatus: 10 })
    },
    reviewProduct(data: any) {
        return https.post(`/reviews`, data)
    }
}

export default orderService;