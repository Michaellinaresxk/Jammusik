import type {PlaylistResource} from '../../../infra/playlist/PlaylistResource';
import {GetPlaylistUseCase} from './GetPlaylistUseCase';
import {CreatePlaylistUseCase} from './CreatePlaylistUseCase';
import {UpdatePlaylistUseCase} from './UpdatePlaylistUseCase';
import {DeletePlaylistUseCase} from './DeletePlaylistUseCase';

import type {PlaylistView} from '../../../views/PlaylistView';

export class PlaylistService {
  private createPlaylistUsecase: CreatePlaylistUseCase;
  private getPlaylistUseCase: GetPlaylistUseCase;
  private updatePlaylistUseCase: UpdatePlaylistUseCase;
  private deletePlaylistUseCase: DeletePlaylistUseCase;

  constructor(private readonly playlistResource: PlaylistResource) {
    this.createPlaylistUsecase = new CreatePlaylistUseCase(playlistResource);
    this.getPlaylistUseCase = new GetPlaylistUseCase(playlistResource);
    this.updatePlaylistUseCase = new UpdatePlaylistUseCase(playlistResource);
    this.deletePlaylistUseCase = new DeletePlaylistUseCase(playlistResource);
  }
  async createPlaylist(title: string) {
    return await this.createPlaylistUsecase.execute(title);
  }

  async getPlaylists(userId: string): Promise<PlaylistView[]> {
    return await this.getPlaylistUseCase.execute(userId);
  }

  async updatePlaylist(
    playlistId: string,
    title: string,
  ): Promise<PlaylistView[]> {
    return await this.updatePlaylistUseCase.execute(playlistId, title);
  }

  async deletePlaylist(playlistId: string): Promise<void> {
    return await this.deletePlaylistUseCase.execute(playlistId);
  }
}
