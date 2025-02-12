import {SongDetailsView} from '../../views/SongDetailsView';
import type {UseCase} from '../../primary/UseCase';
import {SongDetailsResource} from '../../infra/songDetails/SongDetailsResource';

export class UpdateSongDetailsUseCase implements UseCase {
  constructor(private songDetailsResource: SongDetailsResource) {}

  async execute(
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
    try {
      const updatedSongDetails =
        await this.songDetailsResource.updateSongDetails(
          userId,
          songId,
          updateData,
        );
      return SongDetailsView.fromDomain(updatedSongDetails);
    } catch (error) {
      console.error('Error in UpdateSongDetailsUseCase:', error);
      throw error;
    }
  }
}
