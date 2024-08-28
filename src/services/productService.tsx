import { https } from "../config/axios";
const productService = {
  getProductBySlug(slug: string) {
    return https.get(`/products/${slug}`);
  },
  getProductDetail(value: string) {
    return https.get(`/products/${value}`);
  },
  getProductByCategories(listId: string) {
    return https.get(`/products/?categories=${listId}`);
  },
  getAllProducts(limit: number, page: number, categories: string | null) {
    let urlQuery = `/products?limit=${limit}&page=${page}`;
    if (categories) {
      urlQuery += `&categories=${categories}`;
    }
    return https.get(urlQuery);
  },
};

export default productService;
