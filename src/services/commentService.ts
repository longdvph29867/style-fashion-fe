import { https } from "../config/axios";
import { PostComment } from "../types/comment";

const commentService = {
  getCommentByProduct(idMovie: string) {
    return https.get(`/comments/byproduct/${idMovie}`);
  },
  postCommentByProduct(data: PostComment) {
    return https.post(`/comments`, data);
  },
  getAllDetailComment(id: string) {
    return https.get(`/comments/byproduct/${id}`);
  },
  deleteComment(id: string) {
    return https.delete(`/comments/${id}`);
  },
};

export default commentService;
