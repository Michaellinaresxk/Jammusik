import type { InjectionKey } from 'vue';
import { SongResource } from '../infra/song/SongResource';
import { SongCaller } from '../infra/song/SongCaller';
import { SongService } from '../primary/song/useCases/index';

const songCaller = new SongCaller();
const songResource = new SongResource(songCaller);
const songService = new SongService(songResource);

const songServiceKey = Symbol() as InjectionKey<SongService>;
export { songService, songServiceKey };
