// type Props = {};
import {
    Button,
    Divider,
    Form,
    Image,
    Rate,
    Skeleton,
    Space,
    Upload,
    message,
} from "antd";
import { UploadOutlined } from "@ant-design/icons";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import TextArea from "antd/es/input/TextArea";
import { https } from "../../config/axios";
import { hiddenSpinner, showSpinner } from "../../util/util";
import orderService from "../../services/orderService";

const desc = ['Tệ', 'Không hài lòng', 'Bình thường', 'Hài lòng', 'Tuyệt vời'];

type Props = {
    orderId: string;
    userInfo: any;
    setOrderList: any;
    setReviewFormOpen: any;
    onPage: string;
    fetchOrdersList: any;
};

const ReviewForm: React.FC<Props> = ({ orderId, userInfo, setOrderList, setReviewFormOpen, onPage, fetchOrdersList }: Props) => {
    const navigate = useNavigate();
    const [form] = Form.useForm();
    const [starValue, setStarValue] = useState(5);

    const [orderDetail, setOrderDetail] = useState<any>(null);


    const fetchOrderDetail = async () => {
        // showSpinner();
        if (orderId) {
            try {
                const res = await orderService.getOrderDetail(orderId);
                setOrderDetail(res.data);
                form.setFieldsValue({
                    products: res.data.products.map(() => ({
                        content: '', // Khởi tạo với nội dung mặc định cho nhận xét
                        score: 5, // Khởi tạo giá trị đánh giá mặc định
                        gallery: [], // Khởi tạo danh sách hình ảnh trống
                        video: [] // Khởi tạo danh sách video trống
                    }))
                });
            } catch (err) {
                console.error('Error fetching data:', err);
            } finally {
                // hiddenSpinner();
            }
        }
    };

    useEffect(() => {
        fetchOrderDetail();
    }, []);




    // const onFinish = (values: any) => {
    //     // console.log("Received values of form:", values);
    //     // return;
    //     const postProduct = async () => {
    //         // setFormReviewValues(values);
    //         // return;
    //         showSpinner();
    //         const attributeData: any = [];
    //         // console.log(attributeData, 'attributeData');
    //         // console.log('123')

    //         const urlGallery = [];
    //         const urlVideo = [];

    //         if (values.gallery) {
    //             const listFiles = values.gallery;
    //             const newArrayFiles = listFiles.map((file: any) => file.originFileObj);
    //             const formData = new FormData();
    //             for (const file of newArrayFiles) {
    //                 formData.append("images", file);
    //             }
    //             try {
    //                 const { data: dataGallery } = await https.post("/images", formData);
    //                 const url: { url: string; publicId: string }[] = dataGallery.data;
    //                 urlGallery.push(...url);
    //                 console.log("Gallery upload successful:", urlGallery);
    //             } catch (error) {
    //                 console.log(error);

    //             }


    //         }

    //         if (values.video) {
    //             const videoFile: any = values.video;


    //             const newVideoFile = videoFile[0].originFileObj;


    //             const formDataVideo = new FormData();
    //             formDataVideo.append("videos", newVideoFile);
    //             try {
    //                 const { data: dataVideo } = await https.post("/videos", formDataVideo);
    //                 const url: { url: string; publicId: string }[] = dataVideo.data;
    //                 urlVideo.push(...url);
    //                 console.log("Video upload successful:", urlVideo);

    //             } catch (error) {
    //                 console.log(error);

    //             }

    //         }

    //         try {
    //             const data = {
    //                 content: values.content,
    //                 score: starValue,
    //                 images: urlGallery?.map((image) => image.url),
    //                 productId: orderDetail.products[0].productId,
    //                 video: urlVideo ? urlVideo?.[0]?.url : "",
    //                 // thumbnail: urlThumbnail[0].url,
    //                 email: userInfo.email,
    //                 name: userInfo.name,
    //                 // video: urlVideo[0].url,
    //             };

    //             console.log(data, 'data');
    //             // return

    //             if (data) {
    //                 setReviewFormOpen(false)
    //                 orderService.reviewProduct(data).then(async (res) => {
    //                     if (res) {
    //                         orderService.updateStatusOrder(orderId, 9, userInfo.id)
    //                         message.success('Đánh giá thành công')
    //                         if (onPage === 'detail') {
    //                             // console.log('detail')
    //                             // await fetchOrdersList();
    //                             setOrderList((prev: any) => {
    //                                 return { ...prev, orderStatus: { code: 9 } }
    //                             });
    //                             hiddenSpinner();

    //                         } else {
    //                             // console.log('list')
    //                             setOrderList((prev: any) => {
    //                                 return prev.map((order: any) => {
    //                                     if (order._id === orderId) {
    //                                         order.orderStatus.code = 9
    //                                     }
    //                                     return order
    //                                 })
    //                             })
    //                             hiddenSpinner();

    //                         }
    //                         // fetchOrdersList()
    //                     }
    //                 }).catch((error) => {
    //                     console.log(error)
    //                     message.error(error.response.data.message)
    //                 }).finally(() => {
    //                     setReviewFormOpen(false)
    //                 })
    //             }

    //             // setFormReviewValues(data);
    //             return

    //             // const res = await https.post("/products", data);
    //             // if (res) {
    //             //     message.success("Thêm sản phẩm thành công!");
    //             //     navigate("/admin/products");
    //             //     hiddenSpinner();
    //             // }
    //         } catch (error) {
    //             hiddenSpinner();
    //             console.log(error);
    //             message.error(error.response.data.message);
    //         }
    //     };
    //     postProduct();
    // };

    const onFinish = async (values: any) => {
        console.log("Received values of form:", values);
        showSpinner();

        setReviewFormOpen(false)

        // Lặp qua từng sản phẩm trong danh sách
        for (let i = 0; i < values.products.length; i++) {
            const product = values.products[i];
            const urlGallery = [];
            const urlVideo = [];

            // Xử lý gallery nếu có
            if (product.gallery && product.gallery.length > 0) {
                const listFiles = product.gallery;
                const newArrayFiles = listFiles.map((file: any) => file.originFileObj);
                const formData = new FormData();
                for (const file of newArrayFiles) {
                    formData.append("images", file);
                }
                try {
                    const { data: dataGallery } = await https.post("/images", formData);
                    const url: { url: string; publicId: string }[] = dataGallery.data;
                    urlGallery.push(...url);
                    console.log("Gallery upload successful:", urlGallery);
                } catch (error) {
                    console.log(error);
                }
            }

            // Xử lý video nếu có
            if (product.video && product.video.length > 0) {
                const videoFile: any = product.video;
                const newVideoFile = videoFile[0].originFileObj;
                const formDataVideo = new FormData();
                formDataVideo.append("videos", newVideoFile);
                try {
                    const { data: dataVideo } = await https.post("/videos", formDataVideo);
                    const url: { url: string; publicId: string }[] = dataVideo.data;
                    urlVideo.push(...url);
                    console.log("Video upload successful:", urlVideo);
                } catch (error) {
                    console.log(error);
                }
            }

            // Tạo data để gửi lên server
            const data = {
                content: product.content,
                score: product.score,
                images: urlGallery ? urlGallery?.map((image) => image.url) : [],
                productId: orderDetail.products[i].productId,
                video: urlVideo ? urlVideo?.[0]?.url : "",
                email: userInfo.email,
                name: userInfo.name,
            };

            console.log(data, 'data');

            orderService.reviewProduct(data)
        }

        try {
            await orderService.updateStatusOrder(orderId, 9, userInfo.id);
            if (onPage === 'detail') {
                setOrderList((prev: any) => ({
                    ...prev,
                    orderStatus: { code: 9 },
                }));
            } else {
                setOrderList((prev: any) =>
                    prev.map((order: any) => {
                        if (order._id === orderId) {
                            order.orderStatus.code = 9;
                        }
                        return order;
                    })
                );
            }
            message.success('Đánh giá thành công');
        } catch (error) {
            console.log(error);
            message.error(error.response.data.message);
        }


        hiddenSpinner();
        // setReviewFormOpen(false);
    };


    const onFinishFailed = (errorInfo: unknown) => {
        console.log("Failed:", errorInfo);
    };

    // const onCategoryChange: GetProp<typeof Checkbox.Group, 'onChange'> = (checkedValues) => {
    //   console.log('checked = ', checkedValues);
    //   selectedCategories = checkedValues;
    // };

    const onReset = () => {
        form.setFieldsValue({
            products: orderDetail.products.map(() => ({
                content: '', // Khởi tạo với nội dung mặc định cho nhận xét
                score: 5, // Khởi tạo giá trị đánh giá mặc định
                gallery: [], // Khởi tạo danh sách hình ảnh trống
                video: [] // Khởi tạo danh sách video trống
            }))
        });
    };

    const handleStarChange = (value: any, fieldName: any) => {
        console.log(value, 'value');
        console.log(fieldName, 'fieldName');
        form.setFieldsValue({ [`products[${fieldName}].score`]: value });
        setStarValue(value);
        // console.log(starValue, 'starValue');
    };


    return (
        <div className="w-full mx-auto p-5">
            {/* <h3 className=" text-2xl text-slate-700 text-center mt-6 mb-3">
                Thêm mới
            </h3> */}
            {!orderDetail ? <Skeleton className="mb-5" active /> : null}
            <Form
                form={form}
                layout="vertical"
                onFinish={onFinish}
                onFinishFailed={onFinishFailed}
            >
                <Form.List name="products">
                    {(fields) => (
                        <>
                            {fields.map((field, index) => (
                                <div key={field.key} className="">
                                    <div className="flex gap-2 mb-2">
                                        <div className="mb-5 flex ">
                                            <Image
                                                width={80}
                                                style={{ height: '80px', objectFit: 'cover', marginRight: '8px', borderRadius: '8px' }}

                                                // className="w-20 h-20 object-cover"
                                                src={orderDetail?.products[index].image}
                                                alt={orderDetail?.products[index].productName}
                                            />
                                        </div>
                                        <div>
                                            <h3 className="text-lg uppercase">{orderDetail?.products[index].productName}</h3>
                                            <p className="normal-case text-[#757575]">
                                                Phân loại hàng: <span>{orderDetail?.products[index].variantName}</span>
                                            </p>
                                        </div>
                                    </div>
                                    {/* <div className="border-[1px] border-gray-100 mb-2"></div> */}

                                    <div className="grid xl:grid-cols-2 xl:gap-10">
                                        <div>
                                            <Form.Item
                                                {...field}
                                                label="Nhận xét"
                                                name={[field.name, 'content']}
                                                rules={[{ required: true, message: "Vui lòng nhập trường này!" }]}
                                            >
                                                <TextArea rows={4} placeholder="Hãy chia sẻ nhận xét cho sản phẩm này bạn nhé" />
                                            </Form.Item>

                                            {/* <Form.Item
                                                {...field}
                                                name={[field.name, 'score']}
                                                label="Đánh giá"
                                                rules={[{ required: true, message: "Vui lòng nhập trường này!" }]}
                                                initialValue={starValue}
                                            >
                                                <div className="flex items-center gap-2">
                                                    <Rate onChange={(value) => handleStarChange(value, field.name)} defaultValue={5} />
                                                    {starValue ? <span className="text-orange-400 text-[16px]">{desc[starValue - 1]}</span> : null}
                                                </div>
                                            </Form.Item> */}
                                            <Form.Item
                                                {...field}
                                                name={[field.name, 'score']}
                                                label="Đánh giá"
                                                rules={[{ required: true, message: "Vui lòng nhập trường này!" }]}
                                                initialValue={5}
                                            >
                                                <div className="flex items-center gap-2">
                                                    <Rate
                                                        onChange={(value) => form.setFieldValue(['products', field.name, 'score'], value)}
                                                        defaultValue={5}
                                                    />
                                                    {form.getFieldValue(['products', field.name, 'score']) ? (
                                                        <span className="text-orange-400 text-[16px]">
                                                            {desc[form.getFieldValue(['products', field.name, 'score']) - 1]}
                                                        </span>
                                                    ) : null}
                                                </div>
                                            </Form.Item>
                                        </div>
                                        <div>
                                            <Form.Item
                                                {...field}
                                                label="Thêm hình ảnh"
                                                name={[field.name, 'gallery']}
                                                valuePropName="fileList"
                                                getValueFromEvent={(e) => e?.fileList}
                                                rules={[
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
                                                <Upload.Dragger multiple listType="picture" beforeUpload={() => false}>
                                                    <Button icon={<UploadOutlined />}>Click to upload</Button>
                                                </Upload.Dragger>
                                            </Form.Item>

                                            <Form.Item
                                                {...field}
                                                label="Thêm video"
                                                name={[field.name, 'video']}
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
                                                    <Button icon={<UploadOutlined />}>Click to upload</Button>
                                                </Upload.Dragger>
                                            </Form.Item>
                                        </div>
                                    </div>
                                    <Divider />
                                </div>
                            ))}
                        </>
                    )}
                </Form.List>
                <Form.Item>
                    <Space>
                        <Button type="primary" htmlType="submit" className="text-white bg-green-500">
                            Đánh giá
                        </Button>
                        <Button htmlType="button" onClick={onReset}>
                            Reset
                        </Button>
                    </Space>
                </Form.Item>
            </Form>

        </div>
    );
};

export default ReviewForm;
