export interface SongProperties {
  id: string;
  title: string;
  artist: string;
  categoryId: string;
  playlistId: string;
}

export interface SongDetailsProperties {
  songId: string;
  key?: string;
  chordList?: string[];
  notes?: string;
  lyricLink?: string;
  tabLink?: string;
}

export type ModeProperties = {
  id: string;
  title: string;
};

export type PlaylistProperties = {
  id: string;
  title: string;
  modeId: string;
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
