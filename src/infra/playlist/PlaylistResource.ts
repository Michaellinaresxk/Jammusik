import type PlaylistRepository from '../../domain/playlist/PlaylistRepository';
import {PlaylistCaller} from './PlaylistCaller';
import Playlist from '../../domain/playlist/Playlist';

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

  async updatePlaylist(
    playlistId: string,
    newTitle: string,
  ): Promise<Playlist> {
    await this.playlistCaller.updatePlaylist(playlistId, newTitle);
    return new Playlist(playlistId, newTitle);
  }

  async deletePlaylist(playlistId: string) {
    return await this.playlistCaller.deletePlaylist(playlistId);
  }
}
