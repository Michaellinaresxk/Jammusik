import type Song from "./Song";

export default interface SongRepository {
  createSong(
    title: string,
    artist: string,
    categoryId: string,
    playlistId: string,
  ): Promise<Song>;
  getSongs(playlistId: string): Promise<Song[]>;
  deleteSong(userId: string, songId: string): Promise<void>;
}
