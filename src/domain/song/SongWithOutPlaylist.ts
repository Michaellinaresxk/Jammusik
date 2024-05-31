import type { SongWithOutPlaylistProperties } from "../../types/properties";

class SongWithOutPlaylist {
  constructor(
    public readonly userId: string,
    public readonly categoryId: string,
    public readonly title: string,
    public readonly artist: string,
  ) {}
  static fromProperties(properties: SongWithOutPlaylistProperties) {
    const { userId, categoryId, title, artist } = properties;
    return new SongWithOutPlaylist(userId, categoryId, title, artist);
  }
  get properties(): SongWithOutPlaylistProperties {
    return Object.freeze({
      userId: this.userId,
      categoryId: this.categoryId,
      title: this.title,
      artist: this.artist,
    });
  }
}

export default SongWithOutPlaylist;
