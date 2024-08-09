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

// new product type
// Định nghĩa type cho Attribute Value
export type AttributeValue = {
  name: string;
  image?: string; // Image có thể có hoặc không, nên dùng dấu ?
};

// Định nghĩa type cho Attribute

export interface Attribute {

  name: string;

  values: AttributeValue[];

}

// Định nghĩa type cho Variant
export type Variant = {
  id: string; // ID của biến thể
  attributes: string[]; // Tên thuộc tính
  currentPrice: string;
  originalPrice: string;
  stock: string;
};

type TieredVariant = Variant & {
  tier_index: number[];
};

type Product = {
  name: string;
  slug: string;
  thumbnail: string;
  gallery: string[];
  attributes: Attribute[];
  categories: Category[];
  minPrice: number;
  maxPrice: number;
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

// Định nghĩa type cho Product
export type ProductForm = {
  name: string;
  thumbnail: string;
  categories: string[]; // Mảng chứa ID của các danh mục
  gallery: string[]; // Mảng chứa các đường dẫn hình ảnh
  featured: boolean;
  description: string;
  shortDescription: string;
  video: string;
  attributes: Attribute[];
  variants: Variant[];
};


