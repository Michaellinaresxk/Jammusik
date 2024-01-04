import { SongResource } from '../../../infra/song/SongResource';
import type { UseCase } from '../../../primary/UseCase';
export class DeleteSongUseCase implements UseCase {
  constructor(private songRepository: SongResource) {}

  async execute(songId: string) {
    return this.songRepository.deleteSong(songId);
  }
}
