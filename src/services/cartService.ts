import { https } from "../config/axios";
import { localUserService } from "./localService";
type AddCartType = { product: string; attribute: string; quantity: number };


const cartService = {
  getCartByUserId(userId: string) {
    return https.get(`/carts?userId=${userId}`);
  },
  addToCart(data: AddCartType) {
    const userId = localUserService.get()?.id;
    return https.post(`/carts?userId=${userId}`, data);
  },
  updateCart(userId: string, productCartId: string, quantity: number) {
    return https.put(`/carts?userId=${userId}&cartItemId=${productCartId}`, {
      quantity,
    });
  },
  deleteCartItem(userId: string, productCartId: string) {
    return https.delete(`/carts?userId=${userId}`, {
      data: { productCartId },
    });
  },
};

export default cartService;
