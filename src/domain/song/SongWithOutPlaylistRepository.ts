import SongWithOutPlaylist from "./SongWithOutPlaylist";

export default interface SongWithOutPlaylistRepository {
  createSongWithOutPlaylist(
    userId: string,
    categoryId: string,
    title: string,
    artist: string,
  ): Promise<SongWithOutPlaylist>;
  getSongsWithOutPlaylist(
    userId: string,
    categoryId: string,
  ): Promise<SongWithOutPlaylist[]>;
  deleteSong(userId: string, songId: string): Promise<void>;
}
