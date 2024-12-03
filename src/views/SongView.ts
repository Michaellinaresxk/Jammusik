import type Song from '../domain/song/Song';

export class SongView {
  private constructor(
    public readonly id: string,
    public readonly title: string,
    public readonly artist: string,
    public readonly categoryId: string,
    public readonly isDone: boolean,
    public readonly playlistId?: string,
  ) {}

  static fromDomain(song: Song): SongView {
    const {id, title, artist, categoryId, isDone, playlistId} = song;
    return new SongView(id, title, artist, categoryId, isDone, playlistId);
  }
}
