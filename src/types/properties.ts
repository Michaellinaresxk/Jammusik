export interface SongProperties {
  id: string;
  title: string;
  artist: string;
  categoryId: string;
  isDone: boolean;
}

export interface SongDetailsProperties {
  userId: string;
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
  sharedWith: string[];
  ownerId: string;
};

export type CategoryProperties = {
  id: string;
  title: string;
  userId: string;
};

export type UserProperties = {
  id: string;
  name: string;
  email: string;
};
