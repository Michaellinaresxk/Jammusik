import type Song from "./Song";

export default interface SongRepository {
  createSong(
    categoryId: string,
    playlistId: string,
    title: string,
    artist: string,
    isDone: boolean,
    isFavorite: boolean,
  ): Promise<Song>;
  getSongs(playlistId: string): Promise<Song[]>;
  addToFavorite(
    userId: string,
    songId: string,
    isFavorite: boolean,
  ): Promise<Song[]>;
  deleteSong(userId: string, songId: string): Promise<void>;
}
