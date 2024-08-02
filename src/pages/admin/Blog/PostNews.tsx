import React, { useState } from "react";
import { Editor } from "@tinymce/tinymce-react";
import { Button, Form, Input, message, Upload, UploadProps } from "antd";
import { UploadOutlined } from "@ant-design/icons";
import { useNavigate, useParams } from "react-router-dom";
import { FormPostNews } from "../../../types/blog";
import { hiddenSpinner, showSpinner } from "../../../util/util";
import { https } from "../../../config/axios";
import { localUserService } from "../../../services/localService";

type Props = {
};

const PostNews = (props: Props) => {
  const [content, setContent] = useState<string>("");
  const [image, setPoster] = useState<string>("");
  const navigate = useNavigate();
  const {id}= useParams();


  const handleUpload: UploadProps['customRequest'] = async ({ file, onSuccess, onError }:any) => {
    const formData = new FormData();
    formData.append("images", file);
  
    showSpinner();
    try {
      const response = await https.post("/images", formData);
      console.log("Phản hồi từ máy chủ khi tải ảnh:", response);
      if (response.data && response.data.data && response.data.data[0] && response.data.data[0].url) {
        const imageUrl = response.data.data[0].url;
        setPoster(imageUrl);
        message.success("Tải ảnh lên thành công!");
        onSuccess("Ok");
      } else {
        throw new Error("Phản hồi không chứa URL của ảnh!");
      }
    } catch (error) {
      console.error("Lỗi khi tải ảnh lên:", error);
      message.error(error.response?.data?.message || "Có lỗi xảy ra khi tải ảnh lên.");
      onError(error);
    } finally {
      hiddenSpinner();
    }
  }
  
  const onFinish = async (values: FormPostNews) => {
    const storedUserInfo = localUserService.get();
    const userId = storedUserInfo ? storedUserInfo.id : null;
    showSpinner();
    try {
      const data = {
        title: values.title,
        content: content,
        user: userId, 
        image: image
      };
      console.log("Dữ liệu gửi đến máy chủ:", data);
      const res = await https.post("/blogs", data);
      console.log("Phản hồi từ máy chủ khi đăng bài:", res);
      if (res) {
        message.success("Đăng bài thành công!");
        navigate("/admin");
      }
    } catch (error) {
      console.log("Lỗi khi đăng bài:", error);
      if (error.response && error.response.data && error.response.data.message) {
        message.error(error.response.data.message);
      } else {
        message.error("Có lỗi xảy ra. Vui lòng thử lại sau.");
      }
    } finally {
      hiddenSpinner();
    }
  }


  return (
    <div className="bg-gray-100 p-6">
      <div className="max-w-2xl mx-auto bg-white p-8 rounded shadow">
        <h1 className="text-2xl font-bold mb-6">Đăng Tin Tức</h1>
        <Form
          layout="vertical"
          name="basic"
          labelCol={{ span: 12 }}
          wrapperCol={{ span: 24 }}
          style={{ maxWidth: 600 }}
          initialValues={{ remember: true }}
          onFinish={onFinish}
          // onFinishFailed={onFinishFailed}
          autoComplete="off"
          requiredMark={false}
        >
          <div className="mb-4">
            <Form.Item
              label="Tiêu đề:"
              name="title"
              rules={[{ required: true, message: "Vui lòng nhập trường này!" }]}
            >
              <Input />
            </Form.Item>
          </div>
          <div className="image mb-4">
            <label
              htmlFor="title"
              className="block text-gray-700 font-bold mb-2"
            >
              Poster:
            </label>
            <Upload customRequest={handleUpload}>
              <Button icon={<UploadOutlined />}>Click to Upload</Button>
            </Upload>
          </div>

          <div className="mb-4">
            <Form.Item
              label="Content"
              name="content"
              rules={[{ required: true, message: "Vui lòng nhập trường này!" }]}
            >
              <Editor
                apiKey="2ag9f5652gfh8wi0m8g4ll6hb65iw6ldqyujk4ytt2ubto8n"
                value={content}
                init={{
                  height: 500,
                  menubar: false,
                  plugins: [
                    "advlist autolink lists link image charmap print preview anchor",
                    "searchreplace visualblocks code fullscreen",
                    "insertdatetime media table paste code help wordcount",
                  ],
                  toolbar:
                    "undo redo | formatselect | bold italic backcolor | \
                          alignleft aligncenter alignright alignjustify | \
                          bullist numlist outdent indent | removeformat | help",
                }}
                onEditorChange={(content) => setContent(content)}
              />
            </Form.Item>
          </div>

          <Form.Item>
            <Button
              type="primary"
              htmlType="submit"
              className="text-white bg-green-500"
            >
              Đăng bài
            </Button>
          </Form.Item>
        </Form>
      </div>
    </div>
  );
};


export default PostNews;
