import type PlaylistRepository from "../../domain/playlist/PlaylistRepository";
import { PlaylistCaller } from "./PlaylistCaller";
import Playlist from "../../domain/playlist/Playlist";

export class PlaylistResource implements PlaylistRepository {
  constructor(public readonly playlistCaller: PlaylistCaller) {}

  async getPlaylists(userId: string): Promise<Playlist[]> {
    const apiPlaylists = await this.playlistCaller.getPlaylists(userId);
    return apiPlaylists.map(
      apiPlaylist =>
        new Playlist(apiPlaylist.id, apiPlaylist.title, apiPlaylist.modeId),
    );
  }
}
