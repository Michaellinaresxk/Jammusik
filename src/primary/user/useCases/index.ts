import type { UserResource } from "../../../infra/user/UserResource";
import CreateUserUseCase from "./CreateUserUseCase";

export class UserService {
  static logout() {
    throw new Error("Method not implemented.");
  }
  private createUserUseCase: CreateUserUseCase;

  constructor(private readonly userResource: UserResource) {
    this.createUserUseCase = new CreateUserUseCase(userResource);
  }

  async registerUser(email: string, password: string, userName: string) {
    return await this.createUserUseCase.execute(email, password, userName);
  }
}
