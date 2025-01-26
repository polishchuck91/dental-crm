import axios from "axios";
import { AxiosError, InternalAxiosRequestConfig } from "axios";
import useAuthStore from "../store/useAuthStore";

const axiosInstance = axios.create({
  baseURL: "http://localhost:5000/api",
  timeout: 5000, // Optional: Set a timeout for requests
  headers: {
    "Content-Type": "application/json",
  },
});

const EXCLUDED_ROUTES = ["/auth/login", "/auth/refresh"];

export const setAuthorizationHeader = (token: string) => {
  axiosInstance.defaults.headers.common["Authorization"] = `Bearer ${token}`;
};

export const deleteAuthorizationHeader = () => {
  delete axiosInstance.defaults.headers.common["Authorization"];
};

// Request Interceptor: Attach Authorization header if accessToken exists
axiosInstance.interceptors.request.use(
  (config: InternalAxiosRequestConfig) => {
    const accessToken = useAuthStore.getState().accessToken;

    if (accessToken && config.headers) {
      config.headers.Authorization = `Bearer ${accessToken}`;
    }
    return config;
  },
  (error: AxiosError) => {
    console.error("[Request Interceptor Error]:", error.message);
    return Promise.reject(error);
  },
);

// Response Interceptor: Handle errors such as token expiration (401)
axiosInstance.interceptors.response.use(
  (response) => response,
  async (error: AxiosError) => {
    const originalRequest = error.config as InternalAxiosRequestConfig & {
      _retry?: boolean;
    };

    // Skip excluded routes
    const isExcludedRoute = EXCLUDED_ROUTES.some((route) =>
      originalRequest?.url?.includes(route),
    );

    if (error.response?.status === 401 && !isExcludedRoute) {
      // Prevent infinite retry loops
      if (originalRequest._retry) {
        console.error("[Token Refresh Failed]: Unable to re-authenticate.");
        return Promise.reject(error);
      }

      originalRequest._retry = true;

      try {
        console.warn("[Token Expired]: Refreshing token...");
        const { refreshSession } = useAuthStore.getState();

        // Refresh the token
        const refreshedSession = await refreshSession();

        // Retry the original request with the new access token
        if (refreshedSession?.accessToken && originalRequest.headers) {
          originalRequest.headers.Authorization = `Bearer ${refreshedSession.accessToken}`;
          return axiosInstance(originalRequest); // Retry request
        }
      } catch (refreshError) {
        console.error(
          "[Token Refresh Error]: Could not refresh token.",
          refreshError,
        );
        useAuthStore.getState().clearAuth(); // Clear authentication on failure
        return Promise.reject(refreshError);
      }
    }

    // Handle other errors
    return Promise.reject(error);
  },
);

export default axiosInstance;
