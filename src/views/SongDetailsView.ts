
import type SongDetails from "@/domain/song/SongDetails";

export class SongDetailsView {

  private constructor(
    public readonly songId: string,
    public readonly key?: string,
    public readonly chordList?: string[],
    public readonly notes?: string,
    public readonly lyricLink?: string,
    public readonly tabLink?: string
  ) {}

  static fromDomain(songDetails: SongDetails): SongDetailsView {
    const { songId, key, chordList, notes, lyricLink, tabLink  } = songDetails;
    return new SongDetailsView(
      songId,
      key,
      chordList,
      notes,
      lyricLink,
      tabLink,
    );
  }
}