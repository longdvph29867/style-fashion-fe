import { https } from "../config/axios";
const productService = {
  getProductBySlug(slug: string) {
    return https.get(`/products/${slug}`);
  },
  getProductByCategories(listId: string) {
    return https.get(`/products/?categories=${listId}`);
  },
  getAllProducts(limit: number, page: number) {
    return https.get(`/products?limit=${limit}&page=${page}`);
  }
};

export default productService;
