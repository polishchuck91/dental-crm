import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";
import { LocalStorage } from "../constants/storage";
import { UserCredentials, UserSession } from "../types/Auth";
import { login } from "../api/endpoints/auth";
import { setAuthorizationHeader } from "../api/axiosInstance";
import { getMySelf } from "../api/endpoints/user";
import { User } from "../types/User";

interface AuthState {
  user: User | null;
  [LocalStorage.accessToken]: string | null;
  [LocalStorage.refreshToken]: string | null;
  loading: boolean;
  userLogin: (data: UserCredentials) => Promise<UserSession | null>;
  fetchMySelf: () => Promise<void>;
  setLoading: (loading: boolean) => void;
}

const useAuthStore = create<AuthState>()(
  persist(
    (set, get) => ({
      user: null,
      [LocalStorage.accessToken]: null,
      [LocalStorage.refreshToken]: null,
      loading: false,

      setLoading: (loading: boolean) => set({ loading }),

      userLogin: async (data: UserCredentials) => {
        try {
          set({ loading: true }); // Start loading
          const result = await login(data);

          setAuthorizationHeader(result.accessToken);

          set({
            user: result.user,
            [LocalStorage.accessToken]: result.accessToken,
            [LocalStorage.refreshToken]: result.refreshToken,
          });

          return result;
        } catch (error) {
          console.error(error);
          return null;
        } finally {
          set({ loading: false }); // End loading
        }
      },

      fetchMySelf: async () => {
        const {
          [LocalStorage.accessToken]: accessToken,
          [LocalStorage.refreshToken]: refreshToken,
        } = get();

        if (!accessToken || !refreshToken) return;

        try {
          set({ loading: true }); // Start loading
          setAuthorizationHeader(accessToken);

          const mySelf = await getMySelf();

          set({ user: mySelf });
        } catch (error) {
          console.error(error);
        } finally {
          set({ loading: false }); // End loading
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
