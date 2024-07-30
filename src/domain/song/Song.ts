import type { SongProperties } from "../../types/properties";

class Song {
  constructor(
    public readonly id: string,
    public readonly categoryId: string,
    public readonly playlistId: string,
    public readonly title: string,
    public readonly artist: string,
    public readonly isDone: boolean,
    public readonly isFavorite: boolean,
  ) {}
  static fromProperties(properties: SongProperties) {
    const { id, categoryId, playlistId, title, artist, isDone, isFavorite } =
      properties;
    return new Song(
      id,
      categoryId,
      playlistId,
      title,
      artist,
      isDone,
      isFavorite,
    );
  }
  get properties(): SongProperties {
    return Object.freeze({
      id: this.id,
      categoryId: this.categoryId,
      playlistId: this.playlistId,
      title: this.title,
      artist: this.artist,
      isDone: this.isDone,
      isFavorite: this.isFavorite,
    });
  }
}

export default Song;
