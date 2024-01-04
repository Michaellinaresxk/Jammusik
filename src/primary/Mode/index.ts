import type { ModeResource } from '../../infra/mode/ModeResource';
import { GetModeTitleUseCase } from './GetModeTitleUseCase';
import type { ModeView } from '../../views/ModeView';

export class ModeService {
  private getModeTitleUseCase: GetModeTitleUseCase;

  constructor(private readonly modeResource: ModeResource) {
    this.getModeTitleUseCase = new GetModeTitleUseCase(modeResource);
  }

  async getModeTitles(): Promise<ModeView[]> {
    return await this.getModeTitleUseCase.execute();
  }
}
