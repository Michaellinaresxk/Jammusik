import type { SongProperties } from "../../types/properties";

class Song {
  constructor(
    public readonly id: string,
    public readonly categoryId: string,
    public readonly playlistId: string,
    public readonly title: string,
    public readonly artist: string,
  ) {}
  static fromProperties(properties: SongProperties) {
    const { id, categoryId, playlistId, title, artist } = properties;
    return new Song(id, categoryId, playlistId, title, artist);
  }
  get properties(): SongProperties {
    return Object.freeze({
      id: this.id,
      categoryId: this.categoryId,
      playlistId: this.playlistId,
      title: this.title,
      artist: this.artist,
    });
  }
}

export default Song;
