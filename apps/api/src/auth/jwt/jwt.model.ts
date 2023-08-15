export type TokenUser = {
  id: string;
  google_id: string;
  name: string;
};

export type Token = {
  user: TokenUser;
};
