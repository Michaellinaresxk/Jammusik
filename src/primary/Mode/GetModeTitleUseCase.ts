import type { UseCase } from '../../primary/UseCase';
import { ModeResource } from '../../infra/mode/ModeResource';
import { ModeView } from '../../views/ModeView';

export class GetModeTitleUseCase implements UseCase {
  constructor(private modeResource: ModeResource) {}

  async execute(): Promise<ModeView[]> {
    const mode = await this.modeResource.getModeTitles();
    return mode.map(ModeView.fromDomain);
  }
}
