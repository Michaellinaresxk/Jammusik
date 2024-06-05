import { SongDetailsResource } from "../../infra/songDetails/SongDetailsResource";
import type { UseCase } from "../../primary/UseCase";
import { SongDetailsView } from "../../views/SongDetailsView";

export class SetSongDetailsUseCase implements UseCase {
  constructor(private songDetailsResource: SongDetailsResource) {}

  async execute(
    userId: string,
    songId: string,
    key: string,
    chordList: string[],
    notes: string,
    lyricLink: string,
    tabLink: string,
  ): Promise<SongDetailsView> {
    try {
      const songDetails = await this.songDetailsResource.setCurrentSongInfo(
        userId,
        songId,
        key,
        chordList,
        notes,
        lyricLink,
        tabLink,
      );

      return SongDetailsView.fromDomain(songDetails);
    } catch (err) {
      console.log(err);
      throw err;
    }
  }
}
