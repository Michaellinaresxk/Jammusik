export interface LogoutUser {
  logout: () => Promise<void>;
  userLogout: () => Promise<void>;
}