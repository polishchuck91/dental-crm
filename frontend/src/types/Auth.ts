import { User } from "./User";

export interface UserCredentials {
  userIdentifier: string;
  password: string;
}

export interface UserSession {
  user: User;
  accessToken: string;
  refreshToken: string;
}
