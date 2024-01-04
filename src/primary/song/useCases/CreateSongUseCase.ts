import { SongResource } from '../../../infra/song/SongResource';
import type { UseCase } from '../../../primary/UseCase';
import { SongView } from '../../../views/SongView';

export class CreateSongUseCase implements UseCase {
  constructor(private songResource: SongResource) {}

  async execute(
    playlistId: string,
    id: string,
    title: string,
    artist: string,
    categoryId: string
  ): Promise<SongView> {
    try {
      const song = await this.songResource.createSong(
        playlistId,
        id,
        title,
        artist,
        categoryId
      );
      return SongView.fromDomain(song);
    } catch (err) {
      console.log(err);
      throw err;
    }
  }
}
