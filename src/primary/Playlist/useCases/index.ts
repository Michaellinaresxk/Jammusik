import type { PlaylistResource } from '../../../infra/playlist/PlaylistResource';
import { CreatePlaylistUseCase } from '../../../primary/Playlist/useCases/CreatePlaylistUseCase';
import { GetPlaylistUseCase } from './GetPlaylistUseCase';
import { DeletePlaylistUseCase } from './DeletePlaylistUseCase';
import type { PlaylistView } from '../../../views/PlaylistView';

export class PlaylistService {
  private createPlaylistUsecase: CreatePlaylistUseCase;
  private getPlaylistUseCase: GetPlaylistUseCase;
  private deletePlaylistUseCase: DeletePlaylistUseCase;

  constructor(private readonly playlistResource: PlaylistResource) {
    this.createPlaylistUsecase = new CreatePlaylistUseCase(playlistResource);
    this.getPlaylistUseCase = new GetPlaylistUseCase(playlistResource);
    this.deletePlaylistUseCase = new DeletePlaylistUseCase(playlistResource);
  }

  async createPlaylist(title: string, modeId: string) {
    return await this.createPlaylistUsecase.execute(title, modeId);
  }
  async getPlaylists(userId: string): Promise<PlaylistView[]> {
    return await this.getPlaylistUseCase.execute(userId);
  }
  async deletePlaylist(playlistId: string): Promise<void> {
    return await this.deletePlaylistUseCase.execute(playlistId);
  }
}
