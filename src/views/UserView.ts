import type User from '../domain/user/User';

export class UserView {
  private constructor(
    public readonly id: string,
    public readonly name: string,
    public readonly email: string,
  ) {}

  static fromDomain(user: User): UserView {
    const {id, name, email} = user;
    return new UserView(id, name, email);
  }
}
