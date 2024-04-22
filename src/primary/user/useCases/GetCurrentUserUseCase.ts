import { UserView } from "../../../views/UserView";
import type { UseCase } from "../../../primary/UseCase";
import { UserResource } from "../../../infra/user/UserResource";

export class GetCurrentUserUseCase implements UseCase {
  getCurrentUser() {
    throw new Error("Method not implemented.");
  }
  constructor(private userResource: UserResource) {}

  async execute(userId: string): Promise<UserView> {
    const user = await this.userResource.getCurrentUser(userId);
    return UserView.fromDomain(user);
  }
}
