export type AddCartType = {
  product: string;
  variant: string;
  quantity: number;
  user: string;
};

export type UpdateVariant = {
  userId: string;
  productId: string;
  variantId: string;
  quantity: number;
};

export type TierIndex = {
  _id: string;
  name: string;
  image?: string;
};

export type IVariantProductCart = {
  _id: string;
  tier_index: TierIndex[];
  product: string;
  currentPrice: number;
  stock: number;
  originalPrice: number;
};

interface IProductCart {
  _id: string;
  name: string;
  slug: string;
  thumbnail: string;
}

export interface ICart {
  _id: string;
  user: string;
  product: IProductCart;
  variant: IVariantProductCart;
  quantity: number;
  createdAt: string;
  updatedAt: string;
}
