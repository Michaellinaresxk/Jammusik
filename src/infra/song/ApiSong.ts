export type ApiSong = {
  songId: string;
  playlistId: string;
  id: string;
  title: string;
  artist: string;
  categoryId: string;
};

export type ApiSongDetails = {
  songId: string;
  key?: string;
  chordList?: string[];
  notes?: string;
  lyricLink?: string;
  tabLink?: string;
};
