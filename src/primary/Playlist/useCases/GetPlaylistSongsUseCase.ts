import type {UseCase} from '../../UseCase';
import {PlaylistResource} from '../../../infra/playlist/PlaylistResource';
import {SongView} from '../../../views/SongView';

export class GetPlaylistSongsUseCase implements UseCase {
  constructor(private playlistRepository: PlaylistResource) {}

  async execute(playlistId: string): Promise<SongView[]> {
    const songs = await this.playlistRepository.getPlaylistSongs(playlistId);
    return songs.map(SongView.fromDomain);
  }
}
