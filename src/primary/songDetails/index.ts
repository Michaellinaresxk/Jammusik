import type {SongDetailsResource} from '../../infra/songDetails/SongDetailsResource';
import {SetSongDetailsUseCase} from './SetSongDetailsUseCase';
import {GetSongDetailsUseCase} from './GetSongDetailsUseCase';
import {GetSongKeysUseCase} from './GetSongKeysUseCase';
export class SongDetailsService {
  private setSongDetailsUseCase: SetSongDetailsUseCase;
  private getSongDetailsUseCase: GetSongDetailsUseCase;
  private getSongKeysUseCase: GetSongKeysUseCase;
  constructor(private readonly songDetailsResource: SongDetailsResource) {
    this.setSongDetailsUseCase = new SetSongDetailsUseCase(songDetailsResource);
    this.getSongDetailsUseCase = new GetSongDetailsUseCase(songDetailsResource);
    this.getSongKeysUseCase = new GetSongKeysUseCase(songDetailsResource);
  }
  async setSongDetails(
    userId: string,
    songId: string,
    key: string,
    chordList: string[],
    notes: string,
    lyricLink: string,
    tabLink: string,
  ) {
    return this.setSongDetailsUseCase.execute(
      userId,
      songId,
      key,
      chordList,
      notes,
      lyricLink,
      tabLink,
    );
  }
  async getSongKeys() {
    return this.getSongKeysUseCase.execute();
  }
  async getSongDetails(userId: string, songId: string) {
    return await this.getSongDetailsUseCase.execute(userId, songId);
  }
}
