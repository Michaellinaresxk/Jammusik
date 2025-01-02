import SongDetails from './SongDetails';

export default interface SongDetailsRepository {
  setCurrentSongInfo(
    userId: string,
    songId: string,
    key?: string,
    chordList?: string[],
    location?: string,
    skills?: string,
    instrument?: string,
  ): Promise<SongDetails>;
  getCurrentSongInfo(userId: string, songId: string): Promise<SongDetails>;
}
