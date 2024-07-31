import { Modal } from "antd";
import { useEffect, useState } from "react";
import { Voucher } from "../../types/voucher";
import voucherService from "../../services/voucherService";
import { formartCurrency, hiddenSpinner, showSpinner } from "../../util/util";
import dayjs from "dayjs";
import { isValid } from "date-fns";

type Props = {
  openModalVoucher: boolean;
  setOpenModalVoucher: (open: boolean) => void;
  selectVoucher: (voucher: Voucher) => void;
  voucherSelected: Voucher | null;
  totalCartPrice: number;
};

const VoucherModal = ({
  openModalVoucher,
  setOpenModalVoucher,
  selectVoucher,
  voucherSelected,
  totalCartPrice,
}: Props) => {
  const [voucherList, setVoucherList] = useState<Voucher[]>([]);
  const [selectedVoucherId, setSelectedVoucherId] = useState("");

  useEffect(() => {
    if (voucherSelected) {
      setSelectedVoucherId(voucherSelected.id);
    }
  }, [voucherSelected]);

  const validateVoucher = (
    quantity: number,
    validTo: string,
    minCartPrice: number
  ) => {
    if (quantity === 0) {
      return {
        isValid: false,
        message: "Voucher đã được sử dụng hết số lượng",
      };
    }
    const now = dayjs();
    const expiryDate = dayjs(validTo);
    if (!now.isBefore(expiryDate)) {
      return { isValid: false, message: "Voucher này đã hết hạn" };
    }
    if (totalCartPrice < minCartPrice) {
      return {
        isValid: false,
        message: `Giá trị đơn hàng chưa đạt mức tối thiểu ${formartCurrency(
          minCartPrice
        )}`,
      };
    }
    return { isValid: true, message: "" };
  };

  const fetchVoucher = async () => {
    showSpinner();
    try {
      const response = await voucherService.getVoucherAll();
      setVoucherList(response.data.results);
      hiddenSpinner();
    } catch (error) {
      hiddenSpinner();
      console.log(error);
    }
  };

  useEffect(() => {
    fetchVoucher();
  }, []);

  const onCancel = () => {
    setSelectedVoucherId("");
    setOpenModalVoucher(false);
  };

  const onSubmitVoucher = () => {
    const voucher = voucherList.find(
      (voucher) => voucher.id === selectedVoucherId
    );
    if (voucher) {
      selectVoucher(voucher);
    }
  };

  return (
    <div className="pb-2">
      <Modal
        title=""
        centered
        open={openModalVoucher}
        onOk={onSubmitVoucher}
        onCancel={onCancel}
        width={500}
      >
        <p className="text-[18px] font-semibold mb-6">Chọn Voucher</p>
        <div className="h-[70vh] overflow-y-auto pr-1 modal-voucher-scroll">
          {voucherList.map((voucher: Voucher) => {
            const voucherValid = validateVoucher(
              voucher.quantity,
              voucher.validTo,
              voucher.minCartPrice
            );
            return (
              <label
                htmlFor={`voucher-${voucher.code}`}
                key={voucher.id}
                className={`flex justify-between items-center p-5 mb-4 border border-gray-300 rounded-lg shadow-md bg-white hover:shadow-lg ${
                  voucherValid.isValid &&
                  "hover:border-[#ff385d98] cursor-pointer"
                } relative overflow-hidden`}
              >
                <div className={`${!voucherValid.isValid && "opacity-50"}`}>
                  <h2 className="text-xl font-semibold mb-2">{voucher.name}</h2>
                  <div className="flex flex-col space-y-2">
                    <p className="text-base">
                      <span className="font-medium">Giảm giá:</span>{" "}
                      {voucher.type === "amount"
                        ? formartCurrency(voucher.discount)
                        : `${voucher.discount}%`}
                    </p>

                    <p className="text-sm text-gray-600">
                      <span className="font-medium">Ngày hết hạn:</span>{" "}
                      {voucher.validTo
                        ? dayjs(voucher.validTo).format("DD/MM/YYYY HH:mm")
                        : "Không xác định"}
                    </p>
                  </div>
                </div>
                {!voucherValid.isValid && (
                  <div className="bg-[#ff8ba0] font-medium absolute bottom-0 left-0 w-full pl-4">
                    <span>{voucherValid.message}</span>
                  </div>
                )}
                <input
                  name="voucher"
                  type="radio"
                  disabled={!voucherValid.isValid}
                  onChange={() => setSelectedVoucherId(voucher.id)}
                  className="hidden-input-radio"
                  value={voucher.id}
                  id={`voucher-${voucher.code}`}
                  checked={voucher.id === selectedVoucherId}
                />
                <span className="input-radio-voucher"></span>
              </label>
            );
          })}
        </div>
      </Modal>
    </div>
  );
};

export default VoucherModal;
