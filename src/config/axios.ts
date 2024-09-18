import axios, { AxiosInstance } from "axios";
import { API_URL, API_URL_VERCEL } from "../constant/constant";
import { localTokenService } from "../services/localService";

export const BASE_URL = API_URL;
const accessToken = localTokenService.get();
const configHeadres = {
  Authorization:
    "Bearer " + (accessToken?.access.token ? accessToken?.access.token : ""),
};
export const https: AxiosInstance = axios.create({
  baseURL: BASE_URL,
  headers: configHeadres,
});

export const httpsVercel: AxiosInstance = axios.create({
  baseURL: API_URL_VERCEL,
  headers: configHeadres,
});
