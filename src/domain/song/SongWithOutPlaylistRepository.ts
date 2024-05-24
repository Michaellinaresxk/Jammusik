import SongWithOutPlaylist from "./SongWithOutPlaylist";

export default interface SongWithOutPlaylistRepository {
  createSongWithOutPlaylist(
    title: string,
    artist: string,
    categoryId: string,
  ): Promise<SongWithOutPlaylist>;
}
