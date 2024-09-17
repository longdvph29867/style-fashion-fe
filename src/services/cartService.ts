import { https } from "../config/axios";
import { AddCartType, ICart, UpdateVariant } from "../types/cart";

const cartService = {
  getCartByUserId(userId: string) {
    return https.get<ICart[]>(`/carts?userId=${userId}`);
  },
  addToCart(data: AddCartType) {
    return https.post("/carts", data);
  },
  updateCart(productCartId: string, quantity: number) {
    return https.put(`/carts/quantity/${productCartId}`, {
      quantity,
    });
  },
  updateVariant(body: UpdateVariant, cartId: string) {
    return https.put(`carts/variant/${cartId}`, body);
  },
  deleteCartItem(productCartId: string) {
    return https.delete(`/carts/${productCartId}`);
  },
};

export default cartService;
