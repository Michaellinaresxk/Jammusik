import { SongWithOutPlaylistResource } from "../../infra/songWithOutPlaylist/SongWithOutPlaylistResource";
import type { UseCase } from "../UseCase";
import { SongWithOutPlaylistView } from "../../views/SongWithOutPlaylistView";

export class CreateSongWithOutPlaylistUseCase implements UseCase {
  constructor(
    private songWithOutPlaylistResource: SongWithOutPlaylistResource,
  ) {}

  async execute(
    userId: string,
    title: string,
    artist: string,
    categoryId: string,
  ): Promise<SongWithOutPlaylistView> {
    try {
      const songWithOutPlaylist =
        await this.songWithOutPlaylistResource.createSongWithOutPlaylist(
          userId,
          title,
          artist,
          categoryId,
        );
      return SongWithOutPlaylistView.fromDomain(songWithOutPlaylist);
    } catch (err) {
      console.log(err);
      throw err;
    }
  }
}
