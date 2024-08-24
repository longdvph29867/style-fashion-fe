import { Button, Form, Drawer, Radio, Divider } from "antd";
import {
  ShippingActionModal,
  ShippingAddressType,
} from "../../types/shippingAddress";
import { FaRegEdit } from "react-icons/fa";
import { memo } from "react";
type Props = {
  open: boolean;
  addressList: ShippingAddressType[];
  idAddressSelected: string | undefined;
  setOpenDrawer: (value: boolean) => void;
  setFormAction: (action: ShippingActionModal) => void;
  onFinish: (value: any) => void;
};
const DrawerShippingAddress = ({
  open,
  addressList,
  idAddressSelected,
  setOpenDrawer,
  onFinish,
  setFormAction,
}: Props) => {
  const [form] = Form.useForm();
  const onCancel = () => {
    setOpenDrawer(false);
    form.resetFields();
  };
  return (
    <Drawer
      width={500}
      title="Địa chỉ giao hàng"
      onClose={onCancel}
      open={open}
    >
      <div className="mb-5">
        <Button
          onClick={() => setFormAction({ type: "create" })}
          className="w-full"
        >
          Thêm địa chỉ
        </Button>
      </div>
      <div className="flex flex-col gap-3">
        <Form form={form} onFinish={onFinish}>
          <Form.Item name="address" initialValue={idAddressSelected || ""}>
            <Radio.Group>
              {addressList.map((address) => (
                <div
                  key={address._id}
                  className="flex items-start justify-between"
                >
                  <Radio
                    key={address._id}
                    value={address._id}
                    className="mt-4 "
                  >
                    <div className="font-semibold text-sm">
                      <div className="flex">
                        <div className="flex items-center space-x-1.5">
                          <span>{address.name}</span>
                        </div>
                        <span className="mx-2 border-l border-slate-600" />
                        <div className="flex items-center space-x-1.5">
                          <span>{address.phoneNumber}</span>
                        </div>
                      </div>
                      <span className="sm:w-full text-slate-600 sm:text-xs">
                        {address.address},{address.wardName},{" "}
                        {address.districtName},{address.provinceName}
                      </span>
                      <div>
                        <span
                          hidden={!address.selected}
                          className="text-red-400 px-1 py-0.5 border leading-none border-red-400 text-xs mt-1"
                        >
                          Mặc định
                        </span>
                      </div>
                    </div>
                  </Radio>
                  <div>
                    <Button
                      onClick={() =>
                        setFormAction({
                          type: "update",
                          shippingAddress: address,
                        })
                      }
                      type="text"
                      className="text-lg"
                    >
                      <FaRegEdit />
                    </Button>
                  </div>
                </div>
              ))}
            </Radio.Group>
          </Form.Item>
          <Divider />
          <Button type="default" htmlType="submit">
            Xác nhận
          </Button>
        </Form>
      </div>
    </Drawer>
  );
};

export default memo(DrawerShippingAddress);
