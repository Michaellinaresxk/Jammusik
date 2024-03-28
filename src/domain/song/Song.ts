import type { SongProperties } from "@/types/properties";

class Song {
  constructor(
    public readonly playlistId: string,
    public readonly id: string,
    public readonly title: string,
    public readonly artist: string,
    public readonly categoryId: string,
  ) {}
  static fromProperties(properties: SongProperties) {
    const { id, playlistId, title, artist, categoryId } = properties;
    return new Song(id, playlistId, title, artist, categoryId);
  }
  get properties(): SongProperties {
    return Object.freeze({
      id: this.id,
      playlistId: this.playlistId,
      title: this.title,
      artist: this.artist,
      categoryId: this.categoryId,
    });
  }
}

export default Song;
