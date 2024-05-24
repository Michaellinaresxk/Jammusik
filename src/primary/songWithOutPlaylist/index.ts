import type { SongWithOutPlaylistResource } from "../../infra/songWithOutPlaylist/SongWithOutPlaylistResource";
import { CreateSongWithOutPlaylistUseCase } from "./CreateSongWithOutPlaylistUseCase";
import type { SongWithOutPlaylistView } from "../../views/SongWithOutPlaylistView";

export class SongWithOutPlaylistService {
  private createSongWithOutPlaylistUseCase: CreateSongWithOutPlaylistUseCase;

  constructor(
    private readonly songWithOutPlaylistResource: SongWithOutPlaylistResource,
  ) {
    this.createSongWithOutPlaylistUseCase =
      new CreateSongWithOutPlaylistUseCase(songWithOutPlaylistResource);
  }

  async createSongWithOutPlaylist(
    title: string,
    artist: string,
    categoryId: string,
  ): Promise<SongWithOutPlaylistView> {
    return await this.createSongWithOutPlaylistUseCase.execute(
      title,
      artist,
      categoryId,
    );
  }
}
