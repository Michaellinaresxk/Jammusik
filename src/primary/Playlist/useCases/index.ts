import type {PlaylistResource} from '../../../infra/playlist/PlaylistResource';
import {GetPlaylistUseCase} from './GetPlaylistUseCase';
import {CreatePlaylistUseCase} from './CreatePlaylistUseCase';
import {UpdatePlaylistUseCase} from './UpdatePlaylistUseCase';
import {AddSongToPlaylistUseCase} from './AddSongToPlaylistUseCase';
import {GetPlaylistSongsUseCase} from './GetPlaylistSongsUseCase';
import {RemoveSongFromPlaylistUseCase} from './RemoveSongFromPlaylistUseCase';
import {DeletePlaylistUseCase} from './DeletePlaylistUseCase';
import {SharePlaylistUseCase} from './SharePlaylistUseCase';
import {AcceptSharedPlaylistUseCase} from './AcceptSharedPlaylistUseCase';
import {RejectSharedPlaylistUseCase} from './RejectSharedPlaylistUseCase';

import {GetSharedPlaylistsUseCase} from './GetSharedPlaylistsUseCase';

import type {PlaylistView} from '../../../views/PlaylistView';
import {SongView} from '../../../views/SongView';

export class PlaylistService {
  private createPlaylistUsecase: CreatePlaylistUseCase;
  private getPlaylistUseCase: GetPlaylistUseCase;
  private updatePlaylistUseCase: UpdatePlaylistUseCase;
  private addSongToPlaylistUseCase: AddSongToPlaylistUseCase;
  private getPlaylistSongsUseCase: GetPlaylistSongsUseCase;
  private removeSongFromPlaylistUseCase: RemoveSongFromPlaylistUseCase;
  private sharePlaylistUseCase: SharePlaylistUseCase;
  private getSharedPlaylistsUseCase: GetSharedPlaylistsUseCase;
  private acceptSharedPlaylistUseCase: AcceptSharedPlaylistUseCase;
  private rejectSharedPlaylistUseCase: RejectSharedPlaylistUseCase;

  private deletePlaylistUseCase: DeletePlaylistUseCase;

  constructor(private readonly playlistResource: PlaylistResource) {
    this.createPlaylistUsecase = new CreatePlaylistUseCase(playlistResource);
    this.getPlaylistUseCase = new GetPlaylistUseCase(playlistResource);
    this.updatePlaylistUseCase = new UpdatePlaylistUseCase(playlistResource);
    this.sharePlaylistUseCase = new SharePlaylistUseCase(playlistResource);
    this.acceptSharedPlaylistUseCase = new AcceptSharedPlaylistUseCase(
      playlistResource,
    );
    this.rejectSharedPlaylistUseCase = new RejectSharedPlaylistUseCase(
      playlistResource,
    );
    this.getSharedPlaylistsUseCase = new GetSharedPlaylistsUseCase(
      playlistResource,
    );
    this.addSongToPlaylistUseCase = new AddSongToPlaylistUseCase(
      playlistResource,
    );
    this.getPlaylistSongsUseCase = new GetPlaylistSongsUseCase(
      playlistResource,
    );
    this.removeSongFromPlaylistUseCase = new RemoveSongFromPlaylistUseCase(
      playlistResource,
    );
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
    },
  ): Promise<void> {
    return await this.addSongToPlaylistUseCase.execute(playlistId, songData);
  }

  async getPlaylistSongs(playlistId: string): Promise<SongView[]> {
    return await this.getPlaylistSongsUseCase.execute(playlistId);
  }

  async removeSongFromPlaylist(
    userId: string,
    playlistId: string,
    songId: string,
  ): Promise<void> {
    return await this.removeSongFromPlaylistUseCase.execute(
      userId,
      playlistId,
      songId,
    );
  }

  async sharePlaylist(
    playlistId: string,
    recipientEmail: string,
  ): Promise<void> {
    return await this.sharePlaylistUseCase.execute(playlistId, recipientEmail);
  }

  async getSharedPlaylists(userId: string): Promise<PlaylistView[]> {
    return await this.getSharedPlaylistsUseCase.execute(userId);
  }

  async acceptSharedPlaylist(sharedPlaylistId: string): Promise<void> {
    return await this.acceptSharedPlaylistUseCase.execute(sharedPlaylistId);
  }

  async rejectSharedPlaylist(sharedPlaylistId: string): Promise<void> {
    return await this.rejectSharedPlaylistUseCase.execute(sharedPlaylistId);
  }

  async deletePlaylist(playlistId: string): Promise<void> {
    return await this.deletePlaylistUseCase.execute(playlistId);
  }
}
