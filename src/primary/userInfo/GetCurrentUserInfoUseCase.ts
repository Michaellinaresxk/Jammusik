import { UserInfoView } from "../../views/UserInfoView";
import type { UseCase } from "../../primary/UseCase";
import { UserInfoResource } from "../../infra/userInfo/UserInfoResource";

export class GetCurrentUserInfoUseCase implements UseCase {
  getCurrentUser() {
    throw new Error("Method not implemented.");
  }
  constructor(private userInfoResource: UserInfoResource) {}

  async execute(userId: string): Promise<UserInfoView> {
    const userInfo = await this.userInfoResource.getUserInfo(userId);
    return UserInfoView.fromDomain(userInfo);
  }
}
