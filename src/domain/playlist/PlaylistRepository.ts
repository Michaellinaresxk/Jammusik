import type Playlist from "./Playlist";

export default interface PlaylistRepository {
  getPlaylists(userId: string): Promise<Playlist[]>;
  createPlaylist(userId: string, title: string): Promise<Playlist>;
  deletePlaylist(playlistId: string): Promise<void>;
}
