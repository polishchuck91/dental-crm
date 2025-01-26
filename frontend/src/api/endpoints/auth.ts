import { SessionTokens, UserCredentials, UserSession } from "../../types/Auth";
import axiosInstance from "../axiosInstance";

export const login = (credentials: UserCredentials): Promise<UserSession> => {
  return axiosInstance
    .post<UserSession>("/auth/login", credentials)
    .then((res) => res.data);
};

export const refresh = (refreshToken: string) => {
  return axiosInstance
    .post<SessionTokens>("/auth/refresh", {
      refreshToken,
    })
    .then((res) => res.data);
};

export const logout = (refreshToken: string) => {
  return axiosInstance.post("/auth/logout", {
    refreshToken,
  });
};
