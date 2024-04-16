import type SongRepository from "../../domain/song/SongRepository";
import { SongCaller } from "./SongCaller";
import Song from "../../domain/song/Song";
// import SongDetails from '@/domain/song/SongDetails';

export class SongResource implements SongRepository {
  constructor(public readonly songCaller: SongCaller) {}

  async createSong(
    title: string,
    artist: string,
    categoryId: string,
    playlistId: string,
  ): Promise<Song> {
    const apiSong = await this.songCaller.createSong(
      title,
      artist,
      categoryId,
      playlistId,
    );
    return new Song(
      apiSong.id,
      apiSong.title,
      apiSong.artist,
      apiSong.categoryId,
      apiSong.playlistId,
    );
  }

  async getSongs(playlistId: string): Promise<Song[]> {
    if (!playlistId) {
      throw new Error("playlistId is undefined or empty!");
    }

    const apiSongList = await this.songCaller.getSongs(playlistId);

    return apiSongList.map(
      apiSong =>
        new Song(
          apiSong.id,
          apiSong.title,
          apiSong.artist,
          apiSong.categoryId,
          apiSong.playlistId,
        ),
    );
  }

  //   async getSong(playlistId: string, songId: string): Promise<Song> {
  //     if (!playlistId || !songId) {
  //         throw new Error("playlistId or songId is undefined or empty!");
  //     }

  //     const apiSong = await this.songCaller.getSong(songId);

  //     return new Song(
  //         apiSong.playlistId,
  //         apiSong.id,
  //         apiSong.title,
  //         apiSong.artist,
  //         apiSong.categoryId
  //     );
  // }

  // async setSongDetails(songId: string, key: string, chordList: string[], notes: string, lyricLink: string, tabLink: string): Promise<SongDetails> {
  //   const apiSongDetails = await this.songCaller.setSongDetails(songId, key, chordList, notes, lyricLink, tabLink);
  //   return new SongDetails(
  //     apiSongDetails.songId,
  //     apiSongDetails.key,
  //     apiSongDetails.chordList,
  //     apiSongDetails.notes,
  //     apiSongDetails.lyricLink,
  //     apiSongDetails.tabLink
  //   );
  // }

  // async getSongDetails(songId: string): Promise<SongDetails> {
  //   return await this.songCaller.getSongDetails(songId) as SongDetails;
  // }

  //   async deleteSong(songId: string) {
  //     return await this.songCaller.deleteSong(songId);
  //   }
}
