import type UserInfo from "../domain/userInfo/UserInfo";

export class UserInfoView {
  private constructor(
    public readonly userId: string,
    public readonly location?: string,
    public readonly skills?: string,
    public readonly instrument?: string,
  ) {}

  static fromDomain(userInfo: UserInfo): UserInfoView {
    const { userId, location, skills, instrument } = userInfo;
    return new UserInfoView(userId, location, skills, instrument);
  }
}
