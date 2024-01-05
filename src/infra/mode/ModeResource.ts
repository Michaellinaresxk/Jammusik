import type ModeRepository from '../../domain/mode/ModeRepository';
import { ModeCaller } from './ModeCaller';
import Mode from '../../domain/mode/Mode';

export class ModeResource implements ModeRepository {
  constructor(public readonly modeCaller: ModeCaller) {}

  async getModeTitles(): Promise<Mode[]> {
    const apiMode = await this.modeCaller.getModeTitles();
    return apiMode.map(
      (apiMode: { id: string; title: string }) =>
        new Mode(apiMode.id, apiMode.title)
    );
  }
}
