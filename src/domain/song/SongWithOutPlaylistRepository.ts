import SongWithOutPlaylist from "./SongWithOutPlaylist";

export default interface SongWithOutPlaylistRepository {
  createSongWithOutPlaylist(
    userId: string,
    title: string,
    artist: string,
    categoryId: string,
  ): Promise<SongWithOutPlaylist>;
  getSongsWithOutPlaylist(
    categoryId: string,
    userId: string,
  ): Promise<SongWithOutPlaylist[]>;
}
