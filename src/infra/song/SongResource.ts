import type SongRepository from '../../domain/song/SongRepository';
import {SongCaller} from './SongCaller';
import Song from '../../domain/song/Song';

export class SongResource implements SongRepository {
  constructor(public readonly songCaller: SongCaller) {}

  async createSong(
    categoryId: string,
    title: string,
    artist: string,
    isDone: boolean,
    playlistId?: string,
  ): Promise<Song> {
    const apiSong = await this.songCaller.createSong(
      categoryId,
      title,
      artist,
      isDone,
      playlistId,
    );
    return new Song(
      apiSong.id,
      apiSong.categoryId,
      apiSong.title,
      apiSong.artist,
      apiSong.isDone,
      apiSong.playlistId,
    );
  }

  async getSongs(playlistId?: string): Promise<Song[]> {
    const apiSongList = await this.songCaller.getSongs(playlistId);

    return apiSongList.map(
      apiSong =>
        new Song(
          apiSong.id,
          apiSong.categoryId,
          apiSong.title,
          apiSong.artist,
          apiSong.isDone,
          apiSong.playlistId,
        ),
    );
  }

  async deleteSong(userId: string, songId: string) {
    return await this.songCaller.deleteSong(userId, songId);
  }
}
