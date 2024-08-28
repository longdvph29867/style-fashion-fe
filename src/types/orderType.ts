export interface OrderProduct {
  variant: string;
  quantity: number;
}

export interface OrderShippingAddress {
  name: string;
  phoneNumber: string;
  address: string;
  ward: string;
  district: string;
  province: string;
}

export interface CreateOrder {
  products: OrderProduct[];
  user: string;
  shippingAddress: OrderShippingAddress;
  note?: string;
  subTotal: number;
  discountAmount: number;
  shippingFee: number;
  totalPrice: number;
  paymentMethod: string;
}
