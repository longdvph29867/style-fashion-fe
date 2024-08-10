import { https } from "../config/axios";
import { CartType } from "../types/cartType";

type AddCartType = { product: string; variant: string; quantity: number };

const cartService = {
  getCartByUserId(userId: string) {
    return https.get<CartType>(`/carts?userId=${userId}`);
  },
  addToCart(userId: string, data: AddCartType) {
    return https.post(`/carts?userId=${userId}`, data);
  },
  updateCart(userId: string, productCartId: string, quantity: number) {
    return https.put(`/carts?userId=${userId}&cartItemId=${productCartId}`, {
      quantity,
    });
  },
  updateVariant(body: any) {
    return https.put("carts/variant", body);
  },
  deleteCartItem(userId: string, productCartId: string) {
    return https.delete(`/carts?userId=${userId}`, {
      data: { productCartId },
    });
  },
};

export default cartService;
