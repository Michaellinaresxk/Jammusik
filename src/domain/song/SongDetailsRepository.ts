import SongDetails from "./SongDetails";

export default interface SongDetailsRepository {
  setCurrentSongInfo(
    userId: string,
    name: string,
    email: string,
    location: string,
    skills: string,
    instrument: string,
  ): Promise<SongDetails>;

  getCurrentSongInfo(songId: string): Promise<SongDetails>;
}
