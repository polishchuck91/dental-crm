import { Role } from "../constants/roles";

export interface UserCredentials {
  userIdentifier: string;
  password: string;
}

export interface UserSession {
  userId: string;
  email: string;
  role: Role;
  accessToken: string;
  refreshToken: string;
}
