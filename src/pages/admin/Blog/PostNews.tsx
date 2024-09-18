import { useState } from "react";
import { Editor } from "@tinymce/tinymce-react";
import { Breadcrumb, Button, Form, Input, message, Upload } from "antd";
import { UploadOutlined } from "@ant-design/icons";
import { Link, useNavigate } from "react-router-dom";
import { FormPostNews } from "../../../types/blog";
import { hiddenSpinner, showSpinner } from "../../../util/util";
import { https } from "../../../config/axios";
import { localUserService } from "../../../services/localService";

const PostNews = () => {
  const [form] = Form.useForm();
  const [content, setContent] = useState<string>("");
  const navigate = useNavigate();

  const onFinish = async (values: FormPostNews) => {
    showSpinner();
    try {
      let imageUrl = "";
      // Kiểm tra nếu `values.image` là mảng và phần tử đầu tiên có chứa thông tin file upload
      if (values.image && Array.isArray(values.image) && values.image[0]) {
        const file = values.image[0]; // Lấy phần tử đầu tiên của mảng image

        // Nếu file là một đối tượng có `originFileObj`, tức là nó chứa thông tin về file thực tế cần upload
        if (file.originFileObj) {
          const formData = new FormData();
          formData.append("images", file.originFileObj); // Lấy file từ originFileObj để upload

          const response = await https.post("/images", formData);
          if (
            response.data &&
            response.data.data &&
            response.data.data[0] &&
            response.data.data[0].url
          ) {
            imageUrl = response.data.data[0].url;
          } else {
            throw new Error("Phản hồi không chứa URL của ảnh!");
          }
        }
      }

      const storedUserInfo = localUserService.get();
      const userId = storedUserInfo ? storedUserInfo.id : "";
      const data = {
        title: values.title,
        content: content,
        user: userId,
        image: imageUrl, // Sử dụng URL hình ảnh đã lấy được
      };

      const res = await https.post("/blogs", data);
      if (res) {
        message.success("Đăng bài thành công!");
        navigate("/admin/blog");
      }
    } catch (error) {
      console.log("Lỗi khi đăng bài:", error);
      if (
        error.response &&
        error.response.data &&
        error.response.data.message
      ) {
        message.error(error.response.data.message);
      } else {
        message.error("Có lỗi xảy ra. Vui lòng thử lại sau.");
      }
    } finally {
      hiddenSpinner();
    }
  };

  const onEditorChange = (content: string) => {
    setContent(content);
    form.setFieldsValue({ content }); // Cập nhật giá trị của content trong form
  };

  const onFinishFailed = (errorInfo: unknown) => {
    console.log("Failed:", errorInfo);
  };
  return (
    <div className="">
      <Breadcrumb style={{ margin: '16px 0' }}>
        <Breadcrumb.Item><Link to="/admin">Trang chủ</Link></Breadcrumb.Item>
        <Breadcrumb.Item><Link to="/admin/blog">Blog</Link></Breadcrumb.Item>
        <Breadcrumb.Item>Thêm bài viết</Breadcrumb.Item>
      </Breadcrumb>
      <div className="mx-auto bg-white p-8 rounded shadow">
        <h1 className="text-2xl font-bold mb-6">Đăng Tin Tức</h1>
        <Form
          layout="vertical"
          name="basic"
          labelCol={{ span: 12 }}
          wrapperCol={{ span: 24 }}
          // style={{ maxWidth: 600 }}
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
            {/* <Upload customRequest={handleUpload} showUploadList={true}>
              <Button icon={<UploadOutlined />}>Click to Upload</Button>
            </Upload> */}

            <Form.Item
              label="Hình ảnh"
              name="image"
              valuePropName="fileList"
              getValueFromEvent={(e) => e?.fileList}
              rules={[
                { required: true, message: "Vui lòng chọn file!" },
                {
                  validator(_, fileList) {
                    if (fileList) {
                      if (fileList.length > 5) {
                        return Promise.reject("Tối đa 5 file!");
                      }
                      for (const file of fileList) {
                        if (file.size > 1024 * 1024) {
                          return Promise.reject("File tối đa 1MB");
                        }
                        if (
                          !["image/jpeg", "image/jpg", "image/png"].includes(
                            file.type
                          )
                        ) {
                          return Promise.reject(
                            "File phải có định dạng png, jpg, jpeg!"
                          );
                        }
                      }
                      return Promise.resolve();
                    }
                    return Promise.resolve();
                  },
                },
              ]}
            >
              <Upload.Dragger
                multiple
                listType="picture"
                maxCount={1}
                beforeUpload={() => false}
              >
                <Button icon={<UploadOutlined />}>Click to upload</Button>
              </Upload.Dragger>
            </Form.Item>
          </div>

          <div className="mb-4">
            <Form.Item
              style={{ width: "100%" }}
              label="Content"
              name="content"
              rules={[{ required: true, message: "Vui lòng nhập trường này!" }]}
            >
              <Editor
                apiKey="2ag9f5652gfh8wi0m8g4ll6hb65iw6ldqyujk4ytt2ubto8n"
                value={content}
                init={{
                  // width: "100%",
                  height: 500,
                  menubar: true,
                  // style_formats:,
                  menu: {
                    file: {
                      title: "File",
                      items:
                        "newdocument restoredraft | preview | importword exportpdf exportword | print | deleteallconversations",
                    },
                    edit: {
                      title: "Edit",
                      items:
                        "undo redo | cut copy paste pastetext | selectall | searchreplace",
                    },
                    view: {
                      title: "View",
                      items:
                        "code revisionhistory | visualaid visualchars visualblocks | spellchecker | preview fullscreen | showcomments",
                    },
                    insert: {
                      title: "Insert",
                      items:
                        "image link media addcomment pageembed codesample inserttable | math | charmap emoticons hr | pagebreak nonbreaking anchor tableofcontents | insertdatetime",
                    },
                    format: {
                      title: "Format",
                      items:
                        "bold italic underline strikethrough superscript subscript codeformat | styles blocks fontfamily fontsize align lineheight | forecolor backcolor | language | removeformat",
                    },
                    tools: {
                      title: "Tools",
                      items:
                        "spellchecker spellcheckerlanguage | a11ycheck code wordcount",
                    },
                    table: {
                      title: "Table",
                      items:
                        "inserttable | cell row column | advtablesort | tableprops deletetable",
                    },
                    help: { title: "Help", items: "help" },
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
              /* To style the main scrollbar */
                  body::-webkit-scrollbar {
                    width: 12px;
                      }

              /* Track */
              body::-webkit-scrollbar-track {
                background: #f1f1f1;
              }

              /* Handle */
              body::-webkit-scrollbar-thumb {
                background: #888;
                border-radius: 10px;
              }

              /* Handle on hover */
              body::-webkit-scrollbar-thumb:hover {
                background: #555;
              }
            `,
                }}
                onEditorChange={onEditorChange}
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
