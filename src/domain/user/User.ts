import type { UserProperties } from "@/types/properties";

class User {
  private constructor(
    public readonly id: string,
    public readonly name: string,
    public readonly email: string,
  ) {}
  static fromProperties(properties: UserProperties) {
    const { id, name, email } = properties;
    return new User(id, name, email);
  }
  get properties(): UserProperties {
    return Object.freeze({
      id: this.id,
      name: this.name,
      email: this.email,
    });
  }
}

export default User;
