import { https } from "../config/axios";

const categoryService = {
  getAllCategories() {
    return https.get(`/categories`);
  },
};

export default categoryService;
