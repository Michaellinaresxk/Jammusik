export type ApiSong = {
  id: string;
  title: string;
  artist: string;
  categoryId: string;
  playlistId: string | undefined;
  isDone: boolean;
};
