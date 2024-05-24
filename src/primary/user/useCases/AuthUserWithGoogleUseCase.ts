import { UserResource } from "../../../infra/user/UserResource";
import type { UseCase } from "@/primary/UseCase";
import { UserView } from "@/views/UserView";

export default class AuthUserWithGoogleUseCase implements UseCase {
  constructor(private userResource: UserResource) {}

  async execute(): Promise<UserView> {
    try {
      const user = await this.userResource.authUserWithGoogle();
      return UserView.fromDomain(user);
    } catch (err) {
      console.log(err);
      throw err;
    }
  }
}
