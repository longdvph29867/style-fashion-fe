import React, { useEffect, useState } from 'react';
import { hiddenSpinner, showSpinner } from '../../../util/util';
import { https } from '../../../config/axios';
import { useNavigate, useParams } from 'react-router-dom';
import { Button, Form, Image, Input, message, Upload, UploadProps } from 'antd';
import { FormPostNews, FormUpdateBlog } from '../../../types/blog';
import { UploadOutlined } from '@ant-design/icons';
import { Editor } from '@tinymce/tinymce-react';
import { localUserService } from '../../../services/localService';

const UpdateBlog: React.FC = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [image, setPoster] = useState<string>("");
  const [file, setFile] = useState<File | null>(null);
  const [form] = Form.useForm();

  const handleUpload: UploadProps["customRequest"] = ({ file }: any) => {
    setFile(file);
  };

  const fetchBlog = async () => {
    showSpinner();
    try {
      const { data } = await https.get(`/blogs/${id}`);
      const blog: FormUpdateBlog = data;
      form.setFieldsValue({
        title: blog.title,
        image: blog.image,
        content: blog.content
      });
      hiddenSpinner();
    } catch (error) {
      hiddenSpinner();
      console.log(error);
    }
  };

  useEffect(() => {
    fetchBlog();
  }, [id]);

  const onFinish = async (values: FormPostNews) => {
    showSpinner();
    try {
      let imageUrl = image;
      
      if (file) {
        const formData = new FormData();
        formData.append("images", file);

        const response = await https.post("/images", formData);
        if (response.data && response.data.data && response.data.data[0] && response.data.data[0].url) {
          imageUrl = response.data.data[0].url;
        } else {
          throw new Error("Phản hồi không chứa URL của ảnh!");
        }
      }

      const storedUserInfo = localUserService.get();
      const userId = storedUserInfo ? storedUserInfo.id : '';
      const data = {
        title: values.title,
        image: imageUrl,
        content: values.content,
        user: userId
      };

      const res = await https.put(`/blogs/${id}`, data);
      if (res) {
        message.success("Cập nhật thành công!");
        navigate("/admin/blog");
      }
    } catch (error) {
        console.log(error);
        message.error(error.response?.data?.message);
    } finally {
      hiddenSpinner();
    }
  };

  const onFinishFailed = (errorInfo: unknown) => {
    console.log("Failed:", errorInfo);
  };

  return (
    <div className="bg-gray-100 p-6">
      <div className="max-w-2xl mx-auto bg-white p-8 rounded shadow">
        <h1 className="text-2xl font-bold mb-6">Sửa Tin Tức</h1>
        <Form
          form={form}
          layout="vertical"
          name="basic"
          labelCol={{ span: 12 }}
          wrapperCol={{ span: 24 }}
          style={{ maxWidth: 600 }}
          initialValues={{ remember: true }}
          onFinish={onFinish}
          onFinishFailed={onFinishFailed}
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
            <Upload customRequest={handleUpload} showUploadList={false}>
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
                init={{
                  height: 500,
                  menubar: true,
                  menu: {
                    file: { title: 'File', items: 'newdocument restoredraft | preview | importword exportpdf exportword | print | deleteallconversations' },
                    edit: { title: 'Edit', items: 'undo redo | cut copy paste pastetext | selectall | searchreplace' },
                    view: { title: 'View', items: 'code revisionhistory | visualaid visualchars visualblocks | spellchecker | preview fullscreen | showcomments' },
                    insert: { title: 'Insert', items: 'image link media addcomment pageembed codesample inserttable | math | charmap emoticons hr | pagebreak nonbreaking anchor tableofcontents | insertdatetime' },
                    format: { title: 'Format', items: 'bold italic underline strikethrough superscript subscript codeformat | styles blocks fontfamily fontsize align lineheight | forecolor backcolor | language | removeformat' },
                    tools: { title: 'Tools', items: 'spellchecker spellcheckerlanguage | a11ycheck code wordcount' },
                    table: { title: 'Table', items: 'inserttable | cell row column | advtablesort | tableprops deletetable' },
                    help: { title: 'Help', items: 'help' }
                  },
                  plugins: [
                    "advlist",
                    "autolink",
                    "link",
                    "image",
                    "lists",
                    "charmap",
                    "preview",
                    "anchor",
                    "pagebreak",
                    "searchreplace",
                    "wordcount",
                    "visualblocks",
                    "visualchars",
                    "code",
                    "fullscreen",
                    "insertdatetime",
                    "media",
                    "table",
                    "emoticons",
                    "help",
                  ],
                  toolbar:
                    "undo redo | styles | bold italic | alignleft aligncenter alignright alignjustify | bullist numlist outdent indent | link image | print preview media | forecolor backcolor emoticons",
                  content_style: `
                    body::-webkit-scrollbar {
                      width: 12px;
                    }
                    body::-webkit-scrollbar-track {
                      background: #f1f1f1;
                    }
                    body::-webkit-scrollbar-thumb {
                      background: #888;
                      border-radius: 10px;
                    }
                    body::-webkit-scrollbar-thumb:hover {
                      background: #555;
                    }
                  `,
                }}
              />
            </Form.Item>
          </div>

          <Form.Item>
            <Button type="primary" htmlType="submit" className="text-white bg-green-500">
              Sửa bài
            </Button>
          </Form.Item>
        </Form>
      </div>
    </div>
  );
}

export default UpdateBlog;
