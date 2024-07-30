import type Song from "../domain/song/Song";

export class SongView {
  private constructor(
    public readonly id: string,
    public readonly title: string,
    public readonly artist: string,
    public readonly categoryId: string,
    public readonly playlistId: string,
    public readonly isDone: boolean,
    public readonly isFavorite: boolean,
  ) {}

  static fromDomain(song: Song): SongView {
    const { id, title, artist, categoryId, playlistId, isDone, isFavorite } =
      song;
    return new SongView(
      id,
      title,
      artist,
      categoryId,
      playlistId,
      isDone,
      isFavorite,
    );
  }
}
