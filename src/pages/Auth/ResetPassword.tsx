// type Props = {};

import React from "react";
import { Button, Form, Input, message } from "antd";
import { Link, useParams } from "react-router-dom";
import { LoginType } from "../../types/login";
import { hiddenSpinner, showSpinner } from "../../util/spinner";
import { https } from "../../config/axios";
import imgBg from "../../assets/img/bg-login1.jpg";



const ResetPassword: React.FC = () => {
  const { token } = useParams();

  const onFinish = (values: LoginType) => {
    const data = {
      password: values.password,
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
    <div
      className={`w-screen h-screen flex items-center justify-center bg-gray-400 px-5 
  bg-cover
  bg-center
  relative
  `}
      style={{ backgroundImage: `url(${imgBg})` }}
    >
      <div className="container p-10 bg-white  rounded-xl md:max-w-3xl w-full max-w-md z-10 overflow-hidden max-h-[95vh]">
        <h3 className=" text-2xl text-slate-700 mb-1 text-center">Reset Password</h3>
        <Form
          className="m-auto"
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
                message: "Mật khẩu phải từ 6-25 ký tự!",
              },
              {
                pattern: /^(?=.*[A-Za-z])(?=.*\d).{6,25}$/,
                message:
                  "Mật khẩu chứa cả số và chữ!",
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
                  return Promise.reject("Mật khẩu không khớp!");
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
                className="text-white bg-primary"
              >
                Xác nhận
              </Button>
            </Form.Item>
            <Link to="/auth/login" className="text-blue-500">
              Đăng nhập
            </Link>
          </div>
        </Form>
      </div>
    </div>
  );
};

export default ResetPassword;
