import {UseCase} from '../../UseCase';
import type {PlaylistResource} from '../../../infra/playlist/PlaylistResource';

export class RejectSharedPlaylistUseCase implements UseCase {
  constructor(private playlistResource: PlaylistResource) {}

  async execute(sharedPlaylistId: string): Promise<void> {
    try {
      await this.playlistResource.rejectSharedPlaylist(sharedPlaylistId);
    } catch (error) {
      console.error('Error in RejectSharedPlaylistUseCase:', error);
      throw error;
    }
  }
}
