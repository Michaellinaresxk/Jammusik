import type {PlaylistProperties} from '../../types/properties';

class Playlist {
  constructor(public readonly id: string, public readonly title: string) {}
  static fromProperties(properties: PlaylistProperties) {
    const {id, title} = properties;
    return new Playlist(id, title);
  }
  get properties(): PlaylistProperties {
    return Object.freeze({
      id: this.id,
      title: this.title,
    });
  }
}

export default Playlist;
