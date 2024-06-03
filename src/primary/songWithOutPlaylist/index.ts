import type { SongWithOutPlaylistResource } from "../../infra/songWithOutPlaylist/SongWithOutPlaylistResource";
import { CreateSongWithOutPlaylistUseCase } from "./CreateSongWithOutPlaylistUseCase";
import type { SongWithOutPlaylistView } from "../../views/SongWithOutPlaylistView";
import { GetSongListWithOutPlaylistUseCase } from "./GetSongListWithOutPlaylist";

export class SongWithOutPlaylistService {
  private createSongWithOutPlaylistUseCase: CreateSongWithOutPlaylistUseCase;
  private getSongListWithOutPlaylistUseCase: GetSongListWithOutPlaylistUseCase;
  constructor(
    private readonly songWithOutPlaylistResource: SongWithOutPlaylistResource,
  ) {
    this.createSongWithOutPlaylistUseCase =
      new CreateSongWithOutPlaylistUseCase(songWithOutPlaylistResource);
    this.getSongListWithOutPlaylistUseCase =
      new GetSongListWithOutPlaylistUseCase(songWithOutPlaylistResource);
  }

  async createSongWithOutPlaylist(
    userId: string,
    categoryId: string,
    title: string,
    artist: string,
  ): Promise<SongWithOutPlaylistView> {
    return await this.createSongWithOutPlaylistUseCase.execute(
      userId,
      categoryId,
      title,
      artist,
    );
  }

  async getSongsWithOutPlaylist(
    userId: string,
    categoryId: string,
  ): Promise<SongWithOutPlaylistView[]> {
    return this.getSongListWithOutPlaylistUseCase.execute(userId, categoryId);
  }
}
