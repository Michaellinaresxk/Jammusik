import type { UseCase } from "../../UseCase";
import { PlaylistResource } from "../../../infra/playlist/PlaylistResource";
import { PlaylistView } from "../../../views/PlaylistView";

export class CreatePlaylistUseCase implements UseCase {
  constructor(private playlistResource: PlaylistResource) {}

  async execute(title: string, modeId: string): Promise<PlaylistView> {
    try {
      if (!(typeof modeId === "string")) {
        throw new Error("Category should be a string");
      }

      const playlist = await this.playlistResource.createPlaylist(
        title,
        modeId,
      );
      return PlaylistView.fromDomain(playlist);
    } catch (err) {
      console.log(err);
      throw err;
    }
  }
}
