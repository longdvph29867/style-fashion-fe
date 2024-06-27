import { https } from "../config/axios"
import { City, District, FieldTypeShipping, ShippingAddress, Ward } from "../types/shippingAddress"

const shippingService = {
   async getShippingAll(userId:string){
    const response = await https.get(`/shipping-address/?userId=${userId}`)
    return response.data
   },
   async getShipping(userId:string,addressId:string){
    const response = await https.get<ShippingAddress>(`/shipping-address/?userId=${userId}&addressId=${addressId}`)
    return response.data
   },
   async postShippingAddress(userId:string,data:FieldTypeShipping){
      const response = await https.post<ShippingAddress[]>(`/shipping-address/?userId=${userId}`,data)
      return response.data
     },
     async putShippingAddress(userId:string,addressId: string,data:FieldTypeShipping){
      const response = await https.put(`/shipping-address/?userId=${userId}&addressId=${addressId}`,data)
      return response.data
     },
     async postSelectedShippingAddress(userId:string,addressId: string){
      const response = await https.post<ShippingAddress[]>(`/shipping-address/update-status?userId=${userId}&addressId=${addressId}`)
      return response.data
     },
     async deleteShippingAddress(userId:string,addressId: string){
      return await https.delete(`/shipping-address/?userId=${userId}&addressId=${addressId}`)
      
     },
   async getCities(){
    const response = await https.get<City[]>(`/cities`)
    return response.data
   },
   async getDistricts(cityId:string){
    const response = await https.get<District[]>(`/districts?cityId=${cityId}`)
    return response.data
   },
   async getWards(district:string){
    const response = await https.get<Ward[]>(`/wards?districtId=${district}`)
    return response.data
   }
}

export default shippingService