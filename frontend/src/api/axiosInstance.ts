import axios from "axios";

const axiosInstance = axios.create({
  baseURL: "http://localhost:5000/api",
  timeout: 5000, // Optional: Set a timeout for requests
  headers: {
    "Content-Type": "application/json",
  },
});

export const setAuthorizationHeader = (token: string) => {
  axiosInstance.defaults.headers.common["Authorization"] = `Bearer ${token}`;
};

export default axiosInstance;
