import type { UseCase } from '../../../primary/UseCase';
import { UserResource } from '../../../infra/user/UserResource';
import { UserInfoView } from '../../../views/UserInfoView';

export class GetCurrentUserInfoUseCase implements UseCase {
  constructor(private userResource: UserResource) {}

  async execute(userId: string): Promise<UserInfoView | null> {
    const userInfo = await this.userResource.getCurrentUserInfo(userId);
    return UserInfoView.fromDomain(userInfo);
  }
}
