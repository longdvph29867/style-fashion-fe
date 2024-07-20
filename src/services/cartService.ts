import { https } from "../config/axios";

const cartService = {
  getCartByUserId(userId: string) {
    return https.get(`/carts?userId=${userId}`);
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
