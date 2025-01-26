import type {UseCase} from '../../UseCase';
import {UserResource} from '../../../infra/user/UserResource';

export class LoginWithGoogleUseCase implements UseCase {
  constructor(private userResource: UserResource) {}

  async execute() {
    return await this.userResource.loginWithGoogle();
  }
}
