// type Props = {};

import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { Button, Form, Input, message } from "antd";
import { LoginType } from "../../types/login";
import { hiddenSpinner, showSpinner } from "../../util/spinner";
import { https } from "../../config/axios";
import {
  localTokenService,
  localUserService,
} from "../../services/localService";
import { AuthContext } from "../../contexts/AuthContext";

const Login: React.FC = () => {
  const { setUserRole }: any = useContext(AuthContext);

  const onFinish = (values: LoginType) => {
    const data = {
      email: values.email,
      password: values.password,
    };
    const postProduct = async () => {
      try {
        showSpinner();
        const res = await https.post("/auth/login", data);
        if (res) {
          const infoUser = {
            ...res.data.user,
          };
          localUserService.set(res.data.user);
          localTokenService.set(res.data.tokens);
          setUserRole(infoUser.role); // Cập nhật userRole trong AuthContext
          hiddenSpinner();
          message.success("Đăng nhập thành công!");
          if (infoUser.role === "admin") {
            setTimeout(() => {
              window.location.href = "/admin/products";
            }, 1200);
          } else {
            setTimeout(() => {
              window.location.href = "/";
            }, 1200);
          }
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

  return (
    <div className="flex flex-col justify-center h-full">
      <h3 className=" text-2xl text-primary mb-1">Đăng nhập</h3>
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
          className=""
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
          label="Mật khẩu"
          name="password"
          rules={[{ required: true, message: "Vui lòng nhập trường này!" }]}
        >
          <Input.Password />
        </Form.Item>

        <div className=" gap-1 pt-2">
          <Form.Item>
            <Button
              type="primary"
              htmlType="submit"
              className="text-white shadow-none bg-primary hover:!bg-white hover:!text-primary border border-primary"
            >
              Đăng nhập
            </Button>
          </Form.Item>
          <div className="flex justify-between sm:flex-row flex-col">
            <Link
              to="/auth/forgot-password"
              className="text-xs text-content hover:text-title mb-3"
            >
              Quên mật khẩu
            </Link>
            <Link
              to="/auth/register"
              className="text-xs text-content hover:text-title mb-3"
            >
              Bạn chưa có tài khoản?
            </Link>
          </div>
        </div>
      </Form>
    </div>
  );
};

export default Login;
