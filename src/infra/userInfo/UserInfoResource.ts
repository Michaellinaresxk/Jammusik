import type UserInfoRepository from "../../domain/userInfo/UserInfoRepository";
import { UserInfoCaller } from "./UserInfoCaller";
import UserInfo from "../../domain/userInfo/UserInfo";

export class UserInfoResource implements UserInfoRepository {
  constructor(public readonly userInfoCaller: UserInfoCaller) {}

  async setCurrentUserInfo(
    userId: string,
    skills?: string,
    location?: string,
    instrument?: string,
  ): Promise<UserInfo> {
    const apiUserInfo = await this.userInfoCaller.setCurrentUserInfo(
      userId,
      skills,
      location,
      instrument,
    );
    return UserInfo.fromProperties(apiUserInfo);
  }

  async getUserInfo(userId: string): Promise<UserInfo> {
    const currentUserInfo = await this.userInfoCaller.getUserInfo(userId);
    return UserInfo.fromProperties(currentUserInfo!);
  }
}
