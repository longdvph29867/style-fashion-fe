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
  getAllProducts(limit: number, page: number) {
    let urlQuery = `/products?limit=${limit}&page=${page}`;
    // if (categories) {
    //   urlQuery += `&categories=${categories}`;
    // }
    return https.get(urlQuery);
  },
  getFilterProducts(limit: number, page: number, categories: string) {
    let urlQuery = `/products?limit=${limit}&page=${page}`;
    if (categories) {
      urlQuery += `&categories=${categories}`;
    }
    return https.get(urlQuery);
  },
  getAllProductsV2(queryUrl: string) {
    if (queryUrl) {
      return https.get(`/products?${queryUrl}`);
    } else {
      return https.get(`/products`);
    }
  },
  getAllProductsDeleted(queryUrl: string) {
    if (queryUrl) {
      return https.get(`/products/products-deleted?${queryUrl}`);
    } else {
      return https.get(`/products/products-deleted`);
    }
  }
};

export default productService;
