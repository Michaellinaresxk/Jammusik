export interface Register {
  email: string;
  userName: string;
  password: string;
}

export interface User {
  id: string;
  name: string;
  email: string;
}

export interface Login {
  email: string;
  password: string;
}

export interface Category {
  id: string;
  title: string;
}
