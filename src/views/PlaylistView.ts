import type Playlist from "../domain/playlist/Playlist";

export class PlaylistView {
  private constructor(
    public readonly id: string,
    public readonly title: string,
    public readonly modeId: string,
  ) {}

  static fromDomain(playlist: Playlist) {
    const { id, title, modeId } = playlist;
    return new PlaylistView(id, title, modeId);
  }
}
