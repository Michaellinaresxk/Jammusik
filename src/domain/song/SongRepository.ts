import type Song from "./Song";

export default interface SongRepository {
  createSong(
    categoryId: string,
    playlistId: string,
    title: string,
    artist: string,
  ): Promise<Song>;
  getSongs(playlistId: string): Promise<Song[]>;
  deleteSong(userId: string, songId: string): Promise<void>;
}
