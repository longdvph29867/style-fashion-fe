import { https } from "../config/axios";
const orderServiceFake = {
    getAllOrders() {
        return https.get(`/orders??sortBy=createdAt%3Adesc&limit=100&page=1`)
    },
    getOrderUser(id: string) {
        return https.get(`/orders/user/${id}`)
    },
    getOrderDetail(orderId: string) {
        return https.get(`/orders/detail/${orderId}`)
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
}

export default orderServiceFake;