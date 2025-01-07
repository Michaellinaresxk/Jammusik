import {UseCase} from '../../UseCase';
import type {PlaylistResource} from '../../../infra/playlist/PlaylistResource';

export class AcceptSharedPlaylistUseCase implements UseCase {
  constructor(private playlistResource: PlaylistResource) {}

  async execute(sharedPlaylistId: string): Promise<void> {
    try {
      await this.playlistResource.acceptSharedPlaylist(sharedPlaylistId);
    } catch (error) {
      console.error('Error in AcceptSharedPlaylistUseCase:', error);
      throw error;
    }
  }
}
