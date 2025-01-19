import { User } from "../../types/User";
import axiosInstance from "../axiosInstance";

export const getMySelf = (): Promise<User> => {
  return axiosInstance.get("/users/myself").then((res) => res.data);
};
