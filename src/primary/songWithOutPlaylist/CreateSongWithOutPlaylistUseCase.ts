import { SongWithOutPlaylistResource } from "../../infra/songWithOutPlaylist/SongWithOutPlaylistResource";
import type { UseCase } from "../UseCase";
import { SongWithOutPlaylistView } from "../../views/SongWithOutPlaylistView";

export class CreateSongWithOutPlaylistUseCase implements UseCase {
  constructor(
    private songWithOutPlaylistResource: SongWithOutPlaylistResource,
  ) {}

  async execute(
    userId: string,
    categoryId: string,
    title: string,
    artist: string,
  ): Promise<SongWithOutPlaylistView> {
    try {
      const songWithOutPlaylist =
        await this.songWithOutPlaylistResource.createSongWithOutPlaylist(
          userId,
          categoryId,
          title,
          artist,
        );
      return SongWithOutPlaylistView.fromDomain(songWithOutPlaylist);
    } catch (err) {
      console.log(err);
      throw err;
    }
  }
}
