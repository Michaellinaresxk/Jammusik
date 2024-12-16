import type { UseCase } from "../../UseCase";
import { PlaylistResource } from "../../../infra/playlist/PlaylistResource";

export class RemoveSongFromPlaylistUseCase implements UseCase {
  constructor(private playlistResource: PlaylistResource) {}

  async execute(userId: string, playlistId: string, songId: string) {
    await this.playlistResource.deletePlaylist(userId, playlistId, songId);
  }
}
