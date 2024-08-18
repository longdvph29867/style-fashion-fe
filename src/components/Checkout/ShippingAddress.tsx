import { Button } from "antd";
import {
  BodyShippingAddress,
  ShippingActionModal,
  ShippingAddressType,
} from "../../types/shippingAddress";
import AddressSvg from "../../assets/svgs/AddressSvg";
import { memo, useCallback, useEffect, useState } from "react";
import DrawerShippingAddress from "./DrawerShippingAddress";
import ShippingAddressModal from "../Accout/ShipingAddress/ShippingAddressModal";
import shippingService from "../../services/shippingService";
import { hiddenSpinner, showSpinner } from "../../util/util";
type Props = {
  addressSelected: ShippingAddressType | null;
  setAddressSelected: (address: ShippingAddressType) => void;
  userId: string | undefined;
};
const ShippingAddress = ({
  addressSelected,
  userId,
  setAddressSelected,
}: Props) => {
  const [openDrawer, setOpenDrawer] = useState(false);
  const [addressList, setAddressList] = useState<ShippingAddressType[]>([]);
  const [openModal, setOpenModal] = useState(false);
  const [formAction, setFormAction] = useState<ShippingActionModal>({
    type: "create",
  });

  const getAllShippingAddress = async (userId: string) => {
    try {
      showSpinner();
      const data = await shippingService.getShippingAll(userId);
      setAddressList(data);
      const addressSelected = data.find((item) => item.selected === true);
      if (addressSelected) {
        setAddressSelected(addressSelected);
      }
      hiddenSpinner();
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    if (userId) {
      getAllShippingAddress(userId);
    }
  }, []);

  const handleButtonShipping = useCallback(
    ({ type, shippingAddress }: ShippingActionModal) => {
      setFormAction({ type, shippingAddress });
      setOpenModal(true);
    },
    []
  );
  const hanleSelectAddress = useCallback(
    ({ address }: { address: string }) => {
      const addressItem = addressList.find((item) => item._id === address);
      if (addressItem) {
        setAddressSelected(addressItem);
        setOpenDrawer(false);
      }
    },
    [addressList]
  );

  const handleSubmitModal = useCallback(async (values: BodyShippingAddress) => {
    if (!userId) {
      return;
    }
    try {
      if (formAction.type === "create") {
        const data = await shippingService.postShippingAddress(userId, values);
        setAddressList(data);
      }
      if (formAction.type === "update" && formAction.shippingAddress) {
        const updateData = await shippingService.putShippingAddress(
          userId,
          formAction.shippingAddress?._id,
          values
        );
        setAddressList((prev) =>
          prev.map((item) =>
            item._id === formAction.shippingAddress?._id ? updateData : item
          )
        );
      }
    } catch (error) {
      console.log(error);
    }
  }, []);
  return (
    <div className="scroll-mt-24">
      <div className="border border-slate-200 rounded-xl p-6">
        <div className="flex flex-col sm:flex-row items-start">
          <span className="hidden sm:block">
            <AddressSvg />
          </span>
          <div className="sm:ml-8 flex-grow">
            <h3 className="text-slate-700 flex">
              <span className="uppercase">Địa chỉ nhận hàng</span>
              <svg
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth="2.5"
                stroke="currentColor"
                className="w-5 h-5 ml-3 text-slate-900"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M4.5 12.75l6 6 9-13.5"
                />
              </svg>
            </h3>
          </div>
        </div>
        <div className="flex justify-between items-center p-5 border border-slate-700 rounded-xl mt-5">
          {addressSelected && (
            <>
              <div className="font-semibold text-sm">
                <div className="flex">
                  <div className="flex items-center space-x-1.5">
                    <span>{addressSelected?.name}</span>
                  </div>
                  <span className="mx-4 border-l border-slate-600" />
                  <div className="flex items-center space-x-1.5">
                    <span>{addressSelected?.phoneNumber}</span>
                  </div>
                </div>
                <span className="sm:w-full text-slate-600 sm:text-xs">
                  {addressSelected?.provinceName},{addressSelected?.wardCode},{" "}
                  {addressSelected?.districtName},
                  {addressSelected?.provinceName}
                </span>
                <div>
                  <button
                    hidden={!addressSelected?.selected}
                    className="text-red-400 px-1 py-0.5 border leading-none border-red-400 text-xs mt-1"
                  >
                    Mặc định
                  </button>
                </div>
              </div>
              <div>
                <Button onClick={() => setOpenDrawer(true)} type="text">
                  Thay đổi
                </Button>
              </div>
            </>
          )}
          {addressList.length == 0 && (
            <>
              <p className="text-primary">
                Bạn chưa có địa chỉ nào! Vui lòng thêm địa chỉ để tiến hành đặt
                hàng
              </p>
              <div>
                <Button
                  onClick={() => setOpenModal(true)}
                  type="text"
                  color="#0000FF"
                >
                  Thêm địa chỉ
                </Button>
              </div>
            </>
          )}
        </div>
      </div>
      <DrawerShippingAddress
        onFinish={hanleSelectAddress}
        setFormAction={handleButtonShipping}
        setOpenDrawer={setOpenDrawer}
        open={openDrawer}
        addressList={addressList}
        idAddressSelected={addressSelected?._id}
      />
      <ShippingAddressModal
        open={openModal}
        onClose={setOpenModal}
        action={formAction}
        handleSubmit={handleSubmitModal}
      />
    </div>
  );
};

export default memo(ShippingAddress);
