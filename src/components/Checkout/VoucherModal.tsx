import { Modal } from "antd";
import { useEffect, useState } from "react";
import { Voucher } from "../../types/voucher";
import voucherService from "../../services/voucherService";
import { formartCurrency, hiddenSpinner, showSpinner } from "../../util/util";
import dayjs from "dayjs";

type Props = {
  openModalVoucher: boolean;
  setOpenModalVoucher: (open: boolean) => void;
  selectVoucher: (voucher: Voucher) => void;
  voucherSelected: Voucher | null;
};

const VoucherModal = ({
  openModalVoucher,
  setOpenModalVoucher,
  selectVoucher,
  voucherSelected,
}: Props) => {
  const [voucherList, setVoucherList] = useState<Voucher[]>([]);
  const [selectedVoucherId, setSelectedVoucherId] = useState("");

  useEffect(() => {
    if (voucherSelected) {
      setSelectedVoucherId(voucherSelected.id);
    }
  }, [voucherSelected]);

  const formattedValidTo =
    voucherList.length > 0 && voucherList[0].validTo
      ? dayjs(new Date(voucherList[0].validTo)).format("DD/MM/YYYY HH:mm")
      : "Không xác định";

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
          {voucherList.map((voucher: Voucher) => (
            <label
              htmlFor={`voucher-${voucher.code}`}
              key={voucher.id}
              className="flex justify-between items-center p-4 mb-4 border border-gray-300 rounded-lg shadow-md bg-white cursor-pointer hover:shadow-lg hover:border-[#ff385d98]"
            >
              <div>
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
              <input
                name="voucher"
                type="radio"
                onChange={() => setSelectedVoucherId(voucher.id)}
                className="hidden-input-radio"
                value={voucher.id}
                id={`voucher-${voucher.code}`}
                checked={voucher.id === selectedVoucherId}
              />
              <span className="input-radio-voucher"></span>
            </label>
          ))}
        </div>
      </Modal>
    </div>
  );
};

export default VoucherModal;
