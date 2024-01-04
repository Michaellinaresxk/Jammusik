import { SongResource } from '../../../infra/song/SongResource';
import type { UseCase } from '../../../primary/UseCase';
import { SongDetailsView } from '../../../views/SongDetailsView';

export class SetSongDetailsUseCase implements UseCase {
  constructor(private songResource: SongResource) {}

  async execute(
    songId: string,
    key: string,
    chordList: string[],
    notes: string,
    lyricLink: string,
    tabLink: string
  ): Promise<SongDetailsView> {
    try {
      const songDetails = await this.songResource.setSongDetails(
        songId,
        key,
        chordList,
        notes,
        lyricLink,
        tabLink
      );

      return SongDetailsView.fromDomain(songDetails);
    } catch (err) {
      console.log(err);
      throw err;
    }
  }
}
