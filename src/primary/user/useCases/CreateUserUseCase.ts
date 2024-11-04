import { UserResource } from "../../../infra/user/UserResource";
import type { UseCase } from "../../../primary/UseCase";
import { UserView } from "../../../views/UserView";

export default class UserRegistration implements UseCase {
  constructor(private userResource: UserResource) {}

  async execute(
    email: string,
    password: string,
    userName: string,
  ): Promise<UserView> {
    try {
      const user = await this.userResource.registerUser(
        email,
        password,
        userName,
      );

      return UserView.fromDomain(user);
    } catch (err) {
      console.log(err);
      throw err;
    }
  }
}
