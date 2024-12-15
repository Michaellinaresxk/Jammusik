export interface ApiSong {
  id: string;
  title: string;
  artist: string;
  categoryId: string;
  originalSongId: string;
  isDone: boolean;
  addedAt: Date;
}