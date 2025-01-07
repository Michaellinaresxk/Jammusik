import {PlaylistResource} from '../../../infra/playlist/PlaylistResource';
import {UseCase} from '../../UseCase';

export class SharePlaylistUseCase implements UseCase {
  constructor(private playlistResource: PlaylistResource) {}

  async execute(playlistId: string, recipientEmail: string): Promise<void> {
    try {
      await this.playlistResource.sharePlaylist(playlistId, recipientEmail);
    } catch (err) {
      console.log('Error in SharePlaylistUseCase:', err);
      throw err;
    }
  }
}
