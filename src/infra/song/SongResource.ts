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
  ): Promise<Song> {
    const apiSong = await this.songCaller.createSong(
      categoryId,
      playlistId,
      title,
      artist,
    );
    return new Song(
      apiSong.id,
      apiSong.categoryId,
      apiSong.playlistId,
      apiSong.title,
      apiSong.artist,
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
        ),
    );
  }

  async deleteSong(userId: string, songId: string) {
    return await this.songCaller.deleteSong(userId, songId);
  }
}
