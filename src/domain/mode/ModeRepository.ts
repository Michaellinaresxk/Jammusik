import type Mode from "./Mode";

export default interface ModeRepository {
  getModeTitles(): Promise<Mode[]>;
}
