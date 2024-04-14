import type Playlist from "./Playlist";

export default interface PlaylistRepository {
  getPlaylists(userId: string): Promise<Playlist[]>;
}
