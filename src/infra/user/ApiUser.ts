export type ApiUser = { id: string; email: string; name: string };
export type ApiUserInfo = {
  userId: string;
  name: string;
  email: string;
  location?: string;
  skills?: string;
  instrument?: string;
};
