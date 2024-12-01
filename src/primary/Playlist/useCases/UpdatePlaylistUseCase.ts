import type {UseCase} from '../../UseCase';
import {PlaylistResource} from '../../../infra/playlist/PlaylistResource';
import {PlaylistView} from '../../../views/PlaylistView';

export class UpdatePlaylistUseCase implements UseCase {
  constructor(private playlistResource: PlaylistResource) {}

  async execute(playlistId: string, title: string): Promise<PlaylistView> {
    try {
      const playlist = await this.playlistResource.updatePlaylist(
        playlistId,
        title,
      );
      return PlaylistView.fromDomain(playlist);
    } catch (err) {
      console.log(err);
      throw err;
    }
  }
}
