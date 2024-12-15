import type {PlaylistResource} from '../../../infra/playlist/PlaylistResource';
import {GetPlaylistUseCase} from './GetPlaylistUseCase';
import {CreatePlaylistUseCase} from './CreatePlaylistUseCase';
import {UpdatePlaylistUseCase} from './UpdatePlaylistUseCase';
import { AddSongToPlaylistUseCase } from './AddSongToPlaylistUseCase';
import { GetPlaylistSongsUseCase } from './GetPlaylistSongsUseCase';
import {DeletePlaylistUseCase} from './DeletePlaylistUseCase';

import type {PlaylistView} from '../../../views/PlaylistView';
import { SongView } from '../../../views/SongView';

export class PlaylistService {
  private createPlaylistUsecase: CreatePlaylistUseCase;
  private getPlaylistUseCase: GetPlaylistUseCase;
  private updatePlaylistUseCase: UpdatePlaylistUseCase;
  private addSongToPlaylistUseCase: AddSongToPlaylistUseCase;
  private getPlaylistSongsUseCase: GetPlaylistSongsUseCase;
  private deletePlaylistUseCase: DeletePlaylistUseCase;

  constructor(private readonly playlistResource: PlaylistResource) {
    this.createPlaylistUsecase = new CreatePlaylistUseCase(playlistResource);
    this.getPlaylistUseCase = new GetPlaylistUseCase(playlistResource);
    this.updatePlaylistUseCase = new UpdatePlaylistUseCase(playlistResource);
    this.addSongToPlaylistUseCase = new AddSongToPlaylistUseCase(playlistResource);
    this.getPlaylistSongsUseCase = new GetPlaylistSongsUseCase(playlistResource);
    this.deletePlaylistUseCase = new DeletePlaylistUseCase(playlistResource);
  }
  async createPlaylist(title: string) {
    return await this.createPlaylistUsecase.execute(title);
  }

  async getPlaylists(userId: string): Promise<PlaylistView[]> {
    return await this.getPlaylistUseCase.execute(userId);
  }

  async updatePlaylist(
    playlistId: string,
    title: string,
  ): Promise<PlaylistView> {
    return await this.updatePlaylistUseCase.execute(playlistId, title);
  }

  async addSongToPlaylist(
    playlistId: string,
    songData: {
      id: string;
      title: string;
      artist: string;
      categoryId: string;
      originalSongId: string;
    }
  ): Promise<void> {
    return await this.addSongToPlaylistUseCase.execute(playlistId, songData);
  }

  async getPlaylistSongs(playlistId: string): Promise<SongView[]> {
    return await this.getPlaylistSongsUseCase.execute(playlistId);
  }

  async deletePlaylist(playlistId: string): Promise<void> {
    return await this.deletePlaylistUseCase.execute(playlistId);
  }
}
