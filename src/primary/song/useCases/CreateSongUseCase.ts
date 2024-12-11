import {SongResource} from '../../../infra/song/SongResource';
import type {UseCase} from '../../UseCase';
import {SongView} from '../../../views/SongView';

export class CreateSongUseCase implements UseCase {
  constructor(private songResource: SongResource) {}

  async execute(
    categoryId: string,
    title: string,
    artist: string,
    isDone: boolean,
    playlistId?: string,
  ): Promise<SongView> {
    try {
      const song = await this.songResource.createSong(
        categoryId,
        title,
        artist,
        isDone,
        playlistId,
      );
      return SongView.fromDomain(song);
    } catch (err) {
      console.log(err);
      throw err;
    }
  }
}
