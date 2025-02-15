export type ApiPlaylist = {
  id: string;
  title: string;
  createdAt: Date;
  userId?: string;
  isShared?: boolean;
  sharedBy?: string;
};
