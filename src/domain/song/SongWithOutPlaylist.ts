import type { SongWithOutPlaylistProperties } from "../../types/properties";

class Song {
  constructor(
    public readonly id: string,
    public readonly title: string,
    public readonly artist: string,
    public readonly categoryId: string,
  ) {}
  static fromProperties(properties: SongWithOutPlaylistProperties) {
    const { id, title, artist, categoryId } = properties;
    return new Song(id, title, artist, categoryId);
  }
  get properties(): SongWithOutPlaylistProperties {
    return Object.freeze({
      id: this.id,
      title: this.title,
      artist: this.artist,
      categoryId: this.categoryId,
    });
  }
}

export default Song;
