export interface Song {
  playlistId: string
  id: string
  title: string
  artist: string
  categoryId: string
}

export interface SongCard {
  id: string
  title: string
  artist: string
  isEditing?: boolean
  isDisabled?: boolean
}

export interface SongDetails {
  songId: string
  key?: string
  chordList?: string[]
  notes?: string
  lyricLink?: string
  tabLink?: string
}

export interface Playlist {
  id: string
  title: string
  modeId: string
}

export interface Category {
  userId: string
  id: string
  title: string
}

export type Mode = {
  id: string,
  title: string;
};