import type {UseCase} from '../../UseCase';
import {UserResource} from '../../../infra/user/UserResource';

export class LogoutUserUseCase implements UseCase {
  constructor(private userResource: UserResource) {}

  async execute(): Promise<void> {
    return await this.userResource.logout();
  }
}
