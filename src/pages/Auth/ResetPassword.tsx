// type Props = {};

import React from "react";
import { Button, Form, Input, message } from "antd";
import { Link, useParams } from "react-router-dom";
import { LoginType } from "../../types/login";
import { hiddenSpinner, showSpinner } from "../../util";
import { https } from "../../config/axios";

const ResetPassword: React.FC = () => {
    const { token } = useParams()
    console.log(token);

    const onFinish = (values: LoginType) => {
        const data = {
            password: values.password
        };
        const postEmail = async () => {
            try {
                showSpinner();
                await https.post(`/auth/reset-password?token=${token}`, data);
                hiddenSpinner();
                message.success("Đổi mật khẩu thành công!");
                setTimeout(() => {
                    window.location.href = "/auth/login";
                }, 1200);
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
        <div>
            <h3 className=" text-2xl text-slate-700 mb-1">Reset Password</h3>
            <Form
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
                    label="New Password"
                    name="password"
                    rules={[
                        { required: true, message: "Please fill in this field!" },
                        {
                            min: 6,
                            max: 25,
                            message: "Password must be between 6 and 25 characters!",
                        },
                        {
                            pattern: /^(?=.*[A-Za-z])(?=.*\d).{6,25}$/,
                            message: "Password must contain at least one letter and one number!",
                        },
                    ]}
                >
                    <Input.Password />
                </Form.Item>

                <Form.Item
                    label="Confirm password"
                    name="rePassword"
                    rules={[
                        { required: true, message: "Please fill in this field!" },
                        ({ getFieldValue }) => ({
                            validator(_, value) {
                                if (!value || getFieldValue("password") === value) {
                                    return Promise.resolve();
                                }
                                return Promise.reject("Mismatched passwords!");
                            },
                        }),
                    ]}
                >
                    <Input.Password />
                </Form.Item>
                <div className="flex justify-between sm:items-end items-start gap-1 sm:flex-row flex-col pt-2">
                    <Form.Item>
                        <Button
                            type="primary"
                            htmlType="submit"
                            className="text-white bg-slate-800"
                        >
                            Submit
                        </Button>
                    </Form.Item>
                    <Link
                        to="/auth/login"
                        className="text-blue-700"
                    >
                        Back to login
                    </Link>
                </div>
            </Form>
        </div>
    );
};

export default ResetPassword;
