import {UserResource} from '../../../infra/user/UserResource';
import type {UseCase} from '../../../primary/UseCase';
import {UserView} from '../../../views/UserView';

export default class ForgotPasswordUseCase implements UseCase {
  constructor(private userResource: UserResource) {}

  async execute(email: string): Promise<UserView> {
    try {
      const user = await this.userResource.forgotPassword(email);

      return UserView.fromDomain(user);
    } catch (err) {
      console.log(err);
      throw err;
    }
  }
}
