export interface SongProperties {
  id: string;
  title: string;
  artist: string;
  categoryId: string;
  playlistId: string;
}

export interface SongWithOutPlaylistProperties {
  userId: string;
  categoryId: string;
  title: string;
  artist: string;
}

export interface SongDetailsProperties {
  songId: string;
  key?: string;
  chordList?: string[];
  notes?: string;
  lyricLink?: string;
  tabLink?: string;
}

export type PlaylistProperties = {
  id: string;
  title: string;
};

export type CategoryProperties = {
  id: string;
  title: string;
};

export type UserProperties = {
  id: string;
  name: string;
  email: string;
};

export type UserInfoProperties = {
  userId: string;
  location?: string;
  skills?: string;
  instrument?: string;
};
