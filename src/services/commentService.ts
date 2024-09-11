import { https } from "../config/axios";

const commentService = {
    getAllDetailComment(id: string) {
        return https.get(`/comments/byproduct/${id}`);
    },
    deleteComment(id: string) {
        return https.delete(`/comments/${id}`);
    },
};

export default commentService;
