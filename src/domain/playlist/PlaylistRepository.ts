import Song from '../song/Song';
import type Playlist from './Playlist';

export default interface PlaylistRepository {
  getPlaylists(userId: string): Promise<Playlist[]>;
  createPlaylist(userId: string, title: string): Promise<Playlist>;
  updatePlaylist(playlistId: string, title: string): Promise<Playlist>;
  addSongToPlaylist(playlistId: string, songData: {
    id: string;
    title: string;
    artist: string;
    categoryId: string;
    originalSongId: string;
  }): Promise<void>;
  getPlaylistSongs(playlistId: string): Promise<Song[]>;
  deletePlaylist(playlistId: string): Promise<void>;
}
