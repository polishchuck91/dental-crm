import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";
import { LocalStorage } from "../constants/storage";
import { SessionTokens, UserCredentials, UserSession } from "../types/Auth";
import { login, refresh } from "../api/endpoints/auth";
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
  refreshSession: () => Promise<SessionTokens | null>;
  setLoading: (loading: boolean) => void;
  clearAuth: () => void;
}

const useAuthStore = create<AuthState>()(
  persist(
    (set, get) => ({
      // Initial State
      user: null,
      [LocalStorage.accessToken]: null,
      [LocalStorage.refreshToken]: null,
      loading: false,

      // Set the loading state
      setLoading: (loading: boolean) => set({ loading }),

      // Clear all authentication-related states
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

          // Set the authorization header with the access token
          setAuthorizationHeader(result.accessToken);

          // Update the store with user and token data
          set((state) => ({
            ...state,
            user: result.user,
            ...(isRemember && {
              [LocalStorage.accessToken]: result.accessToken,
              [LocalStorage.refreshToken]: result.refreshToken,
            }),
          }));

          return result;
        } catch (error) {
          console.error("Login failed:", error);
          get().clearAuth();
          return null;
        } finally {
          set({ loading: false });
        }
      },

      // Fetch current user's details
      fetchMySelf: async () => {
        const { [LocalStorage.accessToken]: accessToken } = get();

        if (!accessToken) {
          console.warn("No access token found. Cannot fetch user details.");
          return;
        }

        set({ loading: true });
        try {
          setAuthorizationHeader(accessToken);
          const mySelf = await getMySelf();

          // Update user state only if it has changed
          set((state) => (state.user !== mySelf ? { user: mySelf } : state));
        } catch (error) {
          console.error("Failed to fetch user details:", error);
        } finally {
          set({ loading: false });
        }
      },

      // Refresh the session using the refresh token
      refreshSession: async () => {
        const { [LocalStorage.refreshToken]: refreshToken, clearAuth } = get();

        if (!refreshToken) {
          console.warn(
            "[Refresh Session]: No refresh token found. Logging out.",
          );
          clearAuth();
          return null;
        }

        set({ loading: true });
        try {
          const session = await refresh(refreshToken);

          // Update tokens in the store
          set({
            [LocalStorage.accessToken]: session.accessToken,
            [LocalStorage.refreshToken]: session.refreshToken,
          });

          // Set new authorization header
          setAuthorizationHeader(session.accessToken);

          return session; // Return the refreshed session
        } catch (error) {
          console.error("[Refresh Session]: Failed to refresh token.", error);
          clearAuth(); // Clear authentication on failure
          return null;
        } finally {
          set({ loading: false });
        }
      },
    }),
    {
      name: "auth-storage",
      storage: createJSONStorage(() => localStorage),
      partialize: (state) => ({
        [LocalStorage.accessToken]: state[LocalStorage.accessToken],
        [LocalStorage.refreshToken]: state[LocalStorage.refreshToken],
      }),
    },
  ),
);

export default useAuthStore;
