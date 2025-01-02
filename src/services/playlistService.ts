import {PlaylistResource} from '../infra/playlist/PlaylistResource';
import {PlaylistCaller} from '../infra/playlist/PlaylistCaller';
import {PlaylistService} from '../primary/Playlist/useCases/index';

const playlistCaller = new PlaylistCaller();
const playlistResource = new PlaylistResource(playlistCaller);
const playlistService = new PlaylistService(playlistResource);

export {playlistService};
