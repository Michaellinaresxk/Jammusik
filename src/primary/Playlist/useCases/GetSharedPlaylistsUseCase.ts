import {PlaylistResource} from '../../../infra/playlist/PlaylistResource';
import {PlaylistView} from '../../../views/PlaylistView';
import {UseCase} from '../../UseCase';

export class GetSharedPlaylistsUseCase implements UseCase {
  constructor(private playlistResource: PlaylistResource) {}

  async execute(userId: string): Promise<PlaylistView[]> {
    try {
      const playlists = await this.playlistResource.getSharedPlaylists(userId);
      return playlists.map(playlist => ({
        id: playlist.id,
        title: playlist.title,
      }));
    } catch (err) {
      console.error('Error in GetSharedPlaylistsUseCase:', err);
      throw err;
    }
  }
}
