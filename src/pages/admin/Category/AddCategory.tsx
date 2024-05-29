// type Props = {};
import {
    Button,
    Form,
    Input,
    message,
} from "antd";
import React from "react";
import { useNavigate } from "react-router-dom";
import { hiddenSpinner, showSpinner } from "../../../util/util";
import { https } from "../../../config/axios";
import { FormCategoryData } from "../../../types/categoryType";

const AddCategory: React.FC = () => {
    const navigate = useNavigate();

    const onFinish = (values: FormCategoryData) => {
        const postCategory = async () => {

            showSpinner();
            try {
                const data = {
                    name: values.name,
                };
                const res = await https.post("/categories", data);
                if (res) {
                    message.success("Thêm loại thành công!");
                    navigate("/admin/categories");
                    hiddenSpinner();
                }
            } catch (error) {
                hiddenSpinner();
                console.log(error);
                message.error(error.response.data.message);
            }
        };
        postCategory();
    };

    const onFinishFailed = (errorInfo: unknown) => {
        console.log("Failed:", errorInfo);
    };

    return (
        <div className="max-w-lg w-full mx-auto px-5 pb-5">
            <h3 className=" text-2xl text-slate-700 text-center mt-6 mb-3">
                Thêm mới
            </h3>
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
                    label="Tên sản phẩm"
                    name="name"
                    rules={[{ required: true, message: "Vui lòng nhập trường này!" }]}
                >
                    <Input />
                </Form.Item>
                <Form.Item>
                    <Button
                        type="primary"
                        htmlType="submit"
                        className="text-white bg-green-500"
                    >
                        Thêm mới
                    </Button>
                </Form.Item>
            </Form>
        </div>
    );
};

export default AddCategory;
