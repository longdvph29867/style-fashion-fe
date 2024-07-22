// type Props = {};
import {
  Button,
  DatePicker,
  DatePickerProps,
  Form,
  Input,
  InputNumber,
  Radio,
  Select,
  Upload,
  message,
} from "antd";
import { UploadOutlined } from "@ant-design/icons";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { hiddenSpinner, showSpinner } from "../../../util/util";
import { https } from "../../../config/axios";
import TextArea from "antd/es/input/TextArea";
import { AddUserType } from "../../../types/userType";
import { roleList } from "../../../constant/constant";
import { RangePickerProps } from "antd/es/date-picker";
import voucherService from "../../../services/voucherService";

const AddVoucher: React.FC = () => {
  const navigate = useNavigate();
  const [timeStart, setTimeStart] = useState<any>(null);
  // let timeStart: any = null;
  const [timeEnd, setTimeEnd] = useState<any>(null);
  // let timeEnd: any = null;
  const [form] = Form.useForm();

  let excludePromotions = 'true';

  const handleExcludeChange = (value: any) => {
    form.setFieldsValue({ exclude_promotions: value });
  };

  const onFinish = (values: any) => {

    const data = {
      ...values,
      validFrom: values.validFrom ? values.validFrom.format('YYYY-MM-DDTHH:mm:ssZ') : null,
      validTo: values.validTo ? values.validTo.format('YYYY-MM-DDTHH:mm:ssZ') : null,
    };
    // console.log('Formatted Form values:', formattedValues);
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
        message.error(error.response.data.message);
        console.log(error);
      }
    };
    createVoucher();
  };

  const onFinishFailed = (errorInfo: unknown) => {
    console.log("Failed:", errorInfo);
  };

  // const handleChange = (value: string) => {
  //   console.log(`selected ${value}`);
  // };

  // const onChange: DatePickerProps['onChange'] = (date, dateString) => {
  //   console.log(date, dateString);
  //   // setValidFrom(dateString);
  //   console.log(validFrom, 'validFrom');
  // };

  // const onOk = (value: DatePickerProps['value'] | RangePickerProps['value']) => {
  //   console.log('onOk: ', value);
  // };

  // useEffect(() => {
  //   console.log(validFrom, 'validFrom');
  //   console.log(validTo, 'validTo');
  // }, [validFrom]);
  return (
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
          <Input />
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
          }
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
          <p className="mb-1">Loại bỏ các khuyến mãi khác khi sử dụng voucher</p>
          <Select
            defaultValue="true"
            style={{ width: 200 }}
            onChange={handleExcludeChange}
            options={[
              { value: 'true', label: 'Có' },
              { value: 'false', label: 'Không' },
            ]}
          />
        </Form.Item>

        <div className="flex justify-between">
          <Form.Item
            name="validFrom"
            rules={[{ required: true, message: 'Vui lòng nhập trường này!' }]}
          >
            <p className="mb-1">Thời gian bắt đầu</p>
            <DatePicker
              showTime
              onChange={(value) => {
                // setTimeStart(value);
                form.setFieldsValue({ validFrom: value });
              }}
            />
          </Form.Item>

          <Form.Item
            name="validTo"
            rules={[{ required: true, message: 'Vui lòng nhập trường này!' }]}
          >
            <p className="mb-1">Thời gian kết thúc</p>
            <DatePicker
              showTime
              onChange={(value) => {
                // setTimeEnd(value);
                form.setFieldsValue({ validTo: value });
              }}
            />
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
  );
};

export default AddVoucher;
