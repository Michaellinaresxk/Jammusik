import type { UserInfoProperties } from "../../types/properties";

class UserInfo {
  private constructor(
    public readonly userId: string,
    public readonly name: string,
    public readonly email: string,
    public readonly location?: string,
    public readonly skills?: string,
    public readonly instrument?: string,
  ) {}
  static fromProperties(properties: UserInfoProperties) {
    const { userId, name, email, location, skills, instrument } = properties;
    return new UserInfo(userId, name, email, location, skills, instrument);
  }
  get properties(): UserInfoProperties {
    return Object.freeze({
      userId: this.userId,
      name: this.name,
      email: this.email,
      location: this.location,
      skills: this.skills,
      instrument: this.instrument,
    });
  }
}

export default UserInfo;
