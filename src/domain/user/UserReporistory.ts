import type User from "./User";
export default interface UserRepository {
  registerUser(
    email: string,
    password: string,
    userName: string,
  ): Promise<User>;
  loginUser(email: string, password: string): Promise<User>;
}
