import { Input, Modal, Select } from "antd";
import { memo, useEffect, useState } from "react";
import { Form } from "antd";
import {
  City,
  District,
  FieldTypeShipping,
  ShippingActionModal,
  ShippingAddress,
  Ward,
} from "../../../types/shippingAddress";
import shippingService from "../../../services/shippingService";

type Props = {
  action: ShippingActionModal;
  open: boolean;
  handleSubmit: (value: ShippingAddress) => Promise<void>;
  loading?: boolean;
  onClose: (value: boolean) => void;
};
const ShippingAddressModal = ({
  action,
  open,
  handleSubmit,
  loading,
  onClose,
}: Props) => {
  const [cities, setCitites] = useState<City[]>([]);
  const [districts, setDistricts] = useState<District[]>([]);
  const [wards, setWards] = useState<Ward[]>([]);
  const [form] = Form.useForm();
  useEffect(() => {
    handleShippingAction();
  }, [action]);
  const handleShippingAction = async () => {
    try {
      const cititesData = await shippingService.getCities();
      setCitites(cititesData);
      if (action.type === "update" && action.shippingAddress) {
        const shippingAddress = action.shippingAddress;
        form.setFieldsValue(shippingAddress);
        const idCity = cititesData.find(
          (city) => city.name === shippingAddress.cityProvince
        );
        if (!idCity) {
          return false;
        }
        const districtsData = await shippingService.getDistricts(idCity._id);
        setDistricts(districtsData);
        const idDistrict = districtsData.find(
          (district) => district.name === shippingAddress.district
        );
        if (!idDistrict) {
          return false;
        }
        const wardsData = await shippingService.getWards(idDistrict._id);
        setWards(wardsData);
      }
    } catch (error) {
      console.log(error);
    }
  };
  const handleOk = () => {
    form.submit();
  };
  const handleChangeSelectCity = () => {
    if (action.type === "update") {
      form.setFieldsValue({ wardCommune: "", district: "" });
    }
  };
  const handleCity = async (value: string) => {
    const idCity = cities.find((city) => city.name === value);
    if (idCity) {
      const districtsData = await shippingService.getDistricts(idCity._id);
      setDistricts(districtsData);
      setWards([]);
    }
  };
  const handleDistrict = async (value: string) => {
    const district = districts.find((district) => district.name === value);
    if (district) {
      const wardsData = await shippingService.getWards(district._id);
      setWards(wardsData);
    }
  };
  const handleClose = () => {
    form.resetFields();
    setCitites([]);
    setDistricts([]);
    setWards([]);
    onClose(false);
  };
  const onFinish = async (value: ShippingAddress) => {
    await handleSubmit(value);
    handleClose();
  };
  return (
    <Modal
      zIndex={10}
      confirmLoading={loading}
      okType="default"
      maskClosable={true}
      title={
        action.type === "create" ? "Thêm địa chỉ" : "Cập nhật địa chỉ giao hàng"
      }
      open={open}
      onOk={handleOk}
      onCancel={handleClose}
      width={650}
    >
      <Form
        form={form}
        layout="vertical"
        wrapperCol={{ span: 24 }}
        initialValues={{ remember: true }}
        onFinish={onFinish}
        autoComplete="off"
        className="text-sm"
      >
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          <Form.Item<FieldTypeShipping>
            label="Họ và tên"
            name="recipientName"
            rules={[{ required: true, message: "Vui lòng nhập họ và tên!" }]}
          >
            <Input placeholder="Họ tên" />
          </Form.Item>
          <Form.Item<FieldTypeShipping>
            label="Số điện thoại"
            name="recipientPhoneNumber"
            rules={[
              {
                required: true,
                message: "Vui lòng nhập số điện thoại!",
              },
              {
                pattern: /^0\d{9}$/,
                message: "Số điện thoại không hợp lệ!",
              },
            ]}
          >
            <Input placeholder="Số điện thoại" />
          </Form.Item>
        </div>
        <div className="grid md:grid-cols-3 gap-3">
          <Form.Item<FieldTypeShipping>
            label="Tỉnh/Thành phố"
            name="cityProvince"
            initialValue={""}
            rules={[
              { required: true, message: "Vui lòng chọn tỉnh/thành phố!" },
            ]}
          >
            <Select
              showSearch
              filterOption={(input, option) =>
                (option?.label ?? "")
                  .toLowerCase()
                  .includes(input.toLowerCase())
              }
              onSelect={handleChangeSelectCity}
              onChange={handleCity}
              options={[
                { value: "", label: "Chọn tỉnh/thành phố" },
                ...cities.map((city) => ({
                  value: city.name,
                  label: city.name,
                })),
              ]}
            />
          </Form.Item>
          <Form.Item<FieldTypeShipping>
            label="Quận/Huyện"
            name="district"
            initialValue={""}
            rules={[{ required: true, message: "Vui lòng chọn quận/huyện!" }]}
          >
            <Select
              disabled={districts.length == 0}
              showSearch
              filterOption={(input, option) =>
                (option?.label ?? "")
                  .toLowerCase()
                  .includes(input.toLowerCase())
              }
              onChange={handleDistrict}
              options={[
                { value: "", label: "Chọn quận/huyện" },
                ...districts.map((district) => ({
                  value: district.name,
                  label: district.name,
                })),
              ]}
            />
          </Form.Item>
          <Form.Item<FieldTypeShipping>
            label="Xã/phường"
            name="wardCommune"
            initialValue={""}
            rules={[{ required: true, message: "Vui lòng chọn xã/phường!" }]}
          >
            <Select
              disabled={wards.length == 0}
              showSearch
              filterOption={(input, option) =>
                (option?.label ?? "")
                  .toLowerCase()
                  .includes(input.toLowerCase())
              }
              options={[
                { value: "", label: "Chọn xã/phường" },
                ...wards.map((ward) => ({
                  value: ward.name,
                  label: ward.name,
                })),
              ]}
            />
          </Form.Item>
        </div>
        <Form.Item<FieldTypeShipping>
          label="Địa chỉ cụ thể"
          name="streetAddress"
          rules={[
            {
              required: true,
              message: "Vui lòng nhập số nhà tên, đường,...!",
            },
          ]}
        >
          <Input placeholder="Địa chỉ ..." />
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default memo(ShippingAddressModal);
