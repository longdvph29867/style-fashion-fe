export type CartType = {
  _id: string;
  user: string;
  products_cart: ProductCartType[];
  createdAt: string;
  updatedAt: string;
};

export type ProductCartType = {
  product: {
    name: string;
    slug: string;
    thumbnail: string;
    id: string;
  };
  quantity: number;
  attribute: {
    name: string;
    price: number;
    stock: number;
    discount: number;
    image: string;
    id: string;
  };
  _id: string;
};
