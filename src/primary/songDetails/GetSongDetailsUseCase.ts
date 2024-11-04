import { SongDetailsView } from "../../views/SongDetailsView";
import type { UseCase } from "../../primary/UseCase";
import { SongDetailsResource } from "../../infra/songDetails/SongDetailsResource";
export class GetSongDetailsUseCase implements UseCase {
  getCurrentUser() {
    throw new Error("Method not implemented.");
  }
  constructor(private songDetailsResource: SongDetailsResource) {}
  async execute(userId: string, songId: string): Promise<SongDetailsView> {
    const songDetails = await this.songDetailsResource.getCurrentSongInfo(
      userId,
      songId,
    );
    return SongDetailsView.fromDomain(songDetails);
  }
}
