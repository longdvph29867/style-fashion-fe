import authService from "../services/authService";
import { localTokenService, localUserService } from "../services/localService";

export const isAccessTokenValid = () => {
  const expiry = localTokenService.get()?.access.expires;
  if (expiry) {
    return new Date(expiry) > new Date();
  }
  return false;
};

export const refreshToken = async () => {
  try {
    const refreshToken = localTokenService.get()?.refresh.token;
    if (refreshToken) {
      const res = await authService.refreshAccessToken(refreshToken);
      localTokenService.set(res.data);
      //   window.location.href = "/";
    }
  } catch (error) {
    console.log(error);
    localTokenService.remove();
    localUserService.remove();
    // window.location.href = "/";
  }
};
