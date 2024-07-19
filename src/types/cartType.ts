export type ProductsCart = {
  product: {
    name: string;
    slug: string;
    thumbnail: string;
    min_price: number;
    max_price: number;
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

export type CartType = {
  _id: string;
  user: string;
  products_cart: ProductsCart[];
  createdAt: string;
  updatedAt: string;
};

export type UpdateCartType = {
  quantity: number;
};
