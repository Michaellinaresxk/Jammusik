import type { SongWithOutPlaylistResource } from "../../infra/songWithOutPlaylist/SongWithOutPlaylistResource";
import { CreateSongWithOutPlaylistUseCase } from "./CreateSongWithOutPlaylistUseCase";
import type { SongWithOutPlaylistView } from "../../views/SongWithOutPlaylistView";
import { GetSongListWithOutPlaylistUseCase } from "./GetSongListWithOutPlaylist";
import { DeleteSongWithOutPlaylistUseCase } from "./DeleteSongWithOutPlaylistUseCase";

export class SongWithOutPlaylistService {
  private createSongWithOutPlaylistUseCase: CreateSongWithOutPlaylistUseCase;
  private getSongListWithOutPlaylistUseCase: GetSongListWithOutPlaylistUseCase;
  private deleteSongWithOutPlaylistUseCase: DeleteSongWithOutPlaylistUseCase;
  constructor(
    private readonly songWithOutPlaylistResource: SongWithOutPlaylistResource,
  ) {
    this.createSongWithOutPlaylistUseCase =
      new CreateSongWithOutPlaylistUseCase(songWithOutPlaylistResource);
    this.getSongListWithOutPlaylistUseCase =
      new GetSongListWithOutPlaylistUseCase(songWithOutPlaylistResource);
    this.deleteSongWithOutPlaylistUseCase =
      new DeleteSongWithOutPlaylistUseCase(songWithOutPlaylistResource);
  }

  async createSongWithOutPlaylist(
    userId: string,
    categoryId: string,
    title: string,
    artist: string,
    isDone: boolean,
  ): Promise<SongWithOutPlaylistView> {
    return await this.createSongWithOutPlaylistUseCase.execute(
      userId,
      categoryId,
      title,
      artist,
      isDone,
    );
  }

  async getSongsWithOutPlaylist(
    userId: string,
    categoryId: string,
  ): Promise<SongWithOutPlaylistView[]> {
    return this.getSongListWithOutPlaylistUseCase.execute(userId, categoryId);
  }

  async deleteSong(userId: string, songId: string): Promise<void> {
    return await this.deleteSongWithOutPlaylistUseCase.execute(userId, songId);
  }
}
