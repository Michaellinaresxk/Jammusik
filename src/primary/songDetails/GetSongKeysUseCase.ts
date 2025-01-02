import {SongDetailsResource} from '../../infra/songDetails/SongDetailsResource';

export class GetSongKeysUseCase {
  constructor(private songDetailsRepository: SongDetailsResource) {}

  async execute(): Promise<{id: string; key: string; order: number}[]> {
    return this.songDetailsRepository.getSongKeys();
  }
}
