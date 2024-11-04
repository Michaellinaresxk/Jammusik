import type SongDetailsRepository from "../../domain/songDetails/SongDetailsRepository";
import { SongDetailsCaller } from "./SongDetailsCaller";
import { ApiSongDetails } from "./ApiSongDetails";
import SongDetails from "../../domain/songDetails/SongDetails";

export class SongDetailsResource implements SongDetailsRepository {
  constructor(public readonly songDetailsCaller: SongDetailsCaller) {}

  async setCurrentSongInfo(
    userId: string,
    songId: string,
    key?: string,
    chordList?: string[],
    notes?: string,
    lyricLink?: string,
    tabLink?: string,
  ): Promise<ApiSongDetails> {
    const apiSong = await this.songDetailsCaller.setCurrentInfo(
      userId,
      songId,
      key,
      chordList,
      notes,
      lyricLink,
      tabLink,
    );
    return new SongDetails(
      apiSong.userId,
      apiSong.songId,
      apiSong.key,
      apiSong.chordList,
      apiSong.notes,
      apiSong.lyricLink,
      apiSong.tabLink,
    );
  }
  async getCurrentSongInfo(
    userId: string,
    songId: string,
  ): Promise<SongDetails> {
    const apiSongDetails = await this.songDetailsCaller.getCurrentSongInfo(
      userId,
      songId,
    );
    if (apiSongDetails) {
      return new SongDetails(
        apiSongDetails.userId,
        apiSongDetails.songId,
        apiSongDetails.key,
        apiSongDetails.chordList,
        apiSongDetails.notes,
        apiSongDetails.lyricLink,
        apiSongDetails.tabLink,
      );
    } else {
      return null;
    }
  }
}
