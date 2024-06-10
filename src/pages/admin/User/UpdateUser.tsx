// type Props = {};

import React, { useEffect, useState } from "react";
import {
  Button,
  Form,
  Image,
  Input,
  InputNumber,
  Radio,
  Select,
  Upload,
  message,
} from "antd";
import { UploadOutlined } from "@ant-design/icons";
import { useNavigate, useParams } from "react-router-dom";
import { hiddenSpinner, showSpinner } from "../../../util/util";
import { https } from "../../../config/axios";
import TextArea from "antd/es/input/TextArea";
import { roleList } from "../../../constant/constant";
import { AddUserType, UpdateUserTypeWithoutPassword } from "../../../types/userType";

const UpdateUser: React.FC = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [form] = Form.useForm();

  const fetchUserDetail = async () => {
    showSpinner();
    try {
      const { data } = await https.get(`/users/${id}`);
      console.log(data)
      const user: UpdateUserTypeWithoutPassword = data;
      form.setFieldsValue({
        name: user.name,
        email: user.email,
        phoneNumber: user.phoneNumber,
        role: user.role,
      });
      hiddenSpinner();
      // console.log({
      //   name: form.getFieldValue('name'),
      //   email: form.getFieldValue('email'),
      //   phoneNumber: form.getFieldValue('phoneNumber'),
      //   role: form.getFieldValue('role'),
      // });
    } catch (error) {
      hiddenSpinner();
      console.log(error);
    }
  };
  useEffect(() => {
    fetchUserDetail();
  }, [id]);

  const onFinish = (values: AddUserType) => {
    let data = {}
    if (!values.password) {
      data = {
        name: values.name,
        phoneNumber: values.phoneNumber,
        email: values.email,
        role: values.role,
      }
    }
    data = {
      name: values.name,
      password: values.password,
      phoneNumber: values.phoneNumber,
      email: values.email,
      role: values.role,
    }
    // console.log(values);
    const postUser = async () => {
      showSpinner();
      try {
        const res = await https.put(`/users/${id}`, data);
        if (res) {
          message.success("Cập nhật thành công!");
          navigate("/admin/users");
          hiddenSpinner();
        }
      } catch (error) {
        hiddenSpinner();
        message.error(error.response.data.message);
        console.log(error);
      }
    };
    postUser();
  };


  const onFinishFailed = (errorInfo: unknown) => {
    console.log("Failed:", errorInfo);
  };

  return (
    <div className="max-w-lg w-full mx-auto px-5 pb-5">
      <h3 className=" text-2xl text-slate-700 text-center mt-6 mb-3">
        Cập nhật
      </h3>
      <Form
        form={form}
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
          label="Tên người dùng"
          name="name"
          rules={[
            { required: true, message: "Please fill in this field!" },
            {
              min: 6,
              max: 25,
              message: "Name must be between 6 and 25 characters!",
            },
          ]}
        >
          <Input />
        </Form.Item>

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
          label="Số điện thoại"
          name="phoneNumber"
          rules={[
            { required: true, message: "Please fill in this field!" },
            {
              pattern: /(84|0[3|5|7|8|9])+([0-9]{8})\b/g,
              message: "Invalid phone number format!",
            },
          ]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          label="Mật khẩu"
          name="password"
          rules={[
            // { required: true, message: "Please fill in this field!" },
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
          label="Xác nhận mật khẩu"
          name="rePassword"
          rules={[
            // { required: true, message: "Please fill in this field!" },
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

        <Form.Item
          label="Role"
          name="role"
          rules={[{ required: true, message: "*Vui lòng nhập trường này!" }]}
        >
          <Select placeholder="--- Chọn ---">
            {roleList.map((role, index) => (
              <Select.Option key={index} value={role}>
                {role}
              </Select.Option>
            ))}
          </Select>
        </Form.Item>

        <Form.Item>
          <Button
            type="primary"
            htmlType="submit"
            className="text-white bg-green-500"
          >
            Cập nhật
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
};

export default UpdateUser;
