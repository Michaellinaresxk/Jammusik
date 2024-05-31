import SongWithOutPlaylist from "../domain/song/SongWithOutPlaylist";

export class SongWithOutPlaylistView {
  private constructor(
    public readonly userId: string,
    public readonly categoryId: string,
    public readonly title: string,
    public readonly artist: string,
  ) {}

  static fromDomain(song: SongWithOutPlaylist): SongWithOutPlaylistView {
    const { userId, categoryId, title, artist } = song;
    return new SongWithOutPlaylistView(userId, categoryId, title, artist);
  }
}
