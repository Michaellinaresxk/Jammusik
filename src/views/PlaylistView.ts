import type Playlist from "../domain/playlist/Playlist";

export class PlaylistView {
  private constructor(
    public readonly id: string,
    public readonly title: string,
  ) {}

  static fromDomain(playlist: Playlist) {
    const { id, title } = playlist;
    return new PlaylistView(id, title);
  }
}
