import SongWithOutPlaylist from "../domain/song/SongWithOutPlaylist";

export class SongWithOutPlaylistView {
  private constructor(
    public readonly id: string,
    public readonly userId: string,
    public readonly categoryId: string,
    public readonly title: string,
    public readonly artist: string,
    public readonly isDone: boolean,
  ) {}

  static fromDomain(song: SongWithOutPlaylist): SongWithOutPlaylistView {
    const { id, userId, categoryId, title, artist, isDone } = song;
    return new SongWithOutPlaylistView(
      id,
      userId,
      categoryId,
      title,
      artist,
      isDone,
    );
  }
}
