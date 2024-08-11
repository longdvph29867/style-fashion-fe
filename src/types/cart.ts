import { IAttributeValue } from "./productType";

export type CartType = {
  _id: string;
  user: string;
  products_cart: ProductCartType[];
  createdAt: string;
  updatedAt: string;
};

export type IAttribute = {
  _id: string;
  name: string;
  values: IAttributeValue[];
};

export type IVariant = {
  tier_index: IAttribute[];
  product: string;
  currentPrice: number;
  stock: number;
  originalPrice: number;
  id: string;
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
