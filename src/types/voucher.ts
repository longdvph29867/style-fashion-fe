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

export type VoucherFormValues = {
    name: string;
    validFrom: string; // ISO 8601 date string
    validTo: string;   // ISO 8601 date string
    discount: number;
    minCartPrice: number;
    quantity: number;
    type: "amount" | "percentage";
    exclude_promotions: "true" | "false";
}