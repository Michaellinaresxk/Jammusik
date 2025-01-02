import type {UseCase} from '../../UseCase';
import {PlaylistResource} from '../../../infra/playlist/PlaylistResource';

export class DeletePlaylistUseCase implements UseCase {
  constructor(private playlistResource: PlaylistResource) {}

  async execute(playlistId: string) {
    await this.playlistResource.deletePlaylist(playlistId);
  }
}
