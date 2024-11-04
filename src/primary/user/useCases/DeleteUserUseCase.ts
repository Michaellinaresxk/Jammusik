import type { UseCase } from "../../UseCase";
import { UserResource } from "../../../infra/user/UserResource";

export class DeleteUserUseCase implements UseCase {
  constructor(private userResource: UserResource) {}

  async execute(userId: string): Promise<void> {
    return await this.userResource.deleteAccount(userId);
  }
}
