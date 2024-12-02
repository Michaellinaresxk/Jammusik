export interface Song {
  songId: string;
  categoryId: string;
  title: string;
  artist: string;
  playlistId?: string;
}

export interface SongCard {
  id: string;
  title: string;
  artist: string;
  isEditing?: boolean;
  isDisabled?: boolean;
}

export interface SongDetails {
  userId: string;
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
