import { Form, Modal } from "antd";
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
  const [form] = Form.useForm();

  const formattedValidTo =
    voucherList.length > 0 && voucherList[0].validTo
      ? dayjs(new Date(voucherList[0].validTo)).format("DD/MM/YYYY HH:mm")
      : "Không xác định";

  const fetchVoucher = async () => {
    showSpinner;
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
    setOpenModalVoucher(false);
    form.resetFields();
  };

  return (
    <div className="pb-2">
      <Modal
        title=""
        centered
        open={openModalVoucher}
        onOk={() => setOpenModalVoucher(false)}
        onCancel={onCancel}
        width={500}
      >
        <p className="text-[18px] font-semibold mb-6">Chọn Voucher</p>
        <div className="h-[70vh] overflow-y-auto pr-1 modal-voucher-scroll">
          <Form>
            {voucherList.map((voucher: Voucher) => (
              <label
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
                  className="hidden-input-radio"
                  name="voucher"
                  type="radio"
                  value={voucher.id}
                  checked={voucherSelected?.id === voucher.id}
                />
                <span className="input-radio-voucher"></span>
              </label>
            ))}
          </Form>
        </div>
      </Modal>
    </div>
  );
};

export default VoucherModal;
