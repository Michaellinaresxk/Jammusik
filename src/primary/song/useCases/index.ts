import type {SongResource} from '../../../infra/song/SongResource';
import {CreateSongUseCase} from './CreateSongUseCase';
import {GetSongListUseCase} from './GetSongListUseCase';
import {UpdateSongUseCase} from './UpdateSongUseCase';
import type {SongView} from '../../../views/SongView';
import {DeleteSongUseCase} from './DeleteSongUseCase';
import {Song} from '../../../types/songTypes';

export class SongService {
  private songCreateUseCase: CreateSongUseCase;
  private getSongListUseCase: GetSongListUseCase;
  private updateSongUseCase: UpdateSongUseCase;
  private deleteSongUseCase: DeleteSongUseCase;

  constructor(private readonly songResource: SongResource) {
    this.songCreateUseCase = new CreateSongUseCase(songResource);
    this.getSongListUseCase = new GetSongListUseCase(songResource);
    this.updateSongUseCase = new UpdateSongUseCase(songResource);
    this.deleteSongUseCase = new DeleteSongUseCase(songResource);
  }

  async createSong(
    categoryId: string,
    title: string,
    artist: string,
    isDone: boolean,
  ) {
    return await this.songCreateUseCase.execute(
      categoryId,
      title,
      artist,
      isDone,
    );
  }

  async getSongs(playlistId?: string): Promise<SongView[]> {
    return this.getSongListUseCase.execute(playlistId);
  }

  async updateSong(
    userId: string,
    songId: string,
    updates: {
      title: string;
      artist: string;
      categoryId?: string;
    },
  ): Promise<Song> {
    return await this.updateSongUseCase.execute(userId, songId, updates);
  }

  async deleteSong(userId: string, songId: string): Promise<void> {
    return await this.deleteSongUseCase.execute(userId, songId);
  }
}
