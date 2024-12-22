import type Song from './Song';

export default interface SongRepository {
  createSong(
    categoryId: string,
    title: string,
    artist: string,
    isDone: boolean,
  ): Promise<Song>;
  getSongs(playlistId?: string): Promise<Song[]>;
  updateSong(
    userId: string,
    songId: string,
    updates: {
      title: string;
      artist: string;
      categoryId?: string;
    },
  ): Promise<Song>;
  deleteSong(userId: string, songId: string): Promise<void>;
}
