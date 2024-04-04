import type Playlist from "./Playlist";

export default interface PlaylistRepository {
  createPlaylist(
    userId: string,
    playlistId: string,
    title: string,
    modeId: string,
  ): Promise<Playlist>;
  getPlaylists(userId: string): Promise<Playlist[]>;
  deletePlaylist(playlistId: string): Promise<void>;
}
