import { IVariant } from "./productType";

export type CartType = {
  _id: string;
  user: string;
  products_cart: ProductCartType[];
  createdAt: string;
  updatedAt: string;
};

interface ProductType {
  name: string;
  slug: string;
  thumbnail: string;
  id: string;
}
export type ProductCartType = {
  product: ProductType;
  quantity: number;
  variant: IVariant;
  _id: string;
};
