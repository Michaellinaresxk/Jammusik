import type UserInfo from "./UserInfo";

export default interface UserInfoRepository {
  setCurrentUserInfo(
    userId: string,
    location?: string,
    skills?: string,
    instrument?: string,
  ): Promise<UserInfo>;
  getUserInfo(userId: string): Promise<UserInfo>;
}
