// type Props = {};
import {
    Button,
    Divider,
    Form,
    Image,
    Input,
} from "antd";
import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { hiddenSpinner, showSpinner } from "../../../util/util";
import { https } from "../../../config/axios";
import TextArea from "antd/es/input/TextArea";
import { BsDot } from "react-icons/bs";

const ProductDetail: React.FC = () => {
    const { id } = useParams();
    const [galleryList, setGalleryList] = useState<string[]>([]);
    const [product, setProduct] = useState<any>({}); // product detail
    const [form] = Form.useForm();

    let selectedCategories: any = [];

    const fetchProductDetail = async () => {
        showSpinner();
        try {
            const { data } = await https.get(`/products/${id}`);
            setProduct(data);
            console.log(data)
            const product: any = data;
            form.setFieldsValue({
                name: product.name,
                description: product.description
            });
            selectedCategories = product.categories.map((category: any) => category.id);
            setGalleryList(product.gallery);
            form.setFieldsValue({ categories: selectedCategories });

            form.setFieldValue('thumbnail', [{
                uid: '-1',
                name: product.thumbnail,
                status: 'done',
                url: product.thumbnail,
                type: `image/${product.thumbnail.split('.').pop()}`,
                // originFileObj: new File(
                //   [product.thumbnail],
                //   product.thumbnail,
                //   { type: `image/${product.thumbnail.split('.').pop()}` })
            }]);
            form.setFieldsValue({
                gallery: product.gallery.map((url: string, index: number) => ({
                    uid: index,
                    name: url,
                    status: 'done',
                    url,
                    type: `image/${url.split('.').pop()}`
                }))
            });
            form.setFieldsValue({
                fields: product.attributes.map((attribute: any, index: number) => ({
                    name: attribute.name,
                    price: attribute.price,
                    stock: attribute.stock,
                    discount: attribute.discount,
                    image: [{
                        uid: index,
                        name: attribute.image,
                        status: 'done',
                        url: attribute.image,
                        type: `image/${attribute.image.split('.').pop()}`
                    }]
                }))
            });

            // console.log(product.thumbnail.split('.').pop(), 'type thumbnail')
            hiddenSpinner();
        } catch (error) {
            hiddenSpinner();
            console.log(error);
        }
    };
    useEffect(() => {
        fetchProductDetail();
    }, [id]);

    return (
        <>
            <div className="w-full px-5 pb-2">
                <h3 className="text-2xl text-slate-700 text-center mt-6 mb-3">
                    Chi tiết sản phẩm
                </h3>
                <Form
                    form={form}
                    layout="vertical"
                    name="basic"
                    labelCol={{ span: 12 }}
                    wrapperCol={{ span: 24 }}
                    style={{ maxWidth: '100%' }}
                    initialValues={{ remember: true }}
                    autoComplete="off"
                    requiredMark={false}
                >
                    <div className="mb-6">
                        <div className="mb-2 grid grid-cols-2 gap-10">
                            <div>
                                <Form.Item
                                    label="Tên sản phẩm"
                                    name="name"
                                    rules={[{ required: true, message: "Vui lòng nhập trường này!" }]}
                                >
                                    <TextArea readOnly />
                                </Form.Item>

                                <Form.Item
                                    label="Mô tả"
                                    name="description"
                                    rules={[{ required: true, message: "Vui lòng nhập trường này!" }]}
                                >
                                    <TextArea rows={4} readOnly />
                                </Form.Item>

                                <div className="mb-2">
                                    <label htmlFor="">Danh mục</label>
                                    {product?.categories?.map((category: any) => (
                                        <div className="flex items-center">
                                            <BsDot />
                                            <span className="ml-2">{category.name}</span>
                                        </div>
                                    ))}
                                </div>
                            </div>
                            <div>
                                {/* thumbnail */}
                                <div>
                                    <div className="mb-2">
                                        <label htmlFor="">Ảnh thu nhỏ sản phẩm</label>
                                    </div>
                                    <div className="grid grid-cols-5 gap-2">
                                        <div className="">
                                            <Image className="" height={100} src={product.thumbnail} />
                                        </div>
                                    </div>
                                </div>
                                {/* gallery */}
                                <div>
                                    <div className="mb-2">
                                        <label htmlFor="">Bộ sưu tập hình ảnh sản phẩm</label>
                                    </div>
                                    <div className="grid grid-cols-5 gap-2">
                                        {galleryList?.map((image, index) => (
                                            <div className="">
                                                <Image className="" key={index} height={100} src={image} />
                                            </div>
                                        ))}
                                    </div>
                                </div>

                            </div>
                        </div>


                        <div className="">
                            <Form.List name="fields">
                                {(fields) => {
                                    return (
                                        <div className="grid grid-cols-2">
                                            {fields.map((field, index) => (
                                                <div className="" key={field.key}>
                                                    <Divider>Thuộc tính {index + 1}</Divider>
                                                    <div className="flex gap-10">
                                                        <div>
                                                            <div className="mb-2">
                                                                <label htmlFor="">Ảnh</label>
                                                            </div>
                                                            <div className="">
                                                                <div className="">
                                                                    <Image className="" height={100} src={product.attributes[index].image} />
                                                                </div>
                                                            </div>
                                                        </div>
                                                        <div>
                                                            <Form.Item
                                                                name={[index, "name"]}
                                                                label="Tên thuộc tính"
                                                                rules={[{ required: true, message: "Vui lòng nhập trường này!" }]}
                                                            >
                                                                <Input placeholder="" readOnly />
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
                                                                    <Input placeholder="" readOnly />
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
                                                                    <Input placeholder="" readOnly />
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
                                                                    <Input placeholder="" readOnly />
                                                                </Form.Item>
                                                            </div>
                                                        </div>

                                                    </div>
                                                </div>
                                            ))}
                                        </div>
                                    );
                                }}
                            </Form.List>

                        </div>
                    </div>
                    <Form.Item>
                        <Link
                            to={`/admin/products/update/${id}`}
                            className=""
                        >
                            <Button
                                type="primary"
                                htmlType="submit"
                                className="text-white bg-green-500"
                            >
                                Cập nhật sản phẩm
                            </Button>
                        </Link>
                    </Form.Item>
                </Form>
            </div>

        </>
    );
};

export default ProductDetail;
