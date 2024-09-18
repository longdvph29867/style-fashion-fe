import { https } from "../config/axios";

const userService = {
    getAllUsers(limit: number, page: number) {
        return https.get(`/users?limit=${limit}&page=${page}`);
    },
    getAllUsersV2(queryUrl: string) {
        if (queryUrl) {
            return https.get(`/users?${queryUrl}`);
        } else {
            return https.get(`/users`);
        }
    },
}

export default userService;