import type { PlaylistResource } from "../../../infra/playlist/PlaylistResource";
import { GetPlaylistUseCase } from "./GetPlaylistUseCase";
import { CreatePlaylistUseCase } from "./CreatePlaylistUseCase";
import type { PlaylistView } from "../../../views/PlaylistView";

export class PlaylistService {
  private createPlaylistUsecase: CreatePlaylistUseCase;
  private getPlaylistUseCase: GetPlaylistUseCase;

  constructor(private readonly playlistResource: PlaylistResource) {
    this.createPlaylistUsecase = new CreatePlaylistUseCase(playlistResource);
    this.getPlaylistUseCase = new GetPlaylistUseCase(playlistResource);
  }
  async createPlaylist(title: string, modeId: string) {
    return await this.createPlaylistUsecase.execute(title, modeId);
  }

  async getPlaylists(userId: string): Promise<PlaylistView[]> {
    return await this.getPlaylistUseCase.execute(userId);
  }
}
