import type Playlist from '../domain/playlist/Playlist';

export class PlaylistView {
  private constructor(
    public readonly id: string,
    public readonly title: string,
    public readonly originalPlaylistId?: string,
    public readonly sharedBy?: string,
  ) {}

  static fromDomain(playlist: Playlist) {
    const {id, title, originalPlaylistId, sharedBy} = playlist;
    return new PlaylistView(id, title, originalPlaylistId, sharedBy);
  }
}
