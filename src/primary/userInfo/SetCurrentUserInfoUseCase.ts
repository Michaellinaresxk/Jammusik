import { UserInfoResource } from "../../infra/userInfo/UserInfoResource";
import type { UseCase } from "../UseCase";
import { UserInfoView } from "../../views/UserInfoView";

export class SetCurrentUserInfoUseCase implements UseCase {
  constructor(private userInfoResource: UserInfoResource) {}

  async execute(
    userId: string,
    location?: string,
    skills?: string,
    instrument?: string,
  ): Promise<UserInfoView> {
    try {
      const userInfo = await this.userInfoResource.setCurrentUserInfo(
        userId,
        location,
        skills,
        instrument,
      );

      return UserInfoView.fromDomain(userInfo);
    } catch (err) {
      console.log(err);
      throw err;
    }
  }
}
