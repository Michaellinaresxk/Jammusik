export interface Song {
  id: string;
  title: string;
  artist: string;
  categoryId: string;
  playlistId: string;
}

export interface SongCard {
  id: string;
  title: string;
  artist: string;
  isEditing?: boolean;
  isDisabled?: boolean;
}

export interface SongDetails {
  songId: string;
  key?: string;
  chordList?: string[];
  notes?: string;
  lyricLink?: string;
  tabLink?: string;
}

export interface Playlist {
  id: string;
  title: string;
}

export interface Category {
  userId: string;
  id: string;
  title: string;
}
