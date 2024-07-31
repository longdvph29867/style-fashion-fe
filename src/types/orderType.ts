import { ShippingAddressType } from "./shippingAddress";

export type ProductOrderType = {
  productId: string;
  quantity: number;
  price: number;
  productName: string;
  slug: string;
  imageProduct: string;
  imageAtrribute: string;
  attribute: string;
};
export type ShippingAddressCheckoutType = Omit<
  ShippingAddressType,
  "_id" | "selected"
>;
// Khai báo type cho đơn hàng
export type CheckoutType = {
  productsOrder: ProductOrderType[];
  shippingAddress: ShippingAddressCheckoutType;
  user: string;
  subTotal: number;
  discountAmount: number;
  shippingFee: number;
  note: string;
  totalPrice: number;
  paymentMethod: string;
  voucherCode: string;
};
