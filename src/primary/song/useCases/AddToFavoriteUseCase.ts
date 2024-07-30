import { SongResource } from "../../../infra/song/SongResource";
import type { UseCase } from "../../UseCase";
import { SongView } from "../../../views/SongView";

export class AddToFavoriteUseCase implements UseCase {
  constructor(private songRepository: SongResource) {}

  async execute(
    userId: string,
    songId: string,
    isFavorite: boolean,
  ): Promise<SongView[]> {
    const songList = await this.songRepository.favoriteSong(
      userId,
      songId,
      isFavorite,
    );
    return songList.map(SongView.fromDomain);
  }
}
