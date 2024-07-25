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

  // let selectedCategories: any = [];

  const fetchCategoryes = async () => {
    const { data } = await https.get("/categories");
    setCheckboxCategoriesList(data.results.map((category: any) => ({
      label: category.name,
      value: category.id,
    })));
  };
  useEffect(() => {
    fetchCategoryes();
    // form.setFieldsValue({ fields: [{ name: "", price: "", stock: "", discount: "", image: "" }] });
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

  // const onCategoryChange: GetProp<typeof Checkbox.Group, 'onChange'> = (checkedValues) => {
  //   console.log('checked = ', checkedValues);
  //   selectedCategories = checkedValues;
  // };

  const onReset = () => {
    form.resetFields();
  };

  const columns = [
    {
      title: 'Màu sắc',
      dataIndex: 'color',
      render: (text, _, index) => (
        <Form.Item
          name={['variants', index, 'color']}
          rules={[{ required: true, message: 'Vui lòng nhập màu sắc!' }]}
        >
          <Input placeholder="Màu sắc" />
        </Form.Item>
      ),
    },
    {
      title: 'Size',
      dataIndex: 'size',
      render: (text, _, index) => (
        <Form.Item
          name={['variants', index, 'size']}
          rules={[{ required: true, message: 'Vui lòng nhập size!' }]}
        >
          <Input placeholder="Size" />
        </Form.Item>
      ),
    },
    {
      title: 'Giá',
      dataIndex: 'price',
      render: (text, _, index) => (
        <Form.Item
          name={['variants', index, 'price']}
          rules={[{ required: true, message: 'Vui lòng nhập giá!' }]}
        >
          <Input placeholder="Giá" />
        </Form.Item>
      ),
    },
    {
      title: 'Kho hàng',
      dataIndex: 'stock',
      render: (text, _, index) => (
        <Form.Item
          name={['variants', index, 'stock']}
          rules={[{ required: true, message: 'Vui lòng nhập kho hàng!' }]}
        >
          <Input placeholder="Kho hàng" />
        </Form.Item>
      ),
    },
    {
      title: 'Hình ảnh',
      dataIndex: 'image',
      render: (text, _, index) => (
        <Form.Item
          name={['variants', index, 'image']}
          valuePropName="fileList"
          getValueFromEvent={(e) => Array.isArray(e) ? e : e && e.fileList}
          rules={[{ required: true, message: 'Vui lòng tải hình ảnh!' }]}
        >
          <Upload
            listType="picture"
            beforeUpload={() => false}
          >
            <Button icon={<UploadOutlined />}>Tải lên</Button>
          </Upload>
        </Form.Item>
      ),
    },
    {
      title: 'Hành động',
      dataIndex: 'action',
      render: (text, record, index) => (
        <Button
          danger
          icon={<MinusCircleOutlined />}
          onClick={() => removeVariant(index)}
        >
          Xóa
        </Button>
      ),
    },
  ];

  const addVariant = () => {
    const variants = form.getFieldValue('variants') || [];
    form.setFieldsValue({
      variants: [...variants, { color: '', size: '', price: '', stock: '', image: [] }],
    });
  };

  const removeVariant = (index) => {
    const variants = form.getFieldValue('variants');
    variants.splice(index, 1);
    form.setFieldsValue({ variants });
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
        initialValues={{ remember: true }}
        onFinish={onFinish}
        onFinishFailed={onFinishFailed}
        autoComplete="off"
        requiredMark={false}
      >
        <div className="">
          <div className="grid xl:grid-cols-2 xl:gap-10">
            <div>
              <Form.Item
                label="Tên sản phẩm"
                name="name"
                rules={[{ required: true, message: "Vui lòng nhập trường này!" }]}
              >
                <Input />
              </Form.Item>
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
                <Select
                  mode="multiple"
                  style={{ width: '100%' }}
                  placeholder="Chọn danh mục"
                  options={checkboxCategoriesList}
                />
              </Form.Item>
            </div>
            <div>
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
                  maxCount={1}
                >
                  <Button icon={<UploadOutlined />}>Click to upload</Button>
                </Upload.Dragger>
              </Form.Item>
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
                          if (!["image/jpeg", "image/jpg", "image/png"].includes(file.type)) {
                            return Promise.reject("File phải có định dạng png, jpg, jpeg!");
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
            <Form.List
              name="attributes"
              initialValue={[
                { name: "Size", values: [{ name: "", image: [] }] },
                { name: "Color", values: [{ name: "" }] }
              ]}
            >
              {(fields, { add, remove }) => (
                <div>
                  <h2 className="text-[20px] my-5 font-medium">Phân loại hàng</h2>

                  {fields.map((field, index) => (
                    <div key={field.key} className="mb-10 bg-slate-50 p-5">
                      {/* <Divider>Thuộc tính {index + 1}</Divider> */}
                      <label htmlFor="" className="text-[16px] font-normal">Nhóm phân loại {index + 1}</label>
                      <div className="flex justify-between">
                        <Form.Item
                          name={[field.name, "name"]}
                          // label="Phân loại hàng"
                          rules={[{ required: true, message: "Vui lòng nhập trường này!" }]}
                        >
                          <Input placeholder="Tên thuộc tính" />
                        </Form.Item>
                        {fields.length > 1 && (
                          <Button
                            className="dynamic-delete-button bg-red-800 text-white my-4"
                            onClick={() => remove(field.name)}
                            icon={<MinusCircleOutlined />}
                          >
                            Xóa thuộc tính
                          </Button>
                        )}
                      </div>

                      <Form.List name={[field.name, "values"]}>
                        {(valueFields, { add: addValue, remove: removeValue }) => (
                          <div>
                            <Button type="dashed" onClick={() => addValue()} icon={<PlusOutlined />}>
                              Thêm giá trị
                            </Button>
                            <div className="grid grid-cols-4 gap-4">
                              {valueFields.map((valueField, valueIndex) => (
                                <div key={valueField.key} className="">
                                  <Form.Item
                                    name={[valueField.name, "name"]}
                                    label={`Giá trị ${valueIndex + 1}`}
                                    rules={[{ required: true, message: "Vui lòng nhập trường này!" }]}
                                  >
                                    <Input placeholder={`Giá trị ${valueIndex + 1}`} />
                                  </Form.Item>
                                  {
                                    <Form.Item
                                      name={[valueField.name, "image"]}
                                      label="Hình ảnh"
                                      valuePropName="fileList"
                                      getValueFromEvent={(e) => Array.isArray(e) ? e : e && e.fileList}
                                      rules={[
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
                                        maxCount={1}
                                      >
                                        <Button icon={<UploadOutlined />}>Click to upload</Button>
                                      </Upload.Dragger>
                                    </Form.Item>
                                  }
                                  <div className="">
                                    <Button
                                      className="dynamic-delete-button bg-red-500 text-white"
                                      onClick={() => removeValue(valueField.name)}
                                      icon={<MinusCircleOutlined />}
                                    >
                                      Xóa giá trị
                                    </Button>

                                  </div>
                                </div>
                              ))}
                            </div>

                          </div>
                        )}
                      </Form.List>

                    </div>
                  ))}
                  <Button type="dashed" onClick={() => add()} icon={<PlusOutlined />}>
                    Thêm thuộc tính
                  </Button>
                </div>
              )}
            </Form.List>
          </div>

          <div className="">
            <Form.List name="variants">
              {(variantFields, { add: addVariant, remove: removeVariant }) => (
                <div>
                  {variantFields.map((variantField, index) => (
                    <div key={variantField.key}>
                      <Divider>Biến thể {index + 1}</Divider>
                      <Form.Item
                        name={[variantField.name, "tier_index"]}
                        label="Chỉ số liên kết"
                        rules={[{ required: true, message: "Vui lòng nhập trường này!" }]}
                      >
                        <Input placeholder="Chỉ số liên kết (ví dụ: [0, 0])" />
                      </Form.Item>
                      <Form.Item
                        name={[variantField.name, "currentPrice"]}
                        label="Giá hiện tại"
                        rules={[{ required: true, message: "Vui lòng nhập trường này!" }]}
                      >
                        <Input placeholder="Giá hiện tại" />
                      </Form.Item>
                      <Form.Item
                        name={[variantField.name, "originalPrice"]}
                        label="Giá gốc"
                        rules={[{ required: true, message: "Vui lòng nhập trường này!" }]}
                      >
                        <Input placeholder="Giá gốc" />
                      </Form.Item>
                      <Form.Item
                        name={[variantField.name, "stock"]}
                        label="Tồn kho"
                        rules={[{ required: true, message: "Vui lòng nhập trường này!" }]}
                      >
                        <Input placeholder="Tồn kho" />
                      </Form.Item>
                      <Button
                        className="dynamic-delete-button bg-red-500 text-white"
                        // onClick={() => remove(variantField.name)}
                        icon={<MinusCircleOutlined />}
                      >
                        Xóa biến thể
                      </Button>
                    </div>
                  ))}
                  <Button type="dashed" onClick={() => addVariant()} icon={<PlusOutlined />}>
                    Thêm biến thể
                  </Button>
                </div>
              )}
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
