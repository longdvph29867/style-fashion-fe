import { ChangeEvent, FormEvent, useState } from "react";
import { localUserService } from "../../services/localService";
import { PostComment } from "../../types/comment";
import { message } from "antd";

type Props = {
  idProduct: string;
  addComment: (data: PostComment) => void;
};

const AddComment = ({ idProduct, addComment }: Props) => {
  const [content, setContent] = useState<string>("");
  const [error, setError] = useState<string>("");
  const user = localUserService.get();

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;
    setContent(value);
    if (value.trim() === "") {
      setError("Comment cannot be empty!");
    } else {
      setError("");
    }
  };
  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (user) {
      message.error("Vui lòng đăng nhập để bình luận san phẩm");
    }
    if (content.trim() === "") {
      return;
    }

    const data = {
      productsId: idProduct,
      userId: user?.id as string,
      content,
    };
    addComment(data);
    setContent("");
  };
  return (
    <div className="flex items-start gap-4 mt-4">
      <div className="img-user-comment rounded-full overflow-hidden">
        <img width={40} src={user?.image} alt="" />
      </div>
      <form className="flex-grow" onSubmit={handleSubmit}>
        <input
          onChange={handleChange}
          className="block w-full outline-none text-sm pb-1.5 mb-1.5 border-b border-slate-400"
          type="text"
          value={content}
          placeholder="Nội dung..."
        />
        <div className="flex items-start justify-between">
          <div className="max-w-[60%] text-xs text-red-500">
            <span>{error}</span>
          </div>
          <div className="flex items-center gap-2">
            {/* <button
              type="button"
              className="px-4 h-9 rounded-full font-semibold duration-300 text-xs hover:bg-orange-500"
            >
              Cancel
            </button> */}
            <button className="px-4 h-9 rounded-full font-semibold duration-300 text-xs text-white bg-[#fe385c]">
              Gửi
            </button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default AddComment;
