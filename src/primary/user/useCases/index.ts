import type { UserResource } from '../../../infra/user/UserResource';
import CreateUserUseCase from './CreateUserUseCase';
import { LoginUserUseCase } from './LoginUserUseCase';
import { LogoutUserUseCase } from './LogoutUserUseCase';
import { GetCurrentUserUseCase } from './GetCurrentUserUseCase';
import { SetCurrentUserInfoUseCase } from './SetCurrentUserInfoUseCase';
import { GetCurrentUserInfoUseCase } from './GetCurrentUserInfoUseCase';
import AuthUserWithGoogleUseCase from './AuthUserWithGoogleUseCase';
import AuthUserWithFacebookUseCase from './AuthWithFacebookUseCase';

export class UserService {
  static logout() {
    throw new Error('Method not implemented.');
  }
  private createUserUseCase: CreateUserUseCase;
  private authUserWithGoogleUseCase: AuthUserWithGoogleUseCase;
  private authUserWithFacebookUseCase: AuthUserWithFacebookUseCase;
  private loginUserUseCase: LoginUserUseCase;
  private getCurrentUserUseCase: GetCurrentUserUseCase;
  private logoutUserUseCase: LogoutUserUseCase;
  private setCurrentUserInfoUseCase: SetCurrentUserInfoUseCase;
  private getCurrentUserInfoUseCase: GetCurrentUserInfoUseCase;

  constructor(private readonly userResource: UserResource) {
    this.createUserUseCase = new CreateUserUseCase(userResource);
    this.authUserWithGoogleUseCase = new AuthUserWithGoogleUseCase(
      userResource
    );
    this.authUserWithFacebookUseCase = new AuthUserWithFacebookUseCase(
      userResource
    );
    this.loginUserUseCase = new LoginUserUseCase(userResource);
    this.getCurrentUserUseCase = new GetCurrentUserUseCase(userResource);
    this.logoutUserUseCase = new LogoutUserUseCase(userResource);
    this.setCurrentUserInfoUseCase = new SetCurrentUserInfoUseCase(
      userResource
    );
    this.getCurrentUserInfoUseCase = new GetCurrentUserInfoUseCase(
      userResource
    );
  }

  async registerUser(email: string, password: string, userName: string) {
    return await this.createUserUseCase.execute(email, password, userName);
  }

  async authUserGoogle() {
    return await this.authUserWithGoogleUseCase.execute();
  }

  async authUserFacebook() {
    return await this.authUserWithFacebookUseCase.execute();
  }

  async loginUser(email: string, password: string) {
    return await this.loginUserUseCase.execute(email, password);
  }

  async getCurrentUser(userId: string) {
    return await this.getCurrentUserUseCase.execute(userId);
  }

  async setCurrentUserInfo(
    userId: string,
    name: string,
    email: string,
    location: string,
    skills: string,
    instrument: string
  ) {
    return await this.setCurrentUserInfoUseCase.execute(
      userId,
      name,
      email,
      location,
      skills,
      instrument
    );
  }

  async getCurrentUserInfo(userId: string) {
    return await this.getCurrentUserInfoUseCase.execute(userId);
  }

  async logout(): Promise<void> {
    await this.logoutUserUseCase.execute();
  }
}
