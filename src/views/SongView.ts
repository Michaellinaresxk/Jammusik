
import type Song from "@/domain/song/Song";

export class SongView {

  private constructor(
    public readonly id: string,
    public readonly playlistId: string,
    public readonly title: string,
    public readonly artist: string,
    public readonly categoryId: string
  ) {}

  static fromDomain(song: Song): SongView {
    const { id, playlistId, title, artist, categoryId } = song;
    return new SongView(
      id,
      playlistId,
      title,
      artist,
      categoryId
    );
  }
}