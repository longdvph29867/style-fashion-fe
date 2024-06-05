// type Props = {};
import {
  Button,
  Divider,
  Form,
  Input,
  InputNumber,
  Radio,
  Select,
  Space,
  Upload,
  message,
} from "antd";
import { UploadOutlined } from "@ant-design/icons";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { hiddenSpinner, showSpinner } from "../../../util/util";
import { https } from "../../../config/axios";
import TextArea from "antd/es/input/TextArea";
import { Checkbox } from 'antd';
import type { GetProp } from 'antd';
import { MinusCircleOutlined, PlusOutlined } from "@ant-design/icons";

const AddProduct: React.FC = () => {
  const navigate = useNavigate();
  const [checkboxCategoriesList, setCheckboxCategoriesList] = useState<any[]>([]);
  const [form] = Form.useForm();

  let selectedCategories: any = [];

  const fetchCategoryes = async () => {
    const { data } = await https.get("/categories");
    setCheckboxCategoriesList(data.results.map((category: any) => ({
      label: category.name,
      value: category.id,
    })));
  };
  useEffect(() => {
    fetchCategoryes();
  }, []);

  // useEffect(() => {
  //   console.log(attributeData, 'attributeData');
  // }, [attributeData]);




  const onFinish = (values: any) => {
    const postProduct = async () => {
      showSpinner();
      const attributeData: any = [];
      let formDataAttributeImage = new FormData();
      // console.log(values.fields, 'values.fields')
      // return;
      for (const field of values.fields) {
        const image = field.image[0].originFileObj;
        formDataAttributeImage.append("images", image);
        try {
          const { data: dataAttributeImage } = await https.post("/images", formDataAttributeImage);
          const urlAttributeImage: { url: string; publicId: string }[] = dataAttributeImage.data;
          const attribute = {
            name: field.name,
            price: field.price,
            stock: field.stock,
            discount: field.discount,
            image: urlAttributeImage[0].url,
          };
          attributeData.push(attribute);
          formDataAttributeImage = new FormData();
        } catch (error) {
          console.log(error);
          message.error(error.response.data.message);
        }
      }

      // console.log(values, 'values');
      // console.log(attributeData, 'attributeData');
      // console.log('123')
      // return;

      const listFiles = values.gallery;
      const thumbnail: any = values.thumbnail;


      const newArrayFiles = listFiles.map((file: any) => file.originFileObj);
      const thumbnailFile = thumbnail[0].originFileObj;

      const formData = new FormData();
      for (const file of newArrayFiles) {
        formData.append("images", file);
      }

      const formDataThumbnail = new FormData();
      formDataThumbnail.append("images", thumbnailFile);
      try {
        const { data: dataGallery } = await https.post("/images", formData);
        const urlGallery: { url: string; publicId: string }[] = dataGallery.data;

        const { data: dataThumbnail } = await https.post("/images", formDataThumbnail);
        const urlThumbnail: { url: string; publicId: string }[] = dataThumbnail.data;

        const data = {
          name: values.name,
          description: values.description,
          gallery: urlGallery.map((image) => image.url),
          thumbnail: urlThumbnail[0].url,
          categories: values.categories,
          attributes: attributeData,
          video: "",
        };

        const res = await https.post("/products", data);
        if (res) {
          message.success("Thêm sản phẩm thành công!");
          navigate("/admin/products");
          hiddenSpinner();
        }
      } catch (error) {
        hiddenSpinner();
        console.log(error);
        message.error(error.response.data.message);
      }
    };
    postProduct();
  };

  const onFinishFailed = (errorInfo: unknown) => {
    console.log("Failed:", errorInfo);
  };

  const onCategoryChange: GetProp<typeof Checkbox.Group, 'onChange'> = (checkedValues) => {
    console.log('checked = ', checkedValues);
    selectedCategories = checkedValues;
  };

  const onReset = () => {
    form.resetFields();
  };

  return (
    <div className="w-full mx-auto px-5 pb-5">
      <h3 className=" text-2xl text-slate-700 text-center mt-6 mb-3">
        Thêm mới
      </h3>
      <Form
        form={form}
        layout="vertical"
        name="basic"
        labelCol={{ span: 12 }}
        wrapperCol={{ span: 24 }}
        style={{}}
        initialValues={{ remember: true }}
        onFinish={onFinish}
        onFinishFailed={onFinishFailed}
        autoComplete="off"
        requiredMark={false}
      >
        <div className="">
          <div className="grid grid-cols-2 gap-10">
            <div>
              <Form.Item
                label="Tên sản phẩm"
                name="name"
                rules={[{ required: true, message: "Vui lòng nhập trường này!" }]}
              >
                <Input />
              </Form.Item>

              {/*  */}
              <Form.Item
                label="Mô tả"
                name="description"
                rules={[{ required: true, message: "Vui lòng nhập trường này!" }]}
              >
                <TextArea rows={4} />
              </Form.Item>

              <Form.Item
                name="categories"
                label="Danh mục"
                rules={[{ required: true, message: "Vui lòng nhập trường này!" }]}
              >
                {/* <Checkbox.Group className="grid grid-cols-2 gap-y-2 items-center" options={checkboxCategoriesList} onChange={onCategoryChange} /> */}
                <Select
                  mode="multiple"
                  style={{ width: '100%' }}
                  placeholder="select one country"
                  onChange={onCategoryChange}
                  options={checkboxCategoriesList}
                />
              </Form.Item>
            </div>
            <div>
              {/* thumbnail */}
              <Form.Item
                label="Ảnh thu nhỏ"
                name="thumbnail"
                valuePropName="fileList"
                getValueFromEvent={(e) => Array.isArray(e) ? e : e && e.fileList}
                rules={[
                  { required: true, message: "Vui lòng chọn file!" },
                  {
                    validator(_, fileList) {
                      if (fileList && fileList.length > 0) {
                        const file = fileList[0];
                        if (file.size > 1024 * 1024) {
                          return Promise.reject("File tối đa 1MB");
                        }
                        if (!["image/jpeg", "image/jpg", "image/png"].includes(file.type)) {
                          return Promise.reject("File phải có định dạng png, jpg, jpeg!");
                        }
                        return Promise.resolve();
                      }
                      return Promise.resolve();
                    },
                  },
                ]}
              >
                <Upload.Dragger
                  listType="picture"
                  beforeUpload={() => false}
                  maxCount={1} // chỉ cho phép tải lên một file duy nhất
                >
                  <Button icon={<UploadOutlined />}>Click to upload</Button>
                </Upload.Dragger>
              </Form.Item>
              {/* gallery */}
              <Form.Item
                label="Bộ sưu tập hình ảnh"
                name="gallery"
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
                  beforeUpload={() => false}
                >
                  <Button icon={<UploadOutlined />}>Click to upload</Button>
                </Upload.Dragger>
              </Form.Item>
            </div>


          </div>

          <div className="">
            <Form.List name="fields">
              {(fields, { add, remove }) => {
                return (
                  <div className="">
                    {fields.map((field, index) => (
                      <div key={field.key}>
                        <Divider>Thuộc tính {index + 1}</Divider>
                        <div className="">
                          <div className="grid grid-cols-2 gap-4">
                            <div className="">
                              <Form.Item
                                name={[index, "name"]}
                                label="Tên thuộc tính"
                                rules={[{ required: true, message: "Vui lòng nhập trường này!" }]}
                              >
                                <Input placeholder="" />
                              </Form.Item>
                              <div className="grid grid-cols-3 gap-2">
                                <Form.Item
                                  name={[index, "price"]}
                                  label="Giá"
                                  rules={[{ required: true, message: "Vui lòng nhập trường này!" },
                                  {
                                    pattern: /^[0-9]*$/,
                                    message: "Vui lòng nhập số dương!",
                                  }
                                  ]}
                                >
                                  <Input placeholder="" />
                                </Form.Item>
                                <Form.Item
                                  name={[index, "stock"]}
                                  label="Tồn kho"
                                  rules={[{ required: true, message: "Vui lòng nhập trường này!", },
                                  {
                                    pattern: /^[0-9]*$/,
                                    message: "Vui lòng nhập số dương!",
                                  }
                                  ]}
                                >
                                  <Input placeholder="" />
                                </Form.Item>
                                <Form.Item
                                  name={[index, "discount"]}
                                  label="Giảm giá"
                                  rules={[{ required: true, message: "Vui lòng nhập trường này!" },
                                  {
                                    pattern: /^[0-9]*$/,
                                    message: "Vui lòng nhập số dương!",
                                  }
                                  ]}
                                >
                                  <Input placeholder="" />
                                </Form.Item>
                              </div>
                            </div>
                            <Form.Item
                              label="Ảnh"
                              name={[index, "image"]}
                              valuePropName="fileList"
                              getValueFromEvent={(e) => Array.isArray(e) ? e : e && e.fileList}
                              rules={[
                                { required: true, message: "Vui lòng chọn file!" },
                                {
                                  validator(_, fileList) {
                                    if (fileList && fileList.length > 0) {
                                      const file = fileList[0];
                                      if (file.size > 1024 * 1024) {
                                        return Promise.reject("File tối đa 1MB");
                                      }
                                      if (!["image/jpeg", "image/jpg", "image/png"].includes(file.type)) {
                                        return Promise.reject("File phải có định dạng png, jpg, jpeg!");
                                      }
                                      return Promise.resolve();
                                    }
                                    return Promise.resolve();
                                  },
                                },
                              ]}
                            >
                              <Upload.Dragger
                                listType="picture"
                                beforeUpload={() => false}
                                maxCount={1} // chỉ cho phép tải lên một file duy nhất
                              >
                                <Button icon={<UploadOutlined />}>Click to upload</Button>
                              </Upload.Dragger>
                            </Form.Item>
                          </div>

                        </div>

                        {fields.length > 0 ? (
                          <Button
                            className="dynamic-delete-button bg-red-500 text-white"
                            onClick={() => remove(field.name)}
                            icon={<MinusCircleOutlined />}
                          >
                            Xóa thuộc tính
                          </Button>
                        ) : null}
                      </div>
                    ))}
                    <Divider />
                    <Form.Item className="">
                      <Button
                        type="dashed"
                        onClick={() => add()}
                        style={{ width: "60%" }}
                        className="flex items-center justify-center border-green-500 text-green-500 m-auto"
                      >
                        <PlusOutlined /> Thêm thuộc tính
                      </Button>
                    </Form.Item>
                  </div>
                );
              }}
            </Form.List>
          </div>
          <Form.Item>
            <Space>
              <Button
                type="primary"
                htmlType="submit"
                className="text-white bg-green-500"
              >
                Thêm mới
              </Button>
              <Button htmlType="button" onClick={onReset}>
                Reset
              </Button>
            </Space>
          </Form.Item>
        </div>
      </Form>
    </div>
  );
};

export default AddProduct;
