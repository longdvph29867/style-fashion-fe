import { https } from "../config/axios";
const productService = {
  getProductBySlug(slug: string) {
    return https.get(`/products/${slug}`);
  },
  getProductByCategories(listId: string) {
    return https.get(`/products/?categories=${listId}`);
  },
};

export default productService;
