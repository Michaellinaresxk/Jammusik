import type { UseCase } from "../../UseCase";
import { UserResource } from "../../../infra/user/UserResource";

export class LoginUserUseCase implements UseCase {
  constructor(private userResource: UserResource) {}

  async execute(email: string, password: string) {
    return await this.userResource.loginUser(email, password);
  }
}
