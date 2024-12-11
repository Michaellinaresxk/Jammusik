import type {SongProperties} from '../../types/properties';

class Song {
  constructor(
    public readonly id: string,
    public readonly categoryId: string,
    public readonly title: string,
    public readonly artist: string,
    public readonly isDone: boolean,
    public readonly playlistId?: string,
  ) {}
  static fromProperties(properties: SongProperties) {
    const {id, categoryId, title, artist, isDone, playlistId} = properties;
    return new Song(id, categoryId, title, artist, isDone, playlistId);
  }
  get properties(): SongProperties {
    return Object.freeze({
      id: this.id,
      categoryId: this.categoryId,
      title: this.title,
      artist: this.artist,
      isDone: this.isDone,
      playlistId: this.playlistId,
    });
  }
}

export default Song;
