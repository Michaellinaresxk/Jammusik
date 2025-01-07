import type Playlist from '../domain/playlist/Playlist';

export class PlaylistView {
  private constructor(
    public readonly id: string,
    public readonly title: string,
    public readonly sharedWith: string[],
    public readonly ownerId: string,
  ) {}

  static fromDomain(playlist: Playlist) {
    const {id, title, sharedWith, ownerId} = playlist;
    return new PlaylistView(id, title, sharedWith, ownerId);
  }
}
