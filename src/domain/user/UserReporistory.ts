import type User from "./User";
export default interface UserRepository {
  registerUser(
    email: string,
    password: string,
    userName: string,
  ): Promise<User>;
  loginUser(email: string, password: string): Promise<User>;
  authUserWithGoogle(): Promise<User>;
  authUserWithFacebook(): Promise<User>;
  getCurrentUser(userId: string): Promise<User>;
  logout(): Promise<void>;
}
