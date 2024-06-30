import { https } from "../config/axios";
const cartService = {
    getProductByUserId(userId:string){
        return https.get(`/carts/${userId}`)
    },
} 

export default cartService;