// type Props = {};

import React, { useEffect } from "react";
import {
  Breadcrumb,
  Button,
  Form,
  Input,
  message,
} from "antd";
import { Link, useNavigate, useParams } from "react-router-dom";
import { hiddenSpinner, showSpinner } from "../../../util/util";
import { https } from "../../../config/axios";
import { CategoryTpype } from "../../../types/categoryType";

const UpdateCategory: React.FC = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [form] = Form.useForm();


  const fetchCategories = async () => {
    showSpinner();
    try {
      hiddenSpinner();
      const { data } = await https.get(`/categories/${id}`);
      const category: CategoryTpype = data;
      form.setFieldsValue({
        name: category.name,
      });
    } catch (error) {
      hiddenSpinner();
      console.log(error);
    }
  };
  useEffect(() => {
    fetchCategories();
  }, [id]);

  const onFinish = (values: any) => {
    const putCategory = async () => {
      showSpinner();
      const data = {
        name: values.name,
      };

      try {
        const res = await https.put(`/categories/${id}`, data);
        if (res) {
          message.success("Update category successfully!");
          navigate("/admin/categories");
          hiddenSpinner();
        }
      } catch (error) {
        hiddenSpinner();
        message.error(error.response.data.message);
        console.log(error);
      }
    };
    putCategory();
  };

  const onFinishFailed = (errorInfo: unknown) => {
    console.log("Failed:", errorInfo);
  };

  return (
    <>
      <Breadcrumb style={{ margin: '16px 0' }}>
        <Breadcrumb.Item><Link to="/admin">Trang chủ</Link></Breadcrumb.Item>
        <Breadcrumb.Item><Link to="/admin/categories">Danh mục</Link></Breadcrumb.Item>
        <Breadcrumb.Item>Cập nhật danh mục</Breadcrumb.Item>
      </Breadcrumb>
      <div className="max-w-lg w-full mx-auto px-5 pb-5">
        <h3 className=" text-2xl text-slate-700 text-center mt-6 mb-3">
          Cập nhật
        </h3>
        <Form
          layout="vertical"
          form={form}
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
            label="Tên sản phẩm"
            name="name"
            rules={[{ required: true, message: "Vui lòng nhập trường này!" }]}
          >
            <Input />
          </Form.Item>

          {/*  */}
          <Form.Item>
            <Button
              type="primary"
              htmlType="submit"
              className="text-white bg-yellow-500"
            >
              Cập nhật
            </Button>
          </Form.Item>
        </Form>
      </div>
    </>
  );
};

export default UpdateCategory;
