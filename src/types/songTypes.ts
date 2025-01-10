export type Song = {
  id: string;
  title: string;
  artist: string;
  categoryId: string;
  isDone: boolean;
  userId: string;
};

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

export interface SongData {
  id: string;
  title: string;
  artist: string;
  categoryId: string;
  originalSongId: string;
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

export interface LyricsViewProps {
  artist: string;
  title: string;
  onClose: () => void;
}

export interface LyricLine {
  text: string;
  startTime: number;
  endTime: number;
}

export interface SharedPlaylistCardProps {
  playlist: {
    id: string;
    title: string;
    sharedBy: string;
    sharedAt: string;
  };
  onAccept: () => void;
  onReject: () => void;
}

export interface SharePlaylistModalProps {
  visible: boolean;
  onClose: () => void;
  playlistId: string;
  recipientEmail: string;
  setRecipientEmail: (email: string) => void;
  onSubmit: () => void;
}
export interface SharedPlaylist {
  playlistId: string;
  originalOwnerId: string;
  recipientId: string;
  status: 'pending' | 'accepted' | 'rejected';
  sharedAt: string;
}


