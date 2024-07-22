import { https } from "../config/axios";
import { Voucher, VoucherResponse } from "../types/voucher";

const voucherService = {
    async getVoucherAll() {
        const response = await https.get<VoucherResponse>('/vouchers');
        return response.data;
    }
}

export default voucherService;