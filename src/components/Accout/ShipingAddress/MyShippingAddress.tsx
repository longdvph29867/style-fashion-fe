import { useCallback, useEffect, useState } from "react";
import Button from "../../Button";
import { message } from "antd";
import { localUserService } from "../../../services/localService";
import shippingService from "../../../services/shippingService";
import ShippingItem from "./ShippingItem";
import {
  BodyShippingAddress,
  ShippingActionModal,
  ShippingAddressType,
} from "../../../types/shippingAddress";
import { hiddenSpinner, showSpinner } from "../../../util/util";
import ShippingAddressModal from "./ShippingAddressModal";

const MyShippingAddress = () => {
  const [open, setOpen] = useState(false);
  const [shippingAddress, setShippingAddress] = useState<ShippingAddressType[]>(
    []
  );
  const [formAction, setFormAction] = useState<ShippingActionModal>({
    type: "create",
  });
  const [confirmLoading, setConfirmLoading] = useState(false);
  const user = localUserService.get();
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
  const onDeleteShippingAddress = useCallback(
    async (idShippingAddress: string) => {
      try {
        if (user) {
          showSpinner();
          await shippingService.deleteShippingAddress(
            user.id,
            idShippingAddress
          );
          message.success("Xóa địa chỉ thành công!");
          hiddenSpinner();
          setShippingAddress(
            shippingAddress.filter((item) => item._id !== idShippingAddress)
          );
        }
      } catch (error) {
        console.log(error);
      }
    },
    [shippingAddress, user]
  );
  const onSetShippingSelected = useCallback(
    async (idShippingAddress: string) => {
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
    },
    [user]
  );
  const onFinish = useCallback(
    async (values: BodyShippingAddress) => {
      if (!user) {
        return;
      }
      try {
        setConfirmLoading(true);
        if (formAction.type === "create") {
          const data = await shippingService.postShippingAddress(
            user.id,
            values
          );
          message.success("Thêm địa chỉ thành công!");
          setShippingAddress(data);
        }
        if (formAction.type === "update" && formAction.shippingAddress) {
          const updateData = await shippingService.putShippingAddress(
            user.id,
            formAction.shippingAddress?._id,
            values
          );
          message.success("Cập nhật thông tin địa chỉ thành công!");
          setShippingAddress((prev) =>
            prev.map((item) =>
              item._id === formAction.shippingAddress?._id ? updateData : item
            )
          );
        }
        setConfirmLoading(false);
      } catch (error) {
        console.log(error);
      }
    },
    [formAction, user]
  );
  const handleButtonShipping = useCallback(
    async ({ type, shippingAddress }: ShippingActionModal) => {
      setFormAction({ type, shippingAddress });
      setOpen(true);
    },
    []
  );

  return (
    <div className="shipping-container max-w-4xl mx-auto pt-14 sm:pt-26 pb-24 lg:pb-32">
      <div className="space-y-10 sm:space-y-12">
        <div className="flex justify-between items-center flex-wrap">
          <h2 className="text-2xl sm:text-3xl font-semibold">
            Địa chỉ của tôi
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
      <ShippingAddressModal
        loading={confirmLoading}
        onClose={setOpen}
        open={open}
        action={formAction}
        handleSubmit={onFinish}
      />
    </div>
  );
};

export default MyShippingAddress;
