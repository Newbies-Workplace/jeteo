export type TokenUser = {
  id: string;
  google_id: string;
  nick: string;
};

export type Token = {
  user: TokenUser;
};
