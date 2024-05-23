import SongWithOutPlaylist from "../domain/song/SongWithOutPlaylist";

export class SongWithOutPlaylistView {
  private constructor(
    public readonly id: string,
    public readonly title: string,
    public readonly artist: string,
    public readonly categoryId: string,
  ) {}

  static fromDomain(song: SongWithOutPlaylist): SongWithOutPlaylistView {
    const { id, title, artist, categoryId } = song;
    return new SongWithOutPlaylistView(id, title, artist, categoryId);
  }
}
