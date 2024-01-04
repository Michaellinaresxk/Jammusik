import { PlaylistResource } from '../infra/playlist/PlaylistResource';
import { PlaylistCaller } from '../infra/playlist/PlaylistCaller';
import { PlaylistService } from '../primary/Playlist/useCases/index';
import type { InjectionKey } from 'vue';

const playlistCaller = new PlaylistCaller();
const playlistResource = new PlaylistResource(playlistCaller);
const playlistService = new PlaylistService(playlistResource);

const playlistServiceKey = Symbol() as InjectionKey<PlaylistService>;
export { playlistService, playlistServiceKey };
