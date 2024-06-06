import type SongDetails from "../domain/songDetails/SongDetails";
export class SongDetailsView {
  private constructor(
    public readonly userId: string,
    public readonly songId: string,
    public readonly key?: string | undefined,
    public readonly chordList?: string[],
    public readonly notes?: string,
    public readonly lyricLink?: string,
    public readonly tabLink?: string,
  ) {}
  static fromDomain(songDetails: SongDetails): SongDetailsView {
    const { userId, songId, key, chordList, notes, lyricLink, tabLink } =
      songDetails;
    return new SongDetailsView(
      userId,
      songId,
      key,
      chordList,
      notes,
      lyricLink,
      tabLink,
    );
  }
}
