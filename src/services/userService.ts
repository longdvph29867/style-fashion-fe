import { https } from "../config/axios";

const userService = {
    async getAllUsers(limit: number, page: number) {
        return https.get(`/users?limit=${limit}&page=${page}`);
    }
}

export default userService;