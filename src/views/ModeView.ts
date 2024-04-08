
import type Mode from "@/domain/mode/Mode";

export class ModeView {

  private constructor(
    public readonly id: string,
    public readonly title: string,
  ) {}

  static fromDomain(mode: Mode) {
    const { id, title } = mode;
    return new ModeView(
      id,
      title,
    );
  }
}