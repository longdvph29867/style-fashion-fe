export type Attribute = {
  name: string;
  price: number;
  stock: number;
  discount: number;
  image: string;
  id: string;
};
type Product = {
  id: string;
  name: string;
  scoreReview: number;
  description: string;
  attributes: Attribute[];
  images: string[];
  thumbnail: string;
  gallery: string[];
  price: number;
  slug: string;
  finalScoreReview: number;
  categories: { id: string; name: string }[];
  createAt: string;
  updateAt: string;
  gender: string;
  rating: number;
};
