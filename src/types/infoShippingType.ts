export interface IShippingFee {
  toDistrict: number;
  toWard: string;
  totalPrice: number;
  quantity: number;
}

export interface Province {
  ProvinceID: number;
  ProvinceName: string;
}

export interface District {
  DistrictID: number;
  DistrictName: string;
}

export interface Ward {
  WardCode: string;
  WardName: string;
}
