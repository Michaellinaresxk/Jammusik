import type { PlaylistProperties } from "../../types/properties";

class Playlist {
  constructor(
    public readonly id: string,
    public readonly title: string,
    public readonly modeId: string,
  ) {}
  static fromProperties(properties: PlaylistProperties) {
    const { id, title, modeId } = properties;
    return new Playlist(id, title, modeId);
  }
  get properties(): PlaylistProperties {
    return Object.freeze({
      id: this.id,
      title: this.title,
      modeId: this.modeId,
    });
  }
}

export default Playlist;
