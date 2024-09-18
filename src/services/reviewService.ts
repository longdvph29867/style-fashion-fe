import { https } from "../config/axios";
const reviewService = {
    getAllReviews(productId: any, limit: number, page: number) {
        let urlQuery = `/reviews/v2?productId=${productId}&limit=${limit}&page=${page}`;
        return https.get(urlQuery);
    },
};

export default reviewService;
