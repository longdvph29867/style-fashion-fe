export type IAttributeValue = {
  _id: string;
  name: string;
  image?: string;
};

export type IAttribute = {
  _id: string;
  name: string;
  values: IAttributeValue[];
};

export type IVariant = {
  tier_index: string[];
  product: string;
  currentPrice: number;
  stock: number;
  originalPrice: number;
  id: string;
};

export interface IStartCount {
  "1": number;
  "2": number;
  "3": number;
  "4": number;
  "5": number;
}

export type IProduct = {
  name: string;
  slug: string;
  thumbnail: string;
  gallery: string[];
  attributes: IAttribute[];
  categories: string[];
  featured: boolean;
  countInStock: number;
  numReviews: number;
  scoreReview: number;
  finalScoreReview: number;
  description: string;
  shortDescription: string;
  video: string;
  purchases: number;
  likes: number;
  id: string;
  variants: IVariant[];
  starCount: IStartCount;
};
