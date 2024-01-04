import { ModeResource } from '../infra/mode/ModeResource';
import { ModeCaller } from '../infra/mode/ModeCaller';
import type { InjectionKey } from 'vue';
import { ModeService } from '../primary/Mode';

const modeCaller = new ModeCaller();
const modeResource = new ModeResource(modeCaller);
const modeService = new ModeService(modeResource);

const modeServiceKey = Symbol() as InjectionKey<ModeService>;
export { modeService, modeServiceKey };
