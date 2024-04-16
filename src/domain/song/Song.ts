import type { SongProperties } from "../../types/properties";

class Song {
  constructor(
    public readonly id: string,
    public readonly title: string,
    public readonly artist: string,
    public readonly categoryId: string,
    public readonly playlistId: string,
  ) {}
  static fromProperties(properties: SongProperties) {
    const { id, title, artist, categoryId, playlistId } = properties;
    return new Song(id, title, artist, categoryId, playlistId);
  }
  get properties(): SongProperties {
    return Object.freeze({
      id: this.id,
      title: this.title,
      artist: this.artist,
      categoryId: this.categoryId,
      playlistId: this.playlistId,
    });
  }
}

export default Song;
