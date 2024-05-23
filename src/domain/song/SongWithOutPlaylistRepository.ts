import SongWithOutPlaylist from "./SongWithOutPlaylist";

export default interface SongWithOutPlaylistRepository {
  createSong(
    title: string,
    artist: string,
    categoryId: string,
    playlistId: string,
  ): Promise<SongWithOutPlaylist>;
  getSongs(playlistId: string): Promise<SongWithOutPlaylist[]>;
}
