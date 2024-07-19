import axios from "axios";
import { https } from "../config/axios";

const cartService = {
  getCartByUserId(userId: string) {
    return https.get(`/carts?userId=${userId}`);
  },
  updateCart(userId: string, productCartId: string, quantity: number) {
    return axios.put(
      `http://localhost:8000/api/v1/carts?userId=${userId}&cartItemId=${productCartId}`,
      { quantity }
    );
  },
  deleteCartItem(userId: string, productCartId: string) {
    return https.delete(`/carts?userId=${userId}`, {
      data: { productCartId },
    });
  },
};

export default cartService;
