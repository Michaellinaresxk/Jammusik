import type {UseCase} from '../../UseCase';
import {PlaylistResource} from '../../../infra/playlist/PlaylistResource';

interface SongToPlaylistData {
  id: string;
  title: string;
  artist: string;
  categoryId: string;
  originalSongId: string;
}

export class AddSongToPlaylistUseCase implements UseCase {
  constructor(private playlistResource: PlaylistResource) {}

  async execute(
    playlistId: string,
    songData: SongToPlaylistData,
  ): Promise<void> {
    try {
      await this.playlistResource.addSongToPlaylist(playlistId, songData);
    } catch (err) {
      console.log('Error in AddSongToPlaylistUseCase:', err);
      throw err;
    }
  }
}
