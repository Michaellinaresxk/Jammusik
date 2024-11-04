import type { UseCase } from "../../UseCase";
import { SongResource } from "../../../infra/song/SongResource";

export class DeleteSongUseCase implements UseCase {
  constructor(private songResource: SongResource) {}

  async execute(userId: string, songId: string) {
    await this.songResource.deleteSong(userId, songId);
  }
}
