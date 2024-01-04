import type UserRepository from '../../domain/user/UserReporistory';
import { UserCaller } from './UserCaller';
import User from '../../domain/user/User';
import UserInfo from '../../domain/user/UserInfo';

export class UserResource implements UserRepository {
  constructor(public readonly userCaller: UserCaller) {}

  async registerUser(
    email: string,
    password: string,
    userName: string
  ): Promise<User> {
    const apiUser = await this.userCaller.createUser(email, password, userName);
    return User.fromProperties(apiUser);
  }

  async authUserWithGoogle(): Promise<User> {
    const apiUser = await this.userCaller.authWithGoogle();
    return User.fromProperties(apiUser);
  }

  async authUserWithFacebook(): Promise<User> {
    const apiUser = await this.userCaller.authWithFacebook();
    return User.fromProperties(apiUser);
  }

  async loginUser(email: string, password: string): Promise<User> {
    const user = await this.userCaller.loginUser(email, password);
    return User.fromProperties(user);
  }

  async getCurrentUser(userId: string): Promise<User> {
    const currentUser = await this.userCaller.getCurrentUser(userId);
    return User.fromProperties(currentUser!);
  }

  async logout(): Promise<void> {
    await this.userCaller.logout();
  }

  async setCurrentUser(
    userId: string,
    name: string,
    email: string,
    location: string,
    skills: string,
    instrument: string
  ): Promise<UserInfo> {
    const apiUserInfo = await this.userCaller.setCurrentUserInfo(
      userId,
      name,
      email,
      location,
      skills,
      instrument
    );
    return UserInfo.fromProperties(apiUserInfo);
  }

  async getCurrentUserInfo(userId: string): Promise<UserInfo> {
    const apiUserInfo = await this.userCaller.getCurrentUserInfo(userId);
    return UserInfo.fromProperties(apiUserInfo!);
  }
}
