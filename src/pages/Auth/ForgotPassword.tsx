// type Props = {};

import React from "react";
import { Link } from "react-router-dom";
import { Button, Form, Input, message } from "antd";
import { LoginType } from "../../types/login";
import { hiddenSpinner, showSpinner } from "../../util";
import { https } from "../../config/axios";
import { localUserService } from "../../services/localService";

const ForgotPassword: React.FC = () => {
    const [isHidden, setIsHidden] = React.useState(false);
    const onFinish = (values: LoginType) => {
        const data = {
            email: values.email
        };
        const postEmail = async () => {
            try {
                showSpinner();
                await https.post("/auth/forgot-password", data);
                hiddenSpinner();
                setIsHidden(true);
            } catch (error) {
                hiddenSpinner();
                console.log(error);
                message.error(error.response.data.message);
            }
        };
        postEmail();
    };

    const onFinishFailed = (errorInfo: unknown) => {
        console.log("Failed:", errorInfo);
    };

    return (
        <div className="flex flex-col justify-center h-full">
            <h3 className="text-center text-2xl text-slate-700 mb-1">Forgot Password</h3>
            {
                isHidden && (
                    <div className="text-center text-red-600">
                        <p className="my-2 ">
                            Chúng tôi đã gửi một liên kết đến email của bạn, vui lòng nhấp vào liên kết để thay đổi mật khẩu. Nếu không thấy, hãy kiểm tra thư rác!</p>
                        <Link to="/auth/login" className="text-blue-700">Back to login</Link>
                    </div>
                )
            }
            {
                !isHidden && <Form
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
                    <Form.Item
                        label="Email"
                        name="email"
                        rules={[
                            { required: true, message: "Please fill in this field!" },
                            {
                                pattern:
                                    /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
                                message: "Invalid email address!",
                            },
                        ]}
                    >
                        <Input />
                    </Form.Item>

                    <div className="flex justify-between items-center sm:flex-row flex-col">
                        <Form.Item>
                            <Button
                                type="primary"
                                htmlType="submit"
                                className="text-white bg-slate-800"
                            >
                                Submit
                            </Button>
                        </Form.Item>
                        <Link to="/auth/login" className="text-blue-700">Back to login</Link>
                    </div>
                </Form>
            }

        </div>
    );
};

export default ForgotPassword;
