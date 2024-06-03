import type { UseCase } from "../UseCase";
import { SongWithOutPlaylistResource } from "../../infra/songWithOutPlaylist/SongWithOutPlaylistResource";

export class DeleteSongWithOutPlaylistUseCase implements UseCase {
  constructor(
    private songWithOutPlaylistResource: SongWithOutPlaylistResource,
  ) {}

  async execute(userId: string, songId: string) {
    await this.songWithOutPlaylistResource.deleteSong(userId, songId);
  }
}
