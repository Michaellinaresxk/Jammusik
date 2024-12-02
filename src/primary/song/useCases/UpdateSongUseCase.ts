import type {UseCase} from '../../UseCase';
import {SongResource} from '../../../infra/song/SongResource';
import {SongView} from '../../../views/SongView';

export class UpdateSongUseCase implements UseCase {
  constructor(private songResource: SongResource) {}

  async execute(
    userId: string,
    categoryId: string,
    songId: string,
    title: string,
    artist: string,
    playlistId?: string,
  ): Promise<SongView> {
    try {
      const song = await this.songResource.updateSong(
        userId,
        categoryId,
        songId,
        title,
        artist,
        playlistId,
      );
      return SongView.fromDomain(song);
    } catch (err) {
      console.log(err);
      throw err;
    }
  }
}
