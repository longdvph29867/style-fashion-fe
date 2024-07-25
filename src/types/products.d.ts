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
}

type FormProductData = {
  name: string;
  thumbnail: string;
  attributes: Attribute[];
  gallery: string[];
  categories: string[]; // assuming "Object Id" is a string
  description: string;
  video: string;
  images: File[];
  scoreReview: number;
}

type ProductResponse = {
  limit: number
  page: number
  results: Product[]
  totalPages: number
  totalResults: number
}

type FormProductData = Pick<Product, 'desc' | 'gender' | 'name' | 'price'> & { images: File[], id_category: string }

