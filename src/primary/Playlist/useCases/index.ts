import type { PlaylistResource } from "../../../infra/playlist/PlaylistResource";
import { GetPlaylistUseCase } from "./GetPlaylistUseCase";
import type { PlaylistView } from "../../../views/PlaylistView";
export class PlaylistService {
  private getPlaylistUseCase: GetPlaylistUseCase;

  constructor(private readonly playlistResource: PlaylistResource) {
    this.getPlaylistUseCase = new GetPlaylistUseCase(playlistResource);
  }

  async getPlaylists(userId: string): Promise<PlaylistView[]> {
    return await this.getPlaylistUseCase.execute(userId);
  }
}
