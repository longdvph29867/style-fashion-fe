// type Props = {};
/* eslint-disable @typescript-eslint/no-explicit-any */
import {
    Breadcrumb,
    Button,
    Divider,
    Form,
    Image,
    Input,
    Space,
    Table,
    Upload,
    message,
} from "antd";
import { UploadOutlined } from "@ant-design/icons";
import React, { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { hiddenSpinner, showSpinner } from "../../../util/util";
import { https } from "../../../config/axios";
import { MinusCircleOutlined, PlusOutlined } from "@ant-design/icons";
import { Attribute, TieredVariant } from "../../../types/products";

const AddProduct: React.FC = () => {
    const navigate = useNavigate();
    const { id } = useParams();
    let [attributes, setAttributes] = useState([
    ]);
    // const [showPriceAndStock, setShowPriceAndStock] = useState(true);
    let [variants, setVariants] = useState<any>([]);
    const [attributeImages, setAttributeImages] = useState([]);
    const [product, setProduct] = useState<any>({}); // product detail
    const [originalVariants, setOriginalVariants] = useState([]);
    const [isInputChanged, setIsInputChanged] = useState(false);

    const [form] = Form.useForm();


    const fetchProductDetail = async () => {
        showSpinner();
        try {
            const { data } = await https.get(`/products/${id}`);
            setProduct(data);
            // console.log(data)
            const productDetail: any = data;
            // setOriginalVariants(data.variants);  // Lưu variants gốc
            form.setFieldValue('attributes', productDetail.attributes);
            setAttributes(productDetail.attributes);
            // setVariants(productDetail.variants);
            // console.log(attributes, 'attributes')
            // console.log(variants, 'variants')
            // form.setFieldsValue({
            //     fields: productDetail.attributes.map((attribute: any, index: number) => ({
            //         name: attribute.name,
            //         price: attribute.price,
            //         stock: attribute.stock,
            //         discount: attribute.discount,
            //         image: [{
            //             uid: index,
            //             name: attribute.image,
            //             status: 'done',
            //             url: attribute.image,
            //             type: `image/${attribute.image.split('.').pop()}`
            //         }]
            //     }))
            // });

            // console.log(productDetail.thumbnail.split('.').pop(), 'type thumbnail')
            hiddenSpinner();
        } catch (error) {
            hiddenSpinner();
            console.log(error);
        }
    };
    useEffect(() => {
        fetchProductDetail();
    }, [id]);

    // trả về đúng data phù hợp với logic addproduct
    const transformTierIndexToValues = (tierIndex: TieredVariant[], attributes: Attribute[]) => {
        return tierIndex.map(id => {
            for (let attribute of attributes) {
                const value = attribute.values.find((value: any) => value._id === id);
                if (value) {
                    return value.name;
                }
            }
            return null; // In case no match is found
        });
    };

    const mapImagesToFormFields = (attributes: Attribute[]) => {
        if (!attributes || !attributes[0] || !attributes[0].values) {
            console.error('Invalid attributes data');
            return;
        }

        const imageFields = attributes[0].values.map((value: any, index: number) => ({
            [`imageAttribute[${index}]`]: [{
                uid: value._id,
                name: `image_${index + 1}.${value.image?.split('.').pop()}`,
                status: 'done',
                url: value.image,
                type: `image/${value.image?.split('.').pop()}`
            }]
        }));

        // Đảm bảo đúng định dạng để form.setFieldsValue hiểu được
        const mergedImageFields: any = {};
        imageFields.forEach(field => {
            Object.keys(field).forEach(key => {
                mergedImageFields[key] = field[key];
            });
        });

        form.setFieldsValue({
            imageAttribute: Object.values(mergedImageFields)
        });

        // console.log(form.getFieldValue('imageAttribute'), 'imageAttribute');
    };

    useEffect(() => {
        if (product) {
            const transformedVariants = product?.variants?.map((variant: any) => ({
                attributes: transformTierIndexToValues(variant.tier_index, product.attributes),
                stock: variant.stock,
                originalPrice: variant.originalPrice,
                currentPrice: variant.currentPrice
            }));
            setOriginalVariants(addTierIndexToVariant(transformedVariants, product?.attributes));
            setVariants(addTierIndexToVariant(transformedVariants, product?.attributes));
            // console.log(transformedVariants, 'transformedVariants')

            setAttributeImages(product?.attributes?.[0].values.map((value: any) => value.image));

            // const mapImagesToFormFields = (attributes) => {
            //     if (!attributes || !attributes[0] || !attributes[0].values) {
            //         console.error('Invalid attributes data');
            //         return;
            //     }

            //     const imageFields = attributes[0].values.map((value, index) => ({
            //         [index]: {
            //             imageAttribute: [
            //                 {
            //                     uid: value._id,
            //                     name: `image_${index + 1}.${value.image?.split('.').pop()}`,
            //                     status: 'done',
            //                     url: value.image,
            //                     type: `image/${value.image?.split('.').pop()}`
            //                 }
            //             ]
            //         }
            //     }));

            //     console.log(form.getFieldValue(['imageAttribute']), 'imageAttribute');
            //     const mergedImageFields = Object.assign({}, ...imageFields);

            //     form.setFieldsValue(mergedImageFields);
            // };



            // Sau khi lấy được data sản phẩm, gọi hàm này
            mapImagesToFormFields(product.attributes);

        }
    }, [product]);

    const addTierIndexToVariant = (data: any, attributes: Attribute[]) => {
        return data?.map((variant: any) => {
            const tierIndex = variant.attributes.map((attrValue: any, index: number) => {
                // console.log('123')
                const attrIndex = attributes[index].values.findIndex(value => value.name === attrValue);
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
    // const createVariants = (attributes) => {
    //     // if (!attributes[1]?.name && attributes[1]?.values.length < 0) return variants;
    //     if (attributes.length < 1) return [];


    //     const attributeValues = attributes.map(attr => attr.values);
    //     // const attributeValues = attributes.map(attr => attr.values.length > 0 ? attr.values : [{ name: '' }]);
    //     const newVariants = [];

    //     const combineAttributes = (prefix = [], depth = 0) => {
    //         if (depth === attributeValues.length) {
    //             newVariants.push({
    //                 attributes: prefix,
    //                 originalPrice: '',
    //                 currentPrice: '',
    //                 stock: ''
    //             });
    //             return;
    //         }

    //         for (let value of attributeValues[depth]) {
    //             combineAttributes([...prefix, value.name], depth + 1);
    //         }
    //     };

    //     combineAttributes();
    //     return newVariants;
    // };

    const createVariants = (attributes: Attribute[]) => {

        // if (!attributes[1]?.name && attributes[1]?.values.length < 0) return variants;
        if (attributes.length < 1) return [];


        const attributeValues = attributes.map(attr => attr.values);
        // const attributeValues = attributes.map(attr => attr.values.length > 0 ? attr.values : [{ name: '' }]);
        const newVariants: any = [];

        const combineAttributes = (prefix: any = [], depth = 0) => {
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

    const createColumns = (attributes: Attribute[]) => {
        const columns = [];

        if (attributes[0]) {
            columns.push({
                title: attributes[0].name,
                dataIndex: 'attribute_0',
                width: '20%',
                render: (_: any, __: any, index: number) => {
                    const attributeValue = variants[index]?.attributes ? variants[index].attributes[0] : null;
                    const rowSpan = attributes[1]?.values.length || 1;
                    // console.log(rowSpan, 'rowSpan')
                    // const attrValueIndex = index % rowSpan;
                    // Calculate the correct attribute value index
                    const attrValueIndex = Math.floor(index / (attributes[1]?.values.length || 1));
                    // const attrValueIndex = Math.floor(index / rowSpan);

                    return {
                        children: (
                            <>
                                <div className="text-center text-lg">
                                    <label htmlFor="">
                                        {attributeValue}
                                    </label>
                                </div>

                                <Form.Item
                                    // name={[attrValueIndex, 'imageAttribute']}
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
                                    // defaultFileList={currentValue.image}

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
                render: (_: any, __: any, index: number) => {
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
                render: (_: any, __: any, index: number) => (
                    <Form.Item
                        name={['variants', index, 'originalPrice']}
                        initialValue={variants[index]?.originalPrice}
                        rules={[{ required: true, message: "Vui lòng nhập trường này!" },
                        {
                            pattern: /^[0-9]*$/,
                            message: "Vui lòng nhập số dương!",
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
                render: (_: any, __: any, index: number) => (
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
                render: (_: any, __: any, index: number) => (
                    <Form.Item
                        name={['variants', index, 'stock']}
                        initialValue={variants[index]?.stock}
                        rules={[{ required: true, message: "Vui lòng nhập trường này!" },
                        {
                            pattern: /^[0-9]*$/,
                            message: "Vui lòng nhập số dương!",
                        }
                        ]}
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

    const handleInputAttributeNameChange = (value: any, index: number) => {
        if (isInputChanged === false) {
            setIsInputChanged(true);
        }
        setAttributes(prevAttributes => {
            const newAttributes: any = [...prevAttributes];
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
        if (isInputChanged === false) {
            setIsInputChanged(true);
        }
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

    // input ở phân loại hàng
    const handleInputChange = (value: any, index: number, field: any) => {
        if (isInputChanged === false) {
            setIsInputChanged(true);
        }
        // console.log(variants, 'handleInputChange')
        // console.log(variants, 'variants')

        setVariants((prevVariants: any) => {
            const newVariants = [...prevVariants];
            // console.log()
            newVariants[index][field] = value;
            // updatedVariants = newVariants; // Lưu giá trị của newVariants vào biến updatedVariants
            return newVariants;
        });

        // form.setFieldsValue({ variants: updatedVariants }); // Sử dụng updatedVariants để cập nhật form
        // console.log(variants, 'handleInputChange')
    };

    const handleUploadImageAttributeChange = (fileList: any, attrValueIndex: number) => {
        // console.log(attrValueIndex, 'attrValueIndex');
        setAttributeImages(prevImages => {
            const updatedImages: any = [...prevImages]; // Tạo một bản sao của mảng cũ
            updatedImages[attrValueIndex] = fileList; // Cập nhật mảng tại vị trí `attrValueIndex`
            return updatedImages;
        });
    };
    // const fetchCategoryes = async () => {
    //     const { data } = await https.get("/categories");
    //     // setCheckboxCategoriesList(data.results.map((category: any) => ({
    //     //     label: category.name,
    //     //     value: category.id,
    //     // })));
    // };

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
        if (isInputChanged === false) {
            setIsInputChanged(true);
        }

        if (fieldIndex === 0) {
            // Reset attributeImages
            setAttributeImages([]);

            // Reset lại giá trị của imageAttribute trong form
            form.setFieldsValue({ imageAttribute: [] });
        }

        setAttributes(prevAttributes => {
            const newAttributes = [...prevAttributes];
            newAttributes.splice(fieldIndex, 1);



            return newAttributes;
        });

        // console.log(attributes, 'attributes-HandleremoveAttribute')
    };

    const handleRemoveAttributeValue = (fieldIndex: number, valueIndex: number) => {

        if (isInputChanged === false) {
            setIsInputChanged(true);
        }

        setAttributes(prevAttributes => {
            const newAttributes: any = [...prevAttributes];

            // Xóa value tại valueIndex của attribute fieldIndex
            if (newAttributes[fieldIndex] && newAttributes[fieldIndex].values) {
                newAttributes[fieldIndex].values.splice(valueIndex, 1);
            }

            if (fieldIndex === 0) {
                // Cập nhật variants
                setVariants((prevVariants: any) => {
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
                setVariants((prevVariants: any) => {
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

        // Cập nhật variants
        // const newVariants = createVariants(attributes); // Tạo lại variants từ attributes mới
        // const mergedVariants = mergeVariantsByOldTierIndex(variants, newVariants); // Merge dữ liệu cũ và mới
        // setVariants(mergedVariants);

        // Nếu fieldIndex là 0, cập nhật attributeImage
        // console.log(fieldIndex, 'fieldIndex')
        // console.log(valueIndex, 'valueIndex')
        if (fieldIndex === 0) {
            setAttributeImages(prevAttributeImage => {
                const newAttributeImage = [...prevAttributeImage];
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

    // useEffect(() => {
    //     fetchCategoryes();
    //     // form.setFieldsValue({ fields: [{ name: "", price: "", stock: "", discount: "", image: "" }] });
    // }, []);

    // Cập nhật variants và columns khi attributes thay đổi
    useEffect(() => {
        // console.log(attributes, 'attributes-useeffect')
        if (!isInputChanged) {
            // console.log('!inputChanged')
            // console.log(variants, 'variants-useeffect-!inputChanged')
            // console.log(attributes, 'attributes-useeffect-!inputChanged')
            // const newColumns = createColumns(attributes);
            // setColumns(newColumns);
            form.setFieldsValue({ variants: originalVariants });
            return;
        }
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
                    const tierIndex = variant.attributes.map((attrValue: any, index: any) => {
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

            try {
                // console.log(attributeImages, 'attributeImages');

                // const urlAttributeImage: string[] = [];
                const urlAttributeImage: any = [...attributeImages]; // Tạo bản sao của mảng ban đầu
                const listFiles: any = [];

                attributeImages.forEach((image: any, index: number) => {
                    if (typeof image === 'string') {
                        // Nếu phần tử là URL, giữ nguyên (đã có sẵn trong urlAttributeImage)
                    } else if (image[0]?.originFileObj) {
                        // Nếu phần tử là file, thêm vào listFiles để xử lý sau
                        listFiles.push({ file: image, index });
                        urlAttributeImage[index] = null; // Đặt vị trí này null để có thể cập nhật sau
                    }
                });

                // console.log(listFiles, 'listFiles');
                // console.log(urlAttributeImage, 'urlGallery');

                // return

                if (listFiles.length > 0) {
                    const newArrayFiles = listFiles.map((imageFile: any) => imageFile.file[0].originFileObj);
                    // console.log(newArrayFiles, 'newArrayFiles');
                    const formData = new FormData();
                    for (const file of newArrayFiles) {
                        formData.append("images", file);
                    }

                    try {
                        const { data: dataAttributeImage } = await https.post("/images", formData);
                        const urlArray: { url: string; publicId: string }[] = dataAttributeImage.data;

                        // console.log(dataAttributeImage, 'dataAttributeImage');
                        // console.log(urlArray, 'urlArray');

                        // return;

                        // Đẩy các URL mới vào mảng theo thứ tự của file ban đầu
                        urlArray.forEach((urlObj, i) => {
                            // Sử dụng chỉ mục của listFiles để cập nhật đúng vị trí trong urlAttributeImage
                            const originalIndex = listFiles[i].index;
                            urlAttributeImage[originalIndex] = urlObj.url;
                        });
                    } catch (error) {
                        // console.error(error);
                        message.error(error.response.data.message);
                    }
                }
                // console.log(urlAttributeImage, 'urlAttributeImage');
                // return

                const attributeData = values.attributes

                attributeData[0].values = attributeData[0].values.map((value: any, index: number) => {
                    if (urlAttributeImage[index]) {
                        return { ...value, image: urlAttributeImage[index] };
                    }
                    return value; // Trả về giá trị ban đầu nếu không có ảnh tương ứng
                });
                // console.log(attributeData, 'atrtibuteData');

                const attributeDataWithoutID = attributeData.map((attribute: any) => ({
                    name: attribute.name,
                    values: attribute.values.map((value: any) => {
                        const result: any = { name: value.name };
                        if (value.image) {
                            result.image = value.image;
                        }
                        return result;
                    })
                }));

                // console.log(attributeDataWithoutID, 'cleanedAttributeData');

                // return;

                const data = {
                    attributes: attributeDataWithoutID,
                    variants: convertVariant
                };

                // console.log(data, 'dataFinal');

                // return;

                const res = await https.put(`/products/attributes/${id}`, data);
                if (res) {
                    message.success("Cập nhật sản phẩm thành công!");
                    navigate(`/admin/products/${id}`);
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
        const newVariants = variants.map((variant: any) => ({
            ...variant,
            originalPrice: inputValues.originalPrice,
            currentPrice: inputValues.currentPrice,
            stock: inputValues.stock,
        }));
        form.setFieldsValue({ variants: newVariants });

        setVariants(newVariants);
    };
    return (
        <div className="w-full mx-auto px-5 pb-20">
            <Breadcrumb style={{ margin: '16px 0' }}>
                <Breadcrumb.Item><Link to="/admin">Trang chủ</Link></Breadcrumb.Item>
                <Breadcrumb.Item><Link to="/admin/products">Sản phẩm</Link></Breadcrumb.Item>
                <Breadcrumb.Item><Link to={`/admin/products/${id}`}>Chi tiết sản phẩm</Link></Breadcrumb.Item>
                <Breadcrumb.Item>Cập nhật phân loại hàng</Breadcrumb.Item>
            </Breadcrumb>
            <h3 className=" text-2xl text-slate-700 text-center mt-6 mb-3">
                Cập nhật phân loại hàng
            </h3>
            <div className="flex gap-2">
                <Image height={100} width={100} src={product.thumbnail} alt={product.name} />
                <div className="flex flex-col gap-2 pt-2">
                    <span className="font-medium text-xl">{product.name}</span>
                    <span>ID: {id}</span>
                </div>
            </div>
            <Divider />
            <Form
                form={form}
                layout="vertical"
                name="basic"
                labelCol={{ span: 12 }}
                wrapperCol={{ span: 24 }}
                initialValues={{}}
                onFinish={onFinish}
                onFinishFailed={onFinishFailed}
                autoComplete="off"
                requiredMark={false}
            // onFieldsChange={onFieldsChange}
            >
                <div className="relative">
                    <div className="">
                        <h2 className="text-[20px] my-5 font-medium">Phân loại hàng</h2>
                        <Form.List
                            name="attributes"
                            initialValue={attributes}
                        >
                            {(fields, { add, remove }) => (
                                <div className="">

                                    {fields.map((field, fieldIndex) => (
                                        <div key={field.key} className="mb-10 bg-gray-50 p-5 w-[90%] m-auto">
                                            <div className="w-[600px]">
                                                {fields.length > 1 && (
                                                    <Button
                                                        className="dynamic-delete-button bg-red-700 text-white my-4"
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
                                                                <Button
                                                                    className="mt-2"
                                                                    type="dashed"
                                                                    onClick={() => {
                                                                        // console.log(variants, 'addValue')
                                                                        if (isInputChanged === false) {
                                                                            setIsInputChanged(true);
                                                                        }
                                                                        addValue()
                                                                        // Thêm một object với name='' vào cuối mảng values
                                                                        setAttributes(prevAttributes => {
                                                                            const newAttributes: any = [...prevAttributes];
                                                                            newAttributes[fieldIndex].values.push({ name: "" });
                                                                            return newAttributes;
                                                                        });
                                                                    }}
                                                                    icon={<PlusOutlined />}

                                                                >
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

                                                                    <div className="flex ">
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
                                                                            // <FaRegTrashCan onClick={() => {

                                                                            //     removeValue(valueField.name);
                                                                            //     handleInputAttributeValueChange("", fieldIndex, valueIndex, "name"); // Cập nhật attributes khi xóa
                                                                            //     handleRemoveAttributeValue(fieldIndex, valueIndex); // Hàm mới để xử lý xóa giá trị thuộc tính
                                                                            //     console.log(variants, 'deleteValue')
                                                                            // }} />
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
                                                const newAttributes: any = [...prevAttributes];

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


                    {/* {
                        containsDefaultValues(attributes) ? null :
                    } */}
                    <div>
                        <div className="w-full flex gap-1 mb-2">
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

                    <Form.Item className="mt-4">
                        <Space>
                            <Button
                                type="primary"
                                htmlType="submit"
                                className="text-white bg-green-500"
                            >
                                Cập nhật
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