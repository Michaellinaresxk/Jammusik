import type { SongDetailsResource } from "../../infra/songDetails/SongDetailsResource";
import { SetSongDetailsUseCase } from "./SetSongDetailsUseCase";
import { GetSongDetailsUseCase } from "./GetSongDetailsUseCase";
export class SongDetailsService {
  private setSongDetailsUseCase: SetSongDetailsUseCase;
  private getSongDetailsUseCase: GetSongDetailsUseCase;
  constructor(private readonly songDetailsResource: SongDetailsResource) {
    this.setSongDetailsUseCase = new SetSongDetailsUseCase(songDetailsResource);
    this.getSongDetailsUseCase = new GetSongDetailsUseCase(songDetailsResource);
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
  async getSongDetails(userId: string, songId: string) {
    return await this.getSongDetailsUseCase.execute(userId, songId);
  }
}
