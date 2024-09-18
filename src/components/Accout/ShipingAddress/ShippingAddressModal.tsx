import { Input, Modal, Select } from "antd";
import { memo, useEffect, useState } from "react";
import { Form } from "antd";
import {
  BodyShippingAddress,
  FieldTypeShipping,
  ShippingActionModal,
} from "../../../types/shippingAddress";
import infoShipping from "../../../services/infoShippingService";
import { District, Province, Ward } from "../../../types/infoShippingType";

type Props = {
  action: ShippingActionModal;
  open: boolean;
  handleSubmit: (value: BodyShippingAddress) => Promise<void>;
  onClose: (value: boolean) => void;
};
const ShippingAddressModal = ({
  action,
  open,
  handleSubmit,
  onClose,
}: Props) => {
  const [provinces, setProvinces] = useState<Province[]>([]);
  const [districts, setDistricts] = useState<District[]>([]);
  const [wards, setWards] = useState<Ward[]>([]);
  const [form] = Form.useForm();
  useEffect(() => {
    handleShippingAction();
  }, [action]);
  const handleShippingAction = async () => {
    try {
      const provinces = await infoShipping.getProvince();
      setProvinces(provinces.data);
      if (action.type === "update" && action.shippingAddress) {
        const shippingAddress = action.shippingAddress;
        form.setFieldsValue(shippingAddress);
        const districts = await infoShipping.getDistrict(
          shippingAddress.provinceCode
        );
        setDistricts(districts.data);
        const wards = await infoShipping.getWard(shippingAddress.districtCode);
        setWards(wards.data);
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
  const handleCity = (provinceId: number) => {
    infoShipping
      .getDistrict(provinceId)
      .then((res) => {
        setDistricts(res.data);
        setWards([]);
      })
      .catch((err) => {
        console.log(err);
      });
  };
  const handleDistrict = (districtID: number) => {
    infoShipping
      .getWard(districtID)
      .then((res) => {
        setWards(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };
  const handleClose = () => {
    form.resetFields();
    setProvinces([]);
    setDistricts([]);
    setWards([]);
    onClose(false);
  };
  const onFinish = async (value: FieldTypeShipping) => {
    const province = provinces.find(
      (province) => province.ProvinceID === value.provinceCode
    );
    const district = districts.find(
      (district) => district.DistrictID === value.districtCode
    );

    const ward = wards.find((ward) => ward.WardCode === value.wardCode);
    if (!province || !ward || !district) {
      return false;
    }
    const bodyShippingAddress: BodyShippingAddress = {
      ...value,
      provinceName: province.ProvinceName,
      districtName: district.DistrictName,
      wardName: ward.WardName,
    };
    await handleSubmit(bodyShippingAddress);
    handleClose();
  };
  return (
    <Modal
      // confirmLoading={loading}
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
            name="name"
            rules={[{ required: true, message: "Vui lòng nhập họ và tên!" }]}
          >
            <Input placeholder="Họ tên" />
          </Form.Item>
          <Form.Item<FieldTypeShipping>
            label="Số điện thoại"
            name="phoneNumber"
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
            name="provinceCode"
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
              // defaultValue={"Chọn tỉnh/thành phố"}
              options={[
                { value: "", label: "Chọn tỉnh/thành phố" },
                ...provinces.map((city) => ({
                  value: city.ProvinceID,
                  label: city.ProvinceName,
                })),
              ]}
            />
          </Form.Item>
          <Form.Item<FieldTypeShipping>
            label="Quận/Huyện"
            name="districtCode"
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
                  value: district.DistrictID,
                  label: district.DistrictName,
                })),
              ]}
            />
          </Form.Item>
          <Form.Item<FieldTypeShipping>
            label="Xã/phường"
            name="wardCode"
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
              defaultValue={"Chọn xã/phường"}
              options={[
                { value: "", label: "Chọn xã/phường" },
                ...wards.map((ward) => ({
                  value: ward.WardCode,
                  label: ward.WardName,
                })),
              ]}
            />
          </Form.Item>
        </div>
        <Form.Item<FieldTypeShipping>
          label="Địa chỉ cụ thể"
          name="address"
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
