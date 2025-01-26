import type {UserResource} from '../../../infra/user/UserResource';
import CreateUserUseCase from './CreateUserUseCase';
import {LoginUserUseCase} from './LoginUserUseCase';
import {GetCurrentUserUseCase} from './GetCurrentUserUseCase';
import {LogoutUserUseCase} from './LogoutUserUseCase';
import {DeleteUserUseCase} from './DeleteUserUseCase';
import ForgotPasswordUseCase from './ForgotPasswordUseCase';
import {LoginWithGoogleUseCase} from './LoginWithGoogleUseCase';

export class UserService {
  static logout() {
    throw new Error('Method not implemented.');
  }
  private createUserUseCase: CreateUserUseCase;
  private loginUserUseCase: LoginUserUseCase;
  private getCurrentUserUseCase: GetCurrentUserUseCase;
  private logoutUserUseCase: LogoutUserUseCase;
  private deleteUserUseCase: DeleteUserUseCase;
  private forgotPasswordUseCase: ForgotPasswordUseCase;
  private loginWithGoogleUseCase: LoginWithGoogleUseCase;

  constructor(private readonly userResource: UserResource) {
    this.createUserUseCase = new CreateUserUseCase(userResource);
    this.loginUserUseCase = new LoginUserUseCase(userResource);
    this.getCurrentUserUseCase = new GetCurrentUserUseCase(userResource);
    this.logoutUserUseCase = new LogoutUserUseCase(userResource);
    this.deleteUserUseCase = new DeleteUserUseCase(userResource);
    this.forgotPasswordUseCase = new ForgotPasswordUseCase(userResource);
    this.loginWithGoogleUseCase = new LoginWithGoogleUseCase(userResource);
  }

  async registerUser(email: string, password: string, userName: string) {
    return await this.createUserUseCase.execute(email, password, userName);
  }
  async loginUser(email: string, password: string) {
    return await this.loginUserUseCase.execute(email, password);
  }
  async getCurrentUser(userId: string) {
    return await this.getCurrentUserUseCase.execute(userId);
  }
  async logout(): Promise<void> {
    await this.logoutUserUseCase.execute();
  }
  async deleteUser(userId: string): Promise<void> {
    await this.deleteUserUseCase.execute(userId);
  }

  async loginWithGoogle() {
    return await this.loginWithGoogleUseCase.execute();
  }

  async forgotPassword(email: string) {
    return await this.forgotPasswordUseCase.execute(email);
  }
}
