import { https } from "../config/axios";
import { IShippingFee } from "../types/infoShippingType";
const infoShipping = {
  getProvince() {
    return https.get(`/info-shipping/province`);
  },
  getDistrict(provinceId: number) {
    return https.get(`/info-shipping/districts?provinceId=${provinceId}`);
  },
  getWard(districtId: number) {
    return https.get(`/info-shipping/wards?districtId=${districtId}`);
  },
  getShippingFee(value: IShippingFee) {
    return https.post(`/info-shipping/fee`, {
      fromDistrict: 3440,
      fromWard: "13003",
      ...value,
    });
  },
};

export default infoShipping;
