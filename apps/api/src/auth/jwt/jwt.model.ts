export type TokenUser = {
  id: string;
  google_id: string;
  name: string;
  _permissions: {
    isAuthorized: boolean;
  };
};

export type Token = {
  user: TokenUser;
};
