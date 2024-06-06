import type { UserInfoResource } from "../../infra/userInfo/UserInfoResource";
import { SetCurrentUserInfoUseCase } from "./SetCurrentUserInfoUseCase";
import { GetCurrentUserInfoUseCase } from "./GetCurrentUserInfoUseCase";

export class UserInfoService {
  private setCurrentUserInfoUseCase: SetCurrentUserInfoUseCase;
  private getCurrentUserInfoUseCase: GetCurrentUserInfoUseCase;

  constructor(private readonly userInfoResource: UserInfoResource) {
    this.setCurrentUserInfoUseCase = new SetCurrentUserInfoUseCase(
      userInfoResource,
    );
    this.getCurrentUserInfoUseCase = new GetCurrentUserInfoUseCase(
      userInfoResource,
    );
  }

  async setCurrentUserInfo(
    userId: string,
    location?: string,
    skills?: string,
    instrument?: string,
  ) {
    return await this.setCurrentUserInfoUseCase.execute(
      userId,
      location,
      skills,
      instrument,
    );
  }

  async getCurrentUserInfo(userId: string) {
    return await this.getCurrentUserInfoUseCase.execute(userId);
  }
}
