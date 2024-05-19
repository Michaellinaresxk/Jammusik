import type { UserInfoResource } from "../../infra/userInfo/UserInfoResource";
import { SetCurrentUserInfoUseCase } from "./SetCurrentUserInfoUseCase";

export class UserInfoService {
  private setCurrentUserInfoUseCase: SetCurrentUserInfoUseCase;

  constructor(private readonly userInfoResource: UserInfoResource) {
    this.setCurrentUserInfoUseCase = new SetCurrentUserInfoUseCase(
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
}
