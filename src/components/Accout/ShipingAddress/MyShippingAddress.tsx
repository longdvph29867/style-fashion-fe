import { useEffect, useState } from "react";
import Button from "../../Button";
import { Modal, Form, Input, FormProps, Select, message } from "antd";
import { localUserService } from "../../../services/localService";
import shippingService from "../../../services/shippingService";
import ShippingItem from "./ShippingItem";
import {
  City,
  District,
  FieldTypeShipping,
  FormActionShipping,
  ShippingAddress,
  Ward,
} from "../../../types/shippingAddress";
import { hiddenSpinner, showSpinner } from "../../../util/util";

const MyShippingAddress = () => {
  const [open, setOpen] = useState(false);
  const [cities, setCitites] = useState<City[]>([]);
  const [districts, setDistricts] = useState<District[]>([]);
  const [wards, setWards] = useState<Ward[]>([]);
  const [shippingAddress, setShippingAddress] = useState<ShippingAddress[]>([]);
  const [formAction, setFormAction] = useState<FormActionShipping>({
    type: "create",
  });
  const [confirmLoading, setConfirmLoading] = useState(false);
  const user = localUserService.get()?.user;
  const [form] = Form.useForm();
  const fetchShippingAddress = async (id: string) => {
    try {
      showSpinner();
      const data = await shippingService.getShippingAll(id);
      hiddenSpinner();
      setShippingAddress(data);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    if (user) {
      fetchShippingAddress(user.id);
    }
  }, []);
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
  const onDeleteShippingAddress = async (idShippingAddress: string) => {
    try {
      if (user) {
        showSpinner();
        await shippingService.deleteShippingAddress(user.id, idShippingAddress);
        message.success("Xóa địa chỉ thành công!");
        hiddenSpinner();
        setShippingAddress(
          shippingAddress.filter((item) => item._id !== idShippingAddress)
        );
      }
    } catch (error) {
      console.log(error);
    }
  };
  const onSetShippingSelected = async (idShippingAddress: string) => {
    try {
      if (user) {
        showSpinner();
        setConfirmLoading(true);
        const shippingAddressData =
          await shippingService.postSelectedShippingAddress(
            user.id,
            idShippingAddress
          );
        hiddenSpinner();
        message.success("Đặt địa chỉ mặc định thành công!");
        setConfirmLoading(false);
        setShippingAddress(shippingAddressData);
      }
    } catch (error) {
      console.log(error);
    }
  };
  const handleOk = () => {
    form.submit();
  };
  const handleCancel = () => {
    form.resetFields();
    setOpen(false);
    setDistricts([]);
    setWards([]);
  };
  const onFinish: FormProps<FieldTypeShipping>["onFinish"] = async (values) => {
    if (!user) {
      return false;
    }
    try {
      setConfirmLoading(true);
      if (formAction.type === "create") {
        const data = await shippingService.postShippingAddress(user.id, values);
        message.success("Thêm địa chỉ thành công!");
        setShippingAddress(data);
      }
      if (formAction.type === "update" && formAction.id) {
        const updateData = await shippingService.putShippingAddress(
          user.id,
          formAction.id,
          values
        );
        message.success("Cập nhật thông tin địa chỉ thành công!");
        setShippingAddress((prev) =>
          prev.map((item) => (item._id === formAction.id ? updateData : item))
        );
      }
      setConfirmLoading(false);
      handleCancel();
    } catch (error) {
      console.log(error);
    }
  };
  const handleChangeSelectCity = () => {
    if (formAction.type === "update") {
      form.setFieldsValue({ wardCommune: "", district: "" });
    }
  };
  const handleButtonShipping = async ({ type, id }: FormActionShipping) => {
    setFormAction({ type, id });
    setOpen(true);
    try {
      const cititesData = await shippingService.getCities();
      setCitites(cititesData);
      if (type === "update" && id && user) {
        const address = shippingAddress.find((address) => address._id === id);
        if (!address) {
          return false;
        }
        form.setFieldsValue(address);
        const idCity = cititesData.find(
          (city) => city.name === address.cityProvince
        );
        if (!idCity) {
          return false;
        }
        const districtsData = await shippingService.getDistricts(idCity._id);
        setDistricts(districtsData);
        const idDistrict = districtsData.find(
          (district) => district.name === address.district
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

  return (
    <div className="shipping-container max-w-4xl mx-auto pt-14 sm:pt-26 pb-24 lg:pb-32">
      <div className="space-y-10 sm:space-y-12">
        <div className="flex justify-between items-center flex-wrap">
          <h2 className="text-2xl sm:text-3xl font-semibold">
            Shipping Address
          </h2>
          <div
            className=""
            onClick={() => handleButtonShipping({ type: "create" })}
          >
            <Button children="Thêm địa chỉ" />
          </div>
        </div>
        <div>
          {shippingAddress.map((shippingItem) => (
            <ShippingItem
              deleteShippingAddress={onDeleteShippingAddress}
              key={shippingItem._id}
              shipping={shippingItem}
              handleButtonShipping={handleButtonShipping}
              onSelected={onSetShippingSelected}
            />
          ))}
        </div>
      </div>
      <Modal
        zIndex={10}
        confirmLoading={confirmLoading}
        okType="default"
        maskClosable={true}
        title={
          formAction.type === "create"
            ? "Thêm địa chỉ"
            : "Cập nhật địa chỉ giao hàng"
        }
        open={open}
        onOk={handleOk}
        onCancel={handleCancel}
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
                { required: true, message: "Vui lòng nhập số điện thoại!" },
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
    </div>
  );
};

export default MyShippingAddress;
