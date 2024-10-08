// type Props = {};
import {
  Breadcrumb,
  Button,
  Divider,
  Form,
  Input,
  Select,
  Space,
  Switch,
  Table,
  Upload,
  message,
} from "antd";
import { UploadOutlined } from "@ant-design/icons";
import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { hiddenSpinner, showSpinner } from "../../../util/util";
import { https } from "../../../config/axios";
import TextArea from "antd/es/input/TextArea";
import { MinusCircleOutlined, PlusOutlined } from "@ant-design/icons";
import { Attribute, AttributeValue, Variant } from "../../../types/products";

const AddProduct: React.FC = () => {
  const navigate = useNavigate();
  const [checkboxCategoriesList, setCheckboxCategoriesList] = useState<any[]>([]);
  const [attributes, setAttributes] = useState([
    { name: "", values: [{ name: "" }] }
  ]);
  const [variants, setVariants] = useState<Variant[]>([]);
  const [attributeImages, setAttributeImages] = useState([]);
  const [featured, setFeatured] = useState(false);

  const [form] = Form.useForm();

  const addTierIndexToVariant = (data: Variant[], attributes: Attribute[]) => {
    return data?.map((variant: Variant) => {
      const tierIndex = variant.attributes.map((attrValue: string, index: number) => {
        // console.log('123')
        const attrIndex = attributes[index].values.findIndex((value: any) => value.name === attrValue);
        return attrIndex;
      });

      return {
        tier_index: tierIndex,
        attributes: variant.attributes,
        currentPrice: variant.currentPrice,
        originalPrice: variant.originalPrice,
        stock: variant.stock,
      };
    });
  };

  // Hàm tạo variants động dựa trên attributes
  const createVariants = (attributes: Attribute[]) => {

    // if (!attributes[1]?.name && attributes[1]?.values.length < 0) return variants;
    if (attributes.length < 1) return [];


    const attributeValues: AttributeValue[][] = attributes.map(attr => attr.values);
    // const attributeValues = attributes.map(attr => attr.values.length > 0 ? attr.values : [{ name: '' }]);
    const newVariants: any = [];

    const combineAttributes = (prefix: string[] = [], depth: number = 0) => {
      if (depth === attributeValues.length) {
        newVariants.push({
          attributes: prefix,
          originalPrice: '',
          currentPrice: '',
          stock: ''
        });
        return;
      }

      for (let value of attributeValues[depth]) {
        // Nếu `value.name` là `''`, nó vẫn sẽ được xử lý trong hàm combineAttributes
        combineAttributes([...prefix, value.name || ''], depth + 1);
      }
    };

    combineAttributes();

    return addTierIndexToVariant(newVariants, attributes);
  };

  const createColumns = (attributes: any) => {
    const columns = [];

    if (attributes[0]) {
      columns.push({
        title: attributes[0].name,
        dataIndex: 'attribute_0',
        width: '20%',
        render: (_: any, __: any, index: any) => {
          const attributeValue = variants[index]?.attributes ? variants[index].attributes[0] : null;
          const rowSpan = attributes[1]?.values.length || 1;
          // const attrValueIndex = index % rowSpan;
          // Calculate the correct attribute value index
          const attrValueIndex = Math.floor(index / (attributes[1]?.values.length || 1));
          // const currentValue = attributes[0]?.values[attrValueIndex] || {};

          return {
            children: (
              <>
                <div className="text-center text-lg">
                  <label htmlFor="">
                    {attributeValue}
                  </label>
                </div>

                <Form.Item
                  name={['imageAttribute', attrValueIndex]}
                  valuePropName="fileList"
                  getValueFromEvent={(e) => Array.isArray(e) ? e : e && e.fileList}
                  rules={[{ required: true, message: 'Vui lòng tải hình ảnh!' }]}
                >
                  <Upload
                    onChange={({ fileList }) => handleUploadImageAttributeChange(fileList, attrValueIndex)}
                    listType="picture"
                    beforeUpload={() => false}
                    maxCount={1}
                  // defaultFileList={currentValue.image ? [{ thumbUrl: currentValue.image }] : []}
                  >
                    <Button icon={<UploadOutlined />}>Tải lên</Button>
                    {/* <button style={{ border: 0, background: 'none' }} type="button">
                      <PlusOutlined />
                      <div style={{ marginTop: 8 }}>Upload</div>
                    </button> */}
                  </Upload>
                </Form.Item>
              </>
            ),
            props: {
              rowSpan: index % rowSpan === 0 ? rowSpan : 0,
            },
          };
        },
      });
    }

    if (attributes[1]) {
      columns.push({
        title: attributes[1].name,
        dataIndex: 'attribute_1',
        render: (_: any, __: any, index: any) => {
          const attributeValue = variants[index]?.attributes ? variants[index].attributes[1] : null;

          return (
            <div className="text-center text-lg">
              <label htmlFor="">
                {attributeValue}
              </label>
            </div>
          );
        },
      });
    }

    columns.push(
      {
        title: 'Giá gốc',
        dataIndex: 'originalPrice',
        render: (_: any, __: any, index: any) => (
          <Form.Item
            name={['variants', index, 'originalPrice']}
            initialValue={variants[index]?.originalPrice}
            rules={[{ required: true, message: "Vui lòng nhập trường này!" },
            {
              pattern: /^[0-9]*$/,
              message: "Vui lòng nhập số dương!",
            },
            {
              validator: (_, value) => {
                if (value && Number(value) <= 0) {
                  return Promise.reject(new Error("Giá phải lớn hơn 0!"));
                }
                return Promise.resolve();
              }
            }
            ]}
          >
            <Input
              placeholder="Giá gốc"
              onChange={e => handleInputChange(e.target.value, index, 'originalPrice')}
            />
          </Form.Item>
        ),
      },
      {
        title: 'Giá khuyến mãi',
        dataIndex: 'currentPrice',
        render: (_: any, __: any, index: any) => (
          <Form.Item
            name={['variants', index, 'currentPrice']}
            initialValue={variants[index]?.currentPrice}
            rules={[{ required: true, message: "Vui lòng nhập trường này!" },
            {
              pattern: /^[0-9]*$/,
              message: "Vui lòng nhập số dương!",
            },
            {
              validator: (_, value) => {
                if (value && Number(value) <= 0) {
                  return Promise.reject(new Error("Giá phải lớn hơn 0!"));
                }
                const originalPrice = variants[index]?.originalPrice;
                if (value && originalPrice && Number(value) > Number(originalPrice)) {
                  return Promise.reject(new Error("Giá khuyến mãi không được lớn hơn giá gốc!"));
                }
                return Promise.resolve();
              }
            }
            ]}
          >
            <Input
              placeholder="Giá khuyến mãi"
              onChange={e => handleInputChange(e.target.value, index, 'currentPrice')}
            />
          </Form.Item>
        ),
      },
      {
        title: 'Kho hàng',
        dataIndex: 'stock',
        render: (_: any, __: any, index: any) => (
          <Form.Item
            name={['variants', index, 'stock']}
            initialValue={variants[index]?.stock}
            rules={[{ required: true, message: 'Vui lòng nhập kho hàng!' }]}
          >
            <Input
              placeholder="Kho hàng"
              onChange={e => handleInputChange(e.target.value, index, 'stock')}
            />
          </Form.Item>
        ),
      }
    );

    return columns;
  };




  const handleInputAttributeNameChange = (value: any, index: any) => {
    setAttributes(prevAttributes => {
      const newAttributes = [...prevAttributes];
      // Kiểm tra và đảm bảo rằng newAttributes[index] tồn tại và là một đối tượng
      if (newAttributes[index]) {
        if (!newAttributes[index].hasOwnProperty('name')) {
          newAttributes[index].name = '';
        }
        newAttributes[index].name = value;
      } else {
        // Nếu newAttributes[index] không tồn tại, khởi tạo nó
        newAttributes[index] = { name: value, values: [] };
      }
      return newAttributes;
    });
    // console.log(attributes, 'attributes');
  };

  const handleInputAttributeValueChange = (value: any, fieldIndex: any, valueIndex: any, field: any) => {
    // console.log(value, fieldIndex, valueIndex, field)
    setAttributes(prevAttributes => {
      const newAttributes: any = [...prevAttributes];

      // Kiểm tra và khởi tạo đối tượng field nếu chưa tồn tại
      if (!newAttributes[fieldIndex]) {
        newAttributes[fieldIndex] = { values: [] };
      }

      // Kiểm tra và khởi tạo mảng values nếu chưa tồn tại
      if (!newAttributes[fieldIndex].values) {
        newAttributes[fieldIndex].values = [];
      }

      // Kiểm tra và khởi tạo đối tượng value nếu chưa tồn tại
      if (!newAttributes[fieldIndex].values[valueIndex]) {
        newAttributes[fieldIndex].values[valueIndex] = { name: "" };
      }

      // Cập nhật giá trị tại vị trí cụ thể
      newAttributes[fieldIndex].values[valueIndex][field] = value;

      // Thay vì xóa giá trị khi nó là chuỗi rỗng, chúng ta sẽ chỉ cập nhật giá trị
      if (value === "") {
        newAttributes[fieldIndex].values[valueIndex][field] = ""; // Giữ lại với giá trị rỗng
      }

      // console.log(attributes, 'attributes')
      // console.log(newAttributes, 'newAttributes')
      // console.log(variants, 'variants')

      // console.log(variants, 'handleInputAttributeValueChange')
      return newAttributes;
    });
  };


  const handleInputChange = (value: any, index: any, field: any) => {
    // console.log(variants, 'handleInputChange')
    // let updatedVariants; // Tạo biến để lưu trữ giá trị của newVariants
    // console.log(variants, 'variants')

    setVariants(prevVariants => {
      const newVariants: any = [...prevVariants];
      // console.log()
      newVariants[index][field] = value;
      // updatedVariants = newVariants; // Lưu giá trị của newVariants vào biến updatedVariants
      return newVariants;
    });

    // form.setFieldsValue({ variants: updatedVariants }); // Sử dụng updatedVariants để cập nhật form
    // console.log(variants, 'handleInputChange')
  };

  const handleUploadImageAttributeChange = (fileList: any, attrValueIndex: any) => {
    // console.log(attrValueIndex, 'attrValueIndex');
    setAttributeImages(prevImages => {
      const updatedImages: any = [...prevImages]; // Tạo một bản sao của mảng cũ
      updatedImages[attrValueIndex] = fileList; // Cập nhật mảng tại vị trí `attrValueIndex`
      return updatedImages;
    });
  };

  const fetchCategoryes = async () => {
    const { data } = await https.get("/categories?limit=100");
    setCheckboxCategoriesList(data.results.map((category: any) => ({
      label: category.name,
      value: category.id,
    })));
  };


  const mergeVariantsByOldTierIndex = (oldVariants: any, newVariants: any) => {
    return newVariants.map((newVariant: any) => {
      const matchingOldVariant = oldVariants.find((oldVariant: any) =>
        JSON.stringify(oldVariant.tier_index) === JSON.stringify(newVariant.tier_index)
      );

      if (matchingOldVariant) {
        // Giữ nguyên tên thuộc tính mới và hợp nhất các giá trị còn lại từ variant cũ
        return {
          ...newVariant,
          originalPrice: matchingOldVariant.originalPrice,
          currentPrice: matchingOldVariant.currentPrice,
          stock: matchingOldVariant.stock
        };
      } else {
        // Nếu không tìm thấy variant cũ phù hợp, trả về variant mới như là
        return newVariant;
      }
    });
  };

  const handleRemoveAttribute = (fieldIndex: number) => {
    setAttributes(prevAttributes => {
      const newAttributes = [...prevAttributes];
      newAttributes.splice(fieldIndex, 1);
      return newAttributes;
    });

    // console.log(attributes, 'attributes-HandleremoveAttribute')
  };

  const handleRemoveAttributeValue = (fieldIndex: number, valueIndex: number) => {
    setAttributes(prevAttributes => {
      const newAttributes = [...prevAttributes];

      // Xóa value tại valueIndex của attribute fieldIndex
      if (newAttributes[fieldIndex] && newAttributes[fieldIndex].values) {
        newAttributes[fieldIndex].values.splice(valueIndex, 1);
      }

      if (fieldIndex === 0) {
        // Cập nhật variants
        setVariants(prevVariants => {
          return prevVariants
            .filter((variant: any) => variant.tier_index[0] !== valueIndex) // Xóa những biến thể có tierIndex[0] bằng với fieldIndex
            .map((variant: any) => {
              if (variant.tier_index[0] > valueIndex) {
                variant.tier_index[0] -= 1; // Giảm tier_index[0] nếu lớn hơn fieldIndex
              }
              return variant;
            });
        });
      }

      if (fieldIndex === 1) {


        // Cập nhật variants
        setVariants(prevVariants => {
          return prevVariants
            .filter((variant: any) => variant.tier_index[1] !== valueIndex) // Xóa những biến thể có tierIndex[1] bằng với valueIndex
            .map((variant: any) => {
              if (variant.tier_index[1] > valueIndex) {
                variant.tier_index[1] -= 1; // Giảm tier_index[1] nếu lớn hơn valueIndex
              }
              return variant;
            });
        });
      }


      return newAttributes;
    });

    // console.log(attributes, 'attributes-HandleremoveAttributeValue')
    // console.log(newAttributes, 'newAttributes-HandleremoveAttributeValue')

    // Nếu fieldIndex là 0, cập nhật attributeImage
    // console.log(fieldIndex, 'fieldIndex')
    // console.log(valueIndex, 'valueIndex')
    if (fieldIndex === 0) {
      setAttributeImages(prevAttributeImage => {
        const newAttributeImage = [...prevAttributeImage];
        // const newAttributeImage = Array.isArray(prevAttributeImage) ? [...prevAttributeImage] : [];
        newAttributeImage.splice(valueIndex, 1); // Xóa ảnh tương ứng
        return newAttributeImage;
      });
      // Xóa phần tử index trong getFormValues('imageAttribute')
      const currentImageAttributes = form.getFieldValue('imageAttribute') || [];
      if (Array.isArray(currentImageAttributes)) {
        currentImageAttributes.splice(valueIndex, 1); // Xóa phần tử tại valueIndex
        form.setFieldsValue({ imageAttribute: currentImageAttributes }); // Cập nhật lại giá trị trong form
      }
    }
  };

  useEffect(() => {
    fetchCategoryes();
    // form.setFieldsValue({ fields: [{ name: "", price: "", stock: "", discount: "", image: "" }] });
  }, []);

  // Cập nhật variants và columns khi attributes thay đổi
  useEffect(() => {
    // console.log(attributes, 'attributes-useeffect')
    // console.log(variants, 'variant-useeffect-event')
    const newVariants = createVariants(attributes);
    // console.log(newVariants, 'newVariants-useeffect')
    const mergedVariants = mergeVariantsByOldTierIndex(variants, newVariants);
    // console.log(mergedVariants, 'mergedVariants-useeffect')
    setVariants(mergedVariants);
    form.setFieldsValue({ variants: mergedVariants });
    // form.setFieldsValue({ variants: newVariants });
    // console.log(variants, 'after-useeffect')
    // const newColumns = createColumns(attributes);
    // setColumns(newColumns);
  }, [attributes]);


  const onFinish = (values: any) => {
    // console.log('Form values:', values);
    // console.log('attribute image', attributeImages);
    // console.log(attributeImages, 'attributeImages')
    let convertVariant: any[] = [];
    if (variants) {
      // console.log(variants, 'variants')
      const convertDataToDesiredFormat = (data: any, attributes: any) => {
        return data.map((variant: any) => {
          const tierIndex = variant.attributes.map((attrValue: any, index: number) => {
            // console.log('123')
            const attrIndex = attributes[index].values.findIndex((value: any) => value.name === attrValue);
            return attrIndex;
          });

          return {
            tier_index: tierIndex,
            currentPrice: variant.currentPrice,
            originalPrice: variant.originalPrice,
            stock: variant.stock
          };
        });
      };

      const convertedData = convertDataToDesiredFormat(variants, attributes);
      convertVariant = convertedData;
      // console.log('Converted data:', convertVariant);

    }


    const postProduct = async () => {
      showSpinner();

      const listFiles = values.gallery;
      // Chuyển object gồm các mảng sang mảng gồm các object
      const listFilesAttributeImage = [...attributeImages];
      const thumbnail: any = values.thumbnail;

      // Lấy originFileObj
      // console.log(listFiles, 'listFiles');
      const newArrayFiles = listFiles.map((file: any) => file.originFileObj);
      // console.log(listFilesAttributeImage, 'listFilesAttributeImage');
      const fileOriginAttributeImages = listFilesAttributeImage.map((imageFile: any) => imageFile[0].originFileObj);
      const thumbnailFile = thumbnail[0].originFileObj;

      const formData = new FormData();
      for (const file of newArrayFiles) {
        formData.append("images", file);
      }
      const formDataAttributeImage = new FormData();
      for (const file of fileOriginAttributeImages) {
        formDataAttributeImage.append("images", file);
      }
      const formDataThumbnail = new FormData();
      formDataThumbnail.append("images", thumbnailFile);


      try {
        const { data: dataGallery } = await https.post("/images", formData);
        const urlGallery: { url: string; publicId: string }[] = dataGallery.data;

        const { data: dataAttributeImage } = await https.post("/images", formDataAttributeImage);
        const urlAttributeImage: { url: string; publicId: string }[] = dataAttributeImage.data;

        const { data: dataThumbnail } = await https.post("/images", formDataThumbnail);
        const urlThumbnail: { url: string; publicId: string }[] = dataThumbnail.data;



        // console.log(urlGallery, 'urlGallery');
        // console.log(urlAttributeImage, 'urlAttributeImage');
        // console.log(urlThumbnail, 'urlThumbnail');

        const attributeData = values.attributes

        attributeData[0].values = attributeData[0].values.map((value: any, index: number) => {
          if (urlAttributeImage[index]) {
            return { ...value, image: urlAttributeImage[index].url };
          }
          return value; // Trả về giá trị ban đầu nếu không có ảnh tương ứng
        });

        // console.log(values, 'values');
        let urlVideo: any = null;

        if (values.video && values.video.length > 0) {
          const videoFile: any = values.video;
          const newVideoFile = videoFile[0].originFileObj;

          const formDataVideo = new FormData();
          formDataVideo.append("videos", newVideoFile);

          const { data: dataVideo } = await https.post("/videos", formDataVideo);
          const url: { url: string; publicId: string }[] = dataVideo.data;
          urlVideo = url;
        }

        // console.log(attributeData, 'atrtibuteData');

        // return;

        // console.log(urlVideo, 'urlVideo')

        const data = {
          name: values.name,
          description: values.description,
          gallery: urlGallery.map((image) => image.url),
          thumbnail: urlThumbnail[0].url,
          categories: values.categories,
          attributes: attributeData,
          shortDescription: values.shortDescription,
          // video: urlVideo[0].url,
          featured: featured,
          variants: convertVariant,
          ...(urlVideo ? { video: urlVideo[0].url } : {}), // Chỉ thêm trường video nếu urlVideo tồn tại
        };

        // console.log(data, 'dataFinal');

        // return;

        const res = await https.post("/products", data);
        if (res) {
          message.success("Thêm sản phẩm thành công!");
          navigate("/admin/products");
          hiddenSpinner();
        }
      } catch (error) {
        hiddenSpinner();
        console.log(error);
        message.error(error.response.data);
      }
    };
    postProduct();
  };

  const onFinishFailed = (errorInfo: unknown) => {
    console.log("Failed:", errorInfo);
  };

  const onReset = () => {
    form.resetFields();
  };

  // Step 1: Set up state for input values
  const [inputValues, setInputValues] = useState({
    originalPrice: '',
    currentPrice: '',
    stock: '',
  });

  // Step 3: Apply values to all variants
  const applyToAllVariants = () => {
    const newVariants = variants.map(variant => ({
      ...variant,
      originalPrice: inputValues.originalPrice,
      currentPrice: inputValues.currentPrice,
      stock: inputValues.stock,
    }));
    form.setFieldsValue({ variants: newVariants });

    setVariants(newVariants);
  };
  return (
    <div className="w-full mx-auto">
      <Breadcrumb style={{ margin: '16px 0' }}>
        <Breadcrumb.Item><Link to="/admin">Trang chủ</Link></Breadcrumb.Item>
        <Breadcrumb.Item><Link to="/admin/products">Sản phẩm</Link></Breadcrumb.Item>
        <Breadcrumb.Item>Thêm sản phẩm</Breadcrumb.Item>
      </Breadcrumb>
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
      // onFieldsChange={onFieldsChange}
      >
        <div className="">
          <h2 className="text-[20px] my-5 font-medium">Thông tin sản phẩm</h2>
          <div className="grid xl:grid-cols-2 xl:gap-10 px-10">
            <div>
              <Form.Item
                label="Tên sản phẩm"
                name="name"
                rules={[{ required: true, message: "Vui lòng nhập trường này!" }]}
              >
                <Input />
              </Form.Item>
              <Form.Item
                label="Mô tả ngắn"
                name="shortDescription"
                rules={[{ required: true, message: "Vui lòng nhập trường này!" }]}
              >
                <TextArea rows={4} />
              </Form.Item>
              <Form.Item
                label="Mô tả đầy đủ"
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
              <div className="mb-1">
                <h3 className="font-normal mb-1">Sản phẩm hot</h3>
                <Switch onChange={(checked: boolean) => {
                  setFeatured(checked);
                  // console.log(checked, 'checked')
                  // console.log(featured, 'featured')
                }} />
              </div>
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
                        if (!["image/jpeg", "image/jpg", "image/png", "image/webp"].includes(file.type)) {
                          return Promise.reject("File phải có định dạng png, jpg, jpeg, webp!");
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
                  <Button icon={<UploadOutlined />}>Tải lên</Button>
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
                          if (!["image/jpeg", "image/jpg", "image/png", "image/webp"].includes(file.type)) {
                            return Promise.reject("File phải có định dạng png, jpg, jpeg, webp!");
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
                  <Button icon={<UploadOutlined />}>Tải lên</Button>
                </Upload.Dragger>
              </Form.Item>
              <Form.Item
                label="Thêm video"
                name="video"
                valuePropName="fileList"
                getValueFromEvent={(e) => Array.isArray(e) ? e : e && e.fileList}
                rules={[
                  {
                    validator(_, fileList) {
                      if (fileList && fileList.length > 0) {
                        const file = fileList[0];
                        if (file.size > 1024 * 1024 * 10) { // Giới hạn kích thước file là 10MB
                          return Promise.reject("File tối đa 10MB");
                        }
                        if (!["video/mp4", "video/avi", "video/mov"].includes(file.type)) { // Các định dạng video được phép
                          return Promise.reject("File phải có định dạng mp4, avi, mov!");
                        }
                        return Promise.resolve();
                      }
                      return Promise.resolve();
                    },
                  },
                ]}
              >
                <Upload.Dragger listType="picture" beforeUpload={() => false} maxCount={1}>
                  <Button icon={<UploadOutlined />}>Tải lên</Button>
                </Upload.Dragger>
              </Form.Item>
            </div>
          </div>

          {/* {showPriceAndStock && (
            <div>
              <Form.Item
                name="price"
                label="Giá"
                rules={[{ required: true, message: 'Vui lòng nhập giá!' }]}
              >
                <Input placeholder="Giá" />
              </Form.Item>
              <Form.Item
                name="stock"
                label="Kho hàng"
                rules={[{ required: true, message: 'Vui lòng nhập kho hàng!' }]}
              >
                <Input placeholder="Kho hàng" />
              </Form.Item>
            </div>
          )} */}

          <Divider />
          <h2 className="text-[20px] mb-8 font-medium">Thông tin bán hàng</h2>
          <div className="px-10 ">
            <div className="mb-4">
              <h2 className="text-[18px]">Phân loại hàng</h2>
            </div>
            <div className="w-full">

              <Form.List
                name="attributes"
                initialValue={attributes}
              >
                {(fields, { add, remove }) => (
                  <div>

                    {fields.map((field, fieldIndex) => (
                      <div key={field.key} className="mb-10 bg-gray-50 p-5">
                        <div className="w-[600px]">
                          {fields.length > 1 && (
                            <Button
                              className="dynamic-delete-button bg-red-800 text-white my-4"
                              onClick={() => {
                                // console.log(fields, 'fields')
                                // console.log(field.name, 'field.name')
                                remove(field.name);
                                // console.log(field.name, 'field.name')
                                // console.log(fieldIndex, 'fieldIndex')
                                handleRemoveAttribute(fieldIndex); // Hàm mới để xử lý xóa thuộc tính
                                // console.log(variants, 'variants-deleteAttribute')
                                // console.log(attributes, 'attribute-deleteAttribute')

                              }}
                              icon={<MinusCircleOutlined />}
                            >
                              Xóa phân loại hàng
                            </Button>
                          )}
                          <div className="flex gap-4 mt-4">
                            <div className="w-[130px]">
                              <label htmlFor="" className="text-[16px] font-normal max-w-[130px]">Nhóm phân loại {fieldIndex + 1}</label>
                            </div>
                            <div className="">
                              <Form.Item
                                name={[field.name, "name"]}
                                rules={[{ required: true, message: "Vui lòng nhập trường này!" }]}
                              >
                                <Input onChange={(e) => handleInputAttributeNameChange(e.target.value, fieldIndex)} placeholder="Tên phân loại hàng" />
                              </Form.Item>
                            </div>
                          </div>
                        </div>

                        <Form.List name={[field.name, "values"]}>
                          {(valueFields, { add: addValue, remove: removeValue }) => (
                            <div className="flex gap-4 mt-5">
                              {valueFields.length < 20 &&
                                <div className="flex flex-col w-[130px]">
                                  <label className="text-[16px] font-normal" htmlFor="">Phân loại hàng</label>
                                  <Button className="mt-2" type="dashed" onClick={() => {
                                    // console.log(variants, 'addValue')

                                    addValue()
                                    // Thêm một object với name='' vào cuối mảng values
                                    setAttributes(prevAttributes => {
                                      const newAttributes = [...prevAttributes];
                                      newAttributes[fieldIndex].values.push({ name: "" });
                                      return newAttributes;
                                    });
                                  }
                                  }
                                    icon={<PlusOutlined />}>
                                    Thêm
                                  </Button>
                                </div>
                              }
                              <div className="grid grid-cols-4 gap-4">
                                {valueFields.map((valueField, valueIndex) => (
                                  <div key={valueField.key} className="">
                                    <Form.Item
                                      name={[valueField.name, "name"]}
                                      label={`Giá trị ${valueIndex + 1}`}
                                      rules={[{ required: true, message: "Vui lòng nhập trường này!" }]}
                                    >
                                      <Input
                                        placeholder={`Giá trị ${valueIndex + 1}`}
                                        onChange={(e) => {
                                          // console.log(valueField.name, 'valueField.name')
                                          handleInputAttributeValueChange(e.target.value, fieldIndex, valueIndex, "name")
                                        }}
                                      />
                                    </Form.Item>

                                    <div className="">
                                      {
                                        valueFields.length > 1 &&
                                        <Button
                                          className="dynamic-delete-button bg-red-500 text-white"
                                          onClick={() => {

                                            removeValue(valueField.name);
                                            handleInputAttributeValueChange("", fieldIndex, valueIndex, "name"); // Cập nhật attributes khi xóa
                                            handleRemoveAttributeValue(fieldIndex, valueIndex); // Hàm mới để xử lý xóa giá trị thuộc tính
                                            // console.log(variants, 'deleteValue')
                                          }}
                                          icon={<MinusCircleOutlined />}
                                        >
                                          Xóa
                                        </Button>
                                      }
                                    </div>
                                  </div>
                                ))}
                              </div>
                            </div>
                          )}
                        </Form.List>
                      </div>
                    ))}

                    {fields.length < 2 &&

                      <Button className="mb-4" type="dashed" onClick={() => {
                        add();
                        // Using setAttributes to ensure the new attribute is added at the correct position (index 1)
                        setAttributes(prevAttributes => {
                          const newAttributes = [...prevAttributes];

                          // Insert the new attribute at index 1 if it doesn't exist already
                          if (newAttributes.length < 2) {
                            newAttributes.push({ name: '', values: [{ name: "" }] });
                          } else {
                            // If an attribute at index 1 already exists, you might want to replace or ignore
                            // depending on your specific logic. Here we ensure that it exists.
                            newAttributes[1] = newAttributes[1] || { name: '', values: [{ name: "" }] };
                          }

                          // Cập nhật form để hiển thị các ô input tương ứng
                          form.setFieldsValue({
                            attributes: newAttributes
                          });

                          return newAttributes;
                        });

                        // console.log(attributes, 'attribute-addAttributeEvent');
                        // console.log(variants, 'variant-addAttributeEvent');
                      }} icon={<PlusOutlined />}>
                        Thêm phân loại hàng
                      </Button>
                    }
                  </div>
                )}
              </Form.List>
            </div>
          </div>


          {/* {
            containsDefaultValues(attributes) ? null :
          } */}
          <div className="px-10 mt-12">
            <div className="mb-4">
              <h2 className="text-[18px]">Danh sách phân loại hàng</h2>
            </div>
            <div className="w-full">
              <div className=" flex gap-1 mb-2">
                <input
                  className="flex-1 p-2 border-[1px] h-10"
                  type="number"
                  placeholder="Giá gốc"
                  value={inputValues.originalPrice}
                  onChange={(e) => setInputValues({ ...inputValues, originalPrice: e.target.value })}
                />
                <input
                  className="flex-1 p-2 border-[1px] h-10"
                  type="text"
                  placeholder="Giá khuyễn mãi"
                  value={inputValues.currentPrice}
                  onChange={(e) => setInputValues({ ...inputValues, currentPrice: e.target.value })}
                />
                <input
                  className="flex-1 p-2 border-[1px] h-10"
                  type="text"
                  placeholder="Kho hàng"
                  value={inputValues.stock}
                  onChange={(e) => setInputValues({ ...inputValues, stock: e.target.value })}
                />
                <button
                  type="button"
                  className="flex-1 p-2 w-12 h-10 bg-yellow-400 text-white"
                  onClick={applyToAllVariants}
                >
                  Áp dụng cho tất cả phân loại
                </button>
              </div>
              <Table
                // className="custom-table"
                columns={createColumns(attributes)}
                dataSource={variants}
                pagination={false}
                bordered
                rowKey={(record, index) => index !== undefined ? index : record.id}
              />

            </div>
          </div>

          <Form.Item className="mt-6">
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