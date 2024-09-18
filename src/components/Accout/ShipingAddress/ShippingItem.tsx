import { Popconfirm, Button } from "antd";
import {
  ShippingActionModal,
  ShippingAddressType,
} from "../../../types/shippingAddress";
import { QuestionCircleOutlined } from "@ant-design/icons";
import { memo } from "react";
type Props = {
  shipping: ShippingAddressType;
  handleButtonShipping: (action: ShippingActionModal) => void;
  deleteShippingAddress: (id: string) => void;
  onSelected: (id: string) => void;
};

const ShippingItem = ({
  handleButtonShipping,
  shipping,
  deleteShippingAddress,
  onSelected,
}: Props) => {
  const onDelete = (id: string) => {
    deleteShippingAddress(id);
  };
  return (
    <div className="sm:flex justify-between items-center mt-5">
      <div className="flex justify-between sm:block">
        <div>
          <div className="flex gap-3 h-max items-stretch">
            <div className="text-black font-medium">{shipping.name}</div>
            <div className="border border-gray-300"></div>
            <div>
              <span className="text-gray-600">{shipping.phoneNumber}</span>
            </div>
          </div>
          <div className="text-gray-600 text-sm mt-1">
            <p>{shipping.address}</p>
            <p>
              {shipping.wardName}, {shipping.districtName},{" "}
              {shipping.provinceName}
            </p>
          </div>
        </div>
        <div className="mt-2">
          <button
            hidden={!shipping.selected}
            className="text-red-400 px-2 py-0.5 border border-red-400 text-xs"
          >
            Mặc định
          </button>
        </div>
      </div>
      <div className="flex items-center flex-row gap-2 mt-2 text-xs sm:flex-col sm:text-right sm:mt-0 sm:text-sm">
        <div>
          <Button
            onClick={() =>
              handleButtonShipping({
                type: "update",
                shippingAddress: shipping,
              })
            }
            type="link"
          >
            Cập nhật
          </Button>
          <Popconfirm
            okType="danger"
            onConfirm={() => onDelete(shipping._id)}
            title="Xóa địa chỉ giao hàng"
            description="Bạn chắc chắn muốn xóa địa chỉ này?"
            icon={<QuestionCircleOutlined style={{ color: "red" }} />}
          >
            <Button hidden={shipping.selected} danger type="text">
              Xóa
            </Button>
          </Popconfirm>
        </div>
        <div className="flex items-center">
          {!shipping.selected && (
            <button
              className="disabled:text-gray-400 px-2 py-0.5 border border-gray-400"
              onClick={() => onSelected(shipping._id)}
            >
              Đặt làm mặc định
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default memo(ShippingItem);
