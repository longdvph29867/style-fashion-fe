import { InforUserType } from "../types/login";

const USER_INFO_FASHION = 'USER_INFO_FASHION';
export const localUserService = {
  get: (): InforUserType | null => {
    const jsonData = localStorage.getItem(USER_INFO_FASHION);
    return JSON.parse((jsonData as string));
  },
  set: (userInfo: object) => {
    const jsonData = JSON.stringify(userInfo);
    localStorage.setItem(USER_INFO_FASHION, jsonData);
  },
  remove: () => {
    localStorage.removeItem(USER_INFO_FASHION);
  },
}