import { User } from "./User";

export interface UserCredentials {
  userIdentifier: string;
  password: string;
}

export interface SessionTokens {
  accessToken: string;
  refreshToken: string;
}

export interface UserSession extends SessionTokens {
  user: User;
}
