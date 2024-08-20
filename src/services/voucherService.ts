import { https } from "../config/axios";
import { Voucher, VoucherFormValues, VoucherResponse } from "../types/voucher";

const voucherService = {
    // getVoucherAll(limit: number, page: number) {
    //     return https.get(`/vouchers?limit=${limit}&page=${page}`);
    // },
    getVoucherAll() {
        return https.get(`/vouchers`);
    },
    getDetailVoucher(id: string) {
        return https.get(`/vouchers/${id}`);
    },
    async createVoucher(data: VoucherFormValues) {
        const response = await https.post<VoucherFormValues>('/vouchers', data);
        return response.data;
    },
    async updateVoucher(data: VoucherFormValues, id: string) {
        const response = await https.put<VoucherFormValues>(`/vouchers/${id}`, data);
        return response.data;
    },
    deleteVoucher(id: string) {
        return https.delete(`/vouchers/${id}`);
    }
}

export default voucherService;