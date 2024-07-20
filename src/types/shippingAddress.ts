export type City = {
  _id: string;
  name: string;
  idCity: number;
};

export type District = {
  _id: string;
  name: string;
  idDistrict: number;
  cityId: string;
};

export type Ward = {
  _id: string;
  name: string;
  districtId: number;
};
export type FieldTypeShipping = {
  recipientName: string;
  recipientPhoneNumber: string;
  streetAddress: string;
  wardCommune: string;
  district: string;
  cityProvince: string;
  selected: boolean;
};

export type ShippingAddressType = {
  recipientName: string;
  recipientPhoneNumber: string;
  streetAddress: string;
  wardCommune: string;
  district: string;
  selected: boolean;
  cityProvince: string;
  _id: string;
};

export type ShippingActionModal = {
  type: "update" | "create";
  shippingAddress?: ShippingAddressType;
};
