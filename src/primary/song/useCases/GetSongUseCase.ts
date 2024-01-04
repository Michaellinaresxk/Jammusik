import { SongResource } from '../../../infra/song/SongResource';
import type { UseCase } from '../../../primary/UseCase';
import { SongView } from '../../../views/SongView';

export class GetSongUseCase implements UseCase {
  constructor(private songRepository: SongResource) {}

  async execute(playlistId: string, songId: string): Promise<SongView> {
    const song = await this.songRepository.getSong(playlistId, songId);
    return SongView.fromDomain(song);
  }
}
