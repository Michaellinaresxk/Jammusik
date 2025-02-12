import type {SongDetailsResource} from '../../infra/songDetails/SongDetailsResource';
import {SetSongDetailsUseCase} from './SetSongDetailsUseCase';
import {GetSongDetailsUseCase} from './GetSongDetailsUseCase';
import {GetSongKeysUseCase} from './GetSongKeysUseCase';
import {UpdateSongDetailsUseCase} from './UpdateSongDetailsUseCase';
import {SongDetailsView} from '../../views/SongDetailsView';

export class SongDetailsService {
  private setSongDetailsUseCase: SetSongDetailsUseCase;
  private getSongDetailsUseCase: GetSongDetailsUseCase;
  private getSongKeysUseCase: GetSongKeysUseCase;
  private updateSongDetailsUseCase: UpdateSongDetailsUseCase;
  constructor(private readonly songDetailsResource: SongDetailsResource) {
    this.setSongDetailsUseCase = new SetSongDetailsUseCase(songDetailsResource);
    this.getSongDetailsUseCase = new GetSongDetailsUseCase(songDetailsResource);
    this.getSongKeysUseCase = new GetSongKeysUseCase(songDetailsResource);
    this.updateSongDetailsUseCase = new UpdateSongDetailsUseCase(
      songDetailsResource,
    );
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
  async updateSongDetails(
    userId: string,
    songId: string,
    updateData: Partial<{
      key: string;
      chordList: string[];
      notes: string;
      lyricLink: string;
      tabLink: string;
    }>,
  ): Promise<SongDetailsView> {
    return await this.updateSongDetailsUseCase.execute(
      userId,
      songId,
      updateData,
    );
  }
}
