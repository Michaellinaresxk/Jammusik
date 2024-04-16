export type ApiSong = {
  id: string;
  title: string;
  artist: string;
  categoryId: string;
  playlistId: string | undefined;
};

// export type ApiSongDetails = {
//   songId: string;
//   key?: string;
//   chordList?: string[];
//   notes?: string;
//   lyricLink?: string;
//   tabLink?: string;
// };
