import type { UserInfoProperties } from "../../types/properties";

class UserInfo {
  private constructor(
    public readonly userId: string,
    public readonly location?: string,
    public readonly instrument?: string,
    public readonly skills?: string,
  ) {}
  static fromProperties(properties: UserInfoProperties) {
    const { userId, location, skills, instrument } = properties;
    return new UserInfo(userId, location, skills, instrument);
  }
  get properties(): UserInfoProperties {
    return Object.freeze({
      userId: this.userId,
      location: this.location,
      skills: this.skills,
      instrument: this.instrument,
    });
  }
}

export default UserInfo;
