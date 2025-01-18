import { FC, ReactNode, useLayoutEffect } from "react";
import useAuthStore from "../store/useAuthStore";

interface AuthProviderProps {
  children: ReactNode;
}

const AuthProvider: FC<AuthProviderProps> = ({ children }) => {
  const { fetchMySelf } = useAuthStore();

  useLayoutEffect(() => {
    fetchMySelf();
  }, []);

  return children;
};

export default AuthProvider;
