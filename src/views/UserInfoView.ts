import type UserInfo from "../domain/user/UserInfo";

export class UserInfoView {
  private constructor(
    public readonly userId: string,
    public readonly name: string,
    public readonly email: string,
    public readonly location?: string,
    public readonly skills?: string,
    public readonly instrument?: string,
  ) {}

  static fromDomain(userInfo: UserInfo): UserInfoView {
    const { userId, name, email, location, skills, instrument } = userInfo;
    return new UserInfoView(userId, name, email, location, skills, instrument);
  }
}
