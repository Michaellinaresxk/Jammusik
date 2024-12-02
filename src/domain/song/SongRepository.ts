import type Song from './Song';

export default interface SongRepository {
  createSong(
    categoryId: string,
    playlistId: string,
    title: string,
    artist: string,
    isDone: boolean,
  ): Promise<Song>;
  getSongs(playlistId: string): Promise<Song[]>;
  updateSong(
    userId: string,
    categoryId: string,
    songId: string,
    title: string,
    artist: string,
    playlistId?: string,
  ): Promise<Song>;
  deleteSong(userId: string, songId: string): Promise<void>;
}
