export type ApiSong = {
  id: string;
  categoryId: string;
  title: string;
  artist: string;
  isDone: boolean;
  playlistId?: string | undefined;
};
