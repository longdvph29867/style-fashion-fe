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
    }
}

export default voucherService;