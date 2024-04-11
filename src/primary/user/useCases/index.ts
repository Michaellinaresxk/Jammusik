import type { UserResource } from "../../../infra/user/UserResource";
import CreateUserUseCase from "./CreateUserUseCase";
import { LoginUserUseCase } from "./LoginUserUseCase";
import { LogoutUserUseCase } from "./LogoutUserUseCase";
export class UserService {
  static logout() {
    throw new Error("Method not implemented.");
  }
  private createUserUseCase: CreateUserUseCase;
  private loginUserUseCase: LoginUserUseCase;
  private logoutUserUseCase: LogoutUserUseCase;

  constructor(private readonly userResource: UserResource) {
    this.createUserUseCase = new CreateUserUseCase(userResource);
    this.loginUserUseCase = new LoginUserUseCase(userResource);
    this.logoutUserUseCase = new LogoutUserUseCase(userResource);
  }

  async registerUser(email: string, password: string, userName: string) {
    return await this.createUserUseCase.execute(email, password, userName);
  }
  async loginUser(email: string, password: string) {
    return await this.loginUserUseCase.execute(email, password);
  }
  async logout(): Promise<void> {
    await this.logoutUserUseCase.execute();
  }
}
