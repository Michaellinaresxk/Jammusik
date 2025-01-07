import type PlaylistRepository from '../../domain/playlist/PlaylistRepository';
import {PlaylistCaller} from './PlaylistCaller';
import Playlist from '../../domain/playlist/Playlist';
import Song from '../../domain/song/Song';

export class PlaylistResource implements PlaylistRepository {
  constructor(public readonly playlistCaller: PlaylistCaller) {}

  async createPlaylist(title: string): Promise<Playlist> {
    const apiPlaylist = await this.playlistCaller.createPlaylist(title);
    return new Playlist(apiPlaylist.id, apiPlaylist.title);
  }

  async getPlaylists(userId: string): Promise<Playlist[]> {
    const apiPlaylists = await this.playlistCaller.getPlaylists(userId);
    return apiPlaylists.map(
      apiPlaylist => new Playlist(apiPlaylist.id, apiPlaylist.title),
    );
  }

  async addSongToPlaylist(
    playlistId: string,
    songData: {
      id: string;
      title: string;
      artist: string;
      categoryId: string;
      originalSongId: string;
    },
  ): Promise<void> {
    return await this.playlistCaller.addSongToPlaylist(playlistId, songData);
  }

  async updatePlaylist(
    playlistId: string,
    newTitle: string,
  ): Promise<Playlist> {
    await this.playlistCaller.updatePlaylist(playlistId, newTitle);
    return new Playlist(playlistId, newTitle);
  }

  async getPlaylistSongs(playlistId: string): Promise<Song[]> {
    const apiSongs = await this.playlistCaller.getPlaylistSongs(playlistId);
    return apiSongs.map(
      apiSong =>
        new Song(
          apiSong.id, // id
          apiSong.categoryId, // categoryId
          apiSong.title, // title
          apiSong.artist, // artist
          false, // isDone - por defecto false
          apiSong.originalSongId, // originalSongId opcional
        ),
    );
  }

  async removeSongFromPlaylist(
    userId: string,
    playlistId: string,
    songId: string,
  ): Promise<void> {
    return await this.playlistCaller.removeSongFromPlaylist(
      userId,
      playlistId,
      songId,
    );
  }

  async sharePlaylist(
    playlistId: string,
    recipientEmail: string,
  ): Promise<void> {
    return await this.playlistCaller.sharePlaylist(playlistId, recipientEmail);
  }

  async getSharedPlaylists(userId: string): Promise<Playlist[]> {
    const sharedPlaylists = await this.playlistCaller.getSharedPlaylists(
      userId,
    );
    return sharedPlaylists.map(
      playlist => new Playlist(playlist.id, playlist.title),
    );
  }

  async acceptSharedPlaylist(sharedPlaylistId: string): Promise<void> {
    return await this.playlistCaller.acceptSharedPlaylist(sharedPlaylistId);
  }

  async rejectSharedPlaylist(sharedPlaylistId: string): Promise<void> {
    return await this.playlistCaller.rejectSharedPlaylist(sharedPlaylistId);
  }

  async deletePlaylist(playlistId: string) {
    return await this.playlistCaller.deletePlaylist(playlistId);
  }
}
