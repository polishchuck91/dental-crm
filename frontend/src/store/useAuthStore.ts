import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";
import { LocalStorage } from "../constants/storage";
import { UserCredentials, UserSession } from "../types/Auth";
import { login } from "../api/endpoints/auth";
import {
  deleteAuthorizationHeader,
  setAuthorizationHeader,
} from "../api/axiosInstance";
import { getMySelf } from "../api/endpoints/user";
import { User } from "../types/User";

interface AuthState {
  user: User | null;
  [LocalStorage.accessToken]: string | null;
  [LocalStorage.refreshToken]: string | null;
  loading: boolean;
  userLogin: (
    data: UserCredentials,
    isRemember: boolean,
  ) => Promise<UserSession | null>;
  fetchMySelf: () => Promise<void>;
  setLoading: (loading: boolean) => void;
  clearAuth: () => void;
}

const useAuthStore = create<AuthState>()(
  persist(
    (set, get) => ({
      user: null,
      [LocalStorage.accessToken]: null,
      [LocalStorage.refreshToken]: null,
      loading: false,

      // Set loading state
      setLoading: (loading: boolean) => set({ loading }),

      // Clear authentication state and remove authorization header
      clearAuth: () => {
        set({
          user: null,
          [LocalStorage.accessToken]: null,
          [LocalStorage.refreshToken]: null,
        });
        deleteAuthorizationHeader();
      },

      // Handle user login
      userLogin: async (data: UserCredentials, isRemember: boolean) => {
        set({ loading: true });
        try {
          const result = await login(data);

          // Update authorization header with the access token
          setAuthorizationHeader(result.accessToken);

          // Set user and tokens in the store
          set({
            user: result.user,
            ...(isRemember && {
              [LocalStorage.accessToken]: result.accessToken,
              [LocalStorage.refreshToken]: result.refreshToken,
            }),
          });

          return result;
        } catch (error) {
          console.error("Login failed:", error);
          get().clearAuth();
          return null;
        } finally {
          set({ loading: false });
        }
      },

      // Fetch current user details
      fetchMySelf: async () => {
        const { [LocalStorage.accessToken]: accessToken } = get();

        if (!accessToken) {
          console.warn("No access token found. Cannot fetch user details.");
          return;
        }

        set({ loading: true });
        try {
          // Set the authorization header before making the request
          setAuthorizationHeader(accessToken);

          const mySelf = await getMySelf();

          set({ user: mySelf });
        } catch (error) {
          console.error("Failed to fetch user details:", error);
          get().clearAuth();
        } finally {
          set({ loading: false });
        }
      },
    }),
    {
      name: "auth-storage",
      storage: createJSONStorage(() => localStorage),
      partialize: (state) => {
        const {
          [LocalStorage.accessToken]: accessToken,
          [LocalStorage.refreshToken]: refreshToken,
        } = state;
        return {
          [LocalStorage.accessToken]: accessToken,
          [LocalStorage.refreshToken]: refreshToken,
        };
      },
    },
  ),
);

export default useAuthStore;
