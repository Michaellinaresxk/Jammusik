import type { SongResource } from '../../../infra/song/SongResource';
import { CreateSongUseCase } from './CreateSongUseCase';
import { GetSongListUseCase } from './GetSongListUseCase';
import { GetSongUseCase } from './GetSongUseCase';
import { DeleteSongUseCase } from './DeleteSongUseCase';
import { SetSongDetailsUseCase } from './SetSongDetailsUseCase';
import { GetSongDetailsUseCase } from './GetSongDetailsUseCase';
import type { SongView } from '../../../views/SongView';

export class SongService {
  private songCreateUseCase: CreateSongUseCase;
  private getSongListUseCase: GetSongListUseCase;
  private getSongUseCase: GetSongUseCase;
  private deleteSongUseCase: DeleteSongUseCase;
  private setSongDetailsUseCase: SetSongDetailsUseCase;
  private getSongDetailsUseCase: GetSongDetailsUseCase;

  constructor(private readonly songResource: SongResource) {
    this.songCreateUseCase = new CreateSongUseCase(songResource);
    this.getSongListUseCase = new GetSongListUseCase(songResource);
    this.getSongUseCase = new GetSongUseCase(songResource);
    this.deleteSongUseCase = new DeleteSongUseCase(songResource);
    this.setSongDetailsUseCase = new SetSongDetailsUseCase(songResource);
    this.getSongDetailsUseCase = new GetSongDetailsUseCase(songResource);
  }

  async createSong(
    playlistId: string,
    id: string,
    title: string,
    artist: string,
    categoryId: string
  ) {
    return await this.songCreateUseCase.execute(
      playlistId,
      id,
      title,
      artist,
      categoryId
    );
  }

  async getSongs(playlistId: string): Promise<SongView[]> {
    return this.getSongListUseCase.execute(playlistId);
  }
  async getSong(playlistId: string, songId: string) {
    return this.getSongUseCase.execute(playlistId, songId);
  }

  async setSongDetails(
    songId: string,
    key: string,
    chordList: string[],
    notes: string,
    lyricLink: string,
    tabLink: string
  ) {
    return this.setSongDetailsUseCase.execute(
      songId,
      key,
      chordList,
      notes,
      lyricLink,
      tabLink
    );
  }

  async getSongDetails(songId: string) {
    return await this.getSongDetailsUseCase.execute(songId);
  }

  async deleteSong(songId: string) {
    return this.deleteSongUseCase.execute(songId);
  }
}
