import { https } from "../config/axios";
import { ICheckAndVoucher, VoucherFormValues } from "../types/voucher";

const voucherService = {
  getVoucherAll() {
    return https.get(`/vouchers`);
  },
  getDetailVoucher(id: string) {
    return https.get(`/vouchers/${id}`);
  },
  async createVoucher(data: VoucherFormValues) {
    const response = await https.post<VoucherFormValues>("/vouchers", data);
    return response.data;
  },
  async updateVoucher(data: VoucherFormValues, id: string) {
    const response = await https.put<VoucherFormValues>(
      `/vouchers/${id}`,
      data
    );
    return response.data;
  },
  deleteVoucher(id: string) {
    return https.delete(`/vouchers/${id}`);
  },
  checkVoucher(data: ICheckAndVoucher) {
    return https.post(`vouchers/checkVoucher`, data);
  },
  useVoucher(data: ICheckAndVoucher) {
    return https.post(`vouchers/useVoucher`, data);
  },
};

export default voucherService;
