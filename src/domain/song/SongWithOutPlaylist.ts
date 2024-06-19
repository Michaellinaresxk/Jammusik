import type { SongWithOutPlaylistProperties } from "../../types/properties";

class SongWithOutPlaylist {
  constructor(
    public readonly id: string,
    public readonly userId: string,
    public readonly categoryId: string,
    public readonly title: string,
    public readonly artist: string,
    public readonly isDone: boolean,
  ) {}
  static fromProperties(properties: SongWithOutPlaylistProperties) {
    const { id, userId, categoryId, title, artist, isDone } = properties;
    return new SongWithOutPlaylist(
      id,
      userId,
      categoryId,
      title,
      artist,
      isDone,
    );
  }
  get properties(): SongWithOutPlaylistProperties {
    return Object.freeze({
      id: this.id,
      userId: this.userId,
      categoryId: this.categoryId,
      title: this.title,
      artist: this.artist,
      isDone: this.isDone,
    });
  }
}

export default SongWithOutPlaylist;
