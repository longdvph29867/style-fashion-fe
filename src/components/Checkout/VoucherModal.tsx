import { Modal } from "antd";
import { useEffect, useState } from "react";
import { Voucher } from "../../types/voucher";
import voucherService from "../../services/voucherService";
import { formartCurrency, hiddenSpinner, showSpinner } from "../../util/util";
import dayjs from "dayjs";
import { IoIosRadioButtonOff } from "react-icons/io";
import { GiConfirmed } from "react-icons/gi";

type Props = {
  openModalVoucher: boolean;
  setOpenModalVoucher: (open: boolean) => void;
  selectVoucher: (code: string, name: string, discountAmount: number) => void;
  voucherSelectedId: string;
  totalCartPrice: number;
};

const VoucherModal = ({
  openModalVoucher,
  setOpenModalVoucher,
  selectVoucher,
  voucherSelectedId,
  totalCartPrice,
}: Props) => {
  const [voucherList, setVoucherList] = useState<Voucher[]>([]);
  const [selectedVoucherId, setSelectedVoucherId] = useState(voucherSelectedId);

  const validateVoucher = (voucher: Voucher) => {
    if (voucher.quantity === 0) {
      return {
        isValid: false,
        message: "Voucher đã được sử dụng hết số lượng",
      };
    }
    const now = dayjs();
    const endDate = dayjs(voucher.validTo);
    if (!now.isBefore(endDate)) {
      return { isValid: false, message: "Voucher này đã hết hạn" };
    }
    const startDate = dayjs(voucher.validFrom);
    if (!now.isAfter(startDate)) {
      return {
        isValid: false,
        message: `Voucher có hiệu lực vào ${dayjs(voucher.validFrom).format(
          "DD/MM/YYYY"
        )}`,
      };
    }
    if (totalCartPrice < voucher.minCartPrice) {
      return {
        isValid: false,
        message: `Giá trị đơn hàng chưa đạt mức tối thiểu ${formartCurrency(
          voucher.minCartPrice
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
    setSelectedVoucherId(voucherSelectedId);
    setOpenModalVoucher(false);
  };

  const onSubmitVoucher = () => {
    voucherService
      .checkVoucher({
        code: selectedVoucherId,
        cartPrice: totalCartPrice,
      })
      .then((res) => {
        selectVoucher(
          res.data.voucher.code,
          res.data.voucher.name,
          res.data.discountAmount
        );
      })
      .then((err) => {
        console.log(err);
      });
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
            const voucherValid = validateVoucher(voucher);
            return (
              <div
                key={voucher.id}
                onClick={
                  voucherValid.isValid
                    ? () => setSelectedVoucherId(voucher.code)
                    : undefined
                }
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
                      <span className="font-medium">Ngày hiệu lực:</span>{" "}
                      {voucher.validFrom
                        ? dayjs(voucher.validFrom).format("DD/MM/YYYY HH:mm")
                        : "Không xác định"}
                    </p>
                    <p className="text-sm text-gray-600">
                      <span className="font-medium">Ngày hết hạn:</span>{" "}
                      {voucher.validTo
                        ? dayjs(voucher.validTo).format("DD/MM/YYYY HH:mm")
                        : "Không xác định"}
                    </p>
                  </div>
                </div>
                {selectedVoucherId == voucher.code ? (
                  <GiConfirmed size={22} color="#ff385c" />
                ) : (
                  <IoIosRadioButtonOff
                    opacity={!voucherValid.isValid ? 0.2 : 1}
                    size={20}
                  />
                )}

                {!voucherValid.isValid && (
                  <div className="bg-[#ff8ba0] font-medium absolute bottom-0 left-0 w-full pl-4">
                    <span>{voucherValid.message}</span>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </Modal>
    </div>
  );
};

export default VoucherModal;
