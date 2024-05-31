// type Props = {};

import React from "react";
import { Link } from "react-router-dom";
import { Button, Form, Input } from "antd";

const Login: React.FC = () => {
  const onFinish = (values: unknown) => {
    console.log(values);
  };

  const onFinishFailed = (errorInfo: unknown) => {
    console.log("Failed:", errorInfo);
  };

  return (
    <div className="flex flex-col justify-center h-full">
      <h3 className=" text-2xl text-slate-700 mb-1">Login</h3>
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

        <Form.Item
          label="Password"
          name="password"
          rules={[{ required: true, message: "Please fill in this field!" }]}
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
              Login
            </Button>
          </Form.Item>
          <Link
            to="/auth/register"
            className="text-xs text-slate-800 hover:text-slate-500 mb-3"
          >
            You don't have an account?
          </Link>
        </div>
      </Form>
    </div>
  );
};

export default Login;
