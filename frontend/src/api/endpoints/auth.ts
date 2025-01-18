import { UserCredentials, UserSession } from "../../types/Auth";
import axiosInstance from "../axiosInstance";

export const login = (credentials: UserCredentials): Promise<UserSession> => {
  return axiosInstance
    .post<UserSession>("/auth/login", credentials)
    .then((res) => res.data);
};

export const logout = () => {
  return axiosInstance.post("/auth/logout");
};
