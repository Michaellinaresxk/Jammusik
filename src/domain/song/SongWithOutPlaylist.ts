import type { SongWithOutPlaylistProperties } from "../../types/properties";

class SongWithOutPlaylist {
  constructor(
    public readonly id: string,
    public readonly userId: string,
    public readonly categoryId: string,
    public readonly title: string,
    public readonly artist: string,
  ) {}
  static fromProperties(properties: SongWithOutPlaylistProperties) {
    const { id, userId, categoryId, title, artist } = properties;
    return new SongWithOutPlaylist(id, userId, categoryId, title, artist);
  }
  get properties(): SongWithOutPlaylistProperties {
    return Object.freeze({
      id: this.id,
      userId: this.userId,
      categoryId: this.categoryId,
      title: this.title,
      artist: this.artist,
    });
  }
}

export default SongWithOutPlaylist;
