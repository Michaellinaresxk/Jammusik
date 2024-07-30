import type SongRepository from "../../domain/song/SongRepository";
import { SongCaller } from "./SongCaller";
import Song from "../../domain/song/Song";

export class SongResource implements SongRepository {
  constructor(public readonly songCaller: SongCaller) {}

  async createSong(
    categoryId: string,
    playlistId: string,
    title: string,
    artist: string,
    isDone: boolean,
    isFavorite: boolean,
  ): Promise<Song> {
    const apiSong = await this.songCaller.createSong(
      categoryId,
      playlistId,
      title,
      artist,
      isDone,
      isFavorite,
    );
    return new Song(
      apiSong.id,
      apiSong.categoryId,
      apiSong.playlistId,
      apiSong.title,
      apiSong.artist,
      apiSong.isDone,
      apiSong.isFavorite,
    );
  }

  async getSongs(playlistId: string): Promise<Song[]> {
    if (!playlistId) {
      throw new Error("playlistId is undefined or empty!");
    }

    const apiSongList = await this.songCaller.getSongs(playlistId);

    return apiSongList.map(
      apiSong =>
        new Song(
          apiSong.id,
          apiSong.categoryId,
          apiSong.playlistId,
          apiSong.title,
          apiSong.artist,
          apiSong.isDone,
          apiSong.isFavorite,
        ),
    );
  }

  async favoriteSong(userId: string, songId: string, isFavorite: boolean) {
    return await this.songCaller.favoriteSong(userId, songId, isFavorite);
  }

  async deleteSong(userId: string, songId: string) {
    return await this.songCaller.deleteSong(userId, songId);
  }
}
