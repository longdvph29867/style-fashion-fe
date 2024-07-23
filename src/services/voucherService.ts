import { https } from "../config/axios";
import { Voucher, VoucherFormValues, VoucherResponse } from "../types/voucher";

const voucherService = {
    async getVoucherAll() {
        const response = await https.get<VoucherResponse>('/vouchers');
        return response.data;
    },
    async createVoucher(data: VoucherFormValues) {
        const response = await https.post<VoucherFormValues>('/vouchers', data);
        return response.data;
    },
    async updateVoucher(data: VoucherFormValues, id: string) {
        const response = await https.put<VoucherFormValues>(`/vouchers/${id}`, data);
        return response.data;
    }
}

export default voucherService;