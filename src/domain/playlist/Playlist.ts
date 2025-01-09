import type {PlaylistProperties} from '../../types/properties';

class Playlist {
  constructor(
    public readonly id: string,
    public readonly title: string,
    public readonly originalPlaylistId?: string,
    public readonly sharedBy?: string,
  ) {}
  static fromProperties(properties: PlaylistProperties) {
    const {id, title, originalPlaylistId, sharedBy} = properties;
    return new Playlist(id, title, originalPlaylistId, sharedBy);
  }
  get properties(): PlaylistProperties {
    return Object.freeze({
      id: this.id,
      title: this.title,
      originalPlaylistId: this.originalPlaylistId,
      sharedBy: this.sharedBy,
    });
  }
}

export default Playlist;
