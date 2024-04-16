import { SongResource } from "../../../infra/song/SongResource";
import type { UseCase } from "../../UseCase";
import { SongView } from "../../../views/SongView";

export class GetSongListUseCase implements UseCase {
  constructor(private songRepository: SongResource) {}

  async execute(playlistId: string): Promise<SongView[]> {
    const songList = await this.songRepository.getSongs(playlistId);
    return songList.map(SongView.fromDomain);
  }
}
