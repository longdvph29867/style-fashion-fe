// export type Attribute = {
//   name: string;
//   price: number;
//   stock: number;
//   discount: number;
//   image: string;
//   id: string;
// };

// type Product = {
//   id: string;
//   name: string;
//   scoreReview: number;
//   description: string;
//   attributes: Attribute[];
//   images: string[];
//   thumbnail: string;
//   gallery: string[];
//   price: number;
//   slug: string;
//   finalScoreReview: number;
//   categories: { id: string; name: string }[];
//   createAt: string;
//   updateAt: string;
//   gender: string;
//   rating: number;
// }

// type FormProductData = {
//   name: string;
//   thumbnail: string;
//   attributes: Attribute[];
//   gallery: string[];
//   categories: string[]; // assuming "Object Id" is a string
//   description: string;
//   video: string;
//   images: File[];
//   scoreReview: number;
// };

// type ProductResponse = {
//   limit: number;
//   page: number;
//   results: Product[];
//   totalPages: number;
//   totalResults: number;
// };

// type FormProductData = Pick<Product, "desc" | "gender" | "name" | "price"> & {
//   images: File[];
//   id_category: string;
// };

type AttributeValue = {
  _id: string;
  name: string;
  image?: string;
};

type Attribute = {
  _id: string;
  name: string;
  values: AttributeValue[];
};

type Variant = {
  tier_index: string[];
  product: string;
  currentPrice: number;
  stock: number;
  originalPrice: number;
  id: string;
};

type Product = {
  name: string;
  slug: string;
  thumbnail: string;
  gallery: string[];
  attributes: Attribute[];
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
  variants: Variant[];
};
