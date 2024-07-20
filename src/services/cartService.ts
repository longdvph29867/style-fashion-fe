import { https } from "../config/axios";
type AddCartType = { product: string; attribute: string; quantity: number };

const cartService = {
  getProductByUserId(userId: string) {
    return https.get(`/carts/${userId}`);
  },
  addToCart(data: AddCartType) {
    const userId = "66497d8f4f4928b722bc2832";
    return https.post(`/carts?userId=${userId}`, data);
  },
};

export default cartService;
