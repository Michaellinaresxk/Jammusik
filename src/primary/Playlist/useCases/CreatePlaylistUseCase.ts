import type {UseCase} from '../../UseCase';
import {PlaylistResource} from '../../../infra/playlist/PlaylistResource';
import {PlaylistView} from '../../../views/PlaylistView';

export class CreatePlaylistUseCase implements UseCase {
  constructor(private playlistResource: PlaylistResource) {}

  async execute(title: string): Promise<PlaylistView> {
    try {
      const playlist = await this.playlistResource.createPlaylist(title);
      return PlaylistView.fromDomain(playlist);
    } catch (err) {
      console.log(err);
      throw err;
    }
  }
}
