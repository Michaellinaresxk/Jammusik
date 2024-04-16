import type Song from "./Song";

export default interface SongRepository {
  createSong(
    title: string,
    artist: string,
    categoryId: string,
    playlistId: string,
  ): Promise<Song>;
  getSongs(playlistId: string): Promise<Song[]>;
  // getSong(
  //   playlistId: string,
  //   songId: string,
  //   categoryId: string,
  // ): Promise<Song>;
  // deleteSong(songId: string): Promise<any>;
}
