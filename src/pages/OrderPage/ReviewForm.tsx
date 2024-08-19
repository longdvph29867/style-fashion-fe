// type Props = {};
import {
    Button,
    Form,
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
    setFormReviewValues: any;
    userInfo: any;
};

const ReviewForm: React.FC<Props> = ({ orderId, setFormReviewValues, userInfo }: Props) => {
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




    const onFinish = (values: any) => {
        const postProduct = async () => {
            // setFormReviewValues(values);
            // return;
            showSpinner();
            const attributeData: any = [];
            // console.log(attributeData, 'attributeData');
            // console.log('123')

            const listFiles = values.gallery;
            const videoFile: any = values.video;


            const newArrayFiles = listFiles.map((file: any) => file.originFileObj);
            const newVideoFile = videoFile[0].originFileObj;

            const formData = new FormData();
            for (const file of newArrayFiles) {
                formData.append("images", file);
            }

            const formDataVideo = new FormData();
            formDataVideo.append("videos", newVideoFile);
            try {
                const { data: dataGallery } = await https.post("/images", formData);
                const urlGallery: { url: string; publicId: string }[] = dataGallery.data;
                console.log("Gallery upload successful:", urlGallery);

                const { data: dataVideo } = await https.post("/videos", formDataVideo);
                const urlVideo: { url: string; publicId: string }[] = dataVideo.data;
                console.log("Video upload successful:", urlVideo);

                const data = {
                    content: values.content,
                    score: values.score,
                    images: urlGallery.map((image) => image.url),
                    productId: orderDetail.products[0].productId,
                    video: urlVideo[0].url,
                    // thumbnail: urlThumbnail[0].url,
                    email: userInfo.email,
                    name: userInfo.name,
                    // video: urlVideo[0].url,
                };

                setFormReviewValues(data);
                return

                // const res = await https.post("/products", data);
                // if (res) {
                //     message.success("Thêm sản phẩm thành công!");
                //     navigate("/admin/products");
                //     hiddenSpinner();
                // }
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

    const handleStarChange = (value: any) => {
        console.log(value, 'value');
        form.setFieldsValue({ star: value });
        setStarValue(value);
        // console.log(starValue, 'starValue');
    };

    return (
        <div className="w-full mx-auto p-5">
            {/* <h3 className=" text-2xl text-slate-700 text-center mt-6 mb-3">
                Thêm mới
            </h3> */}
            {!orderDetail ? <Skeleton active /> : null}
            {orderDetail?.products.map((product: any) => (
                <div key={product.productId}>
                    <div className="flex gap-2">
                        <div className="mb-5">
                            <img className="w-20 h-20 object-cover" src={product.image} alt={product.productName} />
                        </div>
                        <div>
                            <h3 className="text-lg uppercase">{product.productName}</h3>
                            <p className="normal-case text-[#757575]">
                                Phân loại hàng: <span className="">{product.variantName}</span>
                            </p>
                        </div>
                    </div>
                    <div className="border-[1px] border-gray-100 mb-2"></div>
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
                            <div className="grid xl:grid-cols-2 xl:gap-10">
                                <div>
                                    {/*  */}
                                    <Form.Item
                                        label="Nhận xét"
                                        name="content"
                                        rules={[{ required: true, message: "Vui lòng nhập trường này!" }]}
                                    >
                                        <TextArea rows={4} placeholder="Hãy chia sẻ nhận xét cho sản phẩm này bạn nhé" />
                                    </Form.Item>

                                    <Form.Item
                                        name="score"
                                        label="Đánh giá"
                                        rules={[{ required: true, message: "Vui lòng nhập trường này!" }]}
                                        initialValue={starValue}
                                    >
                                        <div className="flex items-center gap-2">
                                            <Rate className='' onChange={handleStarChange} defaultValue={5} />
                                            {starValue ? <span className="text-orange-400 text-[16px]">{desc[starValue - 1]}</span> : null}

                                        </div>
                                    </Form.Item>
                                </div>
                                <div>
                                    {/* gallery */}
                                    <Form.Item
                                        label="Thêm hình ảnh"
                                        name="gallery"
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
                                    {/* video */}
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
                            <Form.Item>
                                <Space>
                                    <Button
                                        type="primary"
                                        htmlType="submit"
                                        className="text-white bg-green-500"
                                    >
                                        Đánh giá
                                    </Button>
                                    <Button htmlType="button" onClick={onReset}>
                                        Reset
                                    </Button>
                                </Space>
                            </Form.Item>
                        </div>
                    </Form>
                </div>

            ))}
        </div>
    );
};

export default ReviewForm;
