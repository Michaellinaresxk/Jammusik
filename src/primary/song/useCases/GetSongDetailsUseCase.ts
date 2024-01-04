import type { UseCase } from '../../../primary/UseCase';
import { SongResource } from '../../../infra/song/SongResource';
import { SongDetailsView } from '../../../views/SongDetailsView';

export class GetSongDetailsUseCase implements UseCase {
  constructor(private songResource: SongResource) {}

  async execute(songId: string): Promise<SongDetailsView> {
    const songInfo = await this.songResource.getSongDetails(songId);
    return SongDetailsView.fromDomain(songInfo);
  }
}
