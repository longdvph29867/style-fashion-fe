export type City = {
    _id: string,
    name: string,
    idCity: number
}

export type District = {
  _id: string,
    name: string,
    idDistrict: number,
    cityId: string
}

export type Ward = {
  _id: string,
  name: string,
  districtId: number
}
export type FieldTypeShipping = {
    recipientName: string
    recipientPhoneNumber: string,
    streetAddress: string,
    wardCommune: string,
    district: string,
    cityProvince: string
    selected:boolean
}

export type ShippingAddress = {
recipientName: string;
  recipientPhoneNumber: string;
  streetAddress: string;
  wardCommune: string;
  district: string;
  selected:boolean
  cityProvince: string;
  _id: string;
}

export type FormActionShipping = {
 type:"update" | "create" 
 id?:string
  }