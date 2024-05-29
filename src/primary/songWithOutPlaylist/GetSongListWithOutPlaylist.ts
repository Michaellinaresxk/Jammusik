import { SongWithOutPlaylistResource } from "../../infra/songWithOutPlaylist/SongWithOutPlaylistResource";
import type { UseCase } from "../UseCase";
import { SongWithOutPlaylistView } from "../../views/SongWithOutPlaylistView";

export class GetSongListWithOutPlaylistUseCase implements UseCase {
  constructor(
    private songWithOutPlaylistRepository: SongWithOutPlaylistResource,
  ) {}

  async execute(
    categoryId: string,
    userId: string,
  ): Promise<SongWithOutPlaylistView[]> {
    const songList =
      await this.songWithOutPlaylistRepository.getSongsWithOutPlaylist(
        userId,
        categoryId,
      );

    return songList.map(SongWithOutPlaylistView.fromDomain);
  }
}
