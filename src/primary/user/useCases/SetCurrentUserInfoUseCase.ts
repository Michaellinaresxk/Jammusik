import { UserResource } from '../../../infra/user/UserResource';
import type { UseCase } from '../../../primary/UseCase';
import { UserInfoView } from '../../../views/UserInfoView';

export class SetCurrentUserInfoUseCase implements UseCase {
  constructor(private userResource: UserResource) {}

  async execute(
    userId: string,
    name: string,
    email: string,
    location: string,
    skills: string,
    instrument: string
  ): Promise<UserInfoView> {
    try {
      const userInfo = await this.userResource.setCurrentUser(
        userId,
        name,
        email,
        location,
        skills,
        instrument
      );

      return UserInfoView.fromDomain(userInfo);
    } catch (err) {
      console.log(err);
      throw err;
    }
  }
}
