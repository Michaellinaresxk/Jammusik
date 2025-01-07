import type {PlaylistProperties} from '../../types/properties';

class Playlist {
  constructor(
    public readonly id: string,
    public readonly title: string,
    public readonly sharedWith: string[],
    public readonly ownerId: string,
  ) {}
  static fromProperties(properties: PlaylistProperties) {
    const {id, title, sharedWith, ownerId} = properties;
    return new Playlist(id, title, sharedWith, ownerId);
  }
  get properties(): PlaylistProperties {
    return Object.freeze({
      id: this.id,
      title: this.title,
      sharedWith: this.sharedWith,
      ownerId: this.ownerId,
    });
  }
}

export default Playlist;
