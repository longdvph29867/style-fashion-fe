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

const UserDetail: React.FC = () => {
    const { id } = useParams();
    const [user, setUser] = useState<any>({}); // product detail
    const [form] = Form.useForm();


    const fetchProductDetail = async () => {
        showSpinner();
        try {
            const { data } = await https.get(`/users/${id}`);
            setUser(data);
            console.log(data)
            const userDetail: any = data;
            form.setFieldsValue({
                id: userDetail.id,
                name: userDetail.name,
                email: userDetail.email,
                isEmailVerified: userDetail.isEmailVerified ? 'Đã xác minh' : 'Chưa xác minh',
                isPhoneNumberVerified: userDetail.isPhoneNumberVerified ? 'Đã xác minh' : 'Chưa xác minh',
                role: userDetail.role,
            });
            form.setFieldsValue({
                fields: userDetail.shippingAddress.map((address: any) => ({
                    recipientName: address.recipientName,
                    recipientPhoneNumber: address.recipientPhoneNumber,
                    streetAddress: address.streetAddress,
                    wardCommune: address.wardCommune,
                    district: address.district,
                    cityProvince: address.cityProvince,
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
                    Chi tiết người dùng
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
                        <div className="sm:grid lg:grid-cols-9 sm:grid-cols-5 gap-2 items-center">
                            <div className="sm:col-span-1">
                                <div className="text-center">
                                    <Image className="" src={user.image} />
                                </div>
                            </div>
                            <div className="sm:col-span-4">
                                <Form.Item
                                    label="ID"
                                    name="id"
                                >
                                    <Input readOnly />
                                </Form.Item>
                                <Form.Item
                                    label="Tên người dùng"
                                    name="name"
                                >
                                    <Input readOnly />
                                </Form.Item>
                                <Form.Item
                                    label="Email"
                                    name="email"
                                >
                                    <Input readOnly />
                                </Form.Item>
                            </div>
                            <div className="lg:col-span-4 sm:col-span-5">
                                <Form.Item
                                    label="Xác minh email"
                                    name="isEmailVerified"
                                >
                                    <Input readOnly />
                                </Form.Item>
                                <Form.Item
                                    label="Xác minh số điện thoại"
                                    name="isPhoneNumberVerified"
                                >
                                    <Input readOnly />
                                </Form.Item>
                                <Form.Item
                                    label="Role"
                                    name="role"
                                >
                                    <Input readOnly />
                                </Form.Item>
                            </div>
                        </div>


                        <div className="">
                            <Form.List name="fields">
                                {(fields) => {
                                    return (
                                        <div className="">
                                            {fields.map((field, index) => (
                                                <div className="" key={field.key}>
                                                    <Divider>Địa chỉ giao hàng {index + 1}</Divider>
                                                    <div className="md:grid md:grid-cols-2 md:gap-2">
                                                        <div>
                                                            <Form.Item
                                                                label="Tên người nhận"
                                                                name={[index, "recipientName"]}
                                                            >
                                                                <Input readOnly />
                                                            </Form.Item>
                                                            <Form.Item
                                                                label="Số điện thoại người nhận"
                                                                name={[index, "recipientPhoneNumber"]}
                                                            >
                                                                <Input readOnly />
                                                            </Form.Item>
                                                            <Form.Item
                                                                label="Địa chỉ đường phố"
                                                                name={[index, "streetAddress"]}
                                                            >
                                                                <Input readOnly />
                                                            </Form.Item>
                                                        </div>
                                                        <div>
                                                            <Form.Item
                                                                label="Phường/Xã"
                                                                name={[index, "wardCommune"]}
                                                            >
                                                                <Input readOnly />
                                                            </Form.Item>
                                                            <Form.Item
                                                                label="Quận/Huyện"
                                                                name={[index, "district"]}
                                                            >
                                                                <Input readOnly />
                                                            </Form.Item>
                                                            <Form.Item
                                                                label="Tỉnh/Thành phố"
                                                                name={[index, "cityProvince"]}
                                                            >
                                                                <Input readOnly />
                                                            </Form.Item>
                                                        </div>
                                                    </div>
                                                    <Divider />
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
                            to={`/admin/users/update/${user.id}`}
                            className=""
                        >
                            <Button
                                type="primary"
                                htmlType="submit"
                                className="text-white bg-green-500"
                            >
                                Cập nhật người dùng
                            </Button>
                        </Link>
                    </Form.Item>
                </Form>
            </div>

        </>
    );
};

export default UserDetail;