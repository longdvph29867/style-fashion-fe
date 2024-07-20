import { InforUserType, UserTokenType } from "../types/login";

const USER_INFO_FASHION = "USER_INFO_FASHION";
const USER_TOKEN_FASHION = "USER_TOKEN_FASHION";
export const localUserService = {
  get: (): InforUserType | null => {
    const jsonData = localStorage.getItem(USER_INFO_FASHION);
    return JSON.parse(jsonData as string);
  },
  set: (userInfo: object) => {
    const jsonData = JSON.stringify(userInfo);
    localStorage.setItem(USER_INFO_FASHION, jsonData);
  },
  remove: () => {
    localStorage.removeItem(USER_INFO_FASHION);
  },
};

export const localTokenService = {
  get: (): UserTokenType | null => {
    const jsonData = localStorage.getItem(USER_TOKEN_FASHION);
    return JSON.parse(jsonData as string);
  },
  set: (userInfo: object) => {
    const jsonData = JSON.stringify(userInfo);
    localStorage.setItem(USER_TOKEN_FASHION, jsonData);
  },
  remove: () => {
    localStorage.removeItem(USER_TOKEN_FASHION);
  },
};
