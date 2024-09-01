import { useEffect, useState } from "react";
import { Comment, PostComment } from "../../types/comment";
import ItemComment from "./ItemComment";
import commentService from "../../services/commentService";

import AddComment from "./AddComment";

interface Props {
  idProduct: string;
}

const ListComment = ({ idProduct }: Props) => {
  const [listComment, setListComment] = useState<Comment[]>([]);

  const fetchComments = () => {
    if (idProduct) {
      commentService
        .getCommentByProduct(idProduct)
        .then((res) => {
          setListComment(res.data);
        })
        .catch((err) => {
          console.log(err);
        });
    }
  };
  useEffect(() => {
    fetchComments();
  }, []);

  const addComment = (data: PostComment) => {
    commentService
      .postCommentByProduct(data)
      .then((res) => {
        // console.log(res);
        setListComment([{ ...res.data, replies: [] }, ...listComment]);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <div className="mt-10 p-4 rounded bg-white font-sans duration-300">
      <div>
        <h3 className="text-lg mb-4">
          {listComment.reduce(
            (total, comment) => (total += comment.replies.length + 1),
            0
          )}{" "}
          Bình luận
        </h3>
        {/* form comment */}
        <AddComment idProduct={idProduct} addComment={addComment} />
        {/* list comments */}
        <div className="flex flex-col gap-5">
          {/* item comment */}
          {listComment.map((comment) => (
            <ItemComment key={comment._id} comment={comment} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default ListComment;
