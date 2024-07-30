import type { SongResource } from "../../../infra/song/SongResource";
import { CreateSongUseCase } from "./CreateSongUseCase";
import { GetSongListUseCase } from "./GetSongListUseCase";
import type { SongView } from "../../../views/SongView";
import { AddToFavoriteUseCase } from "./AddToFavoriteUseCase";
import { DeleteSongUseCase } from "./DeleteSongUseCase";

export class SongService {
  private songCreateUseCase: CreateSongUseCase;
  private getSongListUseCase: GetSongListUseCase;
  private addToFavoriteUseCase: AddToFavoriteUseCase;
  private deleteSongUseCase: DeleteSongUseCase;

  constructor(private readonly songResource: SongResource) {
    this.songCreateUseCase = new CreateSongUseCase(songResource);
    this.getSongListUseCase = new GetSongListUseCase(songResource);
    this.addToFavoriteUseCase = new AddToFavoriteUseCase(songResource);
    this.deleteSongUseCase = new DeleteSongUseCase(songResource);
  }

  async createSong(
    categoryId: string,
    playlistId: string,
    title: string,
    artist: string,
    isDone: boolean,
    isFavorite: boolean,
  ) {
    return await this.songCreateUseCase.execute(
      categoryId,
      playlistId,
      title,
      artist,
      isDone,
      isFavorite,
    );
  }

  async getSongs(playlistId: string): Promise<SongView[]> {
    return this.getSongListUseCase.execute(playlistId);
  }
  async addToFavorite(
    userId: string,
    songId: string,
    isFavorite: boolean,
  ): Promise<SongView[]> {
    return this.addToFavoriteUseCase.execute(userId, songId, isFavorite);
  }

  async deleteSong(userId: string, songId: string): Promise<void> {
    return await this.deleteSongUseCase.execute(userId, songId);
  }
}
