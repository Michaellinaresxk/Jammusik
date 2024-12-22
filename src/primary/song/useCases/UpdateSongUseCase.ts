import {SongResource} from '../../../infra/song/SongResource';
import type {UseCase} from '../../UseCase';
import {SongView} from '../../../views/SongView';

export class UpdateSongUseCase implements UseCase {
  constructor(private songResource: SongResource) {}

  async execute(
    userId: string,
    songId: string,
    updates: {
      title: string;
      artist: string;
      categoryId?: string;
    },
  ): Promise<SongView> {
    try {
      const song = await this.songResource.editSong(userId, songId, updates);
      return SongView.fromDomain(song);
    } catch (err) {
      console.log(err);
      throw err;
    }
  }
}
