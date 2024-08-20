export type IOrderStatus = {
  totalAmount: number;
  count: number;
  orderStatus: number;
  name: string;
};

export type IOrderStatistic = {
  time: string;
  totalAmount: number;
  count: number;
};

export type ITopSellingProduct = {
  totalQuantity: number;
  productId: string;
  productName: string;
  productImage: string;
};
