// type Props = {};

import React from "react";
import { Button, Form, Input, message } from "antd";
import { Link, useNavigate } from "react-router-dom";
import { RegisterType } from "../../types/login";
import { hiddenSpinner, showSpinner } from "../../util/spinner";
import { https } from "../../config/axios";

const Register: React.FC = () => {
  const navigate = useNavigate();

  const onFinish = (values: RegisterType) => {
    const data = {
      name: values.name,
      password: values.password,
      phoneNumber: values.phoneNumber,
      email: values.email,
    };
    const postProduct = async () => {
      showSpinner();
      try {
        const res = await https.post("/auth/register", data);
        if (res) {
          message.success("Đăng ký thành công!");
          navigate("/auth/login");
          hiddenSpinner();
        }
      } catch (error) {
        hiddenSpinner();
        message.error(error.response.data.message);
        console.log(error);
      }
    };
    postProduct();
  };

  const onFinishFailed = (errorInfo: unknown) => {
    console.log("Failed:", errorInfo);
  };

  return (
    <div>
      <h3 className=" text-2xl text-primary mb-1">Đăng ký</h3>
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
          label="Họ tên"
          name="name"
          rules={[
            { required: true, message: "Vui lòng nhập trường này!" },
            {
              min: 6,
              max: 25,
              message: "Họ tên 6 - 25 ký tự!!",
            },
          ]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          label="Email"
          name="email"
          rules={[
            { required: true, message: "Vui lòng nhập trường này!" },
            {
              pattern:
                /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
              message: "Email không đúng định dạng!",
            },
          ]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          label="Số điện thoại"
          name="phoneNumber"
          rules={[
            { required: true, message: "Vui lòng nhập trường này!" },
            {
              pattern: /(84|0[3|5|7|8|9])+([0-9]{8})\b/g,
              message: "Số điện thoại không hợp lệ!",
            },
          ]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          label="Mật khẩu"
          name="password"
          rules={[
            { required: true, message: "Vui lòng nhập trường này!" },
            {
              min: 6,
              max: 25,
              message: "Mật khẩu 6 - 25 ký tự!",
            },
            {
              pattern: /^(?=.*[A-Za-z])(?=.*\d).{6,25}$/,
              message: "Mật khẩu phải bao gồm chữ và số!!",
            },
          ]}
        >
          <Input.Password />
        </Form.Item>

        <Form.Item
          label="Nhập lại mật khẩu"
          name="rePassword"
          rules={[
            { required: true, message: "Vui lòng nhập trường này!" },
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
              className="text-white shadow-none bg-primary hover:!bg-white hover:!text-primary border border-primary"
            >
              Đăng ký
            </Button>
          </Form.Item>
          <Link
            to="/auth/login"
            className="text-xs text-content hover:text-title mb-3"
          >
            Đã có tài khoản!
          </Link>
        </div>
      </Form>
    </div>
  );
};

export default Register;
