import type { ModeProperties } from "../../types/properties";

class Mode {
  constructor(public readonly id: string, public readonly title: string) {}
  static fromProperties(properties: ModeProperties) {
    const { id, title } = properties;
    return new Mode(id, title);
  }
  get properties(): ModeProperties {
    return Object.freeze({
      id: this.id,
      title: this.title,
    });
  }
}

export default Mode;
