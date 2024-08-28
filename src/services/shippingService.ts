import { https } from "../config/axios";
import {
  BodyShippingAddress,
  FieldTypeShipping,
  ShippingAddressType,
} from "../types/shippingAddress";

const shippingService = {
  async getShippingAll(userId: string) {
    const response = await https.get<ShippingAddressType[]>(
      `/shipping-address/?userId=${userId}`
    );
    return response.data;
  },
  async getShipping(userId: string, addressId: string) {
    const response = await https.get(
      `/shipping-address/?userId=${userId}&addressId=${addressId}`
    );
    return response.data;
  },
  async postShippingAddress(userId: string, data: BodyShippingAddress) {
    const response = await https.post<[]>(
      `/shipping-address/?userId=${userId}`,
      data
    );
    return response.data;
  },
  async putShippingAddress(
    userId: string,
    addressId: string,
    data: FieldTypeShipping
  ) {
    const response = await https.put(
      `/shipping-address/?userId=${userId}&addressId=${addressId}`,
      data
    );
    return response.data;
  },
  async postSelectedShippingAddress(userId: string, addressId: string) {
    const response = await https.post<ShippingAddressType[]>(
      `/shipping-address/update-status?userId=${userId}&addressId=${addressId}`
    );
    return response.data;
  },
  async deleteShippingAddress(userId: string, addressId: string) {
    return await https.delete(
      `/shipping-address/?userId=${userId}&addressId=${addressId}`
    );
  },
};

export default shippingService;
