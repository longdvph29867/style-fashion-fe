import { https } from "../config/axios";
const authService = {
    refreshAccessToken(refreshToken: string){
        return https.post(`/auth/refresh-tokens`, {refreshToken})
    },
} 

export default authService;