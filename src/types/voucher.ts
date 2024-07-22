export type Voucher = {
    name: string;
    code: string;
    validFrom: string;
    validTo: string;
    discount: number;
    quantity: number;
    type: 'amount' | 'percentage';
    exclude_promotions: boolean;
    id: string;
};

export type VoucherResponse = {
    results: Voucher[]; // Mảng các voucher
    page: number;
    limit: number;
    totalPages: number;
    totalResults: number;
};