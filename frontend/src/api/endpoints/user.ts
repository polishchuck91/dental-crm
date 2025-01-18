import axiosInstance from "../axiosInstance";

export const getMySelf = () => {
  return axiosInstance.get("/users/myself").then((res) => res.data);
};
