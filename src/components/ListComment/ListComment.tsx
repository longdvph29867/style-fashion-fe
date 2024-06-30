import { useEffect, useState } from "react";
import { Comment, PostComment } from "../../types/comment";
import ItemComment from "./ItemComment/ItemComment";
import commentService from "../../services/commentService";
import { useParams } from "react-router-dom";
import AddComment from "./AddComment/AddComment";
import { https } from "../../config/axios";

const ListComment = () => {
  const { id = "4edd40c86762e0fb12000003" } = useParams();
  const [listComment, setListComment] = useState<Comment[]>([]);

  const fetchComments = () => {
    https.get(`comments/byproduct/${id}`)
      
      .then((res) => {
        setListComment(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };
  useEffect(() => {
    fetchComments();
  }, []);

  const addComment = (data: PostComment) => {
    console.log(data);
    
    https.post(`comments`,data)
      .then((res) => {
        // console.log(res);
        setListComment([{ ...res.data, replies: [] }, ...listComment]);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <div className="mt-4 p-4 rounded bg-white font-sans duration-300">
      <div>
        <h3 className="text-lg mb-4">
          {listComment.reduce(
            (total, comment) => (total += comment.replies.length + 1),
            0
          )}{" "}
          Comments
        </h3>
        {/* form comment */}
        <AddComment idProduct={id} addComment={addComment} />
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