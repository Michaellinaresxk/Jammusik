import type { UseCase } from "../../UseCase";
import { PlaylistResource } from "../../../infra/playlist/PlaylistResource";
import { PlaylistView } from "../../../views/PlaylistView";
export class GetPlaylistUseCase implements UseCase {
  constructor(private playlistRepository: PlaylistResource) {}

  async execute(userId: string): Promise<PlaylistView[]> {
    const playlists = await this.playlistRepository.getPlaylists(userId);
    return playlists.map(PlaylistView.fromDomain);
  }
}
