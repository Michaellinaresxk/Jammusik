import { SongDetailsProperties } from "../../types/properties";

class SongDetails {
  constructor(
    public readonly userId: string,
    public readonly songId: string,
    public readonly key?: string | undefined,
    public readonly chordList?: string[],
    public readonly notes?: string,
    public readonly lyricLink?: string,
    public readonly tabLink?: string,
  ) {}

  static fromProperties(properties: SongDetailsProperties) {
    const { userId, songId, key, chordList, notes, lyricLink, tabLink } =
      properties;
    return new SongDetails(
      userId,
      songId,
      key,
      chordList,
      notes,
      lyricLink,
      tabLink,
    );
  }
  get properties(): SongDetailsProperties {
    return Object.freeze({
      userId: this.userId,
      songId: this.songId,
      key: this.key,
      chordList: this.chordList,
      notes: this.notes,
      lyricLink: this.lyricLink,
      tabLink: this.tabLink,
    });
  }
}

export default SongDetails;
