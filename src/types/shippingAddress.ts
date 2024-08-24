export interface FieldTypeShipping {
  name: string;
  phoneNumber: string;
  address: string;
  wardCode: string;
  districtCode: number;
  provinceCode: number;
}

export interface BodyShippingAddress extends FieldTypeShipping {
  districtName: string;
  provinceName: string;
  wardName: string;
}

export interface ShippingAddressType {
  name: string;
  phoneNumber: string;
  address: string;
  wardCode: string;
  wardName: string;
  districtCode: number;
  districtName: string;
  provinceCode: number;
  provinceName: string;
  selected: boolean;
  _id: string;
}

export type ShippingActionModal = {
  type: "update" | "create";
  shippingAddress?: ShippingAddressType;
};
