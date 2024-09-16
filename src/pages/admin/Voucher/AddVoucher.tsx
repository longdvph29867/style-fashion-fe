// type Props = {};
import {
  Breadcrumb,
  Button,
  DatePicker,
  Form,
  Input,
  Select,
  message,
} from "antd";
import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { hiddenSpinner, showSpinner } from "../../../util/util";
import voucherService from "../../../services/voucherService";

const AddVoucher: React.FC = () => {
  const navigate = useNavigate();
  const [form] = Form.useForm();

  const handleExcludeChange = (value: any) => {
    form.setFieldsValue({ exclude_promotions: value });
  };

  const onFinish = (values: any) => {

    const data = {
      ...values,
      validFrom: values.validFrom ? values.validFrom.format('YYYY-MM-DDTHH:mm:ssZ') : null,
      validTo: values.validTo ? values.validTo.format('YYYY-MM-DDTHH:mm:ssZ') : null,
    };
    const createVoucher = async () => {
      showSpinner();
      try {
        const res = await voucherService.createVoucher(data);
        if (res) {
          message.success("Thêm mới thành công!");
          navigate("/admin/voucher");
          hiddenSpinner();
        }
      } catch (error) {
        hiddenSpinner();
        message.error(error.response.data);
        console.log(error);
      }
    };
    createVoucher();
  };

  const onFinishFailed = (errorInfo: unknown) => {
    console.log("Failed:", errorInfo);
  };


  return (
    <>
      <Breadcrumb style={{ margin: '16px 0' }}>
        <Breadcrumb.Item><Link to="/admin">Trang chủ</Link></Breadcrumb.Item>
        <Breadcrumb.Item><Link to="/admin/voucher">Mã giảm giá</Link></Breadcrumb.Item>
        <Breadcrumb.Item>Thêm giảm giá</Breadcrumb.Item>
      </Breadcrumb>
      <div className="max-w-lg w-full mx-auto px-5 pb-5">
        <h3 className=" text-2xl text-slate-700 text-center mt-6 mb-3">
          Thêm mới
        </h3>
        <Form
          form={form}
          layout="vertical"
          name="basic"
          labelCol={{ span: 12 }}
          wrapperCol={{ span: 24 }}
          style={{ maxWidth: 600 }}
          initialValues={{ type: 'amount', exclude_promotions: 'true' }}
          onFinish={onFinish}
          onFinishFailed={onFinishFailed}
          autoComplete="off"
          requiredMark={false}
        >
          <Form.Item
            label="Tên mã giảm giá"
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
            <Input className="" />
          </Form.Item>

          <Form.Item
            label="Loại mã giảm giá"
            name="type"
            rules={[
              { required: true, message: "Please fill in this field!" },
            ]}
          >
            <Select
              // defaultValue="amount"
              style={{ width: 200 }}
              options={[
                { value: 'amount', label: 'Giá trị cố định' },
                { value: 'percentage', label: 'Phần trăm' },
              ]}
            />
          </Form.Item>

          <Form.Item
            label="Giảm giá"
            name="discount"
            rules={[{ required: true, message: "Vui lòng nhập trường này!" },
            {
              pattern: /^[0-9]*$/,
              message: "Vui lòng nhập số dương!",
            },
            ({ getFieldValue }) => ({
              validator(_, value) {
                const type = getFieldValue('type');
                if (type === 'percentage' && value > 100) {
                  return Promise.reject(new Error("Giá trị giảm giá không được lớn hơn 100%"));
                }
                return Promise.resolve();
              },
            }),
            ]}
          >
            <Input placeholder="" />
          </Form.Item>

          <Form.Item
            label="Giá trị đơn hàng tối thiểu"
            name="minCartPrice"
            rules={[{ required: true, message: "Vui lòng nhập trường này!" },
            {
              pattern: /^[0-9]*$/,
              message: "Vui lòng nhập số dương!",
            }
            ]}
          >
            <Input placeholder="" />
          </Form.Item>

          <Form.Item
            label="Số lượng mã giảm giá"
            name="quantity"
            rules={[{ required: true, message: "Vui lòng nhập trường này!" },
            {
              pattern: /^[0-9]*$/,
              message: "Vui lòng nhập số dương!",
            }
            ]}
          >
            <Input placeholder="" />
          </Form.Item>

          <Form.Item
            // label="Loại bỏ các khuyến mãi khác khi sử dụng voucher"
            name="exclude_promotions"
            rules={[
              { required: true, message: "Please fill in this field!" },
            ]}
          >
            <div>
              <label className="mb-1">Loại bỏ các khuyến mãi khác khi sử dụng voucher</label>
              <Select
                defaultValue="true"
                style={{ width: 200 }}
                onChange={handleExcludeChange}
                options={[
                  { value: 'true', label: 'Có' },
                  { value: 'false', label: 'Không' },
                ]}
              />
            </div>
          </Form.Item>

          <div className="flex justify-between">
            <Form.Item
              name="validFrom"
              rules={[{ required: true, message: 'Vui lòng nhập trường này!' }]}
            >
              <div>
                <label className="mb-1">Thời gian bắt đầu</label>
                <DatePicker
                  showTime
                  onChange={(value) => {
                    // setTimeStart(value);
                    form.setFieldsValue({ validFrom: value });
                  }}
                />
              </div>
            </Form.Item>

            <Form.Item
              name="validTo"
              rules={[{ required: true, message: 'Vui lòng nhập trường này!' },
              // { validator: (_, value) => validateDateRange({ validFrom: form.getFieldValue('validFrom'), validTo: value }) }
              ({ getFieldValue }) => ({
                validator(_, value) {
                  const validFrom = getFieldValue('validFrom');
                  if (validFrom && value && value <= validFrom) {
                    return Promise.reject(new Error('Thời gian kết thúc phải lớn hơn thời gian bắt đầu!'));
                  }
                  return Promise.resolve();
                },
              }),
              ]}
            >
              <div>
                <label className="mb-1">Thời gian kết thúc</label>
                <DatePicker
                  showTime
                  // onChange={(value) => {
                  //   // setTimeEnd(value);
                  //   form.setFieldsValue({ validTo: value });
                  // }}
                  onChange={(value) => {
                    form.setFieldsValue({ validTo: value });

                    // Trigger validation immediately
                    form.validateFields(['validTo']);
                  }}
                />
              </div>
            </Form.Item>
          </div>

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
    </>
  );
};

export default AddVoucher;
