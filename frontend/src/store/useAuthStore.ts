import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";
import { LocalStorage } from "../constants/storage";
import { SessionTokens, UserCredentials, UserSession } from "../types/Auth";
import { login, logout, refresh } from "../api/endpoints/auth";
import {
  deleteAuthorizationHeader,
  setAuthorizationHeader,
} from "../api/axiosInstance";
import { getMySelf } from "../api/endpoints/user";
import { User } from "../types/User";
import createLoadingSlice, { LoadingState } from "./useLoadingStore";

interface AuthState extends LoadingState {
  user: User | null;
  [LocalStorage.accessToken]: string | null;
  [LocalStorage.refreshToken]: string | null;
  // Methods
  userLogin: (
    data: UserCredentials,
    isRemember: boolean,
  ) => Promise<UserSession | null>;
  userLogout: () => Promise<void>;
  fetchMySelf: () => Promise<void>;
  refreshSession: () => Promise<SessionTokens | null>;
  clearAuth: () => void;
}

const useAuthStore = create<AuthState>()(
  persist(
    (set, get) => ({
      ...createLoadingSlice(set),
      // Initial State
      user: null,
      [LocalStorage.accessToken]: null,
      [LocalStorage.refreshToken]: null,

      /**
       * Clear all authentication-related states.
       */
      clearAuth: () => {
        set({
          user: null,
          [LocalStorage.accessToken]: null,
          [LocalStorage.refreshToken]: null,
        });
        deleteAuthorizationHeader();
      },

      /**
       * Handle user login process.
       */
      userLogin: async (data: UserCredentials, isRemember: boolean) => {
        set({ isLoading: true });
        try {
          const result = await login(data);

          // Update authorization header and store state
          setAuthorizationHeader(result.accessToken);

          set({
            user: result.user,
            ...(isRemember && {
              [LocalStorage.accessToken]: result.accessToken,
              [LocalStorage.refreshToken]: result.refreshToken,
            }),
          });

          return result;
        } catch (error) {
          console.error("[User Login]: Login failed.", error);
          get().clearAuth();
          return null;
        } finally {
          set({ isLoading: false });
        }
      },

      /**
       * Handle user logout process.
       */
      userLogout: async () => {
        set({ isLoading: true });
        try {
          const refreshToken = get()[LocalStorage.refreshToken];
          if (refreshToken) {
            await logout(refreshToken);
          }
        } catch (error) {
          console.warn(
            "[User Logout]: Logout failed or already logged out.",
            error,
          );
        } finally {
          set({ isLoading: false });
          get().clearAuth();
        }
      },

      /**
       * Fetch the current user's details.
       */
      fetchMySelf: async () => {
        const accessToken = get()[LocalStorage.accessToken];
        if (!accessToken) {
          console.warn("[Fetch MySelf]: No access token found.");
          return;
        }

        set({ isLoading: true });
        try {
          setAuthorizationHeader(accessToken);
          const mySelf = await getMySelf();

          // Update the user only if it has changed
          set((state) => (state.user !== mySelf ? { user: mySelf } : state));
        } catch (error) {
          console.error("[Fetch MySelf]: Failed to fetch user details.", error);
        } finally {
          set({ isLoading: false });
        }
      },

      /**
       * Refresh the session using the refresh token.
       */
      refreshSession: async () => {
        const refreshToken = get()[LocalStorage.refreshToken];
        if (!refreshToken) {
          console.warn(
            "[Refresh Session]: No refresh token found. Logging out.",
          );
          get().clearAuth();
          return null;
        }

        set({ isLoading: true });
        try {
          const session = await refresh(refreshToken);

          // Update tokens and set new authorization header
          set({
            [LocalStorage.accessToken]: session.accessToken,
            [LocalStorage.refreshToken]: session.refreshToken,
          });
          setAuthorizationHeader(session.accessToken);

          return session;
        } catch (error) {
          console.error("[Refresh Session]: Failed to refresh token.", error);
          get().clearAuth();
          return null;
        } finally {
          set({ isLoading: false });
        }
      },
    }),
    {
      name: "auth-storage", // Unique storage name
      storage: createJSONStorage(() => localStorage),
      partialize: (state) => ({
        [LocalStorage.accessToken]: state[LocalStorage.accessToken],
        [LocalStorage.refreshToken]: state[LocalStorage.refreshToken],
      }),
    },
  ),
);

export default useAuthStore;
