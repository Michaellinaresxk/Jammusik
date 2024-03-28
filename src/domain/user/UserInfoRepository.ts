import type UserInfo from "./UserInfo";

export default interface UserInfoRepository {
  setCurrentUserInfo(
    userId: string,
    name: string,
    email: string,
    location: string,
    skills: string,
    instrument: string,
  ): Promise<UserInfo>;

  getCurrentUserInfo(userId: string): Promise<UserInfo>;
}
